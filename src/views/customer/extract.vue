<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
  <el-row>
    <el-button size="mini" @click="SaveCustomer">保存</el-button>
    <el-button size="mini">保存并打印</el-button>
    <el-button size="mini">取消</el-button>
    <el-button size="mini">自提改送货</el-button>
    <el-button size="mini" @click="UpdateCustomer">修改</el-button>
    <el-button size="mini">删除</el-button>
  </el-row>
  <hr>
  <div class="tit"> 提货单号：{{selfpickup_code}} {{departure_city}}<i class="el-icon-minus"></i><i class="el-icon-minus"></i><i class="el-icon-arrow-right"></i>{{arrival_city}}</div>
<el-row :gutter="10">
  <el-col :span="12" class="customer-extract-info">
  <el-form :inline="true" :model="formInline" class="demo-form-inline customer-extract">

    <h3>运单信息</h3>
    <el-row :gutter="8">
      <el-col :span="12" >
        <el-input v-model="formInline.manifest_code" v-bind:disabled="disabledInput">
          <template slot="prepend">运单号</template>
        </el-input>
      </el-col>
      <el-col :span="12" >
        <el-input v-model="formInline.shipping_date" v-bind:disabled="disabledInput">
          <template slot="prepend">运单日期</template>
        </el-input>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :span="8">
         <el-input v-model="formInline.consigner_unit" v-bind:disabled="disabledInput"><template slot="prepend">发货单位</template></el-input>
      </el-col>

      <el-col :span="8" >
        <el-input v-model="formInline.consigner_contact" v-bind:disabled="disabledInput"><template slot="prepend">发货人</template></el-input>
      </el-col>

      <el-col :span="8" >
        <el-input placeholder="请输入内容" v-model="formInline.consigner_phone" v-bind:disabled="disabledInput"><template slot="prepend">发货人电话</template></el-input>
      </el-col>
    </el-row>
  

    <el-row :gutter="8">
      <el-col :span="8">
         <el-input v-model="formInline.consignee_unit" v-bind:disabled="disabledInput"><template slot="prepend">收货单位</template></el-input>
      </el-col>

      <el-col :span="8" >
        <el-input v-model="formInline.consignee_contact" v-bind:disabled="disabledInput"><template slot="prepend">收货人</template></el-input>
      </el-col>

      <el-col :span="8" >
        <el-input placeholder="请输入内容" v-model="formInline.consignee_phone"  v-bind:disabled="disabledInput"><template slot="prepend">收货人电话</template></el-input>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :span="8">
         <el-input v-model="formInline.consigner_address" v-bind:disabled="disabledInput"><template slot="prepend">发货地址</template></el-input>
      </el-col>

      <el-col :span="8" >
        <el-input v-model="formInline.consignee_address" v-bind:disabled="disabledInput"><template slot="prepend">收货地址</template></el-input>
      </el-col>
      <el-col :span="8" ></el-col>
    </el-row>
  

    <el-row :gutter="8">
      <el-col :span="8">
         <el-input v-model="formInline.goods_piece" v-bind:disabled="disabledInput"><template slot="prepend">件数</template></el-input>
      </el-col>

      <el-col :span="8" >
        <el-input v-model="formInline.goods_weight" v-bind:disabled="disabledInput"><template slot="prepend">重量</template></el-input>
      </el-col>

      <el-col :span="8" >
        <el-input v-model="formInline.goods_volume" v-bind:disabled="disabledInput"><template slot="prepend">体积</template></el-input>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :span="8">
         <el-input v-model="formInline.xianfu" v-bind:disabled="disabledInput"><template slot="prepend">现付</template></el-input>
      </el-col>

      <el-col :span="8" >
        <el-input v-model="formInline.daofu" v-bind:disabled="disabledInput"><template slot="prepend">到付</template></el-input>
      </el-col>

      <el-col :span="8" >
        <el-input v-model="formInline.qianfu" v-bind:disabled="disabledInput"><template slot="prepend">欠付</template></el-input>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :span="8">
         <el-input v-model="formInline.huidanfu" v-bind:disabled="disabledInput"><template slot="prepend">回付</template></el-input>
      </el-col>

      <el-col :span="8" >
        <el-input v-model="formInline.fahuoyuejie" v-bind:disabled="disabledInput"><template slot="prepend">发货月结</template></el-input>
      </el-col>

      <el-col :span="8" >
        <el-input v-model="formInline.shouhuoyuejie" v-bind:disabled="disabledInput"><template slot="prepend">收货月结</template></el-input>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :span="8">
         <el-input v-model="formInline.huodaodaka" v-bind:disabled="disabledInput"><template slot="prepend">货到打卡</template></el-input>
      </el-col>

      <el-col :span="8" >
        <el-input v-model="formInline.huokuankou" v-bind:disabled="disabledInput"><template slot="prepend">贷款扣</template></el-input>
      </el-col>

      <el-col :span="8" >
        <el-input v-model="formInline.transfer_mode_name" v-bind:disabled="disabledInput"><template slot="prepend">交接方式</template></el-input>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :span="24">
         <el-input v-model="formInline.manifest_comment" v-bind:disabled="disabledInput"><template slot="prepend">备注</template></el-input>
      </el-col>
    </el-row>

  </el-form>
