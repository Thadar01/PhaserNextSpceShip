(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[276],{9079:function(e,t,n){"use strict";var r,s;e.exports=(null==(r=n.g.process)?void 0:r.env)&&"object"==typeof(null==(s=n.g.process)?void 0:s.env)?n.g.process:n(3127)},3127:function(e){!function(){var t={229:function(e){var t,n,r,s=e.exports={};function o(){throw Error("setTimeout has not been defined")}function i(){throw Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===o||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:o}catch(e){t=o}try{n="function"==typeof clearTimeout?clearTimeout:i}catch(e){n=i}}();var c=[],u=!1,l=-1;function h(){u&&r&&(u=!1,r.length?c=r.concat(c):l=-1,c.length&&d())}function d(){if(!u){var e=a(h);u=!0;for(var t=c.length;t;){for(r=c,c=[];++l<t;)r&&r[l].run();l=-1,t=c.length}r=null,u=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===i||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function f(e,t){this.fun=e,this.array=t}function g(){}s.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new f(e,t)),1!==c.length||u||a(d)},f.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=g,s.addListener=g,s.once=g,s.off=g,s.removeListener=g,s.removeAllListeners=g,s.emit=g,s.prependListener=g,s.prependOnceListener=g,s.listeners=function(e){return[]},s.binding=function(e){throw Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(e){throw Error("process.chdir is not supported")},s.umask=function(){return 0}}},n={};function r(e){var s=n[e];if(void 0!==s)return s.exports;var o=n[e]={exports:{}},i=!0;try{t[e](o,o.exports,r),i=!1}finally{i&&delete n[e]}return o.exports}r.ab="//";var s=r(229);e.exports=s}()},241:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return p}});var r=n(7437),s=n(2265),o=n(4110);class i extends o.Scene{preload(){this.load.image("background","assets/bg.png")}create(){this.scene.start("Preloader")}constructor(){super("Boot")}}let a=new o.Events.EventEmitter;class c extends o.Scene{create(){this.camera=this.cameras.main,this.camera.setBackgroundColor(16711680),this.background=this.add.image(512,384,"background"),this.background.setAlpha(.5),this.gameOverText=this.add.text(512,384,"Game Over",{fontFamily:"Arial Black",fontSize:64,color:"#ffffff",stroke:"#000000",strokeThickness:8,align:"center"}).setOrigin(.5).setDepth(100),a.emit("current-scene-ready",this)}changeScene(){this.scene.start("MainMenu")}constructor(){super("GameOver")}}class u extends o.Scene{create(){this.camera=this.cameras.main,this.camera.setBackgroundColor(65280),this.background=this.add.image(512,384,"background"),this.background.setAlpha(.5),this.gameText=this.add.text(512,384,"Make something fun!\nand share it with us:\nsupport@phaser.io",{fontFamily:"Arial Black",fontSize:38,color:"#ffffff",stroke:"#000000",strokeThickness:8,align:"center"}).setOrigin(.5).setDepth(100),a.emit("current-scene-ready",this)}changeScene(){this.scene.start("GameOver")}constructor(){super("Game")}}class l extends o.Scene{create(){this.background=this.add.image(512,384,"background"),this.logo=this.add.image(512,300,"logo").setDepth(100),this.title=this.add.text(512,460,"Main Menu",{fontFamily:"Arial Black",fontSize:38,color:"#ffffff",stroke:"#000000",strokeThickness:8,align:"center"}).setOrigin(.5).setDepth(100),a.emit("current-scene-ready",this)}changeScene(){this.logoTween&&(this.logoTween.stop(),this.logoTween=null),this.scene.start("Game")}moveLogo(e){this.logoTween?this.logoTween.isPlaying()?this.logoTween.pause():this.logoTween.play():this.logoTween=this.tweens.add({targets:this.logo,x:{value:750,duration:3e3,ease:"Back.easeInOut"},y:{value:80,duration:1500,ease:"Sine.easeOut"},yoyo:!0,repeat:-1,onUpdate:()=>{e&&e({x:Math.floor(this.logo.x),y:Math.floor(this.logo.y)})}})}constructor(){super("MainMenu")}}class h extends o.Scene{init(){this.add.image(512,384,"background"),this.add.rectangle(512,384,468,32).setStrokeStyle(1,16777215);let e=this.add.rectangle(282,384,4,28,16777215);this.load.on("progress",t=>{e.width=4+460*t})}preload(){this.load.setPath("assets"),this.load.image("logo","logo.png"),this.load.image("star","star.png")}create(){this.scene.start("MainMenu")}constructor(){super("Preloader")}}let d={type:o.AUTO,width:1024,height:768,parent:"game-container",backgroundColor:"#028af8",scene:[i,h,l,u,c]};var f=e=>new o.Game({...d,parent:e});let g=(0,s.forwardRef)(function(e,t){let{currentActiveScene:n}=e,o=(0,s.useRef)(null);return(0,s.useLayoutEffect)(()=>(null===o.current&&(o.current=f("game-container"),"function"==typeof t?t({game:o.current,scene:null}):t&&(t.current={game:o.current,scene:null})),()=>{o.current&&(o.current.destroy(!0),null!==o.current&&(o.current=null))}),[t]),(0,s.useEffect)(()=>(a.on("current-scene-ready",e=>{n&&"function"==typeof n&&n(e),"function"==typeof t?t({game:o.current,scene:e}):t&&(t.current={game:o.current,scene:e})}),()=>{a.removeListener("current-scene-ready")}),[n,t]),(0,r.jsx)("div",{id:"game-container"})});var p=function(){let[e,t]=(0,s.useState)(!0),n=(0,s.useRef)(null),[o,i]=(0,s.useState)({x:0,y:0});return(0,r.jsxs)("div",{id:"app",children:[(0,r.jsx)(g,{ref:n,currentActiveScene:e=>{t("MainMenu"!==e.scene.key)}}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{children:(0,r.jsx)("button",{className:"button",onClick:()=>{if(n.current){let e=n.current.scene;e&&e.changeScene()}},children:"Change Scene"})}),(0,r.jsx)("div",{children:(0,r.jsx)("button",{disabled:e,className:"button",onClick:()=>{if(n.current){let e=n.current.scene;e&&"MainMenu"===e.scene.key&&e.moveLogo(e=>{let{x:t,y:n}=e;i({x:t,y:n})})}},children:"Toggle Movement"})}),(0,r.jsxs)("div",{className:"spritePosition",children:["Sprite Position:",(0,r.jsx)("pre",{children:"{\n  x: ".concat(o.x,"\n  y: ").concat(o.y,"\n}")})]}),(0,r.jsx)("div",{children:(0,r.jsx)("button",{className:"button",onClick:()=>{if(n.current){let e=n.current.scene;if(e){let t=Phaser.Math.Between(64,e.scale.width-64),n=Phaser.Math.Between(64,e.scale.height-64),r=e.add.sprite(t,n,"star");e.add.tween({targets:r,duration:500+1e3*Math.random(),alpha:0,yoyo:!0,repeat:-1})}}},children:"Add New Sprite"})})]})]})}}}]);