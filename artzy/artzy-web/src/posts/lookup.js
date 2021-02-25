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

export function apiPostsList(username, callback, nextUrl) {
    let endpoint ="/posts/"
    if (username){
        endpoint = `/posts/?username=${username}`
    }
    if (nextUrl !== null && nextUrl !== undefined) {
        endpoint = nextUrl.replace("http://localhost:8000/api", "") // da cambiare in production
    }
    backendLookup("GET", endpoint, callback)
}
export function apiPostFeed(callback, nextUrl) {
    let endpoint ="/posts/feed/"
    if (nextUrl !== null && nextUrl !== undefined) {
        endpoint = nextUrl.replace("http://localhost:8000/api", "") // da cambiare in production
    }
    backendLookup("GET", endpoint, callback)
}
