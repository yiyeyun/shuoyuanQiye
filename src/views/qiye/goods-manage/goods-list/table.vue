<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="title"
        align="center"
        label="商品名"
      />
      <el-table-column
        prop="title"
        align="center"
        label="商品图片"
      />
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
      <el-table-column
        prop="logo"
        align="center"
        label="logo"
      />
      <el-table-column
        prop="isSuyuanOpen"
        align="center"
        label="溯源管理"
      />
      <el-table-column
        prop="title"
        align="center"
        label="操作"
      />
      <el-table-column
        prop="created"
        align="center"
        label="创建时间"
      />
      <el-table-column
        prop="updated"
        align="center"
        label="修改时间"
      />
      <el-table-column
        prop="title"
        align="center"
        label="绑定二维码"
      />
    </el-table>

  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    list: Array
  }
}
</script>

<style scoped>

</style>
