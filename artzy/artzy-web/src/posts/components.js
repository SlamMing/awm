import React, {useEffect, useState} from 'react'
import {loadPosts, createPost} from '../lookup'

export function PostsComponent(props){
  const textAreaRef = React.createRef()
  const [newPosts, setNewPosts] = useState([])
  const handleBackendUpdate = (response, status)=>{
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
    
    createPost(newVal, handleBackendUpdate)
   
    
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
    loadPosts(myCallback)
  }
  }, [postsDidSet, setPostsDidSet, postsInit]) //dependencies
  return posts.map((item, index)=>{
    return <Post post={item} key={`${index}-{item.id}`} className='my-5 py-5 border bg-white text-dark' />
  })

}


export function ActionButt(props) {
const {post, action} = props
const [likes, setLikes] = useState(post.likes ? post.likes : 0)
const [userLike, setUserLike] = useState(post.userLike === true ? true : false)
const className = props.className ? props.className : 'btn btn-primary btn-sm'
const actionDisplay = action.display ? action.display : 'Action'
const display = action.type === 'like'  ? `${likes} ${actionDisplay}` : actionDisplay
const handleClick = (event) => {
  event.preventDefault()
  if (action.type === 'like'){
    if(userLike === true){
      console.log(likes)
      setLikes(likes - 1)
      setUserLike(false)
    }else{
      console.log(likes)
      setLikes(likes + 1)
      setUserLike(true)
    }

  }
}
return <button className={className} onClick={handleClick}>{display}</button>
}

export function Post(props) {
const {post} = props
const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
return <div className={className}>
<p> { post.description } </p>
<div className='btn btn-group'>
<ActionButt post={post} action={{type:"like", display:"Likes"}}/>
<ActionButt post={post} action={{type:"unlike", display:"Dislike"}}/>
<ActionButt post={post} action={{type:"share", display:"Share"}}/>
</div>
</div>
}
