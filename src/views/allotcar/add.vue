<template>
  <div class="app-container AllotcarAdd">
      <div class="top">
        <!-- <el-button class="page-btn-group" size="mini" @click="editInsert">新增</el-button> -->
        <el-button class="page-btn-group" size="mini" @click="editEave">保存</el-button>
        <el-button class="page-btn-group" size="mini">保存并打印</el-button>
        <!-- <el-button class="page-btn-group" size="mini" v-show="isEdit">取消</el-button> -->
        <!-- <el-button class="page-btn-group" size="mini">发车</el-button> -->
        <!-- <el-button class="page-btn-group" size="mini" @click="editUpdate">修改</el-button> -->
        <!-- <el-button class="page-btn-group" size="mini" @click="editDelete">删除</el-button> -->
        <el-select v-model="Status"  placeholder="打印">
        <el-option
                v-for="item in print"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        
        </el-select>
        
        <el-button class="page-btn-group" size="mini">上传附件</el-button>
        <el-button class="page-btn-group" size="mini"  @click="dialogFormVisible = true" >进仓费录入</el-button>
    
        <hr>
        <el-tabs  type="card" @tab-click="handleClick">
        <el-tab-pane label="派车" ></el-tab-pane>
        <el-tab-pane  label="添加运单"></el-tab-pane>

    </el-tabs>
  </div>
 
<div class="edit-page-modular" v-if="tab_show==0">
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
              :key="item.value" 
              :label="item.Departure_State_Name" 
              :value="item.Departure_State_Id"></el-option>
            </el-select>
        </el-col>
        <el-col :span="4">
          <!-- <el-input v-model="originator" class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >制 单 人 : </label></el-input> -->
          <el-input disabled v-model.trim="dispatching.originator"><label class="radio-label" slot="prepend" >制 单 人 : </label></el-input>
        </el-col>
        <el-col :span="5">
          <!-- <el-input class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >发货网点: </label></el-input> -->
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
        <el-date-picker type="date" v-model="dispatching.date" style="width:150px;padding-left: 30px" placeholder="选择日期"></el-date-picker>
        </el-col>
    </el-row>
  
    <el-row class="edit-page-modular-allotcar">
        <div>&nbsp;&nbsp;调度信息：</div>
        <el-col :span="4">
          <label class="radio-label">&nbsp;&nbsp;委托类型: </label>
            <el-select v-bind:disabled="disabledInput" @change="wtlx" v-model="dispatching.transport_value" placeholder="请选择" style="width:110px;">
              <el-option 
              v-for="item in transportState1" 
              :key="item.value" 
              :label="item.Departure_Consigntype_Name" 
              :value="item.Departure_Consigntype_Id"></el-option>
            </el-select>
        </el-col>
        <el-col :span="4">
          <label class="radio-label">&nbsp;&nbsp;承 运 商 : </label>
          <!-- <el-select v-bind:disabled="disabledInput" v-model="dispatching.carrier" placeholder="请选择" style="width:110px;">
              <el-option 
              v-for="item in CarrierList" 
              :key="item.value" 
              :label="item.metadata_carrier.carrier_name" 
              :value="item.metadata_carrier.carrier_id"></el-option>
            </el-select> -->
          <el-autocomplete 
              popper-class="my-autocomplete"
              v-model.trim="dispatching.carrier"
              :fetch-suggestions="getCarrierList"
              placeholder="请输入内容"
              
              @select="getCarrier"
              clearable
              >
              <template slot-scope="{ item }">
                  <div class="name">{{ item.metadata_carrier.carrier_name }}</div>
              </template>
          </el-autocomplete>
        </el-col>
        <el-col :span="4">
          <label class="radio-label">&nbsp;&nbsp;车 牌 号 : </label>
          <!-- <el-select v-bind:disabled="disabledInput" @change="selectInfo" v-model="dispatching.number" placeholder="请选择" style="width:110px;">
              <el-option 
              v-for="item in VehicleList" 
              :key="item.value" 
              :label="item.v.vehicle_platenumber" 
              :value="item.v.vehicle_platenumber"></el-option>
            </el-select> -->
            <el-autocomplete 
              popper-class="my-autocomplete"
              v-model.trim="dispatching.number"
              :fetch-suggestions="getVehicleList"
              placeholder="请输入内容"
              
              @select="getVehicle"
              clearable
              >
              <template slot-scope="{ item }">
                  <div class="name">{{ item.v.vehicle_platenumber }}</div>
              </template>
          </el-autocomplete>
          <!-- <el-input class="input-group" v-model="dispatching.number" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >车 牌 号 : </label></el-input> -->
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
 
