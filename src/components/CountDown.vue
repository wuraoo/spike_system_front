<template>
  <div>
    <div v-if="showOver === 0">
      <div>距离活动开始还剩</div>
      <div>{{ dayNum }}天{{ hourNum }}时{{ minuteNum }}分{{ secondNum }}秒</div>
    </div>
    <div v-else-if="showOver === 2">来晚了~活动已结束~</div>
    <div v-else>活动正在进行~</div>
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
      showOver: 0, //0：未开始  1:正在进行  2：已结束
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
      this.showOver = 0;
      console.log(0)
      this.timeDown();
    }
    // 如果超过了结束时间则显示已结束
    else if (moment(new Date()).isAfter(this.endTime)) {
      this.showOver = 2;
      console.log(2)
    }
    else{
      this.showOver = 1;
      console.log(1)
    }
  },
};
</script>

<style>
</style>