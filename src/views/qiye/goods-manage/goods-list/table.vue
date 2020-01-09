<template>
  <div>
    <el-table
      :data="list"
    >
      <el-table-column
        prop="title"
        align="center"
        label="商品名"
      />
      <el-table-column
        align="center"
        label="商品图片"
      >
        <template slot-scope="scope">
          <div v-viewer="{movable: false}" class="flex pointer" :class="'v-viewer1-' + scope.$index" @click="previewImg(scope)">
            <img
              v-for="(item, index) in scope.row.image"
              :key="index"
              class="table-pic"
              :src="item"
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="cname"
        align="center"
        label="类目"
      />
      <el-table-column
        prop="variety"
        align="center"
        label="品种"
      />
      <el-table-column
        prop="brand"
        align="center"
        label="品牌"
      />
      <el-table-column
        prop="origin"
        align="center"
        label="产地"
      />
      <!--<el-table-column-->
      <!--align="center"-->
      <!--label="logo"-->
      <!--&gt;-->
      <!--<template slot-scope="scope">-->
      <!--<div v-viewer="{movable: false}" class="flex pointer" :class="'v-viewer2-' + scope.$index" @click="previewImg1(scope)">-->
      <!--<img-->
      <!--class="table-pic"-->
      <!--:src="scope.row.logo"-->
      <!--&gt;-->
      <!--</div>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        prop="isSuyuanOpen"
        align="center"
        label="溯源管理"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="manage(scope.row)"
          >管理</el-button>
          <!--<el-button-->
          <!--v-show="scope.row.isSuyuanOpen"-->
          <!--type="danger"-->
          <!--size="mini"-->
          <!--@click="suYuan(scope.row)"-->
          <!--&gt;关闭溯源</el-button>-->
          <!--<el-button-->
          <!--v-show="!scope.row.isSuyuanOpen"-->
          <!--type="primary"-->
          <!--size="mini"-->
          <!--@click="suYuan(scope.row)"-->
          <!--&gt;开启溯源</el-button>-->
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        width="200px"
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="edit(scope.row)"
          >编辑商品 </el-button>
          <el-button
            v-show="scope.row.url"
            size="mini"
            type="primary"
            @click="view(scope.row.url)"
          >溯源查看 </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="created"
        align="center"
        label="创建时间"
      />
      <!--<el-table-column-->
      <!--prop="updated"-->
      <!--align="center"-->
      <!--label="修改时间"-->
      <!--/>-->
      <el-table-column
        prop="title"
        align="center"
        label="绑定二维码"
      >
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="showGive(scope.row)">绑定</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog
      :visible.sync="giveDialog"
      :close-on-click-modal="false"
      title="商品绑定"
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
            <!--<div class="mt10 flex align-center">-->
            <!--<div class="label-80 mr10">是否可绑定</div>-->
            <!--<div>{{ subCodeInfo.isAllocated ? '是': '否' }}</div>-->
            <!--</div>-->
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
        <el-button type="warning" size="mini" class="mr10" @click="distribution">绑定</el-button>
        <el-button size="mini" @click="giveDialog = false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { openTraceability } from '../../../../api/qiye/goods'
import {
  getSubCodeInfo,
  areaDistribution
} from '../../../../api/zhengfu/code'
import {
  bindSubCodeByItemId,
  bindAreaCodeByItemId
} from '../../../../api/qiye/goods'

export default {
  name: 'Table',
  props: {
    list: Array
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
    view(url) {
      window.open(url)
    },
    async distribution() {
      try {
        if (this.activeName === 'first') {
          if (!this.subCodeIndex) { return }
          if (!this.subCodeInfo.isAllocated) {
            this.$message.warning('该子码无法绑定')
            return
          }
          await bindSubCodeByItemId({
            itemId: this.giveData.id,
            subId: this.subCodeIndex
          })
          this.subCodeIndex = ''
          this.subCodeInfo = {}
        } else {
          if (this.codeNum === 0) {
            this.$message.warning('结束编码必须大于开始编码哦')
            return
          }
          await bindAreaCodeByItemId({
            endIndex: this.endIndex,
            startIndex: this.startIndex,
            itemId: this.giveData.id
          })
          this.startIndex = ''
          this.endIndex = ''
        }
        this.giveDialog = false
        this.$message.success('绑定成功')
      } catch (e) {
        console.log(e)
      }
    },
    async querySubCodeInfo() {
      try {
        const res = await getSubCodeInfo(this.subCodeIndex)
        this.subCodeInfo = res.data
        console.log(res)
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
    manage(data) {
      this.$emit('su-yuan-manage', data)
    },
    give() {},
    previewImg(data) {
      const className = `.v-viewer1-${data.$index}`
      const viewer = this.$el.querySelector(className).$viewer
      viewer.show()
    },
    previewImg1(data) {
      const className = `.v-viewer2-${data.$index}`
      const viewer = this.$el.querySelector(className).$viewer
      viewer.show()
    },
    edit(data) {
      this.$emit('edit', data)
    },
    async suYuan(data) {
      try {
        await openTraceability({
          itemId: data.id,
          isOpenSuyuan: !data.isSuyuanOpen
        })
        this.$message.success('操作成功')
        this.$emit('success')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .table-pic{
    width: 40px;
    height: 40px;
    margin: 0 5px;
  }
</style>