<el-row :gutter="10" class="sub-container flex-1" v-if="tab_show==1">
    <div class="sub_hear" ref="sub_hear">
    <el-row :gutter="20">
            <el-col :span="20" :offset="2">
            <el-form size="small" :inline="true"  class="form-wrapper">

            <el-row :gutter="10">
            <el-col :span="9"> <el-form-item label="快速增加">
                  <el-input v-model="formInline.numberLeft" @keyup.enter.native="WaybillSelectInputLeft"  style="width:80px;"   ></el-input>
              </el-form-item>

              <el-button  type="text"    icon="el-icon-arrow-right"  @click="leftitem"    ></el-button>
              <el-button  type="text"   icon="el-icon-d-arrow-right" @click="leftall"     ></el-button>
              </el-col>
            <el-col :span="9">  <el-form-item label="快速删除">
                  <el-input v-model="formInline.numberRight" @keyup.enter.native="WaybillSelectInputRight"   style="width:80px;" ></el-input>
              </el-form-item>
              <el-button   type="text"  icon="el-icon-arrow-left" @click="rightitem"     ></el-button>
              <el-button   type="text"  icon="el-icon-d-arrow-left" @click="rightall"      ></el-button>
              </el-col>
              <el-col :span="6">
                
                <el-button  @click="add_adds">添加卸货点</el-button>
              </el-col>
            </el-row>
            </el-form>

            </el-col>
    </el-row>
    </div>
    <el-col class="overflow-x-auto " :span="12">
        <div class="left">
        <el-table
          size="small"
          ref="multipleTable_list"
          
          :data="tableData1"
          @cell-click="split_single"
          @selection-change="handleSelectionChange_list"
          
          tooltip-effect="dark"
          border
          height="300">
          <el-table-column
              type="selection"
              width="60">
          </el-table-column>
          <el-table-column
                        label="序号"
                        type="index">
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
        <el-footer class="ac-footer  d-flex justify-content-center">
            <span>
                <el-button type="info" size="mini" @click="dialogChooseColumnVisible = true">列选择</el-button>
                <el-button type="info" size="mini" @click="toggleColumnSearch">列搜索</el-button>
                <el-button type="info" size="mini">导出</el-button>
            </span>
            <!-- <el-pagination
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
            </el-pagination> -->
        </el-footer>
        <!-- <el-footer class="ac-footer">
                    <el-col :span="24">
                        <el-button type="text" size="mini" @click="dialogChooseColumnVisible = true">列选择</el-button>
                        <el-button type="text" size="mini" @click="toggleColumnSearch">列搜索</el-button>
                        <el-button type="text" size="mini">导出</el-button>
                    </el-col>
        </el-footer> -->
        <el-dialog :visible.sync="dialogChooseColumnVisible" title="列选择">
                    <el-checkbox-group v-model="choosenColumns" class="ac-checkbox-group flex-cloumn">
                    <el-checkbox v-for="column in tableColumns" :label="column.label" :key="column.label">{{column.label}}</el-checkbox>
                    </el-checkbox-group>
        </el-dialog>
        </div>  
                </el-col>
                <el-col class="flex-cloumn right" :span="12">
                    <el-row class="posi-rela right_r1" style="  margin-bottom: 10px">
                        
                        <el-table
                             
                            ref="multipleTable"
                            :data="tableData2"
                            size="small"
                            @select="handleCurrentClick"
                            @selection-change='handleCurrentChange'
                            @select-all="changeall"
                            border
                            width="100%"
                            height="150">
                            <!-- <el-table-column
                                type="selection"
                                width="60">
                            </el-table-column> -->
                            <el-table-column label="选择" width="60" >
                            <template slot-scope="scope">
                              <el-radio :disabled="scope.row.site==''" v-model="preItem" @change="selectedRedio(scope.row,scope.$index)" :label="scope.$index">&nbsp;</el-radio>
                            </template>
                          </el-table-column>
                            <el-table-column
                                label="序号"
                                prop='index'
                                width="60">
                            </el-table-column>
                            <el-table-column
                                label="卸货网点"
                                prop='site'
                                width="180">
                                <template slot-scope="scope">
                                   <!-- <el-input size="mini" v-model="scope.row.site" placeholder=""></el-input> -->
                                   <el-select v-model="scope.row.site" filterable placeholder="请选择">
                                        <el-option
                                        v-for="item in customerList" 
                                        :key="item.value"
                                        :label="item.Org_name"
                                        :value="item.Org_id">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="单数"
                                prop='num'
                                width="100">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                width="100">
                                <template slot-scope="scope">
                                   <el-button
                                   size="mini"
                                   @click="handleDelete(scope.$index, tableData2)">删除</el-button>
                           
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <div class="right_r2">
                    <el-row class="overflow-x-auto flex-1 "  >
                         <el-table
                            size="small"
                            ref="multipleTable3"
                            :data="tableData3"
                            @selection-change='handleCurrentChange_tab3'
                            tooltip-effect="dark"
                            border
                            height="150">
                            <el-table-column
                              type="selection"
                              width="60">
                            </el-table-column>
                            <el-table-column
                                type="index"
                                width="60">
                            </el-table-column>
                              <el-table-column   v-for="item in tableColumns1" v-if="choosenColumns1.indexOf(item.label) > -1" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
                            <template slot-scope="scope">
                                <div v-if="scope.$index === 0 && openColumnSearch1">
                                    <el-input   v-model="columnSearch1[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch1"></el-input>
                                </div>
                                <span v-else>{{ scope.row[scope.column.property] }}</span>
                            </template>
                            </el-table-column>
                    
                        </el-table>
                        <el-footer class="ac-footer">
                    <el-col :span="24">
                        <el-button type="text" size="mini" @click="dialogChooseColumnVisible1 = true">列选择</el-button>
                        <el-button type="text" size="mini" @click="toggleColumnSearch1">列搜索</el-button>
                        <el-button type="text" size="mini">导出</el-button>
                    </el-col>
                </el-footer>
                <el-dialog :visible.sync="dialogChooseColumnVisible1" title="列选择">
                    <el-checkbox-group v-model="choosenColumns1" class="ac-checkbox-group flex-cloumn">
                    <el-checkbox v-for="column in tableColumns1" :label="column.label" :key="column.label">{{column.label}}</el-checkbox>
                    </el-checkbox-group>
                </el-dialog>
                 </el-row>
                </div>
       
    </el-col>
</el-row>


<el-dialog title="" :visible.sync="dialogFormVisible"  >
 
<el-row :gutter="20">
  <el-col :span="8">
    <el-input class="input-group"  v-model="form.name" >
            <label class="radio-label" slot="prepend" >提货人 </label>
          </el-input>
  </el-col>
 <el-col :span="8">
    <el-input class="input-group"  v-model="form.sid" >
            <label class="radio-label" slot="prepend" >收货人身份证号 </label>
    </el-input>
  </el-col> 
  <el-col :span="8">
    <el-input class="input-group"  v-model="form.tid" >
            <label class="radio-label"  slot="prepend">提货人身份证号 </label>
    </el-input>
  </el-col>
 
</el-row>


<el-row :gutter="20">
  <el-col :span="24">
    <el-input class="input-group"  v-model="form.bz"   >
            <label class="radio-label"  slot="prepend">提货人身份证号 </label>
    </el-input>    

  </el-col>
</el-row>


<el-row :gutter="20">
  <el-col :span="8">
    <el-input class="input-group"  v-model="form.price" >
            <label class="radio-label"  slot="prepend">实付进仓费 </label>
    </el-input>    
  </el-col>
 <el-col :span="8">
    <el-input class="input-group"  v-model="form.adds" >
            <label class="radio-label"  slot="prepend">进仓费操作网点 </label>
    </el-input>   
  </el-col> 
  <el-col :span="8">
    <el-input class="input-group"  v-model="form.admin" >
            <label class="radio-label" slot="prepend" >进仓费操作人 </label>
    </el-input>    
  </el-col>
 
</el-row>
 
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>


