<template>
  <div class="Distribution">
    <el-header class="Distribution-header" style="height: 40px">
        <router-link to="/Distribution/add"><el-button size="mini" type="primary" plain>新增</el-button></router-link>
        <el-button class="page-btn-group" size="mini" v-show="baocun" @click="editEave">保存</el-button>
        <!-- <el-button class="page-btn-group" size="mini">保存并打印</el-button>
        <el-button class="page-btn-group" size="mini" >取消</el-button> -->
        <el-button class="page-btn-group" size="mini" v-show = "diaodu" @click="fache">发车</el-button>
        <el-button class="page-btn-group" size="mini" v-show = "diaodu" @click="editUpdate">修改</el-button>
        <el-button class="page-btn-group" v-show = "!diaodu" size="mini" @click="qianshou">签收</el-button>
        <el-button class="page-btn-group" v-show = "!diaodu" size="mini" @click="back">撤销发车</el-button>
        <el-button class="page-btn-group" v-show = "diaodu" size="mini" @click="editDelete">删除</el-button>
        <el-button class="page-btn-group" size="mini">上传附件</el-button>
    </el-header>
    
    <hr>
    <el-tabs v-model="activeName2" type="card" class="flex1">
      <el-tab-pane label="本车清单" name="one" class="aa2 flex1">
        <el-table
                ref="multipleTable"
                :data="tableData1"
                size="small"
                border
                class="aa1"
                show-summary
                style="width: 100%"
                
                >
                <el-table-column
                    type="selection"
                    width="60">
                </el-table-column>
                <el-table-column
                    label="序号"
                    type='index'
                    width="60">
                </el-table-column>
                 <el-table-column   v-for="item in tableColumns" v-if="choosenColumns.indexOf(item.label) > -1" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
                            <template slot-scope="scope">
                                <div v-if="scope.$index === 0 && openColumnSearch">
                                    <el-input   v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch"></el-input>
                                </div>
                                <span v-else>{{ scope.row[scope.column.property] }}</span>
                            </template>
                 </el-table-column>
            </el-table>
      </el-tab-pane>
      <el-tab-pane label="派车" name="third">
        <div class="edit-page-modular">
  
          <el-row class="edit-page-modular-allotcar">
              <el-col :span="4">
                <el-input class="input-group" v-model="dispatching.contractNumber" v-bind:disabled="disabledInput" disabled value="xxxxxxxxx">
                  <label class="radio-label" slot="prepend" >合同编号: </label>
                </el-input>
              </el-col>
              <el-col :span="4">
                  <label class="radio-label" >派车状态: </label>
                  <el-select v-model="dispatching.dispatchingState" disabled  placeholder="请选择" style="width:110px;">
                    <el-option 
                    v-for="item in transportState" 
                    :key="item.terminaldeparture_state_id" 
                    :label="item.terminaldeparture_state_name" 
                    :value="item.terminaldeparture_state_id"></el-option>
                  </el-select>
              </el-col>
              <el-col :span="4">
                
                <el-input disabled v-model.trim="dispatching.originator"><label class="radio-label" slot="prepend" >制 单 人 : </label></el-input>
              </el-col>
              <el-col :span="5">
                
                <label class="radio-label" >发货网点: </label>
                <el-select v-model="dispatching.site"  v-bind:disabled="disabledInput" filterable placeholder="请选择">
                    <el-option
                    v-for="item in customerList" 
                    :key="item.value"
                    :label="item.Org_name"
                    :value="item.Org_id">
                    </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
              <label class="radio-label" >发车日期: </label>
              <el-date-picker type="date" v-model="dispatching.date" v-bind:disabled="disabledInput" style="width:150px;padding-left: 30px" placeholder="选择日期"></el-date-picker>
              </el-col>
          </el-row>

          <el-row class="edit-page-modular-allotcar">
              <div>&nbsp;&nbsp;调度信息：</div>
              <el-col :span="4">
                <label class="radio-label">&nbsp;&nbsp;委托类型: </label>
                  <el-select v-bind:disabled="disabledInput" v-model="dispatching.transport_value" placeholder="请选择" style="width:110px;">
                    <el-option 
                    v-for="item in transportState1" 
                    :key="item.value" 
                    :label="item.Departure_Consigntype_Name" 
                    :value="item.Departure_Consigntype_Id"></el-option>
                  </el-select>
              </el-col>
              <el-col :span="4">
                <label class="radio-label">&nbsp;&nbsp;承 运 商 : </label>
                <el-select v-bind:disabled="disabledInput" v-model="dispatching.carrier" placeholder="请选择" style="width:110px;">
                    <el-option 
                    v-for="item in CarrierList" 
                    :key="item.value" 
                    :label="item.metadata_carrier.carrier_name" 
                    :value="item.metadata_carrier.carrier_id"></el-option>
                  </el-select>
                
              </el-col>
              <el-col :span="4">
                <label class="radio-label">&nbsp;&nbsp;车 牌 号 : </label>
                <el-select v-bind:disabled="disabledInput" @change="selectInfo" v-model="dispatching.number" placeholder="请选择" style="width:110px;">
                    <el-option 
                    v-for="item in VehicleList" 
                    :key="item.value" 
                    :label="item.v.vehicle_platenumber" 
                    :value="item.v.vehicle_platenumber"></el-option>
                  </el-select>
                
              </el-col>
              <el-col :span="4">
                <el-input class="input-group" v-model="dispatching.driver" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >驾 驶 员: </label></el-input>
              </el-col>
              <el-col :span="4">
                <el-input class="input-group" v-model="dispatching.phone" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >联系电话: </label></el-input>
              </el-col>
          </el-row>

          <el-row class="edit-page-modular-allotcar">
              <el-col :span="12">
                <el-input class="input-group" v-model="dispatching.remarks" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >备　　注: </label></el-input>
              </el-col>
          </el-row>
        
          <el-row class="edit-page-modular-allotcar">
              <div>&nbsp;&nbsp;本单费用：</div>
              <el-col :span="4">
                <el-input class="input-group" @change="CalculationMoney" v-model.number="result.xf" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >现付驾驶员: </label></el-input>
              </el-col>
              <el-col :span="4">
                <el-input class="input-group" @change="CalculationMoney" v-model.number="result.df" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >到付驾驶员: </label></el-input>
              </el-col>
              <el-col :span="4">
                <el-input class="input-group" @change="CalculationMoney" v-model.number="result.hf" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >回付驾驶员: </label></el-input>
              </el-col>
          </el-row>
          
          <el-row class="edit-page-modular-allotcar">
              <el-col :span="4">
                <el-input class="input-group" v-model.number="result.kahao" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >油卡卡号: </label></el-input>
              </el-col>
              <el-col :span="4">
                <el-input class="input-group"  v-model.number="result.commany" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >油卡公司: </label></el-input>
              </el-col>
              <el-col :span="4">
                <el-input class="input-group" @change="CalculationMoney" v-model.number="result.yk" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >油卡驾驶员: </label></el-input>
              </el-col>
          </el-row>
          
          <el-row class="edit-page-modular-allotcar">
              <el-col :span="4">
                <el-input class="input-group" @change="CalculationMoney"  v-model.number="result.fb" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >封 布 费 : </label></el-input>
              </el-col>
              <el-col :span="4">
                <el-input class="input-group" @change="CalculationMoney" v-model.number="result.bx" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >保 险 费 : </label></el-input>
              </el-col>
              <el-col :span="4">
                <el-input class="input-group" @change="CalculationMoney" v-model.number="result.zx" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >装 卸 费 : </label></el-input>
              </el-col>
          </el-row>

          
          <el-row class="edit-page-modular-allotcar">
              <el-col :span="4">
                <el-input class="input-group" @change="CalculationMoney" v-model.number="result.ld" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >落 地 费 : </label></el-input>
              </el-col>
              <el-col :span="4">
                <el-input class="input-group" @change="CalculationMoney" v-model.number="result.other" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >其他费用: </label></el-input>
              </el-col>
              <el-col :span="4">
                <el-input class="input-group" v-model.trim="result.explain"  v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >其他费用说明: </label></el-input>
              </el-col>
          </el-row>

          <el-row class="edit-page-modular-allotcar">
              <el-col :span="12">
                <el-input class="input-group" v-model="result.moneyTotal" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >费用合计: </label></el-input>
              </el-col>
          </el-row>

        </div>
      </el-tab-pane>
      <!-- ////////////////////////////////////////////////////////// -->

      <el-tab-pane label="本车加货" name="fourth">
        <el-header style="height:20px;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-col :span="12">
                    <el-form-item label="快速添加" >
                        <el-input v-model="formInline.numberLeft" @keyup.enter.native="WaybillSelectInputLeft" style="width:100px;line-height:25px;height:25px;"></el-input>
                        <el-button  type="text"    icon="el-icon-arrow-right"  @click="SelectConfigure" v-bind:disabled="disabledInput"   ></el-button>
                        <el-button  type="text"   icon="el-icon-d-arrow-right" @click="SelectAllConfigure"  v-bind:disabled="disabledInput"   ></el-button>
                        <!-- <button class="el-icon-caret-right" v-bind:disabled="disabledInput" @click="SelectConfigure"></button>
                        <button @click="SelectAllConfigure" v-bind:disabled="disabledInput">&nbsp;&nbsp;&nbsp;<i class="el-icon-caret-right" ></i><i class="el-icon-caret-right"></i></button> -->
                        
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="快速删除">
                        <el-button   type="text" v-bind:disabled="disabledInput"   icon="el-icon-arrow-left" @click="SelectCancelConfigure"     ></el-button>
                        <el-button   type="text" v-bind:disabled="disabledInput"   icon="el-icon-d-arrow-left" @click="SelectAllCancelConfigure"      ></el-button>
                        <!-- <i v-bind:disabled="disabledInput" class="el-icon-caret-left" @click="SelectCancelConfigure"></i>
                        <span v-bind:disabled="disabledInput" @click="SelectAllCancelConfigure">&nbsp;&nbsp;&nbsp;<i class="el-icon-caret-left" ></i><i class="el-icon-caret-left"></i></span> -->
                        <el-input v-model="formInline.numberRight" @keyup.enter.native="WaybillSelectInputRight" style="width:100px;line-height:25px;height:25px;"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-header>
        <el-col :span="12" class="DistributionMin">
                <!-- 表格 -->
                <el-table ref="multipleTable" :data="tableData" 
                @selection-change="handleSelectionChange" size="small" border show-summary 
                @cell-click="SelectWaybillDetailed">
                    <el-table-column type="selection" width="60" ></el-table-column>
                    <el-table-column sortable v-for="item in tableColumns" v-if="choosenColumns.indexOf(item.label) > -1" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
                    <template slot-scope="scope" >
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

                <el-footer class="Distribution-footer">
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

            
            <el-col :span="12" class="DistributionMin DistributionMin_to">
                 <!-- 表格 -->
                <el-table ref="multipleTable" :data="tableData_to" @selection-change="handleSelectionChangeCancel" size="small" border show-summary  >
                    <el-table-column type="selection" width="60" ></el-table-column>
                    <el-table-column
                        label="序号"
                        type="index">
                    </el-table-column>
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

                <el-footer class="Distribution-footer" style="30px">
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


      </el-tab-pane>
    </el-tabs>
    <el-dialog title="运单明细"  :visible.sync="dialogTableVisible">
      <el-table 
        ref="multipleTable" 
        size="small" 
        border 
        show-summary 
        :data="WaybillDetailedTable" 
        class="allotcartMin" 
        @selection-change="handleSelectionWaybillDetailedChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
            label="序号"
            type="index">
        </el-table-column>
        <el-table-column property="manifest_code" label="运单号"></el-table-column>
        <el-table-column property="shipper_code" label="托运商单号"></el-table-column>
        <el-table-column property="goods_name" label="品名"></el-table-column>
        <el-table-column label="件数" align="center">
          <template slot-scope="scope">
            <el-input class="input-group" v-model.lazy="scope.row.goods_piece"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="重量（公斤）"
          >
          <template slot-scope="scope">
          <el-input class="input-group" v-model.trim="scope.row.goods_weight"></el-input>
        </template>
      </el-table-column>
      <el-table-column
          label="体积（立方）">
          <template slot-scope="scope">
          <el-input class="input-group" v-model.trim="scope.row.goods_volume"></el-input>
        </template>
      </el-table-column>
        <el-table-column property="shipping_date" label="开单日期"></el-table-column>
        <el-table-column property="departure_city" label="发站"></el-table-column>
        <el-table-column property="arrival_city" label="到站"></el-table-column>
        <el-table-column property="departure_org_id" label="发货网点"></el-table-column>
        <el-table-column property="arrival_org_id" label="目的网点"></el-table-column>
        
        <el-table-column property="prop1" label="储位"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="GetSelectionWaybillDeta">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import axios from 'axios'
