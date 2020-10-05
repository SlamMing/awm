import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ProfileBadgeComponent} from './profiles'
import {FeedComponent, PostsComponent, PostbyidComponent} from './posts'

const appEl = document.getElementById('root')
if (appEl) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    appEl
  );
}
const e = React.createElement
const postsEl = document.getElementById("artzy")

if (postsEl) {
  ReactDOM.render(
    e(PostsComponent, postsEl.dataset),
    postsEl
  );
}
const postsFeedEl = document.getElementById("artzy-feed")

if (postsFeedEl) {
  ReactDOM.render(
    e(FeedComponent, postsFeedEl.dataset),
    postsFeedEl
  );
}

const postDetailElements = document.querySelectorAll(".artzy-detail")
postDetailElements.forEach(container => {
  ReactDOM.render(
    e(PostbyidComponent, container.dataset),
    container
  );
})


const userProfileBadgeElements = document.querySelectorAll(".artzy-profile-badge")
userProfileBadgeElements.forEach(container => {
  ReactDOM.render(
    e(ProfileBadgeComponent, container.dataset),
    container
  );
})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
