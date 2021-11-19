<template>
  <div>
    <div v-if="!showOver">
      <div>距离活动开始还剩</div>
      <div>{{ dayNum }}天{{ hourNum }}时{{ minuteNum }}分{{ secondNum }}秒</div>
    </div>
    <div v-else>来晚了~活动已结束~</div>
  </div>
</template>

<script>
// 日期类库
import moment from "moment";
export default {
  name: "CountDown",
  props: ["startTime", "endTime","btnType"],
  data() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      timeSetInterval: null,
      showTimeDown: false,
      showOver: false,
    };
  },
  methods: {
    timeDown() {
      this.timeSetInterval = setInterval(() => {
        if (moment(this.startTime).isBefore(moment())) {
          this.showTimeDown = false;
          clearInterval(this.timeSetInterval);
          location.reload();
        }
        let dur = moment.duration(moment(this.startTime) - moment(), "ms");
        this.days = dur.get("days");
        this.hours = dur.get("hours");
        this.minutes = dur.get("minutes");
        this.seconds = dur.get("seconds");
      }, 1000);
    },
  },
  computed: {
    dayNum() {
      if (this.days < 10) return "0" + this.days;
      return this.days;
    },
    hourNum() {
      if (this.hours < 10) return "0" + this.hours;
      return this.hours;
    },
    minuteNum() {
      if (this.minutes < 10) return "0" + this.minutes;
      return this.minutes;
    },
    secondNum() {
      if (this.seconds < 10) return "0" + this.seconds;
      return this.seconds;
    },
  },
  created() {
    // 判断是否还没开始
    if (moment(new Date()).isBefore(this.startTime)) {
      this.showTimeDown = true;
      // 给父组件传递false表示不能购买
      // this.btnType(false)
      this.timeDown();
    }
    // 如果超过了结束时间则显示已结束
    if (moment(new Date()).isAfter(this.endTime)) {
      // 给父组件传递false表示不能购买
      // this.btnType(false)
      this.showOver = true;
    }
  },
};
</script>

<style>
</style>