<template>
  <button @click="addCart(productId)">加入購物車</button>
</template>
<script>
import { mapActions } from 'pinia';
import cartStore from '../stores/cart';

export default {
  data() {
    return {

    };
  },
  props: ['productId'],
  methods: {
    ...mapActions(cartStore, ['addCart']),
  },
};
</script>
