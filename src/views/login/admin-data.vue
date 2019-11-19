<template>
  <div class="page">
    <div class="box border-shadow">
      <div class="text-center font-24-666 font-weight-600">资料提交</div>

      <div class="flex align-center mt40">
        <div class="label-80 mr10">姓名</div>
        <div class="width-200 mr10">
          <el-input v-model="form.uname" />
        </div>
      </div>

      <div class="flex align-center mt40">
        <div class="label-80 mr10">职位</div>
        <div class="width-200 mr10">
          <el-input v-model="form.loginUserType" />
        </div>
      </div>
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
        <div class="label-80 mr10">固定电话</div>
        <div class="width-200 mr10">
          <el-input v-model="form.tel" />
        </div>
        <!--<el-button-->
        <!--type="primary"-->
        <!--size="small"-->
        <!--:disabled="second !== 0"-->
        <!--@click="getCode"-->
        <!--&gt;{{ second !== 0 ? second + 'S后重新发送' : '获取验证码' }}</el-button>-->
      </div>
      <div class="flex align-center mt20">
        <div class="label-80 mr10">手机号</div>
        <div class="width-200 mr10">
          <el-input v-model="form.phone" />
        </div>
        <el-button
          type="primary"
          size="small"
          :disabled="second !== 0"
          @click="getCode"
        >{{ second !== 0 ? second + 'S后重新发送' : '获取验证码' }}</el-button>
      </div>
      <div class="flex align-center mt20">
        <div class="label-80 mr10">验证码</div>
        <div class="width-200">
          <el-input v-model="form.code" />
        </div>
      </div>
      <!--<div class="fa fa-address-card"></div>-->

      <div class="flex align-center mt20">
        <div class="label-80 mr10" />
        <el-button type="warning" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qiniuUplad from '@/components/pic-upload/qiniu-upload'
import VDistpicker from 'v-distpicker'
import {
  validatePhone
} from '../../validate'
import {
  getSmsCode
} from '../../api/common'
import {
  userDataHandle
} from '../../api/login'

export default {
  name: 'AdminData',
  components: {
    idolQiniuUpload: qiniuUplad,
    VDistpicker
  },
  data() {
    return {
      second: 0,
      interval: null,
      address: {
        province: '',
        city: '',
        area: ''
      },
      detailAddress: '',
      form: {
        address: '',
        tel: '',
        phone: '',
        loginUserType: '',
        companyZizi: [],
        uname: '',
        code: ''

      }
    }
  },
  methods: {
    getCode() {
      validatePhone(this.form.phone)
        .then(() => {
          return getSmsCode({
            mobile: this.form.phone,
            type: 'MERCHANT_BIND'
          })
        })
        .then(() => {
          this.second = 60
          this.interval = setInterval(() => {
            this.second--
            if (this.second === 0) {
              clearInterval(this.interval)
            }
          }, 1000)
        })
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
