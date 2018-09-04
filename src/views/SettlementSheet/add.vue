<template>
    <el-container class="SettlementSheet">
        <el-header style="height:150px;" class="SettlementSheet-header">
            <el-button style='margin:0 0 5px 0px;' size="mini" @click="Updates">修改</el-button>
            <el-button style='margin:0 0 5px 10px;' size="mini" @click="Saves">保存</el-button>
            <el-button style='margin:0 0 5px 10px;' size="mini">取消</el-button>
            <el-button style='margin:0 0 5px 0px;' size="mini">删除</el-button>
            <el-button style='margin:0 0 5px 10px;' size="mini">审核</el-button>
            <el-button style='margin:0 0 5px 10px;' size="mini">撤销审核</el-button>
            <el-form :inline="true" :model="formFilter" class="form-wrapper" size="mini">
                    <el-form-item label="结算网点">
                        <el-input v-bind:disabled="disabledInput" v-model="formFilter.contractId" style="width: 100px"></el-input>
                    </el-form-item>
                    <el-form-item label="结算单号">
                        <el-input v-bind:disabled="disabledInput" v-model="formFilter.contractId" style="width: 100px"></el-input>
                    </el-form-item>
                    <el-form-item label="结算日期">
                        <el-date-picker v-model="formFilter.startDate" type="date"  style="width: 100px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="应收金额">
                        <el-input v-bind:disabled="disabledInput" v-model="formFilter.site" style="width: 100px"></el-input>
                    </el-form-item>
                    <el-form-item label="支出金额">
                        <el-input v-bind:disabled="disabledInput" v-model="formFilter.site" style="width: 100px"></el-input>
                    </el-form-item>
                    <el-form-item label="结算金额">
                        <el-input v-bind:disabled="disabledInput" v-model="formFilter.site" style="width: 100px"></el-input>
                    </el-form-item>
                    <el-form-item label="实结金额">
                        <el-input v-bind:disabled="disabledInput" v-model="formFilter.site" style="width: 100px"></el-input>
                    </el-form-item>
                    <el-form-item label="已结金额">
                        <el-input v-bind:disabled="disabledInput" v-model="formFilter.site" style="width: 100px"></el-input>
                    </el-form-item>
                    <el-form-item label="余　　额">
                        <el-input v-bind:disabled="disabledInput" v-model="formFilter.site" style="width: 100px"></el-input>
                    </el-form-item>
                <el-col :span="24">
                    <el-form-item label="备注">
                        <el-input v-bind:disabled="disabledInput" v-model="formFilter.site" style="width: 500px"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-header>
        <el-main class="">
        <el-tabs v-model="tabDatas" type="card" >
        <el-tab-pane label="用户管理" name="first">
                    <el-table
                    class="table"
                    ref="multipleTable4"
                    :data="tableData"
                    tooltip-effect="dark"
                    size="mini"
                    show-summary
                    border  >

                    <el-table-column
                        type="selection"
                        fixed
                        :show-overflow-tooltip="true"
                        width="55">
                    </el-table-column>
                    
                    <el-table-column
                        label="序号"
                        type="index"
                        fixed
                        :show-overflow-tooltip="true"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        label="收费方式"
                        width="120">
                        <template slot-scope="scope">
                        <el-select @change="ListOperation(scope.$index)" v-model.lazy="scope.row.org_id"    >
                          <el-option label="现金" value="1"></el-option>
                          <el-option label="支付宝" value="2"></el-option>
                          <el-option label="微信" value="3"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>

                    <el-table-column
                        sortable
                        prop="price"
                        label="金额">
                        <template slot-scope="scope">
                                   <el-input v-model="scope.row.price" @change="handleChange(scope.$index, scope.row)" ></el-input>
                         </template>
                    </el-table-column>
                    <el-table-column
                       sortable
                        prop="vehicle_property_name"
                        label="银行" 
                        :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column
                       sortable
                        prop="vehicle_tractortrailer_name"
                        label="卡号"
                        :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column
                        sortable
                        prop="carrier_id"
                        label="开启人"
                        :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column
                       sortable
                        prop="vehicle_registration"
                        label="微信"
                        :show-overflow-tooltip="true">
                    </el-table-column>


                    <el-table-column
                        sortable
                        prop="driver_name"
                        label="支付宝"
                        :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column
                        sortable
                        prop="driver_name"
                        label="油卡卡号"
                        :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column
                        sortable
                        prop="driver_name"
                        label="备注"
                        :show-overflow-tooltip="true">
                    </el-table-column>
 
                   
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="费用明细" name="second">
                <el-table
                    class="table_to"
                    key='tableData_to'
                    :data='tableData_to'
                    size="mini"
                    show-summary
                    border>

                    <el-table-column
                        type="selection"
                        fixed
                        :show-overflow-tooltip="true"
                        width="55">
                    </el-table-column>
                    
                    <el-table-column
                        label="序号"
                        type="index"
                        fixed
                        :show-overflow-tooltip="true"
                        width="50">
                    </el-table-column>

                    <el-table-column
                        sortable
                       
                        label="收费方式"
                        class-name="el-tooltip"
                        :header-cell-class-name="tableheaderClassName"
                        :show-overflow-tooltip="true"
                        width="120">
                    </el-table-column>

                    <el-table-column
                        sortable
                        prop="price"
                        label="金额"
                        :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column
                        sortable
                        prop="sprice"
                        label="金额"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                                   <el-input size="mini" v-model="scope.row.price" placeholder=""></el-input>
                                </template>
                    </el-table-column>

                    <el-table-column
                       sortable
                        prop="vehicle_property_name"
                        label="银行" 
                        :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column
                       sortable
                        prop="vehicle_tractortrailer_name"
                        label="卡号"
                        :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column
                        sortable
                        prop="carrier_id"
                        label="开启人"
                        :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column
                       sortable
                        prop="vehicle_registration"
                        label="微信"
                        :show-overflow-tooltip="true">
                    </el-table-column>


                    <el-table-column
                        sortable
                        prop="driver_name"
                        label="支付宝"
                        :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column
                        sortable
                        prop="driver_name"
                        label="油卡卡号"
                        :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column
                        sortable
                        prop="driver_name"
                        label="备注"
                        :show-overflow-tooltip="true">
                    </el-table-column>
 
                   
                </el-table>
            </el-tab-pane>
            </el-tabs>
            
        </el-main>
    </el-container>
