<template>
  <span class="wrapper">
    <div class="side-nav hidden-lg hidden-mg hidden-xs hidden-sm">
      <div class="dropdown nav-options">
        <div class="fa fa-home">
          <span class="white"> H</span>
        </div>
        <div class="dropdown-content row">
          <span class="col-xs-12 home">Home</span>
          <div class="home-options-div col-xs-6">
            <p>Rings</p>
            <p>Rings</p>
          </div>
        </div>
      </div>
      <br>
      <div class="dropdown nav-options">
        <div class="fa fa-diamond">
          <span class="white"> D</span>
        </div>
        <div class="dropdown-content row">
          <span class="col-xs-12 home">Home</span>
          <div class="home-options-div col-xs-6">
            <p>Rings</p>
            <p>Rings</p>
          </div>
        </div>
      </div>
      <br>
      <div class="dropdown nav-options">
        <div class="fa fa-life-ring">
          <span class="white"> S</span>
        </div>
        <div class="dropdown-content row">
          <span class="col-xs-12 home">Home</span>
          <div class="home-options-div col-xs-6">
            <p>Rings</p>
            <p>Rings</p>
          </div>
        </div>
      </div>
      <br>
      <div class="dropdown nav-options">
        <div class="fa fa-circle-o">
          <span class="white"> G</span>
        </div>
        <div class="dropdown-content row">
          <span class="col-xs-12 home">Home</span>
          <div class="home-options-div col-xs-6">
            <p>Rings</p>
            <p>Rings</p>
          </div>
        </div>
      </div>
      <br>
      <div class="dropdown nav-options">
        <div class="fa fa-circle-o-notch">
          <span class="white"> P</span>
        </div>
        <div class="dropdown-content row">
          <span class="col-xs-12 home">Home</span>
          <div class="home-options-div col-xs-6">
            <p>Rings</p>
            <p>Rings</p>
          </div>
        </div>
      </div>
      <br>
      <div class="dropdown nav-options">
        <div class="fa fa-building-o">
          <span class="white"> L</span>
        </div>
        <div class="dropdown-content row">
          <span class="col-xs-12 home">Home</span>
          <div class="home-options-div col-xs-6">
            <p>Rings</p>
            <p>Rings</p>
          </div>
        </div>
      </div>
      <br>
      <div class="dropdown nav-options">
        <div class="fa fa-vcard-o">
          <span class="white"> K</span>
        </div>
        <div class="dropdown-content row">
          <span class="col-xs-12 home">Home</span>
          <div class="home-options-div col-xs-6">
            <p>Rings</p>
            <p>Rings</p>
          </div>
        </div>
      </div>
    </div>
    <div class="dropdown2 user col-xs-1">
      <i v-if="!menuToggled" class="three-line-dim fa fa-bars" @click="menuToggled = true" />
      <div class="dropdown-content2" :class="menuToggled? 'shows': ''">
        <i v-if="menuToggled" class="three-line-dim fa fa-times" @click="menuToggled = false" />
        <div v-if="loggedIn == 'true'" class="user-container">
          <p class="user-tile golden"><span class="red">{{ email.charAt(0) }}</span>{{ email.charAt(1) }}</p>
        </div>
        <p v-if="loggedIn == 'true'" class="user-email">{{ email }}</p>
        <div class="dropdown-wrapper">
          <div class="dropdown show">
            <a id="dropdownMenuLink"
               class="option-dropdown"
               href="#"
               role="button"
               data-toggle="dropdown"
            >
              Jewelz
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a class="dropdown-item" href="/items?&item=rings">Rings</a><br>
              <a class="dropdown-item" href="/items?&item=tanmaiya">Tanmaiya</a><br>
              <a class="dropdown-item" href="/items?&item=earings">Earings</a><br>
              <a class="dropdown-item" href="/items?&item=pendents">Pendents</a><br>
              <a class="dropdown-item" href="/items?&item=braclets">Braclets</a><br>
              <a class="dropdown-item" href="/items?&item=necklace">Necklace</a>
            </div>
          </div>
          <div class="dropdown show">
            <a id="dropdownMenuLink"
               class="option-dropdown"
               href="#"
               role="button"
               data-toggle="dropdown"
            >
              Solitaire Collection
            </a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a class="dropdown-item" href="#">Loose Diamonds</a><br>
              <a class="dropdown-item" href="#">Rings</a><br>
              <a class="dropdown-item" href="#">Earings</a>
            </div>
          </div>
          <div class="dropdown show">
            <a id="dropdownMenuLink"
               class="option-dropdown"
               href="#"
               role="button"
               data-toggle="dropdown"
            >
              Gold
            </a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a class="dropdown-item" href="#">Action</a><br>
              <a class="dropdown-item" href="#">Another action</a><br>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </div>
          <div class="dropdown show">
            <a id="dropdownMenuLink"
               class="option-dropdown"
               href="#"
               role="button"
               data-toggle="dropdown"
            >
              Platinum
            </a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a class="dropdown-item" href="#">Action</a><br>
              <a class="dropdown-item" href="#">Another action</a><br>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </div>
          <div class="dropdown show">
            <a id="dropdownMenuLink"
               class="option-dropdown"
               href="#"
               role="button"
               data-toggle="dropdown"
            >
              Stores
            </a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a class="dropdown-item" href="#">Action</a><br>
              <a class="dropdown-item" href="#">Another action</a><br>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </div>
          <div class="dropdown show">
            <a id="dropdownMenuLink"
               class="option-dropdown"
               href="#"
               role="button"
               data-toggle="dropdown"
            >
              About Panaache
            </a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a class="dropdown-item" href="#">Action</a><br>
              <a class="dropdown-item" href="#">Another action</a><br>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </div>
          <div v-if="loggedIn != 'true'" class="dropdown">
            <a class="option-dropdown" href="/login">
              Login
            </a>
          </div>
          <div v-if="loggedIn == 'true'" class="dropdown">
            <a class="option-dropdown" href="#">
              My Profile
            </a>
          </div>
          <div v-if="loggedIn == 'true'" class="dropdown">
            <a class="option-dropdown" href="#" @click="reset()">
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return  {
            menuToggled: false
        }
    },
    computed : {
        ...mapState({
            email: state => state.login.email,
            loggedIn: state => state.login.loggedIn
        })
    },
    methods: {
        ...mapActions({
            reset: 'login/reset'
        })
    }
}
</script>
<style scoped>
.side-nav {
  position: fixed;
  height: 50vh;
  left: 0;
  top: 30vh;
  vertical-align: middle;
  min-width: 4.5%;
  animation: delayed;
  border-radius: 0px 10px 10px 0px;
  animation-duration: 8s;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.7)
}
.nav-options .fa {
  color: transparent;
  background: linear-gradient(90deg, white, grey, white);
  background-clip: text;
}
.nav-options .fa-circle-o {
  color: transparent;
  background: linear-gradient(rgb(148, 126, 2), rgb(194, 165, 3), rgb(187, 159, 2), rgb(194, 165, 1), rgb(148, 126, 2));
  background-clip: text;
}
.dropdown {
  position: relative;
  display: inline-block;
  text-align: center;
}

