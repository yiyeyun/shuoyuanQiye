<template>
  <div class="login">
    <div class="form-box">
      <div class="title mt20">登入</div>
      <el-input
        v-model="username"
        placeholder="请输入用户名"
      >
        <i slot="prefix" class="el-input__icon el-icon-user" />
      </el-input>
      <el-input
        v-model="password"
        placeholder="请输入密码"
        type="password"
      >
        <i slot="prefix" class="el-input__icon el-icon-lock" />
      </el-input>
      <el-button type="warning" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import {
  setToken
} from '../../utils/auth'
import {
  validateNotNull
} from '../../validate'
import {
  login
} from '../../api/login'

export default {
  name: 'Index',
  data() {
    return {
      username: '13968137471',
      password: '111111'
    }
  },
  mounted() {

  },
  methods: {
    async submit() {
      try {
        await validateNotNull(this.username, '用户名不能为空')
        await validateNotNull(this.password, '密码不能为空')
        const result = await login({
          username: this.username,
          password: this.password
        })
        this.$message.success('登入成功')
        setToken(result.data)
        this.$router.push({
          path: '/'
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

}
</script>

<style scoped lang="less">
  .login{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    background: @main-color;
  }
.form-box{
  width: 400px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-sizing: border-box;
  height: 300px;
  background: #fff;
  border-radius: 10px;
}
  .title{
    font-size: 28px;
    font-weight: 600;
    color: @main-color;
    text-align: center;
  }
</style>