</template>

<script>
const tableColumns = [
  {
    label: '序号',
    prop: 'index',
    width: 60
  },
  {
    label: '收支方式',
    prop: 'prop1',
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
  },
  {
    label: '金额',
    prop: 'prop2'
  },
  {
    label: '银行',
    prop: 'prop3'
  },
  {
    label: '卡号',
    prop: 'prop4'
  },
  {
    label: '开户人',
    prop: 'prop5'
  },
  {
    label: '微信',
    prop: 'prop6'
  },
  {
    label: '支付宝',
    prop: 'prop7'
  },
  {
    label: '油卡卡号',
    prop: 'prop8'
  },
  {
    label: '备注',
    prop: 'prop9'
  }
]

const tableColumns_to = [
  {
    label: '序号',
    prop: 'index',
    width: 60
  },
  {
    label: '运单号',
    prop: 'id'
  },
  {
    label: '结算金额',
    prop: 'price'
  },
  {
    label: '实收金额',
    prop: 'sprice'
  },
  {
    label: '制单人',
    prop: 'vehicle_property_name'
  },
  {
    label: '运单日期',
    prop: 'vehicle_tractortrailer_name'
  },
  {
    label: '运单状态',
    prop: 'carrier_id'
  },
  {
    label: '发站',
    prop: 'vehicle_registration'
  },
  {
    label: '到站',
    prop: 'driver_name'
  }
]
const mockData = [{
  index: 1,
  id: 184,
  price: 10
},
{
  index: 2,
  id: 182,
  price: 10
},
{
  index: 3,
  id: 18040003,
  price: 10
},
{
  index: 4,
  id: 18040004,
  price: 10
},
{
  index: 5,
  id: 18040005,
  price: 10
}, {
  index: 6,
  id: 18040006,
  price: 10
}, {
  index: 7,
  id: 18040007,
  price: 10
}, {
  index: 8,
  id: 18040008,
  price: 10
}]

