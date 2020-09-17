import React from 'react'
import {  apiPostAction,} from './lookup'

export function ActionButt(props) {
    const {post, action, didPerformAction} = props
    const likes = post.likes ? post.likes : 0
    
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    const display = action.type === 'like'  ? `${likes} ${actionDisplay}` : actionDisplay
    const handleActionBackendEvent = (response, status)=>{
     //console.log(response, status)
        if ((status === 200 || status === 201) && didPerformAction){
          didPerformAction(response, status)
        }
      
    }
    const handleClick = (event) => {
      event.preventDefault()
      //console.log(action.type)
      apiPostAction(post.id, action.type, handleActionBackendEvent)
     
    }
    return <button className={className} onClick={handleClick}>{display}</button>
    }