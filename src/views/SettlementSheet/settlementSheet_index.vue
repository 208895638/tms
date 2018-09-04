<template>
    <el-container class="SettlementSheet">
        <el-header style="height:40px;" class="SettlementSheet-header">
            <el-form :inline="true" :model="formInline" size="mini">
                <el-form-item label="结算日期" >
                    <el-col :span="11">
                        <el-date-picker v-model="formInline.startDate" type="date"  style="width: 100px;"></el-date-picker>
                    </el-col>
                    <el-col :span="2" style="text-align: center;">到</el-col>
                    <el-col :span="11">
                        <el-date-picker v-model="formInline.endDate" type="date" style="width: 100px"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="结算网点" >
                    <el-input v-model="formInline.user" style="width:80px;line-height:25px;height:25px;"></el-input>
                </el-form-item>
                <el-form-item label="结算状态" >
                    <el-input v-model="formInline.user" style="width:80px;line-height:25px;height:25px;"></el-input>
                </el-form-item>
                <el-form-item label="结算对象" >
                    <el-input v-model="formInline.user" style="width:80px;line-height:25px;height:25px;"></el-input>
                    <el-button type="primary" size="mini">查询</el-button>
                </el-form-item>
            </el-form>
        </el-header>
        <el-main class="">
            <el-table ref="multipleTable" :data="tableData" size="small" border show-summary @row-dblclick="goSettlementSheetInfo">
                <el-table-column label="选择" width="60" >
                            <template slot-scope="scope">
                              <el-radio v-model="preItem" :label="scope.$index">&nbsp;</el-radio>
                            </template>
                          </el-table-column>
                <el-table-column sortable v-for="item in tableColumns" v-if="choosenColumns.indexOf(item.label) > -1" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
                <template slot-scope="scope">
                    <div v-if="scope.$index === 0 && openColumnSearch">
                            <el-date-picker v-if="item.type==='date'" v-model="columnSearch[scope.column.property]" size="mini" type="date" style="width:100%;" @change="handleColumnSearch"></el-date-picker>
                            <el-select v-else-if="item.type==='select'" v-model="columnSearch[scope.column.property]" size="mini" placeholder="请选择" @change="handleColumnSearch">
                                <el-option v-for="s in item.selectOptions" :key="s.value" :label="s.label" :value="s.value"></el-option>
                            </el-select>
                        <el-input v-else="item.type==='input'" v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch"></el-input>
                    </div>
                    <span v-else>{{ scope.row[scope.column.property] }}</span>
                </template>
                </el-table-column>
            </el-table>
            <el-footer class="SettlementSheet-footer" style="height: 30px">
                <el-col :span="24">
                    <el-button type="text" size="mini" @click="dialogChooseColumnVisible = true">列选择</el-button>
                    <el-button type="text" size="mini" @click="toggleColumnSearch">列搜索</el-button>
                    <el-button type="text" size="mini">导出</el-button>
                </el-col>
            </el-footer>
            <el-dialog :visible.sync="dialogChooseColumnVisible" title="列选择">
                <el-checkbox-group v-model="choosenColumns" class="ac-checkbox-group flex-cloumn">
                <div v-for="column in tableColumns"><el-checkbox :label="column.label" :key="column.label">{{column.label}}</el-checkbox></div>
                </el-checkbox-group>
            </el-dialog>
            <hr>
            <div class="SettlementSheet-Detailed">
                <el-table class="SettlementSheetMin" ref="multipleTable" :data="tableData_to" size="small" border show-summary >
                    <el-table-column type="selection" width="60"></el-table-column>
                    <el-table-column sortable v-for="item in tableColumns_to" v-if="choosenColumns_to.indexOf(item.label) > -1" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
                    <template slot-scope="scope">
                        <div v-if="scope.$index === 0 && openColumnSearch_to">
                                <el-date-picker v-if="item.type==='date'" v-model="columnSearch_to[scope.column.property]" size="mini" type="date" style="width:100%;" @change="handleColumnSearch_to"></el-date-picker>
                                <el-select v-else-if="item.type==='select'" v-model="columnSearch_to[scope.column.property]" size="mini" placeholder="请选择" @change="handleColumnSearch_to">
                                    <el-option v-for="s in item.selectOptions_to" :key="s.value" :label="s.label" :value="s.value"></el-option>
                                </el-select>
                            <el-input v-else="item.type==='input'" v-model="columnSearch_to[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch_to"></el-input>
                        </div>
                        <span v-else>{{ scope.row[scope.column.property] }}</span>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-footer class="SettlementSheet-footer" style="height: 30px">
                <el-col :span="24">
                    <el-button type="text" size="mini" @click="dialogChooseColumnVisible_to = true">列选择</el-button>
                    <el-button type="text" size="mini" @click="toggleColumnSearch_to">列搜索</el-button>
                    <el-button type="text" size="mini">导出</el-button>
                </el-col>
            </el-footer>
            <el-dialog :visible.sync="dialogChooseColumnVisible_to" title="列选择">
                <el-checkbox-group v-model="choosenColumns_to">
                <div v-for="column in tableColumns_to"><el-checkbox :label="column.label" :key="column.label">{{column.label}}</el-checkbox></div>
                </el-checkbox-group>
            </el-dialog>

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
    label: '运单日期',
    prop: 'prop1'
  },
  {
    label: '送货车号',
    prop: 'prop2'
  },
  {
    label: '运单日期',
    prop: 'prop3'
  },
  {
    label: '预付进仓费',
    prop: 'prop4'
  },
  {
    label: '实付进仓费',
    prop: 'prop5'
  },
  {
    label: '付款方式',
    prop: 'prop6'
  },
  {
    label: '运单号',
    prop: 'prop7'
  },
  {
    label: '货物名称',
    prop: 'prop8'
  },
  {
    label: '备注',
    prop: 'prop9'
  },
  {
    label: '发站是否结算',
    prop: 'prop10'
  },
  {
    label: '发站结算日期',
    prop: 'prop11'
  },
  {
    label: '发站结算人',
    prop: 'prop12'
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
    prop: 'prop1'
  },
  {
    label: '结算金额',
    prop: 'prop2'
  },
  {
    label: '现付',
    prop: 'prop3'
  },
  {
    label: '到付',
    prop: 'prop4'
  },
  {
    label: '回付',
    prop: 'prop5'
  },
  {
    label: '欠付',
    prop: 'prop6'
  },
  {
    label: '发货月结',
    prop: 'prop7'
  },
  {
    label: '收货月结',
    prop: 'prop8'
  },
  {
    label: '货到打卡',
    prop: 'prop9'
  },
  {
    label: '贷款扣',
    prop: 'prop10'
  },
  {
    label: '异动赠款',
    prop: 'prop11'
  },
  {
    label: '赔偿我们',
    prop: 'prop12'
  },
  {
    label: '回扣',
    prop: 'prop13'
  }
]

