<template>
  <loading v-model:active="isLoading" :can-cancel="true" />

  <NavbarFront></NavbarFront>

  <header class="min-vh-100 position-relative">
    <div class="position-absolute bg-cover top-0 bottom-0" style=""></div>
    <div class="position-absolute top-50 start-50 translate-middle text-white ms-2 ms-lg-0">
    <RouterLink to="/Products" class="text-white">
      <p class="display-2 slogan">一起騎車趣<i class="bi bi-bicycle"></i> !</p>
    </RouterLink>
    </div>
  </header>

  <div class="container py-5">
    <div class="info mb-5">
      <h2 class="text-center mb-4">福隆 - 舊草嶺隧道自行車道</h2>
      <div class="row d-flex flex-row-reverse">
        <div class="col-12 col-lg-6 reverse position-relative">
          <img src="../../assets/img/fulong.jpg" alt="福隆舊草嶺隧道自行車道" />
          <img src="../../assets/img/fulong2.jpg" alt="福隆舊草嶺隧道自行車道" />
        </div>
        <div class="col-12 col-lg-6 d-flex align-items-center">
          <p class="lead pe-4 ps-4">
            東北角自行車道為新北市自行車道的一部分，是以新北市貢寮區福隆為中心，
            分為往宜蘭縣頭城鎮石城的舊草嶺隧道自行車道，與往新北市貢寮區鹽寮的東北角龍門自行車道，全長約34公里。
          </p>
        </div>
      </div>
    </div>
    <div class="mb-5">
      <h2 class="text-center mb-4">沿途景色</h2>
      <div class="row justify-content-between g-4">
        <div class="col-12 col-lg-3">
          <div class="card view" style="z-index: 10">
            <img src="../../assets/img/fish.jpg" class="card-img-top" alt="卯澳漁村風景照" />
            <div class="card-text start-0 px-4">
              <h4 class="h4 text-center">卯澳漁村</h4>
              <p class="text-white">
                卯澳前有大海，後有山巒，三條溪流匯集於此後入海，若從高處俯視灣澳，三溪形似「卯」字而得名。
                漁村最具特色的「石頭古厝」是就地取材的最佳典範。喜歡深掘在地特色的旅人，不妨來趟秘境漁村之旅。
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-3">
          <div class="card view" style="z-index: 10">
            <img src="../../assets/img/turtle.jpg" class="card-img-top" alt="龜山島風景照" />
            <div class="card-text start-0 px-4">
              <h4 class="h4 text-center">龜山島</h4>
              <p class="text-white">
                龜山島為火山島地質。目前仍有溫泉及硫氣孔等火山相關活動，屬於活火山。
                東北角暨宜蘭海岸國家風景區，定位為海上生態公園。為避免自由觀光破壞島上生態，登島前需經申請，限制每日登島人數。
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-3">
          <div class="card view" style="z-index: 10">
            <img src="../../assets/img/rainbow.jpg" class="card-img-top" alt="福連國小風景照" />
            <div class="card-text start-0 px-4">
              <h4 class="h4 text-center">福連國小</h4>
              <p class="text-white">
                不僅是「台灣最靠東的國小」，也是「台灣最靠海的國小」。<br />
                操場旁的彩虹階梯跟潛水塗鴉牆是IG熱門打卡點！
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-3">
          <div class="card view" style="z-index: 10">
            <img src="../../assets/img/light.jpg" class="card-img-top" alt="三貂角燈塔風景照" />
            <div class="card-text start-0 px-4">
              <h4 class="h4 text-center">三貂角燈塔</h4>
              <p class="text-white">
                屹立在極東峽角上，面向太平洋，每28秒連閃白、紅光兩次，
                就像是穿著一身白色洋裝的少女對著美麗的海洋眨眼，三貂角燈塔又被稱為「台灣的眼睛」，
                在夜晚以溫暖光芒指引方向，照亮討海人回家的路。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h2 class="text-center mb-4">熱門腳踏車</h2>
    <swiper
      class="w-100"
      :modules="modules"
      :autoplay="{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true }"
      :loop="true"
      :breakpoints="{
        '640': {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        '768': {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        '1024': {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }"
    >
      <swiper-slide class="" v-for="item in tempArray" :key="item.id">
        <div class="card shadow">
          <div class="position-relative card-img overflow-hidden">
            <img class="card-img-top" :src="item.imageUrl" :alt="item.title" />
            <RouterLink
              class="btn rounded-0 viewProduct text-center position-absolute w-100 py-2"
              :to="`product/${item.id}`"
            >
              <i class="bi bi-search"></i>&nbsp;&nbsp;查看商品
            </RouterLink>
          </div>
          <div class="card-body">
            <h5 class="card-title fw-bold text-center  mb-2">{{ item.title }}</h5>
            <p class="text-center  mb-2">
              租車價 NT&nbsp;$&nbsp;<span>{{ item.price }}</span>
            </p>
            <!-- <button
              class="btn btn-blacl btn-outline-white border-top w-100"
              @click.prevent="addCart(item.id)"
            >
              加入購物車
            </button> -->
            <AddCartButton
              :product-id="item.id"
              class="btn btn-outline-white border-top w-100 addCart"
            ></AddCartButton>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper';
import Swal from 'sweetalert2';
import imageUrl from '../../assets/img/banner.png';
import NavbarFront from '../../components/NavbarFront.vue';
import 'vue-loading-overlay/dist/css/index.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AddCartButton from '../../components/AddCartButton.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      now: 0,
      imageUrl,
      products: [],
      tempArray: [],
      modules: [Navigation, Pagination, Autoplay],
      isLoading: false,
    };
  },
  computed: {},
  components: {
    NavbarFront,
    Swiper,
    SwiperSlide,
    AddCartButton,
    Loading,
  },
  methods: {
    getProducts() {
      this.isLoading = true;
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
          this.isLoading = false;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    addCart(productID, qty = 1) {
      this.isLoading = true;
      const data = {
        product_id: productID,
        qty,
      };
      this.$http
        .post(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/cart`, { data })
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false;
            Swal.fire(res.data.message);
          }
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err.data.message);
        });
    },
  },
  beforeMount() {},
  mounted() {
    window.scrollTo(0, 0);
    this.getProducts();
    // window.scrollY
  },
};
</script>

<style>
.bg-cover {
  width: 100%;
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-image: url(../../assets/img/banner.png);
}

.slogan {
  max-width: 100%;
  font-size: 3.5rem;
  border-right: 0.1em solid;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  letter-spacing: 1rem;
  animation: typewriter 5s steps(7) infinite, blink 0.5s steps(7) infinite;
}
.reverse {
  height: 400px;
}
.reverse img {
  position: absolute;
  width: 590px;
  height: 397px;
  top: 0;
  left: 0;
  transition: all 1s;
}
.reverse img:first-child {
  z-index: 1;
  backface-visibility: hidden;
}
.reverse:hover img {
  transform: rotateY(-180deg);
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
.view {
  overflow: hidden;
  transform: (10px);
}
.view:hover img {
  transform: scale(1.2);
}
.view:hover .card-text {
  top: 30%;
  transition: top 2s;
}
.view img {
  transition: all 0.5s ease-in-out;
}

.card-text {
  position: absolute;
  color: white;
  z-index: 999;
  top: 87%;
  transition: top 2s;
}
.view:hover::after {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
  content: '';
}

@keyframes typewriter {
  20%,
  70% {
    width: 0%;
  }
  100%,
  20% {
    width: 100%;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}

@media (max-width: 767px) {
  .slogan {
    font-size: 2rem;
  }
}

</style>
