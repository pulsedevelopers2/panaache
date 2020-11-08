<template>
  <span class="signup">
    <span v-if="!(askOtp=='true')" class="signing">
      <input v-model="name" type="text" class="name input col-xs-12" placeholder="Name">
      <input v-model="email" type="text" class="name input col-xs-12" placeholder="Email">
      <input v-model="phone" type="number" class="name input col-xs-12" placeholder="Phone">
      <input v-model="password" type="password" class="password input col-xs-12" placeholder="Password">
      <p v-if="mandateReq" class="red">** All fields are Mandatory **</p>
      <p v-if="askOtp=='failed'" class="red"> ** failed sending otp Please retry ** </p>
      <p v-if="existingUser == 'true'" class="red"> ** User Exist please use different email or phone **</p>
      <input type="submit" class="submit col-xs-12" text="LOGIN" @click="signup()">
    </span>
    <span v-if="askOtp=='true' " class="askOtp row">
      <input v-model="emailOtp" type="number" class="input col-xs-12" placeholder="Email OTP">
      <p v-if="failedOtp=='true'" class="red col-xs-12">Wrong otp entered please retry</p>
      <button class="otpSub col-xs-3" @click="verify()">Verify</button>
      <span class="resend col-xs-4" @click="resendMe()">Resend otp</span>
    </span>
    <br>
  </span>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Signup',
    data(){
      return {
        name: null,
        email: null,
        phone: null,
        password: null,
        mandateReq: false,
        emailOtp: null
      }
    },
    computed: {
      ...mapState({
        askOtp : state => state.login.askOtp,
        existingUser: state => state.login.existingUser,
        failedOtp: state => state.login.failedOtp
      }),
    },
    methods: {
      async signup() {
        if (this.name && this.email && this.password && this.phone){
          this.mandateReq = false;
        let body = {
          name: this.name,
          email: this.email,
          password: this.password,
          phone: this.phone
        }
        await this.sign({ body });
        }else{
          this.mandateReq = true
        }
      },
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
      ...mapActions({
        sign: 'login/sign',
        otpVerify: 'login/otpVerify',
        resend: 'login/resend'
      })
    }
}
</script>
<style scoped>
.input{
    height: 4vh;
    color: var(--text);
    margin-top: 10px;
    border: 0px;
    border-bottom: 1px solid black;
    background: transparent;
}
.resend{
  height: 100%;
  color: rgb(141, 120, 2);
  cursor: pointer;
  padding: 1%;  
  margin: 1%;
}
.askOtp {
  justify-content: center;
  vertical-align: middle;
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
</style>