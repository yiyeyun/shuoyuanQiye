<template>
  <div>
    <el-table :data="list" style="width:100%">
      <el-table-column
        prop="storeName"
        align="center"
        label="店铺名称"
      />
      <el-table-column
        prop="num"
        align="center"
        label="打印数量"
      />
      <el-table-column
        prop="itemPrice"
        align="center"
        label="打印单价"
      />
      <el-table-column
        prop="printPrice"
        align="center"
        label="总价"
      />
      <el-table-column
        prop="created"
        align="center"
        label="创建时间"
      />
      <el-table-column
        prop="remarke"
        align="center"
        label="备注"
      />
      <el-table-column
        align="center"
        label="状态"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.status | statusFormat }}</div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="220px"
        label="操作"
      >
        <template slot-scope="scope">
          <div class="flex flex-wrap">
            <el-button
              type="warning"
              size="mini"
              @click="exportExcel(scope.row.pici)"
            >导出</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="viewDetail(scope.row.id)"
            >详情</el-button>
            <div v-show="scope.row.status == 1" class="ml10">
              <el-button
                type="primary"
                size="mini"
                @click="print(scope.row.id)"
              >打印</el-button>
            </div>
            <div v-show="scope.row.status === 2" class="ml10">
              <el-button
                type="primary"
                size="mini"
                @click="printSuccess(scope.row.id)"
              >打印完成</el-button>
            </div>
            <div v-show="scope.row.status == 4" class="ml10">
              <el-button
                type="primary"
                size="mini"
                @click="showLogistics(scope.row.id)"
              >物流配送</el-button>
            </div>

          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="订单详情"
      width="600px"
      :visible.sync="detailDialog"
    >
      <div>订单详情</div>
    </el-dialog>
    <el-dialog
      title="物流配送"
      width="600px"
      :visible.sync="logisticsDialog"
    >
      <div>物流配送</div>
    </el-dialog>
  </div>
</template>

<script>
import {
  orderExport,
  orderInfo,
  printSuccess,
  orderLogistics,
  orderPrint
} from '../../api/order'

export default {
  name: 'Table',
  filters: {
    statusFormat(data) {
      switch (data) {
        case 1: return '申请'
        case 2: return '打印中'
        case 3: return '打印完成'
        case 4: return '发货'
        case 5: return '交易完成'
        case -1: return '作废'
      }
    }
  },
  props: {
    list: {
      type: Array,
      value: []
    }
  },
  data() {
    return {
      detailDialog: false,
      datailData: {},
      logisticsDialog: false,
      logisticsParams: {
        orderId: '',
        shippingCode: '',
        shippingName: ''
      }
    }
  },
  methods: {
    async print(id) {
      try {
        await orderPrint(id)
      } catch (e) {
        console.log(e)
      }
    },
    async printSuccess(id) {
      try {
        await printSuccess(id)
      } catch (e) {
        console.log(e)
      }
    },
    exportExcel(id) {
      orderExport(id)
    },
    showLogistics(id) {
      this.logisticsDialog = true
      this.logisticsParams.orderId = id
    },

    async viewDetail(id) {
      this.detailDialog = true
      try {
        const data = await orderInfo(id)
        this.datailData = data.data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