const mockData = [{
  index: '1',
  prop1: '0',
  prop2: '0',
  prop3: '0',
  prop4: '0',
  prop5: '0',
  prop6: '0',
  prop7: '200',
  prop8: '20',
  prop9: '40',
  prop10: '40',
  prop11: '40',
  prop12: '40'
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
  prop9: '40',
  prop10: '40',
  prop11: '40',
  prop12: '40'
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
  prop9: '40',
  prop10: '40',
  prop11: '40',
  prop12: '40'
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
  prop9: '40',
  prop10: '40',
  prop11: '40',
  prop12: '40'
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
  prop9: '40',
  prop10: '40',
  prop11: '40',
  prop12: '40',
  prop13: '40'
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
  prop9: '40',
  prop10: '40',
  prop11: '40',
  prop12: '40',
  prop13: '40'
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
  prop9: '40',
  prop10: '40',
  prop11: '40',
  prop12: '40',
  prop13: '40'
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
  prop9: '40',
  prop10: '40',
  prop11: '40',
  prop12: '40',
  prop13: '40'
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
  prop9: '40',
  prop10: '40',
  prop11: '40',
  prop12: '40',
  prop13: '40'
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
  prop9: '40',
  prop10: '40',
  prop11: '40',
  prop12: '40',
  prop13: '40'
}]
export default {
  data() {
    return {
      currentTab: 0,
      formInline: {
        contractId: '',
        carStatus: '',
        startDate: '',
        endDate: '',
        site: ''
      },
      preItem: 0,
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
    document.querySelector('.SettlementSheet-footer').style.height = '20px'
    const areaBoxHeight = boxHeight - 90
    document.querySelector('.SettlementSheet').style.height = areaBoxHeight + 'px'
    document.querySelector('.el-table__body-wrapper').style.height = (areaBoxHeight - 60 - 90 - 100 - buttonBoxHeight) / 2 + 'px'
    document.querySelector('.el-table__body-wrapper').style.overflowY = 'auto'

    document.querySelector('.SettlementSheet-Detailed .el-table__body-wrapper').style.height = (areaBoxHeight - 80 - 90 - 100 - buttonBoxHeight) / 2 + 'px'
    document.querySelector('.SettlementSheet-Detailed .el-table__body-wrapper').style.overflowY = 'auto'
  },
  methods: {

    goSettlementSheetInfo(row, event) {
      this.$router.push({ path: '/SettlementSheet/add/' + row.index })
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
.SettlementSheet{overflow-y: hidden;}
.SettlementSheet .SettlementSheet-header{padding: 8px 15px 8px 15px}
.SettlementSheet .el-main{padding: 15px}
.SettlementSheet .SettlementSheet-footer{text-align: center;}
.cell{white-space: nowrap!important;}
.SettlementSheet .el-input--suffix .SettlementSheet .el-input__inner{padding-left: 25px;padding-right: 2px}

.SettlementSheet-Detailed .el-table--small td, .SettlementSheet-Detailed .el-table--small th{
    padding: 0px;
}
</style>