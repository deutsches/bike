<template>
  <loading v-model:active="isLoading" :can-cancel="true"/>

  <NavbarFront></NavbarFront>

  <header class="header-products position-relative" style="">
    <h2 class="d-flex align-items-center justify-content-center text-white products">全部產品</h2>
  </header>

  <div style="background-color: #fffcf7">
    <div class="container pt-5 pb-5">
      <div class="row">
        <div class="col-12 d-lg-inline-block col-lg-2">
          <LeftMenu @get-data="getData" :category="category"></LeftMenu>
        </div>
        <div class="cols-12 col-lg-10">
          <!-- 搜尋 -->
          <div class="mb-4 position-relative">
            <input type="text" placeholder="在此搜尋車種" v-model="search"
            class="input_search rounded-pill">
            <i class="bi bi-search position-absolute search"></i>
          </div>
          <div class="row row-cols-1 row-cols-lg-3 g-4">
            <div class="col rounded-5" v-for="item in tempArray" :key="item.id">
              <div class="card shadow">
                <div class="position-relative card-img overflow-hidden">
                  <img class="card-img-top" :src="item.imageUrl" alt="" />
                  <RouterLink
                    class="btn rounded-0 viewProduct text-center position-absolute w-100 py-2"
                    :to="`product/${item.id}`"
                  >
                    <i class="bi bi-search"></i>&nbsp;&nbsp;查看商品
                  </RouterLink>
                </div>
                <div class="card-body">
                  <h5 class="card-title fw-bold text-center mb-2">{{ item.title }}</h5>
                  <p class="text-center mb-2">
                    租車價 NT&nbsp;$&nbsp;<span>{{ item.price }}</span>
                  </p>
                  <AddCartButton :product-id="item.id"
                class="btn btn-outline-white border-top w-100 addCart"></AddCartButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PagnationComponent :page="page" :get-data="getData" @next-page="getData"
    :category="category">
    </PagnationComponent>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import Loading from 'vue-loading-overlay';
import Swal from 'sweetalert2';
import LeftMenu from '../../components/LeftMenu.vue';
import NavbarFront from '../../components/NavbarFront.vue';
import 'vue-loading-overlay/dist/css/index.css';
import AddCartButton from '../../components/AddCartButton.vue';
import PagnationComponent from '../../components/PagnationComponent.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      allProducts: [],
      products: [],
      isLoading: false,
      search: '',
      tempArray: [],
      page: {},
      totalPage: 0,
      currentPage: 0,
      category: '',
    };
  },
  components: {
    RouterLink,
    LeftMenu,
    NavbarFront,
    Loading,
    AddCartButton,
    PagnationComponent,
  },
  methods: {
    // 加入購物車
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
            Swal.fire({
              timer: 1500,
              title: '已加入購物車!',
              showConfirmButton: false,
              icon: 'success',
            });
          }
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err.data.message);
        });
    },
    getData(page = 1, category = '全部') {
      let url = '';
      this.category = category;
      if (category !== '全部') {
        url = `${VITE_APP_URL}v2/api/uaena/products?category=${this.category}&page=${page}`;
      } else {
        url = `${VITE_APP_URL}v2/api/uaena/products?page=${page}`;
      }
      this.$http
        // .get(`${VITE_APP_URL}v2/api/uaena/products/all`)
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.tempArray = this.products;
          this.page = res.data.pagination;
          // this.tempArray = this.products.filter((item) => category === item.category);
          // if (this.tempArray.length === 0) {
          //   this.tempArray = this.products;
          // }
          this.isLoading = false;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  mounted() {
    this.isLoading = true;
    this.getData();
    window.scrollTo(0, 0);
  },
  computed: {
  },
  watch: {
    search(n) {
      this.tempArray = this.products.filter((item) => item.title.match(n));
    },
  },
};
</script>

<style>
.header-products {
  background-repeat: no-repeat;
  background-position: 50% 50.83%;
  background-size: 100%;
  background-image: url(../../assets/img/products2.jpg);
  height: 350px;
}
.header-products::before {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  content: '';
}
.products {
  height: inherit;
}
.input_search{
  border: 1px  solid black;
  padding-top: 5px;
  padding-left: 20px;
  padding-bottom: 5px;
  background-color: rgba(0, 0, 0, 0);
}
.search{
  top: 6px;
  left: 165px;
}
.search:hover{
  cursor: pointer;
}

@media (max-width: 767px) {
  .header-products {
    background-size: cover;
    /* height: auto !important; */
  }
  .input{
    width: 100%;
  }
  .search{
    left: 90%;
  }
}
@media (max-width:992px) {
  .input_search{
    width: 100%;
  }
  .search{
    left: 90%;
  }
}
</style>
