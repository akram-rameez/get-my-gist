(this["webpackJsonpget-my-gist"]=this["webpackJsonpget-my-gist"]||[]).push([[0],{140:function(e,t,n){},141:function(e,t,n){},161:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(14),i=n.n(c),u=(n(140),n(7)),s=(n(141),n(104)),o=n(214),l=n(212),f=n(169),h=n(215),p=n(30),b=n.n(p),d=n(31),j=n(17),g=n(48),O=n(88),m=n(213),v=n(218),x=n(108),w=n(51),k=n(52),S="https://api.github.com",y=36e5;function C(e){return Object(d.a)(Object(d.a)({},e),{},{time:Date.now()})}var L=new(function(){function e(){Object(w.a)(this,e),this.requestsLog=[]}return Object(k.a)(e,[{key:"fetch",value:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){var e=Object(g.a)(b.a.mark((function e(t){var n,r,a,c,i,u,s,o,l,f=arguments;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=f.length>1&&void 0!==f[1]?f[1]:{},r=f.length>2&&void 0!==f[2]?f[2]:{},this.requestsLog.length&&(a=Object(x.a)(this.requestsLog),c=a[0],i=a.slice(1),u=c.time,Date.now()-u<y?this.requestLog=i:console.warn("Already completed ".concat(this.requestlog.length," requests in throttle window"))),this.requestsLog.push(C({url:t})),s=n.method,o=new URL("".concat(S).concat(t)),"GET"===s&&(o.search=new URLSearchParams(r).toString()),e.next=9,fetch(o,Object(d.a)(Object(d.a)({},n),["POST","UPDATE"].includes(s)?{data:JSON.stringify(r)}:{}));case 9:return l=e.sent,e.prev=10,e.abrupt("return",l.json());case 14:e.prev=14,e.t0=e.catch(10),console.log(e.t0);case 17:return e.abrupt("return",null);case 18:case"end":return e.stop()}}),e,this,[[10,14]])})));return function(t){return e.apply(this,arguments)}}())}]),e}()),T=n(16);function E(){return Object(T.jsx)(O.b,{children:Object(T.jsx)("div",{style:{position:"absolute",top:0,width:"100%"},children:Object(T.jsx)(m.a,{})})})}var G=function(e){var t=e.replace("https://api.github.com","");return L.fetch(t,{method:"GET"})},N=function(){var e=Object(g.a)(b.a.mark((function e(t,n,r){var a,c,i;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=1,50,c=[],i=b.a.mark((function e(){var n,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L.fetch("/users/".concat(t,"/gists"),{method:"GET"},{per_page:50,page:a});case 2:if(n=e.sent,r=Promise.all(n.map((function(e){var t=e.forks_url;return G(t)}))),c=[].concat(Object(j.a)(c),Object(j.a)(n.map((function(e){return Object(d.a)(Object(d.a)({},e),{},{forkList:r})})))),!(n.length<50)){e.next=9;break}return e.abrupt("return","break");case 9:a+=1;case 10:case"end":return e.stop()}}),e)}));case 4:return e.delegateYield(i(),"t0",5);case 5:if("break"!==e.t0){e.next=8;break}return e.abrupt("break",10);case 8:e.next=4;break;case 10:r(c);case 11:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),P=[{field:"id",headerName:"ID",width:150},{field:"description",headerName:"Description",editable:!1,flex:1,minWidth:200},{field:"fileTypes",headerName:"File Types",valueGetter:function(e){var t=e.row,n=(t=void 0===t?{}:t).files,r=void 0===n?{}:n;return Object.keys(r).map((function(e){return r[e].language})).filter(Boolean)},renderCell:function(e){return e.value.map((function(e){return Object(T.jsx)(v.a,{style:{marginRight:10},label:e})}))},flex:1,minWidth:200}],q=function(e){var t=e.username,n=a.a.useState([]),r=Object(u.a)(n,2),c=r[0],i=r[1];return a.a.useEffect((function(){return N(t,0,i),function(){i(null)}}),[t]),Object(T.jsx)("div",{style:{height:500},children:Object(T.jsx)(O.a,{className:"data-grid",components:{LoadingOverlay:E},loading:!c,rows:c,columns:P,pageSize:5,rowsPerPageOptions:[5],disableSelectionOnClick:!0})})},D=n(96),F=n(216),I=n(114),B=n.n(I)()(function(){var e=Object(g.a)(b.a.mark((function e(t,n){var r,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==t){e.next=2;break}return e.abrupt("return",n([]));case 2:return e.next=4,L.fetch("/search/users",{method:"GET"},{q:t});case 4:if(r=e.sent,a=r.items){e.next=8;break}return e.abrupt("return",n([]));case 8:return e.abrupt("return",n(a));case 9:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),300),R=function(e){var t=e.onSelect,n=e.onClear,r=a.a.useState(null),c=Object(u.a)(r,2),i=c[0],s=c[1],o=a.a.useState(""),l=Object(u.a)(o,2),f=l[0],h=l[1],p=a.a.useState([]),b=Object(u.a)(p,2),g=b[0],O=b[1];return a.a.useEffect((function(){f||n(null),B(f,O)}),[f]),Object(T.jsx)(F.a,{className:"autocomplete",getOptionLabel:function(e){return e.login},filterOptions:function(e){return e},options:g,autoComplete:!0,freeSolo:!0,filterSelectedOptions:!0,value:i,onChange:function(e,n){if(O(n?[n].concat(Object(j.a)(g)):g),s(n),n){var r=n.login;t(r)}},onInputChange:function(e,t){h(t)},renderInput:function(e){return Object(T.jsx)(D.a,Object(d.a)(Object(d.a)({},e),{},{label:"Enter Username",variant:"outlined",fullWidth:!0}))},renderOption:function(e){return Object(T.jsx)("div",{children:e.login})}})};R.defaultProps={onClear:function(){}};var U=R,J=Object(s.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));var W=function(){var e=a.a.useState(null),t=Object(u.a)(e,2),n=t[0],r=t[1],c=J(),i=a.a.useCallback((function(){r(null)}),[]);return Object(T.jsxs)("div",{className:c.root,children:[Object(T.jsx)(o.a,{position:"static",children:Object(T.jsx)(l.a,{children:Object(T.jsx)(f.a,{variant:"h6",className:c.title,children:"Git my Gist"})})}),Object(T.jsxs)(h.a,{className:"app-root",height:"100%",children:[Object(T.jsx)(U,{onSelect:r,onClear:i}),!!n&&Object(T.jsx)(q,{username:n},n)]})]})},A=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,219)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),r(e),a(e),c(e),i(e)}))};i.a.render(Object(T.jsx)(a.a.StrictMode,{children:Object(T.jsx)(W,{})}),document.getElementById("root")),A()}},[[161,1,2]]]);
//# sourceMappingURL=main.65aec145.chunk.js.map