<template>
  <button type="button" @click="go(id)">
    <i class="bi bi-search"></i>&nbsp;&nbsp;查看商品
  </button>
</template>
<script>

export default {
  data() {
    return {

    };
  },
  props: ['id'],
  methods: {
    go(id) {
      console.log(id);
      // this.$router.push(`/product/${id}`);
      this.$router.push('/products');
      console.log('1');
    },
  },
};
</script>
