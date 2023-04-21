<template>
  <div class="container">
    <div class="row py-3">
      <table class="table table-hover mt-4">
        <thead>
          <tr class="">
            <th width="150"></th>
            <th width="250">訂單編號</th>
            <th width="250">訂單時間</th>
            <th width="200">聯絡人資料</th>
            <th width="120">預約日期</th>
            <th width="120">預約金額</th>
            <th width="150">是否付款</th>
            <th width="150">編輯訂單</th>
          </tr>
        </thead>
        <tbody v-for="order in orders" :key="order.id">
          <tr class="">
            <td class="align-middle">
              <button type="button"
              class="btn btn-outline-secondary"
              data-bs-toggle="collapse"
              :data-bs-target="`#collapse${order.id}`"
              aria-expanded="false"
              >展開</button>
            </td>
            <td
              width="250"
              class="align-middle"
            >
              {{ order.id }}
            </td>
            <td width="250" class="align-middle">
              {{ new Date(order.create_at * 1000).toLocaleString() }}
            </td>
            <td width="200" class="align-middle">
              {{ order.user.name }} <br />
              {{ order.user.tel }} <br />
              {{ order.user.email }}
            </td>
            <td width="120" class="align-middle">
              {{ order.user.address }}
            </td>
            <td width="120" class="align-middle">{{ moneyFormat(order.total.toString()) }}</td>
            <td width="150" class="align-middle">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  :id="order.id"
                  :checked="order.is_paid"
                  @click="editOrder(order)"
                  :disabled="isEditing"
                />
                <label class="form-check-label" :for="order.id">
                  <span class="text-success" v-if="order.is_paid">已付款</span>
                  <span v-else class="text-danger">未付款</span>
                </label>
              </div>
            </td>

            <td width="150" class="align-middle">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteOrder(order.id)"
                >
                  <i class="bi bi-trash"></i>&nbsp;&nbsp;刪除
                </button>
              </div>
            </td>
          </tr>
          <tr :id="`collapse${order.id}`" class="collapse">
            <td colspan="7" class="w-10">
              <thead>
                <tr class="">
                  <th width="200">圖片</th>
                  <th width="200">名稱</th>
                  <th width="200">數量</th>
                  <th width="200">金額</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in order.productAry" :key="product.id">
                  <td>
                    <img :src="product.product.imageUrl" alt="產品圖片" />
                  </td>
                  <td>{{ product.product.title }}</td>
                  <td>{{ product.qty }}</td>
                  <td>{{ product.final_total }}</td>
                </tr>
              </tbody>
            </td>
          </tr>
        </tbody>
      </table>
      <PagnationComponent :page="page" :get-data="getData" @next-page="getData"
      >
    </PagnationComponent>
    </div>
  </div>
</template>

<script>
import PagnationComponent from '../../components/PagnationComponent.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      orders: [],
      productAry: [],
      isEditing: false,
      page: {},
      totalPage: 0,
      currentPage: 0,
    };
  },
  components: {
    PagnationComponent,
  },
  methods: {
    getData(page = 1) {
      this.$http
        .get(`${VITE_APP_URL}api/${VITE_APP_PATH}/orders?page=${page}`)
        .then((res) => {
          if (res.data.success) {
            this.orders = res.data.orders;
            this.orders.forEach((item, index) => {
              this.orders[index].productAry = [];
              Object.values(this.orders[index].products).forEach((item2) => {
                this.orders[index].productAry.push(item2);
              });
            });
            this.page = res.data.pagination;
          }
        })
        .catch((err) => {
          alert(err.data);
        });
    },
    // 千分位
    moneyFormat(money) {
      return money.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    },
    deleteOrder(id) {
      const url = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/order/${id}`;
      this.$http
        .delete(url)
        .then((response) => {
          alert(response.data.message);
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    editOrder(order) {
      this.isEditing = true;
      const data = {
        ...order,
      };
      if (data.is_paid) {
        data.is_paid = false;
      } else {
        data.is_paid = true;
      }
      const url = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/order/${order.id}`;
      this.$http
        .put(url, { data })
        .then((response) => {
          alert(response.data.message);
          this.isEditing = false;
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>

</style>
