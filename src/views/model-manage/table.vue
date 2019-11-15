<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column
        prop="templateId"
        align="center"
        label="模板id"
      />
      <el-table-column
        prop="selectNum"
        align="center"
        label="数量"
      />
      <el-table-column
        prop="price"
        align="center"
        label="价格"
      />
      <el-table-column
        prop="material"
        align="center"
        label="材质"
      />
      <el-table-column label="图片" align="center" width="80px">
        <template slot-scope="scope">
          <div v-viewer="{movable: false}" class="images pointer" :class="'v-viewer-' + scope.$index" @click="previewImg(scope)">
            <img
              v-for="(item, index) in scope.row.imgList"
              v-show="index === 0"
              :key="index"
              class="table-pic"
              :src="item"
            >
            <small v-show="scope.row.imgList.length-1" class="text-primary ml10">(剩余{{ scope.row.imgList.length-1 }}张)</small>
          </div>
          <!--<img v-for="item in scope.row.image" class="table-pic" :src="item" alt="">-->
        </template>
      </el-table-column>
      <el-table-column
        prop="created"
        align="center"
        label="创建时间"
      />
      <el-table-column
        label="状态"
        align="center"
        width="120px"
      >
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.status===1"
            type="primary"
            size="mini"
            @click="templateDisable(scope.row.templateId)"
          >使用中</el-button>
          <el-button
            v-show="scope.row.status===-1"
            type="danger"
            disabled
            size="mini"
          >已停用</el-button>
          <!--<div>{{ scope.row.status == 1 ? '使用中': scope.row.status == -1 ? '已停用' : '状态未知' }}</div>-->
        </template>
      </el-table-column>
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
  methods: {
    async templateDisable(id) {
      try {
        await this.$confirm('确认停用?')
        this.$emit('tem-dis', id)
      } catch (e) {
        console.log(e)
      }
    },
    previewImg(data) {
      console.log(data)
      // const viewerInstance = document.getElementsByClassName('viewer-container')
      // viewerInstance[0].remove()
      // console.log(viewerInstance)
      const className = `.v-viewer-${data.$index}`
      const viewer = this.$el.querySelector(className).$viewer
      viewer.show()
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
