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
    <el-dialog
      :title="type === 'add' ? '添加商品' : '编辑商品'"
      :visible.sync="goodsDialog"
      width="600px"
    >
      <idol-handle :type="type"></idol-handle>
    </el-dialog>
  </div>
</template>

<script>
import idolTable from './table'
import {
  getGoodsList
} from '../../../../api/qiye/goods'
import idolHandle from './handle'
export default {
  name: 'Index',
  components: {
    idolTable,
    idolHandle
  },
  data() {
    return {
      total: 0,
      list: [],
      goodsDialog: false,
      type: '',
      params: {
        page: 1,
        limit: 10
      }
    }
  },
  mounted() {
    this.getGoodsList()
  },
  methods: {
    addGoods() {
      this.type = 'add'
      this.goodsDialog = true
    },
    async getGoodsList() {
      try {
        const res = await getGoodsList(this.params)
        this.list = res.data.data.rows
      } catch (e) {
        console.log(e)
      }
    },
    pageChange(page) {
      this.params.page = page
      this.getGoodsList()
    }
  }
}
</script>

<style scoped>

</style>
