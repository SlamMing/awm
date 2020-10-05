import React from 'react'


export function AuthorLink (props){
    const {username} = props
    const handleAuthorLink = (event) => {
        window.location.href = `/profile/${username}`
    }
    return <span className='pointer' onClick={handleAuthorLink}>
            {props.children}
    </span>
}
export function AuthorDisplay(props) {
    const {author, includeFullName, hideLink} = props
    const nameDisplay = includeFullName === true ? `${author.first_name} ${author.last_name} ` : null
    return <React.Fragment>
            {nameDisplay} 
            {hideLink===true ? `@${author.username}` : <AuthorLink username={author.username}>@{author.username}</AuthorLink>}
    </React.Fragment>
}
export function AuthorPicture (props){
    const {author, hideLink} = props
    const userIdSpan = <span className='px-3 py-2 rounded-circle bg-dark text-white'>
    {author.username[0]}  
    </span>
    return hideLink===true ? userIdSpan : <AuthorLink username={author.username}>{userIdSpan}</AuthorLink>
}