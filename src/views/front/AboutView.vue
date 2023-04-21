<template>
  <NavbarFront></NavbarFront>

  <header class="header-about position-relative"
  style="">
    <h2 class="d-flex align-items-center justify-content-center text-white aboutUs">關於我們</h2>
  </header>

  <div class="py-5" style="background-color: #fffcf7">
    <div class="container">
      <div class="row d-lg-flex align-items-lg-center g-4">
        <div class="col-12 col-md-6">
          <img src="../../assets/img/about2.jpg"  class="w-100" alt="福隆驛站照片" />
        </div>
        <div class="col-12 col-md-6">
          <h2 class="text-center fw-bold mb-4">福隆驛站</h2>
          <p class=" lh-lg pe-4 ps-4">
            成立於2017年，店面空間大，附設大型停車場，空間寬敞無壓力，老闆與老闆娘熱情，歡迎來感受福隆的人情味。
            設有販賣部、座位區，販賣部除了販售特產石花凍外，也販售咖啡、飲品、厚片、小點心等。
            腳踏車、電動車款式眾多也有我們這裡才有的斜躺式加樂車，好玩又有趣哦～ <br />
            <ul class=" list-unstyled">
              <li><span class="circle"></span>&nbsp; 附有停車場🅿️</li>
              <li><span class="circle"></span>&nbsp; 飲料部販賣咖啡冷飲石花凍🍽️</li>
              <li><span class="circle"></span>&nbsp; 代購福隆便當🍱</li>
            </ul>
          </p>
        </div>
      </div>
      <div class="row d-lg-flex flex-row-reverse align-items-lg-center g-4">
        <div class="col-12 col-md-6">
          <img src="../../assets/img/manage.jpg" class="w-100" alt="經營理念圖" />
        </div>
        <div class="col-12 col-md-6">
          <h2 class="text-center fw-bold mb-4">經營理念</h2>
          <p class=" lh-lg pe-4 ps-4">
            「騎乘望福隆美景，停歇享驛站香氣。」<br />
            驛站的宗旨希望讓每個來到福隆可以很放鬆很享受～
            不管是搭火車來或是開著汽車，沿途風景、海景已經是開啟你旅程的第一感受。
            熱情的老闆娘可以詳細的為您介紹這美麗的地方，騎乘我們的腳踏車穿梭福隆，看你是要沿海環狀線22公里亦或者草嶺隧道來回九公里，微風徐徐吹著，絕對讓你快門停不下來，製造很多難忘回憶。
            我們驛站飲料部所提供的美食飲品，除了有東北角特產的石花凍，炎熱的天氣裡是消暑聖品；
            老饕才懂的隱藏版咖啡漸層的口感，撲鼻而來的南瓜香，一入口濃郁的咖啡滿足你的味蕾，整個福隆僅此一家。
            停車方便，舒適的環境讓你流連忘返，讓你不會忘記的「福隆驛站」。
          </p>
        </div>
      </div>
      <div class="row d-lg-flex align-items-lg-center g-4">
        <div class="col-12 col-md-6">
            <iframe class="w-100"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1278.2928548479965!2d121.94702944122692!3d25.015124512052846!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x345d5da9507d03ab%3A0x62425efbb01c68c2!2z56aP6ZqG6amb56uZL-emj-mahuenn-iHquihjOi7ii_npo_pmobnp5_pm7vli5Xou4ov56aP6ZqG56ef5Y2U5Yqb6LuKL-emj-mahuenn-mbu-WLlei7ii_npo_pmobnp5_ohbPouI_ou4ov56aP6ZqG5Zau6LuK5Ye656ef!5e0!3m2!1szh-TW!2sus!4v1676969496140!5m2!1szh-TW!2sus"
            width="600"
            height="450"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="col-12 col-md-6 text-center">
          <h2 class="fw-bold mb-4">聯絡方式</h2>
          <ul class="list-unstyled">
            <li><p>地址：228台灣新北市貢寮區福隆街2巷1-1號</p></li>
            <li>
              <p>電話：<a href="tel:+0912345678">0912345678</a></p>
            </li>
            <li>
              <p>信箱：<a href="mailto:fulong@mail.com">fulong@mail.com</a></p>
            </li>
            <li><p>營業時間：8：00 ~ 17：00</p></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarFront from '../../components/NavbarFront.vue';

export default {
  data() {
    return {};
  },
  components: {
    NavbarFront,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style>
.header-about{
  background-repeat: no-repeat;
  background-position: 50.00% 28.83%;
  background-size: 100%;
  background-image: url(../../assets/img/about.jpg);
  height: 350px;
}
.header-about::before{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  content: '';
}
.aboutUs{
  height: inherit;
}
.circle::after{
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 7.5px;
  background-color: black;

}

@media (max-width: 767px) {
  .header-about {
    background-size: cover;
  }

}
</style>