.dropdown-content {
  display: none;
  position: absolute;
  background:rgb(0, 0, 0, 0.9);
  color: rgb(255, 255, 255);
  /* text-align: center; */
  min-width: 160px;
  width: 100%;
  box-shadow: 1px 1px 5px 1px rgba(255, 255, 255, 0.2);
  padding: 12px 16px;
  z-index: 1;
  animation: fading;
  animation-duration: 0.7s;
}
.dropdown:hover .dropdown-content {
  display: block;
}

.nav-options {
  margin: 23%;
  font-size: 120%;
}
.home {
  border-bottom: 1px solid white;
}
.dropdown2 {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  z-index: 2;
  animation: delayed;
  animation-duration: 6s;
}

.dropdown-content2 {
  display: none;
  position: fixed;
  top: 0;
  font-size: 120%;
  left: 0;
  height: 100vh;
  width: 20%;
  backdrop-filter: blur(5px);
  background: rgb(0, 0, 0, 0.9);
  color: rgb(255, 255, 255);
  min-width: 160px;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
scrollbar-width: none;
  padding: 12px 16px;
  z-index: 1;
}
.dropdown-content2::-webkit-scrollbar {
    display: none;
}
@media screen and (orientation: portrait) {
.dropdown-content2{
    width: 70%;
    font-size: 85%;
}
}
.dropdown-content2 .user {
    max-width: 100%;
    object-fit: contain;
}
.option {
    min-width: 100% !important;
    width: 100%;
    display: block;
    padding: 5%;
    text-align: left;
    border-bottom: 1px solid white;
}
.shows {
    padding-top: 15vh;
    display: inline;
    overflow-wrap: break-word;
    animation: slide-left;
    animation-duration: 0.5s;
}
.login-button {
    position: fixed;
    bottom: 0;
    left: 0;
    display: inline-block;
    width: inherit;
    text-align: center;
    padding: 1%;
    background:  maroon;
    color: white;
    z-index: 99999;
    animation: slide-left;
    animation-duration: 0.5s;
}
.dropdown-content2 .dropdown a {
    display: block;
    outline: none;
    width: inherit;
    text-align: left !important;
    text-decoration: none;
    color: white;
    background-color: inherit;
    padding: 1.4vh;
}
.dropdown-content2 .dropdown {
    width: 100% !important;
    padding: 1%;
    background-color: inherit;
}
.dropdown-content2 .dropdown-menu {
    position: relative;
    width: 100% !important;
    padding-left: 10%;
    padding-bottom: 10%;
    background-color: inherit;
    animation: fading;
    animation-duration: 1s;
}
.user-container {
    width: 100%;
    padding-top: 40%;
    position: relative;
}
.user-tile {
    position: absolute;
    font-size: 500%;
    top: 0;
    left: 5%;
}
.dropdown-wrapper {
    padding-top: 10%;
}
.user-email {
    text-align: left;
    margin-left: 5%;
}
.three-line-dim {
  position: absolute;
  color: rgb(87, 87, 87);
  top: 0px;
  left: 0px;
  padding-top: 20px;
  padding-left: 20px;
  font-size: 200%;
}
</style>