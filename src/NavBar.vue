<template>
  <span class="">
    <div class="nav-bar row">
      <a href="/" class="image-wrapper"><img class="nav-logo col-xs-12" src="./assets/fullLogo.png"></a>
    </div>
    <login v-if="loggedIn != 'true' && loggedIn!='loading'" class="login-block" />
    <img v-if="loggedIn == 'loading'" src="./assets/loader.gif" class="loading-block">
  </span>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import Login from './components/login'
export default {
  components: {
    Login
  },
  computed: {
    ...mapState({
      email: state => state.login.email,
      loggedIn: state => state.login.loggedIn
    })
  },
  async created() {
    await this.cachedVerify()
  },
  methods: {
    ...mapActions({
      reset: 'login/reset',
      cachedVerify: 'login/cachedVerify'
    }),
    async logout() {
      if (this.loggedIn == 'true') {
        await this.reset();
      }
    }
  }
}
</script>
<style scoped>
.nav-bar {
    height: 15vh;
    width: 100%;
    padding: 0;
    max-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
}
.email {
  color: black;
}
.login-block{
  position: absolute;
  justify-content: center;
  text-align: center;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 100%;
  background: transparent;
  margin: auto;
}
.loading-block {
   margin: 0;
  position: absolute;
  justify-content: center;
  top: 20%;
  left: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
}

.nav-options{
  margin: 0;
  padding: 0;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  text-align: left;
}
.nav-button {
  height: inherit;
  background: transparent;
  border: 0px;
  padding: 0;
  font-size: 85%;
  color: white;
}
.user{
    justify-content: right;
    padding: 0.5%;
    width: auto;
    height: 100%;
}
.users{
    justify-content: right;
    padding: 0.5%;
    width: auto;
    height: 80%;
}
.log{
  background-color: #af7723;
  border: 0;
  width: 100%;
}
.log :nth-child(1) {
  background: linear-gradient(45deg, #a17618, #af8323, #d1a13a, #af8323, #a16b18);
  border: 1px solid #af7723;
  padding: 5%
}
.log :nth-child(2) {
  background-color: transparent;
  border: 1px solid #af7723;
  padding: 5%
}
.dropdown {
  position: absolute;
  right: 0;
  display: inline-block;
  text-align: center;
  padding: 0.5%;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: rgb(24, 23, 23);
  right: 0;
  color: white;
  text-align: center;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  border-radius: 5px;
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
.products {
  display: inline-block;
  text-align: center;
  padding: 0.5%;
}
.products:hover .dropdown-content {
  display: block;
}
.image-wrapper {
  width: 100%;
  max-height: 60px;
  height: 15vh;
  display: block;
  padding: 0;
}
.nav-logo {
  max-height: 100%;
  object-fit: contain;;
}
</style>