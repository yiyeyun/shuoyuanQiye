<template>
  <div class="list-box">
    <div class="mb20">
      <el-button type="warning" size="small" @click="templateCreate">创建模板</el-button>
    </div>
    <idol-table :list="list" @tem-dis="templateDisable" />
    <el-dialog
      title="创建模板"
      width="600px"
      :visible.sync="templateDialog"
    >
      <idol-handle />
    </el-dialog>
  </div>
</template>

<script>
import {
  templateCreate,
  templateDisable,
  getTemplateList
} from '../../api/template'
import table from './table'
import handle from './handle'

export default {
  name: 'Index',
  components: {
    idolTable: table,
    idolHandle: handle
  },
  data() {
    return {
      list: [],
      templateDialog: false
    }
  },
  mounted() {
    this.getTemplateList()
  },
  methods: {
    async templateDisable(id) {
      try {
        await templateDisable(id)
        this.getTemplateList()
      } catch (e) {
        console.log(e)
      }
    },
    templateCreate() {
      this.templateDialog = true
    },
    editItem() {},
    async getTemplateList() {
      try {
        const list = await getTemplateList()
        console.log(list)
        this.list = list.data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .list-box{
    padding: 20px;
  }
</style>
