<template>
  <div>
    <div class="flex align-center">
      <div class="label-80 mr10">视频上传</div>
      <div v-show="!video.length" class="flex-1 mr10">
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
      <div v-show="video.length" class="flex-1 relative">
        <el-button type="danger" class="delete" @click="videoRemove">删除</el-button>
        <video :src="video[0]" width="300px" />
      </div>
    </div>
    <div class="flex align-center mt10">
      <div class="label-80 mr10" />
      <div>
        <el-button type="warning" size="mini" @click="submit">提交</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import videoUplad from '@/components/video-upload/video-upload'
import {
  productVideoUpload
} from '../../../api/source'

export default {
  name: 'Video',
  components: {
    idolVideoUpload: videoUplad
  },
  props: {
    dialog: Boolean,
    itemId: String
  },
  data() {
    return {
      video: []
    }
  },
  methods: {
    videoUpload(e) {
      this.video = [e[0]]
    },
    videoRemove(e) {
      this.video = []
    },
    async submit() {
      try {
        await productVideoUpload({
          videoUrl: this.video[0],
          itemId: this.itemId
        })
        this.$message.success('操作成功')
        this.$emit('close')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .delete{
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 100;
  }
</style>
