"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[671],{3501:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return o},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return u},default:function(){return d}});var n=a(7896),r=a(1461),i=(a(2784),a(876)),l=["components"],o={sidebar_position:-100,sidebar_label:"Intro"},s="React async states",p={unversionedId:"intro",id:"intro",isDocsHomePage:!1,title:"React async states",description:"A multi-paradigm React state management library.",source:"@site/docs/intro.md",sourceDirName:".",slug:"/intro",permalink:"/react-async-states/docs/intro",editUrl:"https://github.com/incepter/react-async-states/edit/main/packages/docs/docs/intro.md",tags:[],version:"current",sidebarPosition:-100,frontMatter:{sidebar_position:-100,sidebar_label:"Intro"},sidebar:"tutorialSidebar",next:{title:"Use cases",permalink:"/react-async-states/docs/use-cases"}},u=[{value:"What is this ?",id:"what-is-this-",children:[],level:2},{value:"Main features",id:"main-features",children:[],level:2},{value:"Concepts and definitions",id:"concepts-and-definitions",children:[{value:"What is a producer function ?",id:"what-is-a-producer-function-",children:[],level:3},{value:"What is the library&#39;s state shape:",id:"what-is-the-librarys-state-shape",children:[],level:3},{value:"What are the possible state transitions:",id:"what-are-the-possible-state-transitions",children:[],level:3},{value:"How my app will look like with the library:",id:"how-my-app-will-look-like-with-the-library",children:[],level:3}],level:2},{value:"Motivations",id:"motivations",children:[],level:2},{value:"Installation",id:"installation",children:[],level:2}],c={toc:u};function d(e){var t=e.components,o=(0,r.Z)(e,l);return(0,i.kt)("wrapper",(0,n.Z)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"react-async-states"},"React async states"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"A multi-paradigm React state management library.")),(0,i.kt)("h2",{id:"what-is-this-"},"What is this ?"),(0,i.kt)("p",null,"This is a multi-paradigm library for decentralized state management in React.\nIt aims to facilitate and automate working with ","[a]","synchronous states while sharing them.\nIt was designed to help us reduce the needed boilerplate (code/files)\nto achieve great and effective results."),(0,i.kt)("h2",{id:"main-features"},"Main features"),(0,i.kt)("p",null,"The features that make this library special are:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Easy to use and Minimal API (",(0,i.kt)("inlineCode",{parentName:"li"},"useAsyncState"),")."),(0,i.kt)("li",{parentName:"ul"},"Tiny library with 0 dependencies, only react as a peer dependency,\nand should target all react environments."),(0,i.kt)("li",{parentName:"ul"},"Run pure/side effects, abort them and/or replace state anytime."),(0,i.kt)("li",{parentName:"ul"},"Run pure/side effects either declaratively via dependencies or imperatively."),(0,i.kt)("li",{parentName:"ul"},"Contains state ",(0,i.kt)("inlineCode",{parentName:"li"},"status")," by default (initial, pending, success, error & aborted)."),(0,i.kt)("li",{parentName:"ul"},"Supports many forms on functions (async/await, promises, generators, reducers...)."),(0,i.kt)("li",{parentName:"ul"},"Debounce and throttle calls."),(0,i.kt)("li",{parentName:"ul"},"Bidirectional abort binding that lets you register an ",(0,i.kt)("inlineCode",{parentName:"li"},"abort callback")," to\neasily abort fetch requests or perform cleanups."),(0,i.kt)("li",{parentName:"ul"},"Dynamic creation and sharing of states at runtime."),(0,i.kt)("li",{parentName:"ul"},"Share states inside and outside the context provider."),(0,i.kt)("li",{parentName:"ul"},"Subscribe and react to selected portions of state while\ncontrolling when to re-render."),(0,i.kt)("li",{parentName:"ul"},"Fork an asynchronous state to re-use its function without\nimpacting the original state value."),(0,i.kt)("li",{parentName:"ul"},"Hoist states to provider on demand (aka: injection)."),(0,i.kt)("li",{parentName:"ul"},"Supports cache, async cache loading and persisting."),(0,i.kt)("li",{parentName:"ul"},"Automatic cleanup/reset on dependencies change (includes unmount)."),(0,i.kt)("li",{parentName:"ul"},"React 18+ friendly (already supported through the ",(0,i.kt)("inlineCode",{parentName:"li"},"read()")," API)"),(0,i.kt)("li",{parentName:"ul"},"Powerful selectors.")),(0,i.kt)("h2",{id:"concepts-and-definitions"},"Concepts and definitions"),(0,i.kt)("p",null,"The library gives you the state value and full control over it,\nthe state of the library is composed of four properties:\n",(0,i.kt)("inlineCode",{parentName:"p"},"status"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"data"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"props")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"timestamp"),",\nwhere the ",(0,i.kt)("inlineCode",{parentName:"p"},"data")," is returned (or ",(0,i.kt)("inlineCode",{parentName:"p"},"thrown"),")\nfrom your function: called the ",(0,i.kt)("inlineCode",{parentName:"p"},"the producer function"),"."),(0,i.kt)("h3",{id:"what-is-a-producer-function-"},"What is a producer function ?"),(0,i.kt)("p",null,"The producer function is a javascript function, and it is responsible for\nreturning the state's ",(0,i.kt)("inlineCode",{parentName:"p"},"data"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"export type Producer<T> =\n  ((props: ProducerProps<T>) => (T | Promise<T> | Generator<any, T, any>));\n")),(0,i.kt)("p",null,"It may be:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"A regular function returning a ",(0,i.kt)("inlineCode",{parentName:"li"},"Promise")," or ",(0,i.kt)("inlineCode",{parentName:"li"},"thenable")," object."),(0,i.kt)("li",{parentName:"ul"},"A regular function returning a value (reducers, async reducers, mixed...)."),(0,i.kt)("li",{parentName:"ul"},"An asynchronous function with ",(0,i.kt)("inlineCode",{parentName:"li"},"async/await")," syntax."),(0,i.kt)("li",{parentName:"ul"},"A ",(0,i.kt)("inlineCode",{parentName:"li"},"generator")," (sagas...)."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"undefined")," to replace the state synchronously any time with the desired value.")),(0,i.kt)("h3",{id:"what-is-the-librarys-state-shape"},"What is the library's state shape:"),(0,i.kt)("p",null,"The library's state value is composed of four properties:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Property"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"data")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"T")),(0,i.kt)("td",{parentName:"tr",align:null},"The returned data from the ",(0,i.kt)("inlineCode",{parentName:"td"},"producer function"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"status")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"initial,pending,success,error,aborted")),(0,i.kt)("td",{parentName:"tr",align:null},"The status of the state")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"props")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"ProducerProps")),(0,i.kt)("td",{parentName:"tr",align:null},"The argument object that the producer was ran with (the ",(0,i.kt)("inlineCode",{parentName:"td"},"props"),")")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"timestamp")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"number")),(0,i.kt)("td",{parentName:"tr",align:null},"the time (",(0,i.kt)("inlineCode",{parentName:"td"},"Date.now()"),") where the state was constructed")))),(0,i.kt)("h3",{id:"what-are-the-possible-state-transitions"},"What are the possible state transitions:"),(0,i.kt)("p",null,"The following image shows the possible state transitions:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:a(8384).Z})),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"1- The library supports synchronous states as well."),(0,i.kt)("p",{parentName:"div"},"If the producer function returns a value besides a ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise")," or a ",(0,i.kt)("inlineCode",{parentName:"p"},"Generator"),",\nit is considered synchronous and pass directly to ",(0,i.kt)("inlineCode",{parentName:"p"},"success")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"error")," state."),(0,i.kt)("p",{parentName:"div"},"2- The producer's execution is wrapped inside try catch block, so any thrown\nerror will be received as state with ",(0,i.kt)("inlineCode",{parentName:"p"},"error")," status:"),(0,i.kt)("pre",{parentName:"div"},(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},'state = {\n  data: e,// the catched error\n  status: "error",\n  props: {}, // the producer\'s parameter when it was ran\n  timestamp: 123,\n}\n')))),(0,i.kt)("h3",{id:"how-my-app-will-look-like-with-the-library"},"How my app will look like with the library:"),(0,i.kt)("p",null,"In general, here how you will be using the library:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"First you define your producer function (aka: reducer, saga, thunk...)\nand give it its unique name. This function shall\nreceive a powerful single argument object called the ",(0,i.kt)("inlineCode",{parentName:"li"},"props")," (or ",(0,i.kt)("inlineCode",{parentName:"li"},"argv"),").\nThis function may take any of the supported forms."),(0,i.kt)("li",{parentName:"ul"},"Second, you define a provider that will host your asynchronous states and payload.\nIt needs from you for every async state entry the following:\n",(0,i.kt)("inlineCode",{parentName:"li"},"key"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"producer")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"initialValue")," or a source object."),(0,i.kt)("li",{parentName:"ul"},"Later, from any point in your app, you can use ",(0,i.kt)("inlineCode",{parentName:"li"},"useAsyncState(key)"),"\nor ",(0,i.kt)("inlineCode",{parentName:"li"},"useAsyncStateSelector(key)")," to get the state\nbased on your needs.")),(0,i.kt)("p",null,"After mounting your app, it will more likely appear like this:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:a(5991).Z})),(0,i.kt)("h2",{id:"motivations"},"Motivations"),(0,i.kt)("p",null,"Managing state using React native APIs or third party libraries ain't an easy\ntask. Let's talk about the parts we miss:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Combining synchronous and asynchronous effects."),(0,i.kt)("li",{parentName:"ul"},"Automatically reset a state when you no longer use it."),(0,i.kt)("li",{parentName:"ul"},"Dealing with concurrent asynchronous operations' callbacks."),(0,i.kt)("li",{parentName:"ul"},"Dynamically share states, subscribe and have full control over them."),(0,i.kt)("li",{parentName:"ul"},"Select a part of a state and re-render only when you decide that it changed."),(0,i.kt)("li",{parentName:"ul"},"Share state in all directions of a react app, inside and outside context providers."),(0,i.kt)("li",{parentName:"ul"},"The need to add additional state values each time to represent loading and error states."),(0,i.kt)("li",{parentName:"ul"},"Automatically cancel asynchronous operations when the component unmounts, or dependencies change."),(0,i.kt)("li",{parentName:"ul"},"Cannot automatically declare and share a state from a component and subscribe to it from other parts of the app.")),(0,i.kt)("p",null,"Without these aspects, your application will surely be in a mess, when you get\nto see search results of the very early search operation, when you have to do\nover-engineered stuff to support a simple thing such as cancelling a fetch request\nand a lot of other messy stuff."),(0,i.kt)("h2",{id:"installation"},"Installation"),(0,i.kt)("p",null,"The library is available as a package on NPM for use with a module bundler or in a Node application:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# NPM\nnpm install react-async-states\n\n# YARN\nyarn add react-async-states\n")))}d.isMDXComponent=!0},876:function(e,t,a){a.d(t,{Zo:function(){return u},kt:function(){return m}});var n=a(2784);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},u=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=p(a),m=r,h=d["".concat(s,".").concat(m)]||d[m]||c[m]||i;return a?n.createElement(h,l(l({ref:t},u),{},{components:a})):n.createElement(h,l({ref:t},u))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=a[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},5991:function(e,t,a){t.Z=a.p+"assets/images/provider-app-52985defb5bbe84312124c4d418f0823.png"},8384:function(e,t,a){t.Z=a.p+"assets/images/state-transitions-1140f9f064fef7abea6bb559c1841b39.png"}}]);