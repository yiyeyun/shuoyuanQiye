<template>
  <div class="p20">
    <div class="mb20">
      <el-button type="warning" size="small" @click="addGoods">添加商品</el-button>
    </div>
    <idol-table
      :list="list"
      @delete-item="deleteItem"
      @edit-item="editGoods"
    />
    <el-dialog
      title="商品操作"
      :visible.sync="goodsDialog"
      width="600px"
    >
      <div class="flex align-center mt40">
        <div class="label-80 mr10">商品标题</div>
        <div class="mr10 flex-1">
          <el-input v-model="form.title" />
        </div>
      </div>

      <div class="flex align-center mt40">
        <div class="label-80 mr10">商品描述</div>
        <div class="flex-1 mr10">
          <el-input v-model="form.sellPoint" type="textarea" />
        </div>
      </div>
      <div class="flex align-center mt40">
        <div class="label-80 mr10">商品图片</div>
        <div class="flex-1 mr10">
          <idol-qiniu-upload
            list-type="picture-card"
            :limit="9"
            :file-list="form.image"
            @upload-success="picUpload(arguments)"
            @remove="picRemove(arguments)"
          >
            <i class="el-icon-plus" />
          </idol-qiniu-upload></div>
      </div>
      <div class="flex align-center mt40">
        <div class="label-80 mr10">商品类目</div>
        <div class="flex-1 mr10">
          <el-select v-model="form.cid">
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
      </div>

      <div class="flex align-center mt40">
        <div class="label-80 mr10" />
        <el-button type="warning" size="mini" @click="submit">提交</el-button>
      </div>

    </el-dialog>
    <el-pagination
      background
      class="mt10"
      :page-size="params.pageSize"
      layout="prev, pager, next"
      :total="pageTotal"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import idolTable from './idol-table'
import qiniuUplad from '@/components/pic-upload/qiniu-upload'
import {
  getGoodsList,
  getGoodsCategory,
  goodsHandle,
  goodsDelete
} from '../../../api/goods'

export default {
  name: 'Index',
  components: {
    idolTable,
    idolQiniuUpload: qiniuUplad
  },
  data() {
    return {
      pageTotal: 0,
      params: {
        pageNum: 1,
        pageSize: 10
      },
      form: {
        title: '',
        sellPoint: '',
        image: [],
        cid: '',
        // barcode: '',
        pid: ''
      },
      goodsDialog: false,
      categoryList: [],
      list: []
    }
  },
  async mounted() {
    this.getList()
    try {
      const category = await getGoodsCategory()
      this.categoryList = category.data
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async getList() {
      try {
        const list = await getGoodsList(this.params)
        this.list = list.data
        this.pageTotal = list.total
      } catch (e) {
        console.log(e)
      }
    },
    editGoods(data) {
      this.goodsDialog = true
      this.form.title = data.title
      this.form.sellPoint = data.sellPoint
      this.form.cid = data.cid
      // this.form.barcode = data.barcode
      this.form.pid = data.id
      this.form.image = data.image
    },
    async deleteItem(id) {
      try {
        await goodsDelete(id)
        this.$message.success('删除成功')
        this.getList()
      } catch (e) {
        console.log(e)
      }
    },
    addGoods() {
      this.goodsDialog = true
      this.form.title = ''
      this.form.sellPoint = ''
      this.form.cid = ''
      // this.form.barcode = ''
      this.form.pid = ''
      this.form.image = []
    },
    async submit() {
      try {
        await goodsHandle(this.form)
        this.$message.success('操作成功')
        this.goodsDialog = false
        this.getList()
      } catch (e) {
        console.log(e)
      }
    },
    pageChange(page) {
      this.params.pageNum = page
      this.getList()
    },
    picUpload(e) {
      this.form.image.push(e[0])
    },
    removePicHandle(path, groups) {
      const arr = []
      groups.forEach(item => {
        if (path !== item) {
          arr.push(item)
        }
      })
      return arr
    },
    picRemove(e) {
      this.form.image = this.removePicHandle(e[0], this.form.image)
    }
  }
}
</script>

<style scoped lang="less">
  /deep/ .el-upload-list--picture-card .el-upload-list__item,
  /deep/ .el-upload--picture-card{
    width: 60px;
    height: 60px;
  }
  /deep/ .el-upload--picture-card{
    line-height: 68px;
  }
</style>
