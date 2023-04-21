<template>
  <RouterView />
  <FooterComponent></FooterComponent>
</template>

<script>
import { RouterView } from 'vue-router';
import FooterComponent from '../components/FooterComponent.vue';

export default {
  data() {
    return {
      products: [],
    };
  },
  components: {
    RouterView,
    FooterComponent,
  },
  mounted() {
  },
};
</script>