import url from '@/js/common.js'
import storage from '@/js/localstorage.js'
const tableColumns = [

  {
    label: '运单号',
    prop: 'manifest_code',
    width: 100
  },
  {
    label: '到站',
    prop: 'arrival_city',
    width: 100
  },
  {
    label: '目的网点',
    prop: 'arrival_org_name',
    width: 100
  },
  {
    label: '发货单位',
    prop: 'consigner_unit',
    width: 100
  },
  {
    label: '品名',
    prop: 'goods_name',
    width: 100
  },
  {
    label: '件数',
    prop: 'goods_piece',
    width: 100
  },
  {
    label: '重量（公斤）',
    prop: 'goods_weight',
    width: 100
  },
  {
    label: '体积（立方）',
    prop: 'goods_volume',
    width: 100
  },
  {
    label: '应收合计',
    prop: 'total_charge',
    width: 100
  },
  {
    label: '托运商单号',
    prop: 'shipper_code',
    width: 100
  },
  {
    label: '开单日期',
    prop: 'shipping_date',
    width: 100
  },
  {
    label: '运单状态',
    prop: 'manifest_state_name',
    width: 100
  },
  {
    label: '发站',
    prop: 'departure_city',
    width: 100
  },
  {
    label: '发货网点',
    prop: 'departure_org_name',
    width: 100
  },
  {
    label: '运输方式',
    prop: 'transportation_type_name',
    width: 100
  },
  {
    label: '发货人',
    prop: 'consigner_contact',
    width: 100
  },
  {
    label: '发货人电话',
    prop: 'consigner_phone',
    width: 100
  },
  {
    label: '发货地址',
    prop: 'consigner_address',
    width: 100
  },
  {
    label: '交接方式',
    prop: 'transfer_mode_name',
    width: 100
  },
  {
    label: '收货单位',
    prop: 'consignee_unit',
    width: 100
  },
  {
    label: '收货人',
    prop: 'consignee_contact',
    width: 100
  },
  {
    label: '收货人电话',
    prop: 'consignee_phone',
    width: 100
  },
  {
    label: '收货地址',
    prop: 'consignee_address',
    width: 100
  },
  {
    label: '提货费',
    prop: 'pickup_charge',
    width: 100
  },
  {
    label: '运费',
    prop: 'freight_charge',
    width: 100
  },
  {
    label: '送货费',
    prop: 'delivery_charge',
    width: 100
  },
  {
    label: '装卸费',
    prop: 'handling_charge',
    width: 100
  },
  {
    label: '声明价值',
    prop: 'insurance_amount',
    width: 100
  },
  {
    label: '保价费',
    prop: 'insurance_charge',
    width: 100
  },
  {
    label: '包装费',
    prop: 'packing_charge',
    width: 100
  },
  {
    label: '仓储费',
    prop: 'storage_charge',
    width: 100
  },
  {
    label: '其他费用',
    prop: 'other_charge',
    width: 100
  },
  {
    label: '预付进仓费',
    prop: 'entryfee_prepaid',
    width: 100
  },
  {
    label: '实付进仓费',
    prop: 'entryfee_collect',
    width: 100
  },
  // {
  //   label: '结算状态',
  //   prop: '',
  //   width: 100
  // },
  // {
  //   label: '回扣状态',
  //   prop: '',
  //   width: 100
  // },
  {
    label: '回扣',
    prop: 'rebate_commission',
    width: 100
  },
  {
    label: '应结算金额（应收合计-回扣）',
    prop: 'directiveMoney',
    width: 100
  },
  {
    label: '付款方式',
    prop: 'payment_mode_name',
    width: 100
  },
  // {
  //   label: '现付状态',
  //   prop: '',
  //   width: 100
  // },
  {
    label: '现付',
    prop: 'xianfu',
    width: 100
  },
  // {
  //   label: '到付状态',
  //   prop: '',
  //   width: 100
  // },
  {
    label: '到付',
    prop: 'daofu',
    width: 100
  },
  // {
  //   label: '发货月结状态',
  //   prop: '',
  //   width: 100
  // },
  {
    label: '发货月结',
    prop: 'fahuoyuejie',
    width: 100
  },
  // {
  //   label: '收货月结状态',
  //   prop: '',
  //   width: 100
  // },
  {
    label: '收货月结',
    prop: 'shouhuoyuejie',
    width: 100
  },
  // {
  //   label: '欠付状态',
  //   prop: '',
  //   width: 100
  // },
  {
    label: '欠付',
    prop: 'qianfu',
    width: 100
  },
  // {
  //   label: '回单付状态',
  //   prop: '',
  //   width: 100
  // },
  {
    label: '回单付',
    prop: 'huidanfu',
    width: 100
  },
  // {
  //   label: '货到打卡状态',
  //   prop: '',
  //   width: 100
  // },
  {
    label: '货到打卡',
    prop: 'huodaodaka',
    width: 100
  },
  // {
  //   label: '贷款扣状态',
  //   prop: '',
  //   width: 100
  // },
  {
    label: '贷款扣',
    prop: 'huokuankou',
    width: 100
  },
  {
    label: '制单人',
    prop: 'user_displayname',
    width: 100
  },
  {
    label: '回单份数',
    prop: 'reciept_type_name',
    width: 100
  },
  {
    label: '备注',
    prop: 'manifestdtl_comment',
    width: 100
  }
]

