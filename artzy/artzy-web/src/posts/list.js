import React, {useEffect, useState} from 'react'
import {apiPostsList} from './lookup'
import {Post} from './detail'

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
      const handlePostsListLookup = (response, status) => {
        if (status === 200){
              setPostsInit(response)
              setPostsDidSet(true)
        }
      }
      apiPostsList(props.username, handlePostsListLookup)
    }
    }, [postsDidSet, setPostsDidSet, postsInit, props.username]) //dependencies
    
    const handleDidShare = (newPost)=>{
  
      const updatePostsInit = [...postsInit]
      updatePostsInit.unshift(newPost)
      setPostsInit(updatePostsInit)
  
      const updateFinalPosts = [...posts]
      updateFinalPosts.unshift(newPost)
      setPosts(updateFinalPosts)
    }
  
    return posts.map((item, index)=>{
      return <Post 
      didShare={handleDidShare}
      post={item} 
      key={`${index}-{item.id}`} 
      className='my-5 py-5 border bg-white text-dark' />
    })
  
  }
  