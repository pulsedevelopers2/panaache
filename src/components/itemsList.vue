<template>
  <div class="items row">
    <side-nav />
    <div v-for="(item) in items" :key="item.id" class="itemblock col-xs-6 col-md-3">
      <span class="hyperlink">
        <div class="image">
          <img :src="item.image_link[0]">
        </div>
        <span class="row item_details">
          <span class="col-xs-12 col-sm-12 details container">
            <span class="title">{{ item.title }}</span><br>
          </span>
        </span>
        <span class="centered">
          <span class="title">
            {{ item.title }}<br>
            <button class="hover-button"><a class="hover-link" :href="'/item?&item=' + item.id">View</a></button>
          </span>
        </span>
        <br>
      </span>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import SideNav from '../components/SideNav'
export default {
    components: {
        SideNav
    },
    computed: {
        ...mapState({
            items: state => state.items.items,
            loaded: state => state.items.loaded
        })
    },
    methods: {
        ...mapActions({

        })
    }
}
</script>
<style scoped>
.itemblock {
    min-height: 30vh;
    display: inline-block;
    border: 5px solid rgb(0, 0, 0);
    text-align: center;
    background: linear-gradient(40deg, black, rgb(34, 34, 34))
}
.item_details {
    width: 100%;
    min-height: 20%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    left: 0;
}
.itemblock:hover {
    border: 1px solid rgb(117, 76, 76);
}
.centered {
    display: none;
    width: 100%;
    min-height: 100%;
    background: rgba(0, 0, 0, 0.9);
    position: absolute;
    top: 0;
    left: 0;
}
.centered .title {
    width: 100%;
}
.itemblock:hover .centered {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fading;
    animation-duration: 0.6s;
}
.hover-button {
    border: 1px solid rgb(117, 76, 76);
    color: white;
    min-width: 50%;
    margin: 1%;
    padding: 1%;
    background: transparent;
}
.hover-link {
    display: block;
    width: 100%;
    height: inherit;
    text-decoration: none;
}
a {
    color: white;
}
.image {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 0;
}
.image img {
    max-width: 50%;
    max-height: 15vh;
    object-fit: contain;
}
</style>