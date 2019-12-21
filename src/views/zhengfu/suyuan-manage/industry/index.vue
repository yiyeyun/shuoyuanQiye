<template>
  <div class="p20">
    <div class="mb20">
      <el-button
        type="warning"
        size="small"
        @click="handle"
      >{{ industryData.id ? '编辑': '新增' }}产业</el-button>
    </div>

    <div class="width-500">{{ industryData.text }}</div>
    <div class="font-size-0 flex">
      <div v-for="item in industryData.imageList" class="flex-1 mr10">
        <img :src="item" class="full-width" alt="">
      </div>
    </div>

    <el-dialog
      :title="industryData.id ? '编辑产业': '新增产业'"
      width="600px"
      :visible.sync="dialog"
    >
      <div class="flex align-center mb20">
        <div class="name">文字描述</div>
        <el-input v-model="text" />
      </div>
      <div class="flex align-center">
        <div class="name">图片上传</div>
        <idol-qiniu-upload
          list-type="picture-card"
          :limit="3"
          :fileList="imageList"
          @upload-success="picUpload(arguments)"
          @remove="picRemove(arguments)"
        >
          <i class="el-icon-plus" />
        </idol-qiniu-upload>
      </div>

      <div class="flex mt20">
        <div class="name" />
        <el-button type="warning" @click="submit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getIndustry,
  industryHandle
} from '../../../../api/zhengfu/industry'
import qiniuUplad from '@/components/pic-upload/qiniu-upload'
import {
  validateNotNull
} from '../../../../validate'

export default {
  name: 'Index',
  components: {
    idolQiniuUpload: qiniuUplad
  },
  data() {
    return {
      dialog: false,
      industryData: {},
      imageList: [],
      text: ''
    }
  },
  mounted() {
    this.getIndustry()
  },
  methods: {
    async submit() {
      let data = {}
      data.id = this.industryData.id
      data.imageList = this.imageList
      data.text = this.text
      try {
        await validateNotNull(this.imageList.length, '图片未上传')
        await validateNotNull(this.text, '内容未输入')
        await industryHandle(data)
        this.$message.success('操作成功')
        this.dialog = false
        this.industryData.imageList = this.imageList
        this.industryData.text = this.text
        await getIndustry()
      } catch (e) {
        console.log(e)
      }
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
    picUpload(e) {
      console.log(e, 111, this.imageList)
      this.imageList.push(e[0])
    },
    picRemove(e) {
      console.log(e)
      this.imageList = this.removePicHandle(e[0], this.imageList)
    },
    async getIndustry() {
      try {
        const data = await getIndustry()
        this.industryData = data.data
        this.imageList = data.data.imageList || []
        this.text = data.data.text
      } catch (e) {
        console.log(e)
      }
    },
    async handle() {
      try {
        this.dialog = true
      } catch (e) {
        console.log(e)
      }
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
  .name{
    width: 80px;
  }
</style>
