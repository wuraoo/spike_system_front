<template>
<div>
    <Head/>
    <Aside/>
    <Main/>

</div>
</template>

<script>
import Head from './Head.vue'
import Main from './Main.vue'
import Aside from './Aside.vue'
  export default {
    name: 'Home',
    components: {Head,Main,Aside},
    data() {
      return {

      }
    },
  }
</script>

<style>

</style>