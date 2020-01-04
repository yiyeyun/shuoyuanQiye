<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="gruopName"
        align="center"
        label="企业名称"
      />

      <el-table-column
        prop="contactPerson"
        align="center"
        label="联系人"
      />
      <el-table-column
        prop="tel"
        align="center"
        label="联系人电话"
      />
      <el-table-column
        prop="title"
        align="center"
        label="码包记录"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
          >
            <router-link
              class="text-white text-underline-none"
              :to="{path:'/code-list',query:{ id:scope.row.accountId}}"
            >查看
            </router-link>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="created"
        align="center"
        label="创建时间"
      />
      <el-table-column
        align="center"
        label="账户状态"
      >
        <template slot-scope="scope">
          <div
            v-show="scope.row.isEnable"
            class="text-success"
          >已启用</div>
          <div
            v-show="!scope.row.isEnable"
            class="text-danger"
          >已禁用</div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            v-show="!scope.row.isEnable"
            type="success"
            size="mini"
            @click="accountEnable(scope.row)"
          >启用</el-button>
          <el-button
            v-show="scope.row.isEnable"
            type="danger"
            size="mini"
            @click="accountEnable(scope.row)"
          >禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="mini"
            @click="showGive(scope.row)"
          >母码分配</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="giveDialog"
      :close-on-click-modal="false"
      title="母码分配"
      width="500px"
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="按照子码分配" name="first">
          <div class="flex align-center">
            <div class="label-80 mr10">子码编号</div>
            <el-input v-model="subCodeIndex" class="mr10" />
            <el-button type="primary" size="mini" @click="querySubCodeInfo">查询</el-button>
          </div>
          <div v-show="subCodeInfo.startIndex" class="mt20">
            <div class="flex align-center mt10">
              <div class="label-80 mr10">起始编码</div>
              <div class="mr30">{{ subCodeInfo.startIndex }}</div>
              <div class="label-80 mr10">结束编码</div>
              <div class="mr30">{{ subCodeInfo.endIndex }}</div>
            </div>
            <div class="mt10 flex align-center">
              <div class="label-80 mr10">子码包数量</div>
              <div>{{ subCodeInfo.num }}</div>
            </div>
            <div class="mt10 flex align-center">
              <div class="label-80 mr10">是否可分配</div>
              <div>{{ subCodeInfo.isAllocated ? '是': '否' }}</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="按照区间分配" name="second">
          <div class="flex align-center">
            <div class="label-80 mr10">起始编码</div>
            <el-input v-model="startIndex" class="mr10" />
          </div>
          <div class="flex mt10 align-center">
            <div class="label-80 mr10">结束编码</div>
            <el-input v-model="endIndex" class="mr10" />
          </div>
          <div class="flex mt10 align-center">
            <div class="label-80 mr10">数量</div>
            <div>{{ codeNum }}</div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="mt30">
        <el-button type="warning" size="mini" class="mr10" @click="distribution">分配</el-button>
        <el-button size="mini" @click="giveDialog = false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { accountEnable } from '../../../../api/zhengfu/company'
import {
  getSubCodeInfo,
  areaDistribution,
  issuedAccount
} from '../../../../api/zhengfu/code'

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
      giveDialog: false,
      giveData: {},
      subCodeInfo: {},
      subCodeIndex: '', // 25300
      startIndex: '',
      endIndex: '',
      activeName: 'first'
    }
  },
  computed: {
    codeNum() {
      if (this.startIndex < this.endIndex) {
        return this.endIndex - this.startIndex + 1
      } else {
        return 0
      }
    }
  },
  methods: {
    async distribution() {
      try {
        if (this.activeName === 'first') {
          await issuedAccount({
            groupId: this.giveData.accountId,
            subId: this.subCodeIndex
          })
          this.subCodeIndex = ''
          this.subCodeInfo = {}
        } else {
          await areaDistribution({
            endIndex: this.endIndex,
            startIndex: this.startIndex,
            groupId: this.giveData.accountId
          })
          this.startIndex = ''
          this.endIndex = ''
        }
        this.giveDialog = false
        this.$message.success('分配成功')
      } catch (e) {
        console.log(e)
      }
    },
    async querySubCodeInfo() {
      try {
        const res = await getSubCodeInfo(this.subCodeIndex)
        this.subCodeInfo = res.data
      } catch (e) {
        console.log(e)
      }
    },
    showGive(data) {
      this.giveData = data
      this.subCodeIndex = ''
      this.startIndex = ''
      this.endIndex = ''
      this.giveDialog = true
    },
    give() {},
    async accountEnable(data) {
      const accountId = data.accountId
      const enable = !data.isEnable
      try {
        await accountEnable({ accountId, enable })
        this.$message.success('修改成功')
        this.$emit('enable-edit', accountId)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
  .label-80{
    flex: 0 0 80px;
  }
</style>
