<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="ArrivalStock">
    <el-row class="ArrivalStock-header" style=""> 
        <router-link to="./shelves"><el-button style='margin:0 0 5px 0px;' size="mini">上架</el-button></router-link>
        <router-link to="./shift"><el-button style='margin:0 0 5px 10px;' size="mini">盘点</el-button></router-link>
        <router-link to="./inventory"><el-button style='margin:0 0 5px 10px;' size="mini">移位</el-button></router-link>
        <el-form :inline="true" :model="formFilter" class="form-wrapper" size="mini">
            <el-form-item label="运单号">
                <el-input v-model="formFilter.contractId" style="width: 100px"></el-input>
            </el-form-item>
            <!-- <el-form-item label="储位">
                <el-select v-model="formFilter.carStatus" placeholder="请选择" style="width: 120px">
                    <el-option label="全部" value="all"></el-option>
                    <el-option label="已调度" value="dispatched"></el-option>
                    <el-option label="已装车" value="loaded"></el-option>
                    <el-option label="已发车" value="started"></el-option>
                    <el-option label="已到货" value="arrivaled"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="储位" size="mini">
                <el-select v-model="formFilter.carStatus" filterable placeholder="请选择">
                    <el-option
                    v-for="item in carStatusList"
                    :key="item.value"
                    :label="item.w.warehouselocation_name"
                    :value="item.w.warehouselocation_code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开单日期">
                <el-col :span="11">
                  <el-date-picker
                        v-model="formFilter.startDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 120px"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    <!-- <el-date-picker v-model="formFilter.startDate" type="date"  style="width: 120px"></el-date-picker> -->
                </el-col>
                <el-col :span="2" class="ac-line" style="text-align: center">到</el-col>
                <el-col :span="11">
                  <el-date-picker
                        v-model="formFilter.endDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 120px"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    <!-- <el-date-picker v-model="formFilter.endDate" type="date" style="width: 130px"></el-date-picker> -->
                </el-col>
            </el-form-item>
            <el-form-item label="发货网点" size="mini">
                <el-select v-model="formFilter.site" multiple filterable placeholder="请选择">
                    <el-option
                    v-for="item in customerList" 
                    :key="item.Org_id"
                    :label="item.Org_name"
                    :value="item.Org_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" type="primary" @click="init">查询</el-button>
            </el-form-item>
        </el-form>
    </el-row>
    
    <el-main>
            <!-- 表单筛选栏 -->
            
            <!-- 表格 -->
            <el-table
                ref="multipleTable"
                :data="tableData"
                size="small"
                border
                show-summary
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="60">
                </el-table-column>
                <el-table-column
                    type="index"
                    width="60">
                </el-table-column>
                <el-table-column
                    sortable
                    v-for="item in tableColumns"
                    v-if="choosenColumns.indexOf(item.label) > -1"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width">
                    <template slot-scope="scope">
                        <div v-if="scope.$index === 0 && openColumnSearch">
                            <el-date-picker v-if="item.type==='date'" v-model="columnSearch[scope.column.property]" size="mini" type="date" style="width:100%;" @change="handleColumnSearch"></el-date-picker>
                            <el-select v-else-if="item.type==='select'" v-model="columnSearch[scope.column.property]" size="mini" placeholder="请选择" @change="handleColumnSearch">
                                <el-option
                                v-for="s in item.selectOptions"
                                :key="s.value"
                                :label="s.label"
                                :value="s.value">
                                </el-option>
                            </el-select>
                             <el-input v-else="item.type==='input'" v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch"></el-input>
                        </div>
                        <span v-else>{{ scope.row[scope.column.property] }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <!-- <el-footer class="ArrivalStock-footer" style="height: 30px">
            <el-col :span="24">
                <el-button type="text" size="mini" @click="dialogChooseColumnVisible = true">列选择</el-button>
                <el-button type="text" size="mini" @click="toggleColumnSearch">列搜索</el-button>
                <el-button type="text" size="mini">导出</el-button>
            </el-col>
        </el-footer> -->
        <el-footer class="ac-footer  d-flex justify-content-center">
            <span>
                <el-button type="text" size="mini" @click="dialogChooseColumnVisible = true">列选择</el-button>
                <el-button type="text" size="mini" @click="toggleColumnSearch">列搜索</el-button>
                <el-button type="text" size="mini">导出</el-button>
            </span>
            <el-pagination
                background
                @size-change="pageSizeChange"
                @current-change="currentSizeChange"
                :current-page.sync="currentPage"
                :page-sizes="[10, 20, 50, 100 , materielSize > 1000 ? materielSize : 1000]"
                :page-size="pageSize"
                class="l"
                layout="total , sizes, prev, pager, next"
                :total = "materielSize"
                >
            </el-pagination>
        </el-footer>
        <el-dialog :visible.sync="dialogChooseColumnVisible" title="列选择">
            <el-checkbox-group v-model="choosenColumns" class="ac-checkbox-group flex-cloumn">
                <el-checkbox v-for="column in tableColumns" :label="column.label" :key="column.label">{{column.label}}</el-checkbox>
            </el-checkbox-group>
        </el-dialog>
    
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import axios from 'axios'
import url from '@/js/common.js'
import storage from '@/js/localstorage.js'
const tableColumns = [
  {
    label: '运单号',
    prop: 'Manifest_Code'
  },
  {
    label: '托运商单号',
    prop: 'Shipper_Code'
  },
  {
    label: '开单日期',
    prop: 'Shipping_Date',
    width: 200,
    type: 'date'
  },

  {
    label: '发站',
    prop: 'Departure_City'
  },
  {
    label: '到站',
    prop: 'Arrival_City'
  },
  {
    label: '发货网点',
    prop: 'departure_org_id'
  },
  {
    label: '目的网点',
    prop: 'arrival_org_id'
  },
  {
    label: '品名',
    prop: 'goods_name'
  },
  {
    label: '件数',
    prop: 'goods_piece'
  },
  {
    label: '重量(公斤)',
    prop: 'goods_weight'
  },
  {
    label: '体积(立方)',
    prop: 'goods_volume'
  },
  {
    label: '储位',
    prop: 'warehouselocation_name',
    type: 'select',
    selectOptions: [
      {
        label: '已发出',
        value: '已发出'
      },
      {
        label: '未发车',
        value: '未发车'
      }
    ]
  }
]
const mockData = [{
  index: '1',
  contractId: '18004001',
  startDate: '2018-7-19',
  prop1: '已发出',
  prop2: 'C点',
  prop3: 'A点',
  prop4: '沪A123456',
  prop5: '19250987908',
  prop6: '李四',
  prop7: '200',
  prop8: '20',
  prop9: '40'
}]
export default {
  data() {
    return {
      printOption: '',
      currentTab: 0,
      formFilter: {
        contractId: '',
        carStatus: '',
        startDate: '',
        endDate: '',
        site: ''
      },
      tableData: mockData.slice(),
      // 列选择dialog开关
      dialogChooseColumnVisible: false,
      // 列表表头数据
      tableColumns: tableColumns,
      choosenColumns: [...tableColumns.map(column => column.label)],
      openColumnSearch: false,
      columnSearch: {},
      customerList: [], //  公司网点
      carStatusList: [], // 储位列表数据
      pageSize: 10, // 每页展示的大小
      currentPage: 1, // 当前第几页
      materielSize: 1, // 总数
      Create_User_ID: '',
      Create_User_ID: ''
    }
  },
  mounted() {
    const loginInfo = JSON.parse(storage.getStorage('currentUser'))
    this.Create_Org_ID = loginInfo.orgId
    this.Create_User_ID = loginInfo.userId

    this.getCompanyList() // 获取发货网点
    this.getCarStatusList() // 获取储位列表
    this.init() // 初始化获取数据
  },
  methods: {
    pageSizeChange(val) { //   选择每页展示的页数大小
      console.log(val)
      this.pageSize = val
      this.init()
    },
    currentSizeChange(val) { // 当前选择第几页
      this.currentPage = val
      this.init()
    },
    handleChangeTab(tabIndex) {
      this.currentTab = tabIndex
      // do something
    },
    handleClickSearch() {
      console.log(this.formFilter)
    },
    getCompanyList() { // 获取发货网点
      const _this = this
      axios.post(url.apiUrl() + '/api/MetadataOrg/GeOrgs')
        .then(function(val) {
          _this.customerList = val.data.data
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    getCarStatusList() { // 获取储位数据
      let data1 = {
          Page: 1,
          Rows: 100
        }, _this = this
      axios.post(url.apiUrl() + '/api/WarehouseLocation/WarehouseLocationList', data1)
        .then(function(val) {
          if (val.data.error == '') {
            _this.carStatusList = val.data.data.rows
            tableColumns[tableColumns.length - 1].selectOptions = val.data.data.rows
            console.log(tableColumns[tableColumns.length - 1].selectOptions)
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error('获取数据失败,请稍后再试14!')
        })
    },
    init() { // 获取数据
      let data1 = {
          'Manifest_Code': this.formFilter.contractId,
          'Departure_Warehouselocation_ID': this.formFilter.carStatus,
          'Shipping_DateStar': this.formFilter.startDate,
          'Shipping_DateEnd': this.formFilter.endDate,
          'Page': this.currentPage,
          'Rows': this.pageSize,
          'org_id': this.Create_Org_ID,
          'type': 2
        }, _this = this
      let loading
      axios.interceptors.request.use(config => {
        loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        return config
      })
      axios.interceptors.response.use(config => {
        loading.close()
        return config
      })
      axios.post(url.apiUrl() + '/api/Stock/StockList', data1)
        .then(function(val) {
          if (val.data.error == '') {
            const msg = val.data.data.rows

            const bb = msg.map(ele => {
              const d = JSON.stringify(ele)
              const obj = JSON.parse(d)
              const a = obj.s
              const b = obj.m
              delete obj.m
              delete obj.s

              for (var i in a) {
                obj[i] = a[i]
              }
              for (var j in b) {
                obj[j] = b[j]
              }
              return obj
            })
            console.info(bb.length)
            _this.tableData = bb
            _this.materielSize = val.data.data.total
            // console.log(JSON.stringify(val.data.data.rows));
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error('获取数据失败,请稍后再试11!')
        })
    },
    // 点击列查询按钮
    toggleColumnSearch() {
      if (this.openColumnSearch) {
        if (this.tableData[0].isColumnSearch) {
          this.tableData.shift()
        }
        this.openColumnSearch = false
        this.columnSearch = {}
      } else {
        this.openColumnSearch = true
        if (!this.tableData[0].isColumnSearch) {
          this.tableData.unshift({
            isColumnSearch: true
          })
        }
      }
    },
    // 进行列查询
    handleColumnSearch() {
      const values = Object.values(this.columnSearch)
      const isEmpty = values.every(value => {
        return typeof value === undefined || value === ''
      }) || values.length === 0

      if (isEmpty) {
        this.columnSearch = {}
        const newData = mockData.slice()
        newData.unshift({
          isColumnSearch: true
        })
        this.tableData = newData
      }

      this.tableData = this.tableData.filter(item => {
        if (item.isColumnSearch) {
          return true
        }
        for (const key in this.columnSearch) {
          if (this.columnSearch[key] === '') {
            // do nothing
          } else if (this.columnSearch[key] instanceof Date) {
            const date = new Date(this.columnSearch[key])
            const formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            if (item[key] !== formatDate) {
              return false
            }
          } else if (JSON.stringify(item[key]).indexOf(this.columnSearch[key]) <= -1) {
            return false
          }
        }
        return true
      })
    }
  }
}
</script>

<style>
.cell{white-space: nowrap!important;}
.ArrivalStock .ArrivalStock-header{padding: 8px 15px 8px 15px;}
.ArrivalStock .ArrivalStock-footer{text-align: center;}
.ArrivalStock .el-main{padding: 5px 15px 5px 15px}
 .el-table__body-wrapper{
    -webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:100%;overflow-y: auto;
}
.aa{
    display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;
}
</style>
<style lang="scss" scoped>
.el-form-item {
    margin-bottom: 0px!important;
}
.el-main{
  display: flex;
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
.ac-footer{
    height:auto!important;
}
.el-table{
  display: flex;
  flex-direction: column;
}
.el-table__body-wrapper{
  flex: 1;
}
.ArrivalStock{
    display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;
    .main1{
        -webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:100%;
        .aa{
            height:100%;
           
        }
    }
}
</style>

