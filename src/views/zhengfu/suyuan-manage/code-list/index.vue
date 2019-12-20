<template>
  <div class="p20">
    <div class="flex flex-wrap mb10">
      <el-select
        v-model="groupId"
        placeholder="请选择企业"
        @change="groupIdChange"
      >
        <el-option label="全部" value="" />
        <el-option
          v-for="item in groupList"
          :key="item.val"
          :label="item.key"
          :value="item.val"
        />
      </el-select>
    </div>
    <idol-table :list="list" @view-detail="view" />
    <el-pagination
      background
      class="mt10"
      :page-size="listParams.limit"
      layout="prev, pager, next"
      :total="total"
      @current-change="pageChange"
    />
    <el-dialog title="母码详情" :visible.sync="detailDialog" width="80%">
      <idol-detail :detail-data="detailData" />
    </el-dialog>
  </div>
</template>

<script>
import {
  getSelectGroupList,
  getPackageDetail,
  getPackageList
} from '../../../../api/zhengfu/code'
import table from './table'
import detail from './detail'

export default {
  name: 'Index',
  components: {
    idolTable: table,
    idolDetail: detail
  },
  data() {
    return {
      groupId: '',
      total: 0,
      detailDialog: false,
      groupList: [],
      detailData: {},
      list: [],
      listParams: {
        limit: 10,
        page: 1
      }
    }
  },
  mounted() {
    this.groupId = this.$route.query.id
    this.getPackageList()
    this.getGroupList()
  },
  methods: {
    async view(data) {
      this.detailDialog = true
      try {
        const result = await getPackageDetail(data.packageId)
        this.detailData = result.data
        console.log(result)
      } catch (e) {
        console.log(e)
      }
    },
    async getPackageList() {
      try {
        let groupId = this.groupId ? { groupId: this.groupId } : {}
        const list = await getPackageList({
          ...this.listParams,
          ...groupId
        })
        this.total = list.data.total
        this.list = list.data.rows
        console.log(list)
      } catch (e) {
        console.log(e)
      }
    },
    groupIdChange() {
      this.listParams.page = 1
      this.getPackageList()
    },
    pageChange(page) {
      this.listParams.page = page
      this.getPackageList()
    },
    async getGroupList() {
      try {
        const list = await getSelectGroupList()
        console.log(list)
        this.groupList = list.data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