</el-col>
<!-- /////////////////////////////////////////////////////////////////////////////////////////////////// -->
<el-col :span="12" class="customer-extract-info">
  <el-form :inline="true" :model="forms" class="demo-form-inline bb customer-extract">
      <h3>自提信息：</h3>
      <el-form-item label="自提日期" required v-bind:disabled="disabledInput">
        <el-date-picker
              v-model="forms.selfpickup_date"
              @change="aa"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
      </el-form-item>
      <el-form-item label="提货单位" required v-bind:disabled="disabledInput">
        <el-input v-model="forms.selfpickup_unit" ></el-input>
      </el-form-item>
      <el-form-item label="提货人" required v-bind:disabled="disabledInput">
        <el-input v-model="forms.selfpickup_contact" ></el-input>
      </el-form-item>
      <el-form-item label="身份证号" required v-bind:disabled="disabledInput">
        <el-input v-model="forms.selfpickup_contact_idcard" ></el-input>
      </el-form-item>
      <el-form-item label="代理人" required v-bind:disabled="disabledInput"> 
        <el-input v-model="forms.selfpickup_agent" ></el-input>
      </el-form-item>
      <el-form-item label="身份证号" required v-bind:disabled="disabledInput">
        <el-input v-model="forms.selfpickup_agent_idcard" ></el-input>
      </el-form-item>
      <el-form-item label="提货说明" v-bind:disabled="disabledInput">
        <el-input v-model="forms.selfpickup_comment" ></el-input>
      </el-form-item>
      <el-row :gutter="8">
        <!-- <el-col  :span="8">
          <div class="d-flex">
            <span class="demonstration" style="width:94px;
    text-align: center;font-size: 14px;
    font-weight: normal;
    color: #999;
    line-height: 26px;">提货日期</span>
            <el-date-picker
              v-model="forms.selfpickup_date"
              @change="aa"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div> -->
          
           <!-- <el-input v-model="forms.selfpickup_date" ><template slot="prepend">提货日期</template></el-input> -->
        <!-- </el-col> -->

        <!-- <el-col :span="8" >
          <el-input v-model="forms.selfpickup_unit" ><template slot="prepend">提货单位</template></el-input>
        </el-col>
        <el-col  ></el-col> -->
      </el-row>


      <!-- <el-row :gutter="8">
        <el-col :span="8">
           <el-input v-model="forms.selfpickup_contact" ><template slot="prepend">提货人</template></el-input>
        </el-col>

        <el-col  :span="8">
          <el-input v-model="forms.selfpickup_contact_idcard" ><template slot="prepend">身份证号</template></el-input>
        </el-col>
        <el-col  ></el-col>
      </el-row> -->


      <!-- <el-row :gutter="8">
        <el-col :span="8">
           <el-input v-model="forms.selfpickup_agent" ><template slot="prepend">代理人</template></el-input>
        </el-col>

        <el-col :span="8" >
          <el-input v-model="forms.selfpickup_agent_idcard" ><template slot="prepend">身份证号</template></el-input>
        </el-col>
        <el-col  ></el-col>
      </el-row> -->


      <!-- <el-row :gutter="8">
        <el-col :span="8">
           <el-input v-model="forms.selfpickup_comment" ><template slot="prepend">提货说明</template></el-input>
        </el-col>
        <el-col :span="12" ></el-col>
      </el-row> -->
  </el-form>
 </el-col>
 </el-row>
