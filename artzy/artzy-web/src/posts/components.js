import React, {useEffect, useState} from 'react'
import {PostsList} from './list'
import {PostCreate} from './create'
import {Post} from './detail'
import {apiPostsbyid} from './lookup'


export function PostsComponent(props){
  const [newPosts, setNewPosts] = useState([])
  
  const canPost = props.canPost === "false" ? false : true
  const handleNewPost = (newPost)=>{
    let tempNewPosts = [...newPosts]
    tempNewPosts.unshift(newPost)
    setNewPosts(tempNewPosts)
  }

  return <div className={props.className}>
    {canPost && <PostCreate didPost ={handleNewPost} className='col-12 mb-3'/>}
    <PostsList newPosts={newPosts} {...props} />
    </div>
}


export function PostbyidComponent(props) {
  const {postId} = props
  const [didLookup, setDidLookup] = useState(false) 
  const [post, setPost] = useState(null)
  const handleBackendLookup= (response, status) => {
    if(status === 200){
      setPost(response)
    }else {
      alert("There was an error finding your post.")
    }
  }
  useEffect(()=>{
    if(didLookup === false){
      apiPostsbyid(postId, handleBackendLookup)
      setDidLookup(true)
    }
  }, [postId, didLookup, setDidLookup])
  return post ?  <Post post={post} className={props.className} /> : null
}
