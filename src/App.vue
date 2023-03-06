<script>
import { RouterView } from 'vue-router';
import FooterComponent from './components/FooterComponent.vue';

// const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
// import axios from "axios";
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: {
    RouterView,
    FooterComponent,
  },
  mounted() {
    // console.log(VITE_APP_URL, VITE_APP_PATH);
  },
};
</script>

<template>
  <div class="wrap">
    <header>
    <VueLoading v-model:active="isLoading"></VueLoading>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
  </header>

  <RouterView />
  </div>
  <FooterComponent></FooterComponent>
</template>

<style>
/* header {
  line-height: 1.5;
} */
.wrap {
  min-height: calc(100vh - 85px);
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  /* header {
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  } */

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

}
</style>
