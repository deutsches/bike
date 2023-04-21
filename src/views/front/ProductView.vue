<template>
  <div style="background-color: #fffcf7">
    <loading v-model:active="isLoading" :can-cancel="true" />
    <NavbarFront></NavbarFront>
    <header class="header-product position-relative" style="">
      <h2 class="d-flex align-items-center justify-content-center text-white product">車種介紹</h2>
    </header>
    <div class="container pt-8">
      <div class="row">
        <div class="col-12 col-md-6" style="">
          <!-- <swiper
            :slides-per-view="1"
            :space-between="50"
            :modules="modules"
            navigation
            :autoplay="{ delay: 5000 }"
            :loop="true"
            :pagination="{ clickable: true }"
          >
            <swiper-slide>
              <img :src="product.imageUrl" alt="" />
            </swiper-slide>
            <swiper-slide v-for="image in product.imagesUrl" :key="image + 1">
              <img :src="image" alt="" />
            </swiper-slide>
          </swiper> -->
          <div class="row">
            <div class="mainImg col-12 mb-4">
              <span class="" :style="{ 'background-image': `url(${mainImg})` }"></span>
            </div>
            <div class="subImg col-4"  v-for="image in product.imagesUrl" :key="image + 1"
            @click="mainImg = image"
            @mouseover="mainImg = image">
              <span class=""
              :style="{ 'background-image': `url(${image})` }"
              ></span>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <!-- <a href="#">Home</a> -->
                <RouterLink to="/">Home</RouterLink>
              </li>
              <li class="breadcrumb-item">
                <!-- <a href="#">全部車種</a> -->
                <RouterLink to="/Products">全部車種</RouterLink>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Detail</li>
            </ol>
          </nav>
          <h2>{{ product.title }}</h2>
          <p>{{ product.description }}</p>
          <p>{{ product.content }}</p>
          <p>
            租車價$ <span>{{ product.price }}</span>
          </p>
          <button class="btn btn-outline-primary" @click="addCart(product.id)">加入購物車</button>
        </div>
      </div>
      <div class="py-5">
        <h2 class="text-center mb-4">您可能也喜歡</h2>
        <swiper
          class="w-100"
          :modules="modules"
          :autoplay="{ delay: 2000 }"
          :loop="true"
          :breakpoints="{
            '640': {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            '1024': {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }"
        >
          <swiper-slide class="" v-for="item in products" :key="item.id">
            <div class="card shadow">
              <div class="position-relative card-img overflow-hidden">
                <img class="card-img-top" :src="item.imageUrl" alt="" />
                <!-- <goButton :id="item.id"></goButton> -->
                <button type="button" @click="go(item.id)"
                class="btn rounded-0 viewProduct text-center position-absolute w-100 py-2">
                  <i class="bi bi-search"></i>&nbsp;&nbsp;查看商品
                </button>
              </div>
              <div class="card-body">
                <h5 class="card-title fw-bold text-center mb-2">{{ item.title }}</h5>
                <p class="text-center mb-2">
                  租車價 NT&nbsp;$&nbsp;<span>{{ item.price }}</span>
                </p>
                <!-- <button
                  class="btn btn-blacl btn-outline-white border-top w-100"
                  @click.prevent="addCart(item.id)"
                >
                  加入購物車
                </button> -->
                <AddCartButton :product-id="item.id"
                class="btn btn-outline-white border-top w-100 addCart"></AddCartButton>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import Swal from 'sweetalert2';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { mapActions } from 'pinia';
import NavbarFront from '../../components/NavbarFront.vue';
import cartStore from '../../stores/cart';
import AddCartButton from '../../components/AddCartButton.vue';
import goButton from '../../components/goButton.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      product: {
        imagesUrl: [],
      },
      products: [],
      tempArray: [],
      modules: [Navigation, Pagination, Autoplay],
      mainImg: '',
      isLoading: false,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    NavbarFront,
    Loading,
    AddCartButton,
    goButton,
  },
  methods: {
    ...mapActions(cartStore, ['addCart']),
    grtProductInfo(id) {
      this.$http
        .get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product;
          this.mainImg = this.product.imageUrl;
          this.product.imagesUrl.push(this.product.imageUrl);
          this.isLoading = false;
          // this.getSameCategoryProducts(this.product.category);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    getProducts() {
      this.$http
        .get(`${VITE_APP_URL}v2/api/uaena/products/all`)
        .then((res) => {
          this.products = res.data.products;
          this.products.sort(() => Math.random() - 0.5);
          this.tempArray.length = 0;
          this.products.forEach((item, index) => {
            if (index < 6) {
              this.tempArray.push(item);
            }
            return true;
          });
        })
        .catch((err) => {
          alert(err);
        });
    },
    go(id) {
      this.$router.push(`/product/${id}`);
      // this.$router.push('/products');
    },
    // getSameCategoryProducts(category) {
    //   this.$http
    //     .get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/products?category=${category}`)
    //     .then((res) => {
    //       if (res.data.success) {
    //         this.products = res.data.products;
    //       }
    //     })
    //     .catch((err) => {
    //       // this.isLoading = false;
    //       alert(err.data.message);
    //     });
    // },
  },
  mounted() {
    this.isLoading = true;
    // console.log('route', this.$route); // 屬性值
    // console.log('router', this.$router); // 方法
    const { id } = this.$route.params;
    this.grtProductInfo(id);
    this.getProducts();
  },
  watch: {
    $route() {
      this.$router.go();
    },
  },
};
</script>

<style>
.header-product {
  background-repeat: no-repeat;
  background-position: 40% 35%;
  background-size: 100%;
  background-image: url(../../assets/img/product.jpg);
  height: 350px;
}
.header-product::before {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  content: '';
}
.product {
  height: inherit;
}
.swiper {
  width: 600px;
  height: 450px;
}
.swiper-slide img {
  display: block;
  width: 100%;
  object-fit: cover;
}
.mainImg {
  height: calc(30vw - 2em);
  max-height: 400px;
  min-height: 340px;
}
.subImg{
  height: calc(10vw - 0.66667em);
  min-height: 113.33333px;

}
.mainImg span,
.subImg span {
  background-position: center 75%;
  background-size: cover;
  width: 100%;
  height: 100%;
  display: block;
}

.subImg:hover {
  cursor: pointer;
}

@media (width<767px) {
  .swiper {
    width: 100%;
  }
}
</style>
