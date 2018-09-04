<template>
  <div class="app-container">
    <el-button class="page-btn-group" size="mini" @click="editInsert">新增</el-button>
    <el-button class="page-btn-group" size="mini" @click="editEave">保存</el-button>
    <el-button class="page-btn-group" size="mini">保存并打印</el-button>
    <el-button class="page-btn-group" size="mini" v-show="isEdit">取消</el-button>
    <el-button class="page-btn-group" size="mini" @click="editUpdate">修改</el-button>
    <el-button class="page-btn-group" size="mini" @click="editDelete">删除</el-button>
    <el-button class="page-btn-group" size="mini" v-show="isEdit" @click="editDelete">复制新增</el-button>
    <el-button class="page-btn-group" size="mini">行删除</el-button>
    <el-button class="page-btn-group" size="mini">运单作废</el-button>
    <el-button class="page-btn-group" size="mini">上传附件</el-button>
    <el-button class="page-btn-group" size="mini">历史优化</el-button>
    <br>
    
    <el-row class="edit-page-modular">
      <div class="Edit-Title">运输委托单</div>
      <el-col :span="4">
        <el-input placeholder="" v-bind:disabled="disabledInput" value="xxxxxxxxxxxxx" disabled>
          <label class="radio-label" slot="prepend" >运单编号: </label>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-input placeholder="请输入内容" v-bind:disabled="disabledInput" v-model="result.tuoyunshang">
        <label class="radio-label" slot="prepend" >托运商单号: </label>
        </el-input>
      </el-col>
      <el-col :span="8">
        <div class="Edit-Title"><hr><hr></div>
      </el-col>
      <el-col :span="4" class="hideIcon">
      <label class="radio-label">托运时间: </label>
      <el-date-picker style="width:100px;height:25px" v-bind:disabled="disabledInput" v-model="result.tuoyuntime" tyle="date"></el-date-picker>
      </el-col>
      <el-col :span="4">
        <label class="radio-label" >运单状态: </label>
        <el-select style="width:100px;height:25px" v-model="transportState_value" placeholder="请选择" v-bind:disabled="disabledInput">
          <el-option v-for="item in transportState" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        </el-col>
    </el-row>

    <el-row class="edit-page-modular">
      <el-col :span="4">
        <el-input class="input-group" v-bind:disabled="disabledInput" v-model="result.tuoyunfazhan"><label class="radio-label" slot="prepend" >发　　站: </label></el-input>
      </el-col>
      <el-col :span="4">
       
        <el-input class="input-group" v-bind:disabled="disabledInput" v-model="result.tuoyundaozhan"> <label class="radio-label" slot="prepend" >到　　站: </label></el-input>
      </el-col>
      <el-col :span="4">
        
        <el-input class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >到站网点: </label></el-input>
      </el-col>
      <el-col :span="4">
        <label class="radio-label" >运输方式: </label>
        <el-select v-model="transport_value" style="width:100px;height:25px" placeholder="请选择" v-bind:disabled="disabledInput">
          <el-option v-for="item in transport_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
    </el-row>


    <el-row class="edit-page-modular">
      <el-col :span="1" class="edit-goods-left">
        <div><i class="el-icon-location"></i><br><span>发货方</span></div>
      </el-col>
      <el-col :span="11">
        <el-row>
          <el-col :span="12">
            <el-input class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >发货单位: </label></el-input>
          </el-col>
          <el-col :span="12">
            
            <el-input class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" > 发货人: </label></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            
            <el-input class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >发货电话: </label></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            
            <el-input class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >发货地址: </label></el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="1" class="edit-goods-left">
        <div><i class="el-icon-location"></i><br><span>收货方</span></div>
      </el-col>
      <el-col :span="11">
        <el-row>
          <el-col :span="12">
            
            <el-input class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >收货单位: </label></el-input>
          </el-col>
          <el-col :span="12">
            
            <el-input class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" > 收货人: </label></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            
            <el-input class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >收货电话: </label></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            
            <el-input class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >收货地址: </label></el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>


    <el-table class="edit-page-modular" :data="result.list" v-loading="listLoading" element-loading-text="拼命加载中" sortable  border fit highlight-current-row @header-click="editTableInsert">
      <el-table-column align="center" width="50" label='+' >
        <template slot-scope="scope">
          <i class="el-icon-remove" @click="editTableDelete(scope.$index)"></i>
        </template>
      </el-table-column>
      <el-table-column align="center" width="50" label='序号' >
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="货物编码" width="100" >
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput" v-model="scope.row.numbers"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center" width="60">
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput" v-model="scope.row.tuoyun_number"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="包装" align="center" width="100">
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput" v-model="scope.row.startdate"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="计费方式" width="100">
        <template slot-scope="scope">
          <el-select@change="ListOperation(scope.$index)" v-model.lazy="scope.row.state" style="width:100px;height:25px" placeholder="请选择" v-bind:disabled="disabledInput">
            <el-option label="元/吨" value="2"></el-option>
            <el-option label="元/件" value="1"></el-option>
            <el-option label="元/方" value="3"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="件数" width="50" align="center">
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput"@change="ListOperation(scope.$index)" v-model.lazy="scope.row.jianshu"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="重量(公斤)" width="100" align="center">
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput"@change="ListOperation(scope.$index)" v-model.lazy="scope.row.zhongliang"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="体积(立方)" width="100" align="center">
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput"@change="ListOperation(scope.$index)" v-model.lazy="scope.row.tiji"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="运费单价" width="80" align="center">
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput"@change="ListOperation(scope.$index)" v-model.lazy="scope.row.danjia"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="运费金额" width="80" align="center">
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput" v-model.lazy="scope.row.listyf"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="保险金额" width="80" align="center">
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput" v-model="scope.row.consignor"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="保费比" width="60" align="center">
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput" v-model="scope.row.pageviews"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="保险费" width="60" align="center">
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput" v-model="scope.row.consignor_phone"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="55" align="center">
        <template slot-scope="scope">
          <el-input class="input-group" v-bind:disabled="disabledInput" v-model="scope.row.consignor_phone"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <div class="Settlement-Waybill">
      <el-row>

        <el-col class="edit-page-modular" :span="12">
          <div class="edit-Settlement-d">合计:{{moneyTotal}}</div>
          <el-row>
            <el-col :span="6">
             
              <el-input class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model.lazy="result.yf"> <label class="radio-label" slot="prepend" >运　　费: </label></el-input>
            </el-col>
            <el-col :span="6">
              
              <el-input class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model.lazy="result.sh"><label class="radio-label" slot="prepend" >送 货 费: </label></el-input>
            </el-col>
            <el-col :span="6">
              
              <el-input class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model.lazy="result.th"><label class="radio-label" slot="prepend" >提 货 费: </label></el-input>
            </el-col>
            <el-col :span="6">
              
              <el-input class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model.lazy="result.zx"><label class="radio-label" slot="prepend" >装 卸 费: </label></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              
              <el-input class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model.lazy="result.bx"><label class="radio-label" slot="prepend" >保险金额: </label></el-input>
            </el-col>
            <el-col :span="6">
              
              <el-input class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model.lazy="result.bj"><label class="radio-label" slot="prepend" >保 价 费: </label></el-input>
            </el-col>
            <el-col :span="6">
              
              <el-input class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model.lazy="result.bz"><label class="radio-label" slot="prepend" >包 装 费: </label></el-input>
            </el-col>
            <el-col :span="6">
              
              <el-input class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model.lazy="result.cc"><label class="radio-label" slot="prepend" >仓 储 费: </label></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              
              <el-input class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model.lazy="result.other"><label class="radio-label" slot="prepend" >其 他 费: </label></el-input>
            </el-col>
            <el-col :span="6">
              
              <el-input class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model.lazy="result.hk"><label class="radio-label" slot="prepend" >回 扣 费: </label></el-input>
            </el-col>
            <el-col :span="12">
              
              <el-input class="input-group" v-bind:disabled="disabledInput" @change="Settlement" v-model.lazy="result.yfjc"><label class="radio-label" slot="prepend" >预付进仓费: </label></el-input>
            </el-col>
          </el-row>
        </el-col>
        <!-- ———————————————————————————————————————— -->
        <el-col class="edit-page-modular" :span="12">
        <div class="edit-Settlement-d">付款方式</div>
          <el-row>
            <el-col :span="8">
              <label class="radio-label" >付款方式: </label>
              <el-select style="width:100px;height:25px" @change="Settlement" v-model.lazy="result.payme_value" placeholder="请选择" v-bind:disabled="disabledInput">
                <el-option v-for="item in paymeMode" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <!-- <el-input class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >付款方式: </label></el-input> -->
            </el-col>
            <el-col :span="8">
              
              <el-input class="input-group" v-bind:disabled="disabledInput" v-model="result.moneyxf"><label class="radio-label" slot="prepend" >现　　付: </label></el-input>
            </el-col>
            <el-col :span="8">
              
              <el-input class="input-group" v-bind:disabled="disabledInput" v-model="result.moneydf"><label class="radio-label" slot="prepend" >到　　付: </label></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              
              <el-input class="input-group" v-bind:disabled="disabledInput" v-model="result.moneyqf"><label class="radio-label" slot="prepend" >欠　　付: </label></el-input>
            </el-col>
            <el-col :span="8">
              
              <el-input class="input-group" v-bind:disabled="disabledInput" v-model="result.moneyhdf"><label class="radio-label" slot="prepend" >回 单 付: </label></el-input>
            </el-col>
            <el-col :span="8">
              
              <el-input class="input-group" v-bind:disabled="disabledInput" v-model="result.moneyfhyj"><label class="radio-label" slot="prepend" >发货月结: </label></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              
              <el-input class="input-group" v-bind:disabled="disabledInput" v-model="result.moneyshyj"><label class="radio-label" slot="prepend" >收货月结: </label></el-input>
            </el-col>
            <el-col :span="8">
              
              <el-input class="input-group" v-bind:disabled="disabledInput" v-model="result.moneyhddk"><label class="radio-label" slot="prepend" >货到打卡: </label></el-input>
            </el-col>
            <el-col :span="8">
              
              <el-input class="input-group" v-bind:disabled="disabledInput" v-model="result.moneydkk"><label class="radio-label" slot="prepend" >贷 款 扣: </label></el-input>
            </el-col>
          </el-row>
        </el-col>
        
      </el-row>
    </div>
    <!-- ———————————————————————————————————————— -->
    <el-row class="edit-page-modular">
      <el-col :span="4">
        
        <el-input class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >业务员: </label></el-input>
      </el-col>
      <el-col :span="4">
        <label class="radio-label" >交接方式: </label>
        <el-select v-model="transport_value" style="width:100px;height:25px" placeholder="请选择" v-bind:disabled="disabledInput">
          <el-option v-for="item in transport_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <label class="radio-label" >回　　单: </label>
        <el-select v-model="transport_value" style="width:100px;height:25px" placeholder="请选择" v-bind:disabled="disabledInput">
          <el-option v-for="item in transport_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        
        <el-input class="input-group" v-bind:disabled="disabledInput"><label class="radio-label" slot="prepend" >备　　注: </label></el-input>
      </el-col>
    </el-row>
  </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'

