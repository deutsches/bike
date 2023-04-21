<template>
  <div class="sticky-top"  style="top: 6rem;z-index: 10;">
    <h2 class="h2 text-lg-start text-center">產品類型</h2>
    <ul class="list-unstyled d-flex d-lg-inline-block justify-content-between">
      <li class="mt-4 page-item" :class="{ active: category === '全部' ? true : false }">
        <a href="#" class="h4"
        @click.prevent="$emit('getData',1,'全部')">全部</a>
      </li>
      <li class="mt-4" :class="{ active: category === '單人車' ? true : false }">
        <a href="#" class="h4 "
        @click.prevent="$emit('getData',1,'單人車')">單人車</a>
      </li>
      <li class="mt-4" :class="{ active: category === '協力車' ? true : false }">
        <a href="#" class="h4"
        @click.prevent="$emit('getData',1,'協力車')">協力車</a>
      </li>
      <li class="mt-4" :class="{ active: category === '電動車' ? true : false }">
        <a class="h4" href="#"
        @click.prevent="$emit('get-data',1,'電動車')">電動車</a>
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
  props: ['category'],
  methods: {

  },
  mounted() {

  },
};

</script>

<style>

</style>
