<template>
  <div>
    <div v-for="(item, index) in keyGroup" class="flex align-center mt20">
      <div class="flex-1 mr10">
        <el-input v-model="keyGroup[index]" placeholder="请输入标题" />
      </div>
      <div class="flex-1">
        <el-input v-model="valueGroup[index]" placeholder="请输入内容" type="textarea" />
      </div>
    </div>
    <div class="mt10">
      <el-button type="primary" @click="addColumn">新增一行</el-button>
      <el-button type="warning" :disabled="!keyGroup.length" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import {
  submitTownInfo
} from '../../../api/source'

export default {
  name: 'TownInfo',
  props: {
    keyGroup: Array,
    valueGroup: Array,
    itemId: String
  },
  methods: {
    addColumn() {
      this.keyGroup.push('')
      this.valueGroup.push('')
    },
    async submit() {
      const obj = {}
      this.keyGroup.forEach((item, index) => {
        obj[item] = this.valueGroup[index]
      })
      try {
        await submitTownInfo({
          itemId: this.itemId,
          townshipMap: obj
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

<style scoped>

</style>
