<template>
  <div>
    <div v-for="(item, index) in typeGroup" class="bottom-line mt20">
      <div class="flex mb20">
        <div class="label-80 mr10">类目标题</div>
        <el-input v-model="typeGroup[index]" placeholder="请输入类目名" />
      </div>
      <div v-for="(subitem, subindex) in typeValue[index][0]" class="mt10 flex mb10">
        <div class="label-80 mr10" />
        <div class="flex">
          <div class="flex-1 pr20">
            <el-input v-model="typeValue[index][0][subindex]" placeholder="请输入标题" />
          </div>
          <div class="flex-1">
            <el-input v-model="typeValue[index][1][subindex]" placeholder="请输入内容" type="textarea" />
          </div>
        </div>
      </div>
      <div class="flex mb20">
        <div class="label-80 mr10" />
        <div>
          <el-button type="primary" size="mini" @click="addColumn(index)">新增一行</el-button>
        </div>

      </div>
    </div>

    <div class="mt10">
      <el-button type="warning" @click="addType">新增类目</el-button>
      <el-button type="warning" :disabled="!typeGroup.length" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import {
  subtmitDeepSource
} from '../../../api/source'

export default {
  name: 'DeepSource',
  props: {
    itemId: String,
    typeGroup: Array,
    typeValue: Array // [ [[], []], [[], []] ]
  },
  methods: {
    addColumn(index) {
      this.typeValue[index][0].push('')
      this.typeValue[index][1].push('')
      console.log(this.typeGroup, this.typeValue)
    },
    addType() {
      this.typeGroup.push('')
      this.typeValue.push([[], []])
    },
    async submit() {
      const obj = {}
      // obj.itemId = this.itemId
      this.typeGroup.forEach((item, index) => {
        const valueGroup = []
        this.typeValue[index][0].forEach((subitem, subindex) => {
          valueGroup.push({
            key: subitem,
            value: this.typeValue[index][1][subindex]
          })
        })
        obj[item] = valueGroup
      })
      try {
        await subtmitDeepSource({
          traceabilityInfo: obj,
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

<style scoped>

</style>
