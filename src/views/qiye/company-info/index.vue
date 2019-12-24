<template>
  <div class="page">

    <div class="box border-shadow">
      <el-button
        type="warning"
        v-show="!isEdit"
        size="mini"
        @click="isEdit = true"
      >编辑资料</el-button>
      <el-button
        type="warning"
        v-show="isEdit"
        size="mini"
        @click="isEdit = false"
      >取消编辑</el-button>
      <div class="flex align-center mt40">
        <div class="label-80 mr10">公司名</div>
        <div class="width-200 mr10">{{ companyInfo.groupName }} </div>
      </div>

      <div v-show="!isEdit">
        <div class="flex align-center mt20">
          <div class="label-80 mr10">公司地址</div>
          <div class="width-200 mr10">{{ companyInfo.address }} </div>
        </div>
        <div class="flex align-center mt20">
          <div class="label-80 mr10">公司资质</div>
          <div class="width-200 mr10">{{ companyInfo.companyZizi }} </div>
        </div>
        <div class="flex align-center mt20">
          <div class="label-80 mr10">公司简介</div>
          <div class="width-200 mr10">{{ companyInfo.introduction }} </div>
        </div>
        <div class="flex align-center mt20">
          <div class="label-80 mr10">联系方式</div>
          <div class="width-200 mr10">{{ companyInfo.tel }} </div>
        </div>
      </div>
      <div v-show="isEdit">

        <div class="flex align-center mt40">
          <div class="label-80 mr10">公司资质</div>
          <div class="width-200 mr10">
            <idol-qiniu-upload
              list-type="picture-card"
              :limit="9"
              :file-list="form.companyZizi"
              @upload-success="logoPicUpload(arguments)"
              @remove="logoPicRemove(arguments)"
            >
              <i class="el-icon-plus" />
            </idol-qiniu-upload></div>
        </div>

        <div class="flex align-center mt20">
          <div class="label-80 mr10">地址选择</div>
          <VDistpicker
            :province="address.province"
            :city="address.city"
            :area="address.area"
            @selected="onSelect"
          />
        </div>
        <div class="flex align-center mt20">
          <div class="label-80 mr10">详细地址</div>
          <div class="flex-1">
            <el-input v-model="detailAddress" />
          </div>
        </div>
        <div class="flex align-center mt20">
          <div class="label-80 mr10">公司介绍</div>
          <div class="flex-1">
            <el-input v-model="detailAddress" />
          </div>
        </div>

        <div class="flex align-center mt20">
          <div class="label-80 mr10">联系人电话</div>
          <div class="width-200 mr10">
            <el-input v-model="form.phone" />
          </div>
        </div>

        <div class="flex align-center mt40">
          <div class="label-80 mr10">公司图片</div>
          <div class="width-200 mr10">
            <idol-qiniu-upload
              list-type="picture-card"
              :limit="9"
              :file-list="form.companyZizi"
              @upload-success="logoPicUpload(arguments)"
              @remove="logoPicRemove(arguments)"
            >
              <i class="el-icon-plus" />
            </idol-qiniu-upload></div>
        </div>

        <!--<div class="fa fa-address-card"></div>-->

        <div class="flex align-center mt20">
          <div class="label-80 mr10" />
          <el-button type="warning" @click="submit">提交</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import qiniuUplad from '@/components/pic-upload/qiniu-upload'
import VDistpicker from 'v-distpicker'
import {
  getCompanyInfo
} from '../../../api/qiye/company'

export default {
  name: 'AdminData',
  components: {
    idolQiniuUpload: qiniuUplad,
    VDistpicker
  },
  data() {
    return {
      second: 0,
      isEdit: false,
      interval: null,
      address: {
        province: '',
        city: '',
        area: ''
      },
      detailAddress: '',
      companyInfo: {},
      form: {
        address: '',
        tel: '',
        introduction: '',
        companyZizi: []
      }
    }
  },
  mounted() {
    this.getCompanyInfo()
  },
  methods: {

    async getCompanyInfo() {
      try {
        const res = await getCompanyInfo()
        this.companyInfo = res.data
      } catch (e) {
        console.log(e)
      }
    },
    onSelect(data) {
      this.address.province = data.province.value
      this.address.city = data.city.value
      this.address.area = data.area.value
    },
    async submit() {
      this.form.address = `${this.address.province}${this.address.city}${this.address.area}${this.detailAddress}`
      try {
        await userDataHandle(this.form)
        this.$router.replace({
          path: '/'
        })
      } catch (e) {
        console.log(e)
      }
    },
    logoPicUpload(e) {
      this.form.companyZizi.push(e[0])
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
    logoPicRemove(e) {
      this.form.companyZizi = this.removePicHandle(e[0], this.form.companyZizi)
    }
  }
}
</script>

<style scoped lang="less">
  .page{
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box{
    border-radius: 10px;
    background: #fff;
    padding: 40px;
    width: 700px;
  }
  /deep/ .el-upload-list--picture-card .el-upload-list__item,
  /deep/ .el-upload--picture-card{
    width: 60px;
    height: 60px;
  }
  /deep/ .el-upload--picture-card{
    line-height: 68px;
  }
</style>
