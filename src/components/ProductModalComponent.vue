<template>
  <div
    id="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <v-form ref="form" class="" v-slot="{ errors }" @submit="saveProduct">
          <div class="modal-body">
            <!-- 新增圖片 -->
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">主要圖片</label>
                  <v-field
                    type="text"
                    name="主要圖片"
                    placeholder="請輸入圖片連結"
                    class="form-control"
                    id="imageUrl"
                    rules="required"
                    :class="{ 'is-invalid': errors['主要圖片'] }"
                    v-model="product.imageUrl"
                  ></v-field>
                  <error-message name="主要圖片" class="invalid-feedback"></error-message>
                  <img class="img-fluid" :src="product.imageUrl" />
                </div>
                <h3 class="mb-3">多圖新增</h3>
                <div>
                  <div>
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="createImages"
                    >
                      新增圖片
                    </button>
                  </div>
                  <div v-if="Array.isArray(product.imagesUrl)">
                    <div v-for="(image, key) in product.imagesUrl" :key="key" class="">
                      <label for="imageUrl" class="form-label mt-4">圖片網址</label>
                      <input
                        type="text"
                        name="imageUrl"
                        id="imageUrl"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                        v-model="product.imagesUrl[key]"
                      />
                      <img class="img-fluid" :src="image" />
                      <button
                        class="btn btn-outline-danger btn-sm d-block w-100 mt-2"
                        @click="product.imagesUrl.splice(key, 1)"
                      >
                        刪除圖片
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 商品資料 -->
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <v-field
                    type="text"
                    name="標題"
                    placeholder="請輸入標題"
                    class="form-control"
                    id="title"
                    rules="required"
                    :class="{ 'is-invalid': errors['標題'] }"
                    v-model="product.title"
                  ></v-field>
                  <error-message name="標題" class="invalid-feedback"></error-message>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <v-field
                      type="text"
                      name="分類"
                      placeholder="請輸入分類"
                      class="form-control"
                      id="category"
                      rules="required"
                      :class="{ 'is-invalid': errors['分類'] }"
                      v-model="product.category"
                    ></v-field>
                    <error-message name="分類" class="invalid-feedback"></error-message>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <v-field
                      type="text"
                      name="單位"
                      placeholder="請輸入單位"
                      class="form-control"
                      id="unit"
                      rules="required"
                      :class="{ 'is-invalid': errors['單位'] }"
                      v-model="product.unit"
                    ></v-field>
                    <error-message name="單位" class="invalid-feedback"></error-message>
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <v-field
                      min="0"
                      type="number"
                      name="原價"
                      placeholder="請輸入原價"
                      class="form-control"
                      id="origin_price"
                      rules="required"
                      :class="{ 'is-invalid': errors['原價'] }"
                      v-model.number="product.origin_price"
                    ></v-field>
                    <error-message name="原價" class="invalid-feedback"></error-message>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <v-field
                      min="0"
                      type="number"
                      name="售價"
                      placeholder="請輸入售價"
                      class="form-control"
                      id="price"
                      rules="required"
                      :class="{ 'is-invalid': errors['售價'] }"
                      v-model.number="product.price"
                    ></v-field>
                    <error-message name="售價" class="invalid-feedback"></error-message>
                  </div>
                </div>
                <hr />

                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea
                    id="description"
                    v-model="product.description"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品描述"
                  >
                  </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea
                    id="description"
                    v-model="product.content"
                    type="text"
                    class="form-control"
                    placeholder="請輸入說明內容"
                  >
                  </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      v-model="product.is_enabled"
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <!-- <button type="button" class="btn btn-primary" @click="saveProduct">確認</button> -->
            <button type="submit" class="btn btn-primary">確認</button>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  props: ['product', 'isNew'],
  data() {
    return {
      productModal: null,
      qty: 1,
    };
  },
  mounted() {
    this.productModal = new Modal(document.getElementById('productModal'), {
      keyboard: false,
    });
  },
  methods: {
    createImages() {
      if (!this.product.imagesUrl) {
        this.product.imagesUrl = [];
        this.product.imagesUrl.push('');
      } else {
        this.product.imagesUrl.push('');
      }
    },
    saveProduct() {
      let url = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/product`;
      let http = 'post';
      if (!this.isNew) {
        url = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/product/${this.product.id}`;
        http = 'put';
      }
      this.$http[http](url, { data: this.product })
        .then((response) => {
          if (response.data.success) {
            this.$emit('saveProduct');
            this.productModal.hide();
          } else {
            alert(response.data.message);
          }
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    openModal() {
      this.productModal.show();
    },
  },
};
</script>
