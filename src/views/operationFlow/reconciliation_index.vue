<template>
    <div class="box">
       <el-row class="buttonBox clearfix">
            <!-- <div class="clearfix">
                <el-button type="primary" @click="addComanyInfo" size="mini">结算</el-button>
                <el-select  v-model="print"   placeholder="打印">
                    
                    <el-option label="打印" value="1"></el-option>
                    <el-option label="打印盘点单" value="2"></el-option>
                </el-select>
                 <el-button class="page-btn-group" size="mini"  >上传附件</el-button>
  
            </div> -->
            
                 <el-form size="small" :inline="true"  class="form-wrapper">

                <el-form-item label="网点">
                    <el-input  v-model="search.branches" style="width:100px;height:25px"></el-input>
                </el-form-item>
                <el-form-item label="运单日期">
                <el-date-picker style="width:100px;height:25px"   v-model="search.startdate" tyle="date"></el-date-picker>
                </el-form-item>
                <el-form-item label="到">
                <el-date-picker style="width:100px;height:25px"   v-model="search.enddate" tyle="date"></el-date-picker>
                </el-form-item>
                <el-form-item label="结算方">
                    <el-input  v-model="search.settlement" style="width:100px;height:25px"></el-input>
                </el-form-item>
                <el-form-item label="发站">
                    <el-input  v-model="search.from" style="width:100px;height:25px"></el-input>
                </el-form-item>
                <el-form-item label="到站">
                    <el-input  v-model="search.to" style="width:100px;height:25px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini">查询</el-button>
                </el-form-item>
            </el-form>
          <el-row :gutter="20">
  <!-- <el-col :span="12" :offset="6">
       <el-form size="small" :inline="true"  class="form-wrapper">
              <el-row :gutter="10">
            <el-col :span="12"> <el-form-item label="快速增加">
                  <el-input  style="width:80px;"   ></el-input>
              </el-form-item>

              <el-button icon="el-icon-arrow-right"  @click="leftitem"   type="text"></el-button>
              <el-button icon="el-icon-d-arrow-right" @click="leftall"   type="text" ></el-button>
              </el-col>
            <el-col :span="12">  <el-form-item label="快速删除">
                  <el-input   style="width:80px;" ></el-input>
              </el-form-item>
              <el-button icon="el-icon-arrow-left" @click="rightitem"   type="text" ></el-button>
              <el-button icon="el-icon-d-arrow-left" @click="rightall"   type="text"  ></el-button>
              </el-col>
               
            </el-row>
            </el-form>
 </el-col> -->
               
            </el-row>
          
        </el-row>
        <div class="searchCondition">
          <div class="clearfix d-flex">
            <el-tabs type="card" @tab-click="handleClick">
              <el-tab-pane label="欠付/回单付/月结"></el-tab-pane>
              <el-tab-pane label="提付"></el-tab-pane>
              <el-tab-pane label="现付"></el-tab-pane>
              <el-tab-pane label="回扣"></el-tab-pane>
              <el-tab-pane label="异动增款"></el-tab-pane>
              <el-tab-pane label="赔偿我们"></el-tab-pane>
              
            </el-tabs>
            <div style="">
              <el-form size="small" :inline="true"  class="form-wrapper">
                <div class="d-flex">
                  <div class="margin20"> 
                    <el-form-item label="快速增加">
                      <el-input  style="width:80px;"   ></el-input>
                    </el-form-item>

                    <el-button icon="el-icon-arrow-right"  @click="leftitem"   type="text"></el-button>
                    <el-button icon="el-icon-d-arrow-right" @click="leftall"   type="text" ></el-button>
                  </div>
                  <div class="margin20"> 
                     <el-form-item label="快速删除">
                        <el-input   style="width:80px;" ></el-input>
                    </el-form-item>
                    <el-button icon="el-icon-arrow-left" @click="rightitem"   type="text" ></el-button>
                    <el-button icon="el-icon-d-arrow-left" @click="rightall"   type="text"  ></el-button>
                  </div>
                </div>
              </el-form>
            </div>
            <el-button  class="margin20" style="height:28px;" type="primary" @click="addComanyInfo" size="mini">结算</el-button>
          </div>
       
