<template>
    <el-container class="WarehouseBill">
        <el-header style="height:80px;" class="WarehouseBill-header">
            <el-row>
                <el-button type="primary" size="mini" @click="stationSettlement = true">发站结算</el-button>
                <el-button type="primary" size="mini">发站反结算</el-button>
                <el-button type="primary" size="mini" @click="stationAgianSettlement = true">发站二次结算</el-button>
                <el-button type="primary" size="mini">发站二次反结算</el-button>
                <el-button type="primary" size="mini" @click="reachSettlement = true">到站结算</el-button>
                <el-button type="primary" size="mini">到站反结算</el-button>
                <el-button type="primary" size="mini" @click="reachDriverSettlement = true">到站司机结算</el-button>
                <el-button type="primary" size="mini">到站司机反结算</el-button>
            </el-row>
            <el-form :inline="true" :model="formInline" size="mini">
                <el-form-item label="运单号" >
                    <el-input v-model="formInline.user" style="width:80px;line-height:25px;height:25px;"></el-input>
                </el-form-item>
                <el-form-item label="运单日期" >
                    <el-col :span="11">
                        <el-date-picker v-model="formInline.startDate" type="date"  style="width: 100px;"></el-date-picker>
                    </el-col>
                    <el-col :span="2" style="text-align: center;">到</el-col>
                    <el-col :span="11">
                        <el-date-picker v-model="formInline.endDate" type="date" style="width: 100px"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="发站是否结算" >
                    <el-input v-model="formInline.user" style="width:80px;line-height:25px;height:25px;"></el-input>
                </el-form-item>
                <el-form-item label="到站是否结算" >
                    <el-input v-model="formInline.user" style="width:80px;line-height:25px;height:25px;"></el-input>
                </el-form-item>
                <el-form-item label="操作网点" >
                    <el-input v-model="formInline.user" style="width:80px;line-height:25px;height:25px;"></el-input>
                    <el-button type="primary" size="mini">查询</el-button>
                </el-form-item>
            </el-form>
        </el-header>
        <el-main class="">
            <el-table class="WarehouseBillMin" ref="multipleTable" :data="tableData" size="small" border show-summary style="width:100%;">
                <el-table-column type="selection" width="60"></el-table-column>
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
        </el-main>
        <el-footer class="WarehouseBill-footer">
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

<!-- //////////////////////////////////////////////////////////// -->
    <el-dialog title="操作" :visible.sync="stationSettlement" width="30%">
        <el-form ref="form" :model="formInline" label-width="120px">
            <el-form-item label="发站结算日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width:200px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="发站结算人">
                <el-input v-model="formInline.name" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="结算网点">
                <el-input v-model="formInline.name" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="预付进仓费">
                <el-input v-model="formInline.name" style="width:200px;"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="stationSettlement = false">取 消</el-button>
            <el-button type="primary" @click="stationSettlement = false">确 定</el-button>
        </span>
    </el-dialog>
<!-- //////////////////////////////////////////////////////////// -->
    <el-dialog title="操作" :visible.sync="stationAgianSettlement" width="30%">
        <el-form ref="form" :model="formInline" label-width="120px">
            <el-form-item label="二次结算日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width:200px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="二次结算人">
                <el-input v-model="formInline.name" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="结算网点">
                <el-input v-model="formInline.name" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="预付进仓费">
                <el-input v-model="formInline.name" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="实付进仓费">
                <el-input v-model="formInline.name" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="找回">
                <el-input v-model="formInline.name" style="width:200px;"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="stationAgianSettlement = false">取 消</el-button>
            <el-button type="primary" @click="stationAgianSettlement = false">确 定</el-button>
        </span>
    </el-dialog>
<!-- //////////////////////////////////////////////////////////// -->
    <el-dialog title="操作" :visible.sync="reachSettlement" width="30%">
        <el-form ref="form" :model="formInline" label-width="120px">
            <el-form-item label="到站结算日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width:200px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="到站结算人">
                <el-input v-model="formInline.name" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="结算网点">
                <el-input v-model="formInline.name" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="预付进仓费">
                <el-input v-model="formInline.name" style="width:200px;"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="reachSettlement = false">取 消</el-button>
            <el-button type="primary" @click="reachSettlement = false">确 定</el-button>
        </span>
    </el-dialog>
<!-- //////////////////////////////////////////////////////////// -->
    <el-dialog title="操作" :visible.sync="reachDriverSettlement" width="30%">
        <el-form ref="form" :model="formInline" label-width="120px">
            <el-form-item label="司机结算日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width:200px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="到站司机结算人">
                <el-input v-model="formInline.name" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="结算网点">
                <el-input v-model="formInline.name" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="实付进仓费">
                <el-input v-model="formInline.name" style="width:200px;"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="reachDriverSettlement = false">取 消</el-button>
            <el-button type="primary" @click="reachDriverSettlement = false">确 定</el-button>
        </span>
    </el-dialog>
<!-- //////////////////////////////////////////////////////////// -->
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
export default {
  data() {
    return {
      stationSettlement: false,
      stationAgianSettlement: false,
      reachSettlement: false,
      reachDriverSettlement: false,
      currentTab: 0,
      formInline: {
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
    const buttonBoxHeight = document.querySelector('.WarehouseBill-header').clientHeight
    document.querySelector('.WarehouseBill-footer').style.height = '30px'
    const areaBoxHeight = boxHeight - 90
    document.querySelector('.WarehouseBill').style.height = areaBoxHeight + 'px'
    document.querySelector('.el-table__body-wrapper').style.height = areaBoxHeight - 20 - 90 - 50 - buttonBoxHeight + 'px'
    document.querySelector('.el-table__body-wrapper').style.overflowY = 'auto'
  },
  methods: {
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
.WarehouseBill .WarehouseBill-header{padding: 8px 15px 8px 15px}
.WarehouseBill .el-main{padding: 15px;height: 100%}
.WarehouseBill .WarehouseBill-footer{text-align: center;}
.cell{white-space: nowrap!important;}
.WarehouseBill .el-input--suffix .WarehouseBill .el-input__inner{padding-left: 25px;padding-right: 2px}
</style>