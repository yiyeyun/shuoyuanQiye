<template>
  <div class="p20">
    <el-table :data="list" style="width:100%">
      <el-table-column
        prop="name"
        align="center"
        label="商品名称"
      />
      <el-table-column
        prop="created"
        align="center"
        label="创建时间"
      />
      <el-table-column prop="溯源二维码">
        <template slot-scope="scope">
          <img :src="scope.row.qr">
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      class="mt10"
      :page-size="listParams.pageSize"
      layout="prev, pager, next"
      :total="pageTotal"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import {
  getSuyuanList
} from '../../../api/source'

export default {
  name: 'Index',
  data() {
    return {
      listParams: {
        pageNum: 1,
        pageSize: 10
      },
      pageTotal: 0,
      list: []

    }
  },
  mounted() {
    this.getList()
  },

  methods: {
    pageChange(e) {
      this.listParams.pageNum = e
      this.getList()
    },
    async getList() {
      try {
        const list = await getSuyuanList(this.listParams)
        this.pageTotal = list.total
        this.list = list.data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
