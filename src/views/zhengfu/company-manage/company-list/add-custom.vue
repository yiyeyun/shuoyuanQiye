<template>
  <div>
    <div class="flex align-center">
      <div class="label-80 mr10">企业名称</div>
      <el-input v-model="form.groupName" />
    </div>
    <div class="flex align-center mt20">
      <div class="label-80 mr10">联系人</div>
      <el-input v-model="form.contactPerson" />
    </div>
    <div class="flex align-center mt20">
      <div class="label-80 mr10">联系电话</div>
      <el-input v-model="form.tel" />
    </div>
    <div class="flex align-center mt20">
      <div class="label-80 mr10" />
      <el-button type="warning" size="mini" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { createCompany } from '../../../../api/zhengfu/company'
import { validateNotNull } from '../../../../validate'

export default {
  name: 'AddCustom',
  data() {
    return {
      form: {
        groupName: '',
        groupType: '1',
        contactPerson: '',
        tel: ''
      }
    }
  },
  methods: {
    async submit() {
      console.log(this.form)
      try {
        await validateNotNull(this.form.groupName, '组织名称不能为空')
        await validateNotNull(this.form.contactPerson, '联系人不能为空')
        await createCompany(this.form)
        this.$message.success('添加成功')
        this.form.groupName = ''
        this.form.contactPerson = ''
        this.form.tel = ''
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
