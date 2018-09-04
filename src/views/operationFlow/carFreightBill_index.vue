<template>
    <el-container class="CarFreightBill">
        <el-header class="CarFreightBill-header" style="height:200px;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-bottom: 8px">
                <el-button-group>
                    <el-button type="primary" @click="addComanyInfo" size="mini">结算</el-button>
                    <el-select  v-model="formInline.print"   placeholder="打印">
                        <el-option label="打印" value="1"></el-option>
                        <el-option label="打印盘点单" value="2"></el-option>
                    </el-select>
                    <el-button class="page-btn-group" size="mini"  >上传附件</el-button>
                </el-button-group>
            </el-form>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-button-group>
                    <el-button type="primary" size="mini">全部</el-button>
                    <el-button type="primary" size="mini">现付</el-button>
                    <el-button type="primary" size="mini">到付</el-button>
                    <el-button type="primary" size="mini">回付</el-button>
                    <el-button type="primary" size="mini">油卡</el-button>
                    <el-button type="primary" size="mini">封布费</el-button>
                    <el-button type="primary" size="mini">保险费</el-button>
                    <el-button type="primary" size="mini">装卸费</el-button>
                    <el-button type="primary" size="mini">落地费</el-button>
                    <el-button type="primary" size="mini">其他</el-button>
                </el-button-group>
            </el-form>
            
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-col :span="4">
                    <el-form-item label="网点" >
                        <el-input v-model="formInline.user" style="width:80px;line-height:25px;height:25px;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="发车日期" >
                        <el-col :span="11">
                            <el-date-picker v-model="formInline.startDate" type="date"  style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col :span="2" class="ac-line">到</el-col>
                        <el-col :span="11">
                            <el-date-picker v-model="formInline.endDate" type="date" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="结算方" >
                        <el-input v-model="formInline.user" style="width:80px;line-height:25px;height:25px;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="发货网点" >
                        <el-input v-model="formInline.user" style="width:80px;line-height:25px;height:25px;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="卸货网点" >
                        <el-input v-model="formInline.user" style="width:80px;line-height:25px;height:25px;"></el-input>
                        <el-button type="primary" size="mini">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-form>

        

            <template>
            <el-checkbox  v-model="checkAll" @change="handleCheckAllChange" style="float: left; margin-right: 30px;">全选</el-checkbox>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
            </template>

            <el-row :gutter="20">
                <el-form size="small" :inline="true"  class="form-wrapper">
                    <el-col :span="12">
                        <el-form-item label="快速增加">
                            <el-input v-model="formInline_so.numberLeft" @keyup.enter.native="WaybillSelectInputLeft"  style="width:80px;"   ></el-input>
                        </el-form-item>
                        <el-button icon="el-icon-arrow-right"  @click="leftitem"   type="text"></el-button>
                        <el-button icon="el-icon-d-arrow-right" @click="leftall"   type="text" ></el-button>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="快速删除">
                            <el-input  v-model="formInline_so.numberRight" @keyup.enter.native="WaybillSelectInputRight"   style="width:80px;" ></el-input>
                        </el-form-item>
                        <el-button icon="el-icon-arrow-left" @click="rightitem"   type="text" ></el-button>
                        <el-button icon="el-icon-d-arrow-left" @click="rightall"   type="text"  ></el-button>
                    </el-col>
                </el-form>
            </el-row>
        </el-header>

        <el-main >
            <el-col :span="12" class="carFreightBillMin">
                <!-- 表格 -->
                <el-table ref="multipleTable" :data="tableData" size="small"  @selection-change='handleCurrentChange_tab1' border show-summary >
                    <el-table-column type="selection" width="60"></el-table-column>
                    <el-table-column sortable v-for="item in tableColumns" v-if="choosenColumns.indexOf(item.label) > -1" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
                    <template slot-scope="scope">
                        <div v-if="scope.$index === 0 && openColumnSearch">
                                <el-date-picker v-if="item.type==='date'" v-model="columnSearch[scope.column.property]" size="mini" type="date" style="width:100%;" @change="handleColumnSearch"></el-date-picker>
                                <el-select v-else-if="item.type==='select'" v-model="columnSearch[scope.column.property]" size="mini" placeholder="请选择" @change="handleColumnSearch">
                                    <el-option v-for="s in item.selectOptions" :key="s.value" :label="s.label" :value="s.value"></el-option>
                                </el-select>
                            <el-input   v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch"></el-input>
                        </div>
                        <span v-else>{{ scope.row[scope.column.property] }}</span>
                    </template>
                    </el-table-column>
                </el-table>

                <el-footer class="CarFreightBill-footer" style="height: 30px">
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
            </el-col>


            <el-col :span="12" class="carFreightBillMin carFreightBillMin_to">
                 <!-- 表格 -->
                <el-table ref="multipleTable_to" :data="tableData_to"  @selection-change='handleCurrentChange_tab3' size="small" border show-summary >
                    <el-table-column type="selection" width="60"></el-table-column>
                    <el-table-column sortable v-for="item in tableColumns_to" v-if="choosenColumns_to.indexOf(item.label) > -1" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
                    <template slot-scope="scope">
                        <div v-if="scope.$index === 0 && openColumnSearch_to">
                                <el-date-picker v-if="item.type==='date'" v-model="columnSearch_to[scope.column.property]" size="mini" type="date" style="width:100%;" @change="handleColumnSearch_to"></el-date-picker>
                                <el-select v-else-if="item.type==='select'" v-model="columnSearch_to[scope.column.property]" size="mini" placeholder="请选择" @change="handleColumnSearch_to">
                                    <el-option v-for="s in item.selectOptions" :key="s.value" :label="s.label" :value="s.value"></el-option>
                                </el-select>
                            <el-input   v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch_to"></el-input>
                        </div>
                        <span v-else>{{ scope.row[scope.column.property] }}</span>
                    </template>
                    </el-table-column>
                </el-table>

                <el-footer class="CarFreightBill-footer" style="height: 30px">
                    <el-col :span="24">
                        <el-button type="text" size="mini" @click="dialogChooseColumnVisible_to = true">列选择</el-button>
                        <el-button type="text" size="mini" @click="toggleColumnSearch_to">列搜索</el-button>
                        <el-button type="text" size="mini">导出</el-button>
                    </el-col>
                </el-footer>
                <el-dialog :visible.sync="dialogChooseColumnVisible_to" title="列选择">
                    <el-checkbox-group v-model="choosenColumns_to" class="ac-checkbox-group flex-cloumn">
                    <el-checkbox v-for="column in tableColumns_to" :label="column.label" :key="column.label">{{column.label}}</el-checkbox>
                    </el-checkbox-group>
                </el-dialog>
            </el-col>

                
               
        </el-main>
         <el-dialog title="新增结算单" :visible.sync="dialogFormVisible" width="80%">
            <div class="clearfix">
                <!-- <el-button type="primary" @click="addComanyInfo1" v-if="isShow" size="mini">新增</el-button> -->
                <!-- <el-button type="primary" @click="updateInfo1" v-if="isShow"  size="mini">修改</el-button> -->
                <el-button type="danger" @click="saveInfo1" size="mini" >保存</el-button>
                <el-button type="primary" @click="cancelInfo1"  size="mini">取消</el-button>
                 <el-select v-model="print_js"   placeholder="打印">
                 <el-option
                            v-for="item in opt"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                 </el-select>
                <!-- <el-button type="primary" @click="deleteCompany1" v-if="isShow"  size="mini">删除</el-button> -->
           
          
           
            </div>
            <div class="clearfix materielInfo">
                <el-form :inline="true"     :model="v" class="demo-form-inline">
                    <el-form-item label="结算网点" size="mini" >
                        <el-input v-model.trim="v.adds"   :disabled="true" ></el-input>
                    </el-form-item>
                    <el-form-item label="结算单号" size="mini" >
                        <el-input v-model.trim="v.order_no"   :disabled="true" ></el-input>
                    </el-form-item>
                     <el-form-item label="结算日期" size="mini"  >
                        <el-date-picker
                        v-model="v.expiredate"
                        type="datetime"
                          >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结算对象" size="mini"   >
                        <el-input v-model.trim="v.obj"  placeholder=""></el-input>
                    </el-form-item>

                    <el-form-item label="一级科目" size="mini"   >
                        <el-input v-model.trim="v.km1"  placeholder=""></el-input>
                    </el-form-item>
      
                    <el-form-item label="二级科目" size="mini"   >
                        <el-input v-model.trim="v.km2"  placeholder=""></el-input>
                    </el-form-item>

                    <el-form-item label="三级科目" size="mini"   >
                        <el-input v-model.trim="v.km3"  placeholder=""></el-input>
                    </el-form-item>

                    <el-form-item label="四级科目" size="mini"  >
                        <el-input v-model.trim="v.km4"  placeholder=""></el-input>
                    </el-form-item>


                    <el-form-item label="应收金额" size="mini"   >
                        <el-input v-model.trim="v.price"  placeholder="" :disabled="true" ></el-input>
                    </el-form-item>


                    <el-form-item label="结算金额" size="mini"  >
                        <el-input v-model.trim="v.sprice"  placeholder="" :disabled="true" ></el-input>
                    </el-form-item>

                    <el-form-item label="实结金额" size="mini"  >
                        <el-input v-model.trim="v.tprice"  placeholder="" :disabled="true" ></el-input>
                    </el-form-item>
                    
