<template>
  <button @click="addCart(productId)"
  :disabled="loadingStatus.loadingItem !== ''">
    加入購物車 &nbsp;
    <div class="spinner-border" v-if="loadingStatus.loadingItem !== ''" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </button>
</template>

<script>
import { mapActions, mapState } from 'pinia';
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
  computed: {
    ...mapState(cartStore, ['loadingStatus']),

  },
};
</script>

<style>

</style>
