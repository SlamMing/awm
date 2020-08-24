import React, {useEffect, useState} from 'react'
import {loadPosts} from '../lookup'

export function PostsList(props){
  const [posts, setPosts] = useState([])
  useEffect(()=> {
    const myCallback = (response, status) => {
      if (status === 200){
            setPosts(response)
      }
    }
    loadPosts(myCallback)
  }, [])
  return posts.map((item, index)=>{
    return <Post post={item} key={`${index}-{item.id}`} className='my-5 py-5 border bg-white text-dark' />
  })

}


export function ActionButt(props) {
const {post, action} = props
const className = props.className ? props.className : 'btn btn-primary btn-sm'
const actionDisplay = action.display ? action.display : 'Action'
const display = action.type === 'like'  ? `${post.likes} ${actionDisplay}` : actionDisplay
const handleClick = (event) => {
  event.preventDefault()
  if (action.type === 'like'){
    console.log(post.likes + 1)
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
