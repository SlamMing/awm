import React, {useState} from 'react'
import {ActionButt} from './buttons'
import {AuthorPicture, AuthorDisplay} from '../profiles'

export function ParentPost(props){
    const {post} = props
      return post.parent ? 
      <Post isRepost reposter={props.reposter} hideActions className= {' '} post={post.parent} /> : null 
 }

export function Post(props) {
const {post, didShare, hideActions, isRepost, reposter} = props
const [PostAction, setPostAction] = useState(props.post ? props.post : null)
let className = props.className ? props.className : 'col-10 mx-auto col-md-6'
className = isRepost === true ? `${className} p-2 border rounded` : className
const path = window.location.pathname
var match = path.match(/(?<postid>\d+)/)
var urlPostId = match ? match.groups.postid : -1
const isDetail = `${post.id}` === `${urlPostId}`

const handleLink = (event) => {
    event.preventDefault()
    window.location.href = `http://localhost:8000/${post.id}`
}

const handlePerformAction = (newPostAction, status)=>{
    //console.log(newPostAction)
    if (status === 200){
    setPostAction(newPostAction)
    } else if (status === 201){
    didShare(newPostAction)
    }
}

return <div className={className}>
{isRepost === true && <div className='mb-2'> <span className='small text-muted'>Loved by <AuthorDisplay author={reposter}/></span></div>}
<div className='d-flex'>
    <div className='col-1'>
        <AuthorPicture author={post.author}/>

    </div>
    <div className='col-11'>
    <AuthorDisplay includeFullName author={post.author}/>
<div>
{(isRepost || !post.parent) && <p> <iframe title="painting"  src={post.painting} style={{border:'none', width:'300px', height: '530px'}}> </iframe></p>}
<p> {post && post.description } </p>

<ParentPost post={post} reposter={post.author}/>
    </div>  

<div className='btn btn-group px-0'>
{(PostAction && hideActions !== true) && <React.Fragment>
    <ActionButt post={PostAction} didPerformAction={handlePerformAction} action={{type:"like", display:"Likes"}}/>
    <ActionButt post={PostAction} didPerformAction={handlePerformAction} action={{type:"unlike", display:"Dislike"}}/>
    {(post.is_repost!==true) && <ActionButt post={PostAction} didPerformAction={handlePerformAction} action={{type:"share", display:"Love"}}/>}
    </React.Fragment>

}
{isDetail === true ? null : <button className='btn btn-outline-primary btn-sm' onClick={handleLink}>View</button>}
</div>
</div>
</div>
</div>
}
    