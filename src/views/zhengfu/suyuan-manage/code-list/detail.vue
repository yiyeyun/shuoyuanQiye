<template>
  <div>
    <div class="flex align-center">
      <div class="label-80 mr10">组织名称</div>
      <div>{{ detailData.gruopName }}</div>
    </div>
    <div class="flex mt10 align-center">
      <div class="flex align-center">
        <div class="label-80 mr10">母码编号</div>
        <div>{{ detailData.packageId }}</div>
      </div>
      <div class="flex align-center">
        <div class="label-80 mr10">子码数量</div>
        <div>{{ detailData.num }}</div>
      </div>
    </div>
    <div class="flex mt10 align-center">
      <div class="flex align-center">
        <div class="label-80 mr10">起始编码</div>
        <div>{{ detailData.startIndex }}</div>
      </div>
      <div class="flex align-center">
        <div class="label-80 mr10">结束编码</div>
        <div>{{ detailData.endIndex }}</div>
      </div>
    </div>

    <div class="flex mt10 align-center">
      <div class="label-80 mr10">子码包数量</div>
      <div>{{ detailData.packNum }}</div>
    </div>
    <div class="flex mt10 align-center">
      <div class="label-80 mr10">可分配数量</div>
      <div>{{ detailData.waitUseNum }}</div>
    </div>
    <el-table width="100%" class="mt10 mb10" :data="list">
      <el-table-column
        prop="id"
        align="center"
        label="编号"
      />
      <el-table-column
        prop="groupName"
        align="center"
        label="企业名称"
      />
      <el-table-column
        prop="num"
        align="center"
        label="分配数量"
      />
      <el-table-column
        prop="packageId"
        align="center"
        label="是否使用"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.isUse ? '已使用': '未使用' }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="startIndex"
        align="center"
        label="开始编号"
      />
      <el-table-column
        prop="endIndex"
        align="center"
        label="结束编号"
      />
    </el-table>

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
import { getPackageSubList } from '../../../../api/zhengfu/code'

export default {
  name: 'Detail',
  props: {
    detailData: {
      type: Object,
      value: {}
    }

  },
  data() {
    return {
      list: [],
      total: 0,
      currentId: '',
      listParams: {
        limit: 10,
        page: 1
      }
    }
  },
  watch: {
    detailData: {
      async handler(data) {
        console.log(data, 999)
        if (data.packageId) {
          this.listParams.page = 1
          this.currentId = data.packageId
          this.getList()
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    pageChange(page) {
      this.listParams.page = page
      this.getList()
    },
    async getList() {
      try {
        const result = await getPackageSubList({
          ...this.listParams,
          packageId: this.currentId
        })
        console.log(result)
        this.total = result.data.data.total
        this.list = result.data.data.rows
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
