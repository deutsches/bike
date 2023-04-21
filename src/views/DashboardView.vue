<template>
  <div class="d-flex" :class="{'sidebar-toggle': open ? true : false}">
    <aside class="sidebar vh-100 border-end d-flex bg-light flex-column pt-4">
      <div class="px-4">
        <strong>福隆驛站 - 管理後台</strong>
      </div>
      <div class="overflow-auto mt-3">
        <div>
          <RouterLink to="/admin" class="sidebar-link">
            <i class="bi bi-house-fill"></i><span class="ms-3">首頁</span>
          </RouterLink>
        </div>
        <div>
          <RouterLink to="/admin/Orders" class="sidebar-link">
            <i class="bi bi-card-list"></i>
            <span class="ms-3">訂單管理</span>
          </RouterLink>
        </div>
        <!-- <div>
          <a class="sidebar-link" id="orderManage" data-bs-toggle="collapse" href="#orderMenu"
            ><i class="bi bi-card-list"></i><span class="ms-3">訂單管理</span
            ><span class=""> <i class="bi bi-caret-down ms-5"></i></span>
          </a>
        </div>
        <div class="collapse" id="orderMenu">
          <div>
            <RouterLink to="/admin/orders" class="sidebar-link">
              <span class="ps-5">訂單列表</span>
            </RouterLink>
          </div>
          <div>
            <a href="#" class="sidebar-link"><span class="ps-5">單一訂單</span></a>
          </div>
        </div> -->
        <div>
          <RouterLink to="/admin/Products" class="sidebar-link">
            <i class="bi bi-journals"></i>
            <span class="ms-3">管理產品</span>
          </RouterLink>
        </div>
      </div>

      <a href="#" class="mt-auto text-decoration-none sidebar-link" @click.prevent="logout">
        <i class="bi bi-door-open"></i>
        <span class="ms-3">登出</span>
      </a>
    </aside>
    <div class="main">
      <div class="border-bottom sticky-top bg-white"
      >
        <a href="#" @click.prevent="btnToggle"
        class="py-4 px-4 d-inline-block border-end" id="toggle-btn"
          ><i class="bi bi-arrows-angle-expand"></i
        ></a>
      </div>
      <RouterView v-if="isCheck" />
    </div>
  </div>
</template>

<script>
import '../assets/css/DashboardView.css';
import { RouterLink } from 'vue-router';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      isCheck: false,
      open: false,
    };
  },
  methods: {
    logout() {
      document.cookie = 'hexToken=;expires=;';
      this.$router.push('/');
    },
    btnToggle() {
      if (this.open) {
        this.open = false;
      } else {
        this.open = true;
      }
    },
    checkAdmin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      // axios設定header
      this.$http.defaults.headers.common.Authorization = token;
      this.$http
        .post(`${VITE_APP_URL}api/user/check`)
        .then((res) => {
          if (!res.data.success) {
            this.$router.push('/login');
          }
          this.isCheck = true;
        })
        .catch((err) => {
          alert(err.data);
          this.$router.push('/login');
        });
    },
    getOrders() {
      this.$http
        .get(`${VITE_APP_URL}api/${VITE_APP_PATH}/orders`)
        .then((res) => {
          if (res.data.success) {
            // console.log(res);
          }
        })
        .catch((err) => {
          alert(err.data);
        });
    },
  },
  components: {
    RouterLink,
  },
  mounted() {
    this.checkAdmin();
    /*
    const toggleMenuBtn = document.querySelector('#toggle-btn');
    const body = document.querySelector('body');

    toggleMenuBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      body.classList.toggle('sidebar-toggle');
    });
    const caretDown = document.querySelector('.bi-caret-down');
    const orderManageBtn = document.querySelector('#orderManage');
    orderManageBtn.addEventListener('click', (evt) => {
      orderManageBtn.setAttribute('disabled', true);
      evt.preventDefault();
      caretDown.classList.toggle('rotated');
      orderManageBtn.setAttribute('disabled', false);
    });
    */
    this.getOrders();
  },
};
</script>

<style>

</style>
