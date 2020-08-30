import React, {useEffect, useState} from 'react'
import {  apiPostAction,
          apiPostCreate,
          apiPostsList} from './lookup'

export function PostsComponent(props){
  const textAreaRef = React.createRef()
  const [newPosts, setNewPosts] = useState([])
  
  const handleBackendUpdate = (response, status)=>{
  // backend api response
    let tempNewPosts = [...newPosts]
    if (status===201){
      tempNewPosts.unshift(response)
      setNewPosts(tempNewPosts)
    }else{
      console.log(response)
      alert("An error occured sir")
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newVal = textAreaRef.current.value
    apiPostCreate(newVal, handleBackendUpdate)
    textAreaRef.current.value = ''
  }

  return <div className={props.className}>
    <div className='col-12 mb-3'>
    <form onSubmit={handleSubmit}>
    <textarea ref={textAreaRef} required={true} className='form-control' placeholder='Painting description' name='post'></textarea>
    <button type='submit' className='btn btn-primary my-3'>Publish</button>
    </form>
    </div>
    <PostsList newPosts={newPosts} />
    </div>
}
export function PostsList(props){
  const [postsInit, setPostsInit] = useState([])
  const [posts, setPosts] = useState([])
  const [postsDidSet, setPostsDidSet] = useState(false)


  useEffect(()=> {
    const final = [...props.newPosts].concat(postsInit)
    if (final.length !== posts.length){
      setPosts(final)
    }
  }, [props.newPosts, posts, postsInit]) //dependencies
  useEffect(()=> {
    if(postsDidSet===false){
    const myCallback = (response, status) => {
      if (status === 200){
            setPostsInit(response)
            setPostsDidSet(true)
      }
    }
    apiPostsList(myCallback)
  }
  }, [postsDidSet, setPostsDidSet, postsInit]) //dependencies
  return posts.map((item, index)=>{
    return <Post post={item} key={`${index}-{item.id}`} className='my-5 py-5 border bg-white text-dark' />
  })

}


export function ActionButt(props) {
const {post, action} = props
const [likes, setLikes] = useState(post.likes ? post.likes : 0)
//const [userLike, setUserLike] = useState(post.userLike === true ? true : false)
const className = props.className ? props.className : 'btn btn-primary btn-sm'
const actionDisplay = action.display ? action.display : 'Action'
const display = action.type === 'like'  ? `${likes} ${actionDisplay}` : actionDisplay
const handleActionBackendEvent = (response, status)=>{
  console.log(response)
  if (action.type === 'like'){
    if (status === 200){
      setLikes(response.likes)
    }
  }
}
const handleClick = (event) => {
  event.preventDefault()
  apiPostAction(post.id, action.type, handleActionBackendEvent)
 
}
return <button className={className} onClick={handleClick}>{display}</button>
}
export function ParentPost(props){
const {post} = props
  return post.parent ? <div className='row'>
  <div className='col-11 mx-auto p-3 border rounded'>
  <p className='mb-0 text-muted small'>Shared</p>
   <Post className= {' '} post={post.parent} />
   </div>
   </div> : null 
}
export function Post(props) {
const {post} = props
const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
return <div className={className}>
<div>
<p> { post.description } </p>
<ParentPost post={post} />
  </div>  

<div className='btn btn-group'>
<ActionButt post={post} action={{type:"like", display:"Likes"}}/>
<ActionButt post={post} action={{type:"unlike", display:"Dislike"}}/>
<ActionButt post={post} action={{type:"share", display:"Share"}}/>
</div>
</div>
}