const tableColumns_to =  [

  {
    label: '运单号',
    prop: 'manifest_code',
    width: 100
  },
  {
    label: '到站',
    prop: 'arrival_city',
    width: 100
  },
  {
    label: '目的网点',
    prop: 'arrival_org_name',
    width: 100
  },
  {
    label: '发货单位',
    prop: 'consigner_unit',
    width: 100
  },
  {
    label: '品名',
    prop: 'goods_name',
    width: 100
  },
  {
    label: '件数',
    prop: 'goods_piece',
    width: 100
  },
  {
    label: '重量（公斤）',
    prop: 'goods_weight',
    width: 100
  },
  {
    label: '体积（立方）',
    prop: 'goods_volume',
    width: 100
  },
  {
    label: '应收合计',
    prop: 'total_charge',
    width: 100
  },
  {
    label: '托运商单号',
    prop: 'shipper_code',
    width: 100
  },
  {
    label: '开单日期',
    prop: 'shipping_date',
    width: 100
  },
  {
    label: '运单状态',
    prop: 'manifest_state_name',
    width: 100
  },
  {
    label: '发站',
    prop: 'departure_city',
    width: 100
  },
  {
    label: '发货网点',
    prop: 'departure_org_name',
    width: 100
  },
  {
    label: '运输方式',
    prop: 'transportation_type_name',
    width: 100
  },
  {
    label: '发货人',
    prop: 'consigner_contact',
    width: 100
  },
  {
    label: '发货人电话',
    prop: 'consigner_phone',
    width: 100
  },
  {
    label: '发货地址',
    prop: 'consigner_address',
    width: 100
  },
  {
    label: '交接方式',
    prop: 'transfer_mode_name',
    width: 100
  },
  {
    label: '收货单位',
    prop: 'consignee_unit',
    width: 100
  },
  {
    label: '收货人',
    prop: 'consignee_contact',
    width: 100
  },
  {
    label: '收货人电话',
    prop: 'consignee_phone',
    width: 100
  },
  {
    label: '收货地址',
    prop: 'consignee_address',
    width: 100
  },
  {
    label: '提货费',
    prop: 'pickup_charge',
    width: 100
  },
  {
    label: '运费',
    prop: 'freight_charge',
    width: 100
  },
  {
    label: '送货费',
    prop: 'delivery_charge',
    width: 100
  },
  {
    label: '装卸费',
    prop: 'handling_charge',
    width: 100
  },
  {
    label: '声明价值',
    prop: 'insurance_amount',
    width: 100
  },
  {
    label: '保价费',
    prop: 'insurance_charge',
    width: 100
  },
  {
    label: '包装费',
    prop: 'packing_charge',
    width: 100
  },
  {
    label: '仓储费',
    prop: 'storage_charge',
    width: 100
  },
  {
    label: '其他费用',
    prop: 'other_charge',
    width: 100
  },
  {
    label: '预付进仓费',
    prop: 'entryfee_prepaid',
    width: 100
  },
  {
    label: '实付进仓费',
    prop: 'entryfee_collect',
    width: 100
  },
  // {
  //   label: '结算状态',
  //   prop: '',
  //   width: 100
  // },
  // {
  //   label: '回扣状态',
  //   prop: '',
  //   width: 100
  // },
  {
    label: '回扣',
    prop: 'rebate_commission',
    width: 100
  },
  {
    label: '应结算金额（应收合计-回扣）',
    prop: 'directiveMoney',
    width: 100
  },
  {
    label: '付款方式',
    prop: 'payment_mode_name',
    width: 100
  },
  // {
  //   label: '现付状态',
  //   prop: '',
  //   width: 100
  // },
  {
    label: '现付',
    prop: 'xianfu',
    width: 100
  },
  // {
  //   label: '到付状态',
  //   prop: '',
  //   width: 100
  // },
  {
    label: '到付',
    prop: 'daofu',
    width: 100
  },
  // {
  //   label: '发货月结状态',
  //   prop: '',
  //   width: 100
  // },
  {
    label: '发货月结',
    prop: 'fahuoyuejie',
    width: 100
  },
  // {
  //   label: '收货月结状态',
  //   prop: '',
  //   width: 100
  // },
  {
    label: '收货月结',
    prop: 'shouhuoyuejie',
    width: 100
  },
  // {
  //   label: '欠付状态',
  //   prop: '',
  //   width: 100
  // },
  {
    label: '欠付',
    prop: 'qianfu',
    width: 100
  },
  // {
  //   label: '回单付状态',
  //   prop: '',
  //   width: 100
  // },
  {
    label: '回单付',
    prop: 'huidanfu',
    width: 100
  },
  // {
  //   label: '货到打卡状态',
  //   prop: '',
  //   width: 100
  // },
  {
    label: '货到打卡',
    prop: 'huodaodaka',
    width: 100
  },
  // {
  //   label: '贷款扣状态',
  //   prop: '',
  //   width: 100
  // },
  {
    label: '贷款扣',
    prop: 'huokuankou',
    width: 100
  },
  {
    label: '制单人',
    prop: 'user_displayname',
    width: 100
  },
  {
    label: '回单份数',
    prop: 'reciept_type_name',
    width: 100
  },
  {
    label: '备注',
    prop: 'manifestdtl_comment',
    width: 100
  }
]

const mockData = [{
  prop1: '12345',
  prop2: '0',
  prop3: '0',
  prop4: '0',
  prop5: '0',
  prop6: '10'
}]

const mockData_to = [
  {
  prop1: '13579',
  prop2: '0',
  prop3: '0',
  prop4: '0',
  prop5: '0',
  prop6: '0'
}]