<el-row :gutter="20">
  <el-col :span="16" class="left_table">
     
                <el-table
                    class="table"
                    ref="multipleTable1"
                    :data="tableData11"
                    @selection-change='handleCurrentChange_tab1'
                    size="mini"
                    style="width: 100%"
                    :summary-method="aa"
                    border >

                    <el-table-column
                        type="selection"
                        fixed
                        :show-overflow-tooltip="true"
                        width="55">
                        </el-table-column>
                        <el-table-column
                type="index"
                label="序号"
                width="50">
                </el-table-column>
                    <el-table-column sortable v-for="item in tableColumns" v-if="choosenColumns.indexOf(item.label) > -1" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
                     <template slot-scope="scope">
                        <div v-if="scope.$index === 0 && openColumnSearch">
                            <el-input   v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch"></el-input>
                        </div>
                        <span v-else>{{ scope.row[scope.column.property] }}</span>
                    </template>
                    </el-table-column>
                   
                </el-table>
                <el-footer class="ac-footer">
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
  <el-col :span="8" class="right_table">
      
       <el-table
                            size="small"
                            ref="multipleTable"
                            :data="tableData31"
                            tooltip-effect="dark"
                            @selection-change='handleCurrentChange_tab3'
                            border
                            style="width:100%:"
                            class="table"
                            
                            >
                            <el-table-column
                                type="selection"
                                width="60">
                            </el-table-column>
                            <el-table-column
                type="index"
                label="序号"
                width="50">
                </el-table-column>
                              <el-table-column sortable v-for="item in tableColumns_to" v-if="choosenColumns_to.indexOf(item.label) > -1" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
                    <template slot-scope="scope">
                        <div v-if="scope.$index === 0 && openColumnSearch_to">
                            <el-input   v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch_to"></el-input>
                        </div>
                        <div v-else-if="scope.column.property=='receivable_amount'">
                           <el-input type="number"  v-model.number="scope.row['receivable_amount']" size="mini" @change="values(scope.row.payment_amount,scope.row.receivable_amount,scope.$index)"></el-input>
                        </div>
                        <span v-else>{{ scope.row[scope.column.property] }}</span>
                    </template>
                    </el-table-column>
                        </el-table>
                         <el-footer class="ac-footer">
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

</el-row>
        </div>
        <el-dialog title="新增结算单" :visible.sync="dialogFormVisible" width="80%">
            <div class="clearfix">
                <!-- <el-button type="primary" @click="addComanyInfo1" v-if="isShow" size="mini">新增</el-button> -->
                <!-- <el-button type="primary" @click="updateInfo1" v-if="isShow"  size="mini">修改</el-button> -->
                <el-button type="primary" @click="addSZFS"  size="mini">新增</el-button>
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
                        <el-input v-model.trim="orgName"   :disabled="true" ></el-input>
                    </el-form-item>
                    <el-form-item label="结算单号" size="mini" >
                        <el-input v-model.trim="jsdh"   :disabled="true" ></el-input>
                    </el-form-item>
                     <el-form-item label="结算日期" size="mini"  >
                        <el-date-picker
                        v-model="time"
                        type="datetime"
                          >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结算对象" size="mini"   >
                        <el-input v-model.trim="jsdx"  placeholder=""></el-input>
                    </el-form-item>

                    <el-form-item label="一级科目" size="mini"   >
                        <el-input v-model.trim="yjkm"  placeholder=""></el-input>
                    </el-form-item>
      
                    <el-form-item label="二级科目" size="mini"   >
                        <el-input v-model.trim="ejkm"  placeholder=""></el-input>
                    </el-form-item>

                    <el-form-item label="三级科目" size="mini"   >
                        <el-input v-model.trim="sjkm"  placeholder=""></el-input>
                    </el-form-item>

                    <el-form-item label="四级科目" size="mini"  >
                        <el-input v-model.trim="sijkm"  placeholder=""></el-input>
                    </el-form-item>


                    <el-form-item label="应收金额" size="mini"   >
                        <el-input v-model.trim="ysje"  placeholder="" :disabled="true" ></el-input>
                    </el-form-item>


                    <!-- <el-form-item label="结算金额" size="mini"  >
                        <el-input v-model.trim="jsje"  placeholder="" :disabled="true" ></el-input>
                    </el-form-item>

                    <el-form-item label="实结金额" size="mini"  >
                        <el-input type="number" v-model.number="sjje"  placeholder=""  ></el-input>
                    </el-form-item> -->
                    
