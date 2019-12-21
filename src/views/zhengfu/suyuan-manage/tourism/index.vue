<template>
  <div class="p20">
    <div class="mb20">
      <el-button
        type="warning"
        size="small"
        @click="handle"
      >{{ htmlData ? '编辑': '新增' }}旅游</el-button>
    </div>
    <div v-show="dialog">
      <div ref="editor" class="full-width mb20" />
      <el-button type="warning" size="mini" @click="submit">提交</el-button>
      <el-button type="primary" size="mini" @click="cancel">取消</el-button>
    </div>
    <div v-if="!dialog" v-html="htmlData" />
    <!--<el-dialog-->
    <!--:title="htmlData ? '编辑旅游': '新增旅游'"-->
    <!--width="100%"-->
    <!--:visible.sync="dialog"-->
    <!--&gt;-->

    <!---->
    <!--</el-dialog>-->
  </div>
</template>

<script>
import E from 'wangeditor'
import {
  getTourism,
  tourismHandle
} from '../../../../api/zhengfu/tourism'

export default {
  name: 'Index',
  data() {
    return {
      editorContent: '',
      editor: null,
      dialog: true,
      id: '',
      htmlData: ''
    }
  },
  mounted() {
    this.getTourism()
    let editor = new E(this.$refs.editor)
    editor.customConfig.onchange = (html) => {
      console.log(111, html)
      console.log(111, this.htmlData)
      this.htmlData = html
    }
    editor.create()
    editor.txt.html(this.htmlData)
    this.editor = editor
    this.dialog = false
  },
  methods: {
    cancel() {
      this.dialog = false
    },
    async getTourism() {
      try {
        const data = await getTourism()
        this.htmlData = data.data.tourismText
        this.editorContent = data.data.tourismText
        this.id = data.data.id
      } catch (e) {
        console.log(e)
      }
    },
    handle() {
      this.editor.txt.html(this.htmlData)
      this.dialog = true
    },
    async submit() {
      try {
        const data = {}
        data.id = this.id
        data.text = this.htmlData
        await tourismHandle(data)
        // this.htmlData = this.editorContent
        this.$message.success('操作成功')
        this.dialog = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
