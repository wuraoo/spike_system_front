<template>
  <div class="show">
    <el-table
      :data="goods"
      style="width: 100%"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
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
          <CountDown
            :startTime="scope.row.startTime"
            :endTime="scope.row.endTime"
          ></CountDown>
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间">
        <template slot-scope="scope">
          <OverTime :endTime="scope.row.endTime"></OverTime>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            :disabled="isCanBuy(scope.row.startTime, scope.row.endTime)"
            type="danger"
            icon="el-icon-thumb"
            @click="open(scope.row.id)"
            >立即抢购</el-button
          >
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
    <el-dialog
      title="请输入验证码"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <template>
        <div id="image">
          <img :src="image" min-width="100" height="100" />
          <el-input
            id="verCodeText"
            v-model="verCode"
            placeholder="请输入结果"
          ></el-input>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="getVerCode">更换</el-button>
        <el-button type="primary" @click="checkVerCode">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import CountDown from "../components/CountDown.vue";
import OverTime from "../components/OverTime.vue";
// 携带cookie
axios.defaults.withCredentials = true;
export default {
  name: "Spike",
  components: { CountDown, OverTime },
  data() {
    return {
      goods: [],
      page_size: 4,
      total: 0,
      currentpage: 1,
      // 标志按钮是否可以开始抢购
      isStart: true,
      loading: false,
      // 将要抢购的商品id
      goodId: 0,
      // 模态框是否显示
      centerDialogVisible: false,
      // 验证码图片
      image: "",
      // 验证码
      verCode: "",
    };
  },
  methods: {
    // 当前变动是触发函数
    handleCurrentChange(val) {
      // 再次调用请求获取数据(其实可以不这样做，因为数据已近全部获取到了)
      this.getData(val);
    },
    // 获取页面信息
    getData() {
      axios.get(`http://localhost:8001/spike_system/skgoods/info`).then(
        (req) => {
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
    // 秒杀按钮点击事件
    open(goodId){
      this.goodId = goodId
      this.getVerCode()
      // 显示验证码模态框
      this.centerDialogVisible = true;
    },
    // 获取验证码
    getVerCode() {
      axios.get(`http://localhost:8001/spike_system/skorder/vercode?goodId=${this.goodId}`).then(
        (res) => {
          if (res.data.code == 20000) {
            this.image = res.data.data.image;
          }
        },
        (error) => {
          this.$message.error(error.response.data);
        }
      );
    },
    // 验证码检查
    checkVerCode() {
      let param = {
        vercode: this.verCode,
        goodId: this.goodId
      };
      axios
        .post(`http://localhost:8001/spike_system/skorder/check/vercode`, param)
        .then(
          (res) => {
            if(res.data.code == 20000){
              // 成功则执行秒杀方法
              this.getPath(this.goodId, this.currentpage)
              this.centerDialogVisible = false;
            }else{
              this.$message.error(res.data.message)
            }
          },
          (error) => {
            this.$message.error(error.response.data)
          }
        );
    },
    // 获取秒杀地址：只有获取到秒杀的地址才能进行秒杀操作（接口隐藏）
    getPath(goodId, curr) {
      axios
        .get(`http://localhost:8001/spike_system/skorder/path/${goodId}`)
        .then(
          (res) => {
            if (res.data.code == 20000) {
              let path = res.data.data.path;
              this.submit(goodId, curr, path);
            } else {
              this.$message.error("非法请求");
            }
          },
          (error) => {
            console.log(error);
            this.$message.error("请求错误");
          }
        );
    },
    // 抢购请求
    submit(goodId, curr, path) {
      axios
        .get(`http://localhost:8001/spike_system/skorder/${path}/buy/${goodId}`)
        .then(
          (res) => {
            // console.log(curr, res);
            // 请求成功
            if (res.data.code === 22220) {
              // 获取结果
              this.getResult(curr, goodId);
            }
            // 未登录
            else if (res.data.code === 22222) {
              this.$message(res.data.message);
              // 跳转登录
              this.$router.push("/login");
            }
            // 其他错误
            else {
              this.$message("购买失败: " + res.data.message);
            }
          },
          (error) => {
            console.log(error.message);
            this.$message("系统错误");
          }
        );
    },
    // 抢购请求后查询是否下单成功
    getResult(curr, goodId) {
      // 显示加载
      this.loading = true;
      // 查询是否下单成功
      axios
        .get(`http://localhost:8001/spike_system/skorder/confirm/${goodId}`)
        .then(
          (res) => {
            if (res.data.code == 23333) {
              setTimeout(() => {
                //设置延迟执行
                this.getResult(curr, goodId);
              }, 1000);
            } else if (res.data.code == 20000) {
              this.$message("秒杀成功~");
              // 关闭加载
              this.loading = false;
              // 页面跳转
              this.getData(curr);
            } else {
              this.$message(res.data.message);
              // 关闭加载
              this.loading = false;
              // 页面跳转
              this.getData(curr);
            }
          },
          (error) => {
            console.log(error);
            this.$message("系统错误");
            this.loading = false;
          }
        );
      curr + "a";
    },
    // 该方法用于改变购买按钮状态（是否可点击）
    isCanBuy(startTime, endTime) {
      if (moment(new Date()).isBefore(startTime)) {
        return true;
      }
      // 如果超过了结束时间则显示已结束
      else if (moment(new Date()).isAfter(endTime)) {
        return true;
      } else {
        return false;
      }
    },
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
#image {
  margin-left: 140px;
}
#verCodeText {
  width: 250px;
}
</style>