import React from 'react'
import {  apiPostCreate} from './lookup'

export function PostCreate(props){
  const textAreaRef = React.createRef()
  const embedAreaRef = React.createRef()
  const {didPost} = props

  const handleBackendUpdate = (response, status)=>{

    if (status===201){
      didPost(response)
    }else{
      alert("An error occured sir")
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newVal = textAreaRef.current.value
    var img = embedAreaRef.current.value
    // eslint-disable-next-line
    let rgx = new RegExp('(https?:\/\/(?:www\.)?instagram\.com\/p\/([^/?#&]+)).*')
    if(rgx.test(img)){
      if(img.slice(-1) === "/"){
        img = img + 'embed'
      }else{
        img = img + '/embed'
      }
      apiPostCreate(newVal, img, handleBackendUpdate)
      textAreaRef.current.value = ''
      embedAreaRef.current.value = ''
  }else{
    alert("Invalid link, please use instagram post link")
    embedAreaRef.current.value = ''
  }
    
    
  }
 
  return <div className={props.className}>
          <form onSubmit={handleSubmit}>
          <textarea ref={textAreaRef} required={true} className='form-control' placeholder='Painting description' name='post'></textarea>
          <textarea ref={embedAreaRef} required={true} className='form-control' placeholder='Instagram link' name='embed'></textarea>
          <button type='submit' className='btn btn-primary my-3'>Publish</button>
          </form>
  </div>
}