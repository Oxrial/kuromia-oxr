var s=Object.defineProperty;var p=(t,i,r)=>i in t?s(t,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[i]=r;var e=(t,i,r)=>p(t,typeof i!="symbol"?i+"":i,r);import{s as a}from"./index-CBdB34T2.js";import{H as d,a as u}from"./vidstack-CSv7rfHP-E_Pg_Byj.js";import"./index-Cgdqt2QU.js";import"./vue-DwVGnbwD.js";import"./element-B5WS0eiH.js";import"./plugin-vueexport-helper-DlAUqK2U.js";import"./vidstack-DSYpsFWk-ivT7L_7T.js";class A extends d{constructor(r,o){super(r,o);e(this,"$$PROVIDER_TYPE","AUDIO");e(this,"airPlay");a(()=>{this.airPlay=new u(this.media,o)},this.scope)}get type(){return"audio"}setup(){super.setup(),this.type==="audio"&&this.ctx.notify("provider-setup",this)}get audio(){return this.media}}export{A as AudioProvider};