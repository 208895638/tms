<template>

<div class="box">
        <el-row class="buttonBox clearfix">
            <div class="clearfix">
                <el-button type="primary" @click="customerChange" size="small" icon="el-icon-circle-plus-outline">新增</el-button>
                <el-button type="primary" @click="deleteCompany" size="small" icon="el-icon-delete">删除</el-button>
                <el-button type="primary" size="small">批量导入</el-button>
            </div>
        </el-row>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="发货客户" name="first" width="100%">
                <el-form :inline="true"  width="100%">
                    <el-form-item label="客户名称" >
                        <el-select v-model="customerNames" filterable placeholder="请输入客户名称" @change="selectCustomer" class="r">
                            <el-option
                                v-for="item in customerList"
                                :key="item.value"
                                :label="item.customer_name"
                                :value="item.customer_name">
                            </el-option>
                        </el-select> 
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchResult" size="small" icon="el-icon-search">查询</el-button>
                        <el-button type="primary" size="small">临时客户</el-button>
                    </el-form-item>
                </el-form>
                <div class="searchCondition"></div>
                    <el-scrollbar class="tableWraper"  wrapClass="scrollbar-wrapper">
                        <el-table :data="customers" border style="width:100%;height:520px;overflow-y:auto" 
                            :summary-method="getSummaries" 
                            @select = "checkbox"
                            @select-all = "checkboxAll"
                            @cell-dblclick="doubleEvents"
                            @selection-change="handleSelectionChange" show-summary>
                            <el-table-column type="selection" width="55">
                            </el-table-column>
                            <el-table-column type="index" width="50" label="序号">
                            </el-table-column>
                            <el-table-column label="所属公司" prop="Org_name" >
                            </el-table-column>
                            <el-table-column label="客户类别" prop="customer_category_name">
                            </el-table-column>
                            <el-table-column label="是否月结" prop="monthly_balance">
                            </el-table-column>
                            <el-table-column label="客户代码" prop="customer_code">
                            </el-table-column>
                            <el-table-column label="客户名称" prop="customer_name">
                            </el-table-column>
                        </el-table>
                    </el-scrollbar>
                
            </el-tab-pane>
            <el-tab-pane label="收货客户" name="second"  width="100%">
                <el-form :inline="true"  width="100%">
                    <el-form-item label="客户名称" >
                        <el-select v-model="customerNames1" filterable placeholder="请输入客户名称" @change="selectCustomer">
                            <el-option
                                v-for="item in customerList1"
                                :key="item.value"
                                :label="item.customer_name"
                                :value="item.customer_name">
                            </el-option>
                        </el-select> 
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="searchResult1" icon="el-icon-search">查询</el-button>
                        <el-button type="primary" size="small">临时客户</el-button>
                    </el-form-item>
                </el-form>
                <el-scrollbar class="tableWraper"  wrapClass="scrollbar-wrapper">
                    <el-table :data="customers1" border style="width:100%;height:380px" show-summary>
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column type="index" width="50" label="序号">
                        </el-table-column>
                        <el-table-column label="所属公司" prop="Org_name">
                        </el-table-column>
                        <el-table-column label="客户类别" prop="customer_category_name">
                        </el-table-column>
                        <el-table-column label="是否月结" prop="monthly_balance">
                        </el-table-column>
                        <el-table-column label="客户代码" prop="customer_code">
                        </el-table-column>
                        <el-table-column label="客户名称" prop="customer_name">
                        </el-table-column>
                    </el-table>
                </el-scrollbar>
            </el-tab-pane>
        </el-tabs>
        <div class="clearfix">
                <el-pagination
                    @size-change="sizeChanged" 
                    @current-change="pageChanged" 
                    :current-page="pagination.page" 
                    :page-sizes="[10, 25, 50, 100]" 
                    :page-size="pagination.rows" 
                    layout="total, sizes, prev, pager, next, jumper" 
                    :total="pagination.total"
                    class="l">
                </el-pagination>
            </div>
        <el-dialog :visible.sync="dialogFormVisible">
            <div class="clearfix buttons">
                <el-button type="primary" @click="updateInfo1" v-if="isShow"  size="mini">修改</el-button>
                <el-button type="danger" @click="addCustomer('customerInfo')" size="mini" v-if="saveShow1">保存</el-button>
                <el-button type="primary" @click="deleteCompany1" v-if="isShow"  size="mini">删除</el-button>
            </div>
            <div class="clearfix materielInfo">
                <el-form :inline="true" class="demo-form-inline" label-width="90px" :disabled = "isDisabled1">
                        <el-form-item label="客户类别">
                            <el-select v-model="customerInfo.customerid" placeholder="请选择客户">
                                <el-option v-for="(item,index) in categoryTypes" 
                                :key="index" 
                                :label="item.customer_category_name" 
                                :value="item.customer_category_id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label-width="">
                            <el-checkbox v-model="customerInfo.balance" label="是否月结"></el-checkbox>
                        </el-form-item>
                        <el-form-item label="客户类型">
                        <el-select v-model="customerInfo.customertypeid" placeholder="请选择客户">
                                <el-option v-for="(item,index) in customerTypes" 
                                :key="index" 
                                :label="item.customer_type_name" 
                                :value="item.customer_type_id"></el-option>
                            </el-select>
                        </el-form-item>
                    <el-form-item label="客户代码" >
                        <el-input v-model="customerInfo.customerCode" placeholder="客户代码"></el-input>
                    </el-form-item>
                    <el-form-item label="客户名称">
                        <el-input v-model="customerInfo.customerName" placeholder="客户名称"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" style="margin-left:18px">
                        <el-input v-model="customerInfo.customerContact" placeholder="联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input v-model="customerInfo.customerPhone" placeholder="联系电话"></el-input>
                    </el-form-item>
                    <div>
                        <el-form-item label="公司地址">
                            <el-autocomplete
                                popper-class="my-autocomplete"
                                v-model.trim="customerInfo.province"
                                :fetch-suggestions="getProvince"
                                placeholder="请输入内容"
                                @select="selectedProvince">
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.area_name }}</div>
                                </template>
                            </el-autocomplete>
                        </el-form-item>
                        <el-form-item>
                            <el-autocomplete style="margin-left:20px"
                                popper-class="my-autocomplete"
                                v-model.trim="customerInfo.city"
                                :fetch-suggestions="getCity"
                                placeholder="请输入内容"
                                @select="selectedCity">
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.area_name }}</div>
                                </template>
                            </el-autocomplete>
                        </el-form-item>
                        <el-form-item>
                            <el-autocomplete style="margin-left:90px"
                                popper-class="my-autocomplete"
                                v-model.trim="customerInfo.area"
                                :fetch-suggestions="getArea"
                                placeholder="请输入内容"
                                @select="selectedArea">
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.area_name }}</div>
                                </template>
                            </el-autocomplete>
                        </el-form-item>
                        <el-form-item style="margin-left:20px">
                            <el-input v-model.trim="customerInfo.areaInfo" placeholder="地址详情"></el-input>
                        </el-form-item>
                    </div>
                    
                    <el-form-item label="微信账号">
                        <el-input v-model="customerInfo.wx" placeholder="公司微信账号"></el-input>
                    </el-form-item>
                    <el-form-item label="支付宝账号">
                        <el-input v-model="customerInfo.zfb" placeholder="公司支付宝账号"></el-input>
                    </el-form-item>
                    <el-form-item label="开户行">
                        <el-input v-model.trim="customerInfo.openingBank" placeholder="公司开户行"></el-input>
                    </el-form-item>
                    <el-form-item label="开户人" >
                        <el-input v-model="customerInfo.openingPerson" placeholder="公司开户人"></el-input>
                    </el-form-item>
                    <el-form-item label="银行账号">
                        <el-input v-model.trim="customerInfo.bankAccount" placeholder="公司银行账号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="customerInfo.issue" label="是否开票"></el-checkbox>
                    </el-form-item>
                    <el-form-item label="发票税率" >
                        <el-input v-model="customerInfo.invoice" placeholder="请输入发票税率"></el-input>
                    </el-form-item>
                    <el-form-item label="发票抬头">
                        <el-input v-model="customerInfo.invoiceTitle" placeholder="请输入发票抬头"></el-input>
                    </el-form-item>
                    <el-form-item label="所属公司">
                        <el-select v-model="customerInfo.company" placeholder="请选择所属公司">
                            <el-option v-for="(item,index) in companyType" 
                            :key="index" 
                            :label="item.Org_name" 
                            :value="item.Org_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="customerInfo.charging" label="是否区间计费"></el-checkbox>
                    </el-form-item>
                    <el-form-item label="元/吨">
                        <el-input v-model="customerInfo.ton" placeholder="请输入每吨多少元"></el-input>
                    </el-form-item>
                    <el-form-item label="元/方">
                        <el-input v-model="customerInfo.cube" placeholder="请输入每方多少元"></el-input>
                    </el-form-item>
                    <el-form-item label="元/件">
                        <el-input v-model="customerInfo.piece" placeholder="请输入每件多少元"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
 <!--新增-->
    
    

    
