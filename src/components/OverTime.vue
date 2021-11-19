<template>
  <div>
      {{overTime}}
  </div>
</template>

<script>
import moment from "moment"
export default {
    name: "OverTme",
    props: ["endTime"],
    data() {
        return {
            overTime: ''
        }
    },
    created() {
        // 格式化时间
        this.overTime = moment(this.endTime).format("YYYY-MM-DD HH:mm:SS")
    },
}
</script>

<style>

</style>