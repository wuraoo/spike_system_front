<template>
  <div>
    <p v-text="hello"></p>
    <el-avatar icon="el-icon-user-solid"></el-avatar>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        hello:"hello"
      }
    },
  }
</script>

<style>

</style>