import React, {useState, useEffect} from 'react'
import {apiProfileDetail, apiProfileFollowToggle} from './lookup'
import {AuthorDisplay, AuthorPicture} from './components'
import {DisplayCount} from './utils'

function ProfileBadge(props) {
    const {user, didFollowToggle, profileLoading} = props
    let currentVerb = (user && user.is_following) ? "Unfollow" : "Follow"
    currentVerb = profileLoading ? "Loading..." : currentVerb
    const handleFollowToggle = (event) => {
        event.preventDefault()
        if (didFollowToggle && !profileLoading){
            didFollowToggle(currentVerb)
        }
    }
    return user ? <div>
        <AuthorPicture author={user} hideLink />
        <p> <AuthorDisplay author={user} includeFullName hideLink /> </p>
        <p><DisplayCount>{user.follower_count}</DisplayCount> {user.follower_count===1 ? "follower" : "followers"} </p>
        <p><DisplayCount>{user.following_count}</DisplayCount> following </p>
        <p> {user.location} </p>
        <p> {user.bio} </p>
        <button className='btn btn-primary' onClick={handleFollowToggle}>{currentVerb}</button>
    </div> : null
}
export function ProfileBadgeComponent (props) {
    const {username} = props
    //lookup
    const [didLookup, setDidLookup] = useState(false) 
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)
    const handleBackendLookup= (response, status) => {
      if(status === 200){
        setProfile(response)
      }
    }
    useEffect(()=>{
      if(didLookup === false){
        apiProfileDetail(username, handleBackendLookup)
        setDidLookup(true)
      }
    }, [username, didLookup, setDidLookup])
    const handleFollow = (actionVerb) => {
        apiProfileFollowToggle(username, actionVerb, (response, status)=>{
            if (status===200) {
                setProfile(response)
            }
            setProfileLoading(false)
        })
        setProfileLoading(true)
    }
    return didLookup === false ? "Loading..." : <ProfileBadge user={profile} didFollowToggle={handleFollow} profileLoading={profileLoading} /> 
}