<template>
  <div class="app-container a1">
    <el-row class="buttonBox">
      <el-button class="page-btn-group" size="mini" v-if="addShow" @click="editInsert">新增</el-button>
      <el-button type="page-btn-group" class="page-btn-group" size="mini" v-show="isShow" @click="editEave">保存</el-button>
      <el-button class="page-btn-group" size="mini" v-show="isShow">保存并打印</el-button>
      <el-button class="page-btn-group" size="mini" @click="cancel" v-show="isEdit">取消</el-button>
      <el-button class="page-btn-group" size="mini" @click="editUpdate" v-show="!isShow">修改</el-button>
      <el-button class="page-btn-group" size="mini" v-show="isDelete" @click="editDelete" >删除</el-button>
      <!-- <el-button class="page-btn-group" size="mini" v-show="isEdit" @click="editDelete">复制新增</el-button> -->
      <!-- <el-button class="page-btn-group" size="mini">行删除</el-button> -->
      <el-button class="page-btn-group" size="mini">运单作废</el-button>
      <el-button class="page-btn-group" size="mini">上传附件</el-button>
      <el-button class="page-btn-group" size="mini">历史优化</el-button>
    </el-row>
    <el-row class="edit-page-modular">
      <div class="Edit-Title">运输委托单</div>
      <el-col :span="4">
        <el-input  v-model="result.Manifest_Code" placeholder="" v-bind:disabled="disabledInput" value="" disabled>
          <label class="radio-label" slot="prepend" >运单编号: </label>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-input placeholder="" v-bind:disabled="disabledInput" v-model="result.tuoyunshang">
        <label class="radio-label" slot="prepend" >托运商单号: </label>
        </el-input>
      </el-col>
      <el-col :span="8">
        <div class="Edit-Title"><hr><hr></div>
      </el-col>
      <el-col :span="4" class="hideIcon">
        <span style="color:#F79982;">*</span>
        <label class="radio-label">托运时间: </label>
        <el-date-picker style="width:100px;height:25px" required v-bind:disabled="disabledInput" v-model="result.tuoyuntime" tyle="date"></el-date-picker>
      </el-col>
      <el-col :span="4">
        <label class="radio-label" >运单状态: </label>
        <el-select style="width:100px;height:25px" disabled v-model="result.transportState_value" placeholder="请选择" >
          <el-option 
            v-for="item in transportState" 
            :key="item.value" 
            :label="item.Manifest_State_Name" 
            :value="item.Manifest_State_ID"></el-option>
        </el-select>
        </el-col>
    </el-row>

    <el-row class="edit-page-modular">
      <el-col :span="4">
        <el-input class="input-group"  v-model="result.tuoyunfazhan" disabled><label class="radio-label" slot="prepend" >发　　站: </label></el-input>
        <!-- <label class="radio-label" >发　　站: </label>
        <el-select v-model="result.tuoyunfazhan" style="width:100px;height:25px" placeholder="请选择" disabled>
          <el-option v-for="item in qu"
           :key="item.value" 
           :label="item.Org_district" 
           :value="item.o.Org_district"></el-option>
        </el-select> -->
      </el-col>
      <el-col :span="4">
       
        <el-input class="input-group" v-bind:disabled="disabledInput" v-model="result.tuoyundaozhan"> <label class="radio-label" slot="prepend" >到　　站: </label></el-input>
      </el-col>
      <el-col :span="4">
        
        <!-- <el-input  class="input-group" v-model="result.Arrival_Org_ID" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" ><span style="color:#F79982;">* </span> 到站网点: </label></el-input> -->
        <label class="radio-label" ><span style="color:#F79982;">* </span> 到站网点: </label>
        <el-select v-model="result.Arrival_Org_ID" style="width:100px;height:25px" placeholder="请选择" v-bind:disabled="disabledInput">
          <!-- <el-option v-for="item in customerList"
           :key="item.value" 
           :label="item.name" 
           :value="item.orgid"></el-option> -->
           <el-option
            v-for="item in customerList"
            :key="item.value"
            :label="item.Org_name"
            :value="item.Org_id">
            </el-option>
        </el-select>
        
      </el-col>
      <el-col :span="4">
        <label class="radio-label" >运输方式: </label>
        <el-select v-model="result.TypeOfShipping" style="width:100px;height:25px" placeholder="请选择" v-bind:disabled="disabledInput">
          <el-option v-for="item in transport_options"
           :key="item.value" 
           :label="item.Transportation_Type_Name" 
           :value="item.Transportation_Type_ID"></el-option>
        </el-select>
      </el-col>
    </el-row>


    <el-row class="edit-page-modular">
      <el-col :span="1" class="edit-goods-left">
        <div><i class="el-icon-location"></i><br><span>发货方</span></div>
      </el-col>
      <el-col :span="11">
        <el-row>
          <el-col :span="12" class="d-flex align-items-center">
            <!-- <el-input v-model="result.Consigner_Unit" class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >发货单位: </label></el-input> -->
            
            
            <!-- <el-autocomplete
              class="inline-input"
              v-model="result.Consigner_Unit"
              :fetch-suggestions="getConsigneeInfo"
              placeholder=""
              @select="selectFHDW"
            ><label class="radio-label" slot="prepend" >发货单位: </label></el-autocomplete> -->
            <label class="radio-label">发货单位:</label>
             <div class="select-box" style="width:50%;">
              <h3 class="align-items-center">
                <el-input
                  placeholder=""
                  class=""
                  v-model="result.Consigner_Unit"
                  v-bind:disabled="disabledInput"
                  @focus="changeStatus('Consigner_Unit')"
                  @blur="closeList"
                  @input="postFHR('Consigner_Unit')"
                  >
                </el-input>
              </h3>
              <transition name="slide-down">
                <ul class="select-options" v-show="isShow1">
                  <el-scrollbar class="tree aa" wrapClass="scrollbar-wrapper">
                     <table>
                      <tr>
                        <th class="w4"><span>单位</span></th><th class="w4"><span>发货人</span></th><th class="w4"><span>电话</span></th><th class="w8"><em>地址</em></th>
                      </tr>
                      <tr v-for="(item,index) in xialaList"
                        :key="index"
                        @click="EmitchangeOption('Consigner_Unit',index)"
                        >
                        <td class="w4"><span :title="item.Consigner_Unit">{{ item.Consigner_Unit }}</span></td>
                        <td class="w4"><span :title="item.Consigner_Contact">{{ item.Consigner_Contact  }}</span></td>
                        <td class="w4"><span :title="item.Consigner_Phone">{{ item.Consigner_Phone }}</span></td>
                        <td class="w8"><em :title="item.Consigner_Address">{{ item.Consigner_Address }}</em></td>
                      </tr>
                    </table>
                  </el-scrollbar>
                 
                  <div class="arrow-top"></div>
                </ul>   
              </transition> 
             </div>
          </el-col>
          <el-col :span="12" class="d-flex align-items-center">
            
            <!-- <el-input v-model="result.Consigner_Contact" class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" > <span style="color:#F79982;">* </span> 发货人: </label></el-input> -->
             
             <label class="radio-label"><span style="color:#F79982;">* </span> 发货人:</label>
             <div class="select-box" style="width:76%;">
              <h3 class="align-items-center">
                <el-input
                  placeholder=""
                  class=""
                  v-bind:disabled="disabledInput"
                  v-model="result.Consigner_Contact"
                  @input="postFHR('Consigner_Contact')"
                  @focus="changeStatus('Consigner_Contact')"
                  @blur="closeList"
                  
                  >
                </el-input>
              </h3>
              <transition name="slide-down">
                <ul class="select-options" v-show="isShow2">
                  <el-scrollbar class="tree aa" wrapClass="scrollbar-wrapper">
                     <table>
                      <tr>
                        <th class="w4"><span>单位</span></th><th class="w4"><span>发货人</span></th><th class="w4"><span>电话</span></th><th class="w8"><em>地址</em></th>
                      </tr>
                      <tr v-for="(item,index) in xialaList"
                        :key="index"
                        @click="EmitchangeOption('Consigner_Contact',index)"
                        >
                        <td class="w4"><span :title="item.Consigner_Unit">{{ item.Consigner_Unit }}</span></td>
                        <td class="w4"><span :title="item.Consigner_Contact">{{ item.Consigner_Contact  }}</span></td>
                        <td class="w4"><span :title="item.Consigner_Phone">{{ item.Consigner_Phone }}</span></td>
                        <td class="w8"><em :title="item.Consigner_Address">{{ item.Consigner_Address }}</em></td>
                      </tr>
                    </table>
                  </el-scrollbar>
                 
                  <div class="arrow-top"></div>
                </ul>   
              </transition>     
          </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="d-flex align-items-center">
            
            <!-- <el-input v-model="result.Consigner_Phone" class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" ><span style="color:#F79982;">* </span> 发货电话: </label></el-input> -->
            <label class="radio-label"><span style="color:#F79982;">* </span> 发货电话:</label>
             <div class="select-box">
              <h3 class="align-items-center">
                <el-input
                  placeholder=""
                  class=""
                  v-model="result.Consigner_Phone"
                  v-bind:disabled="disabledInput"
                  @focus="changeStatus('Consigner_Phone')"
                  @blur="closeList"
                  @input="postFHR('Consigner_Phone')"
                  >
                </el-input>
              </h3>
              <transition name="slide-down">
                <ul class="select-options" v-show="isShow3">
                  <el-scrollbar class="tree aa" wrapClass="scrollbar-wrapper">
                     <table>
                      <tr>
                        <th class="w4"><span>单位</span></th><th class="w4"><span>发货人</span></th><th class="w4"><span>电话</span></th><th class="w8"><em>地址</em></th>
                      </tr>
                      <tr v-for="(item,index) in xialaList"
                        :key="index"
                        @click="EmitchangeOption('Consigner_Phone',index)"
                        >
                        <td class="w4"><span :title="item.Consigner_Unit">{{ item.Consigner_Unit }}</span></td>
                        <td class="w4"><span :title="item.Consigner_Contact">{{ item.Consigner_Contact  }}</span></td>
                        <td class="w4"><span :title="item.Consigner_Phone">{{ item.Consigner_Phone }}</span></td>
                        <td class="w8"><em :title="item.Consigner_Address">{{ item.Consigner_Address }}</em></td>
                      </tr>
                    </table>
                  </el-scrollbar>
                 
                  <div class="arrow-top"></div>
                </ul>   
              </transition> 
             </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="d-flex align-items-center">
            
            <!-- <el-input v-model="result.Consigner_Address" class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >发货地址: </label></el-input> -->
           <label class="radio-label">发货地址:</label>
             <div class="select-box">
              <h3 class="align-items-center">
                <el-input
                  placeholder=""
                  class=""
                  v-model="result.Consigner_Address"
                  v-bind:disabled="disabledInput"
                  @focus="changeStatus('Consigner_Address')"
                  @blur="closeList"
                  @input="postFHR('Consigner_Address')"
                  >
                </el-input>
              </h3>
              <transition name="slide-down">
                <ul class="select-options" v-show="isShow4">
                  <el-scrollbar class="tree aa" wrapClass="scrollbar-wrapper">
                     <table>
                      <tr>
                        <th class="w4"><span>单位</span></th><th class="w4"><span>发货人</span></th><th class="w4"><span>电话</span></th><th class="w8"><em>地址</em></th>
                      </tr>
                      <tr v-for="(item,index) in xialaList"
                        :key="index"
                        @click="EmitchangeOption('Consigner_Address',index)"
                        >
                        <td class="w4"><span :title="item.Consigner_Unit">{{ item.Consigner_Unit }}</span></td>
                        <td class="w4"><span :title="item.Consigner_Contact">{{ item.Consigner_Contact  }}</span></td>
                        <td class="w4"><span :title="item.Consigner_Phone">{{ item.Consigner_Phone }}</span></td>
                        <td class="w8"><em :title="item.Consigner_Address">{{ item.Consigner_Address }}</em></td>
                      </tr>
                    </table>
                  </el-scrollbar>
                 
                  <div class="arrow-top"></div>
                </ul>   
              </transition> 
             </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="1" class="edit-goods-left">
        <div><i class="el-icon-location"></i><br><span>收货方</span></div>
      </el-col>
      <el-col :span="11">
        <el-row>
          <el-col :span="12" class="d-flex align-items-center">
            
            <!-- <el-input v-model="result.Consignee_Unit" class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >收货单位: </label></el-input> -->
            <label class="radio-label">收货单位:</label>
             <div class="select-box" style="width:50%;">
              <h3 class="align-items-center">
                <el-input
                  placeholder=""
                  class=""
                  v-model="result.Consignee_Unit"
                  v-bind:disabled="disabledInput"
                  @focus="changeStatus1('Consignee_Unit')"
                  @blur="closeList1"
                  @input="postFHR2('Consignee_Unit')"
                  >
                </el-input>
              </h3>
              <transition name="slide-down">
                <ul class="select-options" v-show="isShow5">
                  <el-scrollbar class="tree aa" wrapClass="scrollbar-wrapper">
                     <table>
                      <tr>
                        <th class="w4"><span>单位</span></th><th class="w4"><span>发货人</span></th><th class="w4"><span>电话</span></th><th class="w8"><em>地址</em></th>
                      </tr>
                      <tr v-for="(item,index) in xialaList"
                        :key="index"
                        @click="EmitchangeOption1('Consignee_Unit',index)"
                        >
                        <td class="w4"><span :title="item.Consignee_Unit">{{ item.Consignee_Unit }}</span></td>
                        <td class="w4"><span :title="item.Consignee_Contact">{{ item.Consignee_Contact  }}</span></td>
                        <td class="w4"><span :title="item.Consignee_Phone">{{ item.Consignee_Phone }}</span></td>
                        <td class="w8"><em :title="item.Consignee_Address">{{ item.Consignee_Address }}</em></td>
                      </tr>
                    </table>
                  </el-scrollbar>
                 
                  <div class="arrow-top"></div>
                </ul>   
              </transition> 
             </div>
          </el-col>
          <el-col :span="12" class="d-flex align-items-center">
            
            <!-- <el-input v-model="result.Consignee_Contact" class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" > 收货人: </label></el-input> -->
            <label class="radio-label"> 收货人: </label>
             <div class="select-box" >
              <h3 class="align-items-center">
                <el-input
                  placeholder=""
                  class=""
                  v-model="result.Consignee_Contact"
                  v-bind:disabled="disabledInput"
                  @focus="changeStatus1('Consignee_Contact')"
                  @blur="closeList1"
                  @input="postFHR2('Consignee_Contact')"
                  >
                </el-input>
              </h3>
              <transition name="slide-down">
                <ul class="select-options" v-show="isShow6">
                  <el-scrollbar class="tree aa" wrapClass="scrollbar-wrapper">
                     <table>
                      <tr>
                        <th class="w4"><span>单位</span></th><th class="w4"><span>发货人</span></th><th class="w4"><span>电话</span></th><th class="w8"><em>地址</em></th>
                      </tr>
                      <tr v-for="(item,index) in xialaList"
                        :key="index"
                        @click="EmitchangeOption1('Consignee_Contact',index)"
                        >
                        <td class="w4"><span :title="item.Consignee_Unit">{{ item.Consignee_Unit }}</span></td>
                        <td class="w4"><span :title="item.Consignee_Contact">{{ item.Consignee_Contact  }}</span></td>
                        <td class="w4"><span :title="item.Consignee_Phone">{{ item.Consignee_Phone }}</span></td>
                        <td class="w8"><em :title="item.Consignee_Address">{{ item.Consignee_Address }}</em></td>
                      </tr>
                    </table>
                  </el-scrollbar>
                 
                  <div class="arrow-top"></div>
                </ul>   
              </transition> 
             </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="d-flex align-items-center">
            
            <!-- <el-input v-model="result.Consignee_Phone" class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" ><span style="color:#F79982;">* </span> 收货电话: </label></el-input> -->
            <label class="radio-label"><span style="color:#F79982;">* </span> 收货电话: </label>
             <div class="select-box">
              <h3 class="align-items-center">
                <el-input
                  placeholder=""
                  class=""
                  v-model="result.Consignee_Phone"
                  v-bind:disabled="disabledInput"
                  @focus="changeStatus1('Consignee_Phone')"
                  @blur="closeList1"
                  @input="postFHR2('Consignee_Phone')"
                  >
                </el-input>
              </h3>
              <transition name="slide-down">
                <ul class="select-options" v-show="isShow7">
                  <el-scrollbar class="tree aa" wrapClass="scrollbar-wrapper">
                     <table>
                      <tr>
                        <th class="w4"><span>单位</span></th><th class="w4"><span>发货人</span></th><th class="w4"><span>电话</span></th><th class="w8"><em>地址</em></th>
                      </tr>
                      <tr v-for="(item,index) in xialaList"
                        :key="index"
                        @click="EmitchangeOption1('Consignee_Phone',index)"
                        >
                        <td class="w4"><span :title="item.Consignee_Unit">{{ item.Consignee_Unit }}</span></td>
                        <td class="w4"><span :title="item.Consignee_Contact">{{ item.Consignee_Contact  }}</span></td>
                        <td class="w4"><span :title="item.Consignee_Phone">{{ item.Consignee_Phone }}</span></td>
                        <td class="w8"><em :title="item.Consignee_Address">{{ item.Consignee_Address }}</em></td>
                      </tr>
                    </table>
                  </el-scrollbar>
                 
                  <div class="arrow-top"></div>
                </ul>   
              </transition> 
             </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="d-flex align-items-center">
            
            <!-- <el-input v-model="result.Consignee_Address" class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >收货地址: </label></el-input> -->
            <label class="radio-label">收货地址:</label>
             <div class="select-box">
              <h3 class="align-items-center">
                <el-input
                  placeholder=""
                  class=""
                  v-model="result.Consignee_Address"
                  v-bind:disabled="disabledInput"
                  @focus="changeStatus1('Consignee_Address')"
                  @blur="closeList1"
                  @input="postFHR2('Consignee_Address')"
                  >
                </el-input>
              </h3>
              <transition name="slide-down">
                <ul class="select-options" v-show="isShow8">
                  <el-scrollbar class="tree aa" wrapClass="scrollbar-wrapper">
                     <table>
                      <tr>
                        <th class="w4"><span>单位</span></th><th class="w4"><span>发货人</span></th><th class="w4"><span>电话</span></th><th class="w8"><em>地址</em></th>
                      </tr>
                      <tr v-for="(item,index) in xialaList"
                        :key="index"
                        @click="EmitchangeOption1('Consignee_Address',index)"
                        >
                        <td class="w4"><span :title="item.Consignee_Unit">{{ item.Consignee_Unit }}</span></td>
                        <td class="w4"><span :title="item.Consignee_Contact">{{ item.Consignee_Contact  }}</span></td>
                        <td class="w4"><span :title="item.Consignee_Phone">{{ item.Consignee_Phone }}</span></td>
                        <td class="w8"><em :title="item.Consignee_Address">{{ item.Consignee_Address }}</em></td>
                      </tr>
                    </table>
                  </el-scrollbar>
                 
                  <div class="arrow-top"></div>
                </ul>   
              </transition> 
             </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>


    <el-table class="edit-page-modular" 
      :data="result.list" 
      v-loading="listLoading" 
      element-loading-text="拼命加载中" 
      sortable  
      border 
      fit 
      highlight-current-row 
      @header-click="editTableInsert">
      <el-table-column align="center"  label='+' >
        <template slot-scope="scope">
          <i class="el-icon-remove" @click="editTableDelete(scope.$index,scope)"></i>
        </template>
      </el-table-column>
      <el-table-column align="center"  label='序号' >
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="货物编码" >
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput" v-model="scope.row.m.Goods_Code"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center" >
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput" v-model="scope.row.m.Goods_Name"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="包装" align="center" >
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput" v-model="scope.row.m.Goods_Package"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="计费方式">
        <template slot-scope="scope">
          <el-select @change="ListOperation(scope.$index)" 
            v-model="scope.row.b.Billing_method_id" style="width:100px;height:25px" placeholder="请选择"
            v-bind:disabled="disabledInput">
            <el-option v-for="item in GetAllManifestdtlBillingMethod"
            :key="item.value"
             :label="item.Billing_method_name" 
             :value="item.Billing_method_id"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="件数"  align="center">
        <template slot-scope="scope">
          <el-input class="input-group" type="number" v-bind:disabled="disabledInput" @change="ListOperation(scope.$index)" v-model="scope.row.m.Goods_Piece"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="重量(公斤)"  align="center">
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput" @change="ListOperation(scope.$index)" v-model="scope.row.m.Goods_Weight"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="体积(立方)"  align="center">
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput" @change="ListOperation(scope.$index)" v-model="scope.row.m.Goods_Volume"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="运费单价"  align="center">
        <template slot-scope="scope">
          <el-input class="input-group" placeholder="0" v-bind:disabled="disabledInput" @change="ListOperation(scope.$index)" v-model="scope.row.m.Freight_Unitprice"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="运费金额"  align="center">
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput" @change="changeYF(scope.row)" v-model="scope.row.m.Freight_Totalprice"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="保险金额"  align="center">
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput" @change="ListOperation(scope.$index)"  v-model="scope.row.m.Insurance_Amount"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="保费比"  align="center">
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput" @change="ListOperation(scope.$index)"  v-model="scope.row.m.Premium_Ratio"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="保险费"  align="center">
        <template slot-scope="scope">
          <!-- <el-input class="input-group" v-bind:disabled="disabledInput" v-model="scope.row.consignor_phone"></el-input> -->
        </template>
      </el-table-column>
      <el-table-column label="备注"  align="center">
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput" v-model="scope.row.m.Manifestdtl_Comment"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <div class="Settlement-Waybill">
      <el-row>

        <el-col class="edit-page-modular" :span="12">
          <div class="edit-Settlement-d">合计:{{moneyTotal}}</div>
          <el-row>
            <el-col :span="6">
             
              <el-input type="number"  class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model="result.yf"> <label class="radio-label" slot="prepend" >运　　费: </label></el-input>
            </el-col>
            <el-col :span="6">
              
              <el-input type="number" class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model="result.sh"><label class="radio-label" slot="prepend" >送 货 费: </label></el-input>
            </el-col>
            <el-col :span="6">
              
              <el-input type="number" class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model="result.th"><label class="radio-label" slot="prepend" >提 货 费: </label></el-input>
            </el-col>
            <el-col :span="6">
              
              <el-input type="number" class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model="result.zx"><label class="radio-label" slot="prepend" >装 卸 费: </label></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              
              <el-input type="number" class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model="result.bx"><label class="radio-label" slot="prepend" >保险金额: </label></el-input>
            </el-col>
            <el-col :span="6">
              
              <el-input type="number" class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model="result.bj"><label class="radio-label" slot="prepend" >保 价 费: </label></el-input>
            </el-col>
            <el-col :span="6">
              
              <el-input type="number" class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model="result.bz"><label class="radio-label" slot="prepend" >包 装 费: </label></el-input>
            </el-col>
            <el-col :span="6">
              
              <el-input type="number" class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model="result.cc"><label class="radio-label" slot="prepend" >仓 储 费: </label></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              
              <el-input type="number" class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model="result.other"><label class="radio-label" slot="prepend" >其 他 费: </label></el-input>
            </el-col>
            <el-col :span="6">
              
              <el-input type="number" class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model="result.hk"><label class="radio-label" slot="prepend" >回 扣 费: </label></el-input>
            </el-col>
            <el-col :span="12">
              
              <el-input type="number" class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model="result.yfjc"><label class="radio-label" slot="prepend" >预付进仓费: </label></el-input>
            </el-col>
          </el-row>
        </el-col>
        <!-- ———————————————————————————————————————— -->
        <el-col class="edit-page-modular" :span="12">
        <div class="edit-Settlement-d">付款方式</div>
          <el-row>
            <el-col :span="8">
              <label class="radio-label" ><span style="color:#F79982;">* </span> 付款方式: </label>
              <el-select 
                style="width:100px;height:25px" 
                @change="Settlement" 
                v-model="result.payme_value" 
                placeholder="请选择" 
                v-bind:disabled="disabledInput">
                <el-option 
                  v-for="(item , index) in paymeMode" 
                  :key="index" 
                  :label="item.Payment_Mode_Name" 
                  :value="item.Payment_Mode_ID"></el-option>
              </el-select>
              
              <!-- <el-input class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >付款方式: </label></el-input> -->
            </el-col>
            <el-col :span="8">
              
              <el-input type="number" class="input-group" disabled v-bind:disabled="disabledInput1" v-model="result.moneyxf" @change="totalMoney(result.moneyxf)"><label class="radio-label" slot="prepend" >现　　付: </label></el-input>
            </el-col>
            <el-col :span="8">
              
              <el-input type="number" class="input-group" disabled v-bind:disabled="disabledInput2" v-model="result.moneydf" @change="totalMoney(result.moneydf)"><label class="radio-label" slot="prepend" >到　　付: </label></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              
              <el-input type="number" class="input-group" disabled v-bind:disabled="disabledInput3" v-model="result.moneyqf" @change="totalMoney(result.moneyqf)"><label class="radio-label" slot="prepend" >欠　　付: </label></el-input>
            </el-col>
            <el-col :span="8">
              
              <el-input type="number" class="input-group" disabled v-bind:disabled="disabledInput4" v-model="result.moneyhdf" @change="totalMoney(result.moneyhdf)"><label class="radio-label" slot="prepend" >回 单 付: </label></el-input>
            </el-col>
            <el-col :span="8">
              
              <el-input type="number" class="input-group" disabled v-bind:disabled="disabledInput5" v-model="result.moneyfhyj" @change="totalMoney(result.moneyfhyj)"><label class="radio-label" slot="prepend" >发货月结: </label></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              
              <el-input type="number" class="input-group" disabled v-bind:disabled="disabledInput6" v-model="result.moneyshyj" @change="totalMoney(result.moneyshyj)"><label class="radio-label" slot="prepend" >收货月结: </label></el-input>
            </el-col>
            <el-col :span="8">
              
              <el-input type="number" class="input-group" disabled v-bind:disabled="disabledInput7" v-model="result.moneyhddk" @change="totalMoney(result.moneyhddk)"><label class="radio-label" slot="prepend" >货到打卡: </label></el-input>
            </el-col>
            <el-col :span="8">
              
              <el-input type="number" class="input-group" disabled v-bind:disabled="disabledInput8" v-model="result.moneydkk" @change="totalMoney(result.moneydkk)"><label class="radio-label" slot="prepend" >贷 款 扣: </label></el-input>
            </el-col>
          </el-row>
        </el-col>
        
      </el-row>
    </div>
    <!-- ———————————————————————————————————————— -->
    <el-row class="edit-page-modular">
      <el-col :span="4">
        
        <!-- <el-input v-model="result.User_ID"  class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >业务员: </label></el-input> -->
        <label class="radio-label" >业务员: </label>
        <el-select
          v-model="result.User_ID"
          style="width:100px;height:25px" 
          placeholder="请选择" 
          v-bind:disabled="disabledInput">
          <el-option 
            v-for="item in ywy" 
            :key="item.value" 
            :label="item.admin" 
            :value="item.adminCode"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <label class="radio-label" ><span style="color:#F79982;">* </span> 交接方式: </label>
        <el-select
          v-model="result.HandoverMethod"
          style="width:100px;height:25px" 
          placeholder="请选择" 
          v-bind:disabled="disabledInput">
          <el-option 
            v-for="item in GetAllManifestTransferMode" 
            :key="item.value" 
            :label="item.Transfer_Mode_Name" 
            :value="item.Transfer_Mode_ID"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <label class="radio-label" >回　　单: </label>
        <el-select 
          v-model="result.Return" 
          style="width:100px;height:25px" 
          placeholder="请选择" 
          v-bind:disabled="disabledInput">
          <el-option 
            v-for="item in GetAllManifestRecieptType" 
            :key="item.value" 
            :label="item.Reciept_Type_Name" 
            :value="item.Reciept_Type_ID"></el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        
        <el-input v-model="result.manifest_comment" class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >备　　注: </label></el-input>
      </el-col>
    </el-row>
  </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import axios from 'axios' 
