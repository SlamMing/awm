import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {PostsComponent, PostbyidComponent} from './posts'

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

const postDetailElements = document.querySelectorAll(".artzy-detail")
postDetailElements.forEach(container => {
  ReactDOM.render(
    e(PostbyidComponent, container.dataset),
    container
  );
})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
