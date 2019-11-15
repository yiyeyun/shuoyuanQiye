<template>
  <div class="list-box">
    <div class="flex mb20">
      <el-select v-model="listParams.orderBy" class="mr10" placeholder="请选择排序">
        <el-option label="打印数量" value="num">打印数量</el-option>
        <el-option label="模板单价" value="item_price">模板单价</el-option>
        <el-option label="模板总价" value="print_price">模板总价</el-option>
      </el-select>
      <el-select v-model="listParams.status" placeholder="请选择打印状态" class="mr10">
        <el-option label="申请" value="1">申请</el-option>
        <el-option label="打印中" value="2">打印中</el-option>
        <el-option label="成功" value="3">成功</el-option>
        <el-option label="作废" value="-1">作废</el-option>
      </el-select>
      <!--<el-button type="warning" @click="exportExcel">导出</el-button>-->
    </div>
    <idol-table :list="list"></idol-table>
  </div>
</template>

<script>
import {
  getOrderList
} from '../../api/order'
import table from './table'

export default {
  name: 'Index',
  components: {
    idolTable: table
  },
  data() {
    return {
      listParams: {
        orderBy: '',
        status: '',
        pageNum: 1,
        pageSize: 10
      },
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // exportExcel() {
    //   window.open('/api/')
    // },
    async getList() {
      try {
        const list = await getOrderList(this.listParams)
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
