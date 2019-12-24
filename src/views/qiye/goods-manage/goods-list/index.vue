<template>
  <div class="p20">
    <div class="mb20">
      <el-button type="warning" size="small" @click="addGoods">添加商品</el-button>
    </div>
    <idol-table :list="list" />
    <el-pagination
      background
      class="mt10"
      :page-size="params.page"
      layout="prev, pager, next"
      :total="total"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import idolTable from './table'
import {
  getGoodsList
} from '../../../../api/qiye/goods'

export default {
  name: 'Index',
  components: {
    idolTable
  },
  data() {
    return {
      total: 0,
      list: [],
      params: {
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    addGoods() {},
    async getGoodsList() {
      try {
        const res = await getGoodsList(this.params)
        this.list = res.data.data.rows
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.getGoodsList()
  }
}
</script>

<style scoped>

</style>
