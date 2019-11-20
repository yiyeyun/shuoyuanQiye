<template>
  <div class="box">
    <!--<div>欢迎登入亿业云企业后台管理系统</div>-->
    <!--<div>添加地址</div>-->
    <div class="font-14-333 full-width mb20 flex">
      <el-input v-model="keyword" class="width-200 mr10" placeholder="请输入输入关键词" />
      <el-input v-model="markerPo.lat" class="width-100 mr10" placeholder="经度" />
      <el-input v-model="markerPo.lng" class="width-100 mr10" placeholder="纬度" />
      <!--<label> 关键词：<input v-model="keyword"></label>-->

      <!--<label> 经度：<input v-model="markerPo.lat"></label>-->

      <!--<label> 纬度：<input v-model="markerPo.lng"></label>-->
      <el-button type="warning" size="mini" @click="submit">提交</el-button>

    </div>
    <small class="font-size-12 text-primary full-width mb20">点击地图选择</small>

    <baidu-map ak="ocjtpCpd3HusX9VUmkfc49P9jxRV5Vch" class="full-width relative" :scroll-wheel-zoom="true" @click="clickBmap">

      <!--地图视图-->
      <bm-view class="map" />
      <!--显示更多-->
      <div class="fix-right">
        <div class="more_panel">
          <span :class="{'down':isShowPanel}" class="mb10" @click.stop="showPanel">
            <span>{{ isShowPanel?'隐藏':'显示' }}</span>搜索列表<i class="el-icon-d-arrow-right" />
          </span>
        </div>
        <!--搜索-->
        <bm-local-search
          :keyword="keyword"
          :panel="isShowPanel"
          :auto-viewport="true"
          :location="location"
          @searchcomplete="searchcomplete"
        />
      </div>
    <!--点标注-->
    <!--<bm-marker :position="markerPo" :dragging="true" :title="storeName" :z-index="999999999" :icon="{url:markerIcon,size: {width: 34, height: 34}}" @click="infoWindowOpen" @dragend="dragend">-->

    <!--<bm-info-window :show="isShowInfo" @close="infoWindowClose" @open="infoWindowOpen">{{ address }}</bm-info-window>-->

    <!--</bm-marker>-->

    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmView from 'vue-baidu-map/components/map/MapView' // 地图视图
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch' // 搜索
import { submitAresInfo } from '../../../api/source'

export default {

  components: {
    BaiduMap,
    BmView,
    BmLocalSearch
  },

  data() {
    return {
      storeName: '',
      center: {
        lng: 39.9, lat: 116.3
      },
      zoom: 3,
      location: '北京',
      keyword: '北京',
      markerPo: {
        lng: '', lat: ''
      },
      isShowPanel: true,
      isShowInfo: false,
      markerIcon: '', // 标注图片
      address: ''
    }
  },

  methods: {

    clickBmap(val) { // 右击鼠标放标注
      this.markerPo = val.point
    },

    async submit() {
      console.log(this.$router, this.$route, this.markerPo)
      try {
        await submitAresInfo({
          itemId: this.$route.query.id,
          gpsLatitude: this.markerPo.lat,
          gpsLongitude: this.markerPo.lng
        })
        this.$message.success('操作成功')
        this.$router.back()
      } catch (e) {
        console.log(e)
      }
    },

    showPanel() { // 点击标注出现弹框
      this.isShowPanel = !this.isShowPanel
    },

    infoWindowClose() { // 弹框关闭
      this.isShowInfo = false
    },

    infoWindowOpen() { // 弹框打开
      this.isShowInfo = true
    },

    // dragend(val) { // 标注拖拽完成获取坐标信息
    //   this.markerPo = val.point
    //
    //   const geocoder = new BMap.Geocoder() // 创建地址解析器的实例
    //
    //   geocoder.getLocation(val.point, rs => {
    //     this.address = rs.address
    //   })
    // },

    searchcomplete(arr) {
      this.isShowPanel = true
    }

  }

}
</script>

<style scoped lang="less">
  .box{
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 32px;
    color: #999;
    align-items: center;
  }
  .map{
    width: 100%;
    height:500px;
  }
  .fix-right{
    display: none;
    position: absolute;
    padding: 10px;
    width: 200px;
    max-height: 50%;
    overflow-y: scroll;
    top: 0;
    left: 0;
    background: #fff;
  }
  .more_panel{
    text-align: center;
    font-size: 12px;
    color: #2878ff;
    padding-top:10px;
    span{
      cursor: pointer;
      i{
        transform:rotate(90deg);
      }
    }
    span.down{
      i{
        transform:rotate(-90deg);
      }
    }
  }
</style>
