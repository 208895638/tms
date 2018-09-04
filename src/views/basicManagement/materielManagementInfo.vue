<template>
    <div class="p15">
        <div class="clearfix">
            <el-button type="primary" @click="addComanyInfo" size="mini">新增</el-button>
            <el-button type="primary" @click="updateInfo" size="mini">修改</el-button>
            <el-button type="danger" @click="saveInfo" size="mini" v-if="saveShow">保存</el-button>
            <el-button type="primary" @click="cancelInfo" size="mini">取消</el-button>
            <el-button type="primary" @click="deleteCompany" size="mini">删除</el-button>
            <el-select v-model="printValue" size="small" placeholder="请选择" class="r">
                <el-option
                v-for="item in print"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="clearfix materielInfo">
            <el-form :inline="true" label-width="102px" :disabled = "isDisabled" :model="areaInfo" class="demo-form-inline">
                <el-form-item label="物料代码" size="mini" :required = "required" >
                    <el-input v-model.trim="areaInfo.material_code"  placeholder="请输入物料代码"></el-input>
                </el-form-item>
                <el-form-item label="物料名称" size="mini" :required = "required" >
                    <el-input v-model.trim="areaInfo.material_name"  placeholder="请输入物料名称"></el-input>
                </el-form-item>
                <el-form-item label="物料单位" size="mini" :required = "required" >
                    <el-input v-model.trim="areaInfo.material_unit"  placeholder="请输入物料单位"></el-input>
                </el-form-item>
                <el-form-item label="长(米)" size="mini" :required = "required" >
                    <el-input v-model.trim="areaInfo.material_length"  placeholder="请输入长(米)"></el-input>
                </el-form-item>
                <el-form-item label="宽(米)" size="mini" :required = "required" >
                    <el-input v-model.trim="areaInfo.material_width"  placeholder="请输入宽(米)"></el-input>
                </el-form-item>
                <el-form-item label="高(米)" size="mini" :required = "required" >
                    <el-input v-model.trim="areaInfo.material_height"  placeholder="请输入高(米)"></el-input>
                </el-form-item>
                <el-form-item label="体积(立方米)" size="mini" :required = "required" >
                    <el-input v-model.trim="areaInfo.material_volume"  placeholder="请输入体积(立方米)"></el-input>
                </el-form-item>
                <el-form-item label="重量(公斤)" size="mini" :required = "required" >
                    <el-input v-model.trim="areaInfo.material_weight"  placeholder="请输入重量(公斤)"></el-input>
                </el-form-item>
                <el-form-item label="所属客户" size="mini" :required = "required" >
                    <el-input v-model.trim="areaInfo.custormer_id"  placeholder="请输入所属客户"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import url from '@/js/common.js'
import storage from '@/js/localstorage.js'
export default {
  data() {
    return {
      required: true,
      isDisabled: true,
      printValue: '',
      saveShow: false,
      print: [
        {
          label: '打印1',
          value: '1'
        },
        {
          label: '打印2',
          value: '2'
        },
        {
          label: '打印3',
          value: '3'
        }
      ],
      areaInfo: {
        material_id: '',
        material_code: '',
        material_name: '',
        material_unit: '',
        material_length: '',
        material_width: '',
        material_height: '',
        material_volume: '',
        material_weight: '',
        custormer_id: ''
      },
      Create_Org_ID: '',
      Create_User_ID: ''

    }
  },
  methods: {
    addComanyInfo() {
      this.$message({
        message: '暂未开放!',
        type: 'warning'
      })
    },
    updateInfo() {
      this.isDisabled = false
      this.saveShow = true
    },
    saveInfo() {
      let date = new Date(), _this = this
      const o = {
        'y': date.getFullYear(), // 年份
        'M': date.getMonth() + 1, // 月份
        'd': date.getDate(), // 日
        'h': date.getHours(), // 小时
        'm': date.getMinutes(), // 分
        's': date.getSeconds(), // 秒
        'q': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      const time = o.y + '-' + o.M + '-' + o.d + ' ' + o.h + ':' + o.m + ':' + o.s
      const data1 = {
        'material_id': this.areaInfo.material_code ? this.areaInfo.material_code : '',
        'material_code': this.areaInfo.material_code,
        'material_name': this.areaInfo.material_name,
        'material_unit': this.areaInfo.material_unit,
        'material_length': this.areaInfo.material_length,
        'material_width': this.areaInfo.material_width,
        'material_height': this.areaInfo.material_height,
        'material_volume': this.areaInfo.material_volume,
        'material_weight': this.areaInfo.material_weight,
        'Create_Time': time,
        Create_Org_ID: this.Create_Org_ID,
        Create_User_ID: this.Create_User_ID,
        'Edit_User_ID': '',
        'Edit_Time': time,
        'Edit_Org_ID': ''
      }
      axios.post(url.apiUrl() + '/api/Material/MaterialUpdate', data1)
        .then(val => {
          console.log(val.data)
        })
        .catch(val => {
          _this.$message.error('数据获取错误,请过一段时间重试!')
        })
    },
    cancelInfo() {
      this.$message({
        message: '暂未开放!',
        type: 'warning'
      })
    },
    deleteCompany() {
      this.$message({
        message: '暂未开放!',
        type: 'warning'
      })
    }
  },
  created() {
    console.log(this.$route.query)
    const info = this.$route.query
    const loginInfo = JSON.parse(storage.getStorage('currentUser'))
    this.Create_Org_ID = loginInfo.orgId
    this.Create_User_ID = loginInfo.userId
    if (!info.material_id) {
      const _this = this
      this.$message.error('请从物料管理中进入!')
      setTimeout(() => {
        _this.$router.push({ path: '/materielManagement' })
      }, 1000)
    } else {
      this.areaInfo.material_id = info.material_id
      this.areaInfo.material_code = info.material_code
      this.areaInfo.material_name = info.material_name
      this.areaInfo.material_unit = info.material_unit
      this.areaInfo.material_length = info.material_length
      this.areaInfo.material_width = info.material_width
      this.areaInfo.material_height = info.material_height
      this.areaInfo.material_volume = info.material_volume
      this.areaInfo.material_weight = info.material_weight
      this.areaInfo.custormer_id = info.custormer_id
    }
  }
}
</script>
<style lang="scss" scoped>
.p15{
    padding: 15px;
}
.l{
    float: left;
}
.r{
    float:right;
}
.materielInfo{
    padding: 20px 0;
}
 
.clearfix:before, .clearfix:after { content: " "; display: block; height: 0; overflow: hidden; }  
.clearfix:after { clear: both; }  
.clearfix { zoom: 1; } 
</style>


