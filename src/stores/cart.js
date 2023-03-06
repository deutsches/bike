import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import axios from 'axios';
// import Loading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/css/index.css';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
const cartStore = defineStore('cart', {
  state: () => ({
    cartNumber: 0,
    isLoading: false,
  }),
  actions: {
    getCart() {
      axios.get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/cart`).then((res) => {
        if (res.data.success) {
          this.cartNumber = res.data.data.carts.length;
        }
      });
    },
    // 加入購物車
    addCart(productID, qty = 1) {
      // this.isLoading = true;
      console.log(productID);
      const data = {
        product_id: productID,
        qty,
      };
      axios
        .post(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/cart`, { data })
        .then((res) => {
          if (res.data.success) {
            // this.isLoading = false;
            Swal.fire({
              timer: 1500,
              title: '已加入購物車!',
              showConfirmButton: false,
              icon: 'success',
            });
            this.getCart();
            this.isLoading = false;
            // this.renderCart();
          }
        })
        .catch((err) => {
          // this.isLoading = false;
          alert(err.data.message);
        });
    },
  },
  getters: {},
});

export default cartStore;
