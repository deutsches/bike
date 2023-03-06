<template>
  <RouterView />
</template>
<script>
import { RouterView } from 'vue-router';

export default {
  data() {
    return {
      products: [],
    };
  },
  components: {
    RouterView,
  },
  mounted() {
  },
};
</script>
