<template>
  <div class="p20">
    <el-button
      type="primary"
      :disabled="loading"
      :loading="loading"
      @click="clear"
    >清理缓存</el-button>
    <el-button type="warning" @click="logout">安全退出</el-button>
  </div>
</template>

<script>
import {
  removeToken,
  removeAccount
} from '../../utils/auth'
export default {
  name: 'Index',
  data() {
    return {
      loading: false
    }
  },
  methods: {
    logout() {
      removeAccount()
      removeToken()
      this.$router.replace({
        path: '/login'
      })
    },
    clear() {
      this.loading = true
      const time = parseInt(Math.random() * 1500 + 500)
      setTimeout(() => {
        this.$message.success('清除成功')
        this.loading = false
      }, time)
    }
  }
}
</script>

<style scoped>

</style>
