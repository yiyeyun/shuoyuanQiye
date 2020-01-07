<template>
  <div class="box" :class="isExpend? 'expend' : ''">
    <div class="menu-box">
      <div class="pic-box">
        <!--<img src="@/assets/imgs/logo.jpg" class="logo" alt="">-->
      </div>
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#2d3a4b"
        :collapse="!isExpend"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened="true"
        @select="select"
      >
        <!--政府-->
        <el-submenu index="1" v-if="account == 2">
          <template slot="title">
            <i class="el-icon-goods" />
            <span>企业管理</span>
          </template>
          <el-menu-item index="/company-list">企业列表</el-menu-item>
        </el-submenu>
        <el-submenu index="2" v-if="account == 2">
          <template slot="title">
            <i class="el-icon-menu" />
            <span>溯源管理</span>
          </template>
          <!--<el-menu-item index="/code-list">码包管理</el-menu-item>-->
          <el-menu-item index="/tourism">旅游介绍</el-menu-item>
          <el-menu-item index="/industry">产业介绍</el-menu-item>
        </el-submenu>


        <!--企业-->
        <el-menu-item index="/company-info" v-if="account == 1">
          <template slot="title">
            <i class="el-icon-tickets" />
            <span>企业信息</span>
          </template>
          <!--<el-menu-item index="/account">客户列表</el-menu-item>-->
        </el-menu-item>
        <!--<el-submenu index="2" v-if="account == 1">-->
          <!--<template slot="title">-->
            <!--<i class="el-icon-menu" />-->
            <!--<span>码包管理</span>-->
          <!--</template>-->
          <!--&lt;!&ndash;<el-menu-item index="/code-list">码包管理</el-menu-item>&ndash;&gt;-->
          <!--<el-menu-item index="/tourism">码包列表</el-menu-item>-->
          <!--<el-menu-item index="/industry">已绑定码包</el-menu-item>-->
        <!--</el-submenu>-->
        <el-submenu index="3" v-if="account == 1">
          <template slot="title">
            <i class="el-icon-menu" />
            <span>商品管理</span>
          </template>
          <!--<el-menu-item index="/code-list">码包管理</el-menu-item>-->
          <el-menu-item index="/goods-list">商品列表</el-menu-item>
        </el-submenu>

        <!--公共-->
        <el-menu-item index="/setting">
          <template slot="title">
            <i class="el-icon-tickets" />
            <span>系统设置</span>
          </template>
          <!--<el-menu-item index="/account">客户列表</el-menu-item>-->
        </el-menu-item>

      </el-menu>
    </div>

    <div class="flex-1 flex flex-column over-hidden">
      <top class="bottom-line" :is-expend="isExpend" @onchange="isExpend = !isExpend" />
      <div class="flex-1 over-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import top from './header'
import {
  getAccount
} from '../../utils/auth'

export default {
  name: 'Index',
  components: { top },
  data() {
    return {
      isExpend: true,
      account: ''
    }
  },
  mounted() {
    this.account = getAccount()
    console.log(this.account)
  },
  methods: {
    select(path) {
      const router = this.$route.path
      if (router !== path) {
        this.$router.push({ path })
      }
    }
  }
}
</script>

<style scoped lang="less">
.box{
    height: 100%;
    display: flex;
}
.pic-box{
  display: flex;
  justify-content: center;
  padding: 30px 0;
  .logo{
    width: 30px;
    height: 30px;
    border-radius: 30px;
  }
}
.menu-box{
  transition: width 500ms linear;
  width: 65px;
  height: 100%;
  background: @main-color;
}
.expend .menu-box{
  transition: width 500ms linear;
  width: 210px;
}
/deep/ .el-menu{
  border-right: 1px solid @main-color;
}
  .over-auto{
    overflow: auto;
  }
</style>