</template>
<script>
import axios from "axios"
import url from "@/js/common.js"
import storage from "@/js/localstorage.js"
export default {
    data(){
        return {
            customers:[],
            customers1:[],
            customerNames:'',
            customerNames1:'',
            pagination:{
                rows: 10,
                page: 1,
                total: 0
            },
            activeName: 'first',
            dialogFormVisible:false,
            required:true,
            categoryTypes: [],
            customerTypes:[],
            companyType:[],
            customerInfo:{
               customer_id:'',
               customerid:'',
               customertypeid:'',
               balance:0,
               customertype:'',
               customerCode:'',
               customerName:'',
               customerContact:'',
               customerPhone:'',
               province:'',
               city:'',
               area:'',
               areaInfo:'',
               wx:'',
               zfb:'',
               openingBank:'',
               openingPerson:'',
               bankAccount:'',
               issue:0,
               charging:0,
               invoice:'',
               invoiceTitle:'',
               company:'',
               ton:'',
               cube:'',
               piece:''
            },
            customer_id:'',
            columns: [
                { width: 60, titleAlign: 'center', columnAlign: 'center', type: 'selection' },
                { field: 'name', title: '序号', width: 80, titleAlign: 'center', columnAlign: 'center', isEdit: true,
                formatter: function(rowData, rowIndex, pagingIndex, field) {
                    return `<span class='cell-edit-color'>${rowData[field]}</span>`
                }, isResize: true },
                { field: 'tel', title: '省', width: 150, titleAlign: 'center', columnAlign: 'center', isEdit: true, isResize: true },
                { field: 'hobby', title: '市', width: 150, titleAlign: 'center', columnAlign: 'center', isEdit: true, isResize: true },
                { field: 'address', title: '区', width: 150, titleAlign: 'center', columnAlign: 'left', isEdit: true, isResize: true }
            ],
            selectProvinceId: '',
            selectCityId: '',
            selectAreaId: '',
            isShow:false,
            isDisabled1:true,
            saveShow1:false,
            newAdd:false,
            checkboxSelected:"",
            multipleSelection: [],
            customerList:[],
            customerList1:[]
        }
    },
    created() {
        this.loadData();
        this.loadCustomerTypes();
        this.loadCustomerType();
        this.loadcompanyType();
        this.searchResult();
        this.searchResult1();
    },
    methods:{
        loadData(){
            let _this = this;
            axios.post(url.apiUrl() + "/api/MetadataCustomer/MetadataCustomerList",{
               'Page': this.pagination.page,
               'Rows': this.pagination.rows,
               'customer_name': _this.customerNames,
               'contact_name':"",
               'customer_address':"",
               'customer_category_id': "1",
            }).then(data =>{
                _this.customers = data.data.data.rows;
                _this.customerList = data.data.data.rows;
                _this.pagination.total = data.data.data.total;
                for(let i= 0; i<this.customers.length;i++){
                    this.customers[i].monthly_balance = this.customers[i].monthly_balance == 0 ? '是' :'否'
                }
            })
            .catch (data => {
                _this.$message.error(data.data.error);
            })
            axios.post(url.apiUrl() + "/api/MetadataCustomer/MetadataCustomerList",{
               'Page': this.pagination.page,
               'Rows': this.pagination.rows,
               'customer_name': _this.customerNames1,
               'contact_name':"",
               'customer_address':"",
               'customer_category_id': "2",
            }).then(data =>{
                _this.customers1 = data.data.data.rows;
                _this.customerList1 = data.data.data.rows;
                _this.pagination.total = data.data.data.total;
                for(let i= 0; i<this.customers1.length;i++){
                    this.customers1[i].monthly_balance = this.customers1[i].monthly_balance == 0 ? '是' :'否'
                }
            })
            .catch (data => {
                _this.$message.error(data.data.error);
            })
        },
        //查询
        searchResult(){
            this.loadData();
        },
        searchResult1(){
            this.loadData();
        },
        selectCustomer(value){
            console.log(value , this.customerNames);
        },
        getSummaries(param){
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = '总计';
                return;
            }
            });
            return sums;
        },
        sizeChanged(rows){
            this.pagination.rows = rows;
            this.loadData()
        },
        pageChanged(page){
            this.pagination.page = page;
            this.loadData()
        },
        handleClick(tab, event) {
           console.log(tab, event);
           this.loadData()
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //新增
        customerChange(){
            this.dialogFormVisible = true,
            this.isDisabled1 = false,
            this.saveShow1 = true,
            this.isShow = false,
            this.newAdd = false ,
            this.customerInfo.customer_id = '',
            this.customerInfo.customerid = '',
            this.customerInfo.customertypeid = '',
            this.customerInfo.balance = 0,
            this.customerInfo.customerCode = '',
            this.customerInfo.customerName = '',
            this.customerInfo.customerContact = '',
            this.customerInfo.customerPhone = '',
            this.customerInfo.province = '',
            this.customerInfo.city = '',
            this.customerInfo.area = '',
            this.customerInfo.areaInfo = '',
            this.customerInfo.wx = '',
            this.customerInfo.zfb = '',
            this.customerInfo.openingBank = '',
            this.customerInfo.openingPerson ='',
            this.customerInfo.bankAccount = '',
            this.customerInfo.issue = 0,
            this.customerInfo.charging= 0,
            this.customerInfo.invoice = '',
            this.customerInfo.invoiceTitle ='',
            this.customerInfo.company = '',
            this.customerInfo.ton = '',
            this.customerInfo.cube ='',
            this.customerInfo.piece = ''
        },
        //双击获取修改信息
        doubleEvents(obj){
            console.log(obj);
            this.dialogFormVisible = true ;
            this.saveShow1 = false ;
            this.isShow = true ;
            this.newAdd = true ;
            this.isDisabled1 = true ;
            this.customerInfo.balance = obj.monthly_balance,
            this.customerInfo.customer_id = obj.customer_id;
            this.customerInfo.customerid = obj.customer_category_id;
            this.customerInfo.customertypeid = obj.customer_type_id;
            this.customerInfo.customerCode = obj.customer_code;
            this.customerInfo.customerName = obj.customer_name;
            this.customerInfo.customerContact = obj.contact_name;
            this.customerInfo.customerPhone = obj.contact_phone;
            this.customerInfo.selectProvinceId = obj.customer_province;
            this.customerInfo.selectCityId = obj.customer_city;
            this.customerInfo.selectAreaId = obj.customer_district;
            this.customerInfo.areaInfo = obj.customer_address;
            this.customerInfo.wx = obj.wechat_account;
            this.customerInfo.zfb = obj.alipay_account;
            this.customerInfo.openingBank = obj.deposit_bank;
            this.customerInfo.openingPerson = obj.deposit_holder;
            this.customerInfo.bankAccount = obj.deposit_account;
            this.customerInfo.issue = obj.invoice_issue;
            this.customerInfo.charging = obj.interval_charging;
            this.customerInfo.invoice = obj.invoice_taxrate;
            this.customerInfo.invoiceTitle = obj.invoice_title;
            this.customerInfo.company = obj.Org_id;
            this.customerInfo.ton = obj.unitprice_per_ton;
            this.customerInfo.cube = obj.unitprice_per_cube;
            this.customerInfo.piece = obj.unitprice_per_piece;
        },
        cancelInfo1(){
            this.dialogFormVisible = false ;
        },
        // 弹窗 删除操作
        deleteCompany1(){
            let _this = this ;
            axios.post(url.apiUrl() + '/api/MetadataCustomer/MetadataCustomerDel?customer_id='+ _this.customerInfo.customer_id)
            .then(function(val) {
                if (val.data.error == '') {
                    _this.$message({
                        message: '删除成功!',
                        type: 'success'
                    });
                    _this.dialogFormVisible = false ;
                    _this.loadData();
                    _this.checkboxSelected = "" ;
                } else {
                    _this.$message.error(val.data.error)
                }
            })
            .catch(function(data) {
                _this.$message.error("获取数据失败,请稍后再试11!")
            })
            
        },
        //页面删除
        deleteCompany(){
             let _this = this , arr = [] , add="";
            console.log(this.checkboxSelected)
            if(this.checkboxSelected == "" || this.checkboxSelected == null){
                _this.$message.error("请先勾选才能进行删除操作!");
            }else{
                
                this.checkboxSelected.forEach(function (value , index ) {
                    arr = value.customer_id ;
                });
                axios.post(url.apiUrl() + '/api/MetadataCustomer/MetadataCustomerDel?customer_id='+arr)
                .then(function(val) {
                    if (val.data.error == '') {
                        _this.$message({
                            message: '删除成功!',
                            type: 'success'
                        });
                        _this.loadData();
                        _this.checkboxSelected = "" ;
                    } else {
                        _this.$message.error(val.data.error)
                    }
                })
                .catch(function(data) {
                    _this.$message.error("获取数据失败,请稍后再试11!")
                })
            }
        },
        //保存
        addCustomer(){
            console.log(this.newAdd)
            if(this.newAdd){
                let add = {
                    monthly_balance:this.customerInfo.balance ? 0 : 1,
                    customer_code: this.customerInfo.customerCode,
                    customer_name: this.customerInfo.customerName,
                    contact_name: this.customerInfo.customerContact,
                    contact_phone: this.customerInfo.customerPhone,
                    customer_province: this.customerInfo.selectProvinceId,
                    customer_city: this.customerInfo.selectCityId,
                    customer_district: this.customerInfo.selectAreaId,
                    customer_address: this.customerInfo.areaInfo,
                    wechat_account: this.customerInfo.wx,
                    alipay_account: this.customerInfo.zfb,
                    deposit_bank: this.customerInfo.openingBank,
                    deposit_holder: this.customerInfo.openingPerson,
                    deposit_account:this.customerInfo.bankAccount,
                    invoice_issue:this.customerInfo.issue ? 0 : 1,
                    interval_charging :this.customerInfo.charging ? 0 :1,
                    invoice_taxrate: this.customerInfo.invoice,
                    invoice_title: this.customerInfo.invoiceTitle,
                    Org_id: this.customerInfo.company,
                    unitprice_per_ton: this.customerInfo.ton,
                    unitprice_per_cube: this.customerInfo.cube,
                    unitprice_per_piece: this.customerInfo.piece,
                    customer_id: this.customerInfo.customer_id ? this.customerInfo.customer_id : "" ,
                    customer_category_id: this.customerInfo.customerid,
                    customer_type_id:this.customerInfo.customertypeid, 
                }
                let _this = this
                axios.post(url.apiUrl()+"/api/MetadataCustomer/MetadataCustomerUpdate",add)
                .then(function(val){
                    if(val.data.error == ""){
                        _this.$message({
                            message:'更改成功',
                            type:'success'
                        });
                        _this.dialogFormVisible = false ;
                        _this.loadData();
                    }else{
                        _this.$message.error(val.data.error);
                    }
                })
                .catch(function(err){
                    this.$message.error(err)
                })
                this.dialogFormVisible = true ;
            }else{
                let add = {
                        customer_category_id: this.customerInfo.customerid,
                        customer_type_id:this.customerInfo.customertypeid,
                        monthly_balance:this.customerInfo.balance ? 0 : 1,
                        customer_code: this.customerInfo.customerCode,
                        customer_name: this.customerInfo.customerName,
                        contact_name: this.customerInfo.customerContact,
                        contact_phone: this.customerInfo.customerPhone,
                        customer_province: this.customerInfo.selectProvinceId,
                        customer_city: this.customerInfo.selectCityId,
                        customer_district: this.customerInfo.selectAreaId,
                        customer_address: this.customerInfo.areaInfo,
                        wechat_account: this.customerInfo.wx,
                        alipay_account: this.customerInfo.zfb,
                        deposit_bank: this.customerInfo.openingBank,
                        deposit_holder: this.customerInfo.openingPerson,
                        deposit_account:this.customerInfo.bankAccount,
                        invoice_issue:this.customerInfo.issue ? 0 : 1,
                        interval_charging :this.customerInfo.charging ? 0 :1,
                        invoice_taxrate: this.customerInfo.invoice,
                        invoice_title: this.customerInfo.invoiceTitle,
                        Org_id: this.customerInfo.company,
                        unitprice_per_ton: this.customerInfo.ton,
                        unitprice_per_cube: this.customerInfo.cube,
                        unitprice_per_piece: this.customerInfo.piece,
                        customer_id:"" ,
                        customer_category_id: this.customerInfo.customerid,
                        customer_type_id:this.customerInfo.customertypeid,
                    }
                let _this = this
                axios.post(url.apiUrl() + '/api/MetadataCustomer/MetadataCustomerAdd',add)
                .then(function(val){
                    if(val.data.error == ""){
                        _this.$message({
                            message:'添加成功',
                            type:'success'
                        });
                        _this.dialogFormVisible = false ;
                        _this.loadData();
                    }else{
                        _this.$message.error(val.data.error);
                    }
                })
                .catch(function(err){
                    this.$message.error(err)
                })
            }
            
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
            this.customerInfo.province = val.area_name
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
            this.customerInfo.city = val.area_name
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
            this.customerInfo.area = val.area_name
            this.selectAreaId = val.area_id
        },
        //客户类别
        loadCustomerTypes(){
            const _this = this
            axios.post(url.apiUrl()+"/api/MetadataCustomer/metadata_customer_categoryList")
            .then(xhr =>{
                if(xhr.data.error == "") {
                  _this.categoryTypes = xhr.data.data;
                } else {
                  this.$message("加载客户类别时出现错误: " + xhr.error)
                }
            })
            .catch(xhr =>{
                this.$message.error(xhr.data.error);
            })
        },
        //客户类型
        loadCustomerType(){
            const _this = this
            axios.post(url.apiUrl()+"/api/MetadataCustomer/metadata_customer_typeList")
            .then(xhr =>{
                if(xhr.data.error == "") {
                  _this.customerTypes = xhr.data.data;
                } else {
                  this.$message("加载客户类型时出现错误: " + xhr.error)
                }
            })
            .catch(xhr =>{
                this.$message.error(xhr.data.error);
            })
        },
        //所属公司
        loadcompanyType(){
            const _this = this
            axios.post(url.apiUrl()+"/api/MetadataOrg/GeOrgs")
            .then(xhr =>{
                if(xhr.data.error == "") {
                    console.log(xhr.data.data +"????")
                  _this.companyType = xhr.data.data;
                } else {
                  this.$message("加载客户类型时出现错误: " + xhr.error)
                }
            })
            .catch(xhr =>{
                this.$message.error(xhr.data.error);
            })
        },
        //修改
        updateInfo1(){
            this.isDisabled1 = false;
            this.saveShow1 = true;
        },
        checkbox(val){   // 用户手动勾选checkbox的勾选操作
            console.log(val,typeof(val));
            this.checkboxSelected = val;
        },
        checkboxAll(val){   // 用户点击全选checkbox的操作
            console.log(val , typeof(val));
            //this.checkboxSelected = val;
            this.$message.error('暂不支持多选操作');
            return false ;
        },
    },
    mounted(){
        const boxHeight = document.querySelector('.box').clientHeight 
        const buttonBoxHeight = document.querySelector('.buttonBox').clientHeight
        const areaBoxHeight = boxHeight - 145 - buttonBoxHeight
        document.querySelector('.tableWraper').style.height = areaBoxHeight + 'px'
        document.querySelector('.tableWraper').style.overflowY = 'auto'
    }
}
</script>

<style lang="scss" scoped>
    .buttonBox{
        padding: 15px;
    }
    .searchCondition{
        padding: 0 15px;
    }
    .tableWraper{
        width: 100%;
        overflow-x: hidden;
    }
    .box{
        height: 100%;
        overflow: hidden;
    }
    .l{
        float: left;
    }
    .r{
        float:right;
    }
    .buttons{
        padding: 10px
    }
    .clearfix:before, .clearfix:after { content: " "; display: block; height: 0; overflow: hidden; }  
    .clearfix:after { clear: both; }  
    .clearfix { zoom: 1; } 
</style>