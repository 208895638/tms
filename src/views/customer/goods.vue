<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
     <el-row>
     <el-col :span="15" :offset="3">
    <div class="tit">
      提货单号：1111
      上海————>温州
    </div>
    <h1>运单信息</h1>
    <el-row>
    <el-col :span="12" >
      <el-input class="input-group"  disabled value="xxxxxxxxx">
            <label class="radio-label" slot="prepend" >合同编号: </label>
      </el-input>
    </el-col>
    <el-col :span="12">
  
      <el-date-picker
      type="date"
      disabled
      placeholder="选择日期">
     
    </el-date-picker>
    </el-col>
    </el-row>
<el-row>
  <el-col :span="8">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >发货单位: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >发货人: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >发货人电话: </label>
    </el-input>
  </el-col>
</el-row>
<el-row>
  <el-col :span="8">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >收货单位: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >收货人: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >收货人电话: </label>
    </el-input>
  </el-col>
  </el-row>
<el-row>
  <el-col :span="12">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >发货地址: </label>
    </el-input>
  </el-col>
  <el-col :span="12">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >收货地址: </label>
    </el-input>
  </el-col>
</el-row>
<el-row>
  <el-col :span="8">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >件数: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >重量(公斤): </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >体积(立方): </label>
    </el-input>
  </el-col>
  </el-row>
  <el-row>
  <el-col :span="8">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >现付: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >到付: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >欠付: </label>
    </el-input>
  </el-col>
  </el-row><el-row>
  <el-col :span="8">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >回付: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >发货月结: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >收货月结: </label>
    </el-input>
  </el-col>
  </el-row><el-row>
  <el-col :span="8">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >货到打卡: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >货款扣: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >交接方式: </label>
    </el-input>
  </el-col>
  </el-row>
  <el-row>
  <el-col :span="24"><el-input class="input-group"  disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >备注: </label>
    </el-input></el-col>
</el-row>
 
    <br><br>
    <h1>自提信息：</h1>
    <el-row>
  <el-col :span="12">
    <el-input class="input-group"   value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >提货日期: </label>
    </el-input>
  </el-col>
  <el-col :span="12">
    <el-input class="input-group"   value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >提货单位: </label>
    </el-input>
  </el-col>
</el-row>
<el-row>
  <el-col :span="12">
    <el-input class="input-group"    value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >提货人: </label>
    </el-input>
  </el-col>
  <el-col :span="12">
    <el-input class="input-group"    value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >身份证号: </label>
    </el-input>
  </el-col>
</el-row>
<el-row>
  <el-col :span="12">
    <el-input class="input-group"   value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >代理人: </label>
    </el-input>
  </el-col>
  <el-col :span="12">
    <el-input class="input-group"     value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >身份证号: </label>
    </el-input>
  </el-col>
</el-row>
  <el-row>
  <el-col :span="24"><el-input class="input-group"    value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >提货说明: </label>
    </el-input></el-col>
</el-row>
<el-row class="foot">
  <el-button  @click="print">打印提货单</el-button>
</el-row>
  </el-col>

 </el-row>
  </div>
</template>

<script>
import { parseTime } from '@/utils'

export default {
  name: 'lists',
  data() {
    return {
      order: {
        id: '',
        order_no: '',
        from: '上海',
        to: '温州'

      },
      total: 0,
      PageSize: [1, 2, 3, 5],
      currentPage2: 1,
      datapage: {},
      list: {},
      listLoading: false, // 列表loading
      downloadLoading: false,
      filename: '',
      autoWidth: true
    }
  },
  created() {

  },
  methods: {
    GoEditPage(row, event) {
      return
    },
    handleSizeChange(val) {
      const arr = new Array()
      this.list.forEach((item, index) => {
        if (val > index) {
          arr.push(item)
        }
      })
      this.currentPage2 = 1
      this.datapage = arr
    },
    handleCurrentChange(val) {
      const arr = new Array()
      this.list.forEach((item, index) => {
        if (val == index + 1) {
          arr.push(item)
        }
      })
      this.datapage = arr
    },
    print() {
      this.$confirm('请先完成付款，再打印提货单，谢谢！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {

      })
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style>
.tableWraper{
    width: 100%;
    overflow-x: hidden;
}
.table{
    height: 100%;
}
 .cell{
     white-space: nowrap;
 }
 .d-flex{
     display: -webkit-box !important;
    display: -ms-flexbox !important;
    display: flex !important;
 }
 .justify-content-center {
    -webkit-box-pack: center !important;
    -ms-flex-pack: center !important;
    justify-content: center !important;
}
.cell{
     white-space: nowrap!important;
 }
 .el-scrollbar__view{
     height: 100%;
 }

.el-footer{width: 100%;position: absolute;;margin-bottom: 0px;bottom: 0px;text-align:center;}
.el-input-group__prepend{
  background-color: #FFF;border:none;padding: 0px 5px 0px 5px;
}
.radio-label {
  font-size: 8px;
  color: #606266;
  padding: 0 5px 0 5px;
}

.el-input--medium .el-input__icon{display: none}
.el-input--medium .el-input__inner{
  padding: 2px 5px 2px 5px;height: 25px;line-height: 25px;border-radius: 0px;border:1px solid #ccc;
}
.foot{ text-align: center}
.el-row{ margin:10px 5px;}
</style>