import url from '@/js/common.js'
import storage from '@/js/localstorage.js'
import oSelect from '@/views/basicManagement/test.vue'
import '@/assets/css/reset.css'
export default {
  name: 'oSelect',
  props: { // 子组件接收父组件传过来的值，使用props
    selectData: {
      type: Object // 传过来的必须是对象
    }
  },
  data() {
    return {
      moneyTotal: 0, // 合计
      result: {
        tuoyunshang: '',
        tuoyuntime: '',
        tuoyunfazhan: '',
        tuoyundaozhan: '',
        tuoyundaozhanwangdian: '',
        Manifest_Code: '',
        // ----------
        payme_value: "", // 付款方式
        yf: '',
        sh: '',
        th: '',
        zx: '',
        bx: '',
        bj: '',
        bz: '',
        cz: '',
        other: '',
        hk: '',
        yfjc: '',
        moneyxf: '',
        moneydf: '',
        moneyqf: '',
        moneyhdf: '',
        moneyfhyj: '',
        moneyshyj: '',
        moneyhddk: '',
        moneydkk: '',
        // ----------
        list: [

        ],
        transportState_value: '', // 运单状态
        Arrival_Org_ID: '', // 到站网点
        TypeOfShipping: '', // 绑定的运输方式数据
        Consigner_Unit: '',
        Consigner_Contact: '',
        Consigner_Phone: '',
        Consigner_Address: '',
        Consignee_Unit: '',
        Consignee_Contact: '',
        Consignee_Phone: '',
        Consignee_Address: '',
        User_ID: '', // 业务员
        HandoverMethod: '', // 绑定的交接方式
        Return: '', // 绑定的回单
        manifest_comment: '', // 备注
        Create_Org_ID: '',
        Create_User_ID: '',
        checkNum: false, // 检查表格中件数是否填写
        checkName: false // 检查表格中名称是否填写

      },
      paymeMode: [{
        value: '0',
        label: '免费'
      }, {
        value: '1',
        label: '到付'
      }, {
        value: '2',
        label: '现付'
      }],

      transportState: [],
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

      editId: false,

      isEdit: false, // 编辑显示 新增隐藏
      Manifest_ID: '', // 运单id从路由获取
      GetAllManifestTransferMode: '', // 交接方式数据
      GetAllManifestRecieptType: '', // 回单类型数据
      GetAllManifestdtlBillingMethod: '', // 所有计费方式数据
      saveShow1: false, // 保存按钮是否显示
      customerList: [ // 到站网点

      ],
      qu: '',
      urlMessage: '', // 获取的地址栏参数
      addShow: false, // 判断新增是否显示
      ywy: '',
      isDeleteMx: [], // 是否删除表格明细的数据
      DefaultCompany: '', // 当前登陆下的公司网点
      defaultAddress: '', // 默认发站地址
      defaultAddressId: '',
      isUpdate: false, // 变量 判断是否是添加还新增是
      Departure_Balance_Date: '', // 修改保存的字段
      Departure_Balance_Person: '',
      Departure_2ndbalance_Date: '',
      Departure_2ndbalance_Person: '',
      Entryfee_Collect: '',
      Arrival_Balance_Date: '',
      Arrival_Balance_Person: '',
      Driver_Balance_Date: '',
      Driver_Balance_Person: '',
      Operate_Org_ID: '',
      Operate_User_ID: '',
      Operate_Date: '',
      Edit_User_ID: '',
      consigner_contactList: '', // 发货人 发货人全部数据
      Consigner_UnitList: '', // 发货人 发货单位列表
      Consigner_PhoneList: '', // 发货人 发货电话列表
      Consigner_AddressList: '', // 发货人 发货地址列表
      Consignee_UnitList: '', // 收货人 发货单位列表
      Consignee_PhoneList: '', // 收货人 发货电话列表
      Consignee_AddressList: '', // 收货人 发货地址列表
      c: '',

      isShow1: false, // 发货人
      isShow2: false, // 发货单位
      isShow3: false, // 发货电话
      isShow4: false, // 发货地址
      isShow5: false, // 收货人
      isShow6: false, // 收货单位
      isShow7: false, // 收货电话
      isShow8: false, // 收货地址
      xialaList: '',
      disabledInput1:true,
      disabledInput2:true,
      disabledInput3:true,
      disabledInput4:true,
      disabledInput5:true,
      disabledInput6:true,
      disabledInput7:true,
      disabledInput8:true,
      isDelete:false, // 是否显示删除按钮
      isShow:false, // 控制按钮是否显示
    }
  },
  filters: {
    numFilter(val) {
      const realVal = Number(val).toFixed(3)

      return Number(realVal)
    }
  },
  mounted() {
    const loginInfo = JSON.parse(storage.getStorage('currentUser'))
    this.Create_Org_ID = loginInfo.orgId
    this.Create_User_ID = loginInfo.userId
    const obj = [{
      admin: loginInfo.displayName,
      adminCode: loginInfo.userId
    }]
    this.ywy = obj

    this.GetAllManifestPaymentMode() // 获取付款方式
    this.GetAllManifestTransferModes() // 获取交接方式

    // /////////////
    this.GetAllManifestRecieptTypes() // 所有回单类型
    this.GetAllManifestTransportationType() // 所有运输方式
    this.GetAllManifestdtlBillingMethods() // 所有计费方式
    this.GetAllManifest_State() // 所有运单状态

    this.getFz() // 获取发站信息
    this.fetchData() // 初始化数据 判断是否是详情还是新增
    this.init() // 根据id获取数据

    this.getCompanyList() // 获取所属公司所以数据
    // this.getOrgCity() //  获取发站信息  取区

    this.getfkfs() // 付款方式里面的数据
  },
  watch: {
    result() {
    }
  },
  components: {
    oSelect
  },
  methods: {
    EmitchangeOption(val, i) {
      this.isShow1 = false
      this.isShow2 = false
      this.isShow3 = false
      this.isShow4 = false
      if (val == 'Consigner_Contact') { // 默认发货单位
        this.result.Consigner_Unit = this.xialaList[i].Consigner_Unit
        this.result.Consigner_Contact = this.xialaList[i].Consigner_Contact
        this.result.Consigner_Phone = this.xialaList[i].Consigner_Phone
        this.result.Consigner_Address = this.xialaList[i].Consigner_Address
      } else if (val == 'Consigner_Unit') { // 默认发货人
        this.result.Consigner_Unit = this.xialaList[i].Consigner_Unit
        this.result.Consigner_Contact = this.xialaList[i].Consigner_Contact
        this.result.Consigner_Phone = this.xialaList[i].Consigner_Phone
        this.result.Consigner_Address = this.xialaList[i].Consigner_Address
      } else if (val == 'Consigner_Phone') { // 默认发货电话
        this.result.Consigner_Unit = this.xialaList[i].Consigner_Unit
        this.result.Consigner_Contact = this.xialaList[i].Consigner_Contact
        this.result.Consigner_Phone = this.xialaList[i].Consigner_Phone
        this.result.Consigner_Address = this.xialaList[i].Consigner_Address
      } else { // 默认发货人地址
        this.result.Consigner_Unit = this.xialaList[i].Consigner_Unit
        this.result.Consigner_Contact = this.xialaList[i].Consigner_Contact
        this.result.Consigner_Phone = this.xialaList[i].Consigner_Phone
        this.result.Consigner_Address = this.xialaList[i].Consigner_Address
      }
    },
    closeList() {
      this.isShow1 = false
      this.isShow2 = false
      this.isShow3 = false
      this.isShow4 = false
    },
    changeStatus(val) { // 下拉列表聚焦的时候获取数据
      const _this = this

      const data2 = {

      }
      if (val == 'Consigner_Unit') { // 默认发货单位
        this.isShow1 = true
        if (this.result.Consigner_Unit == '') {
          this.post1(data2)
        } else {
          this.postFHR(val)
        }
      } else if (val == 'Consigner_Contact') { // 默认发货人
        this.isShow2 = true
        if (this.result.Consigner_Contact == '') {
          this.post1(data2)
        } else {
          this.postFHR(val)
        }
      } else if (val == 'Consigner_Phone') { // 默认发货电话
        this.isShow3 = true
        if (this.result.Consigner_Phone == '') {
          this.post1(data2)
        } else {
          this.postFHR(val)
        }
      } else { // 默认发货人地址
        this.isShow4 = true
        if (this.result.Consigner_Address == '') {
          this.post1(data2)
        } else {
          this.postFHR(val)
        }
      }
    },
    post1(val) {
      const _this = this
      axios.post(url.apiUrl() + '/api/Manifest/ManifestWhere', val)
        .then(function(val) {
          if (val.data.error == '') {
            const resultList = val.data.data.map(ele => {
              const obj = {}
              obj.Consigner_Unit = ele.Consigner_Unit
              obj.Consigner_Contact = ele.Consigner_Contact // 默认发货人数据
              obj.Consigner_Phone = ele.Consigner_Phone
              obj.Consigner_Address = ele.Consigner_Address
              return obj
            })
            _this.xialaList = resultList
          } else {
            // _this.$message.error("数据获取失败!");
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    postFHR(val) { // input改变的时候获取数据
      let _this = this, data2
      if (val == 'Consigner_Contact') { // 默认发货单位
        data2 = {
          Consigner_Contact: this.result.Consigner_Contact
        }
      } else if (val == 'Consigner_Unit') { // 默认发货人
        data2 = {
          Consigner_Unit: this.result.Consigner_Unit
        }
      } else if (val == 'Consigner_Phone') { // 默认发货电话
        data2 = {
          Consigner_Phone: this.result.Consigner_Phone
        }
      } else { // 默认发货人地址
        data2 = {
          Consigner_Address: this.result.Consigner_Address
        }
      }
      axios.post(url.apiUrl() + '/api/Manifest/ManifestWhere', data2)
        .then(function(val) {
          if (val.data.error == '') {
            const resultList = val.data.data.map(ele => {
              const obj = {}
              if (val == 'Consigner_Contact') { // 默认发货单位
                obj.Consigner_Unit = ele.Consigner_Unit
                obj.Consigner_Contact = ele.Consigner_Contact
                obj.Consigner_Phone = ele.Consigner_Phone
                obj.Consigner_Address = ele.Consigner_Address
                return obj
              } else if (val == 'Consigner_Unit') { // 默认发货人
                obj.Consigner_Unit = ele.Consigner_Unit
                obj.Consigner_Contact = ele.Consigner_Contact
                obj.Consigner_Phone = ele.Consigner_Phone
                obj.Consigner_Address = ele.Consigner_Address
                return obj
              } else if (val == 'Consigner_Phone') { // 默认发货电话
                obj.Consigner_Unit = ele.Consigner_Unit
                obj.Consigner_Contact = ele.Consigner_Contact
                obj.Consigner_Phone = ele.Consigner_Phone
                obj.Consigner_Address = ele.Consigner_Address
                return obj
              } else { // 默认发货人地址
                obj.Consigner_Unit = ele.Consigner_Unit
                obj.Consigner_Contact = ele.Consigner_Contact
                obj.Consigner_Phone = ele.Consigner_Phone
                obj.Consigner_Address = ele.Consigner_Address
                return obj
              }
            })
            _this.xialaList = resultList
          } else {
            _this.$message.error('数据获取失败!')
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    EmitchangeOption1(val, i) {
      console.log(val, i)
      if (val == 'Consignee_Contact') { // 默认发货单位
        this.result.Consignee_Unit = this.xialaList[i].Consignee_Unit
        this.result.Consignee_Contact = this.xialaList[i].Consignee_Contact
        this.result.Consignee_Phone = this.xialaList[i].Consignee_Phone
        this.result.Consignee_Address = this.xialaList[i].Consignee_Address
      } else if (val == 'Consignee_Unit') { // 默认发货人
        this.result.Consignee_Unit = this.xialaList[i].Consignee_Unit
        this.result.Consignee_Contact = this.xialaList[i].Consignee_Contact
        this.result.Consignee_Phone = this.xialaList[i].Consignee_Phone
        this.result.Consignee_Address = this.xialaList[i].Consignee_Address
      } else if (val == 'Consignee_Phone') { // 默认发货电话
        this.result.Consignee_Unit = this.xialaList[i].Consignee_Unit
        this.result.Consignee_Contact = this.xialaList[i].Consignee_Contact
        this.result.Consignee_Phone = this.xialaList[i].Consignee_Phone
        this.result.Consignee_Address = this.xialaList[i].Consignee_Address
      } else { // 默认发货人地址
        this.result.Consignee_Unit = this.xialaList[i].Consignee_Unit
        this.result.Consignee_Contact = this.xialaList[i].Consignee_Contact
        this.result.Consignee_Phone = this.xialaList[i].Consignee_Phone
        this.result.Consignee_Address = this.xialaList[i].Consignee_Address
      }
      this.isShow5 = false
      this.isShow6 = false
      this.isShow7 = false
      this.isShow8 = false
    },
    closeList1() {
      this.isShow5 = false
      this.isShow6 = false
      this.isShow7 = false
      this.isShow8 = false
    },
    changeStatus1(val) { // 下拉列表聚焦的时候获取数据
      const _this = this

      const data2 = {

      }
      if (val == 'Consignee_Unit') { // 默认发货单位
        this.isShow5 = true
        if (this.result.Consignee_Unit == '') {
          this.post2(data2)
        } else {
          this.postFHR2(val)
        }
      } else if (val == 'Consignee_Contact') { // 默认发货人
        this.isShow6 = true
        if (this.result.Consignee_Contact == '') {
          this.post2(data2)
        } else {
          this.postFHR2(val)
        }
      } else if (val == 'Consignee_Phone') { // 默认发货电话
        this.isShow7 = true
        if (this.result.Consignee_Phone == '') {
          this.post2(data2)
        } else {
          this.postFHR2(val)
        }
      } else { // 默认发货人地址
        this.isShow8 = true
        if (this.result.Consignee_Address == '') {
          this.post2(data2)
        } else {
          this.postFHR2(val)
        }
      }
    },
    post2(val) {
      const _this = this
      axios.post(url.apiUrl() + '/api/Manifest/ManifestWhere', val)
        .then(function(val) {
          if (val.data.error == '') {
            const resultList = val.data.data.map(ele => {
              const obj = {}
              obj.Consignee_Unit = ele.Consignee_Unit
              obj.Consignee_Contact = ele.Consignee_Contact // 默认发货人数据
              obj.Consignee_Phone = ele.Consignee_Phone
              obj.Consignee_Address = ele.Consignee_Address
              return obj
            })
            _this.xialaList = resultList
          } else {
            // _this.$message.error("数据获取失败!");
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    postFHR2(val) { // input改变的时候获取数据
      let _this = this, data2
      if (val == 'Consignee_Contact') { // 默认发货单位
        data2 = {
          Consignee_Contact: this.result.Consignee_Contact
        }
      } else if (val == 'Consignee_Unit') { // 默认发货人
        data2 = {
          Consignee_Unit: this.result.Consignee_Unit
        }
      } else if (val == 'Consignee_Phone') { // 默认发货电话
        data2 = {
          Consignee_Phone: this.result.Consignee_Phone
        }
      } else { // 默认发货人地址
        data2 = {
          Consignee_Address: this.result.Consignee_Address
        }
      }
      axios.post(url.apiUrl() + '/api/Manifest/ManifestWhere', data2)
        .then(function(val) {
          if (val.data.error == '') {
            const resultList = val.data.data.map(ele => {
              const obj = {}
              if (val == 'Consignee_Contact') { // 默认发货单位
                obj.Consignee_Unit = ele.Consignee_Unit
                obj.Consignee_Contact = ele.Consignee_Contact
                obj.Consignee_Phone = ele.Consignee_Phone
                obj.Consignee_Address = ele.Consignee_Address
                return obj
              } else if (val == 'Consignee_Unit') { // 默认发货人
                obj.Consignee_Unit = ele.Consignee_Unit
                obj.Consignee_Contact = ele.Consignee_Contact
                obj.Consignee_Phone = ele.Consignee_Phone
                obj.Consignee_Address = ele.Consignee_Address
                return obj
              } else if (val == 'Consignee_Phone') { // 默认发货电话
                obj.Consignee_Unit = ele.Consignee_Unit
                obj.Consignee_Contact = ele.Consignee_Contact
                obj.Consignee_Phone = ele.Consignee_Phone
                obj.Consignee_Address = ele.Consignee_Address
                return obj
              } else { // 默认发货人地址
                obj.Consignee_Unit = ele.Consignee_Unit
                obj.Consignee_Contact = ele.Consignee_Contact
                obj.Consignee_Phone = ele.Consignee_Phone
                obj.Consignee_Address = ele.Consignee_Address
                return obj
              }
            })
            _this.xialaList = resultList
          } else {
            _this.$message.error('数据获取失败!')
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    getUserInfo() { //  获取发货人  收货人信息
      const _this = this
      axios.post(url.apiUrl() + '/api/MetadataOrg/GeOrgId?org_id=' + this.Create_Org_ID)
        .then(function(val) {
          _this.qu = val.data.data
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    getConsigneeInfo(queryString, cb) {
      var restaurants = this.Consignee
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },

    fhrFZ(val) { // 发货人选择下拉框时赋值
      if (val == this.result.Consigner_Contact) {
        return false
      } else {
        this.result.Consigner_Unit = val.Consigner_Unit
        this.result.Consigner_Phone = val.Consigner_Phone
        this.result.Consigner_Address = val.Consigner_Address
      }
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    selectFHDW(v) {
    },
    proving1() {
      this.single_bet_min.value = this.single_bet_min.value.replace(/[^\.\d]/g, '')
      this.single_bet_min.value = this.single_bet_min.value.replace('.', '')
    },
    getOrgCity() { // 获取发站信息  取区
      const _this = this
      axios.post(url.apiUrl() + '/api/MetadataOrg/GeOrgId?org_id=' + this.Create_Org_ID)
        .then(function(val) {
          _this.qu = val.data.data
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
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
    // ///////////////////////////////////
    getfkfs() { // 付款方式里面的数据
      const _this = this
      if (this.urlMessage.manifest_id) {
        axios.get(url.apiUrl() + '/api/Manifest/GetManifestByID?manifest_id=' + this.urlMessage.manifest_id)
          .then(function(val) {
            const msg = val.data.data
            _this.result.moneyxf = msg.xianfu
            _this.result.moneydf = msg.daofu
            _this.result.moneyqf = msg.qianfu
            _this.result.moneyhdf = msg.huidanfu
            _this.result.moneyfhyj = msg.fahuoyuejie
            _this.result.moneyshyj = msg.shouhuoyuejie
            _this.result.moneyhddk = msg.huodaodaka
            _this.result.moneydkk = msg.huokuankou
            _this.moneyTotal = msg.total_charge
          })
          .catch(function(data) {
            _this.$message.error(data.data.error)
          })
      }
    },
    GetMessage() { // 获取地址栏参数并赋值
      //  this.Manifest_ID,
      this.result.Manifest_Code = this.urlMessage.manifest_code
      this.result.tuoyunshang = this.urlMessage.shipper_code
      this.result.tuoyuntime = this.urlMessage.shipping_date
      // this.result.tuoyunfazhan ;
      this.result.transportState_value = parseFloat(this.urlMessage.manifest_state_id)
      this.result.tuoyundaozhan = this.urlMessage.arrival_city
      this.result.Arrival_Org_ID = parseFloat(this.urlMessage.arrival_org_id)
      this.result.tuoyunfazhan = this.urlMessage.departure_city
      this.result.TypeOfShipping = parseFloat(this.urlMessage.transportation_type)
      this.result.Consigner_Unit = this.urlMessage.consigner_unit
      this.result.Consigner_Contact = this.urlMessage.consigner_contact
      this.result.Consigner_Phone = this.urlMessage.consigner_phone
      this.result.Consigner_Address = this.urlMessage.consigner_address
      this.result.Consignee_Unit = this.urlMessage.consignee_unit
      this.result.Consignee_Contact = this.urlMessage.consignee_contact
      this.result.Consignee_Phone = this.urlMessage.consignee_phone
      this.result.Consignee_Address = this.urlMessage.consignee_address
      this.result.yf = this.urlMessage.freight_charge
      this.result.sh = this.urlMessage.delivery_charge
      this.result.th = this.urlMessage.pickup_charge
      this.result.zx = this.urlMessage.handling_charge
      this.result.bx = this.urlMessage.insurance_amount
      this.result.bj = this.urlMessage.insurance_charge
      this.result.bz = this.urlMessage.packing_charge
      this.result.cc = this.urlMessage.storage_charge
      this.result.other = this.urlMessage.other_charge
      this.result.yfjc = this.urlMessage.entryfee_prepaid // 预付进仓费
      this.result.hk = this.urlMessage.rebate_commission
      //  付款方式
      this.result.payme_value = this.urlMessage.payment_mode_id
      // 业务员
      this.result.User_ID = this.urlMessage.user_id
      this.result.HandoverMethod = parseFloat(this.urlMessage.transfer_mode)
      this.result.Return = parseFloat(this.urlMessage.reciept_type)
      this.result.manifest_comment = this.urlMessage.manifest_comment
      // 从地址蓝获取的 发站结算日期 以下的数据
      this.result.manifest_comment = this.urlMessage.manifest_comment
      this.result.Departure_Balance_Person = this.urlMessage.departure_balance_person
      this.result.Departure_2ndbalance_Date = this.urlMessage.departure_2ndbalance_date
      this.result.Departure_2ndbalance_Person = this.urlMessage.departure_2ndbalance_person
      this.result.Entryfee_Collect = this.urlMessage.entryfee_collect
      this.result.Arrival_Balance_Date = this.urlMessage.arrival_balance_date
      this.result.Arrival_Balance_Person = this.urlMessage.arrival_balance_person
      this.result.Driver_Balance_Date = this.urlMessage.driver_balance_date
      this.result.Driver_Balance_Person = this.urlMessage.driver_balance_person
      this.result.Operate_Org_ID = this.urlMessage.operate_org_id
      this.result.Operate_User_ID = this.urlMessage.operate_user_id
      this.result.Operate_Date = this.urlMessage.operate_date
      this.result.Edit_User_ID = this.urlMessage.edit_user_id;

      // 判断按钮是否显示
      
      if(this.result.payme_value == 1 && this.disabledInput == true){
        this.isDelete = true ;
      }
      if(this.result.transportState_value == 50){
          this.isDelete = true ;
          this.isShow = true;
      }else{
        this.isDelete = false ;
        this.isShow = false;

      }
    },
    getFz() { // 获取发站信息
      const _this = this
      axios.post(url.apiUrl() + '/api/MetadataOrg/GeOrgId?org_id=' + this.Create_Org_ID)
        .then(function(val) {
          if (val.data.error == '') {
            _this.stateOfAllManifest = val.data.data
            // tableColumns[4].selectOptions=val.data.data;
            _this.defaultAddress = val.data.data[0].Org_city
            _this.DefaultCompany = val.data.data[0].o.Org_id
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(val) {
          _this.$message.error(val.data.error)
        })
    },
    editInsert() { // 新增
      this.isUpdate = false // 提交操作
      const date = new Date()
      const o = {
          'y': date.getFullYear(), // 年份
          'M': date.getMonth() + 1, // 月份
          'd': date.getDate(), // 日
          'h': date.getHours(), // 小时
          'm': date.getMinutes(), // 分
          's': date.getSeconds(), // 秒
          'q': Math.floor((date.getMonth() + 3) / 3), // 季度
          'S': date.getMilliseconds() // 毫秒
        }, time = o.y + '-' + o.M + '-' + o.d
      this.disabledInput = false
      this.saveShow1 = true
      // this.result.Arrival_Org_ID = this.result.Create_Org_ID

      // 清空数据
      this.result = {
        transportState_value: 50, // 运单状态
        TypeOfShipping: 1, // 运输方式
        payme_value: 1, // 付款方式
        User_ID: 1, // 业务员
        HandoverMethod: 1, // 交接方式
        Return: 1, // 回单
        tuoyuntime: time,
        tuoyunfazhan: this.defaultAddress, // ////
        Consigner_Unit: '',
        Consigner_Contact: '',
        Consigner_Phone: '',
        Consigner_Address: '',
        Consignee_Unit: '',
        Consignee_Contact: '',
        Consignee_Phone: '',
        Consignee_Address: ''
      }
      // this.result.transportState_value = 1;
      // this.result.TypeOfShipping = 1;
      // this.result.payme_value = 1;
      // this.result.User_ID = 1;
      // this.result.HandoverMethod = 1;
      // this.result.Return = 1;
      //  table表格默认新增一条数据
      this.result.list = [
        {
          m: {
            Manifestdtl_ID: '',
            Manifest_ID: '',
            Goods_Code: '',
            Goods_Name: '',
            Goods_Package: '',
            Billing_Method: '',
            Goods_Piece: '',
            Goods_Weight: '',
            Goods_Volume: '',
            Freight_Unitprice: 0,
            Freight_Totalprice: '',
            Insurance_Amount: '',
            Premium_Ratio: '',
            Insurance_Charge: '',
            Manifestdtl_Comment: ''
          },
          b: {
            Billing_method_id: 1,
            Billing_method_name: ''
          }
        }
      ]
      this.result.yf = ''
      this.result.sh = ''
      this.result.th = ''
      this.result.zx = ''
      this.result.bj = ''
      this.result.bz = ''
      this.result.cz = ''
      this.result.other = ''
      this.result.yfjc = ''

      this.result.Operate_Org_ID = this.DefaultCompany
      this.result.Operate_User_ID = this.ywy[0].adminCode
      this.result.Operate_Date = this.time
      this.Manifest_ID = ''
      // this.payme_value = "" ;
    },
    editEave() { // 保存
      if (this.result.tuoyuntime == '' || this.result.tuoyuntime == undefined || this.result.Arrival_Org_ID == '' || this.result.Arrival_Org_ID == undefined || this.result.Consigner_Phone == '' || this.result.Consigner_Phone == undefined || this.result.Consignee_Phone == '' || this.result.Consignee_Phone == undefined || this.result.HandoverMethod == '' || this.result.HandoverMethod == undefined || this.result.payme_value == '' || this.result.payme_value == undefined || this.result.Consigner_Contact == '' || this.result.Consigner_Contact == undefined) {
        this.$message.error('当前有未填的必选项,请填写完成后再保存!')
      } else {
        this.disabledInput = true
        this.postMessage() // 提交数据
      }
    },
    editUpdate() { // 修改
      if(this.result.transportState_value == 50){
        this.disabledInput = false;
        this.isDelete = false;
        this.isShow = true;
        let bb = Number(this.result.payme_value)
        switch (bb) {
          case 1:
            this.disabledInput1 = false;
            break;
          case 2:
            this.disabledInput2 = false;
            break;
          case 3:
            this.disabledInput3 = false;
            break;
          case 4:
            this.disabledInput4 = false;
            break;
          case 5:
            this.disabledInput5 = false;
            break;
          case 6:
            this.disabledInput6 = false;
            break;
          case 7:
            this.disabledInput7 = false;
            break;
          case 8:
            this.disabledInput8 = false;
            break;
          default:
            break;
        }
      }else{
        this.$message.error("只有运单状态为已揽收的的运单才可以修改!");
      }
      
    },
    deleteMsg() { // 删除
      const arr = []
      arr.push(this.urlMessage.manifest_id)
      const _this = this
      axios.post(url.apiUrl() + '/api/Manifest/DeleteManifest', arr)
        .then(function(val) {
          if (val.data.error == '') {
            _this.$message({
              message: '删除成功!',
              type: 'success'
            })
            _this.$router.push({ path: '/operationFlow/acceptancebilling' })
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error('获取数据失败,请稍后再试11!')
        })
    },
    editDelete() { // 删除
      this.$confirm('是否删除当前运单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(this.result.transportState_value == 50){
          this.deleteMsg();
          let view = this.$route;
          this.$store.dispatch('delVisitedViews', view).then((views) => {
            
            const latestView = views.slice(-1)[0]
            if (latestView) {
              this.$router.push(latestView)
            } else {
              this.$router.push('/')
            }
          })
          
        }else{
          this.$message.error("只有运单状态为已揽收的运单可删除!");
        }
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editTableInsert(row, column) {
      const list = {
        m: {
          Manifestdtl_ID: '',
          Manifest_ID: '',
          Goods_Code: '',
          Goods_Name: '',
          Goods_Package: '',
          Billing_Method: '',
          Goods_Piece: '',
          Goods_Weight: '',
          Goods_Volume: '',
          Freight_Unitprice: 0,
          Freight_Totalprice: '',
          Insurance_Amount: '',
          Premium_Ratio: '',
          Insurance_Charge: '',
          Manifestdtl_Comment: ''
        },
        b: {
          Billing_method_id: 1,
          Billing_method_name: ''
        }
      }
      if (column.toElement.textContent == '+') {
        if(this.disabledInput == true){

        }else{
          this.result.list.push(list)
        }
        
      }
    },
    editTableDelete(i, val) { // 删除列表数据
      if (this.result.list.length > 1) {
        this.result.list.splice(i, 1)
        this.isDeleteMx.push(val.row.m.Manifestdtl_ID)
      } else {
        this.$message({
          type: 'info',
          message: '明细数据不能为空'
        })
      }
    },
    fetchData() {
      const id = this.$route.query
      this.Manifest_ID = id.manifest_id
      this.urlMessage = id
      if (id.manifest_id) {
        // 请求数据
        //this.isEdit = true
        this.editId = true
        this.disabledInput = true
        this.addShow = true
        this.GetMessage() // 获取地址栏参数并赋值
        this.isUpdate = true // 是更改运单
        // this.isShow = false;
      } else {
        this.editId = false
        // 新增数据
        this.disabledInput = false

        this.addShow = false
        this.isUpdate = false // 是添加运单
        this.isShow = true
        this.getFz() // 获取发站信息
        setTimeout(() => {
          this.editInsert()
        }, 500)
      }
    },

    GetAllManifestTransferModes() { // 获取所有的交接方式
      const _this = this
      axios.get(url.apiUrl() + '/api/Manifest/GetAllManifestTransferMode')
        .then(function(val) {
          if (val.data.error == '') {
            _this.GetAllManifestTransferMode = val.data.data
            // _this.stateOfAllManifest = val.data.data;
            // tableColumns[4].selectOptions=val.data.data;
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    GetAllManifestRecieptTypes() { // 获取所有回单类型
      const _this = this
      axios.get(url.apiUrl() + '/api/Manifest/GetAllManifestRecieptType')
        .then(function(val) {
          if (val.data.error == '') {
            _this.GetAllManifestRecieptType = val.data.data
            // _this.stateOfAllManifest = val.data.data;
            // tableColumns[4].selectOptions=val.data.data;
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    GetAllManifestTransportationType() { // 获取所有的运输方式
      const _this = this
      axios.get(url.apiUrl() + '/api/Manifest/GetAllManifestTransportationTypes')
        .then(function(val) {
          if (val.data.error == '') {
            _this.transport_options = val.data.data
            // _this.stateOfAllManifest = val.data.data;
            // tableColumns[4].selectOptions=val.data.data;
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    GetAllManifest_State() { // 所有运单状态
      const _this = this
      axios.get(url.apiUrl() + '/api/Manifest/GetAllManifest_State')
        .then(function(val) {
          if (val.data.error == '') {
            _this.transportState = val.data.data
            console.log("运单状态",val.data.data)
            // _this.stateOfAllManifest = val.data.data;
            // tableColumns[4].selectOptions=val.data.data;
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    GetAllManifestdtlBillingMethods() { // 获取所以计费方式
      const _this = this
      axios.get(url.apiUrl() + '/api/Manifest/GetAllManifestdtlBillingMethod')
        .then(function(val) {
          if (val.data.error == '') {
            _this.GetAllManifestdtlBillingMethod = val.data.data
            // _this.stateOfAllManifest = val.data.data;
            // tableColumns[4].selectOptions=val.data.data;
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    GetAllManifestPaymentMode() { // 获取所以付款方式
      const _this = this
      axios.get(url.apiUrl() + '/api/Manifest/GetAllManifestPaymentMode')
        .then(function(val) {
          if (val.data.error == '') {
            _this.paymeMode = val.data.data
            // _this.stateOfAllManifest = val.data.data;
            // tableColumns[4].selectOptions=val.data.data;
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    init() { // 根据id获取数据
      const _this = this
      if (this.Manifest_ID) {
        axios.get(url.apiUrl() + '/api/Manifest/GetManifestdtlByID?manifest_id=' + this.Manifest_ID)
          .then(function(val) {
            if (val.data.error == '') {
              _this.result.list = val.data.data
              // tableColumns[4].selectOptions=val.data.data;
            } else {
              _this.$message.error(val.data.error)
            }
          })
          .catch(function(data) {
            _this.$message.error(data.data.error)
          })
      } else {

      }
    },
    postMessage() { //  提交运输委托单到后台
      let date = new Date(), o = {
          'y': date.getFullYear(), // 年份
          'M': date.getMonth() + 1, // 月份
          'd': date.getDate(), // 日
          'h': date.getHours(), // 小时
          'm': date.getMinutes(), // 分
          's': date.getSeconds(), // 秒
          'q': Math.floor((date.getMonth() + 3) / 3), // 季度
          'S': date.getMilliseconds() // 毫秒
        }, time = o.y + '-' + o.M + '-' + o.d + ' ' + o.h + ':' + o.m + ':' + o.s

        //   对明细的接口做处理

      let manifestdtl = '', mx = this.result.list.map(ele => { //  mx就是返回给后台的数据
        console.log(ele)
        const m = ele.m
        const b = ele.b
        m.Billing_Method = b.Billing_method_id
        const obj = {}
        for (var i in m) {
          obj[i] = m[i]
        }
        return obj
      })
      console.log("mx",mx)
      let _this = this,
        data1 = {
          manifest: {
            Manifest_ID: this.Manifest_ID,
            Manifest_Code: this.result.Manifest_Code,
            Shipper_Code: this.result.tuoyunshang,
            Shipping_Date: this.result.tuoyuntime,
            Departure_City: this.result.tuoyunfazhan,
            Departure_Org_ID: this.DefaultCompany,
            Manifest_State_ID: this.result.transportState_value,
            Arrival_City: this.result.tuoyundaozhan,
            Arrival_Org_ID: this.result.Arrival_Org_ID,
            Transportation_Type: this.result.TypeOfShipping,
            Consigner_Unit: this.result.Consigner_Unit,
            Consigner_Contact: this.result.Consigner_Contact,
            Consigner_Phone: this.result.Consigner_Phone,
            Consigner_Address: this.result.Consigner_Address,
            Consignee_Unit: this.result.Consignee_Unit,
            Consignee_Contact: this.result.Consignee_Contact,
            Consignee_Phone: this.result.Consignee_Phone,
            Consignee_Address: this.result.Consignee_Address,
            Freight_Charge: this.result.yf,
            Delivery_Charge: this.result.sh,
            Pickup_Charge: this.result.th,
            Handling_Charge: this.result.zx,
            Insurance_Amount: this.result.bx,
            Insurance_Charge: this.result.bj,
            Packing_Charge: this.result.bz,
            Storage_Charge: this.result.cc,
            Other_Charge: this.result.other,
            Storage_Prepayment: this.result.yfjc, // 预付进仓费
            Rebate_Commission: this.result.hk,
            Rebate_Commission_Print: 0,
            User_ID: this.result.User_ID,
            // /////////////////////////////
            Transfer_Mode: this.result.HandoverMethod,
            Reciept_Type: this.result.Return,
            Manifest_Comment: this.result.manifest_comment,
            Total_Charge: this.moneyTotal,
            Departure_Balance_Date: '',
            Departure_Balance_Person: '',
            Departure_2ndbalance_Date: '',
            Departure_2ndbalance_Person: '',
            Entryfee_Collect: '',
            Arrival_Balance_Date: '',
            Arrival_Balance_Person: '',
            Driver_Balance_Date: '',
            Driver_Balance_Person: '',
            Operate_Org_ID: '',
            Operate_User_ID: '',
            Operate_Date: '',
            Create_Time: time,
            Create_Org_ID: this.Create_Org_ID,
            Create_User_ID: this.Create_User_ID,
            Edit_User_ID: '',
            Edit_Time: time,
            Edit_Org_ID: ''
          },
          manifestdtls: mx,
          manifest_R_Manifest_Payments: [
            {
              R_Manifest_Payment_ID: '',
              Manifest_ID: '',
              Payment_Mode_ID: this.result.payme_value,
              Payment_Amount: this.moneyTotal
            }
          ],
          manifestdtlsIds: this.isDeleteMx
        }
      if (this.result.tuoyuntime == '' || this.result.tuoyuntime == undefined || this.result.Arrival_Org_ID == '' || this.result.Arrival_Org_ID == undefined || this.result.Consigner_Phone == '' || this.result.Consigner_Phone == undefined || this.result.Consignee_Phone == '' || this.result.Consignee_Phone == undefined || this.result.HandoverMethod == '' || this.result.HandoverMethod == undefined || this.result.payme_value == '' || this.result.payme_value == undefined || this.result.Consigner_Contact == '' || this.result.Consigner_Contact == undefined) {
        this.$message({
          message: '带*的为必填,请先填写才能进行保存操作!',
          type: 'warning'
        })
      } else {
        const aa = this.result.list
        this.result.list.forEach(function(value) {
          for (var i = 0; i < aa.length; i++) {
            if (aa[i].Goods_Name == '') {
              _this.$message({
                type: 'warning',
                message: '名称不能为空!'
              })
              break
            } else if (aa[i].Goods_Piece == '') {
              _this.$message({
                type: 'warning',
                message: '件数不能为空!'
              })
              break
            } else {
              _this.checkNum = true
              _this.checkName = true
            }
          }
        })
        if (_this.checkNum && _this.checkName) {
          if (this.isUpdate) {
            data1.manifest.Edit_User_ID = this.Create_User_ID;
            data1.manifest.Edit_Org_ID = this.Create_Org_ID;
            axios.post(url.apiUrl() + '/api/Manifest/UpdateManifest', data1)
              .then(function(val) {
                if (val.data.error == '') {
                  _this.$message({
                    type: 'success',
                    message: '更改成功!'
                  });
                  _this.fetchData();
                } else {
                  _this.$message.error(val.data.error)
                }
              })
              .catch(function(val) {
                _this.$message.error(val.data.error)
              })
          } else {
            axios.post(url.apiUrl() + '/api/Manifest/AddManifest', data1)
              .then(function(val) {
                if (val.data.error == '') {
                  _this.$message({
                    type: 'success',
                    message: '添加成功!'
                  });
                  _this.$router.push({ path: '/operationFlow/acceptancebilling' })
                } else {
                  _this.$message.error(val.data.error)
                }
              })
              .catch(function(val) {
                _this.$message.error(val.data.error)
              })
          }
        }
      }
    },
    cancel() { // 取消操作
      this.$router.push({ path: '/operationFlow/acceptancebilling' })
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
    // --------------------------
    ListOperation(i) { // 表格里面的运费金额
      if (this.result.list[i].b.Billing_method_id == 1) {
        this.result.list[i].m.Freight_Totalprice = (parseFloat(this.result.list[i].m.Goods_Piece) * parseFloat(this.result.list[i].m.Freight_Unitprice)).toFixed(2)
      }

      if (this.result.list[i].b.Billing_method_id == 2) {
        this.result.list[i].m.Freight_Totalprice = parseFloat(this.result.list[i].m.Goods_Weight) * parseFloat(this.result.list[i].m.Freight_Unitprice) / 1000
      }

      if (this.result.list[i].b.Billing_method_id == 3) {
        this.result.list[i].m.Freight_Totalprice = parseFloat(this.result.list[i].m.Goods_Volume) * parseFloat(this.result.list[i].m.Freight_Unitprice)
      }

      this.Settlement()
    },
    changeYF(){ // 用户手动输入运费金额
      this.Settlement();
    },
    CalculationFreight() { // 运费
      let yunfei = 0
      this.result.list.forEach(function(i, k) {
        yunfei = parseFloat(yunfei) + parseFloat(i.m.Freight_Totalprice);
      })
      this.result.yf = yunfei
      this.moneyTotal = yunfei
    },
    totalMoney(val){ // 修改付款方式input
      //this.moneyTotal = val;
    },
    resetDisabled(){
      this.disabledInput1 = true;
      this.disabledInput2 = true;
      this.disabledInput3 = true;
      this.disabledInput4 = true;
      this.disabledInput5 = true;
      this.disabledInput6 = true;
      this.disabledInput7 = true;
      this.disabledInput8 = true;
    },
    Settlement() {
      this.CalculationFreight()
      this.moneyTotal = parseFloat(this.result.yf ? this.result.yf : 0) +
      parseFloat(this.result.sh ? this.result.sh : 0) +
      parseFloat(this.result.th ? this.result.th : 0) +
      parseFloat(this.result.zx ? this.result.zx : 0) +
      parseFloat(this.result.bj ? this.result.bj : 0) +
      parseFloat(this.result.bz ? this.result.bz : 0) +
      parseFloat(this.result.cz ? this.result.cz : 0) +
      parseFloat(this.result.other ? this.result.other : 0) +
      parseFloat(this.result.yfjc ? this.result.yfjc : 0)

      if (this.result.payme_value == 1) {
        this.result.moneyxf = this.moneyTotal
        this.result.moneydf = ''
        this.result.moneyqf = ''
        this.result.moneyhdf = ''
        this.result.moneyfhyj = ''
        this.result.moneyshyj = ''
        this.result.moneyhddk = ''
        this.result.moneydkk = '';
        this.resetDisabled();
        this.disabledInput1 = false;
      }
      if (this.result.payme_value == 2) {
        this.result.moneydf = this.moneyTotal
        this.result.moneyxf = ''
        this.result.moneyqf = ''
        this.result.moneyhdf = ''
        this.result.moneyfhyj = ''
        this.result.moneyshyj = ''
        this.result.moneyhddk = ''
        this.result.moneydkk = ''
        this.resetDisabled();
        this.disabledInput2 = false;
      }
      if (this.result.payme_value == 3) {
        this.result.moneyqf = this.moneyTotal
        this.result.moneyxf = ''
        this.result.moneydf = ''
        this.result.moneyhdf = ''
        this.result.moneyfhyj = ''
        this.result.moneyshyj = ''
        this.result.moneyhddk = ''
        this.result.moneydkk = ''
        this.resetDisabled();
        this.disabledInput3 = false;
      }
      if (this.result.payme_value == 4) {
        this.result.moneyhdf = this.moneyTotal
        this.result.moneyxf = ''
        this.result.moneydf = ''
        this.result.moneyqf = ''
        this.result.moneyfhyj = ''
        this.result.moneyshyj = ''
        this.result.moneyhddk = ''
        this.result.moneydkk = ''
        this.resetDisabled();
        this.disabledInput4 = false;
      }
      if (this.result.payme_value == 5) {
        this.result.moneyfhyj = this.moneyTotal
        this.result.moneyxf = ''
        this.result.moneydf = ''
        this.result.moneyqf = ''
        this.result.moneyhdf = ''
        this.result.moneyshyj = ''
        this.result.moneyhddk = ''
        this.result.moneydkk = ''
        this.resetDisabled();
        this.disabledInput5 = false;
      }
      if (this.result.payme_value == 6) {
        this.result.moneyshyj = this.moneyTotal
        this.result.moneyxf = ''
        this.result.moneydf = ''
        this.result.moneyqf = ''
        this.result.moneyhdf = ''
        this.result.moneyfhyj = ''
        this.result.moneyhddk = ''
        this.result.moneydkk = ''
        this.resetDisabled();
        this.disabledInput6 = false;
      }
      if (this.result.payme_value == 7) {
        this.result.moneyhddk = this.moneyTotal
        this.result.moneyxf = ''
        this.result.moneydf = ''
        this.result.moneyqf = ''
        this.result.moneyhdf = ''
        this.result.moneyfhyj = ''
        this.result.moneyshyj = ''
        this.result.moneydkk = ''
        this.resetDisabled();
        this.disabledInput7 = false;
      }
      if (this.result.payme_value == 8) {
        this.result.moneydkk = this.moneyTotal
        this.result.moneyxf = ''
        this.result.moneydf = ''
        this.result.moneyqf = ''
        this.result.moneyhdf = ''
        this.result.moneyfhyj = ''
        this.result.moneyshyj = ''
        this.result.moneyhddk = ''
        this.resetDisabled();
        this.disabledInput8 = false;
      }
      
    }
  }
}
</script>

<style>

.tableWraper{
    width: 100%;
    overflow-x: hidden;
}
.table{
    height: 100%;
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
.align-items-center {
    -webkit-box-align: center !important;
    -ms-flex-align: center !important;
    align-items: center !important;
}
.cell{
     white-space: nowrap!important;
 }
 .el-scrollbar__view{
     height: 100%;
 }

 
.app-container{
  overflow-y:scroll;
  height: 100%;
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

.edit-page-modular{border:1px solid #A1C4E7;margin: 8px 0px 8px 0px}
.hideIcon .el-input--medium .el-input__icon{display: none}
.edit-page-modular .Edit-Title{text-align: center;margin: 5px;padding: 0px 50px 0px 50px;color:#666;font-size: 1.5em}
.edit-page-modular hr{margin: 5px 0px 0px 0px}
.edit-page-modular .edit-Settlement-d{background-color: #304156;padding: 3px 0px 3px 10px;color:#FFF;}
.edit-goods-left{background-color: #304156;color:#FFF;text-align:center;height:80px;line-height: 25px;padding-top: 10px;font-size: 10px}
.edit-page-modular .el-input--medium .el-input__inner{
  padding: 2px 5px 2px 5px;height: 25px;line-height: 25px;border-radius: 0px;border:none;border-bottom:1px solid #ccc;
}
.edit-page-modular .el-input__inner{
  padding: 2px 5px 2px 5px;height: 25px;line-height: 25px;border-radius: 0px;border:none;border-bottom:1px solid #ccc;
}

.el-input.is-disabled .el-input__inner{
  background: transparent;
}
.aa .el-autocomplete-suggestion__wrap{
  max-width: auto;
  
}
/* .el-autocomplete-suggestion li{
  overflow: auto;
  width: 200px;
  padding: 4px;
}
.el-autocomplete-suggestion li::-webkit-scrollbar {
    display: none;
} */
.aa .el-autocomplete-suggestion li{
    overflow: auto;
  }
  .flex-auto {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
</style>
<style lang="scss" scoped>
.buttonBox{
  padding: 15px 0 0 0;
}
.app-container{
  padding: 0 15px;
}
.tableTemplate{
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  .thead{
    span{
      font-weight: bold;
    }
  }
  span{
    width: 40px;
    height: 20px;
    overflow: hidden;
    text-align: center;
    line-height: 20px;
    color: #333;
    border-right: 1px solid  #ccc;
    border-bottom: 1px solid  #ccc;
    font-size: 12px;
  }
}
$size:12px;
$lineHeight:25px;
$color: #606266;
table{
  width: 100%;
  border-top: 1px solid #ccc;
  td,th{
    width: 25%;
    height:25px;
    border-bottom: 1px solid #ccc;
  }
  th{
    span,em{
      font-weight: bold;
    }
  }
  td,th{
    padding: 0 4px;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
      
    span,em{
      display: block;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      height: 100%;
      color: $color;
    }
    span{
      width: 40px;
      border-right: 1px solid #ccc;

    }
    em{
      width: 80px;
      font-style: normal;
    }
  }
  .w4{
    width: 40px;
  }
  .w8{
    width: 80px;
  }
  tr:hover{
    background-color: #f5f7fa;
  }
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
.align-items-center {
    -webkit-box-align: center !important;
    -ms-flex-align: center !important;
    align-items: center !important;
}
.justify-content-around {
    -ms-flex-pack: distribute !important;
    justify-content: space-around !important;
}
.select-box{
    position: relative;
    max-width: 250px;
    line-height: 35px;
    width: 80%;
    font-size: $size;
    line-height: $lineHeight;
    color:$color;
    margin-top: 2px;
}
.select-title{
    position: relative;
    padding: 0 30px 0 10px;
    border: 1px solid #d8dce5;
    border-radius: 5px;
    transition-duration: 300ms;
    cursor: pointer;
    font-size: $size;
    line-height: $lineHeight;
    color:#333;
}
.select-title:after{
    content: '';
    position: absolute;
    height: 0;
    width: 0;
    border-top: 6px solid #d8dce5;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    right: 9px;
    top: 0;
    bottom: 0;
    margin: auto;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    font-size: $size;
    line-height: $lineHeight;
    color:$color;
}
.select-title-active{
    border-color: #409eff;
    font-size: $size;
    line-height: $lineHeight;
    color:$color;
}
.select-title-active:after{
    transform: rotate(-180deg);
    border-top-color: #409eff;
    font-size: $size;
    line-height: $lineHeight;
    color:$color;
}

.select-options{
    position: absolute;
    // padding:10px 0;
    top: 45px;
    border:1px solid #d8dce5;
    max-height: 240px;
    overflow: hidden;
    border-radius: 5px;
    z-index: 99;
    background: #fff;
    font-size: $size;
    line-height: $lineHeight;
    color:$color;
}
.tree{
  height: auto;
  padding-bottom: 17px;
}
.select-option-item{
    padding:0 10px;
    cursor: pointer;
    transition-duration: 300ms;
    font-size: $size;
    line-height: $lineHeight;
    color:$color;
}
.select-option-item:hover,.select-option-active{
    background: #f1f1f1;
    color: #409eff;
    font-size: $size;
    line-height: $lineHeight;
    color:$color;
}
.arrow-top{
    position: absolute;
    height: 0;
    width: 0;
    top: -7px;
    border-bottom: 7px solid #d8dce5;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 99;
    font-size: $size;
    line-height: $lineHeight;
    color:$color;
}
.arrow-top:after{
    content: '';
    position: absolute;
    display: block;
    height: 0;
    width: 0;
    border-bottom: 6px solid #fff;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    left: -6px;
    top: 1px;
    z-index: 99;
    font-size: $size;
    line-height: $lineHeight;
    color:$color;
}

.slide-down-enter-active,.slide-down-leave{
    transition: all .3s ease-in-out;
    transform-origin:0 top;
    transform: scaleY(1);
    
}
.slide-down-enter{
    transform: scaleY(0);
}
.slide-down-leave-active{
    transition: all .3s ease-in-out;
    transform-origin:0 top;
    transform: scaleY(0);
}
</style>

