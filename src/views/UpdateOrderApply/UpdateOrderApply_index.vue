<template>
    <el-container class="UpdateOrderApply">
        <el-row :gutter="20" class="UpdateOrderApply-TitleButton">
            <el-col :span="2" style="text-align: center;">
                <router-link to="./add"><el-button size="mini">新增</el-button></router-link>
            </el-col>
        </el-row>
        
        <el-main class="ac-main flex-1 flex-cloumn pd-10">
            <!-- 表单筛选栏 -->
            <el-form :inline="true" :model="formFilter" class="UpdateOrderApply-from" size="mini">
                <el-form-item label="运单号">
                    <el-input v-model="formFilter.contractId" style="width: 100px"></el-input>
                </el-form-item>
                <el-form-item label="运单状态">
                    <el-select v-model="formFilter.carStatus" placeholder="请选择" style="width: 120px">
                        <el-option label="全部" value="all"></el-option>
                        <el-option label="已调度" value="dispatched"></el-option>
                        <el-option label="已装车" value="loaded"></el-option>
                        <el-option label="已发车" value="started"></el-option>
                        <el-option label="已到货" value="arrivaled"></el-option>
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
                <el-form-item label="发货网点">
                    <el-input v-model="formFilter.site" style="width: 100px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" type="primary" @click="handleClickSearch">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- 表格 -->
            <el-table
                ref="multipleTable"
                :data="tableData"
                size="small"
                border
                show-summary
                style="width: 100%"
                height="400px"
                @row-dblclick="GoEditPage">
                <el-table-column
                    type="selection"
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
        <el-footer style="height: 30px;text-align: center;">
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
    prop: 'prop6'
  },
  {
    label: '开单日期',
    prop: 'startDate',
    width: 200,
    type: 'date'
  },
  {
    label: '运单状态',
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
    label: '发站',
    prop: 'prop2'
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
    prop: 'prop7'
  },
  {
    label: '发货单位',
    prop: 'prop8'
  },
  {
    label: '发货人',
    prop: 'prop9'
  },
  {
    label: '发货人电话',
    prop: 'prop10'
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
}, {
  index: '2',
  contractId: '18004002',
  startDate: '2018-7-19',
  prop1: '已发出',
  prop2: 'B点',
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
  startDate: '2018-7-19',
  prop1: '未发车',
  prop2: 'C点',
  prop3: 'D点',
  prop4: '沪B123456',
  prop5: '19250987908',
  prop6: '张三',
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
      columnSearch: {}
    }
  },
  mounted() {
    const boxHeight = document.querySelector('body').clientHeight
    const buttonBoxHeight = document.querySelector('.UpdateOrderApply-header').clientHeight
    const areaBoxHeight = boxHeight - 84
    document.querySelector('.UpdateOrderApply').style.height = areaBoxHeight + 'px'
    document.querySelector('.el-table__body-wrapper').style.height = areaBoxHeight - 30 - 40 - 90 - buttonBoxHeight + 'px'
    document.querySelector('.el-table__body-wrapper').style.overflowY = 'auto'
  },
  methods: {
    GoEditPage(row, event) {
      this.$router.push({ path: '/UpdateOrderApply/add/' + row.index })
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

<style lang="scss">
.UpdateOrderApply .el-main{padding: 5px 15px 5px 15px}
.UpdateOrderApply-TitleButton{padding: 8px 0px 8px 0px}
.UpdateOrderApply-from{height: 40px;line-height: 40px;}
.cell{white-space: nowrap!important;}
</style>