<template>
  <div class="login-wrapper">
    <span class="login-box row">
      <span class="login col-xs-12 col-md-6">
        <span v-if="askOtp!='true'" class="wrapper">
          <h2> <b>{{ block.toUpperCase() }} </b></h2>
          <span v-if="block=='login'" class="Login">
            <input v-model="email" type="text" class="name input col-xs-12" placeholder="Email">
            <input v-model="password" type="password" class="password input col-xs-12" placeholder="Password">
            <input type="submit" class="submit col-xs-12" text="LOGIN" @click="log()">
            <p class="white"> New to Panaache? <span class="blue" @click="initialize('signup')">Create an Account</span></p>
          </span>
        </span>
        <span v-if="block=='signup'" class="Login">
          <signup />
          <p class="white">Have an Account ?<span class="blue" @click="initialize('login')"> Login</span></p>
        </span>
        <span v-if="askOtp=='true' && block=='login'" class="askOtp row">
          <h3>Account not yet Verified<br>please Verify</h3>
          <input v-model="emailOtp" type="number" class="input col-xs-12" placeholder="Email OTP">
          <p v-if="failedOtp=='true'" class="red">Wrong otp entered please retry</p>
          <button class="otpSub col-xs-3" @click="verify()">Verify</button>
          <span class="resend col-xs-4" @click="resendMe()">Resend otp</span>
        </span>
        <div v-if="loggedIn === 'failed' || resendOtp === 'failed'" class="red-failed">
          Error logging you In ! Plese check your Internet Connection and Login Details or contact panaache@gmail.com
        </div>
      </span>
      <span class="login right verticle-aligned col-xs-12 col-md-6">
        <h3>Assorted Collection of Exquisite diamond awaiting for you!! Login Now and Experience the Beauty of Jewelz</h3>
      </span>
    </span>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Signup from './signup.vue';
export default {
    name: 'Login',
    components: {
        Signup
    },
    data() {
        return {
            email: null,
            password: null,
            emailOtp: null,
            block:'login'
        }
    },
    computed: {
        ...mapState({
            loggedIn: state => state.login.loggedIn,
            askOtp: state => state.login.askOtp,
            resendOtp: state => state.login.resendOtp,
            failedOtp: state => state.login.failedOtp
        })
    },
    methods: {
        async verify() {
        let body = {email: this.email, password: this.password, emailOtp: this.emailOtp}
        await this.otpVerify({ body });
      },
      async resendMe(){
        let body = {
          email: this.email,
          password: this.password
        }
        await this.resend({body});
      },
      async initialize(block) {
          this.block = block;
          await this.reset();
      },
        ...mapActions({
            login: 'login/login',
            otpVerify: 'login/otpVerify',
            resend: 'login/resend',
            reset: 'login/reset'
        }),
        async log() {
            if(this.email && this.password){
                await this.login({ body: { email: this.email, password: this.password} })
            }
        }
    }
}
</script>
<style scoped>
.login-wrapper {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    color: black;
    position: relative;
}
.askOtp {
  justify-content: center;
  vertical-align: middle;
}
.resend{
  height: 100%;
  color: rgb(9, 9, 172);
  cursor: pointer;
  padding: 1%;
  margin: 1%;
}
td {
  width: 50%;
}
.otpSub {
  border: 0px;
  padding: 2%;
  margin: 1%;
  background-color: #4bb543;
  
}
.otpInput {
  margin: 1%;
}
.blue{
    color: rgb(151, 129, 5);
    cursor: pointer;
}
.red-failed {
    background-color: rgb(237, 67, 55,0.6);
    border: 1px solid rgb(238, 54, 54);
}
.login-box {
    background: rgba(124, 124, 124, 0.2);
    background-repeat: no-repeat;
    background-size:cover;
    display: inline-block;
    padding: 5%;
    vertical-align: middle;
    align-items: center;
    vertical-align: middle;
    width: 100vw;
    box-shadow: 1px 1px 5px 1px inherit;
}
.login-box h2, .login-box h3{
    color: #846427
}
.login-box td {
  padding: 5%;
}
.input{
    height: 4vh;
    color: var(--text);
    margin: 10px 0px;
    border: 0px;
    border-bottom: 1px solid black;
    background: transparent;
}
.submit {
    height: auto;
    display: flex;
    color:wheat;
    background: rgb(7,7,8);
    background: linear-gradient(90deg, rgba(7,7,8,1) 0%, rgba(108,9,9,1) 57%, rgba(7,7,8,1) 100%);
    font-size: 25px;
    margin: 10px 0px;
    border: 0px;
    justify-content: center;
    vertical-align: middle;
    box-shadow: 1px 1px 3px 1px black;
}

.Login-image {
    max-width: 15%;
    max-height: 15%;
}
.left {
  border-right: 1px solid white;
}
@media screen and (orientation: portrait) {
  .right h3{
    font-size: 90%;
  }
}
</style>