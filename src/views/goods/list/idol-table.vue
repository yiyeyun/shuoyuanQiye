<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="title"
        align="center"
        label="商品名称"
      />
      <el-table-column
        prop="sellPoint"
        align="center"
        label="商品详情"
      />
      <el-table-column
        prop="categoryName"
        align="center"
        label="类目"
      />
      <el-table-column label="商品图片" align="center" width="80px">
        <template slot-scope="scope">
          <div v-viewer="{movable: false}" class="images pointer" :class="'v-viewer-' + scope.$index" @click="previewImg(scope)">
            <img
              v-for="(item, index) in scope.row.image"
              v-show="index === 0"
              :key="index"
              class="table-pic"
              :src="item"
            >
            <small v-show="scope.row.image.length-1" class="text-primary ml10">(剩余{{ scope.row.image.length-1 }}张)</small>
          </div>
          <!--<img v-for="item in scope.row.image" class="table-pic" :src="item" alt="">-->
        </template>
      </el-table-column>

      <el-table-column
        prop="created"
        label="创建时间"
        align="center"
        width="160px"
      />

      <el-table-column label="操作" align="center" width="280px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editItem(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
          <el-button
            v-show="scope.row.dpStatus"
            type="danger"
            size="mini"
            @click="handle(scope.row)"
          >{{ scope.row.dpStatus === 1 ?'开启溯源': '关闭溯源' }}</el-button>

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
    previewImg(data) {
      console.log(data)
      const className = `.v-viewer-${data.$index}`
      const viewer = this.$el.querySelector(className).$viewer
      viewer.show()
    },

    editItem(data) {
      this.$emit('edit-item', data)
    },

    handle(data) {
      this.$emit('source-handle', data)
    },

    deleteItem(id) {
      this.$emit('delete-item', id)
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
  .width-100{
    box-sizing: border-box;
  }
</style>
