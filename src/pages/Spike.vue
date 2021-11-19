<template>
  <div class="show">
    <el-table :data="goods" style="width: 100%">
      <el-table-column prop="skGoodName" label="名称" width="180">
      </el-table-column>
      <el-table-column prop="skGoodImg" label="图片" width="180">
        <!-- 图片的显示:使用时只需要注意scope.row.goodsImg中的goodsImg改为自己数据中的属性名称即可 -->
        <template slot-scope="scope">
          <img :src="scope.row.skGoodImg" min-width="100" height="100" />
        </template>
      </el-table-column>
      <el-table-column prop="skGoodTitle" label="标题"> </el-table-column>
      <el-table-column prop="goodPrice" label="原价"> </el-table-column>
      <el-table-column prop="skPrice" label="秒杀价"> </el-table-column>
      <el-table-column prop="skStock" label="库存"> </el-table-column>
      <el-table-column prop="startTime" label="开始时间"> 
        <template slot-scope="scope">
          <!-- 传开始时间给子组件 -->
          <CountDown :startTime="scope.row.startTime" :endTime="scope.row.endTime"></CountDown>
        </template> 
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间"> 
        <template slot-scope="scope">
          <OverTime :endTime="scope.row.endTime"></OverTime>
        </template> 
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="">
          <el-button type="danger" icon="el-icon-thumb" @click="submit">立即抢购</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="page_size"
      :current-page="currentpage"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
import CountDown from '../components/CountDown.vue'
import OverTime from '../components/OverTime.vue'
export default {
  name: "Spike",
  components: {CountDown,OverTime},
  data() {
    return {
      goods: [],
      page_size: 4,
      total: 0,
      currentpage: 1,
    };
  },
  methods: {
    // 当前变动是触发函数
    handleCurrentChange(val) {
      // 再次调用请求获取数据(其实可以不这样做，因为数据已近全部获取到了)
      this.getData(val);
    },
    getData(curr) {
      // 携带cookie
      axios.defaults.withCredentials = true;
      axios.get(`http://localhost:8001/spike_system/skgoods/info`).then(
        (req) => {
          console.log(curr, req.data);
          // 请求成功
          if (req.data.code === 20000) {
            // 设置数据到data
            this.goods = req.data.data.skgoods;
            // 设置总数据数
            this.total = req.data.data.skgoods.length;
          } else {
            this.$message(req.data.message);
            this.$router.push("/login");
          }
        },
        (error) => {
          console.log(error.message);
          this.$message("系统错误");
        }
      );
    },
    // 该方法用于根据子组件对时间的判断显示按钮状态
    // btnType(canBuy){
    //   if(!canBuy){
    //     console.log("----"+canBuy)
    //     this.isDisabled = true
    //     this.btnColor = "info"
    //   }
    // },
    submit(){
      alert(1)
    }
  },
  created() {
    // 首次调用请求，获取数据
    this.getData(1);
  },
};
</script>

<style>
.show {
  height: 100%;
  width: 100%;
  background-color: white;
}
</style>