</div>
</template>

<script>
import { parseTime } from '@/utils'
import axios from 'axios'
import url from '@/js/common.js'
import storage from '@/js/localstorage.js'
let date = new Date();
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
      disabledInput:true,
      formInline:{
        user:'',
        manifest_code:"",
        shipping_date:"",
        consigner_unit:"",
        consigner_contact:"",
        consigner_phone:"",
        consignee_unit:"",
        consignee_contact:"",
        consignee_phone:"",
        consigner_address:"",
        consignee_address:"",
        goods_piece:"",
        goods_weight:"",
        goods_volume:"",
        xianfu:"",
        daofu:"",
        qianfu:"",
        huidanfu:"",
        fahuoyuejie:"",
        shouhuoyuejie:"",
        huokuankou:"",
        transfer_mode_name:"",
        manifest_comment:"",
        selfpickup_date:"",
        selfpickup_unit:"",
        selfpickup_contact:"",
        selfpickup_contact_idcard:"",
        selfpickup_agent:"",
        selfpickup_agent_idcard:"",
        selfpickup_comment:"",
      },
      forms:{
        selfpickup_date:time,
        selfpickup_unit:'',
        selfpickup_contact:'',
        selfpickup_contact_idcard:'',
        selfpickup_agent:'',
        selfpickup_agent_idcard:'',
        selfpickup_comment:'',
      },
      order: {
        id: '',
        order_no: '',
        from: '上海',
        to: '温州'

      },
      datapage: {},
      selfpickup_code:"",
      departure_city:"",
      arrival_city:"",
      list: {},
      listLoading: false, // 列表loading
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      Create_Org_ID: '',
      Create_User_ID: '',
    }
  },
  created() {

  },
  mounted(){
    const loginInfo = JSON.parse(storage.getStorage('currentUser'))
    this.Create_Org_ID = loginInfo.orgId
    this.Create_User_ID = loginInfo.userId
    this.getMessage(); // 获取路由传递的信息
  },
  methods: {
    getMessage(){
      const message = this.$route.params.id;
      console.log("message",message)
      this.formInline.manifest_code = message.manifest_code;
      this.formInline.shipping_date = message.shipping_date;
      this.formInline.consigner_unit = message.consigner_unit;
      this.formInline.consigner_contact = message.consigner_contact;
      this.formInline.consigner_phone = message.consigner_phone;
      this.formInline.consignee_unit = message.consignee_unit;
      this.formInline.consignee_contact = message.consignee_contact;
      this.formInline.consignee_phone = message.consignee_phone;
      this.formInline.consigner_address = message.consigner_address;
      this.formInline.consignee_address = message.consignee_address;
      this.formInline.goods_piece = message.goods_piece;
      this.formInline.goods_weight = message.goods_weight;
      this.formInline.goods_volume = message.goods_volume;
      this.formInline.xianfu = message.xianfu;
      this.formInline.daofu = message.daofu;
      this.formInline.qianfu = message.qianfu;
      this.formInline.huidanfu = message.huidanfu;
      this.formInline.fahuoyuejie = message.fahuoyuejie;
      this.formInline.shouhuoyuejie = message.shouhuoyuejie;
      this.formInline.huodaodaka = message.huodaodaka;
      this.formInline.huokuankou = message.huokuankou;
      this.formInline.transfer_mode_name = message.transfer_mode_name;
      this.formInline.manifest_comment = message.manifest_comment;
      this.departure_city = message.departure_city;
      this.arrival_city = message.arrival_city;
    },
    SaveCustomer(){
      this.disabledInput = true;
      this.postMessage();
    },
    postMessage(){ // 点击保存提交数据
      const _this = this;
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
      }, time = o.y + '-' + o.M + '-' + o.d;
      const data1 = {
        selfpickup:{
          Selfpickup_Id: "",
          Selfpickup_Code: "",
          Selfpickup_Date: this.forms.selfpickup_date,
          Selfpickup_Unit: this.forms.selfpickup_unit,
          Selfpickup_Contact: this.forms.selfpickup_contact,
          Selfpickup_Contact_Idcard: this.forms.selfpickup_contact_idcard,
          Selfpickup_Agent: this.forms.selfpickup_agent,
          Selfpickup_Agent_Idcard: this.forms.selfpickup_agent_idcard,
          Selfpickup_Comment: this.forms.selfpickup_comment,
          Create_Time: time,
          Create_Org_ID: this.Create_Org_ID,
          Create_User_ID: this.Create_User_ID,
          Edit_User_ID: "",
          Edit_Time: "",
          Edit_Org_ID: ""
        },
        orgId:this.Create_Org_ID,
        manifest_id:this.$route.params.id.manifest_id
      };
      if(
        this.forms.selfpickup_date == "" || this.forms.selfpickup_date == undefined ||
        this.forms.selfpickup_unit == "" || this.forms.selfpickup_unit == undefined ||
        this.forms.selfpickup_contact == "" || this.forms.selfpickup_contact == undefined ||
        this.forms.selfpickup_contact_idcard == "" || this.forms.selfpickup_contact_idcard == undefined ||
        this.forms.selfpickup_agent == "" || this.forms.selfpickup_agent == undefined ||
        this.forms.selfpickup_agent_idcard == "" || this.forms.selfpickup_agent_idcard == undefined ||
        this.forms.selfpickup_comment == "" || this.forms.selfpickup_comment == undefined
      ){
        this.$message.error("右侧必填项不能为空!");
      }else{
        axios.post(url.apiUrl() + '/api/Selfpickup/AddSelfpickup' , data1)
        .then(function(val) {
          if (val.data.error == '') {
            console.log(val.data.data)
            if(val.data.error == "" ){
              _this.selfpickup_code = val.data.data.Selfpickup_Code;
              _this.$message({
                type:"success",
                message:"保存成功"
              });
              _this.disabledInput = true;
            }else{

            }
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
      }
      
    },
    aa(val){
      console.log("aa",val)
    },
    UpdateCustomer(){
      this.disabledInput = false;
    },
    handleSizeChange(val) {
      const arr = new Array()
      this.list.forEach((item, index) => {
        if (val > index) {
          arr.push(item)
        }
      })
      this.currentPage2 = 1
      this.datapage = arr
    },
    handleCurrentChange(val) {
      const arr = new Array()
      this.list.forEach((item, index) => {
        if (val == index + 1) {
          arr.push(item)
        }
      })
      this.datapage = arr
    },
    print() {
      this.$confirm('请先完成付款，再打印提货单，谢谢！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {

      })
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
  }
}
</script>

<style>
.customer-extract-info{border:1px solid #eee;height: 450px}
.customer-extract-info .el-input-group__append, .customer-extract-info .el-input-group__prepend{width: 60px;text-align: center;}
.customer-extract-info .el-input-group__append, .customer-extract-info .el-input-group__prepend{padding: 2px}
.customer-extract .el-form-item__label{padding-right: 3px;font-size: 12px}
.customer-extract .el-input__inner{height: 25px;line-height: 25px;width: 110px}
.customer-extract .el-row{height: 40px}
.customer-extract .el-col-8{height: 40px}
.el-date-editor{
  width: auto;
}
.bb .el-input__inner{
  width: auto;
}
</style>

<style lang="scss" scoped>
.d-flex{
     display: -webkit-box !important;
    display: -ms-flexbox !important;
    display: flex !important;
 }
</style>
