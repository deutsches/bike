<template>
  <div class="d-flex">
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
          <a class="sidebar-link" id="orderManage" data-bs-toggle="collapse" href="#orderMenu"
            ><i class="bi bi-card-list"></i><span class="ms-3">訂單管理</span
            ><span class=""> <i class="bi bi-caret-down ms-5"></i></span>
          </a>
        </div>
        <div class="collapse" id="orderMenu">
          <div>
            <a href="#" class="sidebar-link"><span class="ps-5">訂單列表</span></a>
          </div>
          <div>
            <a href="#" class="sidebar-link"><span class="ps-5">單一訂單</span></a>
          </div>
        </div>
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
      <div class="border-bottom sticky-top bg-white">
        <a href="" class="py-4 px-4 d-inline-block border-end" id="toggle-btn"
          ><i class="bi bi-arrows-angle-expand"></i
        ></a>
      </div>
      <div class="p-4">
        <!-- 三個標題卡片 -->
        <div class="row g-4 mb-4">
          <div class="col">
            <div class="card shadow-sm">
              <div class="card-body text-end">
                <h5 class="display-6">收入</h5>
                <p class="income display-4">123</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-sm">
              <div class="card-body text-end">
                <h5 class="display-6">支出</h5>
                <p class="expenditure display-4">456</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-sm">
              <div class="card-body text-end">
                <h5 class="display-6">營業額</h5>
                <p class="revenue display-4">789</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 數據圖  -->
        <div class="d-flex justify-content-center">
          <div class="w-75">
            <div class="mb-4" id="yoy"></div>
            <div class="mb-4" id="mom"></div>
            <div class="mb-4" id="bike"></div>
          </div>
        </div>
      </div>
      <RouterView />
    </div>
  </div>
  <!-- <RouterLink to='/admin/Products'>管理產品</RouterLink> |
  <RouterLink to='/admin/Statistics'>訂單統計</RouterLink> |
  <RouterLink to='/'>回首頁</RouterLink> | -->
</template>

<script>
import '../assets/DashboardView.css';
import { RouterLink } from 'vue-router';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    logout() {
      document.cookie = `hexToken=;expires=${new Date()}; path=/`;
      this.$router.push('login');
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
          // this.getData();
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
            console.log(res);
          }
        })
        .catch((err) => {
          alert(err.data);
        });
    },
    getCountt() {
      // C3.js
      const chart = c3.generate({
        bindto: '#yoy', // HTML 元素綁定
        data: {
          columns: [['總收入', 30, 200, 100, 400, 150, 250]],
        },
      });
      const mom = c3.generate({
        bindto: '#mom', // HTML 元素綁定
        data: {
          columns: [
            ['支出', 30, 200, 100, 400, 150, 250, 0, 0, 0, 0, 0, 0],
            ['收入', 130, 100, 140, 200, 150, 50, 0, 0, 0, 0, 0, 0],
          ],
          type: 'bar',
        },
        bar: {
          width: {
            ratio: 0.5, // this makes bar width 50% of length between ticks
          },
          // or
          // width: 100 // this makes bar width 100px
        },
      });

      const bike = c3.generate({
        bindto: '#bike', // HTML 元素綁定
        data: {
          columns: [
            ['淑女車', 30, 50, 100, 200, 150, 250, 0, 0, 0, 0, 0, 0],
            ['單車', 130, 100, 140, 200, 150, 50, 0, 0, 0, 0, 0, 0],
            ['電動車', 130, 100, 140, 200, 150, 50, 0, 0, 0, 0, 0, 0],
            ['協力車', 130, 100, 140, 200, 150, 50, 0, 0, 0, 0, 0, 0],
          ],
          type: 'bar',
        },
        bar: {
          width: {
            ratio: 0.5, // this makes bar width 50% of length between ticks
          },
          // or
          // width: 100 // this makes bar width 100px
        },
      });
    },
  },
  components: {
    RouterLink,
  },
  mounted() {
    this.checkAdmin();
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
    this.getCountt();
    this.getOrders();
  },
};
</script>
<style>
body {
  background-image: none;
}
</style>
