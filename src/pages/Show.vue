<template>
  <div class="show">
    <ul id="list">
      <!-- 显示商品信息 -->
      <li v-for="good in goods" :key="good.id">
        <p><a href="#" v-text="good.goodsName"></a></p>
        <img :src="good.goodsImg" />
        <p>促销价：{{good.goodsPrice}} - 库存：{{good.goodsStock}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Show",
  data() {
    return {
      goods: [],
    };
  },
  created() {
    // 携带cookie
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:8001/spike_system/goods/info?pageNum=1&pageSize=4")
      .then(
        (req) => {
          console.log(req.data);
          // 请求成功
          if (req.data.code === 20000) {
            this.goods = req.data.data.goods.records;
          } else {
            this.$message(req.data.message);
          }
        },
        (error) => {
          console.log(error.message);
        }
      );
  },
};
</script>

<style>
.show {
  height: 100%;
  width: 100%;
  background-image: url("../assets/show-back.jpg");
  background-size: 100% 100%;
}

#list li {
  text-decoration: none; /*去掉前面的圆点*/
  list-style: none;
  float: left;
  margin-left: 150px;
  margin-top: 200px;
  border: 1px solid #ffffff;
  background-color: #FC5531;
}

#list li p{
  font-size: 20px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>