const mockData_to = [{
  index: '1',
  prop1: '0',
  prop2: '0',
  prop3: '0',
  prop4: '0',
  prop5: '0',
  prop6: '0',
  prop7: '200',
  prop8: '20',
  prop9: '40'
}, {
  index: '2',
  prop1: '0',
  prop2: '0',
  prop3: '0',
  prop4: '0',
  prop5: '0',
  prop6: '0',
  prop7: '200',
  prop8: '20',
  prop9: '40'
}]

export default {
  data() {
    return {
      tabDatas: 'first',
      disabledInput: false,
      currentTab: 0,
      formFilter: {
        contractId: '',
        carStatus: '',
        startDate: '',
        endDate: '',
        site: ''
      },
      tableData: mockData.slice(),
      tableData_to: mockData_to.slice(),
      // 列选择dialog开关
      dialogChooseColumnVisible: false,
      dialogChooseColumnVisible_to: false,
      // 列表表头数据
      tableColumns: tableColumns,
      tableColumns_to: tableColumns_to,
      choosenColumns: [...tableColumns.map(column => column.label)],
      choosenColumns_to: [...tableColumns_to.map(column => column.label)],
      openColumnSearch: false,
      openColumnSearch_to: false,
      columnSearch: {},
      columnSearch_to: {}
    }
  },
  mounted() {
    const boxHeight = document.querySelector('body').clientHeight
    const buttonBoxHeight = document.querySelector('.SettlementSheet-header').clientHeight
    const areaBoxHeight = boxHeight - 90
    document.querySelector('.SettlementSheet').style.height = areaBoxHeight + 'px'
    document.querySelector('.el-table__body-wrapper').style.height = areaBoxHeight - 40 - 90 - 50 - buttonBoxHeight + 'px'
    document.querySelector('.el-table__body-wrapper').style.overflowY = 'auto'

    document.querySelector('.table_to .el-table__body-wrapper').style.height = areaBoxHeight - 40 - 90 - 50 - buttonBoxHeight + 'px'
    document.querySelector('.table_to .el-table__body-wrapper').style.overflowY = 'auto'
  },
  methods: {
    ListOperation(index) {
      const item = { price: 0 }
      if (this.tableData.length == index + 1) {
        this.tableData.push(item)
      }
    },
    tableheaderClassName({ row, rowIndex }) {
      return 'el-tooltip'
    },
    Saves() {
      this.disabledInput = true
    },
    Updates() {
      this.disabledInput = false
    },
    handleChangeTab(tabIndex) {
      this.currentTab = tabIndex
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

    // 点击列查询按钮
    toggleColumnSearch_to() {
      if (this.openColumnSearch_to) {
        if (this.tableData_to[0].isColumnSearch) {
          this.tableData_to.shift()
        }
        this.openColumnSearch_to = false
        this.columnSearch_to = {}
      } else {
        this.openColumnSearch_to = true
        if (!this.tableData_to[0].isColumnSearch) {
          this.tableData_to.unshift({
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
    },

    // 进行列查询TO
    handleColumnSearch_to() {
      const values = Object.values(this.columnSearch_to)
      const isEmpty = values.every(value => {
        return typeof value === undefined || value === ''
      }) || values.length === 0

      if (isEmpty) {
        this.columnSearch_to = {}
        const newData = mockData_to.slice()
        newData.unshift({
          isColumnSearch: true
        })
        this.tableData_to = newData
      }

      this.tableData_to = this.tableData_to.filter(item => {
        if (item.isColumnSearch) {
          return true
        }
        for (const key in this.columnSearch_to) {
          if (this.columnSearch_to[key] === '') {
            // do nothing
          } else if (this.columnSearch_to[key] instanceof Date) {
            const date = new Date(this.columnSearch_to[key])
            const formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            if (item[key] !== formatDate) {
              return false
            }
          } else if (item[key].indexOf(this.columnSearch_to[key]) < 0) {
            return false
          }
        }
        return true
      })
    }

  }
}
</script>

<style lang="scss">
.SettlementSheet .SettlementSheet-header{padding: 8px 15px 8px 15px}
.SettlementSheet .el-form-item{margin-bottom: 0px}
.SettlementSheet .el-main{padding: 15px;height: 100%}
.SettlementSheet .SettlementSheet-footer{text-align: center;}
.cell{white-space: nowrap!important;}
.SettlementSheet .el-input--suffix .SettlementSheet .el-input__inner{padding-left: 25px;padding-right: 2px}
</style>