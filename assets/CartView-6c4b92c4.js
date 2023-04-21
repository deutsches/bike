import{_ as E,m as j,l as B,r as p,o as c,c as m,a,d as e,n as u,b as r,w as k,e as v,F as C,h as L,t as n,p as b,g as T,v as A}from"./index-5b2c70a7.js";import{N as D,S as N,c as P}from"./NavbarFront-5899f689.js";const{VITE_APP_URL:g,VITE_APP_PATH:y}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"uaena",BASE_URL:"/bike/",MODE:"production",DEV:!1,PROD:!0},O={data(){return{products:[],tempCartList:[],product:{},isLoading:!1,fullPage:!0,form:{user:{name:"",tel:"",email:"",address:""},message:""},loadingStatus:{loadingItem:""},step:1,order:{}}},components:{NavbarFront:D},methods:{...j(P,["removeCartItem","removeAllCart","renderCart"]),nextStep(){this.step===1?this.step=2:this.step=3},backStep(){this.step===2&&(this.step=1)},editQty(l){const o={product_id:l.product_id,qty:l.qty};this.$http.put(`${g}v2/api/${y}/cart/${l.id}`,{data:o}).then(_=>{_.data.success&&this.renderCart()}).catch(_=>{alert(_.data.message)})},createOrder(){this.cartList.length!==0?(this.tempCartList=this.cartList,this.$http.post(`${g}v2/api/${y}/order`,{data:this.form}).then(l=>{l.data.success&&(N.fire(l.data.message),this.$refs.form.resetForm(),this.renderCart(),this.nextStep(),this.getOrderInfo(l.data.orderId))}).catch(l=>{alert(l)})):N.fire("請至少加入一項產品至購物車!")},moneyFormat(l){return l.replace(new RegExp("\\B(?<!\\.\\d*)(?=(\\d{3})+(?!\\d))","g"),",")},getOrderInfo(l){this.$http.get(`${g}v2/api/${y}/order/${l}`).then(o=>{o.data.success&&(this.order=o.data.order)}).catch(o=>{alert(o)})}},mounted(){this.renderCart()},computed:{...B(P,["cartList","totalPrice"])}},R={class:"wrap"},M=e("header",{class:"header-chart position-relative",style:{}},[e("h2",{class:"d-flex align-items-center justify-content-center text-white chart"},"訂單確認")],-1),H={class:"container pb-4"},Q={class:"row"},z={class:"position-relative mt-5 mb-5 m-auto step"},G=e("div",{class:"progress bg-dark",style:{height:"1px"}},[e("div",{class:"progress-bar",role:"progressbar","aria-valuenow":"50","aria-valuemin":"0","aria-valuemax":"100"})],-1),J=e("br",null,null,-1),K=e("br",null,null,-1),W=e("br",null,null,-1),X={key:0,class:"m-auto",style:{"max-width":"540px"}},Y={class:"d-flex justify-content-between"},Z=e("i",{class:"bi bi-caret-left-fill"},null,-1),$=["disabled"],ee=e("i",{class:"bi bi-trash"},null,-1),te={class:"row g-3"},se={class:"col-5 col-lg-6"},oe=["src"],le={class:"col-7 col-lg-6"},ie={class:"card-body p-0 h-100 d-flex flex-column"},ne={class:"d-flex justify-content-between"},ae={class:""},re=["disabled","onClick"],de={key:0,class:"fas fa-spinner fa-pulse"},ce=e("label",{for:"count"},"數量：",-1),me=["onUpdate:modelValue","onBlur"],ue={class:"mt-auto text-end"},pe={class:"text-end"},_e={class:"text-center"},he=["disabled"],be={key:1,class:"py-4 row justify-content-center"},fe={class:"mb-3"},ve=e("label",{for:"inputName",class:"col-sm-2 col-form-label"},"姓名",-1),ge={class:"mb-3"},ye=e("label",{for:"inputTel",class:"col-sm-2 col-form-label"},"電話",-1),xe={class:"mb-3"},Ve=e("label",{for:"email",class:"col-sm-2 col-form-label"},"Email",-1),we={class:"mb-3"},Se=e("label",{for:"inputTime",class:"col-sm-2 col-form-label"},"日期",-1),ke={class:"mb-3"},Ce=e("label",{for:"message",class:"form-label"},"留言",-1),Le={class:"d-flex justify-content-between"},Te=e("i",{class:"bi bi-caret-left-fill"},null,-1),Ae=e("button",{type:"submit",class:"btn btn-info"},"送出預約單",-1),Ne={key:2,class:"m-auto py-4 row justify-content-center",style:{"max-width":"540px"}},Pe=e("p",{class:"text-center lead"},"感謝您！腳踏車已預定成功！",-1),Fe=e("p",null,"您的訂購資訊入下：",-1),Ie=e("div",null,[r(" 訂購車型如下： "),e("button",{type:"button","data-bs-toggle":"collapse",href:"#collapse",class:"btn btn-primary"}," 展開細節 ")],-1),Ue={id:"collapse",class:"collapse"},qe={class:"row g-3"},Ee={class:"col-5 col-lg-6"},je=["src"],Be={class:"col-7 col-lg-6"},De={class:"card-body p-0 h-100 d-flex flex-column"},Oe={class:"d-flex justify-content-between"},Re={class:""},Me={class:"mt-auto text-end"},He={class:"text-end mt-3"},Qe={class:"text-center lead mt-5"};function ze(l,o,_,Ge,t,d){var x,V,w,S;const F=p("NavbarFront"),I=p("RouterLink"),f=p("VField"),h=p("error-message"),U=p("v-field"),q=p("v-form");return c(),m("div",R,[a(F),M,e("div",H,[e("div",Q,[e("div",z,[G,e("div",{style:{width:"100px"},class:u([{stepActive:t.step===1},"step text-center position-absolute top-0 start-0 translate-middle"])},[r(" Step 1"),J,r("確認購物車 ")],2),e("div",{style:{width:"100px"},class:u([{stepActive:t.step===2},"step text-center position-absolute top-0 start-50 translate-middle"])},[r(" Step 2"),K,r("填寫資料 ")],2),e("div",{style:{width:"100px"},class:u([{stepActive:t.step===3},"step text-center position-absolute top-0 start-100 translate-middle"])},[r(" Step 3"),W,r("完成訂單 ")],2)]),t.step===1?(c(),m("div",X,[e("div",Y,[a(I,{class:"btn text-center",to:"/products"},{default:k(()=>[Z,r("  繼續購物 ")]),_:1}),e("button",{type:"button",class:"btn",onClick:o[0]||(o[0]=v((...s)=>l.removeAllCart&&l.removeAllCart(...s),["prevent"])),disabled:!l.cartList.length},[ee,r(" 清空購物車 ")],8,$)]),(c(!0),m(C,null,L(l.cartList,s=>(c(),m("div",{class:"card mb-3 border-0 border-bottom p-2",key:s.id},[e("div",te,[e("div",se,[e("img",{src:s.product.imageUrl,class:"img-fluid",alt:"..."},null,8,oe)]),e("div",le,[e("div",ie,[e("div",ne,[e("h5",ae,n(s.product.title),1),e("button",{disabled:t.loadingStatus.loadingItem===s.id,type:"button",class:"btn btn-outline-danger btn-sm",onClick:i=>l.removeCartItem(s.id)},[t.loadingStatus.loadingItem===s.id?(c(),m("i",de)):b("",!0),r(" x ")],8,re)]),ce,T(e("input",{id:"count",type:"number",min:"1","onUpdate:modelValue":i=>s.qty=i,onBlur:i=>d.editQty(s)},null,40,me),[[A,s.qty]]),e("p",ue,"NT$"+n(d.moneyFormat(s.final_total.toString())),1)])])])]))),128)),e("p",pe,"總計： NT$"+n(d.moneyFormat(l.totalPrice.toString())),1),e("div",_e,[e("button",{type:"button",class:"btn btn-outline-primary",onClick:o[1]||(o[1]=v((...s)=>d.nextStep&&d.nextStep(...s),["prevent"])),disabled:!l.cartList.length}," 確認購物車 ",8,he)])])):b("",!0),t.step===2?(c(),m("div",be,[a(q,{ref:"form",class:"col-6",onSubmit:d.createOrder},{default:k(({errors:s})=>[e("div",fe,[ve,a(f,{type:"text",class:u(["form-control",{"is-invalid":s.姓名}]),id:"inputName",name:"姓名",placeholder:"請輸入姓名",rules:"required",modelValue:t.form.user.name,"onUpdate:modelValue":o[2]||(o[2]=i=>t.form.user.name=i)},null,8,["class","modelValue"]),a(h,{name:"姓名",class:"invalid-feedback"})]),e("div",ge,[ye,a(f,{type:"tel",name:"電話",class:u(["form-control",{"is-invalid":s.電話}]),placeholder:"請輸入電話",id:"inputTel",rules:"required|min:8|max:10|",modelValue:t.form.user.tel,"onUpdate:modelValue":o[3]||(o[3]=i=>t.form.user.tel=i)},null,8,["class","modelValue"]),a(h,{name:"電話",class:"invalid-feedback"})]),e("div",xe,[Ve,a(f,{type:"email",name:"email",class:u(["form-control",{"is-invalid":s.email}]),id:"email",rules:"email|required",modelValue:t.form.user.email,"onUpdate:modelValue":o[4]||(o[4]=i=>t.form.user.email=i)},null,8,["class","modelValue"]),a(h,{name:"email",class:"invalid-feedback"})]),e("div",we,[Se,a(U,{type:"date",name:"日期",class:u(["form-control",{"is-invalid":s.日期}]),id:"inputTime",rules:"required",modelValue:t.form.user.address,"onUpdate:modelValue":o[5]||(o[5]=i=>t.form.user.address=i)},null,8,["class","modelValue"]),a(h,{name:"日期",class:"invalid-feedback"})]),e("div",ke,[Ce,T(e("textarea",{class:"form-control",id:"message",name:"message",rows:"3","onUpdate:modelValue":o[6]||(o[6]=i=>t.form.message=i)},null,512),[[A,t.form.message]])]),e("div",Le,[e("button",{type:"button",class:"btn btn-info",onClick:o[7]||(o[7]=v((...i)=>d.backStep&&d.backStep(...i),["prevent"]))},[Te,r(" 回購物車 ")]),Ae])]),_:1},8,["onSubmit"])])):b("",!0),t.step===3?(c(),m("div",Ne,[Pe,Fe,e("p",null,"編號："+n(t.order.id),1),e("p",null,"訂購時間："+n(new Date(t.order.create_at*1e3).toLocaleString()),1),e("p",null,"姓名："+n((x=t.order.user)==null?void 0:x.name),1),e("p",null,"電話："+n((V=t.order.user)==null?void 0:V.tel),1),e("p",null,"信箱："+n((w=t.order.user)==null?void 0:w.email),1),e("p",null,"備註："+n(t.order.message),1),Ie,e("div",Ue,[(c(!0),m(C,null,L(t.tempCartList,s=>(c(),m("div",{class:"card mb-3 border-0 border-bottom p-2",key:s.id},[e("div",qe,[e("div",Ee,[e("img",{src:s.product.imageUrl,class:"img-fluid",alt:"..."},null,8,je)]),e("div",Be,[e("div",De,[e("div",Oe,[e("h5",Re,n(s.product.title),1)]),e("p",null,"數量："+n(s.qty),1),e("p",Me,"NT$"+n(d.moneyFormat(s.final_total.toString())),1)])])])]))),128)),e("p",He,"總計： NT$"+n(d.moneyFormat(t.order.total.toString())),1)]),e("p",Qe,"期待"+n((S=t.order.user)==null?void 0:S.address)+"與您相見~",1)])):b("",!0)])])])}const We=E(O,[["render",ze]]);export{We as default};