<el-dialog  :visible.sync="dialogTableVisible">
    <el-table
      size="small"
      ref="split"
      :data="tableData4"
      @selection-change="handleSelectionChange"
      tooltip-effect="dark"
      border
      height="100%">
      <el-table-column
          type="selection"
          width="60">
      </el-table-column>
      <el-table-column
          label="序号"
          type="index">
      </el-table-column>
      <el-table-column label="件数" width="100" align="center">
        <template slot-scope="scope">
          <el-input class="input-group" v-model.lazy="scope.row.goods_piece"></el-input>
        </template>
      </el-table-column>
      <el-table-column
          label="重量（公斤）"
          min-width="100">
          <template slot-scope="scope">
          <el-input class="input-group" v-model.trim="scope.row.goods_weight"></el-input>
        </template>
      </el-table-column>
      <el-table-column
          label="体积（立方）"
          min-width="100">
          <template slot-scope="scope">
          <el-input class="input-group" v-model.trim="scope.row.goods_volume"></el-input>
        </template>
      </el-table-column>
      <el-table-column
          label="品名"
          prop="goods_name"
          min-width="100">
      </el-table-column>
      <el-table-column
          label="包装"
          prop="goods_package"
          min-width="100">
      </el-table-column>
      
      
  </el-table>


  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible  = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import axios from 'axios'
