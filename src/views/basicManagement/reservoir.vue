<template>
    <div class="box">
        <el-row class="buttonBox clearfix">
            <div class="clearfix">
                <el-button type="primary" @click="reservoirChange" size="mini" icon="el-icon-circle-plus-outline">新增</el-button>
                <el-button type="primary" @click="deleteReservoir" size="mini" icon="el-icon-delete">删除</el-button>
                <el-button type="primary" size="mini">批量导入</el-button>
            </div>
            <div>
                <el-form :inline="true" class="demo-form-inline" :data="searchCondition">
                   <el-form-item label="所属公司" size="mini">
                        <el-select clearable v-model="affiliatedBranches"  filterable placeholder="请选择" @change="selectBranchs">
                             <el-option
                                v-for="item in affiliatedBranchesList"
                                :key="item.value"
                                :label="item.Org_name"
                                :value="item.Org_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="库区代码" size="mini">
                        <el-input v-model="searchCondition.code" placeholder="请输入库区代码"></el-input>
                    </el-form-item>
                    <el-form-item label="库区名称" size="mini">
                        <el-input v-model="searchCondition.name" placeholder="请输入库区名称"></el-input>
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
                    ref="multipleTable"
                    :data="reservoirs" 
                    border 
                    style="width:100%" 
                    height="100%"
                    size="mini"
                    max-height="100%"
                    tooltip-effect="dark"
                    show-summary
                    :summary-method="aa"
                    class="table"
                    @select = "checkbox"
                    @select-all = "checkboxAll"
                    @cell-dblclick="doubleEvents"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column type="index" width="50" label="序号">
                    </el-table-column>
                    <el-table-column label="所属网点" prop="Org_name">
                    </el-table-column>
                    <el-table-column label="库区代码" prop="w.warehousearea_code">
                    </el-table-column>
                    <el-table-column label="库区名称" prop="w.warehousearea_name">
                    </el-table-column>
                    <el-table-column label="所属仓间" prop="warehouse_name">
                    </el-table-column>
                </el-table>
            </el-scrollbar>
            <div class="clearfix d-flex justify-content-center">
                <el-button type="primary" @click="search" class="l" size="mini">搜索</el-button>
                <el-pagination
                background
                    @size-change="sizeChanged"
                    @current-change="pageChanged"
                    :current-page.sync="pagination.page"
                    :page-sizes="[10, 20, 50, 100 , pagination.total > 1000 ? pagination.total : 1000]"
                    :page-size="pagination.rows"
                    layout="total , sizes, prev, pager, next"
                    :total = "pagination.total"

                    >
                </el-pagination>
            </div>
        </div>
        <el-dialog :visible.sync="dialogFormVisible">
            <div class="clearfix">
                <el-button type="primary" @click="updateInfo1" v-if="isShow"  size="mini">修改</el-button>
                <el-button type="danger" @click="addPreservation('newreservoir')" size="mini" v-if="saveShow1">保存</el-button>
                <el-button type="primary" @click="deleteCompany1" v-if="isShow"  size="mini">删除</el-button>
            </div>
            <div class="clearfix materielInfo">
                <el-form :inline="true" class="demo-form-inline" label-width="102px" :disabled = "isDisabled1">
                    <el-form-item label="库区代码" size="mini" required>
                        <el-input @blur="checkCodeAndName(0)" v-model="newreservoir.warehouseareacode" placeholder="请输入库区代码"></el-input>
                    </el-form-item>
                    <el-form-item label="库区名称" size="mini" required>
                        <el-input @blur="checkCodeAndName(1)" v-model="newreservoir.warehouseareaname" placeholder="请输入库区名称"></el-input>
                    </el-form-item>
                    <el-form-item label="所属仓间" size="mini">
                         <el-select v-model="newreservoir.warehouseid"  filterable placeholder="请输入所属仓间">
                             <el-option
                                v-for="(item,index) in affiliatedBranchesLists"
                                :key="index"
                                :label="item.w.warehouse_name"
                                :value="item.w.warehouse_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属公司" size="mini">
                        <el-select v-model="newreservoir.orgid"  filterable placeholder="请输入所属网点" @change="selectBranchs">
                             <el-option
                                v-for="item in affiliatedBranchesList"
                                :key="item.value"
                                :label="item.Org_name"
                                :value="item.Org_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import axios from "axios"
