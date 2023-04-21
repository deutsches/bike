<template>
  <div class="text-center" style="padding-top: 10%;">
    <h1>
      很抱歉!您搜尋的網頁不存在&nbsp;
      <i class="bi bi-emoji-frown"></i>
    </h1>
    <p class="mt-5 display-6">{{ second }}秒後將為您導回首頁~</p>
    <button class="btn btn-outline-secondary mt-3" @click="goBack()">回首頁</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      second: 3,
    };
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
    timeCount() {
      setInterval(() => {
        this.second -= 1;
      }, 1000);
    },
  },
  mounted() {
    setInterval(() => {
      this.second -= 1;
    }, 1000);
    setTimeout(() => {
      this.$router.push('/');
    }, 3000);
  },
  unmounted() {
    // clearInterval(this.timeCount());
  },
};
</script>
