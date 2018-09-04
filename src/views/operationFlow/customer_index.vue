<template>
    <el-container class="Customer">
      <el-header class="Customer-header">
      <el-button style='margin:0 0 5px 0px;' size="mini" >刷新</el-button> 
      <router-link :to="{ name: 'customer/goods', params: { id: 123 }}">
        <el-button style='margin:0 0 5px 10px;' size="mini" >自助提货打印单</el-button>
      </router-link>
      <router-link :to="{ name: 'customer/extract', params: { id: 123 }}">
        <el-button style='margin:0 0 5px 10px;' size="mini" >自助提货</el-button>
      </router-link>
      <el-form size="small" :inline="true" :model="formFilter"  class="form-wrapper">
          <el-form-item label="运单号">
              <el-input  v-model="formFilter.order_no" ></el-input>
          </el-form-item>
          <el-form-item label="运单状态">
                <el-select  clearable v-model="formFilter.state"  placeholder="请选择" >
                <el-option 
                    v-for="item in transportState" 
                    :key="item.value" 
                    :label="item.Departure_State_Name" 
                    :value="item.Departure_State_Id"></el-option>
                </el-select>
            </el-form-item>
          <el-form-item label="运单日期">
            <el-date-picker
                        v-model="formFilter.startdate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 120px"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
          <!-- <el-date-picker style="width:120px;height:25px"  v-model="formFilter.startdate" tyle="date"></el-date-picker> -->
          </el-form-item>
          <el-form-item label="到">
            <el-date-picker
                        v-model="formFilter.enddate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 120px"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
          <!-- <el-date-picker style="width:120px;height:25px"  v-model="formFilter.enddate" tyle="date"></el-date-picker> -->
          </el-form-item>
          <!-- <el-form-item label="网点">
              <el-input  v-model="formFilter.adds" ></el-input>
          </el-form-item> -->
          <el-form-item label="发车网点">
                
              <el-select clearable v-model="formFilter.adds" filterable placeholder="请选择">
                <el-option
                    v-for="item in customerList" 
                    :key="item.value"
                    :label="item.Org_name"
                    :value="item.Org_id">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="收货人">
              <el-input  v-model="formFilter.name" ></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="init">查询</el-button>
          </el-form-item>
      </el-form>
    </el-header>
        <el-main class="">
            <!-- 表单筛选栏 -->
            
            <!-- 表格 -->
            <el-table
                ref="multipleTable"
                :data="tableData"
                size="small"
                border
                show-summary
                style="width: 100%"
                @row-dblclick="goEextract"
                >
                <el-table-column
                    type="selection"
                    width="60">
                </el-table-column>
                <el-table-column
                    label="序号"
                    type="index">
                </el-table-column>
                <el-table-column
                    v-for="item in tableColumns"
                    v-if="choosenColumns.indexOf(item.label) > -1"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width">
                    <template slot-scope="scope">
                        <div v-if="scope.$index === 0 && openColumnSearch">
                            <el-date-picker v-if="item.type==='date'" v-model="columnSearch[scope.column.property]" size="mini" type="date" style="width:100%;" @change="handleColumnSearch"></el-date-picker>
                            <el-select v-else-if="item.type==='select'" v-model="columnSearch[scope.column.property]" :clearable="true" size="mini" placeholder="请选择" @change="handleColumnSearch">
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
        <!-- <el-footer style="height: 30px" class="Customer-footer">
            <el-col :span="24">
                <el-button type="text" size="mini" @click="dialogChooseColumnVisible = true">列选择</el-button>
                <el-button type="text" size="mini" @click="toggleColumnSearch">列搜索</el-button>
                <el-button type="text" size="mini">导出</el-button>
            </el-col>
        </el-footer> -->
        <el-dialog :visible.sync="dialogChooseColumnVisible" title="列选择">
            <el-checkbox-group v-model="choosenColumns" class="ac-checkbox-group flex-cloumn">
                <el-checkbox v-for="column in tableColumns" :label="column.label" :key="column.label">{{column.label}}</el-checkbox>
            </el-checkbox-group>
        </el-dialog>
    </el-container>
</template>

<script>
const tableColumns = [
  {
    label: '运单号',
    prop: 'manifest_code'
  },
  {
    label: '托运商单号',
    prop: 'shipper_code'
  },
  {
    label: '开单日期',
    prop: 'shipping_date',
    width: 200,
    type: 'date'
  },
  {
    label: '运单状态',
    prop: 'manifest_state_name',
    type: 'select',
    selectOptions: [
      {
        label: '已调度',
        value: '已调度'
      },
      {
        label: '已装车',
        value: '已装车'
      },
      {
        label: '已发车',
        value: '已发车'
      },
      {
        label: '已到货',
        value: '已到货'
      }
    ]
  },
  {
    label: '发站',
    prop: 'departure_city'
  },
  {
    label: '到站',
    prop: 'arrival_city'
  },
  {
    label: '发货网点',
    prop: 'departure_org_name'
  },
  {
    label: '目的网点',
    prop: 'arrival_org_name'
  },
  {
    label: '运输方式',
    prop: 'transportation_type_name'
  },
  {
    label: '发货单位',
    prop: 'consigner_unit'
  },
  {
    label: '发货人',
    prop: 'consigner_contact'
  },
  {
    label: '发货电话',
    prop: 'consigner_phone'
  }
]
const mockData = [{
  index: '1',
  contractId: '18004001',
  startDate: '2018-7-29',
  carStatus: '已调度',
  startSite: 'C点',
  prop3: 'A点',
  prop4: '沪A123456',
  prop5: '19250987908',
  prop6: '李四',
  prop7: '200',
  prop8: '20',
  prop9: '40'
}]