<br>
                    <el-form-item label="已结金额" size="mini"  >
                        <el-input v-model.trim="yjje"  placeholder="" :disabled="true" ></el-input>
                    </el-form-item>


                    <el-form-item label="余额" size="mini"  >
                        <el-input v-model.trim="ye"  placeholder="" :disabled="true" ></el-input>
                    </el-form-item>
<br>
                    <el-form-item label="备注" size="mini"  >
                        <el-input v-model.trim="bz"  placeholder=""  ></el-input>
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
                        <el-select @change="ListOperation(scope.$index)" v-model.lazy="scope.row.payType"    >
                          <el-option v-for="(item , index) in getBalanceMode" :label="item.balance_mode_name" :value="item.balance_mode_id" :key = "index"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>

                    <el-table-column
                        sortable
                        
                        label="结算金额"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <el-input size="mini" type="number" v-model.number="scope.row.payment_amount" placeholder=""></el-input>
                        </template>
                    </el-table-column>

                    <!-- <el-table-column
                        sortable
                        label="实收金额"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                                   <el-input size="mini" type="number" v-model.number="scope.row.receivable_amount" placeholder=""></el-input>
                                </template>
                    </el-table-column> -->

                    <el-table-column
                       sortable
                        
                        label="银行" 
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <el-input size="mini" type="number" v-model.number="scope.row.bank" placeholder=""></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                       sortable
                        label="卡号"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <el-input size="mini" type="number" v-model.number="scope.row.kahao" placeholder=""></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        sortable
                        label="开户人"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <el-input size="mini" v-model="scope.row.kaiqiren" placeholder=""></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                       sortable
                        label="微信"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <el-input size="mini" v-model="scope.row.wx" placeholder=""></el-input>
                        </template>
                    </el-table-column>


                    <el-table-column
                        sortable
                        label="支付宝"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <el-input size="mini" v-model="scope.row.zfb" placeholder=""></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        sortable
                        label="油卡卡号"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <el-input size="mini" type="number" v-model.number="scope.row.kh" placeholder=""></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        sortable
                        label="备注"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <el-input size="mini" v-model="scope.row.bz" placeholder=""></el-input>
                        </template>
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
                    border>

                    <el-table-column
                        type="selection"
                        
                        :show-overflow-tooltip="true"
                        width="55">
                    </el-table-column>
                    
                    <el-table-column
                        label="序号"
                        type="index"
                        
                        :show-overflow-tooltip="true"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        label="运单号"
                        prop="manifest_code"
                        >
                    </el-table-column>
                    
                    <el-table-column
                        label="结算金额"
                        prop="payment_amount"
                        >
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        prop="xf"
                        label="现付"
                        :show-overflow-tooltip="true">
                        
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        label="到付"
                        prop="df"
                        :show-overflow-tooltip="true">
                       
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        label="回付"
                        prop="hf"
                        :show-overflow-tooltip="true">
                       
                    </el-table-column>

                    <el-table-column
                        sortable
                        label="欠付"
                        prop="qf"
                        :show-overflow-tooltip="true">
                        
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        label="发货月结"
                        prop="fhyj"
                        :show-overflow-tooltip="true">
                       
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        label="收货月结"
                        prop="shyj"
                        :show-overflow-tooltip="true">
                        
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        label="货到打卡"
                        prop="hddk"
                        :show-overflow-tooltip="true">
                       
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        label="货款扣"
                        prop="dkk"
                        :show-overflow-tooltip="true">
                       
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        label="异动赠款"
                        prop="ydzk"
                        :show-overflow-tooltip="true">
                       
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        label="赔偿我们"
                        prop="pcwm"
                        :show-overflow-tooltip="true">
                        
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        label="回扣"
                        prop="hk"
                        :show-overflow-tooltip="true">
                       
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        label="异动减款"
                        prop="ydjk"
                        :show-overflow-tooltip="true">
                        
                    </el-table-column>
                    
                    <el-table-column
                        sortable
                        label="我们赔偿"
                        prop="wmpc"
                        :show-overflow-tooltip="true">
                       
                    </el-table-column>

                    <el-table-column
                        label="制单人"
                        prop="user_displayname"
                        >
                    </el-table-column>
                   
                   
                    <el-table-column
                        label="运单日期"
                        prop="shipping_date"
                        >
                    </el-table-column>
                   
                   
                    <el-table-column
                        label="运单状态"
                        prop="manifest_state_id"
                        >
                    </el-table-column>
                   
                   
                    <el-table-column
                        label="发站"
                        prop="departure_city"
                        >
                    </el-table-column>
                   
                   
                    <el-table-column
                        label="到站"
                        prop="arrival_city"
                        >
                    </el-table-column>
                   
                   
                    <el-table-column
                        label="发货网点"
                        prop="departure_org_name"
                        >
                    </el-table-column>
                   
                    <el-table-column
                        label="到站网点"
                        prop="arrival_org_name"
                        >
                    </el-table-column>
                   
                   
                    <el-table-column
                        label="运输方式"
                        prop="transportation_type_name"
                        >
                    </el-table-column>
                   
                   
                    <el-table-column
                        label="发货人电话"
                        prop="consigner_phone"
                        >
                    </el-table-column>
                   
                   
                    <el-table-column
                        label="发货地址"
                        prop="consigner_address"
                        >
                    </el-table-column>
                   
                    <el-table-column
                        label="交接方式"
                        prop="transfer_mode_name"
                        >
                    </el-table-column>
                   
                   
                    <el-table-column
                        label="运单号"
                        prop="manifest_code"
                        >
                    </el-table-column>
                   
                   
                    <el-table-column
                        label="收货单位"
                        prop="consignee_unit"
                        >
                    </el-table-column>
                   
                   
                    <el-table-column
                        label="收货人"
                        prop="consignee_contact"
                        >
                    </el-table-column>
                   
                   
                    <el-table-column
                        label="收货人电话"
                        prop="consignee_phone"
                        >
                    </el-table-column>
                   
                    <el-table-column
                        label="收货地址"
                        prop="consignee_address"
                        >
                    </el-table-column>
                   
                   
                    <el-table-column
                        label="品名"
                        prop="goods_name"
                        >
                    </el-table-column>
                   
                   
                    <el-table-column
                        label="件数"
                        prop="goods_piece"
                        >
                    </el-table-column>
                   
                   
                    <el-table-column
                        label="重量（公斤）"
                        prop="goods_weight"
                        >
                    </el-table-column>
                   
                   
                    <el-table-column
                        label="体积（立方）"
                        prop="goods_volume"
                        >
                    </el-table-column>
                   
                    <el-table-column
                        label="付款方式"
                        prop="payment_mode_name"
                        >
                    </el-table-column>
                   
                   
                    <el-table-column
                        label="备注"
                        prop="manifestdtl_comment"
                        >
                    </el-table-column>
                   
                   
                </el-table>
             
            </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
