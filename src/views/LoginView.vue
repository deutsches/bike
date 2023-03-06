<template>
    <div class="limiter" id="app">
      <div
        class="container-login100"
      >
        <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
          <form class="login100-form validate-form">
            <span class="login100-form-title p-b-49"> Login </span>
            <div
              class="wrap-input100 validate-input m-b-23"
              data-validate="Username is reauired"
            >
              <span class="label-input100">Email</span>
              <input
                class="input100"
                type="email"
                name="username"
                placeholder="Type your Email" id="userName"
                v-model="username"
                required
              />
              <span class="focus-input100">
                <i class="bi bi-person h5"></i>
              </span>
            </div>
            <div
              class="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <span class="label-input100">Password</span>
              <input
                class="input100"
                type="password"
                name="pass"
                placeholder="Type your password" id="password"
                v-model="password"
                required
              />
              <span class="focus-input100">
                <i class="bi bi-shield-lock h5"></i>
              </span>
            </div>
            <div class="text-right p-t-8 p-b-31">
              <a href="#"> Forgot password? </a>
            </div>
            <div class="container-login100-form-btn">
              <div class="wrap-login100-form-btn">
                <div class="login100-form-bgbtn"></div>
                <button type="button" class="login100-form-btn" id="loginBtn"
                 @click="login">Login</button>
              </div>
            </div>
            <div class="txt1 text-center p-t-54 p-b-20">
              <span> Or Sign Up Using </span>
            </div>
            <div class="flex-c-m">
              <a href="#" class="login100-social-item bg1">
                <i class="bi bi-facebook"></i>
              </a>
              <a href="#" class="login100-social-item bg2">
                <i class="bi bi-twitter"></i>
              </a>
              <a href="#" class="login100-social-item bg3">
                <i class="bi bi-google"></i>
              </a>
            </div>
            <div class="flex-col-c p-t-155">
              <span class="txt1 p-b-17"> Or Sign Up Using </span>
              <a href="#" class="txt2"> Sign Up </a>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import '../assets/login.css';

const { VITE_APP_URL } = import.meta.env;
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      const data = {
        username: this.username,
        password: this.password,
      };
      this.$http
        .post(`${VITE_APP_URL}/v2/admin/signin`, data)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token};expires=
            ${new Date(expired)}; path=/`;
            this.$router.push('/admin');
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
};

</script>
<style>
body{
    background-image: url('../../public/bg-01.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
