<template>
  <div class="show">
    <el-table :data="goods" style="width: 100%">
      <el-table-column prop="goodsName" label="名称" width="180">
      </el-table-column>
      <el-table-column prop="goodsImg" label="图片" width="180">
        <!-- 图片的显示:使用时只需要注意scope.row.goodsImg中的goodsImg改为自己数据中的属性名称即可 -->
        <template slot-scope="scope">
          <img :src="scope.row.goodsImg" min-width="150" height="150" />
        </template>
      </el-table-column>
      <el-table-column prop="goodsTitle" label="描述"> </el-table-column>
      <el-table-column prop="goodsPrice" label="价格"> </el-table-column>
      <el-table-column prop="goodsStock" label="库存"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-thumb" @click="showDetail">查看详情</el-button>
          <el-button type="warning" icon="el-icon-bank-card" @click="buyNow(scope.row.id,currentpage)"
            >立即购买</el-button
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Show",
  data() {
    return {
      goods: [],
      page_size: 4,
      total: 0,
      currentpage: 1
    };
  },
  methods: {
    // 当前变动是触发函数
    handleCurrentChange(val) {
      // 再次调用请求获取数据(其实可以不这样做，因为数据已近全部获取到了)
      this.getData(val)
    },
    getData(curr) {
      // 携带cookie
      axios.defaults.withCredentials = true;
      axios.get(`http://localhost:8001/spike_system/goods/info?pageNum=${curr}&pageSize=4`).then(
          (req) => {
            console.log(req.data);
            // 请求成功
            if (req.data.code === 20000) {
              // 设置数据到data
              this.goods = req.data.data.goods.records;
              // 设置总数据数
              this.total = req.data.data.goods.total;
            } else {
              this.$message(req.data.message);
              this.$router.push("/error-page");
            }
          },
          (error) => {
            console.log(error.message);
            this.$message("系统错误")
          }
        );
    },
    // 查看详情按钮点击事件
    showDetail(){
      alert("未开发，敬请等待")
    },
    // 立即购买
    buyNow(id,curr){
      axios.defaults.withCredentials = true;
      axios.get(`http://localhost:8001/spike_system/order/buy/${id}`).then(
          (req) => {
            // 请求成功
            if (req.data.code === 20000) {
              this.$message("购买成功~");
              // 再次查询
              this.getData(curr)
            } 
            // 未登录
            else if(req.data.code === 22222){
              this.$message(req.data.message);
              // 跳转登录
              this.$router.push("/login");
            }
            // 其他错误
            else {
              this.$message("购买失败"+ req.data.message);
            }
          },
          (error) => {
            console.log(error.message);
            this.$message("系统错误")
          }
        );
    }
  },
  created() {
    // 首次调用请求，获取数据
    this.getData(1)
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