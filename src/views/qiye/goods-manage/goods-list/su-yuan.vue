<template>
  <div>
    <div v-for="(item, index) in suYuanData" :key="item.nodeGroupName" class="mb20">
      <div class="flex align-center">
        <div class="label-80 mr10">节点名称</div>
        <el-input v-model="item.nodeGroupName" class="mr50" />
        <el-button type="primary" size="mini" @click="addNode(index)">添加节点</el-button>
      </div>
      <div
        v-for="(subitem, subindex) in item.suYuanItemList"
        :key="item.nodeName"
        class="mt10"
      >
        <div class=" flex align-center">
          <el-input
            v-model="subitem.nodeName"
            placeholder="请输入名称"
            class="mr20"
          />
          <el-input
            v-model="subitem.nodeVal"
            placeholder="请输入值"
          />
        </div>
        <div class="flex mt10 align-center">
          <div class="width-200 mr10">
            <qiniuUplad
              list-type="picture-card"
              :limit="4"
              :file-list="subitem.image"
              @upload-success="imgPicUpload(arguments, index, subindex)"
              @remove="imgPicRemove(arguments, index, subindex)"
            >
              <i class="el-icon-plus" />
            </qiniuUplad>
          </div>
        </div>
      </div>

    </div>
    <div class="mt20">
      <el-button class="mr10" type="primary" size="mini" @click="addGroup">添加溯源组</el-button>
      <el-button class="mr10" type="warning" size="mini" @click="submit">提交</el-button>
      <el-button class="mr10" size="mini" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { selectProductSuyuan, createdOrUpdatedProductSuyuan } from '../../../../api/qiye/goods'
import qiniuUplad from '@/components/pic-upload/qiniu-upload'
export default {
  name: 'SuYuan',
  components: {
    qiniuUplad
  },
  props: {
    id: String
  },
  data() {
    return {
      suYuanData: []
    }
  },
  mounted() {
    this.selectProductSuyuan()
  },
  methods: {
    async selectProductSuyuan() {
      try {
        const res = await selectProductSuyuan(this.id)
        if (res.data) {
          this.suYuanData = [...res.data]
        }
      } catch (e) {
        console.log(e)
      }
    },
    addNode(index) {
      this.suYuanData[index].suYuanItemList.push({
        nodeName: '',
        nodeVal: '',
        image: []
      })
    },
    imgPicUpload(e, index, subindex) {
      this.suYuanData[index].suYuanItemList[subindex].image.push(e[0])
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
    imgPicRemove(e, index, subindex) {
      console.log(e, index, subindex)
      this.suYuanData[index].suYuanItemList[subindex].image =
        this.removePicHandle(e[0], this.suYuanData[index].suYuanItemList[subindex].image)
    },
    cancel() {
      this.$emit('close')
      this.suYuanData = []
    },
    addGroup() {
      this.suYuanData.push({
        nodeGroupName: '',
        suYuanItemList: [{
          nodeName: '',
          nodeVal: '',
          image: []
        }]
      })
    },
    async submit() {
      try {
        const suYuanVoList = this.suYuanData.filter(item => item.nodeGroupName)
        await createdOrUpdatedProductSuyuan({
          itemId: this.id,
          suYuanVoList
        })
        this.$message.success('提交成功')
        this.$emit('close')
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
</style>
