<template>
  <div>
    <nav-bar />
    <div v-if="loggedIn == 'true'" class="banner">
      <img src="../assets/ring.png">
      <p class="banner-title">
        Assorted collection of fine crafted rings that would melt your heart so that it can be the best.
      </p>
    </div>
    <span v-if="loggedIn == 'true'" class="main_items">
      <item-list />
    </span>
    <Footer v-if="loggedIn == 'true'" />
  </div>
</template>
<script>
import NavBar from '../NavBar.vue'
import { mapState, mapActions } from 'vuex';
import HoverDropDown from '../components/HoverDropDown.vue'
import ItemList from '../components/itemsList.vue'
import Footer from '../footer.vue'
export default {
    components: {
        NavBar,
        ItemList,
        Footer
    },
    data(){
        return {
            type: null
        }
    },
    computed: {
      ...mapState({
        token: state => state.login.token,
        loggedIn: state => state.login.loggedIn
      })
    },
    watch:  {
      loggedIn: function(curr, prev) {
        if (curr == 'true') {
          this.refresh();
        }
      }
    },
    async created(){
        let path = window.location.search;
        const url = new URLSearchParams(path);
        this.type = url.get('item');
        if (this.loggedIn == 'true') {
        let body = {
          item: this.type,
          token: this.token
        }
        await this.getItems({body})
      }
    },
    methods: {
      ...mapActions({
        getItems: 'items/getItems'
      }),
      async refresh() {
        let body = {
          item: this.type,
          token: this.token
        }
        await this.getItems({body})
      }
    }
}
</script>
<style scoped>
.banner {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  overflow-wrap: break-word;
  width: 100%;
  height: 25vmax;
  padding: 4%;
}
.banner img {
  max-height: 100%;
  object-fit: contain;
}
.banner p {
  max-height: 80%;
  overflow-wrap: break-word;
  font-size: 1.5vmax;
}
</style>