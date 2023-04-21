<template>
  <div class="wrap">
    <NavbarFront></NavbarFront>
    <header class="header-chart position-relative" style="">
      <h2 class="d-flex align-items-center justify-content-center text-white chart">訂單確認</h2>
    </header>
    <div class="container pb-4 ">
      <div class="row">
        <div class="position-relative mt-5 mb-5 m-auto step">
          <div class="progress bg-dark" style="height: 1px">
            <div
              class="progress-bar"
              role="progressbar"
              aria-valuenow="50"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div
            style="width: 100px" :class="{ stepActive: step === 1 }"
            class="step text-center position-absolute
            top-0 start-0 translate-middle"
          >
            Step 1<br />確認購物車
          </div>
          <div
            style="width: 100px" :class="{ stepActive: step === 2 }"
            class="step text-center position-absolute
            top-0 start-50 translate-middle"
          >
            Step 2<br />填寫資料
          </div>
          <div
            style="width: 100px" :class="{stepActive: step === 3 }"
            class="step text-center  position-absolute
            top-0 start-100 translate-middle"
          >
            Step 3<br />完成訂單
          </div>
        </div>
        <div class="m-auto" style="max-width: 540px" v-if="step === 1">
          <div class="d-flex justify-content-between">
            <RouterLink class="btn text-center" :to="`/products`">
              <i class="bi bi-caret-left-fill"></i>&nbsp;&nbsp;繼續購物
            </RouterLink>
            <button
              type="button"
              class="btn"
              @click.prevent="removeAllCart"
              :disabled="!cartList.length"
            >
              <i class="bi bi-trash"></i>&nbsp;清空購物車
            </button>
          </div>
          <div class="card mb-3 border-0 border-bottom p-2" v-for="cart in cartList" :key="cart.id">
            <div class="row g-3">
              <div class="col-5 col-lg-6">
                <img :src="cart.product.imageUrl" class="img-fluid" alt="..." />
              </div>
              <div class="col-7 col-lg-6">
                <div class="card-body p-0 h-100 d-flex flex-column">
                  <div class="d-flex justify-content-between">
                    <h5 class=" ">{{ cart.product.title }}</h5>
                    <button
                      :disabled="loadingStatus.loadingItem === cart.id"
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="removeCartItem(cart.id)"
                    >
                      <i
                        class="fas fa-spinner fa-pulse"
                        v-if="loadingStatus.loadingItem === cart.id"
                      ></i>
                      x
                    </button>
                  </div>
                  <label for="count">數量：</label>
                  <input
                    id="count"
                    type="number"
                    min="1"
                    v-model="cart.qty"
                    @blur="editQty(cart)"
                  />
                  <p class="mt-auto text-end">NT${{ moneyFormat(cart.final_total.toString()) }}</p>
                </div>
              </div>
            </div>
          </div>
          <p class="text-end">總計： NT${{ moneyFormat(totalPrice.toString()) }}</p>
          <div class="text-center">
            <button type="button" class="btn btn-outline-primary"
            @click.prevent="nextStep" :disabled="!cartList.length">
              確認購物車
            </button>
          </div>
        </div>

        <div class="py-4 row justify-content-center" v-if="step === 2" >
          <v-form ref="form" class="col-6" v-slot="{ errors }" @submit="createOrder">
            <div class="mb-3">
              <label for="inputName" class="col-sm-2 col-form-label">姓名</label>
              <VField
                type="text"
                class="form-control"
                id="inputName"
                name="姓名"
                placeholder="請輸入姓名"
                rules="required"
                :class="{ 'is-invalid': errors['姓名'] }"
                v-model="form.user.name"
              >
              </VField>
              <error-message name="姓名" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="inputTel" class="col-sm-2 col-form-label">電話</label>
              <VField
                type="tel"
                name="電話"
                class="form-control"
                placeholder="請輸入電話"
                id="inputTel"
                rules="required|min:8|max:10|"
                :class="{ 'is-invalid': errors['電話'] }"
                v-model="form.user.tel"
              >
              </VField>
              <error-message name="電話" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="email" class="col-sm-2 col-form-label">Email</label>
              <VField
                type="email"
                name="email"
                class="form-control"
                id="email"
                rules="email|required"
                :class="{ 'is-invalid': errors['email'] }"
                v-model="form.user.email"
              >
              </VField>
              <error-message name="email" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="inputTime" class="col-sm-2 col-form-label">日期</label>
              <v-field
                type="date"
                name="日期"
                class="form-control"
                id="inputTime"
                rules="required"
                :class="{ 'is-invalid': errors['日期'] }"
                v-model="form.user.address"
              ></v-field>
              <error-message name="日期" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea
                class="form-control"
                id="message"
                name="message"
                rows="3"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="d-flex justify-content-between">
              <button type="button" class="btn btn-info" @click.prevent="backStep">
                <i class="bi bi-caret-left-fill"></i>&nbsp;回購物車
              </button>
              <button type="submit" class="btn btn-info">送出預約單</button>
            </div>
          </v-form>
        </div>

        <div class="m-auto py-4 row justify-content-center" style="max-width: 540px;"
        v-if="step === 3">
          <p class="text-center lead">感謝您！腳踏車已預定成功！</p>
          <p>您的訂購資訊入下：</p>
          <p>編號：{{ order.id }}</p>
          <p>訂購時間：{{ new Date(order.create_at*1000).toLocaleString() }}</p>
          <p>姓名：{{ order.user?.name }}</p>
          <p>電話：{{ order.user?.tel }}</p>
          <p>信箱：{{ order.user?.email }}</p>
          <p>備註：{{ order.message }}</p>
          <div>
            訂購車型如下：
            <button type="button" data-bs-toggle="collapse" href="#collapse"
            class="btn btn-primary">
              展開細節
            </button>
          </div>
          <div id="collapse" class="collapse">
            <div  class="card mb-3 border-0 border-bottom p-2"
          v-for="cart in tempCartList" :key="cart.id">
            <div class="row g-3">
              <div class="col-5 col-lg-6">
                <img :src="cart.product.imageUrl" class="img-fluid" alt="..." />
              </div>
              <div class="col-7 col-lg-6">
                <div class="card-body p-0 h-100 d-flex flex-column">
                  <div class="d-flex justify-content-between">
                    <h5 class=" ">{{ cart.product.title }}</h5>
                  </div>
                  <p >數量：{{ cart.qty }}</p>
                  <p class="mt-auto text-end">NT${{ moneyFormat(cart.final_total.toString()) }}</p>
                </div>
              </div>
            </div>
          </div>
          <p class="text-end mt-3">總計： NT${{ moneyFormat(order.total.toString()) }}</p>

          </div>
          <p class="text-center lead mt-5">期待{{ order.user?.address}}與您相見~</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import cartStore from '../../stores/cart';
