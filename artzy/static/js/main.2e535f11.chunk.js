(this["webpackJsonpartzy-web"]=this["webpackJsonpartzy-web"]||[]).push([[0],[,,,,,,,function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},,,function(e,t,a){e.exports=a(17)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),o=a(3),r=a.n(o),l=(a(15),a(7)),s=a.n(l);a(16);function i(e,t,a,n){var c;n&&(c=JSON.stringify(n));var o=new XMLHttpRequest,r="http://localhost:8000/api".concat(t);o.responseType="json";var l=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var a=document.cookie.split(";"),n=0;n<a.length;n++){var c=a[n].trim();if(c.substring(0,e.length+1)===e+"="){t=decodeURIComponent(c.substring(e.length+1));break}}return t}("csrftoken");o.open(e,r),o.setRequestHeader("Content-Type","application/json"),l&&(o.setRequestHeader("X-Requested-With","XMLHttpRequest"),o.setRequestHeader("X-CSRFToken",l)),o.onload=function(){if(403===o.status){var e=o.response.detail;console.log(o.response),"Authentication credentials were not provided."===e&&-1===window.location.href.indexOf("login")&&(window.location.href="/login?showLoginRequired=true")}a(o.response,o.status)},o.onerror=function(e){a({message:"an error occured."},400)},o.send(c)}function u(e,t,a){var n="/posts/";e&&(n="/posts/?username=".concat(e)),null!==a&&void 0!==a&&(n=a.replace("http://localhost:8000/api","")),i("GET",n,t)}function m(e,t){var a="/posts/feed/";null!==t&&void 0!==t&&(a=t.replace("http://localhost:8000/api","")),i("GET",a,e)}function d(e){var t=e.post,a=e.action,n=e.didPerformAction,o=t.likes?t.likes:0,r=e.className?e.className:"btn btn-primary btn-sm",l=a.display?a.display:"Action",s="like"===a.type?"".concat(o," ").concat(l):l,u=function(e,t){200!==t&&201!==t||!n||n(e,t)};return c.a.createElement("button",{className:r,onClick:function(e){e.preventDefault(),function(e,t,a){i("POST","/posts/action/",a,{id:e,action:t})}(t.id,a.type,u)}},s)}var f=a(2),p=a(1),b=a(9);function E(e){var t=e.username;return c.a.createElement("span",{className:"pointer",onClick:function(e){window.location.href="/profile/".concat(t)}},e.children)}function v(e){var t=e.author,a=e.includeFullName,n=e.hideLink,o=!0===a?"".concat(t.first_name," ").concat(t.last_name," "):null;return c.a.createElement(c.a.Fragment,null,o,!0===n?"@".concat(t.username):c.a.createElement(E,{username:t.username},"@",t.username))}function h(e){var t=e.author,a=e.hideLink,n=c.a.createElement("span",{className:"px-3 py-2 rounded-circle bg-dark text-white"},t.username[0]);return!0===a?n:c.a.createElement(E,{username:t.username},n)}var O=a(8),g=a.n(O);function j(e){return c.a.createElement("span",{className:e.className}," ",g()(e.children).format("0a")," ")}function w(e){var t=e.user,a=e.didFollowToggle,n=e.profileLoading,o=t&&t.is_following?"Unfollow":"Follow";o=n?"Loading...":o;return t?c.a.createElement("div",null,c.a.createElement(h,{author:t,hideLink:!0}),c.a.createElement("p",null," ",c.a.createElement(v,{author:t,includeFullName:!0,hideLink:!0})," "),c.a.createElement("p",null,c.a.createElement(j,null,t.follower_count)," ",1===t.follower_count?"follower":"followers"," "),c.a.createElement("p",null,c.a.createElement(j,null,t.following_count)," following "),c.a.createElement("p",null," ",t.location," "),c.a.createElement("p",null," ",t.bio," "),c.a.createElement("button",{className:"btn btn-primary",onClick:function(e){e.preventDefault(),a&&!n&&a(o)}},o)):null}function y(e){var t=e.username,a=Object(n.useState)(!1),o=Object(p.a)(a,2),r=o[0],l=o[1],s=Object(n.useState)(null),u=Object(p.a)(s,2),m=u[0],d=u[1],f=Object(n.useState)(!1),b=Object(p.a)(f,2),E=b[0],v=b[1],h=function(e,t){200===t&&d(e)};Object(n.useEffect)((function(){!1===r&&(!function(e,t){i("GET","/profiles/".concat(e,"/"),t)}(t,h),l(!0))}),[t,r,l]);return!1===r?"Loading...":c.a.createElement(w,{user:m,didFollowToggle:function(e){!function(e,t,a){var n={action:"".concat(t&&t).toLowerCase()};i("POST","/profiles/".concat(e,"/follow"),a,n)}(t,e,(function(e,t){200===t&&d(e),v(!1)})),v(!0)},profileLoading:E})}function N(e){var t=e.post;return t.parent?c.a.createElement(k,{isRepost:!0,reposter:e.reposter,hideActions:!0,className:" ",post:t.parent}):null}function k(e){var t=e.post,a=e.didShare,o=e.hideActions,r=e.isRepost,l=e.reposter,s=Object(n.useState)(e.post?e.post:null),i=Object(p.a)(s,2),u=i[0],m=i[1],f=e.className?e.className:"col-10 mx-auto col-md-6";f=!0===r?"".concat(f," p-2 border rounded"):f;var E=window.location.pathname.match(Object(b.a)(/([0-9]+)/,{postid:1})),O=E?E.groups.postid:-1,g="".concat(t.id)==="".concat(O),j=function(e,t){200===t?m(e):201===t&&a(e)};return c.a.createElement("div",{className:f},!0===r&&c.a.createElement("div",{className:"mb-2"}," ",c.a.createElement("span",{className:"small text-muted"},"Loved by ",c.a.createElement(v,{author:l}))),c.a.createElement("div",{className:"d-flex"},c.a.createElement("div",{className:"col-1"},c.a.createElement(h,{author:t.author})),c.a.createElement("div",{className:"col-11"},c.a.createElement(v,{includeFullName:!0,author:t.author}),c.a.createElement("div",null,c.a.createElement("p",null," ",t&&t.description," "),c.a.createElement(N,{post:t,reposter:t.author})),c.a.createElement("div",{className:"btn btn-group px-0"},u&&!0!==o&&c.a.createElement(c.a.Fragment,null,c.a.createElement(d,{post:u,didPerformAction:j,action:{type:"like",display:"Likes"}}),c.a.createElement(d,{post:u,didPerformAction:j,action:{type:"unlike",display:"Dislike"}}),!0!==t.is_repost&&c.a.createElement(d,{post:u,didPerformAction:j,action:{type:"share",display:"Love"}})),!0===g?null:c.a.createElement("button",{className:"btn btn-outline-primary btn-sm",onClick:function(e){e.preventDefault(),window.location.href="".concat(t.id)}},"View")))))}function S(e){var t=Object(n.useState)([]),a=Object(p.a)(t,2),o=a[0],r=a[1],l=Object(n.useState)([]),s=Object(p.a)(l,2),i=s[0],m=s[1],d=Object(n.useState)(null),b=Object(p.a)(d,2),E=b[0],v=b[1],h=Object(n.useState)(!1),O=Object(p.a)(h,2),g=O[0],j=O[1];Object(n.useEffect)((function(){var t=Object(f.a)(e.newPosts).concat(o);t.length!==i.length&&m(t)}),[e.newPosts,i,o]),Object(n.useEffect)((function(){if(!1===g){u(e.username,(function(e,t){200===t&&(v(e.next),r(e.results),j(!0))}))}}),[g,j,o,e.username]);var w=function(e){var t=Object(f.a)(o);t.unshift(e),r(t);var a=Object(f.a)(i);a.unshift(e),m(a)};return c.a.createElement(c.a.Fragment,null,i.map((function(e,t){return c.a.createElement(k,{didShare:w,post:e,key:"".concat(t,"-{item.id}"),className:"my-5 py-5 border bg-white text-dark"})})),null!==E&&c.a.createElement("button",{onClick:function(t){if(t.preventDefault(),null!==E){u(e.username,(function(e,t){if(200===t){v(e.next);var a=Object(f.a)(i).concat(e.results);r(a),m(a)}}),E)}},className:"btn btn-outline-primary"},"Load next"))}function P(e){var t=c.a.createRef(),a=e.didPost,n=function(e,t){201===t?a(e):alert("An error occured sir")};return c.a.createElement("div",{className:e.className},c.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a=t.current.value;i("POST","/posts/create/",n,{description:a}),t.current.value=""}},c.a.createElement("textarea",{ref:t,required:!0,className:"form-control",placeholder:"Painting description",name:"post"}),c.a.createElement("button",{type:"submit",className:"btn btn-primary my-3"},"Publish")))}function x(e){var t=Object(n.useState)([]),a=Object(p.a)(t,2),o=a[0],r=a[1],l=Object(n.useState)([]),s=Object(p.a)(l,2),i=s[0],u=s[1],d=Object(n.useState)(null),b=Object(p.a)(d,2),E=b[0],v=b[1],h=Object(n.useState)(!1),O=Object(p.a)(h,2),g=O[0],j=O[1];Object(n.useEffect)((function(){var t=Object(f.a)(e.newPosts).concat(o);t.length!==i.length&&u(t)}),[e.newPosts,i,o]),Object(n.useEffect)((function(){if(!1===g){m((function(e,t){200===t&&(v(e.next),r(e.results),j(!0))}))}}),[g,j,o]);var w=function(e){var t=Object(f.a)(o);t.unshift(e),r(t);var a=Object(f.a)(i);a.unshift(e),u(a)};return c.a.createElement(c.a.Fragment,null,i.map((function(e,t){return c.a.createElement(k,{didShare:w,post:e,key:"".concat(t,"-{item.id}"),className:"my-5 py-5 border bg-white text-dark"})})),null!==E&&c.a.createElement("button",{onClick:function(e){if(e.preventDefault(),null!==E){m((function(e,t){if(200===t){v(e.next);var a=Object(f.a)(i).concat(e.results);r(a),u(a)}}),E)}},className:"btn btn-outline-primary"},"Load next"))}function L(e){var t=Object(n.useState)([]),a=Object(p.a)(t,2),o=a[0],r=a[1],l="false"!==e.canPost;return c.a.createElement("div",{className:e.className},!0===l&&c.a.createElement(P,{didPost:function(e){var t=Object(f.a)(o);t.unshift(e),r(t)},className:"col-12 mb-3"}),c.a.createElement(S,Object.assign({newPosts:o},e)))}function A(e){var t=e.postId,a=Object(n.useState)(!1),o=Object(p.a)(a,2),r=o[0],l=o[1],s=Object(n.useState)(null),u=Object(p.a)(s,2),m=u[0],d=u[1],f=function(e,t){200===t?(console.log("wew"),d(e)):alert("There was an error finding your post.")};return Object(n.useEffect)((function(){var e;!1===r&&(e=f,i("GET","/posts/".concat(t,"/"),e),l(!0))}),[t,r,l]),m?c.a.createElement(k,{post:m,className:e.className}):null}var T=function(){return c.a.createElement("div",{className:"App"},c.a.createElement("header",{className:"App-header"},c.a.createElement("img",{src:s.a,className:"App-logo",alt:"logo"}),c.a.createElement("div",null,c.a.createElement(L,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var R=document.getElementById("root");R&&r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(T,null)),R);var F=c.a.createElement,q=document.getElementById("artzy");q&&r.a.render(F(L,q.dataset),q);var C=document.getElementById("artzy-feed");C&&r.a.render(F((function(e){var t=Object(n.useState)([]),a=Object(p.a)(t,2),o=a[0],r=a[1],l="false"!==e.canPost;return c.a.createElement("div",{className:e.className},!0===l&&c.a.createElement(P,{didPost:function(e){var t=Object(f.a)(o);t.unshift(e),r(t)},className:"col-12 mb-3"}),c.a.createElement(x,Object.assign({newPosts:o},e)))}),C.dataset),C),document.querySelectorAll(".artzy-detail").forEach((function(e){r.a.render(F(A,e.dataset),e)})),document.querySelectorAll(".artzy-profile-badge").forEach((function(e){r.a.render(F(y,e.dataset),e)})),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[10,1,2]]]);
//# sourceMappingURL=main.2e535f11.chunk.js.map