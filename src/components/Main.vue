<template>
  <div class="my_main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
 name:"Main",
 data() {
     return {
         
     }
 },
}
</script>

<style>
.my_main{
  position: absolute;
  top: 60px;
  left: 15%;
  height: 100%;
  width: 85%;
  background-color: #9E9C9C;
}
</style>