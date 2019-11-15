<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="模板图片">
      <idol-qiniu-upload
        list-type="picture-card"
        :limit="3"
        :file-list="form.imageList"
        @upload-success="picUpload(arguments)"
        @remove="picRemove(arguments)"
      >
        <i class="el-icon-plus" />
      </idol-qiniu-upload>
    </el-form-item>
    <el-form-item label="模板材质">
      <el-input v-model="form.material" />
    </el-form-item>
    <el-form-item label="模板价格">
      <el-input v-model="form.material" />
    </el-form-item>
    <el-form-item label="参数集合">
      <el-input v-model="paramData" placeholder="请用逗号分隔"/>
    </el-form-item>
    <el-form-item label="">
      <el-button
        type="warning"
        size="mini"
        @click="submit"
      >提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import qiniuUplad from '@/components/pic-upload/qiniu-upload'
import {
  validateNotNull
} from '../../validate'

export default {
  name: 'Handle',
  components: {
    idolQiniuUpload: qiniuUplad
  },
  data() {
    return {
      paramData: '',
      form: {
        imageList: [],
        material: '',
        paramData: '',
        price: ''
      }
    }
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
    async submit() {
      try {
        await validateNotNull(this.form.imageList.length, '模板图片不能为空')
        await validateNotNull(this.form.material, '模板材质不能为空')
        await validateNotNull(this.form.price, '模板价格不能为空')
        await validateNotNull(this.paramData, '模板参数不能为空')
      } catch (e) {
        console.log(e)
      }
    },
    picRemove(e) {
      this.form.imageList = this.removePicHandle(e[0], this.form.image)
    },
    picUpload(e) {
      console.log('goodsPicUpload', e)
      this.form.imageList.push(e[0])
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