import url from '@/js/common.js'
import storage from '@/js/localstorage.js'
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
const tableColumns = [
  
  {
    label: '运单号',
    prop: 'manifest_code'
  },
  {
    label: '结算金额',
    prop: 'payment_amount'
  },

  {
    label: '制单人',
    prop: 'user_displayname'
  },
  {
    label: '运单日期',
    prop: 'shipping_date'
  },
  {
    label: '运单状态',
    prop: 'manifest_state_id'
  },
  {
    label: '发站',
    prop: 'departure_city'
  },
  {
    label: '到站',
    prop: 'arrival_city'
  },
  {
    label: '发货网点',
    prop: 'departure_org_name'
  },
  {
    label: '到站网点',
    prop: 'arrival_org_name'
  },
  {
    label: '运输方式',
    prop: 'transportation_type_name'
  },
  {
    label: '发货人',
    prop: 'consigner_contact'
  },
  {
    label: '发货人电话',
    prop: 'consigner_phone'
  },
  // {
  //   label: '结算客户',
  //   prop: ''
  // },
  {
    label: '发货地址',
    prop: 'consigner_address'
  },
  {
    label: '交接方式',
    prop: 'transfer_mode_name'
  },
  {
    label: '收货单位',
    prop: 'consignee_unit'
  },
  {
    label: '收货人',
    prop: 'consignee_contact'
  },
  {
    label: '收货人电话',
    prop: 'consignee_phone'
  },
  {
    label: '收货地址',
    prop: 'consignee_address'
  },
  {
    label: '品名',
    prop: 'goods_name'
  },
  {
    label: '件数',
    prop: 'goods_piece'
  },
  {
    label: '重量（公斤）',
    prop: 'goods_weight'
  },
  {
    label: '体积（立方）',
    prop: 'goods_volume'
  },
  {
    label: '付款方式',
    prop: 'payment_method'
  },
  // {
  //   label: '回单状态',
  //   prop: ''
  // },
  // {
  //   label: '回单份数',
  //   prop: ''
  // },
  {
    label: '备注',
    prop: 'manifestdtl_comment'
  }
]

