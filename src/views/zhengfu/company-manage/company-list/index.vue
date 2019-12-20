<template>
  <div class="p20">
    <div class="mb20">
      <el-button
        type="warning"
        size="mini"
        @click="customDialog = true"
      >新增企业</el-button>
    </div>
    <idol-table
      :list="list"
      @enable-edit="enable"
    />
    <el-dialog title="新增企业" :visible.sync="customDialog" width="500px">
      <add-custom @close="addSuccess" />
    </el-dialog>
    <el-pagination
      background
      class="mt10"
      :page-size="listParams.limit"
      layout="prev, pager, next"
      :total="total"
      @current-change="pageChange"
    />

  </div>
</template>

<script>
import { getCompanyList } from '../../../../api/zhengfu/company'
import addCustom from './add-custom'
import table from './table'
export default {
  name: 'Index',
  components: {
    addCustom,
    idolTable: table
  },
  data() {
    return {
      listParams: {
        limit: 10,
        page: 1
      },
      total: 0,
      list: [],
      customDialog: false
    }
  }, mounted() {
    this.getList()
  },
  methods: {
    pageChange(page) {
      this.listParams.page = page
      this.getList()
    },
    addSuccess() {
      this.customDialog = false
      this.listParams.page = 1
      this.getList()
    },
    enable(id) {
      console.log(id)
      this.list = this.list.map(item => {
        console.log(id)
        if (item.accountId === id) {
          item.isEnable = !item.isEnable
        }
        // 15058095087
        console.log(item)
        return item
      })
      console.log(this.list)
    },
    async getList() {
      try {
        const res = await getCompanyList(this.listParams)
        this.total = res.data.total
        this.list = res.data.rows
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
