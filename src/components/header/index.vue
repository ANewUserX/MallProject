<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">
              <a href="###">登录</a>
            </router-link>
            <router-link to="/register" class="register">
              免费注册
            </router-link>
          </p>
          <p v-else>
            <span>欢迎 {{userName}}</span>
            <a href="" class="register" @click="userLogout">推出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home">
          <a class="logo" title="尚品汇" href="###" target="_blank">
            <img src="./images/logo.png" alt="" />
          </a>
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "header",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    goSearch() {
      // this.$router.push('/search')
      // 1、字符串的形式
      // this.$router.push('/search/' + this.keyword + '?k=' + this.keyword.toUpperCase())
      // 2、模板字符串的方式
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      // 3、对象的形式 必选是跟name结合，不能使用path
      // this.$router.push({
      //   name: "search",
      //   params: { keyword: this.keyword || undefined },
      //   // query: { k: this.keyword.toUpperCase() },
      // });

      // 面试题
      // 1、path和params可以一起使用吗？不可以，传递传参使用对象的写法，只能使用路由的name和params结合使用
      // 2、怎么指定params可传可不传，直接在路由的定义中/search/:keyword?进行指定params 没有指定的话search直接消失
      // this.$router.push({name:'search',query:{k:this.keyword.toUpperCase()}})
      // 3、怎么处理params传递空字符串？ 直接使用indefine来解决
      // this.$router.push({name:'search',params:{keyword:''},query:{k:this.keyword.toUpperCase()}})
      // 4、可以使用props给路由传递数据吗？可以
      //

      // 当用户点击三级联动数据时，可以带上query参数进行传递
      // this.$router.push({
      //   name: "search",
      //   params: { keyword: this.keyword || undefined },
      //   // query: { k: this.keyword.toUpperCase() },
      // });
      // console.log(this.$route.query);
      if (this.$route.query) {
        let location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
    },
    // 路由传参：
    // params:是路由路径的一部分，需要站位
    // query：不是路径的一部分，不需要传参
    async userLogout(){
      try {
        await this.$store.dispatch('userLogout')
        // 返回首页
        this.$router.push('/home')
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted() {
    // 通过全局总线来清除keyword
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
  computed: {
    userName() {
      return this.$store.state.user.userInfo.loginName;
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>