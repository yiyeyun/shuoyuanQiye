<template>
  <div>
    <div class="flex align-center">
      <div class="label-80 mr10">商品标题</div>
      <el-input v-model="form.title" />
    </div>
    <div class="flex mt20 align-center">
      <div class="label-80 mr10">类目</div>
      <el-input v-model="form.cname" />
    </div>
    <div class="flex mt20 align-center">
      <div class="label-80 mr10">品种</div>
      <el-input v-model="form.variety" />
    </div>

    <div class="flex mt20 align-center">
      <div class="label-80 mr10">品牌名称</div>
      <el-input v-model="form.brand" />
    </div>
    <div class="flex mt20">
      <div class="label-80 mr10">产地</div>
      <div>
        <VDistpicker
          :province="address.province"
          :city="address.city"
          :area="address.area"
          @selected="onSelect"
        />
        <div class="mt20">
          <el-input v-model="detailAddress" placeholder="请输入详细地址" />
        </div>
      </div>


    </div>
    <div class="flex mt20 align-center">
      <div class="label-80 mr10">清真标志</div>
      <div class="width-200 mr10">
        <idol-qiniu-upload
          list-type="picture-card"
          :limit="1"
          :file-list="hash"
          @upload-success="hashPicUpload(arguments)"
          @remove="hashPicRemove(arguments)"
        >
          <i class="el-icon-plus" />
        </idol-qiniu-upload>
      </div>
    </div>
    <div class="flex mt20 align-center">
      <div class="label-80 mr10">logo</div>
      <div class="width-200 mr10">
        <idol-qiniu-upload
          list-type="picture-card"
          :limit="1"
          :file-list="logo"
          @upload-success="logoPicUpload(arguments)"
          @remove="logoPicRemove(arguments)"
        >
          <i class="el-icon-plus" />
        </idol-qiniu-upload>
      </div>
    </div>
    <div class="flex mt20 align-center">
      <div class="label-80 mr10">商品图片</div>
      <div class="width-200 mr10">
        <idol-qiniu-upload
          list-type="picture-card"
          :limit="6"
          :file-list="form.image"
          @upload-success="imgPicUpload(arguments)"
          @remove="imgPicRemove(arguments)"
        >
          <i class="el-icon-plus" />
        </idol-qiniu-upload>
      </div>
    </div>
    <div class="flex mt20 align-center">
      <div class="label-80 mr10" />
      <el-button type="warning" size="mini" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import qiniuUplad from '@/components/pic-upload/qiniu-upload'
import { createdOrUpdatedProduct } from '../../../../api/qiye/goods'

export default {
  name: 'Handle',
  components: {
    idolQiniuUpload: qiniuUplad,
    VDistpicker
  },
  props: {
    type: String
  },
  data() {
    return {
      pid: '',
      address: {
        province: '',
        city: '',
        area: ''
      },
      logo: [],
      hash: [],
      detailAddress: '',
      form: {
        title: '',
        brand: '',
        cname: '',
        halalSign: '',
        image: [],
        logo: '',
        origin: '',
        variety: ''
      }
    }
  },
  methods: {
    async submit() {
      console.log(this.address, this.detailAddress, this.logo, this.hash, this.form.image)
      this.form.origin =
        this.address.province +
        this.address.city +
        this.address.area +
        this.detailAddress
      this.form.halalSign = this.hash[0]
      this.form.logo = this.logo[0]
      try {
        if (this.type === 'add') {
          await createdOrUpdatedProduct(this.form)
          this.$message.success('提交成功')
          this.$emit('success')
        }
      } catch (e) {
        console.log(e)
      }
    },
    logoPicUpload(e) {
      this.logo = [e[0]]
    },
    logoPicRemove(e) {
      this.logo = []
    },
    hashPicUpload(e) {
      this.hash = [e[0]]
    },
    hashPicRemove(e) {
      this.hash = []
    },
    imgPicUpload(e) {
      this.form.image.push(e[0])
    },
    imgPicRemove(e) {
      this.form.image = this.removePicHandle(e[0], this.form.image)
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
    onSelect(data) {
      this.address.province = data.province.value
      this.address.city = data.city.value
      this.address.area = data.area.value
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
