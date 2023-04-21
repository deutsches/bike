<script>
import { RouterView } from 'vue-router';
// import FooterComponent from './components/FooterComponent.vue';

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: {
    RouterView,
    // FooterComponent,
  },
  mounted() {
  },
};
</script>

<template>
  <div class="wrap">
    <header>
    <VueLoading v-model:active="isLoading"></VueLoading>
  </header>

  <RouterView />
  </div>
  <!-- <FooterComponent></FooterComponent> -->
</template>

<style>
.wrap {
  min-height: calc(100vh - 90px);
  background-color: #fffcf7;
}

@media (min-width: 1024px) {

}
</style>