const tableColumns_to = [
 
  {
    label: '运单号',
    prop: 'manifest_code'
  },
  {
    label: '结算金额',
    prop: 'payment_amount'
  },
  {
    label: '实收金额',
    prop: 'receivable_amount'
  }
]

export default {
  data() {
    return {
      print_js: '',
      print: '',
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
      tableData1_so: [],
      tableData3_so: [],
      tableData1: [
      ],
      tableData11: [
      ],
      tableData12: [
      ],
      tableData13: [
      ],
      tableData14: [
      ],
      tableData15: [
      ],
      tableData16: [
      ],

      tableData3: [
      ],
      tableData31:[],
      tableData32:[],
      tableData33:[],
      tableData34:[],
      tableData35:[],
      tableData36:[],
      tableData4: [],
      tableData5: [],

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
      pageSize: 10,
      currentPage: 1,
      materielSize: 0,
      dialogFormVisible: false,
      areaInfo1: {
        vehicle_id: '',
        vehicle_platenumber: '',
        vehicleType: '',
        vehicle1: '',
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
      search: {
        to: '',
        startdate: '',
        enddate: '',
        settlement: '',
        from: '',
        branches: ''
      },
      // ///////////////////////////////////////////////////
      getBalanceMode:"",// 获取收支方式列表
      tabIndex:0,    // 欠付 回单付 月结 tab页的下标
      addTable:[],   // 从左边push到右边的元素
      orgName:"" ,   // 结算网点
      time:time,     // 结算日期
      jsdh:"",
      jsdx:"",
      yjkm:"",
      ejkm:"",
      sjkm:"",
      sijkm:"",
      ysje:"",
      jsje:"",
      sjje:"",
      yjje:"",
      ye:"",
      bz:"",
    }
  },
  updated: function() {
    this.$nextTick(function() {
      const boxHeight = document.querySelector('body').clientHeight
      const top = document.querySelector('.buttonBox').clientHeight

      const areaBoxHeight = boxHeight - 184 - top - 30
      document.querySelector('.ac-footer').style.height = '30px'

      document.querySelector('.left_table .el-table__body-wrapper').style.height = areaBoxHeight - 20 - 25 + 'px'
      document.querySelector('.left_table .el-table__body-wrapper').style.overflowY = 'auto'

      document.querySelector('.right_table .el-table__body-wrapper').style.height = areaBoxHeight - 20 - 25 + 'px'
      document.querySelector('.right_table .el-table__body-wrapper').style.overflowY = 'auto'
    })
  },
  created() {
    this.tableData1_so = this.tableData1.slice()
    this.tableData3_so = this.tableData3.slice()
  },
  mounted(){
    const loginInfo = JSON.parse(storage.getStorage('currentUser'))
    this.Create_Org_ID = loginInfo.orgId
    this.Create_User_ID = loginInfo.userId
    this.orgName = loginInfo.orgName
    this.GetBalanceMode(); // 获取收支方式
    this.init(); // 获取应收对账单列表
  },
  methods: {
    addSZFS(){
      let obj1 = [{
          payType:1 , 
          payment_amount:this.jsje , 
          receivable_amount:"", 
          bank:"" , 
          kahao:"" , 
          kaiqiren:"" , 
          wx:"" , 
          zfb:"" , 
          kh:"" , 
          bz:"" , 
        }]
        this.tableData4.push(obj1);
    },
    values( val,a,c){ // 右边表格input输入问题
      if(a>val){
        this.tableData3[c].receivable_amount = val;
        this.$message({
          type:"warning",
          message:"输入的实收金额不能大于结算金额!"
        })
      }
    },
    GetBalanceMode(){ // 获取收支方式
      const _this = this ;
      axios.get(url.apiUrl() + '/api/CustomerStatement/GetBalanceMode')
        .then(function(val) {
          if (val.data.error === '') {
            _this.getBalanceMode = val.data.data;
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    init() { // 获取所有的运输委托单
      const _this = this
     
      axios.post(url.apiUrl() + '/api/CustomerStatement/PendingSettlementAll')
        .then(function(val) {
          if (val.data.error === '') {
            _this.tableData11 = val.data.data.qianfu_huidanfu_yuejie;
            _this.tableData12 = val.data.data.qianfu_huidanfu_yuejie;
            _this.tableData13 = val.data.data.daofu;
            _this.tableData14 = val.data.data.xianfu;
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
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
    toggleColumnSearch_to() {
      if (this.openColumnSearch_to) {
        if (this.tableData3[0].isColumnSearch) {
          this.tableData3.shift()
        }
        this.openColumnSearch_to = false
        this.columnSearch = {}
      } else {
        this.openColumnSearch_to = true
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
        const newData = this.tableData1_so
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
          } else if (item[key].toString().indexOf(this.columnSearch[key]) < 0) {
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
        for (const key in this.columnSearch_to) {
          if (this.columnSearch_to[key] === '') {
            // do nothing
          } else if (item[key].toString().indexOf(this.columnSearch_to[key]) < 0) {
            return false
          }
        }
        return true
      })
    },
    ListOperation() {
      // const item = { price: 0 }

      // this.tableData4.push(item)
    },
    handleChange(index, item) {
      this.tableData4[index].price = item.price
      this.v.sprice = 0
      this.tableData4.forEach((item) => {
        this.v.sprice += parseInt(item.price)
      })
    },
    handleClick(tab, event) {
      const i = parseInt(tab.index) + 2;
      this.tabIndex = tab.index;
      
        this.tableData11 = [];
        this.tableData11.push(...eval('this.tableData1' + i));
        this.tableData31 = eval('this.tableData3' + i);
      
    },
    pay(tab, event) {
      this.tab_show = tab.index
    },
    leftall() {
      
      
      let _index = -1,tabIndex = Number(this.tabIndex) + 2;
      const tableDatas  = eval('this.tableData1' + tabIndex),toitem = JSON.parse(JSON.stringify(eval('this.tableData1' + tabIndex)));
      switch (tabIndex) {
        case 2:
          this.splitTable(toitem , tableDatas , tabIndex)
          
          break;
        case 3:
          this.splitTable(toitem , tableDatas , tabIndex)
          break;
        case 4:
          this.splitTable(toitem , tableDatas , tabIndex)
          break;
        default:
          break;
      }
    },
    leftitem() {
      if (this.tab1_listSelection == undefined) {
        this.$message.error("请先勾选才能继续下一步操作!")
        return
      }
      const toitem = this.tab1_listSelection;
      let _index = -1,tabIndex = Number(this.tabIndex) + 2,tableDatas = eval('this.tableData1' + tabIndex);
      switch (tabIndex) {
        case 2:
          this.splitTable(toitem , tableDatas , tabIndex);
          
          break;
        case 3:
          this.splitTable(toitem , tableDatas , tabIndex)
          break;
        case 4:
          this.splitTable(toitem , tableDatas , tabIndex)
          break;
        default:
          break;
      }
      
    },
    splitTable(val,table,index){
      let selectData = eval('this.tableData1' + index);
      let rightS = eval('this.tableData3' + index);
      val.forEach((item, index1) => {
          let _index = table.indexOf(item);
          table.splice(_index, 1);
          //selectData.splice(_index, 1);
          let obj = JSON.parse(JSON.stringify(item));
          obj.payType = index;
          obj.receivable_amount = item.payment_amount;
          
          rightS.push(obj);
        })
        this.tableData31 = rightS;
        this.tableData11 = table;
        if (this.tableData31 == []) {
          
        }else{
          this.tableData31.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row, true)
          })
        }
    },
    rightall() {
      
      let tabIndex = Number(this.tabIndex) + 2, rightItem = eval('this.tableData3' + tabIndex);
      let toitem = JSON.parse(JSON.stringify(rightItem));
      let leftItem = eval('this.tableData1' + tabIndex);
      leftItem.push(...toitem);
      this.tableData11 = leftItem;
      toitem.forEach((item, index) => {  //  删除右边
        let _index = rightItem.indexOf(item);
        rightItem.splice(_index, 1)
      })
    },
    rightitem() {
      if (this.tab3_listSelection == undefined) {
        this.$message.error("请先勾选才能继续下一步操作!")
        return
      }
      const toitem = this.tab3_listSelection
      let _index = -1,tabIndex = Number(this.tabIndex) + 2, rightItem = eval('this.tableData3' + tabIndex);
      this.rightToLeft(toitem,tabIndex);
      toitem.forEach((item, index) => {  //  删除右边
        let _index = rightItem.indexOf(item);
        rightItem.splice(_index, 1)
      })
    },
    rightToLeft(val,index){
      let leftItem = eval('this.tableData1' + index);
      leftItem.push(...val);
      this.tableData11 = leftItem;
      
    },
    handleCurrentChange_tab3(val) {
      this.tab3_listSelection = val
    },
    handleCurrentChange_tab1(val) {
      this.tab1_listSelection = val
    },
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
      if (this.tab3_listSelection == undefined || this.tab3_listSelection == "" || this.tab3_listSelection == []) {
        this.$message.error("请先勾选才能继续下一步操作!")
      }else{
        this.dialogFormVisible = true;
        let ysje = 0  , zcje = 0   , jsje = 0   , sjje = 0   , yjje = 0   , ye = 0  ;
        let tableDatas = JSON.parse(JSON.stringify(this.tab3_listSelection)).map(ele =>{
          ysje = parseFloat(ysje) + parseFloat(ele.payment_amount); // 应收金额
          yjje = parseFloat(yjje) + parseFloat(ele.receivable_amount); // 已结金额
          // jsje = parseFloat(jsje) + parseFloat(ele.receivable_amount); // 结算金额
          // sjje = parseFloat(sjje) + parseFloat(ele.receivable_amount); // 实结金额
          // ye = parseFloat(ye) + parseFloat(ele.receivable_amount); // 余额
          let obj = {
            xf:"",
            df:"",
            qf:"",
            fhyj:"",
            shyj:"",
            hddk:"",
            dkk:"",
            ydzk:"",
            pcwm:"",
            hk:"",
            ydjk:"",
            wmpc:""
          }
          switch (ele.payType) {
            case 1:
              obj.qf = ele.receivable_amount
              obj.shyj = ele.receivable_amount
              obj.fhyj = ele.receivable_amount
              break;
            case 2:
              obj.df = ele.receivable_amount
              break;
            case 3:
              obj.xf = ele.receivable_amount
              break;
            default:
              break;
          }
          let aa = Object.assign(ele , obj);
          return aa
        });
        this.tableData5 = tableDatas;
        //  弹窗赋值操作
        this.ysje = ysje ;
        this.jsje = jsje ;
        this.sjje = sjje ;
        // this.yjje = yjje ;
        // this.ye = this.ysje -  this.yjje;
        // 给收支方式赋值
        let obj1 = [{
          payType:1 , 
          payment_amount:this.ysje , 
          receivable_amount:"", 
          bank:"" , 
          kahao:"" , 
          kaiqiren:"" , 
          wx:"" , 
          zfb:"" , 
          kh:"" , 
          bz:"" , 
        }]
        this.tableData4 = obj1;
      }
    },
    szfs(){  // 弹窗收支方式赋值

    },
    deleteCompany() { // 删除
      const _this = this
      if (this.checkboxSelected == '' || this.checkboxSelected == null) {
        _this.$message.error('请先勾选才能进行删除操作!')
      } else {
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
      }
    },
    importFile() { // 批量导入
      this.$message({
        message: '暂未开放',
        type: 'warning'
      })
    },

    searchResult() { // 查询操作
      this.init()
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
    getCompanyList() { // 获取所属公司所以数据
    //   const _this = this
    //   axios.get(url.apiUrl() + '/api/MetadataOrg/GetAllOrg')
    //     .then(function(val) {
    //       _this.customerList = val.data.data
    //     })
    //     .catch(function(data) {
    //       _this.$message.error(data.data.error)
    //     })
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
      this.dialogFormVisible = true
      this.saveShow1 = false
      this.isShow = true
      this.newAdd = true
      this.isDisabled1 = true
      this.checkboxSelected = obj.v.vehicle_id // 给删除操作复制唯一的id
      this.areaInfo1.vehicle_id = obj.v.vehicle_id
      this.areaInfo1.vehicle_platenumber = obj.v.vehicle_platenumber
      this.areaInfo1.vehicleType = obj.vp.vehicle_property_name
      this.areaInfo1.vehicle1 = obj.vt.vehicle_tractortrailer_name
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
    // search(){
    //     this.$message.error("暂未开放!")
    // },
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
        }, time = o.y + '-' + o.M + '-' + o.d + ' ' + o.h + ':' + o.m + ':' + o.s,
        settlement_Customer_Statement_Balancemodes = JSON.parse(JSON.stringify(this.tableData4)).map((ele , index) =>{
          let obj = {
              customer_statement_balancemode_id: "",
              customer_statement_id: "",
              statement_balancemode_code: index,
              balance_mode_id: ele.payType,
              statement_balancemode_amount: ele.receivable_amount,
              statement_balancemode_bank: ele.bank,
              statement_balancemode_account: ele.kahao,
              statement_balancemode_holder: ele.kaiqiren,
              statement_balancemode_wechat: ele.wx,
              statement_balancemode_alipay: ele.zfb,
              statement_balancemode_fuelcard: ele.kh,
              statement_balancemode_comment: ele.bz
            }
          return obj ;
        }),
        settlement_Customer_Statement_Fees = JSON.parse(JSON.stringify(this.tableData5)).map((ele , index ) =>{
          let obj = {
              customer_statement_fee_id: "",
              customer_statement_id: "",
              manifest_id: ele.manifest_id,
              balance_amount: ele.payment_amount,
              cashpay_amount: ele.xf,
              collect_amount: ele.df,
              backpay_amount: ele.hf,
              owe_amount: ele.qf,
              departure_monthly_balance: ele.fhyj,
              arrival_monthly_balance: ele.shyj,
              arrival_bankcard: ele.hddk,
              arrival_deduct: ele.dkk,
              abnormal_increment: ele.ydzk,
              compensated_amount: ele.wmpc,
              rebate_commission: ele.hk,
              abnormal_decrement: ele.ydjk,
              compensate_amount: ele.pcwm
            }
            return obj ; 
        }),
        data1 = {
          settlement_Customer_Statement: {
            customer_statement_id: "",
            statement_org_id: this.Create_Org_ID,
            statement_code: this.jsdh,
            statement_state_id: "",
            statement_date: this.time,
            statement_object: this.jsdx,
            receivable_amount: this.ysje,
            outgo_amount: "",
            balance_amount: this.jsje,
            actual_amount: this.sjje,
            settled_amount: this.yjje,
            remaining_amount: this.ye,
            statement_comment: this.bz,
            create_time: time,
            create_org_id: this.Create_Org_ID,
            edit_user_id: "",
            edit_time: "",
            edit_org_id: ""
          },
          settlement_Customer_Statement_Balancemodes: settlement_Customer_Statement_Balancemodes,
          settlement_Customer_Statement_Fees: settlement_Customer_Statement_Fees
        }
        axios.post(url.apiUrl() + '/api/CustomerStatement/AddCustomerStatement', data1)
        .then(val => {
          if (val.data.error == '') {
            _this.$message({
              message: '添加成功!',
              type: 'success'
            })
            _this.jsdh = val.data.data;
            _this.dialogFormVisible = false;
            _this.init();
            // _this.printValue = ''
            // _this.dialogFormVisible = false
            // _this.init()
          }
        })
        .catch(val => {
          _this.$message.error('数据获取错误,请过一段时间重试!')
        })
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
  }
}
</script>
<style lang="scss" scoped>
.buttonBox{
    padding: 15px 15px 15px 15px;

}
.margin20{
  margin-left: 20px;
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
 .d-flex{
     display: -webkit-box !important;
    display: -ms-flexbox !important;
    display: flex !important;
 }
 .justify-content-center {
    -webkit-box-pack: center !important;
    -ms-flex-pack: center !important;
    justify-content: center !important;
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
 .el-table--small td,   .el-table--small th{
    padding: 0px;
}
</style>


