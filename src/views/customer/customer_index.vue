<template>
    <el-container class="Customer">
      <el-header class="Customer-header" style="height: 80px">
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
          <el-form-item label="运单日期">
          <el-date-picker style="width:120px;height:25px"  v-model="formFilter.startdate" tyle="date"></el-date-picker>
          </el-form-item>
          <el-form-item label="到">
          <el-date-picker style="width:120px;height:25px"  v-model="formFilter.enddate" tyle="date"></el-date-picker>
          </el-form-item>
          <el-form-item label="网点">
              <el-input  v-model="formFilter.adds" ></el-input>
          </el-form-item>
          <el-form-item label="收货人">
              <el-input  v-model="formFilter.name" ></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary">查询</el-button>
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
        <el-footer style="height: 30px" class="Customer-footer">
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
    label: '运单号',
    prop: 'contractId'
  },
  {
    label: '托运商单号',
    prop: 'contractIds'
  },
  {
    label: '开单日期',
    prop: 'startDate',
    width: 200,
    type: 'date'
  },
  {
    label: '运单状态',
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
    label: '发站',
    prop: 'startSite'
  },
  {
    label: '到站',
    prop: 'prop3'
  },
  {
    label: '发货网点',
    prop: 'prop4'
  },
  {
    label: '目的网点',
    prop: 'prop5'
  },
  {
    label: '运输方式',
    prop: 'prop6'
  },
  {
    label: '发货单位',
    prop: 'prop7'
  },
  {
    label: '发货人',
    prop: 'prop8'
  },
  {
    label: '发货电话',
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
    const buttonBoxHeight = document.querySelector('.Customer-header').clientHeight
    const areaBoxHeight = boxHeight - 84
    document.querySelector('.Customer').style.height = areaBoxHeight + 'px'
    document.querySelector('.el-table__body-wrapper').style.height = areaBoxHeight - 30 - 40 - 90 - buttonBoxHeight + 'px'
    document.querySelector('.el-table__body-wrapper').style.overflowY = 'auto'
  },
  methods: {
    goEextract(row, event) {
      this.$router.push({ name: 'customer/extract', params: { id: row.index }}); return
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