import React, {useState} from 'react'
import {ActionButt} from './buttons'

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
const {post, didShare, hideActions} = props
const [PostAction, setPostAction] = useState(props.post ? props.post : null)
const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
const path = window.location.pathname
var match = path.match(/(?<postid>\d+)/)
var urlPostId = match ? match.groups.postid : -1
const isDetail = `${post.id}` === `${urlPostId}`

const handleLink = (event) => {
    event.preventDefault()
    window.location.href = `${post.id}`
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
<div>
<p> {post && post.description } </p>
<ParentPost post={post} />
    </div>  

<div className='btn btn-group'>
{(PostAction && hideActions !== true) && <React.Fragment>
    <ActionButt post={PostAction} didPerformAction={handlePerformAction} action={{type:"like", display:"Likes"}}/>
    <ActionButt post={PostAction} didPerformAction={handlePerformAction} action={{type:"unlike", display:"Dislike"}}/>
    {(post.is_repost!==true) && <ActionButt post={PostAction} didPerformAction={handlePerformAction} action={{type:"share", display:"Share"}}/>}
    </React.Fragment>

}
{isDetail === true ? null : <button className='btn btn-outline-primary btn-sm' onClick={handleLink}>View</button>}
</div>
</div>
}
    