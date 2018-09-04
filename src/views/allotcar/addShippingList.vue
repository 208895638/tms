<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
  <el-container>
    <el-main>
      <!-- ------------------------------------------ -->
      <el-table :data="list" class="tableWraper" sortable  v-loading="listLoading" element-loading-text="拼命加载中" @row-dblclick="GoEditPage" border fit highlight-current-row >
      <el-table-column sortable prop="$index" align="center" width="50" label='序号'>
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="numbers" label="运单号" width="80">
        <template slot-scope="scope" >
          {{scope.row.numbers}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="tuoyun_number" sortable label="到站" align="center" width="100">
        <template slot-scope="scope">
          {{scope.row.tuoyun_number}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="startdate" sortable label="目的网点" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.startdate}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="numbers" align="center" label="发货单位" width="100">
        <template slot-scope="scope">
          {{scope.row.state}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="numbers" label="品名" min-width="50" align="center">
        <template slot-scope="scope">
          {{scope.row.send_station}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="numbers" label="件数" width="50" align="center">
        <template slot-scope="scope">
          {{scope.row.arrive_station}}
        </template>
      </el-table-column>
    </el-table>
    <!-- ------------------------------------------ -->
    </el-main>
    

    <el-main>
      <!-- ------------------------------------------ -->
      <el-table :data="list" class="tableWraper" sortable  v-loading="listLoading" element-loading-text="拼命加载中" @row-dblclick="GoEditPage" border fit highlight-current-row >
      <el-table-column sortable prop="$index" align="center" width="150" label='序号'>
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="numbers" label="卸货网点" width="150">
        <template slot-scope="scope" >
          {{scope.row.numbers}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="tuoyun_number" sortable label="单数" align="center" width="100">
        <template slot-scope="scope">
          {{scope.row.tuoyun_number}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="startdate" sortable label="操作" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.startdate}}
        </template>
      </el-table-column>
    </el-table>
    <!-- ------------------------------------------ -->
    </el-main>


  </el-container>
  </div>
</template>

<script>
import { parseTime } from '@/utils'

export default {
  name: 'lists',
  data() {
    return {
      transportState_value:'1',
      transportState:[{
          value: '1',
          label: '已揽收'
        }, {
          value: '2',
          label: '三方发车'
        }],
      total:0,
      list: [{
            id:'1',
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
            consignor_phone: 'Qc1',
              xiehuo:[{
              arrive_dot: 'Qc1111',
              type: 'Qc111111',
              company: 'Qc1111',
              consignor: 'Qc111',
              consignor_phone: 'Qc1',
            }],
        }, {
            id:'2',
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
            consignor_phone: 'Qc1',
        }, {
            id:'3',
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
            consignor_phone: 'Qc1',
        }],
      listLoading: false,//列表loading
      downloadLoading: false,
      filename: '',
      autoWidth: true,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    GoEditPage(row, event){
      return;
    },
    fetchData() {
      this.total = this.list.length;
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

.el-main{width:50%;padding: 20px;background-color: #eee;border-right:1px solid #ccc;}

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
</style>

