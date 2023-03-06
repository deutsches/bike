<template>
  <div class="sticky-top"  style="top: 6rem;">
    <h2 class="h2 text-lg-start text-center">產品類型</h2>
    <ul class="list-unstyled d-flex d-lg-inline-block justify-content-between">
      <li class="mt-4">
        <a href="#" class="h4"
        @click.prevent="$emit('getProducts','全部',1)">全部</a>
      </li>
      <li class="mt-4"><a href="#" class="h4"
        @click.prevent="$emit('getProducts','單人車',1)">單人車</a>
      </li>
      <li class="mt-4"><a href="#" class="h4"
        @click.prevent="$emit('getProducts','協力車',1)">協力車</a>
      </li>
      <li class="mt-4"><a class="h4" href="#"
        @click.prevent="$emit('get-products','電動車',1)">電動車</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {

  },
  mounted() {

  },
};

</script>
