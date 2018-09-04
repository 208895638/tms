<template>
    <div class="box">
       <el-row class="buttonBox clearfix">
            <div class="clearfix">
                <el-button type="primary" @click="addComanyInfo" size="mini">新增</el-button>
                <el-button type="primary" @click="deleteCompany" size="mini">删除</el-button>
                <el-button type="primary" @click="importFile" size="mini">批量导入</el-button>
                <!-- <el-select v-model="printValue" size="small" placeholder="请选择" class="r">
                    <el-option
                    v-for="item in print"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select> -->
            </div>
            <div>
                <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
                    <el-form-item label="所属公司" size="mini">
                        <el-select clearable v-model="customerSelected" filterable placeholder="请选择" @change="selectCustomer">
                             <el-option
                            v-for="item in customerList"
                            :key="item.value"
                            :label="item.Org_name"
                            :value="item.Org_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="车牌号" size="mini">
                        <el-input v-model="searchCondition.code" placeholder="请输入承运商名称"></el-input>
                    </el-form-item>
                    <el-form-item clearable label="车辆属性" size="mini">
                        <el-select v-model="vehicleType" filterable placeholder="请选择" @change="selectVehicleType">
                            <el-option
                            v-for="item in vehicleTypeList"
                            :key="item.value"
                            :label="item.vehicle_property_name"
                            :value="item.vehicle_property_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="车头车挂" size="mini">
                        <el-select clearable v-model="vehicle1" filterable placeholder="请选择" @change="vehicleSelect">
                            <el-option
                            v-for="item in vehicle"
                            :key="item.value"
                            :label="item.vehicle_tractortrailer_name"
                            :value="item.vehicle_tractortrailer_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item size="mini">
                        <el-button type="primary" @click="searchResult">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-row>
        <div class="searchCondition">
            <el-scrollbar class="tableWraper"  wrapClass="scrollbar-wrapper">
                <el-table
                    class="table"
                    ref="multipleTable"
                    :data="tableData3"
                    height="100%"
                    max-height="100%"
                    tooltip-effect="dark"
                    size="mini"
                    style="width: 100%"
                    :summary-method="aa"
                    show-summary
                    border
                    
                    @select = "checkbox"
                    @select-all = "checkboxAll"
                    @cell-dblclick="doubleEvents"
                    @selection-change="handleSelectionChange">

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
                        prop="Org_name"
                        label="所属公司"
                        class-name="el-tooltip"
                        :header-cell-class-name="tableheaderClassName"
                        :show-overflow-tooltip="true"
                        width="120">
                    </el-table-column>

                    <el-table-column
                        sortable
                        prop="v.vehicle_platenumber"
                        label="车牌号"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                       sortable
                        prop="vp.vehicle_property_name"
                        label="车辆属性" 
                        :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column
                       sortable
                        prop="vt.vehicle_tractortrailer_name"
                        label="车头车挂"
                        :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column
                        sortable
                        prop="carrier_name"
                        label="所属承运商"
                        :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column
                       sortable
                        prop="v.vehicle_registration"
                        label="车挂号"
                        :show-overflow-tooltip="true">
                    </el-table-column>


                    <el-table-column
                        sortable
                        prop="v.driver_name"
                        label="主驾驶员"
                        :show-overflow-tooltip="true">
                    </el-table-column>


                    <el-table-column
                        sortable
                        prop="v.driver_phone"
                        label="主驾驶员联系方式"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    

                    <el-table-column
                        sortable
                        prop="v.driver_idcard"
                        label="主驾驶员身份证号"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        prop="v.owner_name"
                        label="车主"
                        :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column
                        sortable
                        prop="v.owner_phone"
                        label="车主联系方式"
                        :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column
                        sortable
                        prop="v.owner_idcard"
                        label="车主身份证号"
                        :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column
                        sortable
                        prop="vty.vehicle_type_name"
                        label="车辆类型"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        prop="v.vehicle_length"
                        label="车长(米)"
                        :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column
                        sortable
                        prop="v.vehicle_width"
                        label="车宽(米)"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        prop="v.vehicle_height"
                        label="车高(米)"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        prop="v.vehicle_volume"
                        label="承载体积（立方）"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        prop="v.vehicle_weight"
                        label="载重（吨）"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        prop="v.vehicle_brand"
                        label="品牌"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        prop="v.vehicle_color"
                        label="车辆颜色"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        prop="v.purchace_date"
                        label="购买日期"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    

                    <el-table-column
                        sortable
                        prop="v.vehicle_identificationnumber"
                        label="车架号"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        prop="v.vehicle_enginenumber"
                        label="发动机号"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        prop="v.vehicle_transportlicense"
                        label="道路运输证号"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        prop="vpl.vehicle_platetype_name"
                        label="牌照类型"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        prop="v.vehicle_operationlicense"
                        label="营运证号"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        prop="v.vehicle_roadticket"
                        label="养路票号"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        prop="v.vehicle_insurance"
                        label="保险单号"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        prop="v.insurance_expiredate"
                        label="保险到期时间"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        prop="v.insurance_company"
                        label="承保单位"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        prop="v.annual_inspection"
                        label="年检到期时间"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                   
                </el-table>
                
            </el-scrollbar>
            <div class="clearfix d-flex justify-content-center">
                <span type="primary" @click="search" class="l searchBtn" size="mini">搜索</span>
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
            </div>
        </div>
        <el-dialog title="车辆详情" :visible.sync="dialogFormVisible">
            <div class="clearfix">
                <!-- <el-button type="primary" @click="addComanyInfo1" v-if="isShow" size="mini">新增</el-button> -->
                <el-button type="primary" @click="updateInfo1" v-if="isShow"  size="mini">修改</el-button>
                <el-button type="danger" @click="saveInfo1" size="mini" v-if="saveShow1">保存</el-button>
                <el-button type="primary" @click="cancelInfo1" v-if="isShow" size="mini">取消</el-button>
                <el-button type="primary" @click="deleteCompany1" v-if="isShow"  size="mini">删除</el-button>
            </div>
            <div class="clearfix materielInfo">
                <el-form :inline="true" label-width="106px" :disabled = "isDisabled1" :model="areaInfo1" class="demo-form-inline">
                    <el-form-item label="车牌号" size="mini" :required = "required1" >
                        <el-input type="number" @blur="checkCodeAndName" v-model.trim="areaInfo1.vehicle_platenumber"  placeholder="请输入车牌号"></el-input>
                    </el-form-item>
                    <el-form-item label="车辆属性" size="mini">
                        <el-select v-model="areaInfo1.vehicleType" filterable placeholder="请选择" @change="selectVehicleType">
                            <el-option
                            v-for="item in vehicleTypeList"
                            :key="item.value"
                            :label="item.vehicle_property_name"
                            :value="item.vehicle_property_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="车头车挂" size="mini">
                        <el-select v-model="areaInfo1.vehicle1" filterable placeholder="请选择" @change="vehicleSelect">
                            <el-option
                            v-for="item in vehicle"
                            :key="item.value"
                            :label="item.vehicle_tractortrailer_name"
                            :value="item.vehicle_tractortrailer_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="所属承运商" size="mini"  >
                        <el-input v-model.trim="areaInfo1.carrier_id"  placeholder="请输入车辆属性"></el-input>
                    </el-form-item> -->
                    <el-form-item label="所属承运商" size="mini">
                        <el-select v-model="areaInfo1.carrier_id" filterable placeholder="请选择承运商" @change="vehicleSelect">
                            <el-option
                            v-for="item in carrier"
                            :key="item.value"
                            :label="item.metadata_carrier.carrier_name"
                            :value="item.metadata_carrier.carrier_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="车挂号" size="mini"  >
                        <el-input v-model.trim="areaInfo1.vehicle_registration"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="主驾驶员" size="mini"  >
                        <el-input v-model.trim="areaInfo1.driver_name"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="主驾驶员联系方式" size="mini"  >
                        <el-input type="number" v-model.trim="areaInfo1.driver_phone"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="主驾驶员身份证号" size="mini"  >
                        <el-input type="number" v-model.trim="areaInfo1.driver_idcard"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="车主" size="mini"  >
                        <el-input v-model.trim="areaInfo1.owner_name"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="车主联系方式" size="mini"  >
                        <el-input type="number" v-model.trim="areaInfo1.owner_phone"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="车主身份证号" size="mini"  >
                        <el-input type="number" v-model.trim="areaInfo1.owner_idcard"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="所属公司" size="mini"  >
                        <el-input v-model.trim="areaInfo1.org_id"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item> -->
                    <el-form-item label="所属公司" size="mini">
                        <el-select v-model="areaInfo1.org_id" filterable placeholder="请选择" @change="selectCustomer">
                            <el-option
                            v-for="item in customerList"
                            :key="item.value"
                            :label="item.Org_name"
                            :value="item.Org_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="车辆类型" size="mini">
                        <el-select v-model="areaInfo1.vehicle_type_id" filterable placeholder="请选择" @change="vehicleSelect">
                            <el-option
                            v-for="item in maskVehicleType"
                            :key="item.value"
                            :label="item.vehicle_type_name"
                            :value="item.vehicle_type_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="车长(米)" size="mini"  >
                        <el-input type="number" v-model.trim="areaInfo1.vehicle_length"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="车宽(米)" size="mini"  >
                        <el-input type="number" v-model.trim="areaInfo1.vehicle_width"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="车高(米)" size="mini"  >
                        <el-input type="number" v-model.trim="areaInfo1.vehicle_height"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="承载体积（立方）" size="mini"  >
                        <el-input type="number" v-model.trim="areaInfo1.vehicle_volume"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="载重（吨）" size="mini"  >
                        <el-input type="number" v-model.trim="areaInfo1.vehicle_weight"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌" size="mini"  >
                        <el-input v-model.trim="areaInfo1.vehicle_brand"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="车辆颜色" size="mini"  >
                        <el-input v-model.trim="areaInfo1.vehicle_color"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>

                    <el-form-item label="购买日期" size="mini"  >
                        <el-date-picker
                        v-model="areaInfo1.purchace_date"
                        type="date"
                         format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择购买日期">
                        </el-date-picker>
                    </el-form-item>
                     
                    <el-form-item label="车架号" size="mini"  >
                        <el-input v-model.trim="areaInfo1.vehicle_identificationnumber"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="发动机号" size="mini"  >
                        <el-input v-model.trim="areaInfo1.vehicle_enginenumber"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="道路运输证号" size="mini"  >
                        <el-input v-model.trim="areaInfo1.vehicle_transportlicense"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="牌照类型" size="mini">
                        <el-select v-model="areaInfo1.vehicle_platetype_id" filterable placeholder="请选择" @change="vehicleSelect">
                            <el-option
                            v-for="item in LicensePlate"
                            :key="item.value"
                            :label="item.vehicle_platetype_name"
                            :value="item.vehicle_platetype_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="营运证号" size="mini"  >
                        <el-input v-model.trim="areaInfo1.vehicle_operationlicense"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="养路票号" size="mini"  >
                        <el-input v-model.trim="areaInfo1.vehicle_roadticket"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="保险单号" size="mini"  >
                        <el-input v-model.trim="areaInfo1.vehicle_insurance"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="保险到期时间" size="mini"  >
                        <el-input v-model.trim="areaInfo1.insurance_expiredate"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item> -->
                    <el-form-item label="保险到期时间" size="mini"  >
                        <el-date-picker
                        v-model="areaInfo1.insurance_expiredate"
                        type="date"
                         format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                        placeholder="请选择保险到期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="承保单位" size="mini"  >
                        <el-input v-model.trim="areaInfo1.insurance_company"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="年检到期时间" size="mini"  >
                        <el-input v-model.trim="areaInfo1.annual_inspection"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item> -->

                    <el-form-item label="年检到期时间" size="mini"  >
                        <el-date-picker
                        v-model="areaInfo1.annual_inspection"
                        type="date"
                         format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择年检到期时间">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
