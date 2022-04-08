<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @change="turnShopCartList(cart.skuId,cart.isChecked)"/>
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="subNum('mins', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="subNum('imputNum', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="subNum('plus', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="#none"
              class="sindelet"
              @click="deleteCartList(cart.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="isAllChecked"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedList">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from 'lodash/throttle'
export default {
  name: "ShopCart",
  methods: {
    getData() {
      this.$store.dispatch("getShopCart");
    },
    // type用来区分点击的是哪一个事件
    // skuNum变化的数量
    // cart用来区分点击的是哪一个商品
    subNum:throttle(async function(type, num, cart) {
      // 用户点击过快会导致订单出现负数等状况，所以要进行节流
      // 进行数量判断
      let subNum;
      switch (type) {
        case "plus":
          subNum = num
          break;
        case "mins":
          if (cart.skuNum < 1) {
            subNum = 0;
          } else {
            subNum = num;
          }
          break;
        case "imputNum":
          // 判断用户输入不正常数据
          if (isNaN(num) || num < 1) {
            subNum = 0;
          } else {
            subNum = parseInt(num) - cart.skuNum;
          }
          break;
      }
      try {
        // 发送添加或者修改购物车请求
        await this.$store.dispatch("addOrUpdateShopCar", {
          skuId: cart.sourceId,
          skuNum: subNum,
        });
        // 重新加载数据
        this.getData();
      } catch (error) {
        alert(error.message)
      }
    },1000),
    // 删除单个商品
    async deleteCartList(skuId){
      try {
        // 发送删除请求
        await this.$store.dispatch('deleteShopCart',skuId)
        this.getData()
      } catch (error) {
        console.log(error.message);
      }
    },
    // 改变商品选中状态
    async turnShopCartList(skuId,checked){
      let isChecked;
      isChecked = checked === 1 ? '0':'1' 
      try {
        await this.$store.dispatch('turnShopListChecked',{skuId,isChecked})
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除选中商品
    async deleteAllCheckedList(){
      try {
        await this.$store.dispatch('deleteAllCheckedList')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 使用全选进行控制
    async isAllChecked(event){
      let allChecked = event.target.checked ? '1' : '0'
      try {
        await this.$store.dispatch('isAllChecked',allChecked)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapGetters(["cartList"]),
    // 获得商品数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    totalPrice() {
      let totalPrice = 0;
      this.cartInfoList.forEach((element) => {
        totalPrice += element.isChecked === 1?  element.skuPrice * element.skuNum : 0
      });
      return totalPrice;
    },
    isAllCheck() {
      // 对每一个对象进行遍历，并且判断是否全部都已经勾选
      return this.cartInfoList.every((item) => item.isChecked === 1);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>