import url from "@/js/common.js"
import storage from "@/js/localstorage.js"
import "@/assets/css/flex-box.css"
export default {
    data(){
        return{
            reservoirs:[],
            affiliatedBranches:'',
            affiliatedBranchesList:[],
            affiliatedBranchesLists:[],
            pagination:{
                rows: 10,
                page: 1,
                total: 0
            },
            dialogFormVisible:false,
            newreservoir:{
                warehouseareacode:'',
                warehouseareaname:'',
                warehouseid:'',
                orgid:''
            },
            isShow:false,
            saveShow1:false,
            isDisabled1:false,
            searchCondition:{
                code:'',
                name:''
            },
            allCompanyInfo:"",
            isCode:false,
            isName:false,
            oldCode:"",
            oldName:"",
            Create_Org_ID:"",
            Create_User_ID:"",
        }
    },
    created() {
        this.loadData();
        this.getCompanyList();
        this.getWarehouseList()
    },
    methods:{
        aa(val){
            
            //return [1,2]
            const { columns, data } = val;
            const sums = [];
            columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = '总价';
                return;
            }
            if (index === 1) {
                sums[index] = '个数';
                return;
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
                sums[index] += ' 元';
            } else {
                sums[index] = 'N/A';
            }
            });

            return sums;
        },
        search(){
            this.$message.error("暂未开放!")
        },
        // table表格数据展示
        loadData(){
            let _this = this
            axios.post(url.apiUrl() + '/api/WarehouseArea/WarehouseAreaList',{
               'Page': this.pagination.page,
               'Rows': this.pagination.rows,
               'Org_name': '',
               'Org_id':_this.affiliatedBranches,
               'warehousearea_code': this.searchCondition.code,
               'warehousearea_name': this.searchCondition.name,
            })
            .then(data =>{
                _this.reservoirs = data.data.data.rows;
                _this.pagination.total = data.data.data.total;
                let aa = data.data.data.rows;
                var arr = [];
                for(var i = 0; i<aa.length ; i++){
                    arr.push({
                        name:aa[i].w.warehousearea_name,
                        orgid:aa[i].w.warehousearea_code
                    })
                }
                _this.allCompanyInfo = arr;
                console.log(aa)
            })
            .catch (data => {
                _this.$message.error(data.data.error);
            })
        },
        // 分页信息
        sizeChanged(rows){
            this.pagination.rows = rows;
            this.loadData()
        },
        pageChanged(page){
            this.pagination.page = page;
            this.loadData()
        },
        // 查询
        selectBranchs(value){
            console.log(value , this.affiliatedBranches);
        },
        searchResult(){
            this.loadData()
        },
        getCompanyList(){   // 获取所属公司所以数据
            const _this = this ;
            axios.post(url.apiUrl() + '/api/MetadataOrg/GeOrgs')
            .then(function(val) {
                _this.affiliatedBranchesList = val.data.data
            })
            .catch(function(data) {
                _this.$message.error(data.data.error)
            })
        },
        //获取所属仓间
        getWarehouseList(){
            const _this = this ;
            axios.post(url.apiUrl() + '/api/Warehouse/WarehouseList',{
                'Page':1,
                'Rows':100,
            })
            .then(function(val) {
                _this.affiliatedBranchesLists = val.data.data.rows
            })
            .catch(function(data) {
                this.$message.error(data.data.error)
            })
        },
        //新增
        reservoirChange(){
            this.isDisabled1 = false,
            this.saveShow1 = true,
            this.isShow = false,
            this.newAdd = false ,

            this.isCode = false;
            this.isName = false;

            this.dialogFormVisible = true,
            this.newreservoir.warehouseareacode='',
            this.newreservoir.warehouseareaname='',
            this.newreservoir.warehouseid='',
            this.newreservoir.orgid=this.Create_Org_ID,
            this.newreservoir.warehousearea_id = ''
        },
         checkCodeAndName(str){   // 检查是否名称或代码是否存在
            let _this = this;
            
            // 判断是否是左边点击进入详情
            console.log(this.oldCode,this.oldName)
            if(this.oldCode!="" || this.oldName!=""){
                if(this.newreservoir.warehouseareacode == this.oldCode && this.newreservoir.warehouseareaname == this.oldName){ // 判断公司代码和公司名称是否修改
                    _this.isCode = true;
                    _this.isName = true;
                }else{
                   if(str == 0){
                    let data1 = {
                        code:this.newreservoir.warehouseareacode,
                        name:""
                    };
                    axios.post(url.apiUrl() + '/api/WarehouseArea/isAny' , data1)
                    .then(val => {
                        console.log(val)
                        if(val.data.data == true){
                            _this.$message({
                            type:"warning",
                            message:"库区代码重复!"
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
                        name:_this.newreservoir.warehouseareaname
                    };
                    axios.post(url.apiUrl() + '/api/WarehouseArea/isAny' , data1)
                    .then(val => {
                    console.log(val)
                    if(val.data.data == true){
                    
                        _this.$message({
                            type:"warning",
                            message:"库区名称重复!"
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
                        code:this.newreservoir.warehouseareacode,
                        name:""
                    };
                    axios.post(url.apiUrl() + '/api/WarehouseArea/isAny' , data1)
                    .then(val => {
                        console.log(val)
                        if(val.data.data == true){
                            _this.$message({
                            type:"warning",
                            message:"库区代码重复!"
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
                        name:_this.newreservoir.warehouseareaname
                    };
                    axios.post(url.apiUrl() + '/api/WarehouseArea/isAny' , data1)
                    .then(val => {
                    console.log(val)
                    if(val.data.data == true){
                    
                        _this.$message({
                            type:"warning",
                            message:"库区名称重复!"
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
        //保存
        addPreservation(){
            console.log(this.newAdd)
            if(this.newAdd){
                let add = {
                   warehousearea_code:this.newreservoir.warehouseareacode,
                   warehousearea_name:this.newreservoir.warehouseareaname,
                   warehouse_id:this.newreservoir.warehouseid,
                   org_id:this.newreservoir.orgid,
                   warehousearea_id: this.newreservoir.warehousearea_id ? this.newreservoir.warehousearea_id : "" ,
                }
                let _this = this;
                 axios.post(url.apiUrl()+"/api/WarehouseArea/WarehouseAreaUpdate",add)
                .then(function(val){
                    if(val.data.error == ""){
                        _this.$message({
                            message:'保存成功',
                            type:'success'
                        });
                        _this.dialogFormVisible = false ;
                        _this.loadData();
                        this.oldCode = "";
                        this.oldName = "";
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
                    warehousearea_code:this.newreservoir.warehouseareacode,
                    warehousearea_name:this.newreservoir.warehouseareaname,
                    warehouse_id:this.newreservoir.warehouseid,
                    org_id:this.newreservoir.orgid,
                    warehousearea_id:''
                }
                let _this = this;
                if(this.newreservoir.warehouseareaname == "" || this.newreservoir.warehouseareacode == "" ){
                    this.$message.error("带*的为必填项,请填写后再保存!");
                }else{
                    
                     if(_this.isName == true && _this.isCode == true){
                    axios.post(url.apiUrl()+"/api/WarehouseArea/WarehouseAreaAdd",add)
                    .then(function(val){
                        if(val.data.error == ""){
                            _this.$message({
                                message:'保存成功',
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
                     }else{
                         this.$message.error("代码或名称重复,请修改后重试!")
                     }
                }
                
            }
        },
        //页面功能删除
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
        deleteReservoir(){
            let _this = this , arr = [] , add="";
            console.log(this.checkboxSelected)
            if(this.checkboxSelected == "" || this.checkboxSelected == null){
                _this.$message.error("请先勾选才能进行删除操作!");
            }else{
                
                this.checkboxSelected.forEach(function (value , index ) {
                    arr = value.w.warehousearea_id ;
                });
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                         axios.post(url.apiUrl() + '/api/WarehouseArea/WarehouseAreaDel?warehousearea_id='+ arr)
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
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });          
                });


               
            }
        },
        // 修改
        updateInfo1(){
            this.isDisabled1 = false;
            this.saveShow1 = true;
        },
        // 双击获取修改页面
        doubleEvents(obj){
            console.log(obj);
            this.dialogFormVisible = true ;
            this.saveShow1 = false ;
            this.isShow = true ;
            this.newAdd = true ;
            this.isDisabled1 = true ;

            this.oldCode = obj.w.warehousearea_code;
            this.oldName = obj.w. warehousearea_name;

            this.newreservoir.warehouseareacode = obj.w.warehousearea_code,
            this.newreservoir.warehouseareaname = obj.w. warehousearea_name,
            this.newreservoir.warehouseid = obj.w.warehouse_id,
            this.newreservoir.orgid = obj.w.org_id,
            this.newreservoir.warehousearea_id = obj.w.warehousearea_id
        },
        handleSelectionChange(){

        },
        //弹框删除
        deleteCompany1(){
            let _this = this ;
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        axios.post(url.apiUrl() + '/api/WarehouseArea/WarehouseAreaDel?warehousearea_id='+ _this.newreservoir.warehousearea_id)
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
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });          
                });

            
        }
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
</style>

