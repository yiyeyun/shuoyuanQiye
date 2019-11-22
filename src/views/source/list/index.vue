<template>
  <div class="p20">
    <el-table :data="list" style="width: 100%">
      <el-table-column
        prop="title"
        align="center"
        label="商品名称"
      />
      <el-table-column
        prop="sellPoint"
        align="center"
        label="商品详情"
      />
      <el-table-column
        prop="categoryName"
        align="center"
        label="类目"
      />
      <el-table-column label="产地信息">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="areaInfo(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="产品介绍">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="descriptHandle(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="资质荣誉">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="honorHandle(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="乡镇信息">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="townHandle(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="宣传视频">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="videoHandle(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="深度溯源">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="deepSrouceHandle(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      class="mt10"
      :page-size="params.pageSize"
      layout="prev, pager, next"
      :total="pageTotal"
      @current-change="pageChange"
    />
    <el-dialog title="宣传视频" width="600px" :visible.sync="videoParams.videoDialog">
      <idol-video
        :item-id="videoParams.itemId"
        @close="videoParams.videoDialog = false"
      />
    </el-dialog>
    <el-dialog title="产品介绍" width="600px" :visible.sync="descriptParams.descriptDialog">
      <idol-descript
        :item-id="descriptParams.itemId"
        :detail-data="descriptParams.descriptData"
        @close="descriptParams.descriptDialog = false"
      />
    </el-dialog>
    <el-dialog
      title="荣誉资质"
      width="600px"
      :visible.sync="honorParams.honorDialog"
    >
      <idol-honor
        :detail-data="honorParams.honorData"
        :item-id="honorParams.itemId"
        @close="honorParams.honorDialog = false"
      />
    </el-dialog>
    <el-dialog
      title="乡镇信息"
      width="600px"
      :visible.sync="townInfoParams.townDialog"
    >
      <town-info
        :key-group="townInfoParams.townKeyData"
        :value-group="townInfoParams.townValueData"
        :item-id="townInfoParams.itemId"
        @close="townInfoParams.townDialog = false"
      />
    </el-dialog>
    <el-dialog
      title="深度溯源"
      width="800px"
      :visible.sync="deepSourceParams.deepSourceDialog"
    >
      <deep-source
        :type-group="deepSourceParams.typeGroup"
        :type-value="deepSourceParams.typeValue"
        :item-id="deepSourceParams.itemId"
        @close="deepSourceParams.deepSourceDialog = false"
      />
    </el-dialog>
  </div>
</template>

<script>
import {
  getGoodsList
} from '../../../api/goods'
import {
  getProductDescript,
  getAreaGps,
  getTownInfo,
  getDeepSource,
  getProductHonor
} from '../../../api/source'
import video from './video'
import descript from './descript'
import deepSource from './deep-source'
import townInfo from './town-info'
import honor from './honor'
export default {
  name: 'Index',
  components: {
    idolVideo: video,
    idolDescript: descript,
    townInfo,
    deepSource,
    idolHonor: honor
  },
  data() {
    return {
      pageTotal: 0,
      townInfoParams: {
        townDialog: false,
        townKeyData: [],
        itemId: '',
        townValueData: []
      },
      deepSourceParams: {
        deepSourceDialog: false,
        itemId: '',
        typeGroup: [],
        typeValue: []
      },
      videoParams: {
        videoDialog: false,
        itemId: ''
      },
      honorParams: {
        itemId: '',
        honorDialog: false,
        honorData: {
          imageList: []
        }
      },
      descriptParams: {
        itemId: '',
        descriptDialog: false,
        descriptData: {
          imageList: []
        }
      },
      params: {
        pageNum: 1,
        pageSize: 10
      },
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async deepSrouceHandle(id) {
      this.deepSourceParams.deepSourceDialog = true
      this.deepSourceParams.itemId = id
      try {
        let typeGroup = []
        let typeValue = []
        const data = await getDeepSource(id)
        for (let key in data.data) {
          typeGroup.push(key)
          let keys = []
          let value = []
          console.log(666, data.data[key])
          data.data[key].forEach((item, index) => {
            keys.push(item.key)
            value.push('')
          })
          typeValue.push([keys, value])
        }
        this.deepSourceParams.typeGroup = typeGroup
        this.deepSourceParams.typeValue = typeValue
      } catch (e) {
        console.log(e)
      }
    },
    pageChange(page) {
      this.params.pageNum = page
      this.getList()
    },
    videoHandle(id) {
      this.videoParams.itemId = id
      this.videoParams.videoDialog = true
    },
    async townHandle(id) {
      this.townInfoParams.townDialog = true
      this.townInfoParams.itemId = id
      try {
        const data = await getTownInfo(id)
        this.townInfoParams.townKeyData = []
        this.townInfoParams.townValueData = []
        if (data.data.townshipMap) {
          for (const key in data.data.townshipMap) {
            this.townInfoParams.townKeyData.push(key)
            this.townInfoParams.townValueData.push(data.data.townshipMap[key])
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    async honorHandle(id) {
      this.honorParams.itemId = id
      this.honorParams.honorDialog = true
      try {
        const data = await getProductHonor(id)
        this.honorParams.honorData = data.data
        if (!this.honorParams.honorData.imageList) {
          this.honorParams.honorData.imageList = []
        }
      } catch (e) {
        console.log(e)
      }
    },
    async areaInfo(id) {
      try {
        const info = await getAreaGps(id)
        this.$router.push({
          path: `/map?id=${id}&lat=${info.data.gpsLatitude}&lng=${info.data.gpsLongitude}`
        })
      } catch (e) {
        console.log(e)
      }
    },
    async descriptHandle(id) {
      this.descriptParams.itemId = id
      this.descriptParams.descriptDialog = true
      try {
        const data = await getProductDescript(id)
        this.descriptParams.descriptData = data.data
        if (!this.descriptParams.descriptData.imageList) {
          this.descriptParams.descriptData.imageList = []
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getList() {
      try {
        const list = await getGoodsList(this.params)
        this.list = list.data
        this.pageTotal = list.total
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
