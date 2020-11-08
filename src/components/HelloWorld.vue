<template>
  <!-- Slideshow container -->
  <div class="mainpage row">
    <div class="main-page">
      <banner />
      <table class="col-xs-12">
        <tr>
          <td class="texted">
            <span class="verticle-center">
              <h3>Rings</h3>
              <p> The ihfgjde yg cg vcgfyu vgugf vghe vgyueg fvygd vgyegvyug dfiugv yegv geygvefgvgvugfdjgvjfdv uyfd vg fdvg gvucguv hudhs huis vg gf vugfsd urhg d difg vughdfu gvudfvgdfg viudfgiu vdfiu gviudfg ig</p>
            </span>
          </td>
          <td>
            <div class="themed-image">
              <img src="../assets/themed.png">
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="themed-image rotate">
              <img src="../assets/themed2.png">
            </div>
          </td>
          <td class="texted">
            <span class="verticle-center padded">
              <h3>Rings</h3>
              <p> The ihfgjde yg cg vcgfyu vgugf vghe vgyueg fvygd vgyegvyug dfiugv yegv geygvefgvgvugfdjgvjfdv uyfd vg fdvg gvucguv hudhs huis vg gf vugfsd urhg d difg vughdfu gvudfvgdfg viudfgiu vdfiu gviudfg ig</p>
            </span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <div class="themed-image padded">
              <img src="../assets/themed3.png">
            </div>
          </td>
        </tr>
        <tr style="transform:translate(0px, -10px);">
          <td>
            <div class="themed-image rotate">
              <img src="../assets/themed4.png">
            </div>
          </td>
          <td class="texted">
            <span class="verticle-center">
              <h3>Rings</h3>
              <p> The ihfgjde yg cg vcgfyu vgugf vghe vgyueg fvygd vgyegvyug dfiugv yegv geygvefgvgvugfdjgvjfdv uyfd vg fdvg gvucguv hudhs huis vg gf vugfsd urhg d difg vughdfu gvudfvgdfg viudfgiu vdfiu gviudfg ig</p>
            </span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <h2> DELIGHTS </h2>
          </td>
        </tr>
        <tr>
          <td class="texted options">
            <span class="verticle-center">
              <p>TOP PICKS</p>
            </span>
          </td>
          <td class="texted options">
            <span class="verticle-center">
              <p>BEST RATED</p>
            </span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Login from './login.vue'
import Banner from './banner.vue'
import Categories from './categories.vue'
import { mapState } from 'vuex';
export default {
  name: 'Main',
  components: {
    Banner  },
  data(){
    return {
      name: null,
      password: null
    }
  },
  computed:{
    ...mapState({
      loggedIn: state => state.login.loggedIn
    })
  }
  }
</script>
<style scoped>
.hover-scale:hover {
  transform: scale(1.2) !important;
}
.mainpage{
  position: relative;
  text-align: center;
}
.login-block{
  position: absolute;
  justify-content: center;
  text-align: center;
  align-items: center;
  align-content: center;
  margin: auto;
}
.h1{
  font-size: 5vmin;
  letter-spacing: 0.05em;
}
.cat-parent {
  width: inherit;
  padding: 0.5%;
}
.themed-image img {
  max-height: 100%;
  max-width: 100%;
  min-width: 50%;
  object-fit: contain;
}
.themed-image {
  width: 100%;
}
.verticle-center {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
  height: inherit;
}
.texted {
  padding: 5%;
}
.rotate {
  transform: rotateY(180deg);
}
.padded {
  padding-top: 1%;
}
.options span{
  width: 100%;
  height: 100%;
  border: 1px solid white;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
}
.options {
  background-image: url('../assets/themed4.png');
  background-clip: no-clip;
  background-size: cover;
  border: 100px solid black;
}
</style>