import url from '@/js/common.js'
import storage from '@/js/localstorage.js'

export default {
  data() {
    return {
      printValue: '',
      print: [
        {
          label: '打印1',
          value: '1'
        },
        {
          label: '打印2',
          value: '2'
        },
        {
          label: '打印3',
          value: '3'
        }
      ],
      searchCondition: {
        user: '',
        code: '',
        name: ''
      },
      customerSelected: '',
      vehicleType: '',
      vehicle1: '',
      customerList: [

      ],
      vehicleTypeList: [],
      vehicle: [],
      tableData3: [
        {
          carrier_id: '1',
          carrier_code: '1',
          carrier_name: '1',
          contact_name: '1',
          contact_phone: '1',
          carrier_province: '1',
          carrier_city: '1',
          carrier_district: '1',
          carrier_address: '1',
          wechat_account: '1',
          alipay_account: '1',
          deposit_bank: '1',
          deposit_holder: '1',
          deposit_account: '1',
          invoice_taxrate: '1',
          org_id: '1',
          city: '1',
          area: '1',
          areaInfo: '1'
        }
      ],
      pageSize: 10,
      currentPage: 1,
      materielSize: 0,
      dialogFormVisible: false,
      areaInfo1: {
        vehicle_id: '',
        vehicle_platenumber: '',
        vehicleType: 1,
        vehicle1: 1,
        carrier_id: '',
        vehicle_registration: '',
        driver_name: '',
        driver_phone: '',
        driver_idcard: '',
        owner_name: '',
        owner_phone: '',
        owner_idcard: '',
        org_id: '',
        vehicle_type_id: '',
        vehicle_length: '',
        vehicle_width: '',
        vehicle_height: '',
        vehicle_volume: '',
        vehicle_weight: '',
        vehicle_brand: '',
        vehicle_color: '',
        purchace_date: '',
        vehicle_identificationnumber: '',
        vehicle_enginenumber: '',
        vehicle_transportlicense: '',
        vehicle_platetype_id: '',
        vehicle_operationlicense: '',
        vehicle_roadticket: '',
        vehicle_insurance: '',
        insurance_expiredate: '',
        insurance_company: '',
        annual_inspection: ''
      },
      required1: true,
      isDisabled1: true,
      isShow: false,
      saveShow1: false,
      Create_Org_ID: '',
      Create_User_ID: '',
      newAdd: false,
      selectProvinceId: '',
      selectCityId: '',
      selectAreaId: '',
      checkboxSelected: '',
      maskVehicleType: '',
      LicensePlate: '',
      tableH: '',
      allCompanyInfo: '',
      isCode: false,
      isName: false,
      oldCode: '',
      oldName: '',
      carrier: '',
      customerList1: ''
    }
  },
  methods: {
    aa(val) {
      // return [1,2]
      const { columns, data } = val
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        if (index === 1) {
          sums[index] = '个数'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    },
    tableheaderClassName({ row, rowIndex }) {
      return 'el-tooltip'
    },
    addComanyInfo() { // 新增
      this.dialogFormVisible = true
      this.isShow = false
      this.saveShow1 = true
      let date = new Date(), _this = this
      this.isDisabled1 = false
      this.newAdd = false

      // 点击新增 先清空操作
      this.areaInfo1.vehicle_id = ''
      this.areaInfo1.vehicle_platenumber = ''
      this.areaInfo1.vehicleType = 1
      this.areaInfo1.vehicle1 = 1
      this.areaInfo1.carrier_id = ''
      this.areaInfo1.vehicle_registration = ''
      this.areaInfo1.driver_name = ''
      this.areaInfo1.driver_phone = ''
      this.areaInfo1.driver_idcard = ''
      this.areaInfo1.owner_name = ''
      this.areaInfo1.owner_phone = ''
      this.areaInfo1.owner_idcard = ''
      this.areaInfo1.org_id = ''
      this.areaInfo1.vehicle_type_id = ''
      this.areaInfo1.vehicle_length = ''
      this.areaInfo1.vehicle_width = ''
      this.areaInfo1.vehicle_height = ''
      this.areaInfo1.vehicle_volume = ''
      this.areaInfo1.vehicle_weight = ''
      this.areaInfo1.vehicle_brand = ''
      this.areaInfo1.vehicle_color = ''
      this.areaInfo1.purchace_date = ''
      this.areaInfo1.vehicle_identificationnumber = ''
      this.areaInfo1.vehicle_enginenumber = ''
      this.areaInfo1.vehicle_transportlicense = ''
      this.areaInfo1.vehicle_platetype_id = ''
      this.areaInfo1.vehicle_operationlicense = ''
      this.areaInfo1.vehicle_roadticket = ''
      this.areaInfo1.vehicle_insurance = ''
      this.areaInfo1.insurance_expiredate = ''
      this.areaInfo1.insurance_company = ''
      this.areaInfo1.annual_inspection = ''
    },
    deleteCompany() { // 删除
      const _this = this
      if (this.checkboxSelected == '' || this.checkboxSelected == null) {
        _this.$message.error('请先勾选才能进行删除操作!')
      } else {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(url.apiUrl() + '/api/Vehicle/VehicleDel?vehicle_id=' + this.checkboxSelected)
            .then(function(val) {
              if (val.data.error == '') {
                _this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                _this.init()
                _this.checkboxSelected = ''
              } else {
                _this.$message.error(val.data.error)
              }
            })
            .catch(function(data) {
              _this.$message.error('获取数据失败,请稍后再试11!')
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        })
      }
    },
    importFile() { // 批量导入
      this.$message({
        message: '暂未开放',
        type: 'warning'
      })
    },
    selectCustomer(value) { // 所属公司下拉操作
      console.log(value, this.customerSelected)
    },
    selectVehicleType(value) {
      console.log(value, this.customerSelected)
    },
    vehicleSelect(value) {
      console.log(value, this.customerSelected)
    },
    searchResult() { // 查询操作
      this.init()
    },
    getCarrier() { // 获取承运商
      const _this = this, data = {
        org_id: '',
        carrier_name: '',
        contact_name: '',
        Page: 1,
        Rows: 100
      }
      axios.post(url.apiUrl() + '/api/Carrier/CarrierList', data)
        .then(function(val) {
          if (val.data.error == '') {
            console.log(val)
            _this.carrier = val.data.data.rows
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error('获取数据失败,请稍后再试11!')
        })
    },
    getVehicleType() { // 获取车辆属性下拉框列表
      const _this = this
      axios.post(url.apiUrl() + '/api/Vehicle/metadata_Vehicle_Properties')
        .then(function(val) {
          if (val.data.error == '') {
            _this.vehicleTypeList = val.data.data
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error('获取数据失败,请稍后再试11!')
        })
    },
    getVehicle() { // 获取车头车挂列表
      const _this = this
      axios.post(url.apiUrl() + '/api/Vehicle/metadata_Vehicle_Tractortrailers')
        .then(function(val) {
          if (val.data.error == '') {
            _this.vehicle = val.data.data
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error('获取数据失败,请稍后再试11!')
        })
    },
    init() { // 获取数据
      let data1 = {
          'org_id': this.customerSelected,
          'vehicle_platenumber': this.searchCondition.code,
          'vehicle_property_id': this.vehicleType,
          'vehicle_tractortrailer_id': this.vehicle1,
          'Page': this.currentPage,
          'Rows': this.pageSize
        }, _this = this
      let loading
      axios.interceptors.request.use(config => {
        loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        return config
      })
      axios.interceptors.response.use(config => {
        loading.close()
        return config
      })
      axios.post(url.apiUrl() + '/api/Vehicle/VehicleList', data1)
        .then(function(val) {
          if (val.data.error == '') {
            _this.areaOptions = val.data.data
            _this.tableData3 = val.data.data.rows
            _this.materielSize = val.data.data.total
            // console.log(val.data.data.rows);
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error('获取数据失败,请稍后再试11!')
        })
    },
    getCompanyList() { // 获取所属公司所以数据
      const _this = this
      axios.post(url.apiUrl() + '/api/MetadataOrg/GeOrgs')
        .then(function(val) {
          _this.customerList = val.data.data
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    getCompanyList1() { // 获取所属公司弹窗数据
      const _this = this
      axios.post(url.apiUrl() + '/api/MetadataOrg/GeOrgs')
        .then(function(val) {
          _this.customerList1 = val.data.data
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    checkbox(val) { // 用户手动勾选checkbox的勾选操作
      this.checkboxSelected = val[0].v.vehicle_id
    },
    checkboxAll(val) { // 用户点击全选checkbox的操作
      // this.checkboxSelected = val;
      this.$message.error('暂不支持多选操作')
      return false
    },
    doubleEvents(obj) { // 双击信息进行的操作
      console.log(JSON.stringify(obj))
      this.dialogFormVisible = true
      this.saveShow1 = false
      this.isShow = true
      this.newAdd = true
      this.isDisabled1 = true
      this.checkboxSelected = obj.v.vehicle_id // 给删除操作复制唯一的id
      // console.log(JSON.stringify(obj))
      this.oldCode = obj.v.vehicle_platenumber

      this.areaInfo1.vehicle_id = obj.v.vehicle_id
      this.areaInfo1.vehicle_platenumber = obj.v.vehicle_platenumber
      this.areaInfo1.vehicleType = obj.vp.vehicle_property_id
      this.areaInfo1.vehicle1 = obj.vt.vehicle_tractortrailer_id
      this.areaInfo1.carrier_id = obj.v.carrier_id
      this.areaInfo1.vehicle_registration = obj.v.vehicle_registration
      this.areaInfo1.driver_name = obj.v.driver_name
      this.areaInfo1.driver_phone = obj.v.driver_phone
      this.areaInfo1.driver_idcard = obj.v.driver_idcard
      this.areaInfo1.owner_name = obj.v.owner_name
      this.areaInfo1.owner_phone = obj.v.owner_phone
      this.areaInfo1.owner_idcard = obj.v.owner_idcard
      this.areaInfo1.org_id = obj.v.org_id
      this.areaInfo1.vehicle_type_id = obj.vty.vehicle_type_name
      this.areaInfo1.vehicle_length = obj.v.vehicle_length
      this.areaInfo1.vehicle_width = obj.v.vehicle_width
      this.areaInfo1.vehicle_height = obj.v.vehicle_height
      this.areaInfo1.vehicle_volume = obj.v.vehicle_volume
      this.areaInfo1.vehicle_weight = obj.v.vehicle_weight
      this.areaInfo1.vehicle_brand = obj.v.vehicle_brand
      this.areaInfo1.vehicle_color = obj.v.vehicle_color
      this.areaInfo1.purchace_date = obj.v.purchace_date
      this.areaInfo1.vehicle_identificationnumber = obj.v.vehicle_identificationnumber
      this.areaInfo1.vehicle_enginenumber = obj.v.vehicle_enginenumber
      this.areaInfo1.vehicle_transportlicense = obj.v.vehicle_transportlicense
      this.areaInfo1.vehicle_platetype_id = obj.vpl.vehicle_platetype_name
      this.areaInfo1.vehicle_operationlicense = obj.v.vehicle_operationlicense
      this.areaInfo1.vehicle_roadticket = obj.v.vehicle_roadticket
      this.areaInfo1.vehicle_insurance = obj.v.vehicle_insurance
      this.areaInfo1.insurance_expiredate = obj.v.insurance_expiredate
      this.areaInfo1.insurance_company = obj.v.insurance_company
      this.areaInfo1.annual_inspection = obj.v.annual_inspection
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    pageSizeChange(val) { //   选择每页展示的页数大小
      this.pageSize = val
      this.init()
      if (val == 'NaN') {
        alert(1)
      }
      // console.log(val)
    },
    // ///////////////////////////////
    currentSizeChange(val) { // 当前选择第几页
      this.currentPage = val
      this.init()
    },
    getProvince(queryString, cb) { // 点击省
      axios.post(url.apiUrl() + '/api/MetadataArea/MetadataProvince')
        .then(function(val) {
          if (val.data.error == '') {
            cb(val.data.data)
          } else {
            _this.$message.error(val.data.error)
          }
        })
    },
    selectedProvince(val) { // 省对应的列表点击显示数据
      this.areaInfo1.province = val.area_name
      this.selectProvinceId = val.area_id
    },
    getCity(queryString, cb) { // 点击省areaid 获取市数据
      if (this.selectProvinceId == '') {
        this.$message.error('请先选择省!')
      } else {
        axios.post(url.apiUrl() + '/api/MetadataArea/MetadataCity?area_id=' + this.selectProvinceId)
          .then(function(val) {
            if (val.data.error == '') {
              cb(val.data.data)
            } else {
              _this.$message.error(val.data.error)
            }
          })
      }
    },
    selectedCity(val) { // 市下拉框选择时给下拉框赋值
      this.areaInfo1.city = val.area_name
      this.selectCityId = val.area_id
    },
    getArea(queryString, cb) { // 点击市areaid 获取县数据
      if (this.selectCityId == '') {
        this.$message.error('请先选择市!')
      } else {
        axios.post(url.apiUrl() + '/api/MetadataArea/MetadataArea?area_id=' + this.selectCityId)
          .then(function(val) {
            if (val.data.error == '') {
              cb(val.data.data)
            } else {
              _this.$message.error(val.data.error)
            }
          })
      }
    },
    selectedArea(val) { // 市下拉框选择时给下拉框赋值
      this.areaInfo1.area = val.area_name
      this.selectAreaId = val.area_id
    },
    search() {
      this.$message.error('暂未开放!')
    },
    checkCodeAndName(str) { // 检查是否名称或代码是否存在
      const _this = this

      // 判断是否是左边点击进入详情
      console.log(this.oldCode, this.oldName)
      if (this.oldCode != '') {
        if (this.areaInfo1.vehicle_platenumber == this.oldCode) { // 判断公司代码和公司名称是否修改
          _this.isCode = true
        } else {
          const data1 = {
            vehicle_platenumber: _this.areaInfo1.vehicle_platenumber
          }
          axios.post(url.apiUrl() + '/api/Vehicle/isAny?vehicle_platenumber=' + _this.areaInfo1.vehicle_platenumber)
            .then(val => {
              console.log(val)
              if (val.data.data == true) {
                _this.$message({
                  type: 'warning',
                  message: '车牌号重复!'
                })
                _this.isCode = false
              } else {
                _this.isCode = true
              }
            })
            .catch(val => {
              _this.$message.error(val.data.error)
            })
        }
      } else {
        const data1 = {
          vehicle_platenumber: _this.areaInfo1.vehicle_platenumber
        }
        axios.post(url.apiUrl() + '/api/Vehicle/isAny?vehicle_platenumber=' + _this.areaInfo1.vehicle_platenumber)
          .then(val => {
            console.log(val)
            if (val.data.data == true) {
              _this.$message({
                type: 'warning',
                message: '车牌号重复!'
              })
              _this.isCode = false
            } else {
              _this.isCode = true
            }
          })
          .catch(val => {
            _this.$message.error(val.data.error)
          })
      }
    },
    saveInfo1() { // 弹窗的保存操作
      // this.newAdd = false ;
      let date = new Date(), _this = this
      const o = {
          'y': date.getFullYear(), // 年份
          'M': date.getMonth() + 1, // 月份
          'd': date.getDate(), // 日
          'h': date.getHours(), // 小时
          'm': date.getMinutes(), // 分
          's': date.getSeconds(), // 秒
          'q': Math.floor((date.getMonth() + 3) / 3), // 季度
          'S': date.getMilliseconds() // 毫秒
        }, time = o.y + '-' + o.M + '-' + o.d + ' ' + o.h + ':' + o.m + ':' + o.s
      if (this.newAdd) {
        const data1 = {
          vehicle_id: this.areaInfo1.vehicle_id,
          vehicle_platenumber: this.areaInfo1.vehicle_platenumber,
          vehicle_property_id: this.areaInfo1.vehicleType,
          vehicle_tractortrailer_id: this.areaInfo1.vehicle1,
          carrier_id: this.areaInfo1.carrier_id,
          vehicle_registration: this.areaInfo1.vehicle_registration,
          driver_name: this.areaInfo1.driver_name,
          driver_phone: this.areaInfo1.driver_phone,
          driver_idcard: this.areaInfo1.driver_idcard,
          owner_name: this.areaInfo1.owner_name,
          owner_phone: this.areaInfo1.owner_phone,
          owner_idcard: this.areaInfo1.owner_idcard,
          org_id: this.areaInfo1.org_id,
          vehicle_type_id: this.areaInfo1.vehicle_type_id,
          vehicle_length: this.areaInfo1.vehicle_length,
          vehicle_width: this.areaInfo1.vehicle_width,
          vehicle_height: this.areaInfo1.vehicle_height,
          vehicle_volume: this.areaInfo1.vehicle_volume,
          vehicle_weight: this.areaInfo1.vehicle_weight,
          vehicle_brand: this.areaInfo1.vehicle_brand,
          vehicle_color: this.areaInfo1.vehicle_color,
          purchace_date: this.areaInfo1.purchace_date,
          vehicle_identificationnumber: this.areaInfo1.vehicle_identificationnumber,
          vehicle_enginenumber: this.areaInfo1.vehicle_enginenumber,
          vehicle_transportlicense: this.areaInfo1.vehicle_transportlicense,
          vehicle_platetype_id: this.areaInfo1.vehicle_platetype_id,
          vehicle_operationlicense: this.areaInfo1.vehicle_operationlicense,
          vehicle_roadticket: this.areaInfo1.vehicle_roadticket,
          vehicle_insurance: this.areaInfo1.vehicle_insurance,
          insurance_expiredate: this.areaInfo1.insurance_expiredate,
          insurance_company: this.areaInfo1.insurance_company,
          annual_inspection: this.areaInfo1.annual_inspection,
          Create_Time: time,
          Create_Org_ID: this.Create_Org_ID,
          Create_User_ID: this.Create_User_ID,
          Edit_User_ID: this.Create_User_ID,
          Edit_Time: time,
          Edit_Org_ID: this.Create_Org_ID
        }
        axios.post(url.apiUrl() + '/api/Vehicle/VehicleUpdate', data1)
          .then(val => {
            if (val.data.error == '') {
              _this.$message({
                message: '添加成功!',
                type: 'success'
              })
              _this.printValue = ''
              _this.dialogFormVisible = false
              _this.init()
              _this.oldCode = ''
            }
          })
          .catch(val => {
            _this.$message.error('数据获取错误,请过一段时间重试!')
          })
      } else {
        const data1 = {
          vehicle_id: '',
          vehicle_platenumber: this.areaInfo1.vehicle_platenumber,
          vehicle_property_id: this.areaInfo1.vehicleType,
          vehicle_tractortrailer_id: this.areaInfo1.vehicle1,
          carrier_id: this.areaInfo1.carrier_id,
          vehicle_registration: this.areaInfo1.vehicle_registration,
          driver_name: this.areaInfo1.driver_name,
          driver_phone: this.areaInfo1.driver_phone,
          driver_idcard: this.areaInfo1.driver_idcard,
          owner_name: this.areaInfo1.owner_name,
          owner_phone: this.areaInfo1.owner_phone,
          owner_idcard: this.areaInfo1.owner_idcard,
          org_id: this.areaInfo1.org_id,
          vehicle_type_id: this.areaInfo1.vehicle_type_id,
          vehicle_length: this.areaInfo1.vehicle_length,
          vehicle_width: this.areaInfo1.vehicle_width,
          vehicle_height: this.areaInfo1.vehicle_height,
          vehicle_volume: this.areaInfo1.vehicle_volume,
          vehicle_weight: this.areaInfo1.vehicle_weight,
          vehicle_brand: this.areaInfo1.vehicle_brand,
          vehicle_color: this.areaInfo1.vehicle_color,
          purchace_date: this.areaInfo1.purchace_date,
          vehicle_identificationnumber: this.areaInfo1.vehicle_identificationnumber,
          vehicle_enginenumber: this.areaInfo1.vehicle_enginenumber,
          vehicle_transportlicense: this.areaInfo1.vehicle_transportlicense,
          vehicle_platetype_id: this.areaInfo1.vehicle_platetype_id,
          vehicle_operationlicense: this.areaInfo1.vehicle_operationlicense,
          vehicle_roadticket: this.areaInfo1.vehicle_roadticket,
          vehicle_insurance: this.areaInfo1.vehicle_insurance,
          insurance_expiredate: this.areaInfo1.insurance_expiredate,
          insurance_company: this.areaInfo1.insurance_company,
          annual_inspection: this.areaInfo1.annual_inspection,
          Create_Time: time,
          Create_Org_ID: this.Create_Org_ID,
          Create_User_ID: this.Create_User_ID,
          Edit_User_ID: '',
          Edit_Time: time,
          Edit_Org_ID: ''
        }

        if (this.areaInfo1.vehicle_platenumber == '') {
          this.$message.error('带*的为必填项,请填写后再保存!')
        } else {
          if (_this.isCode == true) {
            axios.post(url.apiUrl() + '/api/Vehicle/VehicleAdd', data1)
              .then(val => {
                if (val.data.error == '') {
                  _this.$message({
                    message: '添加成功!',
                    type: 'success'
                  })
                  _this.printValue = ''
                  _this.dialogFormVisible = false
                  _this.init()
                }
              })
              .catch(val => {
                _this.$message.error('数据获取错误,请过一段时间重试!')
              })
          } else {
            _this.$message.error('车牌号重复,请修改后重试!')
          }
        }
      }
    },
    updateInfo1() { // 点击修改使内容可编辑
      this.isDisabled1 = false
      this.saveShow1 = true
    },
    cancelInfo1() { // 取消操作
      this.dialogFormVisible = false
    },
    deleteCompany1() { // 弹窗 删除操作
      const _this = this
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post(url.apiUrl() + '/api/Vehicle/VehicleDel?vehicle_id=' + this.checkboxSelected)
          .then(function(val) {
            if (val.data.error == '') {
              _this.$message({
                message: '删除成功!',
                type: 'success'
              })
              _this.dialogFormVisible = false
              _this.checkboxSelected = ''
              _this.init()
            } else {
              _this.$message.error(val.data.error)
            }
          })
          .catch(function(data) {
            _this.$message.error('获取数据失败,请稍后再试11!')
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    //  获取弹窗中的下拉框
    getMaskOfvehicleType() { // 弹窗中的 车辆类型
      const _this = this
      axios.post(url.apiUrl() + '/api/Vehicle/metadata_Vehicle_Types')
        .then(function(val) {
          if (val.data.error == '') {
            _this.maskVehicleType = val.data.data
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error('获取数据失败,请稍后再试11!')
        })
    },
    getMaskOfLicensePlate() { // 弹窗中的 牌照类型
      const _this = this
      axios.post(url.apiUrl() + '/api/Vehicle/metadata_Vehicle_Platetypes')
        .then(function(val) {
          if (val.data.error == '') {
            _this.LicensePlate = val.data.data
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error('获取数据失败,请稍后再试11!')
        })
    }
  },
  mounted() {
    const loginInfo = JSON.parse(storage.getStorage('currentUser'))
    this.Create_Org_ID = loginInfo.orgId
    this.Create_User_ID = loginInfo.userId

    const boxHeight = document.querySelector('.box').clientHeight
    const buttonBoxHeight = document.querySelector('.buttonBox').clientHeight
    const areaBoxHeight = boxHeight - 40 - buttonBoxHeight
    document.querySelector('.tableWraper').style.height = areaBoxHeight + 'px'
    document.querySelector('.tableWraper').style.overflowY = 'auto'
    // this.tableH = areaBoxHeight + "px"
    // $nextTick
    this.getCarrier() // 获取承运商
    this.getVehicleType() // 获取车辆属性
    this.getVehicle() // 获取车头倒挂
    this.getMaskOfvehicleType() // 获取车辆类型
    this.getMaskOfLicensePlate() // 获取牌照类型
    this.getCompanyList() // 获取 所属公司 数据
    this.getCompanyList1() // 获取 所属公司弹窗 数据
    this.init() // 初始化获取所有表格数据
  }
}
</script>
<style lang="scss" scoped>
.buttonBox{
    padding: 15px 15px 0 15px;
}
.searchCondition{
    padding: 0 15px;
}
.tableWraper{
    width: 100%;
    overflow-x: hidden;
}
.table{
    height: 100%;
}
.box{
    height: 100%;
}
.l{
    float: left;
}
.r{
    float:right;
}
.el-form-item{
    margin-bottom: 0px;
}
 .cell{
     white-space: nowrap;
 }

.searchBtn{
    padding: 0 4px;
    background: #fff;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 2px;
    color: #409EFF;
}
.clearfix:before, .clearfix:after { content: " "; display: block; height: 0; overflow: hidden; }  
.clearfix:after { clear: both; }  
.clearfix { zoom: 1; } 
</style>
<style>
    .cell{
     white-space: nowrap!important;
 }
 .el-scrollbar__view{
     height: 100%;
 }
 
</style>


