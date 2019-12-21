<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="packageId"
        align="center"
        label="母码编号"
      />
      <el-table-column
        prop="gruopName"
        align="center"
        label="企业名称"
      />
      <el-table-column
        prop="num"
        align="center"
        label="数量"
      />
      <el-table-column
        prop="startIndex"
        align="center"
        label="子码起始编号"
      />
      <el-table-column
        prop="endIndex"
        align="center"
        label="子码结束编号"
      />
      <!--<el-table-column-->
        <!--prop="packNum"-->
        <!--align="center"-->
        <!--label="每包数量"-->
      <!--/>-->
      <!--<el-table-column-->
        <!--align="center"-->
        <!--label="是否使用完毕"-->
      <!--&gt;-->
        <!--<template slot-scope="scope">-->
          <!--<div>{{ scope.row.isAllUse ? '是' : '否' }}</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        prop="created"
        align="center"
        label="创建时间"
      />
      <!--<el-table-column-->
        <!--prop="accountId"-->
        <!--align="center"-->
        <!--label="操作"-->
      <!--&gt;-->
        <!--<template slot-scope="scope">-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--type="primary"-->
            <!--@click="print(scope.row)"-->
          <!--&gt;打印下载</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="accountId"-->
        <!--align="center"-->
        <!--label="使用详情"-->
      <!--&gt;-->
        <!--<template slot-scope="scope">-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--type="warning"-->
            <!--@click="view(scope.row)"-->
          <!--&gt;查看详情</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>

  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    list: {
      type: Array,
      value: []
    }
  },
  data() {
    return {
    }
  },
  methods: {
    print(data) {
      window.open(`https://www.bjd33.cn/manager/qrCode/downTxt/${data.packageId}`)
    },
    view(data) {
      this.$emit('view-detail', data)
    }

  }
}
</script>

<style scoped>

</style>
