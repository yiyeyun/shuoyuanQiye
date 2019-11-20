<template>
  <div>
    <div class="flex align-center">
      <div class="label-80 mr10">荣誉资质</div>
      <div class="width-200 mr10">
        <idol-qiniu-upload
          list-type="picture-card"
          :limit="9"
          :file-list="detailData.imageList"
          @upload-success="picUpload(arguments)"
          @remove="picRemove(arguments)"
        >
          <i class="el-icon-plus" />
        </idol-qiniu-upload></div>
    </div>
    <div class="flex align-center mt20">
      <div class="label-80 mr10">资质描述</div>
      <div class="flex-1">
        <el-input v-model="detailData.text" type="textarea" />
      </div>
    </div>
    <div class="flex align-center mt20">
      <div class="label-80 mr10" />
      <div>
        <el-button type="warning" size="mini" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qiniuUplad from '@/components/pic-upload/qiniu-upload'
import {
  submitHonor
} from '../../../api/source'

export default {
  name: 'Descript',
  components: {
    idolQiniuUpload: qiniuUplad
  },
  props: {
    detailData: Object,
    itemId: String
  },
  methods: {
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
      console.log(e, 'shangchaun')
      this.detailData.imageList.push(e[0])
    },
    async submit() {
      try {
        console.log(this.detailData)
        await submitHonor(this.detailData)
        this.$message.success('操作成功')
        this.$emit('close')
      } catch (e) {
        console.log(e)
      }
    },
    picRemove(e) {
      this.detailData.imageList = this.removePicHandle(e[0], this.detailData.imageList)
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
