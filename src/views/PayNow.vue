<template>
  <div class="pay">
    <h1> Please don't refresh this page</h1>
    <span v-if="payContent" v-html="payContent" />
  </div>
</template>
<script>
export default {
    data() {
        return {
            payContent: null
        }
    },
    async created() {
        let path = window.location.search;
        const url = new URLSearchParams(path);
        this.payContent = url.get('details');
        setTimeout(() => { document.getElementById('f1').submit() },1000)
    }
}
</script>