const WaybillDetailedTable = [{
  prop1: '13579',
  prop2: '0',
  prop3: '0',
  prop4: '0',
  prop5: '0',
  prop6: '4'
}]
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
export default {
  name: 'lists',
  data() {
    return {
      dialogTableVisible: false,
      SelectWaybillDetailedIndex: '-1',
      WaybillDetailedTable: WaybillDetailedTable,
      DischargeRadio: 0, // 卸货点单选框
      activeName2: 'one', // 默认选项卡
      formInline: { numberLeft: '', numberRight: '' }, // 表单
      SelectionChange: [],
      SelectionChangeCancel: [],
      SelectionChangeData: [],
      SelectionChangeCancelData: [],
      SelectionWaybillDetailedChangeData: [],

      frominfo: {},
     
      result: {
        tuoyunshang: '666',
        tuoyuntime: '2018-10-01',
        tuoyunfazhan: '北京',
        tuoyundaozhan: '上海',
        tuoyundaozhanwangdian: '',

        // ----------
        payme_value: '1', // 付款方式
        xf: '',
        df: '',
        hf: '',
        yk: '',
        fb: '',
        bx: '',
        zx: '',
        ld: '',
        other: '',
        explain: '',
        moneyTotal: '',

        // ----------
        list: [
         
        ]
      },
      paymeMode: [{
        value: '1',
        label: '免费'
      }, {
        value: '2',
        label: '到付'
      }, {
        value: '3',
        label: '现付'
      }],

      transportState_value: '1',
      
      transport_value: '',
      transport_options: [{
        value: '公路',
        label: '公路'
      }, {
        value: '铁路',
        label: '铁路'
      }],

      disabledInput: false,
      listLoading: false,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      // ---------
      tableData: mockData.slice(),
      tableData_to: [],
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
      columnSearch_to: {},
      Create_Org_ID:"",
      Create_User_ID:"",
      dispatching: { // 派车
        contractNumber: "", // 合同编号
        dispatchingState: "", // 派车状态
        originator: JSON.parse(storage.getStorage('currentUser')).displayName, // 制单人
        site: '', // 发货网点
        date: o.y + '-' + o.M + '-' + o.d, // 发车日期
        transport_value: 1, // 委托类型
        carrier: '', // 承运商
        number: '', // 车牌号
        driver: '', // 驾驶员
        phone: '', // 联系电话
        remarks: '' // 备注
      },
      CarrierList:"",
      customerList:"",
      transportState:"",
      transportState1:"",
      VehicleList:"",
      tableData1:[], // 本车清单对应的数据
      oldInfo:"", // 终端配送没有合并的原数据
      data1:"",   // 对应stores里面的data1
      data2:"",   // 对应stores里面的data2
      ids:[],  // 明细删除的时候保存的id
      diaodu:true, // 控制按钮的显示和隐藏
      baocun:false,
    }
  },
  created() {
    const loginInfo = JSON.parse(storage.getStorage('currentUser'))
    this.Create_Org_ID = loginInfo.orgId
    this.Create_User_ID = loginInfo.userId
     this.getCompanyList() // 获取发货网点
    this.getTransportState() // 获取委托类型
    this.getDispatchingState() // 获取派车状态
    this.getCarrierList() // 获取承运商数据
    this.getVehicleList() // 获取车牌号
    this.fetchData();
    this.getQDMessage();// 获取终端配送详情的数据
    this.init();
    this.disabledInput = true;
  },
  watch: {
    result() {
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      const boxHeight = document.querySelector('body').clientHeight
      const top = document.querySelector('.Distribution-header').clientHeight
      const tabs__header = document.querySelector('.el-tabs__header').clientHeight

      const areaBoxHeight = boxHeight - top - 30 - 50 - 15 - tabs__header - 15
      document.querySelector('.Distribution-footer').style.height = '30px'
      document.querySelector('.DistributionMin').style.height = areaBoxHeight - 100 + 'px'
      document.querySelector('.DistributionMin_to').style.height = areaBoxHeight - 100 + 'px'

      document.querySelector('.DistributionMin .el-table__body-wrapper').style.height = areaBoxHeight - 180 - 25 + 'px'
      document.querySelector('.DistributionMin_to .el-table__body-wrapper').style.overflowY = 'auto'

      document.querySelector('.DistributionMin_to .el-table__body-wrapper').style.height = areaBoxHeight - 180 - 25 + 'px'
      document.querySelector('.DistributionMin_to .el-table__body-wrapper').style.overflowY = 'auto'
    })
  },
  methods: {
    back(){ // 撤销发车

    },
    qianshou(){ // 签收

    },
    fache(){ // 发车
      let _this = this
      
      axios.post(url.apiUrl() + '/api/Terminaldeparture/Terminaldeparture?business_terminaldeparture='+this.$route.params.id)
        .then(function(val) {
          if (val.data.error == '') {
            _this.$message({
              type:"success",
              message:"发车成功!"
            });
            _this.getQDMessage();
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error('获取数据失败,请稍后再试12!')
        })
    },
    getQDMessage() { // 获取终端配送详情的数据
      let _this = this
      
      axios.get(url.apiUrl() + '/api/Terminaldeparture/GetTerminaldepartureInventory?terminaldeparture_id='+this.$route.params.id)
        .then(function(val) {
          if (val.data.error == '') {
            let msg = val.data.data;
            _this.PC(msg.terminaldeparture[0]);
            _this.oldInfo = msg.terminaldeparture_inventory;
            _this.addInfo1(msg.terminaldeparture_inventory);// 本车加货的明细
            _this.addInfo2(msg.terminaldeparture_inventory); // 本车清单的明细
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error('获取数据失败,请稍后再试13!')
        })
    },
    PC(msg){ // 派车赋值操作
      switch (msg.terminaldeparture_state_id) {
        case 10:
          this.diaodu = true;
          break;
        case 30:
          this.diaodu = false;
          break;
        default:
          break;
      }
      this.dispatching.dispatchingState = msg.terminaldeparture_state_id;
      this.dispatching.contractNumber = msg.contract_code;
      this.dispatching.terminaldeparture_state_id = msg.terminaldeparture_state_id;
      this.dispatching.originator = msg.user_id;
      this.dispatching.site = msg.terminaldeparture_org_id;
      this.dispatching.date = msg.terminaldeparture_date;
      this.dispatching.transport_value = msg.terminaldeparture_consigntype_id;
      this.dispatching.carrier = msg.carrier_name;
      this.dispatching.number = msg.plate_number;
      this.dispatching.driver = msg.driver_name;
      this.dispatching.phone = msg.driver_phone;
      this.dispatching.remarks = msg.terminaldeparture_comment;
      this.result.xf = msg.freight_cashpay;
      this.result.df = msg.freight_collect;
      this.result.hf = msg.freight_backpay;
      this.result.kahao = msg.fuelcard_number;
      this.result.commany = msg.fuelcard_org;
      this.result.yk = msg.fuelcard_driver;
      this.result.fb = msg.cover_charge;
      this.result.bx = msg.issurance_charge;
      this.result.zx = msg.handling_charge;
      this.result.ld = msg.landing_charge;
      this.result.other = msg.other_charge;
      this.result.explain = msg.other_charge_comment;
      this.result.moneyTotal = msg.total_charge;
    },
    addInfo2(vals,aa){
      let val = JSON.parse(JSON.stringify(vals));
      const infoAdd = val.map((ele, index) => {
        let m = ele.stocks, manifest = ele.manifest;
        let goods_name = '', goods_package = '', goods_piece = 0, goods_weight = 0, goods_volume = 0// 品名，包装，件数，重量，体积
        m.map((item, i) => {
          if (i == (m.length - 1)) {
            goods_name += (item.goods_name == '' || item.goods_name == null ? '' : item.goods_name)
            goods_package += (item.goods_package == '' || item.goods_package == null ? '' : item.goods_package)
            goods_piece = parseFloat(goods_piece) + (item.goods_piece == '' || item.goods_piece == null ? '' : parseFloat(item.goods_piece))
            goods_weight = parseFloat(goods_weight) + (item.goods_weight == '' || item.goods_weight == null ? '' : parseFloat(item.goods_weight))
            goods_volume = parseFloat(goods_volume) + (item.goods_volume == '' || item.goods_volume == null ? '' : parseFloat(item.goods_volume))
          } else {
            goods_name += (item.goods_name == '' || item.goods_name == null ? '' : item.goods_name) + '/'
            goods_package += (item.goods_package == '' || item.goods_package == null ? '' : item.goods_package) + '/'
            goods_piece = parseFloat(goods_piece) + (item.goods_piece == '' || item.goods_piece == null ? '' : parseFloat(item.goods_piece))
            goods_weight = parseFloat(goods_weight) + (item.goods_weight == '' || item.goods_weight == null ? '' : parseFloat(item.goods_weight))
            goods_volume = parseFloat(goods_volume) + (item.goods_volume == '' || item.goods_volume == null ? '' : parseFloat(item.goods_volume))
           
          }
        })
        manifest.goods_name = goods_name
        manifest.goods_package = goods_package
        manifest.goods_piece = goods_piece
        manifest.goods_weight = goods_weight
        manifest.goods_volume = goods_volume
        return manifest
      })
        this.tableData1 = infoAdd;
    },
    addInfo1(vals,aa) { // 清单明细数据相加
      // let val = JSON.parse(JSON.stringify(vals));
      // const infoAdd = val.map((ele, index) => {
      //   let m = ele.stocks, manifest = ele.manifest;
      //   let goods_name = '', goods_package = '', goods_piece = 0, goods_weight = 0, goods_volume = 0// 品名，包装，件数，重量，体积
      //   m.map((item, i) => {
      //     if (i == (m.length - 1)) {
      //       goods_name += (item.goods_name == '' || item.goods_name == null ? '' : item.goods_name)
      //       goods_package += (item.goods_package == '' || item.goods_package == null ? '' : item.goods_package)
      //       goods_piece = parseFloat(goods_piece) + (item.goods_piece == '' || item.goods_piece == null ? '' : parseFloat(item.goods_piece))
      //       goods_weight = parseFloat(goods_weight) + (item.goods_weight == '' || item.goods_weight == null ? '' : parseFloat(item.goods_weight))
      //       goods_volume = parseFloat(goods_volume) + (item.goods_volume == '' || item.goods_volume == null ? '' : parseFloat(item.goods_volume))
      //     } else {
      //       goods_name += (item.goods_name == '' || item.goods_name == null ? '' : item.goods_name) + '/'
      //       goods_package += (item.goods_package == '' || item.goods_package == null ? '' : item.goods_package) + '/'
      //       goods_piece = parseFloat(goods_piece) + (item.goods_piece == '' || item.goods_piece == null ? '' : parseFloat(item.goods_piece))
      //       goods_weight = parseFloat(goods_weight) + (item.goods_weight == '' || item.goods_weight == null ? '' : parseFloat(item.goods_weight))
      //       goods_volume = parseFloat(goods_volume) + (item.goods_volume == '' || item.goods_volume == null ? '' : parseFloat(item.goods_volume))
           
      //     }
      //   })
      //   manifest.goods_name = goods_name
      //   manifest.goods_package = goods_package
      //   manifest.goods_piece = goods_piece
      //   manifest.goods_weight = goods_weight
      //   manifest.goods_volume = goods_volume
      //   return manifest
      // })
      // if(aa){
      //   this.tableData_to = infoAdd;
      // }else{
      //   this.tableData1 = infoAdd;
      //   this.tableData_to = infoAdd;
      //   this.$store.state.distributionShow.data1.push(...infoAdd);
      // } 
      let arr = [];
      vals.forEach(ele =>{
        ele.stocks.forEach(item =>{
          let obj = Object.assign(item,ele.manifest);
          arr.push(obj);
        })
      })
      console.log(111)
      this.$store.state.distributionShow.data1.push(...arr);
      this.addTableData3();
      this.renderTableData3();
    },
    getCarrierList() { // 获取承运商数据
      const _this = this
      const data1 = {
        'Page': 1,
        'Rows': 100
      }
      axios.post(url.apiUrl() + '/api/Carrier/CarrierList', data1)
        .then(function(val) {
          _this.CarrierList = val.data.data.rows
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    getCompanyList() { // 获取发货网点
      const _this = this
      axios.post(url.apiUrl() + '/api/MetadataOrg/GeOrgs')
        .then(function(val) {
          _this.customerList = val.data.data
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    getDispatchingState() { // 获取派车状态
      const _this = this
      axios.post(url.apiUrl() + '/api/Terminaldeparture/businessTerminaldepartureStateList')
        .then(function(val) {
          _this.transportState = val.data.data
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    getTransportState() { // 获取委托类型
      const _this = this
      axios.get(url.apiUrl() + '/api/Departure/GetDeparture_ConsignTypes')
        .then(function(val) {
          _this.transportState1 = val.data.data
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    getVehicleList() { // 获取车牌号
      const _this = this
      const data1 = {
        'Page': 1,
        'Rows': 100
      }
      axios.post(url.apiUrl() + '/api/Vehicle/VehicleList', data1)
        .then(function(val) {
          _this.VehicleList = val.data.data.rows
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    selectInfo(val) {
      this.VehicleList.map(ele => {
        if (ele.v.vehicle_platenumber == val) {
          this.dispatching.driver = ele.v.driver_name
          this.dispatching.phone = ele.v.driver_phone
        }
      })
    },
    init() { // 获取本车加货左边数据数据
      let _this = this
      
      axios.post(url.apiUrl() + '/api/Terminaldeparture/QueryLeftList?orgid='+this.Create_Org_ID)
        .then(function(val) {
          if (val.data.error == '') {
            const msg = val.data.data;
            let stores = _this.$store.state.distributionShow;
            stores.datas = msg;
            _this.addInfo(msg);
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error('获取数据失败,请稍后再试13!')
        })
    },
    addInfo(vals,aa) { // 左侧明细数据相加
      let val = JSON.parse(JSON.stringify(vals));
      const infoAdd = val.map((ele, index) => {
        let m = ele.stocks, manifest = ele.manifest;
        let goods_name = '', goods_package = '', goods_piece = 0, goods_weight = 0, goods_volume = 0// 品名，包装，件数，重量，体积
        m.map((item, i) => {
          if (i == (m.length - 1)) {
            goods_name += (item.goods_name == '' || item.goods_name == null ? '' : item.goods_name)
            goods_package += (item.goods_package == '' || item.goods_package == null ? '' : item.goods_package)
            goods_piece = parseFloat(goods_piece) + (item.goods_piece == '' || item.goods_piece == null ? '' : parseFloat(item.goods_piece))
            goods_weight = parseFloat(goods_weight) + (item.goods_weight == '' || item.goods_weight == null ? '' : parseFloat(item.goods_weight))
            goods_volume = parseFloat(goods_volume) + (item.goods_volume == '' || item.goods_volume == null ? '' : parseFloat(item.goods_volume))
          } else {
            goods_name += (item.goods_name == '' || item.goods_name == null ? '' : item.goods_name) + '/'
            goods_package += (item.goods_package == '' || item.goods_package == null ? '' : item.goods_package) + '/'
            goods_piece = parseFloat(goods_piece) + (item.goods_piece == '' || item.goods_piece == null ? '' : parseFloat(item.goods_piece))
            goods_weight = parseFloat(goods_weight) + (item.goods_weight == '' || item.goods_weight == null ? '' : parseFloat(item.goods_weight))
            goods_volume = parseFloat(goods_volume) + (item.goods_volume == '' || item.goods_volume == null ? '' : parseFloat(item.goods_volume))
           
          }
        })
        manifest.goods_name = goods_name
        manifest.goods_package = goods_package
        manifest.goods_piece = goods_piece
        manifest.goods_weight = goods_weight
        manifest.goods_volume = goods_volume
        return manifest
      })
      if(aa){
        this.tableData_to = infoAdd;
      }else{
        this.tableData = infoAdd;
      }
      
    },
    editEave() { // 保存
      this.disabledInput = true;
      this.sendMessage();
    },
     sendMessage() { // 保存数据到后台
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
      let business_Terminaldeparture_Inventories = [];
      this.$store.state.distributionShow.data1.forEach(ele =>{
        let obj = {
            terminaldeparture_inventory_id: ele.terminaldeparture_inventory_id ? ele.terminaldeparture_inventory_id : "",
            stock_id:ele.stock_id,
            manifest_id: ele.manifest_id,
            manifestdtl_id: ele.manifestdtl_id,
            terminaldeparture_id: ele.terminaldeparture_id,
            goods_name: ele.goods_name,
            goods_package: ele.goods_package,
            goods_piece: ele.goods_piece,
            goods_weight: ele.goods_weight,
            goods_volume: ele.goods_volume
          }
          business_Terminaldeparture_Inventories.push(obj)
      })
      
      const data1 = {
        business_Terminaldeparture: {
          terminaldeparture_id: this.$route.params.id,
          contract_code: this.dispatching.contractNumber,
          terminaldeparture_date: this.dispatching.date,
          terminaldeparture_state_id: this.dispatching.dispatchingState,
          user_id: JSON.parse(storage.getStorage('currentUser')).userId,
          terminaldeparture_org_id: this.dispatching.site,
          terminaldeparture_consigntype_id: this.dispatching.transport_value,
          carrier_name: this.dispatching.carrier,
          plate_number: this.dispatching.number,
          driver_name: this.dispatching.driver,
          driver_phone: this.dispatching.phone,
          driver_idcard: '',
          terminaldeparture_comment: this.dispatching.remarks,
          freight_cashpay: this.result.xf,
          freight_collect: this.result.df,
          freight_backpay: this.result.hf,
          fuelcard_number: this.result.kahao,
          fuelcard_org: this.result.commany,
          fuelcard_driver: this.result.yk,
          cover_charge: this.result.fb,
          issurance_charge: this.result.bx,
          handling_charge: this.result.zx,
          landing_charge: this.result.ld,
          other_charge: this.result.other,
          other_charge_comment: this.result.explain,
          total_charge: this.result.moneyTotal,
          create_user_id: this.Create_User_ID,
          create_time: time,
          create_org_id: this.Create_Org_ID,
          edit_user_id: this.Create_User_ID,
          edit_time: time,
          edit_org_id: this.Create_Org_ID,
        },
        business_Terminaldeparture_Inventories:business_Terminaldeparture_Inventories,
        terminaldeparture_inventory_ids:this.ids
      }
      console.log(JSON.stringify(data1))
      axios.post(url.apiUrl() + '/api/Terminaldeparture/UpdateTerminaldeparture', data1)
        .then(function(val) {
          if (val.data.error === '') {
            console.log(val.data)
            // _this.dispatching.contractNumber = val.data.data;
            _this.$message({
              type: 'success',
              message: '保存成功!'
            })
            _this.$router.push({ path: '/operationFlow/distribution' })
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    editUpdate() { // 修改
      this.disabledInput = false;
      this.baocun = true;
      this.activeName2 = "third"
    },
    CalculationMoney() {
      this.result.moneyTotal = parseInt(this.result.xf) + parseInt(this.result.df) + parseInt(this.result.hf) + parseInt(this.result.yk) + parseInt(this.result.fb) + parseInt(this.result.bx) + parseInt(this.result.zx) + parseInt(this.result.ld) + parseInt(this.result.other)
    },
    editDelete() { // 删除
      this.$confirm('是否删除当前运单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteMessage();
        let view = this.$route;
        this.$store.dispatch('delVisitedViews', view).then((views) => {
          
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView)
          } else {
            this.$router.push('/')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteMessage(){
      const _this = this ;
      axios.post(url.apiUrl() + '/api/Terminaldeparture/DelDetail?terminaldeparture_id='+this.$route.params.id)
        .then(function(val) {
          if (val.data.error == '') {
            _this.$message({
              type:"success",
              message:"删除成功！"
            });
            _this.$router.push({ path: '/operationFlow/distribution' })
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error('获取数据失败,请稍后再试14!')
        })
    },
    fetchData() {

    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    SelectWaybillDetailed(row, column, cell, event) {
      let allDatas = this.$store.state.distributionShow.datas;
      let needData = allDatas.filter(ele =>{ // 筛选出运单号的明细
        if(ele.manifest.manifest_id == row.manifest_id){
          return ele ;
        }
      })
      let info = []
      needData.map(ele =>{ // 运单号明细的汇总
        ele.stocks.map(item =>{
          const a = Object.assign(JSON.parse(JSON.stringify(item)), JSON.parse(JSON.stringify(ele.manifest)))
          info.push(a) 
        })
        
      })
      this.WaybillDetailedTable = info;
      this.dialogTableVisible = true
    },
    WaybillSelectInputLeft() {
      const arr = new Array()
      this.tableData.forEach((item, index) => {
        if (item.prop1 == this.formInline.numberLeft) {
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
        if (item.prop1 == this.formInline.numberRight) {
          this.tableData.push(item)
        } else {
          arr.push(item)
        }
      })

      this.tableData_to = arr
    },
    handleSelectionWaybillDetailedChange(val) {  // 弹窗表格选择
      this.SelectionWaybillDetailedChangeData = val
    },
    addTableData3() { // 整合table3的数据 把相同的mainfast_id放到一起
      const arr = JSON.parse(JSON.stringify(this.$store.state.distributionShow.data1))
      var map = {}, dest = [] // dest就是处理过后的数据
      for (let i = 0; i < arr.length; i++) {
        var ai = arr[i]
        if (!map[ai.manifest_id]) {
          dest.push({
            manifest_id: ai.manifest_id,

            data: [ai]
          })
          map[ai.manifest_id] = ai
        } else {
          for (let j = 0; j < dest.length; j++) {
            var dj = dest[j]
            if (dj.manifest_id == ai.manifest_id) {
              dj.data.push(ai)
              break
            }
          }
        }
      }
      this.$store.state.distributionShow.data2=dest;
      
    },
    renderTableData3() { // 渲染table 3的数据
      const aa = JSON.parse(JSON.stringify(this.$store.state.distributionShow.data2))
      
      const arrx = []
      const xx = aa.map(ele => {
        var goods_piece = 0, goods_weight = 0, goods_volume = 0

        ele.data.forEach(item => {
          goods_piece += parseFloat(item.goods_piece)
          goods_weight += parseFloat(item.goods_weight)
          goods_volume += parseFloat(item.goods_volume)
        })
        const all = ele.data[0]
        delete ele.data
        all.goods_piece = goods_piece
        all.goods_weight = goods_weight
        all.goods_volume = goods_volume
        return all
      })
      this.tableData_to = xx
    },
    GetSelectionWaybillDeta() { //弹窗中点击确定执行的事件
      const data = this.SelectionWaybillDetailedChangeData;
      if(data.length != 0){
          let allDatas = this.$store.state.distributionShow.datas,data1 = this.$store.state.distributionShow.data1, mxArr = [],id = '',idl = '';
          let newAddArr = [];
          allDatas.filter((ele, index) => { // 遍历左侧详情数据
            ele.stocks.filter((ite, key) => { // 便利运单明细
              // let obj = {
              //   manifest:ele.manifest,
              //   stocks:[]
              // }
              data.filter((item, i) => { // 便利弹窗选中的明细
                if ( ite.stock_id === item.stock_id ) {
                  ite.goods_piece = ite.goods_piece - item.goods_piece;
                  ite.goods_weight = ite.goods_weight - item.goods_weight;
                  ite.goods_volume = ite.goods_volume - item.goods_volume;
                }
              })
          })
        })
        this.addInfo(allDatas);
        this.$store.state.distributionShow.data1.push(...data)
        this.addTableData3();
        this.renderTableData3();
         this.dialogTableVisible = false ;
        
      }else{
        this.$message.error("请先勾选明细列表!");
      }
      
      
      // let sum = 0

      // data.forEach((item, index) => {
      //   sum += parseInt(item.prop6)
      // })

      // // 判断这条记录是否存在

      // if (this.tableData[this.SelectWaybillDetailedIndex].prop6 == sum) {
      //   this.tableData.splice(this.SelectWaybillDetailedIndex, 1)
      //   this.tableData_to.push(this.tableData[this.SelectWaybillDetailedIndex])
      // }

      // if (this.tableData[this.SelectWaybillDetailedIndex].prop6 > sum) {
      //   this.tableData[this.SelectWaybillDetailedIndex].prop6 -= sum
      //   const to_index = this.tableData_to.push(this.tableData[this.SelectWaybillDetailedIndex])
      //   this.tableData_to[to_index - 1].prop6 = sum
      // }
    },
    handleSelectionChange(val) {
      const data = new Array()
      val.forEach((val, index) => {
        this.tableData.forEach((v, i) => {
          // id 是每一行的数据id
          if (val.prop1 == v.prop1) {
            data.push(i)
          }
        })
      })
      this.SelectionChange = data
      this.SelectionChangeData = val
    },
    handleSelectionChangeCancel(val) {
      const data = new Array()
      val.forEach((val, index) => {
        this.tableData_to.forEach((v, i) => {
          // id 是每一行的数据id
          if (val.prop1 == v.prop1) {
            data.push(i)
          }
        })
      })
      this.SelectionChangeCancel = data
      this.SelectionChangeCancelData = val
    },
    isInArray(arr, value) {
      for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
          return true
        }
      }
      return false
    },
    SelectConfigure() {  // 快速添加
      if(this.SelectionChangeData.length == 0){
        this.$message.error("请先勾选明细列表!");
      }else{
        let allDatas = this.$store.state.distributionShow.datas,data1 = this.$store.state.distributionShow.data1,selectDatas = this.SelectionChangeData;
        
        let arr = [],arr1=[],bb=[],newallDatas = JSON.parse(JSON.stringify(allDatas));
        selectDatas.forEach(ele =>{
          let aa = allDatas.find( item => item.manifest.manifest_id == ele.manifest_id);
          bb.push(aa)
        });
        let aaa = [];
        allDatas.filter((ele, index) => { // 遍历左侧详情数据
          
          selectDatas.filter(item =>{
            if(ele.manifest.manifest_id == item.manifest_id){
             aaa.push(index)
            }else{
              
            }
          })
          
        })
        for(let j of aaa.reverse()){
          allDatas.splice(j , 1)
        };
        this.$store.state.distributionShow.datas = allDatas ;
        this.addInfo(allDatas);
        let cc = [];
        bb.forEach(ele =>{
          ele.stocks.forEach(ite =>{
            let boj = Object.assign(ite , ele.manifest);
            cc.push(boj)
          })
        })
        console.log("cc",cc);
        let kk = [];
        this.$store.state.distributionShow.data1.forEach(ele =>{
          let mm = cc.find(item =>{
            return item.stock_id == ele.stock_id;
          })
          if(mm == "" || mm == undefined){

          }else{
            kk.push(mm)
          }
          
        })
        console.log("kk",kk);
        if(kk.length>0){
          this.$store.state.distributionShow.data1.forEach(ele =>{
            kk.forEach(item =>{
              if(item.stock_id == ele.stock_id){
                ele.goods_piece = parseFloat(ele.goods_piece) + parseFloat(item.goods_piece)
                ele.goods_weight = parseFloat(ele.goods_weight) + parseFloat(item.goods_weight)
                ele.goods_volume = parseFloat(ele.goods_volume) + parseFloat(item.goods_volume)
              }
            })
          })
        }else{
          this.$store.state.distributionShow.data1.push(...cc);
        }
        console.log("this.$store.state.distributionShow.data1",this.$store.state.distributionShow.data1)
        
        this.addTableData3();
        this.renderTableData3();
      }
    },
    SelectAllConfigure() {
      // this.tableData.forEach((item, index) => {
      //   this.tableData_to.push(item)
      // })

      // this.tableData = []
     
        let allDatas = this.$store.state.distributionShow.datas,data1 = this.$store.state.distributionShow.data1;
        
        let selectDatas = [];
        JSON.parse(JSON.stringify(allDatas)).forEach(ele =>{
          ele.stocks.forEach(item =>{
            let obj = Object.assign(item , ele.manifest);
            selectDatas.push(obj)
          })
        });
        let arr = [],arr1=[],bb=[],newallDatas = JSON.parse(JSON.stringify(allDatas));
        selectDatas.forEach(ele =>{
          let aa = allDatas.find( item => item.manifest.manifest_id == ele.manifest_id);
          bb.push(aa)
        });
        
        let aaa = [];
        allDatas.filter((ele, index) => { // 遍历左侧详情数据
          
          selectDatas.filter(item =>{
            if(ele.manifest.manifest_id == item.manifest_id){
             aaa.push(index)
            }else{
              
            }
          })
          
        })
        for(let j of aaa.reverse()){
          allDatas.splice(j , 1)
        };
        this.$store.state.distributionShow.datas = allDatas ;
        this.addInfo(allDatas);
        let cc = [];
        bb.forEach(ele =>{
          ele.stocks.forEach(ite =>{
            let boj = Object.assign(ite , ele.manifest);
            cc.push(boj)
          })
        })
        let data1Info = JSON.parse(JSON.stringify(cc));
        console.log("cc",cc);
        let kk = [];
        this.$store.state.distributionShow.data1.forEach(ele =>{
          let mm = cc.find(item =>{
            return item.stock_id == ele.stock_id;
          })
          if(mm == "" || mm == undefined){

          }else{
            kk.push(mm)
          }
          
        })
        console.log("kk",kk);
        if(kk.length>0){
          // this.$store.state.distributionShow.data1.push(...cc);
          // console.log(this.$store.state.distributionShow.data1)
          
          let deleteIndex = [];
          data1Info.forEach((ele , index) =>{
            kk.forEach(item =>{
              if(item.stock_id == ele.stock_id){
                deleteIndex.push(index);
                item.goods_piece = parseFloat(ele.goods_piece) + parseFloat(item.goods_piece)
                item.goods_weight = parseFloat(ele.goods_weight) + parseFloat(item.goods_weight)
                item.goods_volume = parseFloat(ele.goods_volume) + parseFloat(item.goods_volume)
              }
            })
          })
          console.log(kk,"kk")
          this.$store.state.distributionShow.data1 = kk;
          deleteIndex.reverse().forEach(ele =>{
            data1Info.splice(ele , 1)
          });
          console.log(data1Info,"data1Info")
          this.$store.state.distributionShow.data1.push(...data1Info);
          console.log(this.$store.state.distributionShow.data1)
        }else{
          this.$store.state.distributionShow.data1.push(...cc);
        }
        console.log("this.$store.state.distributionShow.data1",this.$store.state.distributionShow.data1)
        
        this.addTableData3();
        this.renderTableData3();
      
    },
    SelectCancelConfigure() {
      
      const selectData = this.SelectionChangeCancelData;
      let allDatas = this.$store.state.distributionShow.datas,data1 = this.$store.state.distributionShow.data1
      if(selectData.length <= 0){
        this.$message.error("请先勾选右侧想要删除的部分!");
      }else{
        
        let bb = false;
        selectData.forEach(item =>{
          if(item.terminaldeparture_inventory_id){
            this.ids.push(item.terminaldeparture_inventory_id);
          }
          bb = allDatas.find(ite =>{
            return ite.manifest.manifest_id == item.manifest_id
          })
        });
        console.log("bb",bb)
        if(bb){
          let newAddArr = [],aaa = [];;
            allDatas.filter((ele, index) => { // 遍历左侧详情数据
              ele.stocks.filter((ite, key) => { // 便利运单明细
                selectData.filter((item, i) => { // 便利弹窗选中的明细
                  if ( ite.stock_id === item.stock_id ) {
                    aaa.push(item.stock_id)
                    ite.goods_piece = parseFloat(ite.goods_piece) + parseFloat(item.goods_piece);
                    ite.goods_weight = parseFloat(ite.goods_weight) + parseFloat(item.goods_weight);
                    ite.goods_volume = parseFloat(ite.goods_volume) + parseFloat(item.goods_volume);
                  }
                })
            })
          })
          this.$store.state.distributionShow.datas = allDatas;
          this.addInfo(this.$store.state.distributionShow.datas);
          let DeleteArr = [];
          for(let j of aaa.reverse()){
            this.$store.state.distributionShow.data2.forEach((ele,index) =>{
              ele.data.forEach(item =>{
                if(item.stock_id == j){
                  DeleteArr.push(index);
                }
              })
            })
          };
          for(let k of DeleteArr.reverse()){
            this.$store.state.distributionShow.data2.splice(k , 1);
          }
          let arr = [];
          this.$store.state.distributionShow.data2.forEach(ele =>{
            ele.data.forEach(item =>{
              arr.push(item)
            })
          })
          this.$store.state.distributionShow.data1 = arr ;
          this.addTableData3();
          this.renderTableData3();
        }else{
          this.addTableData3();
          let stor2 = this.$store.state.distributionShow.data2;
          console.log("stor2",stor2);
          
          let manifest=[],stocks=[];
          stor2.forEach(ele =>{
            let obj;
            ele.data.forEach(item =>{
              selectData.forEach(ite =>{
                if(ite.stock_id == item.stock_id){
                  obj = {
                    'manifest_id': item.manifest_id,
                    'manifest_code': item.manifest_code,
                    'shipper_code': item.shipper_code,
                    'shipping_date': item.shipping_date,
                    'departure_city': item.departure_city,
                    'departure_org_id': item.departure_org_id,
                    'manifest_state_id': item.manifest_state_id,
                    'arrival_city': item.arrival_city,
                    'arrival_org_id': item.arrival_org_id,
                    'transportation_type': item.transportation_type,
                    'consigner_unit': item.consigner_unit,
                    'consigner_contact': item.consigner_contact,
                    'consigner_phone': item.consigner_phone,
                    'consigner_address': item.consigner_address,
                    'consignee_unit': item.consignee_unit,
                    'consignee_contact': item.consignee_contact,
                    'consignee_phone': item.consignee_phone,
                    'consignee_address': item.consignee_address,
                    'freight_charge': item.freight_charge,
                    'delivery_charge': item.delivery_charge,
                    'pickup_charge': item.pickup_charge,
                    'handling_charge': item.handling_charge,
                    'insurance_amount': item.insurance_amount,
                    'insurance_charge': item.insurance_charge,
                    'packing_charge': item.packing_charge,
                    'storage_charge': item.storage_charge,
                    'other_charge': item.other_charge,
                    'storage_prepayment': item.storage_prepayment,
                    'rebate_commission': item.rebate_commission,
                    'rebate_commission_print': item.rebate_commission_print,
                    'user_id': item.user_id,
                    'transfer_mode': item.transfer_mode,
                    'reciept_type': item.reciept_type,
                    'manifest_comment': item.manifest_comment,
                    'total_charge': item.total_charge,
                    'create_user_id': item.create_user_id,
                    'create_time': item.create_time,
                    'create_org_id': item.create_org_id,
                    'edit_user_id': item.edit_user_id,
                    'edit_time': item.edit_time,
                    'edit_org_id': item.edit_org_id,
                    'departure_balance_date': item.departure_balance_date,
                    'departure_balance_person': item.departure_balance_person,
                    'departure_2ndbalance_date': item.departure_2ndbalance_date,
                    'departure_2ndbalance_person': item.departure_2ndbalance_person,
                    'entryfee_collect': item.entryfee_collect,
                    'arrival_balance_date': item.arrival_balance_date,
                    'arrival_balance_person': item.arrival_balance_person,
                    'driver_balance_date': item.driver_balance_date,
                    'driver_balance_person': item.driver_balance_person,
                    'operate_org_id': item.operate_org_id,
                    'operate_user_id': item.operate_user_id,
                    'operate_date': item.operate_date,
                    'departure_org_name': item.departure_org_name,
                    'departure_org_code': item.departure_org_code,
                    'arrival_org_name': item.arrival_org_name,
                    'arrival_org_code': item.arrival_org_code,
                    'transportation_type_name': item.transportation_type_name,
                    'user_displayname': item.user_displayname,
                    'transfer_mode_name': item.transfer_mode_name,
                    'reciept_type_name': item.reciept_type_name,
                    'create_org_name': item.create_org_name,
                    'edit_org_name': item.edit_org_name,
                    'edit_user_account': item.edit_user_account,
                    'manifest_ids': item.manifest_ids,
                    'payment_mode_id': item.payment_mode_id,
                    'payment_mode_name': item.payment_mode_name,
                    'xianfu': item.xianfu,
                    'daofu': item.daofu,
                    'qianfu': item.qianfu,
                    'huidanfu': item.huidanfu,
                    'fahuoyuejie': item.fahuoyuejie,
                    'shouhuoyuejie': item.shouhuoyuejie,
                    'huokuankou': item.huokuankou,
                    'huodaodaka': item.huodaodaka,
                    'manifest_state_name': item.manifest_state_name
                    
                  }
                  manifest.push({manifest:obj,stocks:[],stock_id:item.stock_id})
                }
              })
              
            })
            
          });
          console.log("manifest",manifest)
          let aaa = [];
          stor2.forEach((ele,index) =>{
            ele.data.forEach(item =>{
              manifest.forEach(ite =>{
                if(ite.stock_id == item.stock_id){
                  aaa.push(item.manifest_id)
                  let stock = {
                    'stock_id': item.stock_id,
                    'manifestdtl_id': item.manifestdtl_id,
                    'manifest_id': item.manifest_id,
                    'org_id': item.org_id,
                    'departure_warehouselocation_id': item.departure_warehouselocation_id,
                    'arrival_warehouselocation_id': item.arrival_warehouselocation_id,
                    'goods_name': item.goods_name,
                    'goods_package': item.goods_package,
                    'goods_piece': item.goods_piece,
                    'goods_weight': item.goods_weight,
                    'goods_volume': item.goods_volume,
                    'stock_state_id': item.stock_state_id,
                    'mark_ss_removed': item.mark_ss_removed
                  }
                  ite.stocks.push(stock)
                }
              })
            
            })
            
          })
          console.log("push的数据",manifest)
          this.$store.state.distributionShow.datas.push(...manifest);
          this.addInfo(this.$store.state.distributionShow.datas);
          let DeleteArr = [];
          aaa.reverse().forEach(j =>{
            
            this.$store.state.distributionShow.data2.forEach((ele,index) =>{
              ele.data.forEach(item =>{
                if(item.manifest_id == j){
                  DeleteArr.push(index);
                }
              })
            })
          })
          DeleteArr.forEach((k,index) =>{
            console.log("k",k,index)
            this.$store.state.distributionShow.data1.splice(k , 1);
            this.$store.state.distributionShow.data2.splice(k , 1);
          })
          console.log("this.$store.state.distributionShow.data1",this.$store.state.distributionShow.data1,this.$store.state.distributionShow.data2)
          
          this.tableData_to = this.$store.state.distributionShow.data1;
        }
        
      }
      
    },
    SelectAllCancelConfigure() {
      // this.tableData_to.forEach((item, index) => {
      //   this.tableData.push(item)
      // })

      // this.tableData_to = []
      const selectData = this.$store.state.distributionShow.data1;
      let allDatas = this.$store.state.distributionShow.datas,data1 = this.$store.state.distributionShow.data1
        let bb = false;
        selectData.forEach(item =>{
          if(item.terminaldeparture_inventory_id){
            this.ids.push(item.terminaldeparture_inventory_id);
          }
          bb = allDatas.find(ite =>{
            return ite.manifest.manifest_id == item.manifest_id
          })
        });
        console.log("bb",bb)
        if(bb){
          let newAddArr = [],aaa = [];;
            allDatas.filter((ele, index) => { // 遍历左侧详情数据
              ele.stocks.filter((ite, key) => { // 便利运单明细
                selectData.filter((item, i) => { // 便利弹窗选中的明细
                  if ( ite.stock_id === item.stock_id ) {
                    aaa.push(item.stock_id)
                    ite.goods_piece = parseFloat(ite.goods_piece) + parseFloat(item.goods_piece);
                    ite.goods_weight = parseFloat(ite.goods_weight) + parseFloat(item.goods_weight);
                    ite.goods_volume = parseFloat(ite.goods_volume) + parseFloat(item.goods_volume);
                  }
                })
            })
          })
          this.$store.state.distributionShow.datas = allDatas;
          this.addInfo(this.$store.state.distributionShow.datas);
          let DeleteArr = [];
          for(let j of aaa.reverse()){
            this.$store.state.distributionShow.data2.forEach((ele,index) =>{
              ele.data.forEach(item =>{
                if(item.stock_id == j){
                  DeleteArr.push(index);
                }
              })
            })
          };
          for(let k of DeleteArr.reverse()){
            this.$store.state.distributionShow.data2.splice(k , 1);
          }
          let arr = [];
          this.$store.state.distributionShow.data2.forEach(ele =>{
            ele.data.forEach(item =>{
              arr.push(item)
            })
          })
          this.$store.state.distributionShow.data1 = arr ;
          this.addTableData3();
          this.renderTableData3();
        }else{
          this.addTableData3();
          let stor2 = this.$store.state.distributionShow.data2;
          console.log("stor2",stor2);
          
          let manifest=[],stocks=[];
          stor2.forEach(ele =>{
            let obj;
            ele.data.forEach(item =>{
              selectData.forEach(ite =>{
                if(ite.stock_id == item.stock_id){
                  obj = {
                    'manifest_id': item.manifest_id,
                    'manifest_code': item.manifest_code,
                    'shipper_code': item.shipper_code,
                    'shipping_date': item.shipping_date,
                    'departure_city': item.departure_city,
                    'departure_org_id': item.departure_org_id,
                    'manifest_state_id': item.manifest_state_id,
                    'arrival_city': item.arrival_city,
                    'arrival_org_id': item.arrival_org_id,
                    'transportation_type': item.transportation_type,
                    'consigner_unit': item.consigner_unit,
                    'consigner_contact': item.consigner_contact,
                    'consigner_phone': item.consigner_phone,
                    'consigner_address': item.consigner_address,
                    'consignee_unit': item.consignee_unit,
                    'consignee_contact': item.consignee_contact,
                    'consignee_phone': item.consignee_phone,
                    'consignee_address': item.consignee_address,
                    'freight_charge': item.freight_charge,
                    'delivery_charge': item.delivery_charge,
                    'pickup_charge': item.pickup_charge,
                    'handling_charge': item.handling_charge,
                    'insurance_amount': item.insurance_amount,
                    'insurance_charge': item.insurance_charge,
                    'packing_charge': item.packing_charge,
                    'storage_charge': item.storage_charge,
                    'other_charge': item.other_charge,
                    'storage_prepayment': item.storage_prepayment,
                    'rebate_commission': item.rebate_commission,
                    'rebate_commission_print': item.rebate_commission_print,
                    'user_id': item.user_id,
                    'transfer_mode': item.transfer_mode,
                    'reciept_type': item.reciept_type,
                    'manifest_comment': item.manifest_comment,
                    'total_charge': item.total_charge,
                    'create_user_id': item.create_user_id,
                    'create_time': item.create_time,
                    'create_org_id': item.create_org_id,
                    'edit_user_id': item.edit_user_id,
                    'edit_time': item.edit_time,
                    'edit_org_id': item.edit_org_id,
                    'departure_balance_date': item.departure_balance_date,
                    'departure_balance_person': item.departure_balance_person,
                    'departure_2ndbalance_date': item.departure_2ndbalance_date,
                    'departure_2ndbalance_person': item.departure_2ndbalance_person,
                    'entryfee_collect': item.entryfee_collect,
                    'arrival_balance_date': item.arrival_balance_date,
                    'arrival_balance_person': item.arrival_balance_person,
                    'driver_balance_date': item.driver_balance_date,
                    'driver_balance_person': item.driver_balance_person,
                    'operate_org_id': item.operate_org_id,
                    'operate_user_id': item.operate_user_id,
                    'operate_date': item.operate_date,
                    'departure_org_name': item.departure_org_name,
                    'departure_org_code': item.departure_org_code,
                    'arrival_org_name': item.arrival_org_name,
                    'arrival_org_code': item.arrival_org_code,
                    'transportation_type_name': item.transportation_type_name,
                    'user_displayname': item.user_displayname,
                    'transfer_mode_name': item.transfer_mode_name,
                    'reciept_type_name': item.reciept_type_name,
                    'create_org_name': item.create_org_name,
                    'edit_org_name': item.edit_org_name,
                    'edit_user_account': item.edit_user_account,
                    'manifest_ids': item.manifest_ids,
                    'payment_mode_id': item.payment_mode_id,
                    'payment_mode_name': item.payment_mode_name,
                    'xianfu': item.xianfu,
                    'daofu': item.daofu,
                    'qianfu': item.qianfu,
                    'huidanfu': item.huidanfu,
                    'fahuoyuejie': item.fahuoyuejie,
                    'shouhuoyuejie': item.shouhuoyuejie,
                    'huokuankou': item.huokuankou,
                    'huodaodaka': item.huodaodaka,
                    'manifest_state_name': item.manifest_state_name
                    
                  }
                  manifest.push({manifest:obj,stocks:[],stock_id:item.stock_id})
                }
              })
              
            })
            
          });
          console.log("manifest",manifest)
          let aaa = [];
          stor2.forEach((ele,index) =>{
            ele.data.forEach(item =>{
              manifest.forEach(ite =>{
                if(ite.stock_id == item.stock_id){
                  aaa.push(item.manifest_id)
                  let stock = {
                    'stock_id': item.stock_id,
                    'manifestdtl_id': item.manifestdtl_id,
                    'manifest_id': item.manifest_id,
                    'org_id': item.org_id,
                    'departure_warehouselocation_id': item.departure_warehouselocation_id,
                    'arrival_warehouselocation_id': item.arrival_warehouselocation_id,
                    'goods_name': item.goods_name,
                    'goods_package': item.goods_package,
                    'goods_piece': item.goods_piece,
                    'goods_weight': item.goods_weight,
                    'goods_volume': item.goods_volume,
                    'stock_state_id': item.stock_state_id,
                    'mark_ss_removed': item.mark_ss_removed
                  }
                  ite.stocks.push(stock)
                }
              })
            
            })
            
          })
          console.log("push的数据",manifest)
          this.$store.state.distributionShow.datas.push(...manifest);
          this.addInfo(this.$store.state.distributionShow.datas);
          let DeleteArr = [];
          aaa.reverse().forEach(j =>{
            
            this.$store.state.distributionShow.data2.forEach((ele,index) =>{
              ele.data.forEach(item =>{
                if(item.manifest_id == j){
                  DeleteArr.push(index);
                }
              })
            })
          })
          DeleteArr.forEach((k,index) =>{
            console.log("k",k,index)
            this.$store.state.distributionShow.data1.splice(k , 1);
            this.$store.state.distributionShow.data2.splice(k , 1);
          })
          console.log("this.$store.state.distributionShow.data1",this.$store.state.distributionShow.data1,this.$store.state.distributionShow.data2)
          
          this.tableData_to = this.$store.state.distributionShow.data1;
        }
        
      
    },
    // ////////////////////////////////////////////////////////////////////

    handleChangeTab(tabIndex) {
      this.currentTab = tabIndex
      // do something
    },
    handleClickSearch() {
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

  },
  beforeDestroy(){ // 清除vuex的数据
    this.$store.state.distributionShow.datas = [];
    this.$store.state.distributionShow.data1 = [];
    this.$store.state.distributionShow.data2 = [];
  }
}
</script>

<style>
.Distribution{padding: 15px;height: 100%;display: flex;flex-direction: column;}
.Distribution .Distribution-footer{text-align: center;}
.cell{
     white-space: nowrap!important;
 }

.DistributionMin{
    border:1px solid #ccc;padding:5px;
}
.Distribution .DistributionMin .el-table--small td, .Distribution .DistributionMin .el-table--small th{padding: 0px;}
.Distribution .DistributionMin .el-table--medium td, .Distribution .DistributionMin .el-table--medium th{padding: 0px;}
.Distribution .DistributionMin .el-table td, .Distribution .DistributionMin .el-table th{padding: 0px;}

.Distribution .DistributionMin_to .el-table--small td, .Distribution .DistributionMin_to .el-table--small th{padding: 0px;}
.Distribution .DistributionMin_to .el-table--medium td, .Distribution .DistributionMin_to .el-table--medium th{padding: 0px;}
.Distribution .DistributionMin_to .el-table td, .Distribution .DistributionMin_to .el-table th{padding: 0px;}
.edit-page-modula{font-size: 10px}
.el-input-group__prepend{
  background-color: #FFF;border:none;padding: 0px 5px 0px 5px;
}
.radio-label {
  font-size: 8px;
  color: #606266;
  padding: 0 5px 0 5px;
}

.edit-page-modular{border:1px solid #A1C4E7;margin: 0px 0px 8px 0px}
.edit-page-modular-allotcar{margin: 8px 0px 8px 0px}

.hideIcon .el-input--medium .el-input__icon{display: none}
.edit-page-modular .Edit-Title{text-align: center;margin: 5px;padding: 0px 50px 0px 50px;color:#666;font-size: 1.5em}
.edit-page-modular .el-input--medium .el-input__inner{
  padding: 2px 5px 2px 5px;height: 25px;line-height: 25px;border-radius: 0px;border:none;border-bottom:1px solid #ccc;
}
.flex1{
  flex: 1;
  display: flex;
  flex-direction: column;
}
.aa1{
  display: flex;
  flex-direction: column;
  flex: 1;
}
.aa1 .el-table__body-wrapper{
  flex: 1;
}
.el-tabs__content{
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
<style lang="scss" scoped>

</style>


