import {backendLookup} from '../lookup'
export function apiPostCreate(newPost, img, callback) {
    const data = {description: newPost, painting: img}
    backendLookup("POST", "/posts/create/", callback, data)

}
export function apiPostAction(postId, action, callback) {
    const data = {id: postId, action:action}
    backendLookup("POST", "/posts/action/", callback, data)

}
export function apiPostsbyid(postID, callback) {
    backendLookup("GET", `/posts/${postID}/`, callback)
}

export function apiPostsList(username, callback) {
    let endpoint ="/posts/"
    if (username){
        endpoint = `/posts/?username=${username}`
    }
    backendLookup("GET", endpoint, callback)
}
