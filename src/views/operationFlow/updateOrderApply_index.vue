<template>
    <el-container class="ac-container">
        <el-row class="buttonBox">
            <router-link class="btn1" type="primary" size="mini" to="/common/acceptancebilling/add">新增</router-link>
        </el-row>
        
        <el-main class="ac-main flex-1 flex-cloumn pd-10">
            <!-- 表单筛选栏 -->
            <el-form :inline="true" :model="formFilter" class="form-wrapper" size="mini">
                <el-form-item label="运单号">
                    <el-input placeholder="请输入运单号" v-model="formFilter.contractId" style="width: 100px"></el-input>
                </el-form-item>
                <el-form-item label="运单状态">
                    <el-select v-model="formFilter.carStatus" multiple  placeholder="请选择" style="width: 120px">
                        <el-option 
                        v-for="(item , index) in stateOfAllManifest"
                        :key="index"
                        :value = item.Manifest_State_ID
                        :label = item.Manifest_State_Name
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="运单日期">
                    <el-col :span="11">
                        <el-date-picker v-model="formFilter.startDate" type="date"  style="width: 120px"></el-date-picker>
                    </el-col>
                    <el-col :span="2" class="ac-line" style="text-align: center">到</el-col>
                    <el-col :span="11">
                        <el-date-picker v-model="formFilter.endDate" type="date" style="width: 130px"></el-date-picker>
                    </el-col>
                </el-form-item>
                <!-- <el-form-item label="发货网点">
                    <el-input placeholder="请输入发货网点" v-model="formFilter.site" style="width: 100px"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="发货网点" size="mini">
                    <el-select clearable v-model="formFilter.site" filterable placeholder="请选择">
                        <el-option
                        v-for="item in customerList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.orgid">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item>
                    <el-button size="mini" type="primary" @click="GetAllManifest">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- 表格 -->
            <el-table
                ref="multipleTable"
                :data="tableData"
                size="small"
                height="100%"
                max-height="100%"
                border
                show-summary
                style="width: 100%"
                
                @row-dblclick="GoEditPage">
                
                <el-table-column
                    type="selection"
                    width="60">
                </el-table-column>
                <el-table-column
                type="index"
                label="序号"
                width="50">
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
                                :label="s.Manifest_State_Name"
                                :value="s.Manifest_State_ID">
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
    label: '到站网点',
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
    label: '发货人电话',
    prop: 'consigner_phone'
  }
]
const mockData = [
  {
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
  }
]
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
      stateOfAllManifest: '',
      pageSize: 10,
      currentPage: 1,
      materielSize: 1,
      customerList: [

      ],
      Create_Org_ID: '',
      Create_User_ID: ''
    }
  },
  mounted() {
    const loginInfo = JSON.parse(storage.getStorage('currentUser'))
    this.Create_Org_ID = loginInfo.orgId
    this.Create_User_ID = loginInfo.userId

    this.stateOfGetAllManifest() // 获取所以运输单状态
    this.getCompanyList() // 获取所属公司所以数据
    this.GetAllManifest() // 获取所有的运输委托单
  },
  methods: {
    pageSizeChange(val) { //   选择每页展示的页数大小
      console.log(val)
      this.pageSize = val
      this.GetAllManifest()
    },
    currentSizeChange(val) { // 当前选择第几页
      this.currentPage = val
      this.GetAllManifest()
    },
    getCompanyList() { // 获取发货网点
      const _this = this
      axios.get(url.apiUrl() + '/api/MetadataOrg/GetAllOrg')
        .then(function(val) {
          _this.customerList = val.data.data
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    GetAllManifest() { // 获取所有的运输委托单
      const _this = this
      const data1 = {
        manifest_code: this.formFilter.contractId,
        Manifest_State_ID: this.formFilter.carStatus,
        departure_org_id: this.Create_Org_ID,
        shipping_dateStar: this.formFilter.startDate,
        shipping_dateEnd: this.formFilter.endDate,
        Page: this.currentPage,
        Rows: this.pageSize
      }
      console.log("data1",data1)
      axios.post(url.apiUrl() + '/api/Manifest/GetAllManifest', data1)
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
    stateOfGetAllManifest() { // 获取所以运输单状态
      const _this = this
      axios.get(url.apiUrl() + '/api/Manifest/GetAllManifest_State')
        .then(function(val) {
          if (val.data.error === '') {
            _this.stateOfAllManifest = val.data.data
            tableColumns[4].selectOptions = val.data.data
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          this.$message.error(data.data.error)
        })
    },
    GoEditPage(row, event) {
      // this.$router.push({path:'/acceptancebilling/add/',query:{id:encodeURI(row)}});
      this.$router.push({ path: '/UpdateOrderApply/add', query: row })
      return
    },
    handleChangeTab(tabIndex) {
      this.currentTab = tabIndex
      // do something
    },
    handleClickSearch() {
      console.log(this.formFilter)
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

<style lang="scss" scoped>

.ac-container{
    padding: 0;
    height: 100%;
    .btn1{
        display: inline-block;
        line-height: 28px;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        -webkit-transition: .1s;
        transition: .1s;
        font-size: 14px;
        border-radius: 4px;
        width: 56px;
        height: 28px;
        color: #fff;
        background-color: #409EFF;
        border-color: #409EFF;
        font-weight: 500;
    }
    .btn1:hover{
        background: #66b1ff;
        border-color: #66b1ff;
        color: #fff;
    }
    .ac-main{
        padding: 0px 0 0 15px;
    }
    .buttonBox{
        padding: 15px 0 0 15px;
    }
    .ac-footer{
        padding: 15px 0 0 15px;
    }
}
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
</style>