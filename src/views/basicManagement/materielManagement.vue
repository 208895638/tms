<template>
    <div class="box">
        <el-row class="buttonBox clearfix"> 
            <div class="clearfix">
                <el-button type="primary" @click="addComanyInfo" size="mini">新增</el-button>
                <el-button type="primary" @click="deleteCompany" size="mini">删除</el-button>
                <el-button type="primary" @click="importFile" size="mini">批量导入</el-button>
                <el-select v-model="printValue" size="small" placeholder="请选择" class="r">
                    <el-option
                    v-for="item in print"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
                    <el-form-item label="所属客户" size="mini">
                        <el-select clearable v-model="customerSelected" filterable placeholder="请选择" @change="selectCustomer">
                            <el-option
                            v-for="item in customerList"
                            :key="item.value"
                            :label="item.customer_name"
                            :value="item.customer_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="物料代码" size="mini">
                        <el-input v-model="searchCondition.code" placeholder="请输入物料代码"></el-input>
                    </el-form-item>
                    <el-form-item label="物料名称" size="mini">
                        <el-input v-model="searchCondition.name" placeholder="请输入物料名称"></el-input>
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
                    size="mini"
                    tooltip-effect="dark"
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
                        width="55">
                    </el-table-column>
                    
                    <el-table-column
                        label="序号"
                        type="index"
                        width="50">
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="material_code"
                        label="物料代码"
                        width="120">
                    </el-table-column>

                    <el-table-column
                        v-if="tableShow"
                        prop="material_code"
                        label="物料代码"
                         width="120"
                        show-overflow-tooltip>
                        <el-table-column
                            :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="material_name"
                        label="物料名称"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        v-if="tableShow"
                        prop="material_name"
                        label="物料名称"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>
                    <el-table-column
                        v-if="!tableShow"   
                        prop="customer_name"
                        label="所属客户" 
                        show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                        v-if="tableShow"
                        prop="customer_name"
                        label="所属客户"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="unit_name"
                        label="物料单位"
                        show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                        v-if="tableShow"
                        prop="unit_name"
                        label="物料单位"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="material_length"
                        label="长(米)"
                        show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                        v-if="tableShow"
                        prop="material_length"
                        label="长(米)"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="material_width"
                        label="宽(米)"
                        show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                        v-if="tableShow"
                        prop="material_width"
                        label="宽(米)"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="material_height"
                        label="高(米)"
                        show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                        v-if="tableShow"
                        prop="material_height"
                        label="高(米)"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="material_volume"
                        label="体积(立方米)"
                        show-overflow-tooltip>
                    </el-table-column>
                    
                    <el-table-column
                        v-if="tableShow"
                        prop="material_volume"
                        label="体积(立方米)"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="material_weight"
                        label="重量(码)"
                        show-overflow-tooltip>
                    </el-table-column>
                    
                    <el-table-column
                        v-if="tableShow"
                        prop="material_weight"
                        label="重量(码)"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                </el-table>
                
            </el-scrollbar>
            <div class="clearfix d-flex justify-content-center">
                <el-button type="primary" @click="search" class="l" size="mini">搜索</el-button>
                <el-pagination
                    background
                    @size-change="pageSizeChange"
                    @current-change="currentSizeChange"
                    :page-sizes="[10, 20, 50, 100 , materielSize > 1000 ? materielSize : 1000]"
                    :page-size="pageSize"
                    class="l"
                    layout="total , sizes, prev, pager, next"
                    :total = "materielSize"
                    >
                </el-pagination>
            </div>
        </div>
        <el-dialog title="物料管理详情" :visible.sync="dialogFormVisible">
            <div class="clearfix">
                <!-- <el-button type="primary" @click="addComanyInfo1" v-if="isShow" size="mini">新增</el-button> -->
                <el-button type="primary" @click="updateInfo1" v-if="isShow"  size="mini">修改</el-button>
                <el-button type="danger" @click="saveInfo1" size="mini" v-if="saveShow1">保存</el-button>
                <el-button type="primary" @click="cancelInfo1" v-if="isShow" size="mini">取消</el-button>
                <el-button type="primary" @click="deleteCompany1" v-if="isShow"  size="mini">删除</el-button>
            </div>
            <div class="clearfix materielInfo">
                <el-form :inline="true" label-width="102px" :disabled = "isDisabled1" :model="areaInfo1" class="demo-form-inline">
                    <el-form-item label="物料代码"  size="mini" :required = "required1" >
                        <el-input @blur="checkCodeAndName(0)" v-model.trim="areaInfo1.material_code"  placeholder="请输入物料代码"></el-input>
                    </el-form-item>
                    <el-form-item label="物料名称" size="mini" :required = "required1" >
                        <el-input @blur="checkCodeAndName(1)" v-model.trim="areaInfo1.material_name"  placeholder="请输入物料名称"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="物料单位" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.material_unit"  placeholder="请输入物料单位"></el-input>
                    </el-form-item> -->
                    <el-form-item label="物料单位" size="mini">
                        <el-select v-model="areaInfo1.material_unit" filterable placeholder="请选择" @change="selectSize">
                            <el-option
                            v-for="item in sizeList"
                            :key="item.value"
                            :label="item.unit_name"
                            :value="item.unit_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="长(米)" size="mini"  >
                        <el-input type="number" v-model.trim="areaInfo1.material_length"  placeholder="请输入长(米)"></el-input>
                    </el-form-item>
                    <el-form-item label="宽(米)" size="mini"  >
                        <el-input type="number" v-model.trim="areaInfo1.material_width"  placeholder="请输入宽(米)"></el-input>
                    </el-form-item>
                    <el-form-item label="高(米)" size="mini"  >
                        <el-input type="number" v-model.trim="areaInfo1.material_height"  placeholder="请输入高(米)"></el-input>
                    </el-form-item>
                    <el-form-item label="体积(立方米)" size="mini"  >
                        <el-input type="number" v-model.trim="areaInfo1.material_volume"  placeholder="请输入体积(立方米)"></el-input>
                    </el-form-item>
                    <el-form-item label="重量(公斤)" size="mini"  >
                        <el-input type="number" v-model.trim="areaInfo1.material_weight"  placeholder="请输入重量(公斤)"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="所属客户" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.custormer_id"  placeholder="请输入所属客户"></el-input>
                    </el-form-item> -->
                    <el-form-item label="所属客户" size="mini">
                        <el-select v-model="customerSelected" filterable placeholder="请选择" @change="selectCustomer">
                            <el-option
                            v-for="item in customerList"
                            :key="item.value"
                            :label="item.customer_name"
                            :value="item.customer_id">
                            </el-option>
                        </el-select>
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
import "@/assets/css/flex-box.css"
export default {
    data(){
        return {
            print:[
                {
                   label :"打印1",
                   value : "1"
                },
                {
                   label :"打印2",
                   value : "2"
                },
                {
                   label :"打印3",
                   value : "3"
                },
            ],
            printValue:"打印",
            searchCondition:{
                user:"",
                code:"",
                name:"",
            },
            tableData3:[],
        multipleSelection: [],
        customerSelected:"",
        customerList:[
            
        ],
        pageSize:10,
        currentPage1:"",
        currentPage:1,
        materielSize:0,
        tableShow:false,
        dialogFormVisible:false,
        required1:true,
        isDisabled1:true,
        printValue1:"",
        saveShow1:false,
        areaInfo1:{
            material_id:"",
            material_code:"",
            material_name:"",
            material_unit:"",
            material_length:"",
            material_width:"",
            material_height:"",
            material_volume:"",
            material_weight:"",
            custormer_id:"",
        },
        Create_Org_ID: '',
        Create_User_ID: '',
        material_id:"",
        checkboxSelected:"",
        isShow:false,
        sizeList:"",
        newAdd:false ,
        allCompanyInfo:"",
        isCode:false,
        isName:false,
        oldCode:"",
        oldName:""
        }
    },
    methods:{
        aa(val){
            
            //return [1,2]
            const { columns, data } = val;
            const sums = [];
            columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = '汇总';
                return;
            }
            if (index === 1) {
                // sums[index] = '个数';
                // return;
                
            }
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                    return prev + curr;
                } else {
                    return prev;
                }
                }, 0);
                sums[index] += '';
            } else {
                sums[index] = '';
            }
            });

            return sums;
        },
        renderHeader(createElement, { column }) {
            var self = this
            return createElement('el-input', {
                domProps: {
                value: self.value
                },
                on: {
                input: function (event) {
                    self.inputvalue = event
                    self.$emit('input', event)
                }
                }
            })
            },
        addComanyInfo(){   // 添加按钮执行的操作
            this.dialogFormVisible = true ;
            this.isShow = false ;
            this.saveShow1 = true ;
            let date = new Date(), _this = this;
            this.isDisabled1 = false;
            this.newAdd = false ;
            this.isName == false;
            this.isCode == false;
            //点击新增 先清空操作
            this.customerSelected = "";
            this.areaInfo1.material_id = "" ;
            this.areaInfo1.material_code = "" ;
            this.areaInfo1.material_name = "" ;
            this.areaInfo1.material_unit = "" ;
            this.areaInfo1.material_length = "" ;
            this.areaInfo1.material_width = "" ;
            this.areaInfo1.material_height = "" ;
            this.areaInfo1.material_volume = "" ;
            this.areaInfo1.material_weight = "" ;
            this.areaInfo1.custormer_id = "" ;
        },
        deleteCompany(){  //删除按钮执行的操作
            let _this = this , arr = [] , data1="";
            if(this.checkboxSelected == "" || this.checkboxSelected == null){
                _this.$message.error("请先勾选才能进行删除操作!");
            }else{
                
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        _this.checkboxSelected.forEach(function (value , index ) {
                            //arr.push(value.material_id);
                            arr = value.material_id ;
                        });
                        axios.post(url.apiUrl() + '/api/Material/MaterialDel?material_id='+arr)
                        .then(function(val) {
                            if (val.data.error == '') {
                                _this.$message({
                                    message: '删除成功!',
                                    type: 'success'
                                });
                                _this.searchResult();
                                _this.checkboxSelected = "" ;
                            } else {
                                _this.$message.error(val.data.error)
                            }
                        })
                        .catch(function(data) {
                            _this.$message.error("获取数据失败,请稍后再试11!")
                })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });          
                    });

                
            }
        },
        importFile(){ //导入文件执行的操作
            this.$message({
                message: '暂未开放',
                type: 'warning'
            });
        },
        searchResult() {  // 点击查询执行的操作
            const data1 = {
                "custormer_id": this.customerSelected,
                "material_code": this.searchCondition.code ? this.searchCondition.code : "",
                "material_name": this.searchCondition.name ? this.searchCondition.name : "",
                "Page": this.currentPage,
                "Rows": this.pageSize
            },_this = this;
            var loading;
                axios.interceptors.request.use(config => {
                        loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    
                    return config;
                })
                axios.interceptors.response.use(config => {
                    loading.close();
                    return config
                })
            axios.post(url.apiUrl() + '/api/Material/MaterialList', data1)
            .then(function(val) {
            if (val.data.error == '') {
                _this.areaOptions = val.data.data;
                _this.tableData3 = val.data.data.rows;
                _this.materielSize = val.data.data.total;
               console.log(JSON.stringify(val.data.data.rows[1]))

               
            } else { 
                _this.$message.error(val.data.error)
            }
            })
            .catch(function(data) {
                _this.$message.error(data.data.error)
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        selectCustomer(value){
            console.log(value , this.customerSelected);
            
        },
        pageSizeChange(val){   //   选择每页展示的页数大小
             this.pageSize = val;
             this.searchResult();
        },
        /////////////////////////////////
        currentSizeChange(val){   // 当前选择第几页
            this.currentPage = val;
            this.searchResult();
        },
        search(){   //点击搜索   th下面出现搜索框
            //this.tableShow = !this.tableShow ;
            // this.searchResult();
        },
        doubleEvents(obj){   // 双击信息进行的操作
        console.log(JSON.stringify(obj))
            this.dialogFormVisible = true ;
            this.saveShow1 = false ;
            this.isShow = true ;
            this.newAdd = true ;
            this.isDisabled1 = true ;

            this.oldCode = obj.material_code;
            this.oldName = obj.material_name;

            this.areaInfo1.material_id = obj.material_id;
            this.areaInfo1.material_code = obj.material_code;
            this.areaInfo1.material_name = obj.material_name;
            this.areaInfo1.material_unit = obj.material_unit_id;
            this.areaInfo1.material_length = obj.material_length;
            this.areaInfo1.material_width = obj.material_width;
            this.areaInfo1.material_height = obj.material_height;
            this.areaInfo1.material_volume = obj.material_volume;
            this.areaInfo1.material_weight = obj.material_weight;
            this.areaInfo1.custormer_id = obj.custormer_id;
            this.customerSelected = obj.customer_id;
            //this.$router.push({ path: '/materielManagementInfo' })
            //this.$router.push({path: '/materielManagementInfo' , query:obj});
        },
        getCostomer(){   //   获取所属客户信息
            const data1 = {
                Page: 1,
                Rows: 1000
            },_this = this ;
           axios.post(url.apiUrl() + '/api/MetadataCustomer/MetadataCustomerList', data1)
            .then( val =>{
                _this.customerList = val.data.data.rows ;
            })
            .catch( val => {
                _this.$message.error('数据获取错误,请过一段时间重试!');
            })
        },
        checkbox(val){   // 用户手动勾选checkbox的勾选操作
            this.checkboxSelected = val;
        },
        checkboxAll(val){   // 用户点击全选checkbox的操作
            //this.checkboxSelected = val;
            this.$message.error('暂不支持多选操作');
            return false ;
        },
        getSize(){  //获取物料单位
            const _this = this ;
            axios.get(url.apiUrl() + '/api/Material/GetUnit')
            .then( val =>{
                _this.sizeList = val.data.data ;
            })
            .catch( val => {
                _this.$message.error('数据获取错误,请过一段时间重试!');
            })
        },
        selectSize(){
            console.log(this.areaInfo1.material_unit);
        },
        //////////////////////////////////////////  弹窗中的事件
        addComanyInfo1(){
           
        },
        updateInfo1(){
            this.isDisabled1 = false;
            this.saveShow1 = true ;
             
        },
        checkCodeAndName(str){   // 检查是否名称或代码是否存在
            let _this = this;
            
            // 判断是否是左边点击进入详情
            console.log(this.oldCode,this.oldName)
            if(this.oldCode!="" || this.oldName!=""){
                if(this.areaInfo1.material_code == this.oldCode && this.areaInfo1.material_name == this.oldName){ // 判断公司代码和公司名称是否修改
                    _this.isCode = true;
                    _this.isName = true;
                }else{
                   if(str == 0){
                let data1 = {
                    code:_this.areaInfo1.material_code,
                    name:""
                };
                axios.post(url.apiUrl() + '/api/Material/isAny' , data1)
                .then(val => {
                    console.log(val)
                    if(val.data.data == true){
                        _this.$message({
                        type:"warning",
                        message:"物料代码重复!"
                        })
                        _this.isCode = false;
                    
                    }else{
                        _this.isCode = true;
                        
                    }
                })
                .catch(val => {
                    _this.$message.error(val.data.error)
                })
            }else{
                let data1 = {
                    code:"",
                    name:_this.areaInfo1.material_name
                };
                axios.post(url.apiUrl() + '/api/Material/isAny' , data1)
                .then(val => {
                console.log(val)
                if(val.data.data == true){
                
                    _this.$message({
                        type:"warning",
                        message:"物料名称重复!"
                    })
                    _this.isName = false;
                }else{
                    _this.isName = true;
                    
                }
                })
                .catch(val => {
                _this.$message.error(val.data.error)
                })
            }
                
                }
            }else{
                if(str == 0){
                let data1 = {
                    code:_this.areaInfo1.material_code,
                    name:""
                };
                axios.post(url.apiUrl() + '/api/Material/isAny' , data1)
                .then(val => {
                    console.log(val)
                    if(val.data.data == true){
                        _this.$message({
                        type:"warning",
                        message:"物料代码重复!"
                        })
                        _this.isCode = false;
                    
                    }else{
                        _this.isCode = true;
                    }
                })
                .catch(val => {
                    _this.$message.error(val.data.error)
                })
            }else{
                let data1 = {
                    code:"",
                    name:_this.areaInfo1.material_name
                };
                axios.post(url.apiUrl() + '/api/Material/isAny' , data1)
                .then(val => {
                console.log(val)
                if(val.data.data == true){
                
                    _this.$message({
                        type:"warning",
                        message:"物料名称重复!"
                    })
                    _this.isName = false;
                }else{
                    _this.isName = true;
                }
                })
                .catch(val => {
                _this.$message.error(val.data.error)
                })
            }
            }
            
        
        },
        saveInfo1(){
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
            }, time = o.y + '-' + o.M + '-' + o.d + ' ' + o.h + ':' + o.m + ':' + o.s;
            if(this.newAdd){
                let data1 = {
                    metadata_Material: {
                        material_id: this.areaInfo1.material_id ? this.areaInfo1.material_id : "",
                        material_code: this.areaInfo1.material_code,
                        material_name: this.areaInfo1.material_name,
                        material_unit_id: this.areaInfo1.material_unit,
                        material_length: this.areaInfo1.material_length,
                        material_width: this.areaInfo1.material_width,
                        material_height: this.areaInfo1.material_height,
                        material_volume: this.areaInfo1.material_volume,
                        material_weight: this.areaInfo1.material_weight,
                        Create_Time:time,
                        Create_Org_ID: this.Create_Org_ID,
                        Create_User_ID: this.Create_User_ID,
                        Edit_User_ID: this.Create_User_ID,
                        Edit_Time: time,
                        Edit_Org_ID: this.Create_Org_ID
                    },
                    metadata_R_Material_Customer: {
                        r_material_customer_id: "",
                        material_id: this.areaInfo1.material_id ? this.areaInfo1.material_id : "" ,
                        custormer_id: this.customerSelected
                    }
                }
                
                axios.post(url.apiUrl() + '/api/Material/MaterialUpdate', data1)
                .then( val =>{
                    if(val.data.error == ""){
                        _this.$message({
                            message: '更改成功!',
                            type: 'success'
                        });
                        _this.printValue = "" ;
                        _this.dialogFormVisible = false ;
                        _this.customerSelected = "";
                        _this.searchResult();
                        _this.oldName = "";
                        _this.oldCode = "";
                    }
                })
                .catch( val => {
                    _this.$message.error('数据获取错误,请过一段时间重试!');
                })
            }else{
                let data1 = {
                    metadata_Material: {
                        material_id: "",
                        material_code: this.areaInfo1.material_code,
                        material_name: this.areaInfo1.material_name,
                        material_unit_id: this.areaInfo1.material_unit,
                        material_length: this.areaInfo1.material_length,
                        material_width: this.areaInfo1.material_width,
                        material_height: this.areaInfo1.material_height,
                        material_volume: this.areaInfo1.material_volume,
                        material_weight: this.areaInfo1.material_weight,
                        Create_Time:time,
                        Create_Org_ID: this.Create_Org_ID,
                        Create_User_ID: this.Create_User_ID,
                        Edit_User_ID: "",
                        Edit_Time: time,
                        Edit_Org_ID: ""
                    },
                    metadata_R_Material_Customer: {
                        r_material_customer_id: "",
                        material_id: "" ,
                        custormer_id: this.customerSelected
                    }
                }
                console.log(JSON.stringify(data1));
                if(this.areaInfo1.material_code == "" || this.areaInfo1.material_name == "" ){
                    this.$message.error("带*的为必填项,请填写后再保存!");
                }else{
                    
                    if(_this.isName == true && _this.isCode == true){
                        axios.post(url.apiUrl() + '/api/Material/MaterialAdd', data1)
                        .then( val =>{
                            if(val.data.error == ""){
                                _this.$message({
                                    message: '添加成功!',
                                    type: 'success'
                                });
                                _this.printValue = "" ;
                                _this.dialogFormVisible = false ;
                                _this.customerSelected = "";
                                _this.searchResult();
                            }
                        })
                        .catch( val => {
                            _this.$message.error('数据获取错误,请过一段时间重试!');
                        })
                    }else{
                        _this.$message.error('代码或名称有重复,请修改后重试!');
                    }
                    
                }
                
            }
            
            
            
            
        },
        cancelInfo1(){
            this.dialogFormVisible = false ;
            
        },
        deleteCompany1(){   // 弹窗 删除操作
                let _this = this ;
                
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    axios.post(url.apiUrl() + '/api/Material/MaterialDel?material_id='+ _this.areaInfo1.material_id)
                    .then(function(val) {
                        if (val.data.error == '') {
                            _this.$message({
                                message: '删除成功!',
                                type: 'success'
                            });
                            _this.dialogFormVisible = false ;
                            _this.customerSelected = "" ;
                            _this.searchResult();
                            _this.checkboxSelected = "" ;
                        } else {
                            _this.$message.error(val.data.error)
                        }
                    })
                    .catch(function(data) {
                        _this.$message.error("获取数据失败,请稍后再试11!")
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消删除'
                });          
                });

                
            
        },
    },
    mounted(){
        const loginInfo = JSON.parse(storage.getStorage('currentUser'))
        this.Create_Org_ID = loginInfo.orgId
        this.Create_User_ID = loginInfo.userId

        const boxHeight = document.querySelector('.box').clientHeight 
        const buttonBoxHeight = document.querySelector('.buttonBox').clientHeight
        const areaBoxHeight = boxHeight - 40 - buttonBoxHeight
        document.querySelector('.tableWraper').style.height = areaBoxHeight + 'px'
        document.querySelector('.tableWraper').style.overflowY = 'auto'
        this.searchResult();
        this.getCostomer();
        this.getSize();
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

 
.clearfix:before, .clearfix:after { content: " "; display: block; height: 0; overflow: hidden; }  
.clearfix:after { clear: both; }  
.clearfix { zoom: 1; } 
.el-form-item{
    margin-bottom: 0px;
}
.buttonBox{
    padding: 15px 15px 0 15px;
}
</style>
<style>
    .cell{
     white-space: nowrap!important;
 }
 .el-scrollbar__view{
     height: 100%;
 }
</style>
