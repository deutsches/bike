<template>
  <div class="container">
    <div class="row py-3">
      <div class="mt-4 d-flex justify-content-between">
        <span class=" ">
          <button class="btn btn-primary" @click="openModal('new')">建立新的產品</button>
        </span>
      </div>

      <table class="table table-hover mt-4">
        <thead>
          <tr>
            <th width="290"></th>
            <th width="150">產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="150">是否啟用</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td width="290">
              <img :src="item.imageUrl" width="290" height="200" :alt="item.product" />
            </td>
            <td width="150" class="align-middle">{{ item.title }}</td>
            <td width="120" class="align-middle">{{ item.origin_price }}</td>
            <td width="120" class="align-middle">{{ item.price }}</td>
            <td width="150" class="align-middle">
              <span class="text-success" v-if="item.is_enabled">啟用</span>
              <span v-else class="text-danger">未啟用</span>
            </td>

            <td width="120" class="align-middle">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="openModal('edit', item)"
                >
                  <i class="bi bi-pencil"></i> &nbsp;&nbsp;編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="openModal('delete', item)"
                >
                  <i class="bi bi-trash"></i>&nbsp;&nbsp;刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分頁 -->
      <PagnationComponent
        :page="page"
        :get-data="getData"
        @next-page="getData"
      ></PagnationComponent>

      <!-- Modal -->
      <ProductModalComponent
        :product="product"
        :is-new="isNew"
        @save-product="getData"
        ref="productModal"
      ></ProductModalComponent>
      <!-- 刪除Modal -->
      <DeleteProductComponent
        :product="product"
        @save-product="getData"
        ref="deleteProductModal"
      ></DeleteProductComponent>
    </div>
  </div>
</template>

<script>
import PagnationComponent from '../../components/PagnationComponent.vue';
import DeleteProductComponent from '../../components/DeleteProductComponent.vue';
import ProductModalComponent from '../../components/ProductModalComponent.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      product: {
        imagesUrl: [],
      },
      isNew: false,
      page: {},
    };
  },
  components: {
    PagnationComponent,
    DeleteProductComponent,
    ProductModalComponent,
  },
  methods: {
    getData(page = 1) {
      this.$http
        .get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/products?page=${page}`)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.page = res.data.pagination;
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    openModal(isNew, item) {
      if (isNew === 'delete') {
        this.product = { ...item };
        this.$refs.deleteProductModal.openModal();
      } else if (isNew === 'edit') {
        this.isNew = false;
        this.product = { ...item };
        this.$refs.productModal.openModal();
      } else if (isNew === 'new') {
        this.isNew = true;
        this.product = {
          imagesUrl: [],
        };
        this.$refs.productModal.openModal();
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
