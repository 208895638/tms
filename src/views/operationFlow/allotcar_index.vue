<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="Allotcar">
    <el-header class="Allotcar-header">
        <router-link to="/common/allotcar/add"><el-button style='margin:0 0 5px 10px;' size="mini">新增</el-button></router-link>
        <el-form :inline="true" :model="formFilter" class="form-wrapper" size="mini">
            <el-form-item label="合同号">
                <el-input v-model="formFilter.contractId" style="width: 100px"></el-input>
            </el-form-item>
            <el-form-item label="发车状态">
                <el-select  clearable v-model="formFilter.state" multiple placeholder="请选择" >
                <el-option 
                    v-for="item in transportState" 
                    :key="item.Departure_State_Id" 
                    :label="item.Departure_State_Name" 
                    :value="item.Departure_State_Id"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="发车日期">
                <el-col :span="11">
                  <el-date-picker
                    v-model="formFilter.startDate"
                    type="date"
                    placeholder="选择日期"
                    style="width: 120px"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                    <!-- <el-date-picker v-model="formFilter.startDate" type="date" format="yyyy 年 MM 月 dd 日" style="width: 120px"></el-date-picker> -->
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
                    <!-- <el-date-picker v-model="formFilter.endDate" type="date" format="yyyy 年 MM 月 dd 日" style="width: 130px"></el-date-picker> -->
                </el-col>
            </el-form-item>
            <el-form-item label="发车网点">
                <!-- <el-input v-model="formFilter.site" style="width: 100px"></el-input> -->
                <el-select clearable v-model="formFilter.site" filterable placeholder="请选择">
                <el-option
                    v-for="item in customerList" 
                    :key="item.value"
                    :label="item.Org_name"
                    :value="item.Org_id">
                </el-option>
          </el-select>
            </el-form-item>
            <el-form-item label="运单号">
                <el-input v-model="formFilter.manifest_code" style="width: 100px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" type="primary" @click="handleClickSearch">查询</el-button>
            </el-form-item>
        </el-form>
    </el-header>
    
    <el-main class="aa">
            <!-- 表格 -->
            <el-table ref="multipleTable" class="tableWraper" :data="tableData"  @row-dblclick="show" size="small" border show-summary style="width: 100%" >
                <el-table-column type="selection" width="60"></el-table-column>
                <el-table-column
                    label="序号"
                    type="index">
                </el-table-column>
                <el-table-column sortable v-for="item in tableColumns" v-if="choosenColumns.indexOf(item.label) > -1" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
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
        <!-- <el-footer class="Allotcar-footer" style="height: 30px">
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
  // {
  //     label: '操作',
  //     prop: 'contractId'
  // },
  {
    label: '发车状态',
    prop: 'departure_state_name',
    type: 'select'

  },
  {
    label: '合同编号',
    prop: 'contract_code'
  },
  {
    label: '发车网点',
    prop: 'departure_org_id'
  },
  {
    label: '卸货网点',
    prop: 'unloading_org_name'
  },
  {
    label: '发车日期',
    prop: 'departure_date',
    width: 200,
    type: 'date'
  },
  // {
  //     label: '到货日期',
  //     prop: 'endDate',
  //     width: 200,
  //     type: 'date'
  // },
  {
    label: '车牌号',
    prop: 'plate_number'
  },

  {
    label: '驾驶员',
    prop: 'driver_name'
  },
  {
    label: '电话',
    prop: 'driver_phone'
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
  // {
  //     label: '配载率（%）',
  //     prop: 'prop11'
  // },
  {
    label: '总应收',
    prop: 'zongyingshou'
  },
  {
    label: '现付驾驶员',
    prop: 'freight_cashpay'
  },
  // {
  //     label: '现付状态',
  //     prop: 'prop11'
  // },
  {
    label: '到付驾驶员',
    prop: 'freight_collect'
  },
  // {
  //     label: '到付状态',
  //     prop: 'prop11'
  // },
  {
    label: '回付驾驶员',
    prop: 'freight_backpay'
  },
  // {
  //     label: '回付状态',
  //     prop: 'prop11'
  // },
  {
    label: '油卡卡号',
    prop: 'fuelcard_number'
  },
  {
    label: '油卡公司',
    prop: 'fuelcard_org'
  },

  {
    label: '油卡驾驶员',
    prop: 'fuelcard_driver'
  },
  // {
  //     label: '油卡状态',
  //     prop: 'prop11'
  // },
  {
    label: '装卸费',
    prop: 'handling_charge'
  },
  {
    label: '封布费',
    prop: 'cover_charge'
  },
  {
    label: '保险费',
    prop: 'issurance_charge'
  },
  {
    label: '落地费',
    prop: 'landing_charge'
  },
  {
    label: '其他费用',
    prop: 'other_charge'
  },
  {
    label: '费用合计',
    prop: 'total_charge'
  },
  {
    label: '单车毛利',
    prop: 'maoli'
  }
]
const mockData = []
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
        site: '',
        state: '',
        manifest_code: ''
      },
      tableData: mockData.slice(),
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
      customerList: [

      ],
      transportState: '', // 运单状态
      Create_Org_ID: '',
      Create_User_ID: ''
    }
  },
  mounted() {
    const boxHeight = document.querySelector('body').clientHeight
    const buttonBoxHeight = document.querySelector('.Allotcar-header').clientHeight
    const areaBoxHeight = boxHeight - 84
    document.querySelector('.Allotcar').style.height = areaBoxHeight + 'px'
    document.querySelector('.el-table__body-wrapper').style.height = areaBoxHeight - 60 - 20 - 10 - buttonBoxHeight + 'px'
    document.querySelector('.el-table__body-wrapper').style.overflowY = 'auto'
    const loginInfo = JSON.parse(storage.getStorage('currentUser'))
    this.Create_Org_ID = loginInfo.orgId
    this.Create_User_ID = loginInfo.userId 

    this.getCompanyList()// 获取发货网点
    this.getDispatchingState() // 获取运单状态
    this.init() // 初始化数据
  },
  methods: {
    init() { // 获取所有的配载单列表
      const _this = this
      const data1 = {
        Contract_Code: this.formFilter.contractId,
        Departure_State_Id: this.formFilter.state,
        Departure_DateStart: this.formFilter.startDate,
        Departure_DateEnd: this.formFilter.endDate,
        Departure_Org_Id: this.Create_Org_ID,
        manifest_code: this.formFilter.manifest_code,
        Page: this.currentPage,
        Rows: this.pageSize
      }
      axios.post(url.apiUrl() + '/api/Departure/DepartureList', data1)
        .then(function(val) {
          console.log(val)
          if (val.data.error === '') {
            let data1 = val.data.data.rows.map(ele => {
              ele.maoli = parseFloat(ele.zongyingshou) - parseFloat(ele.total_charge)
              return ele
            })
            data1.sort((a,b) =>{
              return Date.parse(a.departure_date) + Date.parse(b.departure_date)
            })
            _this.tableData = data1
            _this.materielSize = val.data.data.total
          } else {
            _this.$message.error(val.data.error)
          }
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
    show(row, event) {
      // console.log(row.Departure_ID);
      this.$router.push({ name: 'allotcar/show', params: { id: row.departure_id }})
    },
    handleChangeTab(tabIndex) {
      this.currentTab = tabIndex
      // do something
    },
    handleClickSearch() {
      this.init()
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
          } else if (item[key].indexOf(this.columnSearch[key]) < 0) {
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
.Allotcar{height: calc(100vh - 84px)}
.cell{white-space: nowrap!important;}
.el-scrollbar__view{height: 100%;}
.Allotcar .Allotcar-header{padding: 8px 15px 8px 15px;height: auto!important;}
.Allotcar .Allotcar-footer{text-align: center;}
.Allotcar .el-main{padding: 5px 15px 5px 15px}
 .el-form-item{
    margin-bottom: 0px;
}
</style>
<style lang="scss" scoped>
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
.Allotcar{
  height: 100%!important;
  display: flex;
    flex-direction: column;
}
.flex-1 {
    flex: 1;
}

.flex-cloumn {
    display: flex;
    flex-direction: column;
}
.aa{
      flex: 1;
      overflow: hidden;
}
.ac-footer{
  height: auto!important;
}
</style>


