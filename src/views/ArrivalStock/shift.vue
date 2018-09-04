<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="ArrivalStock">
    <el-header class="ArrivalStock-header" style="height: 80px">
        <el-button style='margin:0 0 5px 0px;' size="mini">保存</el-button>
        <el-button style='margin:0 0 5px 10px;' size="mini">取消</el-button>
        <el-button style='margin:0 0 5px 10px;' size="mini">清空</el-button>
    </el-header>
    <el-main>
            <!-- 表格 -->
            <el-table
                ref="multipleTable"
                :data="tableData"
                size="small"
                border
                show-summary
                style="width: 100%"
                height="400">
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
        <el-footer class="ArrivalStock-footer">
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
    
  </div>
</template>

<script>
import { parseTime } from '@/utils'
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
        prop: 'prop6',
    },
    {
        label: '开单日期',
        prop: 'startDate',
        width: 200,
        type: 'date'
    },
    {
        label: '储位',
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
        label: '品名',
        prop: 'prop7'
    },
    {
        label: '件数',
        prop: 'prop8'
    },
    {
        label: '重量(公斤)',
        prop: 'prop9'
    },
    {
        label: '体积(立方)',
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
}, {
    index: '4',
    contractId: '18004004',
    startDate: '2018-7-19',
    prop1: '未发车',
    prop2: 'H点',
    prop3: 'A点',
    prop4: '沪A123456',
    prop5: '19279085098',
    prop6: '李四',
    prop7: '500',
    prop8: '20',
    prop9: '50'
}]
export default {
    data () {
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
                    this.tableData.shift();
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
            let values = Object.values(this.columnSearch);
            let isEmpty = values.every(value => {
                return typeof value === undefined || value === ''
            }) || values.length === 0

            if (isEmpty) {
                this.columnSearch = {}
                let newData = mockData.slice();
                newData.unshift({
                    isColumnSearch: true
                })
                this.tableData = newData
            }
            
            this.tableData = this.tableData.filter(item => {
                if (item.isColumnSearch) {
                    return true
                }
                for (let key in this.columnSearch) {
                    if (this.columnSearch[key] === '') {
                        // do nothing
                    } else if (this.columnSearch[key] instanceof Date) {
                        let date = new Date(this.columnSearch[key])
                        let formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
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
.cell{white-space: nowrap!important;}
.ArrivalStock .ArrivalStock-header{padding: 8px 15px 8px 15px;}
.ArrivalStock .ArrivalStock-footer{text-align: center;}
.ArrivalStock .el-main{padding: 5px 15px 5px 15px}
</style>

