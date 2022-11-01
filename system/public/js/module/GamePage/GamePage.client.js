import*as Q from"https://esm.sh/react@18.2.0/react.js";import*as V from"https://esm.sh/react-dom@18.2.0/client.js";import*as J from"https://esm.sh/v96/xstate@4.34.0/es2021/xstate.js";import*as ee from"https://esm.sh/v96/hash-wasm@4.9.0/es2021/hash-wasm.js";var e=Q,H=V;var M=(n,t)=>l=>l<n?n:l>t?t:l,I=(n,t)=>l=>l<n?t:l>t?n:l;var d={NE:1,N:2,NW:4,E:8,W:16,SE:32,S:64,SW:128},U=(n,t,l)=>{let s=I(0,t-1),u=I(0,l-1);return n.map(o=>{if(o.type==="base")return o;if(o.type==="unit"){let{row:i,column:p}=o,f=s(i-1),b=s(i+1),r=u(p-1),m=u(p+1);switch(o.direction){case d.NE:return{...o,row:f,column:r};case d.N:return{...o,row:f,column:p};case d.NW:return{...o,row:f,column:m};case d.E:return{...o,row:i,column:r};case d.W:return{...o,row:i,column:m};case d.SE:return{...o,row:b,column:r};case d.S:return{...o,row:b,column:p};case d.SW:return{...o,row:b,column:m};default:return o}}return o})};var X=n=>n.type==="PLACE_BASE",O=n=>n.type==="PLACE_UNIT",F=({theme:n,row:t,column:l})=>{let s=n.blockSize,u=n.blockSize/2,o=l*s,i=t*s,p=o+u,f=i+u,b=p+s*-1,r=p+s,m=f+s*-1,y=f+s,c=M(b,r),g=M(m,y);return{x:o,y:i,cx:p,cy:f,minX:b,maxX:r,minY:m,maxY:y,halfBlock:u,clampX:c,clampY:g}};function j(n){let{theme:t,index:l,emulatedDelta:s,action:u,column:o,row:i,player:p,onActivate:f=()=>{},blocks:b=[]}=n,r=e.useRef(),{y:m,cx:y,cy:c,clampX:g,clampY:Y,halfBlock:k}=e.useMemo(()=>F({row:i,column:o,theme:t}),[i,o,t]),[W,v]=e.useState({x:0,y:0}),w=e.useMemo(()=>s||W,[W,s]),x=e.useMemo(()=>({x:g(y+w.x),y:Y(c+w.y)}),[w.x,w.y,g,Y,y,c]),S=e.useMemo(()=>{let a=x.x<y+k*-1,h=x.x>y+k,E=!a&&!h,P=x.y<c+k*-1,C=x.y>c+k,z=!P&&!C;switch(!0){case(a&&P):return d.NE;case(E&&P):return d.N;case(h&&P):return d.NW;case(a&&z):return d.E;case(h&&z):return d.W;case(a&&C):return d.SE;case(E&&C):return d.S;case(h&&C):return d.SW;case(E&&z):default:return null}},[x.x,x.y,k,y,c]),[$,_]=e.useState(!1),B=e.useMemo(()=>!!s||$,[!!s,$]),A=e.useMemo(()=>b.find(a=>a.type==="base")?"fill-red-500":B?"fill-slate-700":b.find(a=>a.type==="unit")?"fill-white":"fill-transparent",[b,B]);return u==="PLACE_BASE"?e.createElement("g",{className:"relative z-10"},e.createElement("rect",{onClick:()=>{f({type:u,payload:{type:"base",player:p,row:i,column:o}})},width:t.blockSize,height:t.blockSize,x:o*t.blockSize,y:m,radius:"10",className:A})):u==="PLACE_UNIT"?e.createElement("g",{className:"relative z-10"},e.createElement("rect",{onPointerDown:a=>{a.currentTarget.setPointerCapture(a.pointerId),_(!0)},onTouchMove:a=>{if(B){let h=a.touches[0],E=r.current;v({x:E?w.x+h.pageX-E.pageX:0,y:E?w.y+h.pageY-E.pageY:0}),r.current=h}},onTouchEnd:()=>{r.current=void 0},onPointerMove:a=>{B&&v({x:w.x+a.movementX,y:w.y+a.movementY})},onPointerUp:a=>{a.currentTarget.releasePointerCapture(a.pointerId),S&&f({type:"PLACE_UNIT",payload:{type:"unit",player:p,row:i,column:o,direction:S}}),_(!1),v({x:0,y:0})},onPointerCancel:a=>{a.currentTarget.releasePointerCapture(a.pointerId),S!==null&&f({type:"PLACE_UNIT",payload:{type:"unit",player:p,row:i,column:o,direction:S}}),_(!1),v({x:0,y:0})},width:t.blockSize,height:t.blockSize,x:o*t.blockSize,y:m,radius:"10",className:`select-none ${A} touch-manipulation`}),B?e.createElement(e.Fragment,null,e.createElement("path",{strokeLinecap:"round",className:"stroke-2 stroke-gray-400/30 z-10 relative",x:y,y:c,d:`M${y} ${c} L ${x.x} ${x.y} Z`}),e.createElement("circle",{cx:x.x,cy:x.y,r:t.blockSize*.18,className:"fill-gray-700"})):null):e.createElement("rect",{width:t.blockSize,height:t.blockSize,x:o*t.blockSize,y:m,radius:"10",className:A})}var N=(n,{columns:t})=>Math.floor(n/t),T=(n,{columns:t})=>n%t;function L(n){let{theme:t,children:l,players:s,rows:u,columns:o}=n,{height:i,width:p}=e.useMemo(()=>({height:t.blockSize*u,width:t.blockSize*o}),[t.blockSize,u,o]),f=e.useMemo(()=>new Array(u*o).fill(null).map((b,r)=>{let m=N(r,{columns:o}),y=T(r,{columns:o}),c=m*t.blockSize;return e.createElement("rect",{key:r,width:t.blockSize,height:t.blockSize,x:y*t.blockSize,y:c,radius:"10",strokeWidth:t.gap,className:"relative z-0 select-none stroke-slate-800 fill-transparent"})}),[]);return e.createElement("div",{className:"overflow-hidden bg-slate-900 border-2 border-gray-700 rounded-md relative select-none"},e.createElement("svg",{height:i,width:p,viewBox:`0 0 ${p} ${i}`,className:"relative"},s===2?e.createElement("rect",{x:p/2-2.5,y:"0",height:i,width:5,className:"fill-slate-800 z-0"}):null,f,l))}function G(n){let{theme:t,rows:l,columns:s}=n,[u,o]=e.useState([]),[i,p]=e.useState(!1),f=!!u.find(r=>r.type==="base");e.useEffect(()=>{if(i){let r=setInterval(()=>{o(m=>U(m,l,s))},1e3);return()=>clearInterval(r)}},[i]);let b=e.useMemo(()=>new Array(l*s).fill(null).map((r,m)=>{let y=T(m,{columns:s}),c=N(m,{columns:s});return{column:y,row:c}}),[l,s]);return e.createElement(e.Fragment,null,e.createElement(L,{theme:t,rows:l,columns:s,players:1},b.map(({column:r,row:m},y)=>e.createElement(j,{key:`${r}-${m}-${y}`,blocks:u.filter(({row:c,column:g})=>m===c&&r===g),theme:t,index:y,action:f?"PLACE_UNIT":"PLACE_BASE",player:1,row:m,column:r,onActivate:c=>{X(c)&&o(g=>[...g,c.payload]),O(c)&&(u.find(g=>g.type==="unit"&&g.direction===c.payload.direction&&g.row===c.payload.row&&g.column===c.payload.column)||o(g=>[...g,c.payload]))}}))),e.createElement("div",{className:"flex space-x-2 p-2"},e.createElement("button",{type:"button",onClick:()=>{o(r=>U(r,l,s))},className:"p-2 px-3 bg-slate-900 text-white rounded"},"Move Blocks"),e.createElement("button",{type:"button",onClick:()=>{p(r=>!r)},className:"p-2 px-3 bg-slate-900 text-white rounded"},i?"pause":"play")))}var K=5,Z=9,q={gap:1,blockSize:50};function D(n){return e.useEffect(()=>{try{let t=new WebSocket(`ws://localhost:8080/games/${n.gameHash}`);t.onopen=()=>console.log("onopen",t),t.onmessage=l=>console.log("onmessage",t,l.data),t.onclose=()=>console.log("onclose","Disconnected from server ..."),t.onerror=l=>console.log("onerror",l)}catch(t){console.error("Failed to connect to server ... exiting",t)}},[]),e.createElement("html",{lang:"en-us",className:"h-full w-full"},e.createElement("head",null,e.createElement("meta",{charSet:"utf-8"}),e.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.createElement("meta",{name:"description",content:"Block motion is a live action strategy game where two players aim blocks at each other's bases."}),e.createElement("title",null,"Block motion \u2B05\uFE0F"),e.createElement("style",null,"body {overflow: hidden !important; -webkit-overflow-scrolling: touch;"),e.createElement("link",{rel:"stylesheet",href:"/public/styles.css"}),e.createElement("link",{rel:"icon",href:"data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>\u2B05\uFE0F</text></svg>"}),e.createElement("script",{dangerouslySetInnerHTML:{__html:`window.gameHash="${n?.gameHash}"`}}),e.createElement("script",{type:"module",src:"/public/js/module/GamePage/GamePage.client.js"}),e.createElement("script",{noModule:!0,src:"/public/js/classic/GamePage/GamePage.client.js"})),e.createElement("body",{className:"bg-slate-800 h-full min-h-screen w-full grid place-items-center text-gray-100"},e.createElement("div",null,e.createElement(G,{theme:q,rows:K,columns:Z}))))}H.hydrateRoot(document,e.createElement(D,{gameHash:window.gameHash}));
//# sourceMappingURL=GamePage.client.js.map