function date2String(date) {
  const _date = new Date(date)
  return `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`
}

function string2Date(date) {
  const _date = date.split('-')

  return new Date(parseInt(_date[0], 10), parseInt(_date[1], 10) - 1, parseInt(_date[2], 10))
}

function compareDate(a, b) {
  if (typeof a === 'string') {
    a = string2Date(a)
  }

  if (typeof b === 'string') {
    b = string2Date(b)
  }
  return (a.getTime() - b.getTime())
}

function isNotEmpty(v) {
  return typeof v !== 'undefined' && v !== null && v !== ''
}
import axios from 'axios'
import url from '@/js/common.js'
import storage from '@/js/localstorage.js'
export default {
  data() {
    return {
      printOption: '',
      currentTab: 0,
      formFilter: {
        contractId: '',
        carStatus: '',
        startdate: '',
        enddate: '',
        startSite: '',
        state:"",
        order_no:"",
        adds:"",
        name:"",
      },
      tableData: mockData.slice(),
      cachedDate: mockData.slice(),
      // 列选择dialog开关
      dialogChooseColumnVisible: false,
      // 列表表头数据
      tableColumns: tableColumns,
      choosenColumns: [...tableColumns.map(column => column.label)],
      openColumnSearch: false,
      columnSearch: {},
      pageSize: 10,
      currentPage: 1,
      materielSize: 1,
      pageSize: 10,
      currentPage: 1,
      materielSize: 1,
      customerList: [

      ],
      transportState: '', // 运单状态
      Create_Org_ID: '',
      Create_User_ID: ''
    }
  },
  mounted() {
    const boxHeight = document.querySelector('body').clientHeight
    const buttonBoxHeight = document.querySelector('.Customer-header').clientHeight
    const areaBoxHeight = boxHeight - 84
    document.querySelector('.Customer').style.height = areaBoxHeight + 'px'
    document.querySelector('.el-table__body-wrapper').style.height = areaBoxHeight - 30 - 40 - 40 - buttonBoxHeight + 'px'
    document.querySelector('.el-table__body-wrapper').style.overflowY = 'auto';
    const loginInfo = JSON.parse(storage.getStorage('currentUser'))
    this.Create_Org_ID = loginInfo.orgId
    this.Create_User_ID = loginInfo.userId
    this.getCompanyList()// 获取发货网点
    this.getDispatchingState() // 获取运单状态
    this.init();
  },
  methods: {
    init(){ // 获取自提数据
      const _this = this
      const data1 = {
        manifest_code: this.formFilter.order_no,
        Manifest_State_ID: this.formFilter.state,
        departure_org_id: this.formFilter.adds,
        arrival_org_id: this.Create_Org_ID,
        shipping_dateStar: this.formFilter.startdate,
        shipping_dateEnd: this.formFilter.enddate,
        Page: this.currentPage,
        Rows: this.pageSize
      }
      console.log("data1",data1)
      axios.post(url.apiUrl() + '/api/Selfpickup/GetAllSelfpickup', data1)
        .then(function(val) {
          console.log(val)
          if (val.data.error === '') {
            _this.tableData = val.data.data.rows
            _this.materielSize = val.data.data.total
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
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
    getDispatchingState() { // 获取运单状态
      const _this = this
      axios.get(url.apiUrl() + '/api/Departure/GetDeparture_States')
        .then(function(val) {
          _this.transportState = val.data.data
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    pageSizeChange(val) { //   选择每页展示的页数大小
      console.log(val)
      this.pageSize = val
      this.init()
    },
    currentSizeChange(val) { // 当前选择第几页
      this.currentPage = val
      this.init()
    },
    goEextract(row, event) {
      console.log(row)
      this.$router.push({ name: 'customer/extract', params: { id: row }}); 
    },
    handleChangeTab(tabIndex) {
      this.currentTab = tabIndex
      // do something
    },
    // 点击列查询按钮
    toggleColumnSearch() {
      if (this.openColumnSearch) {
        if (this.tableData[0] || this.tableData[0].isColumnSearch) {
          this.tableData.shift()
        }
        this.openColumnSearch = false
        this.columnSearch = {}
      } else {
        this.openColumnSearch = true
        if (this.tableData.length === 0 || !this.tableData[0].isColumnSearch) {
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
        return typeof value === undefined || value === '' || value === null
      }) || values.length === 0

      if (isEmpty) {
        this.columnSearch = {}

        this.tableData = (this.openColumnSearch ? [{
          isColumnSearch: true
        }] : []).concat(this.cachedDate)
      }

      const result = this.cachedDate.filter(item => {
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
          } else if (item[key].indexOf(this.columnSearch[key]) < 0) {
            return false
          }
        }
        return true
      })

      this.tableData = (this.openColumnSearch ? [{
        isColumnSearch: true
      }] : []).concat(result)
    }
  }
}
</script>

<style lang="scss">
.cell{white-space: nowrap!important;}
.Customer .Customer-header{padding: 8px 15px 8px 15px;}
.Customer .Customer-from{height: 40px;line-height: 40px;}
.Customer .el-main{padding: 5px 15px 5px 15px}
.Customer .Customer-footer{text-align: center;}
</style>
<style lang="scss">
.el-form-item{
    margin-bottom:4px;
}
.tableWraper{
    width: 100%;
    overflow-y: hidden;
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



.ac-checkbox-group {
    overflow-y: auto;
    .el-checkbox+.el-checkbox {
        margin-left: 0;
    }
}

.flex-1 {
    flex: 1;
}

.flex-cloumn {
    display: flex;
    flex-direction: column;
}
.Customer-header{
  height:auto!important;
}
.Customer{
  height: 100%!important;
}
</style>