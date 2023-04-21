<template>
  <nav class="navbar navbar-expand-lg navbar-light pt-4 pb-4 position-fixed" :class="{}">
    <div class="container">
      <span class="d-flex align-content-center">
        <RouterLink to="/" class="navbar-brand text-white">
          <span class="material-symbols-outlined"> directions_bike </span>
          福隆驛站
        </RouterLink>
      </span>
      <span class="d-flex align-items-center">
        <RouterLink to="/Cart" class="nav-link text-dark me-4 d-inline-block d-lg-none">
          <i class="bi bi-cart4 position-relative h4">
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill
              bg-danger h5"
              style="font-size: 12px"
              >{{ cartNumber }}
            </span>
          </i>
        </RouterLink>
        <button
          class="navbar-toggler ms-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </span>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item me-5">
            <RouterLink to="/About" class="nav-link">關於我們</RouterLink>
          </li>
          <li class="nav-item me-5">
            <RouterLink to="/Products" class="nav-link">全部產品</RouterLink>
          </li>
          <li class="nav-item me-5">
            <RouterLink to="/Login" class="nav-link">登入後台</RouterLink>
          </li>
        </ul>
      </div>
      <RouterLink to="/Cart" class="nav-link text-dark me-4 d-none d-lg-inline-block">
        <i class="bi bi-cart4 position-relative h4 text-white">
          <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill
            bg-danger h5"
            style="font-size: 12px"
            >{{ cartNumber }}
          </span>
        </i>
      </RouterLink>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import cartStore from '../stores/cart';

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
    scroll() {
      if (window.screen.width > 767) {
        if (window.scrollY > 0) {
          document.querySelector('.navbar').style.backgroundColor = 'rgb(85, 153, 241)';
        } else {
          document.querySelector('.navbar').style.backgroundColor = 'transparent';
        }
      }
    },
  },
  mounted() {
    this.getCart();
    document.addEventListener('scroll', this.scroll);
  },
  unmounted() {
    document.removeEventListener('scroll', this.scroll, false);
  },
  computed: {
    ...mapState(cartStore, ['cartNumber']),

  },
};
</script>

<style >
.navbar{
  right: 0;
  left: 0;
  z-index: 100;
}
.navbar a{
  color: white;
  font-family: "微軟正黑體";
}
.navbar a:hover{
  color: blue;
}
@media (max-width:767px) {
  body{
    font-size: 18px;
  }
  .navbar{
    background-color: rgb(85, 153, 241);
  }
}
</style>
