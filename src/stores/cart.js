import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import axios from 'axios';
// import Loading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/css/index.css';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
const cartStore = defineStore('cart', {
  state: () => ({
    cartNumber: 0,
    totalPrice: 0,
    isLoading: false,
    loadingStatus: {
      loadingItem: '',
    },
    cartList: [],
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
      this.loadingStatus.loadingItem = productID;
      const data = {
        product_id: productID,
        qty,
      };
      axios
        .post(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/cart`, { data })
        .then((res) => {
          if (res.data.success) {
            Swal.fire({
              timer: 1500,
              title: '已加入購物車!',
              showConfirmButton: false,
              icon: 'success',
            });
            this.getCart();
            this.loadingStatus.loadingItem = '';
            // this.renderCart();
          }
        })
        .catch((err) => {
          // this.isLoading = false;
          alert(err.data.message);
        });
    },
    // 刪除全部購物車
    removeAllCart() {
      axios
        .delete(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/carts`)
        .then((res) => {
          if (res.data.success) {
            Swal.fire(`購物車${res.data.message}!`);
            this.renderCart();
            this.getCart();
          }
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    // 刪除單一購物車
    removeCartItem(cartID) {
      this.loadingStatus.loadingItem = cartID;
      axios
        .delete(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/cart/${cartID}`)
        .then((res) => {
          if (res.data.success) {
            Swal.fire('刪除玩成!');
            this.loadingStatus.loadingItem = '';
            this.renderCart();
            this.getCart();
          }
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    // 取得購物車內容
    renderCart() {
      axios
        .get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          if (res.data.success) {
            this.cartList = res.data.data.carts;
            this.totalPrice = res.data.data.final_total;
          }
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  getters: {},
});

export default cartStore;