import url from '@/js/common.js'
import storage from '@/js/localstorage.js'
var cnm = ''
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
    prop: 'departure_org_id',
    width: 100
  },
  {
    label: '运输方式',
    prop: 'transportation_type',
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
    prop: 'user_id',
    width: 100
  },
  {
    label: '回单份数',
    prop: 'reciept_type',
    width: 100
  },
  {
    label: '备注',
    prop: 'manifestdtl_comment',
    width: 100
  }
]
const tableColumns1 = tableColumns
const tableColumns_to = [
  {
    label: '序号',
    prop: 'index',
    width: 60
  },
  {
    label: '卸货网点',
    prop: 'site'
  },
  {
    label: '单数',
    prop: 'num'
  },
  {
    label: '操作',
    type: 'del'
  }
]

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
      // 列选择dialog开关
      dialogChooseColumnVisible: false,
      dialogChooseColumnVisible1: false,
      dialogChooseColumnVisible_to: false,
      // 列表表头数据
      tableColumns: tableColumns,
      tableColumns1: tableColumns,
      tableColumns_to: tableColumns_to,
      choosenColumns: [...tableColumns.map(column => column.label)],
      choosenColumns1: [...tableColumns1.map(column => column.label)],
      choosenColumns_to: [...tableColumns_to.map(column => column.label)],
      openColumnSearch: false,
      openColumnSearch1: false,
      openColumnSearch_to: false,
      columnSearch: {},
      columnSearch1: {},
      columnSearch_to: {},
      dialogFormVisible: false,
      tableData1_so: [],
      tableData2_so: [],
      tableData3_so: [],

      formInline: { numberLeft: '', numberRight: '' }, // 表单
      dialogFormVisible: false,
      Status: '',
      form: {
        name: '',
        sid: '',
        tid: '',
        bz: '',
        price: 1000,
        adds: '',
        admin: ''
      },
      preItem: '',
      print: [{
        value: '打印',
        label: '打印'
      }, {
        value: '发车清单',
        label: '发车清单'
      }, {
        value: '随车清单',
        label: '随车清单'
      }],
      tab_show: 0,
      dialogTableVisible: false,
      tableData1: [],
      tableData2: [

      ],
      tableData3: [
      ],
      tableData4: [

      ],
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
      transportState: [{
        value: '1',
        label: '已揽收'
      }, {
        value: '2',
        label: '三方发车'
      }],
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
      Create_Org_ID: '',
      Create_User_ID: '',
      transportState1: '',
      editId: false,
      isEdit: false, // 编辑显示 新增隐藏
      customerList: '', // 发货网点
      dispatching: { // 派车
        contractNumber: "", // 合同编号
        dispatchingState: 10, // 派车状态
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
      pageSize: 10, // 分页
      currentPage: 1,
      materielSize: 1,
      ids: '',
      table2RadioSelect: '', // 第二个table radio选中获取那一行的结果
      table2RadioSelectIndex: '', // 第二个table radio选中获取那一行对应的下标
      tableData1Info: '', // 第一个table 的info明细
      tableData1InfoOld: '', // 没改之前的第一个table 的info明细
      table3Info: [], // 第三个table的明细
      CarrierList: '', // 承运商列表
      VehicleList: '' // 车辆列表
    }
  },

  created() {
    this.fetchData()
    this.tableData1_so = this.tableData1.slice()
    this.tableData3_so = this.tableData3.slice()
    this.getCompanyList() // 获取发货网点
    this.getTransportState() // 获取委托类型
    this.getDispatchingState() // 获取派车状态
    //this.getCarrierList() // 获取承运商数据
    //this.getVehicleList() // 获取车牌号
  },
  watch: {
    result() {
      console.log(this.result.yf)
    }
  },
  mounted: function() { // keepalive之后 每次进入页面都会执行次方法
    const loginInfo = JSON.parse(storage.getStorage('currentUser'))
    this.Create_Org_ID = loginInfo.orgId
    this.Create_User_ID = loginInfo.userId
    this.dispatching.site = loginInfo.orgId
    console.log(loginInfo)
    // this.GetAllManifest();       // 获取新增左侧待配载列表
    this.GetAllManifestInfo() // 获取新增左侧待配载列表明细
  },
  updated: function() {
    this.$nextTick(function() {
      if (this.tab_show == 1) {
        const boxHeight = document.querySelector('body').clientHeight
        const top = document.querySelector('.top').clientHeight
        const top1 = document.querySelector('.sub_hear').clientHeight

        const areaBoxHeight = boxHeight - 84 - top - top1 - 30
        document.querySelector('.ac-footer').style.height = '30px'

        document.querySelector('.left .el-table').style.height = areaBoxHeight + 'px'
        document.querySelector('.right').style.height = areaBoxHeight + 'px'
        document.querySelector('.right_r1').style.height = areaBoxHeight / 2 - 10 + 'px'
        document.querySelector('.right_r2').style.height = areaBoxHeight / 2 + 'px'
        document.querySelector('.left .el-table__body-wrapper').style.height = areaBoxHeight - 20 - 25 + 'px'
        document.querySelector('.left .el-table__body-wrapper').style.overflowY = 'auto'

        document.querySelector('.right_r1 .el-table__body-wrapper').style.height = areaBoxHeight / 2 - 25 + 'px'
        document.querySelector('.right_r1 .el-table__body-wrapper').style.overflowY = 'auto'

        document.querySelector('.right_r1 .el-table').style.height = areaBoxHeight / 2 - 10 + 'px'
        document.querySelector('.right_r2 .el-table').style.height = areaBoxHeight / 2 + 'px'
        document.querySelector('.right_r2 .el-table__body-wrapper').style.height = areaBoxHeight / 2 - 30 + 'px'
        document.querySelector('.right_r2 .el-table__body-wrapper').style.overflowY = 'auto'
      }
    })
  },
  methods: {
    getVehicle(val){ // 获取车牌号
    console.log(val)
      this.dispatching.number = val.v.vehicle_platenumber;
      this.dispatching.driver = val.v.driver_name
      this.dispatching.phone = val.v.driver_phone
    },
    getCarrier(val){ // 承运商赋值
      this.dispatching.carrier = val.metadata_carrier.carrier_name;
    },
    wtlx(val){ //判断委托类型执行不同的事件
      console.log(val)
    },
    pageSizeChange(val) { //   选择每页展示的页数大小
      this.pageSize = val
      this.GetAllManifest()
    },
    currentSizeChange(val) { // 当前选择第几页
      this.currentPage = val
      this.GetAllManifest()
    },
    GetAllManifest() { // 获取左侧待配载列表
      const _this = this
      const data1 = {
        orgid: _this.Create_Org_ID
      }
      axios.post(url.apiUrl() + '/api/Departure/DepartureLeftList', data1)
        .then(function(val) {
          if (val.data.error === '') {
            _this.tableData1 = val.data.data.map(ele => {
              const m = ele
              const obj = {
                'directiveMoney': (m.total_charge ? m.total_charge : 0) - (m.rebate_commission ? m.rebate_commission : 0),
                ...m
              }
              return obj
            })

            // _this.materielSize = val.data.data.total
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    GetAllManifestInfo() { // 获取左侧待配载列表明细
      const _this = this
      const data1 = {
        orgid: _this.Create_Org_ID,
        departure_id: '',
        queryType: 1
      }
      axios.post(url.apiUrl() + '/api/Departure/GetDepartureLeftDetail', data1)
        .then(function(val) {
          if (val.data.error === '') {
            const dataInfo = val.data.data
            // _this.tableData1InfoOld = dataInfo.concat();
            storage.setSessionStorage('leftTable', dataInfo)
            storage.setSessionStorage('leftTableAll', dataInfo)
            _this.tableData1Info = dataInfo.concat()
            _this.addInfo(dataInfo)
            // console.log(val.data.data)
            // _this.materielSize = val.data.data.total
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    addInfo(val, table) { // 左侧明细数据相加
      const infoAdd = val.map((ele, index) => {
        let m = ele.stocks, manifest = ele.manifest
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
            // console.log(item.goods_piece)
          }
        })
        manifest.goods_name = goods_name
        manifest.goods_package = goods_package
        manifest.goods_piece = goods_piece
        manifest.goods_weight = goods_weight
        manifest.goods_volume = goods_volume
        return manifest
      })
       //console.log(JSON.stringify(infoAdd))
      if (table) {
        this.tableData3 = infoAdd.concat()
      } else {
        this.tableData1 = infoAdd.concat()
      }
    },
    addInfo4(val) { // 左侧明细数据相加
      const infoAdd = val.map((ele, index) => {
        let m = ele.stocks, manifest = ele.manifest
        let goods_name = '', goods_package = '', goods_piece = 0, goods_weight = 0, goods_volume = 0// 品名，包装，件数，重量，体积
        m.map((item, i) => {
          if (i == (m.length - 1)) {
            goods_name += (item.goods_name == '' || item.goods_name == null ? '' : item.goods_name)
            goods_package += (item.goods_package == '' || item.goods_package == null ? '' : item.goods_package)
            goods_piece += (item.goods_piece == '' || item.goods_piece == null ? '' : parseFloat(item.goods_piece))
            goods_weight += (item.goods_weight == '' || item.goods_weight == null ? '' : parseFloat(item.goods_weight))
            goods_volume += (item.goods_volume == '' || item.goods_volume == null ? '' : parseFloat(item.goods_volume))
          } else {
            goods_name += (item.goods_name == '' || item.goods_name == null ? '' : item.goods_name) + '/'
            goods_package += (item.goods_package == '' || item.goods_package == null ? '' : item.goods_package) + '/'
            goods_piece += (item.goods_piece == '' || item.goods_piece == null ? '' : parseFloat(item.goods_piece))
            goods_weight += (item.goods_weight == '' || item.goods_weight == null ? '' : parseFloat(item.goods_weight))
            goods_volume += (item.goods_volume == '' || item.goods_volume == null ? '' : parseFloat(item.goods_volume))
            // console.log(item.goods_piece)
          }
        })
        manifest.goods_name = goods_name
        manifest.goods_package = goods_package
        manifest.goods_piece = goods_piece
        manifest.goods_weight = goods_weight
        manifest.goods_volume = goods_volume
        return manifest
      })
      // console.log(JSON.stringify(infoAdd))
      this.tableData1 = infoAdd
    },
    getVehicleList(queryString,cb) { // 获取车牌号
      const _this = this
      const data1 = {
        'Page': 1,
        'Rows': 100
      }
      axios.post(url.apiUrl() + '/api/Vehicle/VehicleList', data1)
        .then(function(val) {
          cb(val.data.data.rows);
          //_this.VehicleList = val.data.data.rows
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
    getCarrierList(queryString,cb) { // 获取承运商数据
      const _this = this
      const data1 = {
        'Page': 1,
        'Rows': 100
      }
      axios.post(url.apiUrl() + '/api/Carrier/CarrierList', data1)
        .then(function(val) {
          cb(val.data.data.rows)
          //_this.CarrierList = val.data.data.rows
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
      axios.get(url.apiUrl() + '/api/Departure/GetDeparture_States')
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
    WaybillSelectInputLeft() {
      const arr = new Array()
      this.tableData1.forEach((item, index) => {
        if (item.id == this.formInline.numberLeft) {
          this.tableData3.push(item)
        } else {
          arr.push(item)
        }
      })

      this.tableData1 = arr
    },
    WaybillSelectInputRight() {
      const arr = new Array()
      this.tableData3.forEach((item, index) => {
        if (item.id == this.formInline.numberRight) {
          this.tableData1.push(item)
        } else {
          arr.push(item)
        }
      })

      this.tableData3 = arr
    },
    changeall() {
      this.$refs.multipleTable.clearSelection()
      this.preItem = ''
    },
    handleCurrentClick(val) {
      const _this = this
      let _index = ''
      let _item = []
      val.forEach((item, index) => {
        if (item.index != _this.preItem.index) {
          _index = item.index
          _item = item
        }
      })

      console.log('y==' + _index)
      if (val.lenght <= 0) {
        _index = ''
      }
      this.preItem = _index
    },
    handleCurrentChange(val) {
      console.log('y2==' + this.preItem)
      // this.$refs.multipleTable.clearSelection();
      if (this.preItem.lenght > 0) {
        // this.multipleSelection = _item;
        this.$refs.multipleTable.toggleRowSelection(this.tableData2[this.preItem], true)
      }
    },
    // 添加网点
    add_adds() {
      let index = 1
      if (this.tableData2.length > 0) {
        index = parseInt(this.tableData2[this.tableData2.length - 1].index) + 1
      }
      this.tableData2.push({ index: index, site: '', num: 0 })
    },
    // 右上角列表删除操作
    handleDelete(index, row) {
      if (row[index].num > 0) {
        this.$confirm('该卸货网点下有关联的运单，是否删除卸货点？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const leftTableAll = storage.getSessionStorage('leftTableAll')
          const leftTable = storage.getSessionStorage('leftTable')
          const data1 = []
          console.log('row[0].datas:', row[0])
          leftTableAll.map(item => {
            item.stocks.map(i => {
              row[0].datas.forEach(ele => {
                if (i.stock_id == ele.stock_id) {
                  i.goods_piece = ele.goods_piece
                  const obj = {
                    manifest: item.manifest,
                    stocks: {
                      arrival_warehouselocation_id: ele.arrival_warehouselocation_id,
                      departure_warehouselocation_id: ele.departure_warehouselocation_id,
                      goods_name: ele.goods_name,
                      goods_package: ele.goods_package,
                      goods_piece: ele.goods_piece,
                      goods_volume: ele.goods_volume,
                      goods_weight: ele.goods_weight,
                      manifest_id: ele.manifest_id,
                      manifestdtl_id: ele.manifestdtl_id,
                      mark_ss_removed: ele.mark_ss_removed,
                      org_id: ele.org_id,
                      stock_id: ele.stock_id,
                      stock_state_id: ele.stock_state_id
                    }
                  }
                  data1.push(obj)
                }
              })
            })
          })

          for (let i = 0; i < row[0].datas.length; i++) {
            const curManifest = row[0].datas[i]
            const mId = row[0].datas[i].manifest_id
            let addManifest = leftTable.find(o => {
              return o.manifest.manifest_id == mId
            })
            if (!addManifest) {
              const manifest = curManifest
              const obj = {
                'manifest_id': manifest.manifest_id,
                'manifest_code': manifest.manifest_code,
                'shipper_code': manifest.shipper_code,
                'shipping_date': manifest.shipping_date,
                'departure_city': manifest.departure_city,
                'departure_org_id': manifest.departure_org_id,
                'manifest_state_id': manifest.manifest_state_id,
                'arrival_city': manifest.arrival_city,
                'arrival_org_id': manifest.arrival_org_id,
                'transportation_type': manifest.transportation_type,
                'consigner_unit': manifest.consigner_unit,
                'consigner_contact': manifest.consigner_contact,
                'consigner_phone': manifest.consigner_phone,
                'consigner_address': manifest.consigner_address,
                'consignee_unit': manifest.consignee_unit,
                'consignee_contact': manifest.consignee_contact,
                'consignee_phone': manifest.consignee_phone,
                'consignee_address': manifest.consignee_address,
                'freight_charge': manifest.freight_charge,
                'delivery_charge': manifest.delivery_charge,
                'pickup_charge': manifest.pickup_charge,
                'handling_charge': manifest.handling_charge,
                'insurance_amount': manifest.insurance_amount,
                'insurance_charge': manifest.insurance_charge,
                'packing_charge': manifest.packing_charge,
                'storage_charge': manifest.storage_charge,
                'other_charge': manifest.other_charge,
                'storage_prepayment': manifest.storage_prepayment,
                'rebate_commission': manifest.rebate_commission,
                'rebate_commission_print': manifest.rebate_commission_print,
                'user_id': manifest.user_id,
                'transfer_mode': manifest.transfer_mode,
                'reciept_type': manifest.reciept_type,
                'manifest_comment': manifest.manifest_comment,
                'total_charge': manifest.total_charge,
                'create_user_id': manifest.create_user_id,
                'create_time': manifest.create_time,
                'create_org_id': manifest.create_org_id,
                'edit_user_id': manifest.edit_user_id,
                'edit_time': manifest.edit_time,
                'edit_org_id': manifest.edit_org_id,
                'departure_balance_date': manifest.departure_balance_date,
                'departure_balance_person': manifest.departure_balance_person,
                'departure_2ndbalance_date': manifest.departure_2ndbalance_date,
                'departure_2ndbalance_person': manifest.departure_2ndbalance_person,
                'entryfee_collect': manifest.entryfee_collect,
                'arrival_balance_date': manifest.arrival_balance_date,
                'arrival_balance_person': manifest.arrival_balance_person,
                'driver_balance_date': manifest.driver_balance_date,
                'driver_balance_person': manifest.driver_balance_person,
                'operate_org_id': manifest.operate_org_id,
                'operate_user_id': manifest.operate_user_id,
                'operate_date': manifest.operate_date,
                'departure_org_name': manifest.departure_org_name,
                'departure_org_code': manifest.departure_org_code,
                'arrival_org_name': manifest.arrival_org_name,
                'arrival_org_code': manifest.arrival_org_code,
                'transportation_type_name': manifest.transportation_type_name,
                'user_displayname': manifest.user_displayname,
                'transfer_mode_name': manifest.transfer_mode_name,
                'reciept_type_name': manifest.reciept_type_name,
                'create_org_name': manifest.create_org_name,
                'edit_org_name': manifest.edit_org_name,
                'edit_user_account': manifest.edit_user_account,
                'manifest_ids': manifest.manifest_ids,
                'payment_mode_id': manifest.payment_mode_id,
                'payment_mode_name': manifest.payment_mode_name,
                'xianfu': manifest.xianfu,
                'daofu': manifest.daofu,
                'qianfu': manifest.qianfu,
                'huidanfu': manifest.huidanfu,
                'fahuoyuejie': manifest.fahuoyuejie,
                'shouhuoyuejie': manifest.shouhuoyuejie,
                'huokuankou': manifest.huokuankou,
                'huodaodaka': manifest.huodaodaka,
                'manifest_state_name': manifest.manifest_state_name
              }
              addManifest = {
                manifest: obj,
                stocks: []
              }
              leftTable.push(addManifest)
            } else {
              for (let j = 0; j < leftTable.length; j++) {
                const stocks = leftTable[j].stocks
                for (let k = 0; k < stocks.length; k++) {
                  if (stocks[k].stock_id == curManifest.stock_id) {
                    stocks[k].goods_piece = parseFloat(stocks[k].goods_piece) + parseFloat(curManifest.goods_piece)
                    stocks[k].goods_weight = parseFloat(stocks[k].goods_weight) + parseFloat(curManifest.goods_weight)
                    stocks[k].goods_volume = parseFloat(stocks[k].goods_volume) + parseFloat(curManifest.goods_volume)
                  }
                }
              }
            }
          }
          for (let i = 0; i < row[0].datas.length; i++) {
            const curManifest = row[0].datas[i]
            const mId = row[0].datas[i].manifest_id
            const sId = curManifest.stock_id
            const leftManifest = leftTable.find(o => {
              return o.manifest.manifest_id == mId
            })
            if (leftManifest) {
              const letManifestStock = leftManifest.stocks.find(o => {
                return o.stock_id == sId
              })
              if (!letManifestStock) {
                const stock = {
                  'stock_id': curManifest.stock_id,
                  'manifestdtl_id': curManifest.manifestdtl_id,
                  'manifest_id': curManifest.manifest_id,
                  'org_id': curManifest.org_id,
                  'departure_warehouselocation_id': curManifest.departure_warehouselocation_id,
                  'arrival_warehouselocation_id': curManifest.arrival_warehouselocation_id,
                  'goods_name': curManifest.goods_name,
                  'goods_package': curManifest.goods_package,
                  'goods_piece': curManifest.goods_piece,
                  'goods_weight': curManifest.goods_weight,
                  'goods_volume': curManifest.goods_volume,
                  'stock_state_id': curManifest.stock_state_id,
                  'mark_ss_removed': curManifest.mark_ss_removed
                }
                leftManifest.stocks.push(stock)
              }
            }
          }

          console.log('added leftTable:', leftTable)

          storage.setSessionStorage('leftTable', leftTable)
          this.addInfo(leftTable) // 重新渲染左侧列表
          row.splice(index, 1)
          if ((index - 1) <= 0) {
            this.table2RadioSelectIndex = 0
          } else {
            this.table2RadioSelectIndex = index - 1
          }
          this.multipleTable_listSelection = ''
          this.tableData3 = []
        }).catch(() => {

        })
      } else {
        row.splice(index, 1)
      }
    },
    handleCurrentChange_tab3(val) {
      this.tab3_listSelection = val
      console.log(val)
    },
    handleSelectionChange_list(val) {
      const _index = -1
      const _addto = []
      if (this.preItem.length <= 0) {
        this.$alert('请勾选卸货网点”', '', {
          confirmButtonText: '确定'
        })
        this.$refs.multipleTable_list.clearSelection()
        return false
      } else {
        this.multipleTable_listSelection = val
      }
    },
    leftall() {
      const _index = -1
      if (this.preItem.length <= 0) {
        this.$alert('请勾选卸货网点”', '', {
          confirmButtonText: '确定'
        })

        return false
      }
      const leftTable = storage.getSessionStorage('leftTable')

      const newTable3 = []
      leftTable.map(ele => {
        const data = []
        ele.stocks.map(item => {
          const a = Object.assign(item, ele.manifest)
          data.push(a)
          newTable3.push(a)
        })
      })
      console.log(newTable3)
      let datas = this.tableData2[this.table2RadioSelectIndex].datas
      if (datas == null || datas == undefined || datas == '') {
        datas = newTable3
      } else {
        datas.push(...newTable3)
      }
      storage.setSessionStorage('leftTable', [])
      this.addInfo([])
      this.tableData2[this.table2RadioSelectIndex].datas = datas
      this.addTableData3() // 整合table3的数据 把相同的mainfast_id放到一起
      this.renderTableData3() // 渲染table3 的数据
      this.getData4Num()
      this.table3Info = []
    },
    leftitem() { // 快速增加
      if (this.tableData2.length <= 0) {
        this.$message.error('请先勾选左侧待配载列表!')
        return
      }
      const toitem = this.multipleTable_listSelection.map(ele => {
        return ele.manifest_id
      })
      let table3 = [], _this = this // 对选中的数据进行匹配  把相同的manifest_id取出来放在table3里面
      const leftTable1 = storage.getSessionStorage('leftTable').forEach(ele => {
        toitem.forEach(item => {
          if (item == ele.manifest.manifest_id) {
            table3.push(ele)
          }
        })
      })
      // -------------------------------- 这一步是获取改变之后的左侧table 并重新渲染
      const ids = []
      table3.filter(item => ids.push(item.manifest.manifest_id))
      const result = storage.getSessionStorage('leftTable').filter(item => {
        if (ids.indexOf(item.manifest.manifest_id) == -1) {
          return item
        }
      })
      storage.setSessionStorage('leftTable', result)
      this.addInfo(result)
      // ---------------------------------
      // let info=[];
      // let table4Info = table3.map(ele => {
      //     ele.stocks.map(item =>{

      //       let a = Object.assign(item , ele.manifest)
      //       info.push(a);
      //     })
      // });
      const newTable3 = []
      table3.map(ele => {
        const data = []
        ele.stocks.map(item => {
          const a = Object.assign(item, ele.manifest)
          data.push(a)
          this.table3Info.push(a)
          newTable3.push(a)
        })
      })

      // this.table3Info.push(info);

      console.log(this.table2RadioSelectIndex)
      let datas = this.tableData2[this.table2RadioSelectIndex].datas
      if (datas == null || datas == undefined || datas == '') {
        datas = newTable3
      } else {
        datas.push(...newTable3)
      }

      this.tableData2[this.table2RadioSelectIndex].datas = datas
      console.log('!!!!')
      console.log(this.tableData2[this.table2RadioSelectIndex].datas)
      this.addTableData3() // 整合table3的数据 把相同的mainfast_id放到一起
      this.renderTableData3() // 渲染table3 的数据
      this.getData4Num()
      this.table3Info = []
    },
    rightall() {
      this.tableData3.forEach((item, index) => {
        this.tableData1.push(item)
      })
      this.tableData3 = []
      this.tableData1.sort()
      this.tableData2.forEach((item, index) => {
        this.tableData2[index].num = this.tableData3.length
      })
    },
    rightitem() {
      if (this.tab3_listSelection == undefined) {
        this.$message.error("请先勾选右下角明细!");
        return
      }else{
        // const leftTableAll = storage.getSessionStorage('leftTableAll');
        // const leftTable = storage.getSessionStorage('leftTable');
        // const data1 = [];
        // console.log('row[0].datas:', row[0]);
        // leftTableAll.map(item => {
        //   item.stocks.map(i => {
        //     row[0].datas.forEach(ele => {
        //       if (i.stock_id == ele.stock_id) {
        //         i.goods_piece = ele.goods_piece
        //         const obj = {
        //           manifest: item.manifest,
        //           stocks: {
        //             arrival_warehouselocation_id: ele.arrival_warehouselocation_id,
        //             departure_warehouselocation_id: ele.departure_warehouselocation_id,
        //             goods_name: ele.goods_name,
        //             goods_package: ele.goods_package,
        //             goods_piece: ele.goods_piece,
        //             goods_volume: ele.goods_volume,
        //             goods_weight: ele.goods_weight,
        //             manifest_id: ele.manifest_id,
        //             manifestdtl_id: ele.manifestdtl_id,
        //             mark_ss_removed: ele.mark_ss_removed,
        //             org_id: ele.org_id,
        //             stock_id: ele.stock_id,
        //             stock_state_id: ele.stock_state_id
        //           }
        //         }
        //         data1.push(obj)
        //       }
        //     })
        //   })
        // })

      }
      
    },
    handleSelectionChange(val) {
      this.splitSelection = val
    },
    // 点击列查询按钮
    toggleColumnSearch() {
      if (this.openColumnSearch) {
        if (this.tableData1[0].isColumnSearch) {
          this.tableData1.shift()
        }
        this.openColumnSearch = false
        this.columnSearch = {}
      } else {
        this.openColumnSearch = true
        if (!this.tableData1[0].isColumnSearch) {
          this.tableData1.unshift({
            isColumnSearch: true
          })
        }
      }
    },
    // 点击列查询按钮
    toggleColumnSearch1() {
      if (this.tableData3.length <= 0) {
        return false
      }
      if (this.openColumnSearch1) {
        if (this.tableData3[0].isColumnSearch) {
          this.tableData3.shift()
        }
        this.openColumnSearch1 = false
        this.columnSearch1 = {}
      } else {
        this.openColumnSearch1 = true
        if (!this.tableData3[0].isColumnSearch) {
          this.tableData3.unshift({
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
        const newData = this.tableData1_so.slice()
        newData.unshift({
          isColumnSearch: true
        })
        this.tableData1 = newData
      }

      this.tableData1 = this.tableData1.filter(item => {
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
          } else if (item[key].toString().indexOf(this.columnSearch[key]) < 0) {
            return false
          }
        }
        return true
      })
    },

    handleColumnSearch1() {
      const values = Object.values(this.columnSearch1)
      const isEmpty = values.every(value => {
        return typeof value === undefined || value === ''
      }) || values.length === 0

      if (isEmpty) {
        this.columnSearch1 = {}
        const newData = this.tableData3_so
        newData.unshift({
          isColumnSearch: true
        })
        this.tableData3 = newData
      }

      this.tableData3 = this.tableData3.filter(item => {
        if (item.isColumnSearch) {
          return true
        }
        for (const key in this.columnSearch1) {
          if (this.columnSearch1[key] === '') {
            // do nothing
          } else if (item[key].toString().indexOf(this.columnSearch1[key]) < 0) {
            return false
          }
        }
        return true
      })
    },
    selectedRedio(val, a) { // 第二个表格中 radio选中执行的事件
      this.table2RadioSelect = val
      this.table2RadioSelectIndex = a
      let datas = this.tableData2[a].datas
      console.log(val)
      if (datas == null || datas == undefined || datas == '') {
        datas = []
      }
      const tableData2 = this.tableData2
      for (let i = 0; i < tableData2.length; i++) {
        for (let j = i; j < tableData2.length - 1; j++) {
          if (tableData2[j + 1].site == tableData2[i].site) {
            this.$message.error('卸货网点不能相同,请更换后重试!')
            this.preItem = ''
          }
        }
      }
      // this.tableData2.forEach((ele , index) =>{
      //   if(index == 0){

      //   }else{
      //     console.log(ele.site , val.site)
      //     if(ele.site == val.site){

      //     }
      //   }

      // })
      // this.render3(datas);
      this.tableData3 = datas
    },
    render3(arr) {
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
      const arrx = []
      const xx = dest.map(ele => {
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
      console.log(xx)
      this.tableData3 = xx
    },
    aa() {
      console.log(this.tableData1InfoOld)
    },
    save() { // 点击弹窗出现表格
      let id = ''
      let idl = ''
      const obj = ''
      const ri = true
      const _this = this
      const mxArr = []
      if (this.splitSelection == undefined || this.splitSelection.lenght <= 0) {
        this.$alert('请勾选货物明细', '', {
          confirmButtonText: '确定'
        })
      } else {
        //
        this.dialogTableVisible = false
        const leftTable = storage.getSessionStorage('leftTable')

        leftTable.forEach((ele, index) => { // 遍历左侧详情数据
          ele.stocks.forEach((ite, key) => { // 便利运单明细
            _this.splitSelection.forEach((item, i) => { // 便利弹窗选中的明细
              if (item.stock_id == ite.stock_id) {
                ite.goods_piece = ite.goods_piece - item.goods_piece
                ite.goods_weight = ite.goods_weight - item.goods_weight
                ite.goods_volume = ite.goods_volume - item.goods_volume
                mxArr.push(ele)
                id = item.manifest_id
                idl = item.manifestdtl_id
              }
            })
          })
        })
        console.log(leftTable)
        storage.setSessionStorage('leftTable', leftTable) // 存改过的值到session
        storage.setSessionStorage(idl, _this.splitSelection) // 存储弹窗修改的数据
        this.addInfo(leftTable) // 重新渲染左侧列表

        this.splitSelection.map(ele => { // 把第四个表格选中的数据放到一起
          this.table3Info.push(ele)
        })

        // 把第三个表格的数据放到第二个表格属性datas里面 并计算第三个表格的件数
        let datas = this.tableData2[this.table2RadioSelectIndex].datas
        if (datas == null || datas == undefined || datas == '') {
          datas = this.table3Info
        } else {
          datas.push(...this.table3Info)
        }

        this.tableData2[this.table2RadioSelectIndex].datas = datas
        this.addTableData3() // 整合table3的数据 把相同的mainfast_id放到一起
        this.renderTableData3() // 渲染table3 的数据
        this.getData4Num()
        this.table3Info = []
      }
    },
    addTableData3() { // 整合table3的数据 把相同的mainfast_id放到一起
      const arr = this.tableData2[this.table2RadioSelectIndex].datas
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
      storage.setSessionStorage('table3', dest)
    },
    renderTableData3() { // 渲染table 3的数据
      const aa = storage.getSessionStorage('table3')
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
      this.tableData3 = xx
    },
    getData4Num() { // 获取第三个table的件数的值
      const num = this.tableData3.length
      this.tableData2[this.table2RadioSelectIndex].num = num
    },
    split_single(row, column, cell, event) {
      const id = row.manifest_id, _this = this
      if (this.openColumnSearch) {
        return false
      }
      if (cell.cellIndex == 2) {
        if (this.preItem.length <= 0) {
          this.$alert('请勾选卸货网点”', '', {
            confirmButtonText: '确定'
          })
          this.$refs.multipleTable_list.clearSelection()
          return false
        } else {
          let info = ''
          const getLeftTable = storage.getSessionStorage('leftTable')
          const table4Info = getLeftTable.map(ele => {
            if (id == ele.manifest.manifest_id) {
              ele.stocks.map(item => {
                const a = Object.assign(item, ele.manifest)

                return a
              })
              info = ele.stocks
            }
          })
          _this.tableData4 = info
          this.dialogTableVisible = true
        }
      }
    },
    GetManifestInfo(val1) { // 点击运单号获取运单明细
      const _this = this
      const data1 = {
        ManifestID: val1,
        orgId: this.Create_Org_ID
      }
      axios.post(url.apiUrl() + '/api/Departure/GetDepartureToast', data1)
        .then(function(val) {
          if (val.data.error === '') {
            _this.tableData4 = val.data.data

            storage.setSessionStorage(val1, val.data.data)
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    handleClick(tab, event) {
      this.tab_show = tab.index
    },
    editInsert() { // 新增
      if (this.editId) {

      } else {
        // 清空数据
        this.result = {}
      }
    },
    editEave() { // 保存
      this.disabledInput = true
      this.sendMessage()
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
      let r_Departure_Orgs = [], departure_Inventories = [] // 卸货网点   运单明细
      this.tableData2.forEach(item => {
        r_Departure_Orgs.push({ Unloading_Org_Id: item.site })
        console.log(item)
        if (item.datas) {
          item.datas.forEach(ele => {
            const a = {
              Departure_Inventory_Id: '',
              Stock_Id: ele.stock_id,
              Manifest_Id: ele.manifest_id,
              Manifestdtl_Id: ele.manifestdtl_id,
              Unloading_Org_Id: item.site,
              Departure_Id: '',
              Goods_Name: ele.goods_name,
              Goods_Package: ele.goods_package,
              Goods_Piece: ele.goods_piece,
              Goods_Weight: ele.goods_weight,
              Goods_Volume: ele.goods_volume
            }
            departure_Inventories.push(a)
          })
        }
      })
      const data1 = {
        departure: {
          Departure_ID: '',
          Contract_Code: this.dispatching.contractNumber,
          Departure_Date: this.dispatching.date,
          Departure_State_Id: this.dispatching.dispatchingState,
          User_Id: this.dispatching.originator,
          Departure_Org_Id: this.dispatching.site,
          Departure_Consigntype_Id: this.dispatching.transport_value,
          Carrier_Name: this.dispatching.carrier,
          Plate_Number: this.dispatching.number,
          Driver_Name: this.dispatching.driver,
          Driver_Phone: this.dispatching.phone,
          Driver_Idcard: '',
          Departure_Comment: this.dispatching.remarks,
          Freight_Cashpay: this.result.xf,
          Freight_Collect: this.result.df,
          Freight_Backpay: this.result.hf,
          Fuelcard_Number: this.result.kahao,
          Fuelcard_Org: this.result.commany,
          Fuelcard_Driver: this.result.yk,
          Cover_Charge: this.result.fb,
          Issurance_Charge: this.result.bx,
          Handling_Charge: this.result.zx,
          Landing_Charge: this.result.ld,
          Other_Charge: this.result.other,
          Other_Charge_Comment: this.result.explain,
          Total_Charge: this.result.moneyTotal,
          Create_Time: time,
          Create_org_ID: this.Create_Org_ID,
          Edit_User_ID: '',
          Edit_Time: time,
          Edit_Org_ID: ''
        },
        r_Departure_Orgs: r_Departure_Orgs,
        departure_Inventories: departure_Inventories
      }
      console.log("保存的值",JSON.stringify(data1))
      axios.post(url.apiUrl() + '/api/Departure/DepartureAdd', data1)
        .then(function(val) {
          if (val.data.error === '') {
            _this.$message({
              type: 'success',
              message: '保存成功!'
            })
            _this.$router.push({ path: '/operationFlow/allotcar' })
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    editUpdate() { // 修改
      this.disabledInput = false
    },
    editDelete() { // 删除
      this.$confirm('是否删除当前运单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editTableInsert(row, column, cell, event) {
      console.log('1')
    },
    editTableDelete(i) { // 删除列表数据
      this.result.list.splice(i, 1)
    },
    CalculationMoney() {
      this.result.moneyTotal =
      parseInt(this.result.xf ? this.result.xf : 0) +
      parseInt(this.result.df ? this.result.df : 0) +
      parseInt(this.result.hf ? this.result.hf : 0) +
      parseInt(this.result.yk ? this.result.yk : 0) +
      parseInt(this.result.fb ? this.result.fb : 0) +
      parseInt(this.result.bx ? this.result.bx : 0) +
      parseInt(this.result.zx ? this.result.zx : 0) +
      parseInt(this.result.ld ? this.result.ld : 0) +
      parseInt(this.result.other ? this.result.other : 0)
    },
    fetchData() {
      const id = this.$route.params.id
      if (id) {
        // 请求数据
        this.isEdit = true
        this.editId = true
      } else {
        this.editId = false
        // 新增数据
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  },
  deactivated() { // 页面离开的时候执行清除缓存操作
    sessionStorage.clear()
    this.tableData2 = []
    this.tableData3 = []
  }
}
</script>

<style>
.cell{white-space: nowrap!important;}
.app-container{
  /* max-height: 550px;overflow-y:scroll; */
  padding:0 20px ;
}
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
.edit-page-modular-allotcar .list-tit{padding: }
.hideIcon .el-input--medium .el-input__icon{display: none}
.edit-page-modular .Edit-Title{text-align: center;margin: 5px;padding: 0px 50px 0px 50px;color:#666;font-size: 1.5em}
.edit-page-modular .el-input--medium .el-input__inner{
  padding: 2px 5px 2px 5px;height: 25px;line-height: 25px;border-radius: 0px;border:none;border-bottom:1px solid #ccc;
}

.AllotcarAdd .el-table--small td,   .AllotcarAdd .el-table--small th{
    padding: 0px;
}
 
</style>

