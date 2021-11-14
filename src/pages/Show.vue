<template>
  <div>show</div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "Show",
    data() {
      return {
        
      }
    },
    created() {
        axios.defaults.withCredentials=true;
        axios.get('http://localhost:8001/spike_system/user/goods').then(
          req=>{
            console.log(req.data)
          },
          error=>{
            console.log(error.message)
          })
    },
  }
</script>

<style>

</style>