export default {
  name: 'lists',
  data() {
    return {
      moneyTotal:0,//合计
      result:{
        tuoyunshang:'666',
        tuoyuntime:'2018-10-01',
        tuoyunfazhan:'北京',
        tuoyundaozhan:'上海',
        tuoyundaozhanwangdian:'',
        // ----------
        payme_value:'1',//付款方式
        yf:0,
        sh:0,
        th:0,
        zx:0,
        bx:0,
        bj:0,
        bz:0,
        cz:0,
        other:0,
        hk:0,
        yfjc:0,
        moneyxf:0,
        moneydf:0,
        moneyqf:0,
        moneyhdf:0,
        moneyfhyj:0,
        moneyshyj:0,
        moneyhddk:0,
        moneydkk:0,
        // ----------
        list: [
        {
            numbers: '123456789',
            tuoyun_number: 'Qc111111111',
            startdate: 'Qc111111111',
            state: '2',
            danjia: '222',
            jianshu: '333',
            zhongliang: '444',
            tiji: '555',
            listyf: '666',
            company: '777',
            consignor: '888',
            consignor_phone: '999',
        },{
            numbers: '123456789',
            tuoyun_number: 'Qc111111111',
            startdate: 'Qc111111111',
            state: '2',
            danjia: '222',
            jianshu: '333',
            zhongliang: '444',
            tiji: '555',
            listyf: '666',
            company: '777',
            consignor: '888',
            consignor_phone: '999',
        }, 
        ],
      },
      paymeMode:[{
          value: '0',
          label: '免费'
        },{
          value: '1',
          label: '到付'
        }, {
          value: '2',
          label: '现付'
        }],

      transportState_value:'1',
      transportState:[{
          value: '1',
          label: '已揽收'
        }, {
          value: '2',
          label: '三方发车'
        }],
      transport_value:'',
      transport_options: [{
        value: '公路',
        label: '公路'
      }, {
        value: '铁路',
        label: '铁路'
      }],
      
      disabledInput:false,
      listLoading: false,
      downloadLoading: false,
      filename: '',
      autoWidth: true,

      editId:false,
      isEdit:false,//编辑显示 新增隐藏
    }
  },
  created() {
    this.fetchData()
  },
  watch:{
    result(){
       console.log(this.result.yf);
    }
  },
  methods: {
    editInsert(){//新增
      if(this.editId){

      }else{
        //清空数据
        this.result = {};
      }
    },
    editEave() {//保存
        this.disabledInput = true;
    },
    editUpdate(){//修改
        
        this.disabledInput = false;
    },
    editDelete(){//删除
      this.$confirm('是否删除当前运单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    editTableInsert(row, column){
      let list = {
            numbers: '',
            tuoyun_number: '',
            startdate: '',
            state: '2',
            danjia: '0',
            jianshu: '0',
            zhongliang: '0',
            tiji: '0',
            listyf: '0',
            company: '',
            consignor: '',
            consignor_phone: '',
        };
      if(column.toElement.textContent == '+'){
        this.result.list.push(list);
      }
    },
    editTableDelete(i){//删除列表数据
      if(this.result.list.length > 1){
        this.result.list.splice(i, 1);  
      }else{
        this.$message({
          type: 'info',
          message: '明细数据不能为空'
        }); 
      }
      
    },
    fetchData() {
      let id = this.$route.params.id;
      if(id){
        //请求数据
        this.isEdit = true;
        this.editId = true;
        
      }else{
        this.editId = false;
        //新增数据
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
    },
    //--------------------------
    ListOperation(i){
      if(this.result.list[i].state == 1){
        this.result.list[i].listyf = parseInt(this.result.list[i].jianshu) * parseInt(this.result.list[i].danjia);
      }

      if(this.result.list[i].state == 2){
        this.result.list[i].listyf = parseInt(this.result.list[i].zhongliang) * parseInt(this.result.list[i].danjia) / 1000;
      }

      if(this.result.list[i].state == 3){
        this.result.list[i].listyf = parseInt(this.result.list[i].tiji) * parseInt(this.result.list[i].danjia);
      }

      this.CalculationFreight();
      
    },
    CalculationFreight(){
      let yunfei = 0;
      this.result.list.forEach(function(i,k){
        yunfei += i.listyf;
      });
      this.result.yf = yunfei;
    },
    Settlement(){
      this.moneyTotal = parseInt(this.result.yf) + parseInt(this.result.sh) + parseInt(this.result.th) + parseInt(this.result.zx) + parseInt(this.result.bj) + parseInt(this.result.bz) + parseInt(this.result.cz) + parseInt(this.result.other) + parseInt(this.result.yfjc);
      if(this.result.payme_value == 1){
        this.result.moneyxf=this.moneyTotal;
        this.result.moneydf=0;
        this.result.moneyqf=0;
        this.result.moneyhdf=0;
        this.result.moneyfhyj=0;
        this.result.moneyshyj=0;
        this.result.moneyhddk=0;
        this.result.moneydkk=0;
      }
      if(this.result.payme_value == 2){
        this.result.moneydf=this.moneyTotal;
        this.result.moneyxf=0;
        this.result.moneyqf=0;
        this.result.moneyhdf=0;
        this.result.moneyfhyj=0;
        this.result.moneyshyj=0;
        this.result.moneyhddk=0;
        this.result.moneydkk=0;
      }
      if(this.result.payme_value == 3){
        this.result.moneyqf=this.moneyTotal;
        this.result.moneyxf=0;
        this.result.moneydf=0;
        this.result.moneyhdf=0;
        this.result.moneyfhyj=0;
        this.result.moneyshyj=0;
        this.result.moneyhddk=0;
        this.result.moneydkk=0;
      }
      if(this.result.payme_value == 4){
        this.result.moneyhdf=this.moneyTotal;
        this.result.moneyxf=0;
        this.result.moneydf=0;
        this.result.moneyqf=0;
        this.result.moneyfhyj=0;
        this.result.moneyshyj=0;
        this.result.moneyhddk=0;
        this.result.moneydkk=0;
      }
      if(this.result.payme_value == 5){
        this.result.moneyfhyj=this.moneyTotal;
        this.result.moneyxf=0;
        this.result.moneydf=0;
        this.result.moneyqf=0;
        this.result.moneyhdf=0;
        this.result.moneyshyj=0;
        this.result.moneyhddk=0;
        this.result.moneydkk=0;
      }
      if(this.result.payme_value == 6){
        this.result.moneyshyj=this.moneyTotal;
        this.result.moneyxf=0;
        this.result.moneydf=0;
        this.result.moneyqf=0;
        this.result.moneyhdf=0;
        this.result.moneyfhyj=0;
        this.result.moneyhddk=0;
        this.result.moneydkk=0;
      }
      if(this.result.payme_value == 7){
        this.result.moneyhddk=this.moneyTotal;
        this.result.moneyxf=0;
        this.result.moneydf=0;
        this.result.moneyqf=0;
        this.result.moneyhdf=0;
        this.result.moneyfhyj=0;
        this.result.moneyshyj=0;
        this.result.moneydkk=0;
      }
      if(this.result.payme_value == 8){
        this.result.moneydkk=this.moneyTotal;
        this.result.moneyxf=0;
        this.result.moneydf=0;
        this.result.moneyqf=0;
        this.result.moneyhdf=0;
        this.result.moneyfhyj=0;
        this.result.moneyshyj=0;
        this.result.moneyhddk=0;
      }
      this.CalculationFreight();
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
.cell{
     white-space: nowrap!important;
 }
 .el-scrollbar__view{
     height: 100%;
 }

 
.app-container{
  max-height: 550px;overflow-y:scroll;
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
</style>

