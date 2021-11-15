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
  text-align: center;
  position: absolute;
  top: 60px;
  left: 15%;
  height: 100%;
  width: 85%;
  background-image: url('../assets/Main-back.jpg');
  background-size: 100% 100%;
}
</style>