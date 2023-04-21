import{N as x,P as I,A as L,S as V,a as B}from"./pagination.min-285d6f89.js";import{_ as y,o as a,c as l,b as d,d as t,L as N,m as U,r as n,a as c,q as b,F as v,h as f,w as p,t as i,s as E}from"./index-5b2c70a7.js";import{N as S,c as T}from"./NavbarFront-5899f689.js";import{A as R}from"./AddCartButton-c38bdb5b.js";const D={data(){return{}},props:["id"],methods:{go(s){console.log(s),this.$router.push("/products"),console.log("1")}}},F=t("i",{class:"bi bi-search"},null,-1);function M(s,r,u,P,o,_){return a(),l("button",{type:"button",onClick:r[0]||(r[0]=h=>_.go(u.id))},[F,d("  查看商品 ")])}const H=y(D,[["render",M]]);const{VITE_APP_URL:w,VITE_APP_PATH:O}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"uaena",BASE_URL:"/bike/",MODE:"production",DEV:!1,PROD:!0},j={data(){return{product:{imagesUrl:[]},products:[],tempArray:[],modules:[x,I,L],mainImg:"",isLoading:!1}},components:{Swiper:V,SwiperSlide:B,NavbarFront:S,Loading:N,AddCartButton:R,goButton:H},methods:{...U(T,["addCart"]),grtProductInfo(s){this.$http.get(`${w}v2/api/${O}/product/${s}`).then(r=>{this.product=r.data.product,this.mainImg=this.product.imageUrl,this.product.imagesUrl.push(this.product.imageUrl),this.isLoading=!1}).catch(r=>{alert(r.data.message)})},getProducts(){this.$http.get(`${w}v2/api/uaena/products/all`).then(s=>{this.products=s.data.products,this.products.sort(()=>Math.random()-.5),this.tempArray.length=0,this.products.forEach((r,u)=>(u<6&&this.tempArray.push(r),!0))}).catch(s=>{alert(s)})},go(s){this.$router.push(`/product/${s}`)}},mounted(){this.isLoading=!0;const{id:s}=this.$route.params;this.grtProductInfo(s),this.getProducts()},watch:{$route(){this.$router.go()}}},q={style:{"background-color":"#fffcf7"}},z=t("header",{class:"header-product position-relative",style:{}},[t("h2",{class:"d-flex align-items-center justify-content-center text-white product"},"車種介紹")],-1),G={class:"container pt-8"},J={class:"row"},K={class:"col-12 col-md-6",style:{}},Q={class:"row"},W={class:"mainImg col-12 mb-4"},X=["onClick","onMouseover"],Y={class:"col-12 col-md-6"},Z={"aria-label":"breadcrumb"},tt={class:"breadcrumb"},st={class:"breadcrumb-item"},ot={class:"breadcrumb-item"},et=t("li",{class:"breadcrumb-item active","aria-current":"page"},"Detail",-1),rt={class:"py-5"},nt=t("h2",{class:"text-center mb-4"},"您可能也喜歡",-1),ct={class:"card shadow"},it={class:"position-relative card-img overflow-hidden"},at=["src"],dt=["onClick"],lt=t("i",{class:"bi bi-search"},null,-1),ut={class:"card-body"},pt={class:"card-title fw-bold text-center mb-2"},_t={class:"text-center mb-2"};function ht(s,r,u,P,o,_){const h=n("loading"),k=n("NavbarFront"),m=n("RouterLink"),A=n("AddCartButton"),$=n("swiper-slide"),C=n("swiper");return a(),l("div",q,[c(h,{active:o.isLoading,"onUpdate:active":r[0]||(r[0]=e=>o.isLoading=e),"can-cancel":!0},null,8,["active"]),c(k),z,t("div",G,[t("div",J,[t("div",K,[t("div",Q,[t("div",W,[t("span",{class:"",style:b({"background-image":`url(${o.mainImg})`})},null,4)]),(a(!0),l(v,null,f(o.product.imagesUrl,e=>(a(),l("div",{class:"subImg col-4",key:e+1,onClick:g=>o.mainImg=e,onMouseover:g=>o.mainImg=e},[t("span",{class:"",style:b({"background-image":`url(${e})`})},null,4)],40,X))),128))])]),t("div",Y,[t("nav",Z,[t("ol",tt,[t("li",st,[c(m,{to:"/"},{default:p(()=>[d("Home")]),_:1})]),t("li",ot,[c(m,{to:"/Products"},{default:p(()=>[d("全部車種")]),_:1})]),et])]),t("h2",null,i(o.product.title),1),t("p",null,i(o.product.description),1),t("p",null,i(o.product.content),1),t("p",null,[d(" 租車價$ "),t("span",null,i(o.product.price),1)]),t("button",{class:"btn btn-outline-primary",onClick:r[1]||(r[1]=e=>s.addCart(o.product.id))},"加入購物車")])]),t("div",rt,[nt,c(C,{class:"w-100",modules:o.modules,autoplay:{delay:2e3},loop:!0,breakpoints:{640:{slidesPerView:1,spaceBetween:0},1024:{slidesPerView:3,spaceBetween:30}}},{default:p(()=>[(a(!0),l(v,null,f(o.products,e=>(a(),E($,{class:"",key:e.id},{default:p(()=>[t("div",ct,[t("div",it,[t("img",{class:"card-img-top",src:e.imageUrl,alt:""},null,8,at),t("button",{type:"button",onClick:g=>_.go(e.id),class:"btn rounded-0 viewProduct text-center position-absolute w-100 py-2"},[lt,d("  查看商品 ")],8,dt)]),t("div",ut,[t("h5",pt,i(e.title),1),t("p",_t,[d(" 租車價 NT $ "),t("span",null,i(e.price),1)]),c(A,{"product-id":e.id,class:"btn btn-outline-white border-top w-100 addCart"},null,8,["product-id"])])])]),_:2},1024))),128))]),_:1},8,["modules"])])])])}const ft=y(j,[["render",ht]]);export{ft as default};
