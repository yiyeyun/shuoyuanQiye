<template>
  <div class="p20">
    <div class="mb20">
      <el-button type="warning" size="small" @click="addGoods">添加商品</el-button>
    </div>
    <idol-table
      :list="list"
      @edit="editItem"
      @su-yuan-manage="suYuanManage"
      @success="success"
    />
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
      :close-on-click-modal="false"
      @close="type = ''"
    >
      <idol-handle
        :edit-data="editData"
        :type="type"
        @close="goodsDialog = false"
        @edit-success="success"
        @success="success(1)"
      />
    </el-dialog>
      <el-dialog
              title="溯源管理"
              width="80%"
              :visible.sync="suYuanDialog"
              :close-on-click-modal="false">
          <idol-su-yuan :id="suYuanData.id" @close="suYuanDialog = false"></idol-su-yuan>

      </el-dialog>
  </div>
</template>

<script>
import idolTable from './table'
import {
  getGoodsList
} from '../../../../api/qiye/goods'
import idolHandle from './handle'
import idolSuYuan from './su-yuan'
export default {
  name: 'Index',
  components: {
    idolTable,
    idolHandle,
    idolSuYuan
  },
  data() {
    return {
      total: 0,
      list: [],
      suYuanData: {},
      editData: {},
      goodsDialog: false,
      suYuanDialog: false,
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
    success(page) {
      if (page) {
        this.params.page = 1
      }
      this.type = ''
      this.goodsDialog = false
      this.getGoodsList()
    },
    async getGoodsList() {
      try {
        const res = await getGoodsList(this.params)
        this.list = res.data.data.rows
      } catch (e) {
        console.log(e)
      }
    },
suYuanManage(data) {
      console.log(data)
  this.suYuanData = data
  this.suYuanDialog = true
},
    editItem(data) {
      this.type = 'edit'
      this.editData = data
      this.goodsDialog = true
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