<br>
                    <el-form-item label="已结金额" size="mini"  >
                        <el-input v-model.trim="v.yprice"  placeholder="" :disabled="true" ></el-input>
                    </el-form-item>


                    <el-form-item label="余额" size="mini"  >
                        <el-input v-model.trim="v.balance"  placeholder="" :disabled="true" ></el-input>
                    </el-form-item>
 
              
                </el-form>
  <el-tabs  type="card" @tab-click="pay">
    <el-tab-pane label="收支方式"   ></el-tab-pane>
    <el-tab-pane  label="费用明细" ></el-tab-pane>
  </el-tabs>

            <div v-if="tab_show==0">
                <el-table
                    class="table"
                    ref="multipleTable4"
                    :data="tableData4"
                    height="100%"
                    max-height="100%"
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
                          <el-option label="元/件" value="1"></el-option>
                          <el-option label="元/吨" value="2"></el-option>
                          <el-option label="元/方" value="3"></el-option>
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
             
            </div>
            <div v-if="tab_show==1">
                <el-table
                    class="table"
                    key='tableData5'
                    ref="multipleTable5"
                    :data='tableData5'
                    height="100%"
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
             
            </div>
            </div>
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
    prop: 'prop1'
  },
  {
    label: '结算金额',
    prop: 'prop11'
  },
  {
    label: '现付',
    prop: 'prop2'
  },
  {
    label: '到付',
    prop: 'prop3'
  },
  {
    label: '回付',
    prop: 'prop4'
  },
  {
    label: '油卡',
    prop: 'prop5'
  },
  {
    label: '封布费',
    prop: 'prop6'
  },
  {
    label: '保险费',
    prop: 'prop7'
  },
  {
    label: '装卸费',
    prop: 'prop8'
  },
  {
    label: '落地费',
    prop: 'prop9'
  },
  {
    label: '其他',
    prop: 'prop10'
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
    prop: 'prop11'
  },
  {
    label: '现付',
    prop: 'prop2'
  },
  {
    label: '到付',
    prop: 'prop3'
  },
  {
    label: '回付',
    prop: 'prop4'
  },
  {
    label: '油卡',
    prop: 'prop5'
  },
  {
    label: '封布费',
    prop: 'prop6'
  },
  {
    label: '保险费',
    prop: 'prop7'
  },
  {
    label: '装卸费',
    prop: 'prop8'
  },
  {
    label: '落地费',
    prop: 'prop9'
  },
  {
    label: '其他',
    prop: 'prop10'
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
  price: '10'
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
  price: '20'
}]