import Swal from 'sweetalert2';
import NavbarFront from '../../components/NavbarFront.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      // 產品列表
      products: [],
      // cartList: [],
      tempCartList: [],
      product: {},
      isLoading: false,
      fullPage: true,
      // totalPrice: 0,
      form: {
        user: {
          name: '',
          tel: '',
          email: '',
          address: '',
        },
        message: '',
      },
      loadingStatus: {
        loadingItem: '',
      },
      step: 1,
      order: {},
    };
  },
  components: {
    NavbarFront,
    // VForm: Form,
    // VField: Field,
    // ErrorMessage: ErrorMessage,
    // productModal
  },
  methods: {
    ...mapActions(cartStore, ['removeCartItem', 'removeAllCart', 'renderCart']),
    nextStep() {
      if (this.step === 1) {
        this.step = 2;
      } else {
        this.step = 3;
      }
    },
    backStep() {
      if (this.step === 2) {
        this.step = 1;
      }
    },
    // 更改購物車數量
    editQty(cart) {
      const data = {
        product_id: cart.product_id,
        qty: cart.qty,
      };
      this.$http
        .put(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/cart/${cart.id}`, {
          data,
        })
        .then((res) => {
          if (res.data.success) {
            this.renderCart();
          }
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    // 送出訂單
    createOrder() {
      if (this.cartList.length !== 0) {
        this.tempCartList = this.cartList;
        this.$http
          .post(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/order`, {
            data: this.form,
          })
          .then((res) => {
            if (res.data.success) {
              Swal.fire(res.data.message);
              this.$refs.form.resetForm();
              this.renderCart();
              this.nextStep();
              this.getOrderInfo(res.data.orderId);
            }
          })
          .catch((err) => {
            alert(err);
          });
      } else {
        Swal.fire('請至少加入一項產品至購物車!');
      }
    },
    // 千分位
    moneyFormat(money) {
      return money.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    },
    getOrderInfo(id) {
      this.$http
        .get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/order/${id}`)
        .then((res) => {
          if (res.data.success) {
            this.order = res.data.order;
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  mounted() {
    this.renderCart();
  },
  computed: {
    ...mapState(cartStore, ['cartList', 'totalPrice']),
  },
};
</script>
<style>
body,
html {
  height: 100%;
  margin: 0;
}
.step {
  width: 70%;
}
.header-chart {
  background-repeat: no-repeat;
  background-position: 40% 70%;
  background-size: 100%;
  background-image: url(../../assets/img/chart.jpg);
  height: 350px;
}
.header-chart::before {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  content: '';
}
.chart {
  height: inherit;
}
.step{
  background-color: rgb(85, 153, 241);
  color: white;
  border-radius: 10px;
  padding: 2px;
}
.stepActive{
  background-color: rgb(145, 103, 241);
}

@media (max-width: 767px) {
  .header-chart {
    background-size: cover;
  }
}
</style>
