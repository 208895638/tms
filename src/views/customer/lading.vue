<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
     <el-button class="page-btn-group" size="mini" @click="editInsert">新增</el-button>
    <el-button class="page-btn-group" size="mini" @click="editEave">保存</el-button>
   
    <el-button class="page-btn-group" size="mini" v-show="isEdit">取消</el-button>
    <el-button class="page-btn-group" size="mini">自提改送货</el-button>
    <el-button class="page-btn-group" size="mini" @click="editUpdate">修改</el-button>
    <el-button class="page-btn-group" size="mini" @click="editDelete">删除</el-button>
    <el-select style="width: 100px; float:right" v-model="printOption" placeholder="打印">
                       
                        <el-option label="打印" value="all"></el-option>
                        <el-option label="打印提货单" value="all"></el-option>
                    </el-select>
    <el-button class="page-btn-group" size="mini">上传附件</el-button>
  
    <br>
    <hr>
    
     <el-row :gutter="20">
  <el-col :span="12">
    <div class="tit">
      提货单号：1111
      上海————>温州
    </div>
    <h1>运单信息</h1>
    <el-row>
    <el-col :span="12" >
      <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
            <label class="radio-label" slot="prepend" >合同编号: </label>
      </el-input>
    </el-col>
    <el-col :span="12">
  
      <el-date-picker
      v-model="value1"
      type="date"
      disabled
      placeholder="选择日期">
     
    </el-date-picker>
    </el-col>
    </el-row>
<el-row>
  <el-col :span="8">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >发货单位: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >发货人: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >发货人电话: </label>
    </el-input>
  </el-col>
</el-row>
<el-row>
  <el-col :span="8">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >收货单位: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >收货人: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >收货人电话: </label>
    </el-input>
  </el-col>
  </el-row>
<el-row>
  <el-col :span="12">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >发货地址: </label>
    </el-input>
  </el-col>
  <el-col :span="12">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >收货地址: </label>
    </el-input>
  </el-col>
</el-row>
<el-row>
  <el-col :span="8">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >件数: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >重量(公斤): </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >体积(立方): </label>
    </el-input>
  </el-col>
  </el-row>
  <el-row>
  <el-col :span="8">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >现付: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >到付: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >欠付: </label>
    </el-input>
  </el-col>
  </el-row><el-row>
  <el-col :span="8">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >回付: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >发货月结: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >收货月结: </label>
    </el-input>
  </el-col>
  </el-row><el-row>
  <el-col :span="8">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >货到打卡: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >货款扣: </label>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >交接方式: </label>
    </el-input>
  </el-col>
  </el-row>
  <el-row>
  <el-col :span="24"><el-input class="input-group" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
          <label class="radio-label" slot="prepend" >备注: </label>
    </el-input></el-col>
</el-row>
  </el-col>
  <el-col :span="12">
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
      transportState_value: '1',
      transportState: [{
        value: '1',
        label: '已揽收'
      }, {
        value: '2',
        label: '三方发车'
      }],
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
    this.fetchData()
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
    fetchData() {
      this.list = [{
        id: '1',
        numbers: '1',
        tuoyun_number: '9',
        startdate: 'Qc111',
        state: 'Qc11111',
        send_station: 'Qc11',
        arrive_station: 'Qc11',
        send_dot: 'Qc11111',
        arrive_dot: 'Qc1111',
        type: 'Qc111111',
        company: 'Qc1111',
        consignor: 'Qc111',
        consignor_phone: 'Qc1'
      }, {
        id: '2',
        numbers: '2',
        tuoyun_number: '8',
        startdate: 'Qc111',
        state: 'Qc11111',
        send_station: 'Qc11',
        arrive_station: 'Qc11',
        send_dot: 'Qc11111',
        arrive_dot: 'Qc1111',
        type: 'Qc111111',
        company: 'Qc1111',
        consignor: 'Qc111',
        consignor_phone: 'Qc1'
      }, {
        id: '3',
        numbers: '3',
        tuoyun_number: '7',
        startdate: 'Qc111',
        state: 'Qc11111',
        send_station: 'Qc11',
        arrive_station: 'Qc11',
        send_dot: 'Qc11111',
        arrive_dot: 'Qc1111',
        type: 'Qc111111',
        company: 'Qc1111',
        consignor: 'Qc111',
        consignor_phone: 'Qc1'
      }, {
        id: '4',
        numbers: '4',
        tuoyun_number: '8',
        startdate: 'Qc111',
        state: 'Qc11111',
        send_station: 'Qc11',
        arrive_station: 'Qc11',
        send_dot: 'Qc11111',
        arrive_dot: 'Qc1111',
        type: 'Qc111111',
        company: 'Qc1111',
        consignor: 'Qc111',
        consignor_phone: 'Qc1'
      }, {
        id: '5',
        numbers: '5',
        tuoyun_number: '7',
        startdate: 'Qc111',
        state: 'Qc11111',
        send_station: 'Qc11',
        arrive_station: 'Qc11',
        send_dot: 'Qc11111',
        arrive_dot: 'Qc1111',
        type: 'Qc111111',
        company: 'Qc1111',
        consignor: 'Qc111',
        consignor_phone: 'Qc1'
      }]
      this.total = this.list.length
      this.datapage = this.list
      this.PageSize = [1, 2, 3, 4, this.total]
      this.handleSizeChange(this.currentPage2)
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
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
.el-row{ margin:10px 5px;}
</style>