const mockData_to = []
const cityOptions = ['现付', '到付', '回付', '油卡', '封布费', '保险费', '装卸费', '落地费', '其他']
export default {
  data() {
    return {
      formInline_so: { numberLeft: '', numberRight: '' }, // 表单
      print: '',
      opt: [
        {
          label: '行操作',
          value: '1'
        },
        {
          label: '行删除',
          value: '2'
        },
        {
          label: '行新增',
          value: '3'
        },
        {
          label: '行上移',
          value: '4'
        },
        {
          label: '行下移',
          value: '5'
        }
      ],
      print_js: '',
      tab_show: 0,
      v: {
        balance: 0,
        yprice: 0,
        sprice: 0,
        tprice: 0,
        price: 0,
        obj: '',
        km1: '',
        km2: '',
        km3: '',
        km4: '',
        expiredate: '',
        order_no: '',
        adds: ''
      },
      tableData4: [],
      tableData5: [],
      dialogFormVisible: false,
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,

      printOption: '',
      currentTab: 0,
      formInline: {
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
  mounted: function() {
    this.$nextTick(function() {
      const boxHeight = document.querySelector('body').clientHeight
      const top = document.querySelector('.CarFreightBill-header').clientHeight

      const areaBoxHeight = boxHeight - top - 30
      document.querySelector('.CarFreightBill-footer').style.height = '30px'
      document.querySelector('.carFreightBillMin').style.height = areaBoxHeight - 100 + 'px'
      document.querySelector('.carFreightBillMin_to').style.height = areaBoxHeight - 100 + 'px'

      document.querySelector('.carFreightBillMin .el-table__body-wrapper').style.height = areaBoxHeight - 180 - 25 + 'px'
      document.querySelector('.carFreightBillMin .el-table__body-wrapper').style.overflowY = 'auto'

      document.querySelector('.carFreightBillMin_to .el-table__body-wrapper').style.height = areaBoxHeight - 180 - 25 + 'px'
      document.querySelector('.carFreightBillMin_to .el-table__body-wrapper').style.overflowY = 'auto'
    })
  },
  methods: {
    WaybillSelectInputLeft() {
      const arr = new Array()
      this.tableData.forEach((item, index) => {
        if (item.prop1 == this.formInline_so.numberLeft) {
          this.tableData_to.push(item)
        } else {
          arr.push(item)
        }
      })

      this.tableData = arr
    },
    WaybillSelectInputRight() {
      const arr = new Array()
      this.tableData_to.forEach((item, index) => {
        if (item.prop1 == this.formInline_so.numberRight) {
          this.tableData.push(item)
        } else {
          arr.push(item)
        }
      })

      this.tableData_to = arr
    },
    saveInfo1() {},
    ListOperation() {
      const item = { price: 0 }

      this.tableData4.push(item)
    },
    cancelInfo1() { // 取消操作
      this.dialogFormVisible = false
    },
    handleChange(index, item) {
      this.tableData4[index].price = item.price
      this.v.sprice = 0
      this.tableData4.forEach((item) => {
        this.v.sprice += parseInt(item.price)
      })
    },
    pay(tab, event) {
      this.tab_show = tab.index
    },
    addComanyInfo() { // 新增
      if (this.tableData_to.length > 0) {
        this.dialogFormVisible = true
        this.tableData4 = this.tableData_to
        this.tableData5 = this.tableData_to
        this.tableData_to.forEach((item) => {
          this.v.sprice += parseInt(item.price)
          this.v.price += parseInt(item.price)
        })
      } else {
        this.$alert('请选记录', '', {
          confirmButtonText: '确定'
        })
        return false
      }
    },
    handleCurrentChange_tab3(val) {
      this.tab3_listSelection = val
    },
    handleCurrentChange_tab1(val) {
      this.tab1_listSelection = val
    },
    leftall() {
      const _index = -1
      this.tableData.forEach((item, index) => {
        this.tableData_to.push(item)
      })
      this.tableData_to.sort()
      if (this.tableData_to) {
        this.tableData_to.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, true)
        })
      }
      this.tableData = []
    },
    leftitem() {
      if (this.tab1_listSelection == undefined) {
        return
      }
      const toitem = this.tab1_listSelection
      let _index = -1
      if (toitem.length > 0) {
        this.tab1_listSelection.forEach((item, index) => {
          _index = this.tableData.indexOf(item)
          this.tableData.splice(_index, 1)
          this.tableData_to.push(item)
        })
        this.tableData_to.sort()
        if (this.tableData_to) {
          this.tableData_to.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row, true)
          })
        }
      }
    },
    rightall() {
      this.tableData_to.forEach((item, index) => {
        this.tableData.push(item)
      })
      this.tableData_to = []
      this.tableData.sort()
      if (this.tableData_to) {
        this.tableData_to.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, true)
        })
      }
    },
    rightitem() {
      if (this.tab3_listSelection == undefined) {
        return
      }
      const toitem = this.tab3_listSelection
      let _index = -1
      if (toitem.length > 0) {
        this.tab3_listSelection.forEach((item, index) => {
          _index = this.tableData_to.indexOf(item)
          this.tableData_to.splice(_index, 1)
          this.tableData.push(item)
        })
        this.tableData.sort()
        if (this.tableData_to) {
          this.tableData_to.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row, true)
          })
        }
      }
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
      if (this.checkedCities.length <= 0) {
        this.choosenColumns = [...this.tableColumns.map(column => column.label)]
      } else {
        this.choosenColumns = this.checkedCities
      }
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
      if (this.checkedCities.length <= 0) {
        this.choosenColumns = [...this.tableColumns.map(column => column.label)]
      } else {
        this.choosenColumns = this.checkedCities
      }
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
        this.columnSearch = {}
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
    // 进行列查询
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
.carFreightBillMin{
    border:1px solid #ccc;padding:5px;}
.carFreightBillMin .el-table--small td, .carFreightBillMin .el-table--small th{
    padding: 0px;
}
.demo-form-inline .el-form-item__label{padding-right: 1px}
.demo-form-inline .el-input--medium .el-input__inner{
    width:80px;height:25px;line-height: 25px;
}
.CarFreightBill-footer{text-align: center;}
.cell{
     white-space: nowrap!important;
 }

</style>