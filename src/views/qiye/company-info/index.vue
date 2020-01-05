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
          <div class="mr10">{{ companyInfo.address }} </div>
        </div>

        <div class="flex align-center mt20">
          <div class="label-80 mr10">公司简介</div>
          <div class="mr10">{{ companyInfo.introduction }} </div>
        </div>
        <div class="flex align-center mt20">
          <div class="label-80 mr10">公司资质</div>
          <div v-viewer="{movable: false}" class="images pointer flex v-viewer1" @click="previewImg('v-viewer1')">
            <img
              v-for="(item, index) in companyInfo.companyZizi"
              :key="index"
              class="table-pic"
              :src="item"
            >
          </div>
        </div>
        <div class="flex align-center mt20">
          <div class="label-80 mr10">公司照片</div>
          <div v-viewer="{movable: false}" class="images pointer flex v-viewer2" @click="previewImg('v-viewer2')">
            <img
              v-for="(item, index) in companyInfo.logoList"
              :key="index"
              class="table-pic"
              :src="item"
            >
          </div>
        </div>
        <div class="flex align-center mt20">
          <div class="label-80 mr10">公司网址</div>
          <div class="width-200 mr10">{{ companyInfo.url }} </div>
        </div>
        <div class="flex align-center mt20">
          <div class="label-80 mr10">联系方式</div>
          <div class="width-200 mr10">{{ companyInfo.tel }} </div>
        </div>
      </div>
      <div v-show="isEdit">

          <div class="flex align-center mt40">
              <div class="label-80 mr10">视频中心</div>
              <idol-video-upload
                      list-type="picture-card"
                      :limit="1"
                      :file-list="video"
                      @upload-success="videoUpload(arguments)"
                      @remove="videoRemove(arguments)"
              >
                  <i class="el-icon-plus" />
              </idol-video-upload>
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
          <div class="label-80 mr10">公司介绍</div>
          <div class="flex-1">
            <el-input v-model="form.introduction" />
          </div>
        </div>

          <div class="flex align-center mt20">
              <div class="label-80 mr10">联系人</div>
              <div class="width-200 mr10">
                  <el-input v-model="form.contactPerson" />
              </div>
          </div>

        <div class="flex align-center mt20">
          <div class="label-80 mr10">联系人电话</div>
          <div class="width-200 mr10">
            <el-input v-model="form.tel" />
          </div>
        </div>
        <div class="flex align-center mt20">
          <div class="label-80 mr10">公司网址</div>
          <div class="width-200 mr10">
            <el-input v-model="form.url" />
          </div>
        </div>

          <div class="mt10 flex" v-for="item in customerServicePhone">
              <div class="width-200 mr10">
                  <el-input placeholder="客服姓名"
                            v-model="item[0]" />
              </div>
              <div class="width-200 mr10">
                  <el-input placeholder="客服电话"
                            v-model="item[1]" />
              </div>
          </div>

          <div class="flex align-center mt20">
              <el-button @click="addService">添加客服</el-button>
          </div>


          <div class="mt20 flex" v-for="item in form.outletsRequests">
              <div class="width-200 mr10">
                  <el-input placeholder="网点名称"
                            v-model="item.outletsName" />
              </div>
              <div class="width-200 mr10">
                  <el-input placeholder="联系电话"
                            v-model="item.phone" />
              </div>
              <div class="flex-1">
                  <el-input placeholder="详细地址"
                            v-model="item.address" />
              </div>
          </div>

          <div class="flex align-center mt10">
              <el-button @click="addRequest">添加网点</el-button>
          </div>

        <div class="flex align-center mt40">
          <div class="label-80 mr10">公司图片</div>
          <div class="width-200 mr10">
            <idol-qiniu-upload
              list-type="picture-card"
              :limit="9"
              :file-list="form.logoList"
              @upload-success="logoPicUpload1(arguments)"
              @remove="logoPicRemove1(arguments)"
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
import videoUplad from '@/components/video-upload/video-upload'
import {
  getCompanyInfo,
  createdCompanyInfo
} from '../../../api/qiye/company'

export default {
  name: 'AdminData',
  components: {
    idolQiniuUpload: qiniuUplad,
    idolVideoUpload: videoUplad,
    VDistpicker
  },
  data() {
    return {
      second: 0,
      isEdit: false,
      interval: null,
      video: [],
      address: {
        province: '',
        city: '',
        area: ''
      },
      customerServicePhone: [],
      detailAddress: '',
      companyInfo: {},
      form: {
        address: '',
        tel: '',
        introduction: '',
        outletsRequests: [],
        companyZizi: [],
        contactPerson: '',
        logoList: []
      }
    }
  },
  mounted() {
    this.getCompanyInfo()
  },
  methods: {
    addRequest() {
      console.log(this.form.outletsRequests)
      this.form.outletsRequests.push({
        outletsName: '',
        phone: '',
        address: ''
      })
    },
    addService() {
      console.log(this.customerServicePhone)
      this.customerServicePhone.push(['', ''])
    },
    videoUpload(e) {
      this.video = [e[0]]
    },
    videoRemove(e) {
      this.video = []
    },
    previewImg(className) {
      const viewer = this.$el.querySelector(className).$viewer
      viewer.show()
    },
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
      let customerServicePhone = {}
      this.customerServicePhone.forEach(item => {
        customerServicePhone[item[0]] = item[1]
      })
      this.form.address = `${this.address.province}${this.address.city}${this.address.area}${this.detailAddress}`
      try {
        await createdCompanyInfo({
          ...this.form,
          videoUrl: this.video[0],
          customerServicePhone
        })
        this.isEdit = false
        this.getCompanyInfo()
        this.$message.success('操作成功')
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
    },
    logoPicUpload1(e) {
      this.form.logoList.push(e[0])
    },
    logoPicRemove1(e) {
      this.form.logoList = this.removePicHandle(e[0], this.form.logoList)
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
  .table-pic{
    width: 60px;
    height: 60px;
    margin: 0 5px;
  }
  .box{
    border-radius: 10px;
    background: #fff;
    padding: 40px;
    width: 700px;
  }
  .label-80{
    flex: 0 0 80px;
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
