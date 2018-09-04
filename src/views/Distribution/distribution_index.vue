<template>
    <el-container class="Distribution">
        <el-header class="Distribution-header" style="height: 70px">
            <el-row>
                <el-col :span="4">
                    <router-link to="./add"><el-button size="mini" type="primary" plain>新增</el-button></router-link>
                </el-col>
            </el-row>
            <el-form :inline="true" :model="formFilter" class="Distribution-from" size="mini">
                <el-form-item label="合同号">
                    <el-input v-model="formFilter.contractId" placeholder="请输入合同号" style="width: 100px"></el-input>
                </el-form-item>
                <el-form-item label="发车状态">
                    <el-select v-model="formFilter.carStatus" :clearable="true" placeholder="请选择" style="width: 100px">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="已调度" value="已调度"></el-option>
                        <el-option label="已装车" value="已装车"></el-option>
                        <el-option label="已发车" value="已发车"></el-option>
                        <el-option label="已到货" value="已到货"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发车日期">
                    <el-col :span="11">
                        <el-date-picker v-model="formFilter.startDate" type="date"  style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col :span="2" class="" style="text-align: center;">到</el-col>
                    <el-col :span="11">
                        <el-date-picker v-model="formFilter.endDate" type="date" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="网点">
                    <el-input v-model="formFilter.startSite" placeholder="请输入网点" style="width: 100px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" type="primary" @click="handleClickSearch">查询</el-button>
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
                @row-dblclick="GoShowPage"
                >
                <el-table-column
                    type="selection"
                    width="60">
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
        <el-footer style="height: 30px" class="Dispatched-footer">
            <el-col :span="24">
                <el-button type="text" size="mini" @click="dialogChooseColumnVisible = true">列选择</el-button>
                <el-button type="text" size="mini" @click="toggleColumnSearch">列搜索</el-button>
                <el-button type="text" size="mini">导出</el-button>
            </el-col>
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
    label: '序号',
    prop: 'index',
    width: 60
  },
  {
    label: '合同号',
    prop: 'contractId'
  },
  {
    label: '发车日期',
    prop: 'startDate',
    width: 200,
    type: 'date'
  },
  {
    label: '发车状态',
    prop: 'carStatus',
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
    label: '发车网点',
    prop: 'startSite'
  },
  {
    label: '卸货网点',
    prop: 'prop3'
  },
  {
    label: '车牌号',
    prop: 'prop4'
  },
  {
    label: '联系方式',
    prop: 'prop5'
  },
  {
    label: '调度员',
    prop: 'prop6'
  },
  {
    label: '总件数',
    prop: 'prop7'
  },
  {
    label: '总重量（公斤）',
    prop: 'prop8'
  },
  {
    label: '总体积（立方）',
    prop: 'prop9'
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
}, {
  index: '2',
  contractId: '18004002',
  startDate: '2018-2-19',
  carStatus: '已调度',
  startSite: 'B点',
  prop3: 'A点',
  prop4: '沪B123456',
  prop5: '19279085098',
  prop6: '张三',
  prop7: '500',
  prop8: '20',
  prop9: '50'
}, {
  index: '3',
  contractId: '18004003',
  startDate: '2018-1-19',
  carStatus: '已发车',
  startSite: 'C点',
  prop3: 'D点',
  prop4: '沪B123456',
  prop5: '19250987908',
  prop6: '张三',
  prop7: '200',
  prop8: '20',
  prop9: '40'
}, {
  index: '4',
  contractId: '18004004',
  startDate: '2018-9-19',
  carStatus: '已发车',
  startSite: 'H点',
  prop3: 'A点',
  prop4: '沪A123456',
  prop5: '19279085098',
  prop6: '李四',
  prop7: '500',
  prop8: '20',
  prop9: '50'
}, {
  index: '3',
  contractId: '18004003',
  startDate: '2018-1-19',
  carStatus: '已发车',
  startSite: 'C点',
  prop3: 'D点',
  prop4: '沪B123456',
  prop5: '19250987908',
  prop6: '张三',
  prop7: '200',
  prop8: '20',
  prop9: '40'
}, {
  index: '4',
  contractId: '18004004',
  startDate: '2018-9-19',
  carStatus: '已发车',
  startSite: 'H点',
  prop3: 'A点',
  prop4: '沪A123456',
  prop5: '19279085098',
  prop6: '李四',
  prop7: '500',
  prop8: '20',
  prop9: '50'
}, {
  index: '3',
  contractId: '18004003',
  startDate: '2018-1-19',
  carStatus: '已发车',
  startSite: 'C点',
  prop3: 'D点',
  prop4: '沪B123456',
  prop5: '19250987908',
  prop6: '张三',
  prop7: '200',
  prop8: '20',
  prop9: '40'
}, {
  index: '4',
  contractId: '18004004',
  startDate: '2018-9-19',
  carStatus: '已发车',
  startSite: 'H点',
  prop3: 'A点',
  prop4: '沪A123456',
  prop5: '19279085098',
  prop6: '李四',
  prop7: '500',
  prop8: '20',
  prop9: '50'
}, {
  index: '3',
  contractId: '18004003',
  startDate: '2018-1-19',
  carStatus: '已发车',
  startSite: 'C点',
  prop3: 'D点',
  prop4: '沪B123456',
  prop5: '19250987908',
  prop6: '张三',
  prop7: '200',
  prop8: '20',
  prop9: '40'
}, {
  index: '4',
  contractId: '18004004',
  startDate: '2018-9-19',
  carStatus: '已发车',
  startSite: 'H点',
  prop3: 'A点',
  prop4: '沪A123456',
  prop5: '19279085098',
  prop6: '李四',
  prop7: '500',
  prop8: '20',
  prop9: '50'
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
        startSite: ''
      },
      tableData: mockData.slice(),
      cachedDate: mockData.slice(),
      // 列选择dialog开关
      dialogChooseColumnVisible: false,
      // 列表表头数据
      tableColumns: tableColumns,
      choosenColumns: [...tableColumns.map(column => column.label)],
      openColumnSearch: false,
      columnSearch: {}
    }
  },
  mounted() {
    const boxHeight = document.querySelector('body').clientHeight
    const buttonBoxHeight = document.querySelector('.Distribution-header').clientHeight
    const areaBoxHeight = boxHeight - 84
    document.querySelector('.Distribution').style.height = areaBoxHeight + 'px'
    document.querySelector('.el-table__body-wrapper').style.height = areaBoxHeight - 30 - 40 - 90 - buttonBoxHeight + 'px'
    document.querySelector('.el-table__body-wrapper').style.overflowY = 'auto'
  },
  methods: {
    GoShowPage(row, event) {
      this.$router.push({ path: '/Distribution/show/' + row.index })
      return
    },
    handleChangeTab(tabIndex) {
      this.currentTab = tabIndex
      // do something
    },
    handleClickSearch() {
      const { contractId, carStatus, startDate, endDate, startSite } = this.formFilter

      const result = mockData.filter(item => {
        if (isNotEmpty(contractId) && item.contractId.indexOf(contractId) < 0) {
          return false
        }
        if (isNotEmpty(carStatus) && (carStatus !== '全部') && item.carStatus.indexOf(carStatus) < 0) {
          return false
        }
        if (isNotEmpty(startSite) && item.startSite.indexOf(startSite) < 0) {
          return false
        }
        if (isNotEmpty(startDate) && isNotEmpty(endDate)) {
          if (!((compareDate(item.startDate, startDate) >= 0) && (compareDate(endDate, item.startDate) >= 0))) {
            return false
          }
        } else if (isNotEmpty(startDate) && (compareDate(item.startDate, startDate) < 0)) {
          return false
        } else if (isNotEmpty(endDate) && (compareDate(endDate, item.startDate) < 0)) {
          return false
        }

        return true
      })

      this.tableData = (this.openColumnSearch ? [{
        isColumnSearch: true
      }] : []).concat(result)

      this.formFilter = {
        contractId: '',
        carStatus: '',
        startDate: '',
        endDate: '',
        startSite: ''
      }
      this.cachedDate = result.slice()
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
.Distribution .Distribution-header{padding: 8px 15px 8px 15px;}
.Distribution .Distribution-from{height: 40px;line-height: 40px;}
.Distribution .el-main{padding: 5px 15px 5px 15px}
.Distribution .Dispatched-footer{text-align: center;}
</style>