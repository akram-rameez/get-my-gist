(this["webpackJsonpget-my-gist"]=this["webpackJsonpget-my-gist"]||[]).push([[0],{114:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(11),s=n.n(c),i=(n(91),n(18)),o=(n(92),n(149)),u=n(158),l=n(159),f=n(155),j=n(160),p=n(46),b=n(19),h=n(17),d=n.n(h),O=n(27),g=n(25),x=n(71),m=n(72),v=n(73),y="https://api.github.com",k=36e5;function S(e){return Object(b.a)(Object(b.a)({},e),{},{time:Date.now()})}var w=new(function(){function e(){Object(m.a)(this,e),this.requestsLog=[]}return Object(v.a)(e,[{key:"fetch",value:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){var e=Object(g.a)(d.a.mark((function e(t){var n,a,r,c,s,i,o,u,l,f=arguments;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=f.length>1&&void 0!==f[1]?f[1]:{},a=f.length>2&&void 0!==f[2]?f[2]:{},this.requestsLog.length&&(r=Object(x.a)(this.requestsLog),c=r[0],s=r.slice(1),i=c.time,Date.now()-i<k?this.requestLog=s:console.warn("Already completed ".concat(this.requestlog.length," requests in throttle window"))),this.requestsLog.push(S({url:t})),o=n.method,u=new URL("".concat(y).concat(t)),"GET"===o&&(u.search=new URLSearchParams(a).toString()),e.next=9,fetch(u,Object(b.a)(Object(b.a)({},n),["POST","UPDATE"].includes(o)?{data:JSON.stringify(a)}:{}));case 9:return l=e.sent,e.prev=10,e.abrupt("return",l.json());case 14:e.prev=14,e.t0=e.catch(10),console.log(e.t0);case 17:return e.abrupt("return",null);case 18:case"end":return e.stop()}}),e,this,[[10,14]])})));return function(t){return e.apply(this,arguments)}}())}]),e}()),T=n(152),C=n(164),E=n(165),G=n(163),F=n(154),L=n(156),M=n(76),N=n.n(M),P=n(7),q=function(){var e=Object(g.a)(d.a.mark((function e(t,n){var a,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.replace("https://api.github.com",""),e.next=3,w.fetch(a,{method:"GET"},{per_page:3});case 3:return r=e.sent,e.abrupt("return",n(r));case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),R=Object(o.a)((function(e){return{root:{width:"100%",marginTop:10},heading:{fontSize:e.typography.pxToRem(15),flexBasis:"33.33%",flexShrink:0},secondaryHeading:{fontSize:e.typography.pxToRem(15),color:e.palette.text.secondary}}})),_=function(e){var t=e.data,n=e.onMount;return r.a.useEffect((function(){n()}),[]),Object(P.jsxs)("div",{style:{marginTop:10},children:[!t&&Object(P.jsx)(T.a,{}),!!t&&Object(P.jsx)("div",{children:t.map((function(e){var t=e.html_url,n=e.owner,a=(n=void 0===n?{}:n).avatar_url,r=n.id,c=n.login;return Object(P.jsx)("a",{href:t,target:"_blank",rel:"noreferrer",children:Object(P.jsx)(C.a,{avatar:Object(P.jsx)(E.a,{alt:c,src:a}),label:c,color:"primary",variant:"outlined",style:{marginRight:10}},r)})}))})]})};_.defaultProps={data:null,onMount:function(){}};var B=function(e){var t=e.gists,n=e.loading,a=e.gistForkMap,c=e.updateGistForksMap,s=R(),o=r.a.useState(!1),u=Object(i.a)(o,2),l=u[0],j=u[1];return n?Object(P.jsx)(T.a,{}):Object(P.jsx)("div",{className:s.root,children:(t||[]).map((function(e){var t,n=e.id,r=e.html_url,i=e.forks_url,o=e.files,u=e.description,p=Object.keys(o),b=Object(O.a)(new Set(p.map((function(e){return o[e].language})))).filter(Boolean);return Object(P.jsxs)(G.a,{expanded:l===n,onChange:(t=n,function(e,n){j(!!n&&t)}),TransitionProps:{unmountOnExit:!0},children:[Object(P.jsxs)(F.a,{expandIcon:Object(P.jsx)(N.a,{}),"aria-controls":"panel1bh-content",id:"panel1bh-header",children:[Object(P.jsxs)(f.a,{className:s.heading,children:[u,!u&&Object(P.jsx)("span",{style:{color:"#eaeaea",fontSize:10},children:"No Description Available"})]}),Object(P.jsx)(f.a,{className:s.secondaryHeading,children:Object(P.jsx)("a",{href:r,target:"_blank",rel:"noreferrer",children:n})})]}),Object(P.jsx)(L.a,{children:Object(P.jsxs)(f.a,{children:[Object(P.jsx)("div",{className:"filetypes-badges",children:(b||[]).map((function(e){return Object(P.jsx)(C.a,{style:{marginRight:10},label:e})}))}),Object(P.jsx)(_,{data:a[n],onMount:function(){a[n]||q(i,(function(e){return c({id:n,data:e})}))}})]})})]},n)}))})};B.defaultProps={loading:!0,gists:null,gistForkMap:{},updateGistForksMap:function(){}};var D=B,I=function(){var e=Object(g.a)(d.a.mark((function e(t,n,a){var r,c,s,i;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=1,c=50,s=[];case 3:return e.next=5,w.fetch("/users/".concat(t,"/gists"),{method:"GET"},{per_page:c,page:r});case 5:if(i=e.sent,s=[].concat(Object(O.a)(s),Object(O.a)(i)),!(i.length<50)){e.next=11;break}return e.abrupt("break",14);case 11:r+=1;case 12:e.next=3;break;case 14:a(s);case 15:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),U=function(e){var t=e.username,n=r.a.useState(null),a=Object(i.a)(n,2),c=a[0],s=a[1],o=r.a.useState(!0),u=Object(i.a)(o,2),l=u[0],f=u[1],j=r.a.useReducer((function(e,t){var n=t.id,a=t.data;return Object(b.a)(Object(b.a)({},e),{},Object(p.a)({},n,a))}),{}),h=Object(i.a)(j,2),d=h[0],O=h[1];return r.a.useEffect((function(){return I(t,0,s),f(!1),function(){s(null),f(!0)}}),[t]),Object(P.jsx)(D,{gists:c,loading:l,gistForkMap:d,updateGistForksMap:O})},z=n(161),A=n(162),J=n(77),H=n.n(J)()(function(){var e=Object(g.a)(d.a.mark((function e(t,n){var a,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==t){e.next=2;break}return e.abrupt("return",n([]));case 2:return e.next=4,w.fetch("/search/users",{method:"GET"},{q:t});case 4:if(a=e.sent,r=a.items){e.next=8;break}return e.abrupt("return",n([]));case 8:return e.abrupt("return",n(r));case 9:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),300),W=function(e){var t=e.onSelect,n=e.onClear,a=r.a.useState(null),c=Object(i.a)(a,2),s=c[0],o=c[1],u=r.a.useState(""),l=Object(i.a)(u,2),f=l[0],j=l[1],p=r.a.useState([]),h=Object(i.a)(p,2),d=h[0],g=h[1];return r.a.useEffect((function(){f||n(null),H(f,g)}),[f]),Object(P.jsx)(A.a,{className:"autocomplete",getOptionLabel:function(e){return e.login},filterOptions:function(e){return e},options:d,autoComplete:!0,freeSolo:!0,filterSelectedOptions:!0,value:s,onChange:function(e,n){if(g(n?[n].concat(Object(O.a)(d)):d),o(n),n){var a=n.login;t(a)}},onInputChange:function(e,t){j(t)},renderInput:function(e){return Object(P.jsx)(z.a,Object(b.a)(Object(b.a)({},e),{},{label:"Enter Username",variant:"outlined",fullWidth:!0}))},renderOption:function(e){return Object(P.jsx)("div",{children:e.login})}})};W.defaultProps={onClear:function(){}};var K=W,Q=Object(o.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));var V=function(){var e=r.a.useState(null),t=Object(i.a)(e,2),n=t[0],a=t[1],c=Q(),s=r.a.useCallback((function(){a(null)}),[]);return Object(P.jsxs)("div",{className:c.root,children:[Object(P.jsx)(u.a,{position:"static",children:Object(P.jsx)(l.a,{children:Object(P.jsx)(f.a,{variant:"h6",className:c.title,children:"Git my Gist"})})}),Object(P.jsxs)(j.a,{className:"app-root",height:"100%",children:[Object(P.jsx)(K,{onSelect:a,onClear:s}),!!n&&Object(P.jsx)(U,{username:n},n)]})]})},X=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,167)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};s.a.render(Object(P.jsx)(r.a.StrictMode,{children:Object(P.jsx)(V,{})}),document.getElementById("root")),X()},91:function(e,t,n){},92:function(e,t,n){}},[[114,1,2]]]);
//# sourceMappingURL=main.48844bf1.chunk.js.map