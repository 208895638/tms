<template>
    <div class="box">
        <el-row class="buttonBox clearfix">
            <div class="clearfix">
                <el-button type="primary" @click="addComanyInfo" size="mini">新增</el-button>
                <el-button type="primary" @click="deleteCompany" size="mini">删除</el-button>
                <el-button type="primary" @click="importFile" size="mini">批量导入</el-button>
            </div>
            <div>
                <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
                    <el-form-item label="职位代码" size="mini">
                        <el-input v-model="searchCondition.code" placeholder="请输入职位代码"></el-input>
                    </el-form-item>
                    <el-form-item label="职位名称" size="mini">
                        <el-input v-model="searchCondition.name" placeholder="请输入职位名称"></el-input>
                    </el-form-item>
                    <el-form-item size="mini">
                        <el-button type="primary" @click="searchResult">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-row>
        <!-- 查询内容详情 -->
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
                        type="selection">
                    </el-table-column>
                    
                    <el-table-column
                        label="序号"
                        type="index">
                    </el-table-column>

                    <el-table-column
                        prop="position_code"
                        label="职位代码"
                        width="120">
                    </el-table-column>

                    <el-table-column
                        prop="position_name"
                        label="职位名称"
                        show-overflow-tooltip>
                    </el-table-column>
                   

                </el-table>
                
            </el-scrollbar>
            <div class="clearfix  d-flex justify-content-center">
                <el-button type="primary" @click="search" class="l" size="mini">搜索</el-button>
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
        <el-dialog title="职位管理详情" :visible.sync="dialogFormVisible">
            <div class="clearfix">
                <el-button type="primary" @click="updateInfo1" v-if="isShow"  size="mini">修改</el-button>
                <el-button type="danger" @click="saveInfo1" size="mini" v-if="saveShow1">保存</el-button>
                <el-button type="primary" @click="cancelInfo1" v-if="isShow" size="mini">取消</el-button>
                <el-button type="primary" @click="deleteCompany1" v-if="isShow"  size="mini">删除</el-button>
            </div>
            <div class="clearfix materielInfo">
                <el-form :inline="true" label-width="102px" :disabled = "isDisabled1" :model="areaInfo1" class="demo-form-inline">
                    <el-form-item label="职位代码" size="mini" :required = "required1" >
                        <el-input @blur="checkCodeAndName(0)" v-model.trim="areaInfo1.material_code"  placeholder="请输入物料代码"></el-input>
                    </el-form-item>
                    <el-form-item  label="职位名称" size="mini" :required = "required1" >
                        <el-input @blur="checkCodeAndName(1)" v-model.trim="areaInfo1.material_name"  placeholder="请输入物料名称"></el-input>
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
            searchCondition:{
                        name:"",
                        code:"",
                    },
            tableData3:[
                {
                    material_code:1,
                    material_name:"qq"
                }
            ],
            pageSize:10,
            currentPage:1,
            materielSize:0,
            checkboxSelected:"",
            multipleSelection:"",
            Create_Org_ID:"",
            dialogFormVisible:false ,
            Create_User_ID:"",
            areaInfo1:{
                material_code:"",
                material_name:"",
            },
            isShow:true ,
            saveShow1 :false ,
            required1:true ,
            isDisabled1 :true ,
            position_id:"",
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
        addComanyInfo(){ // 新增操作

            this.dialogFormVisible = true ;
            this.isShow = false ;
            this.saveShow1 = true ;
            let date = new Date(), _this = this;
            this.isDisabled1 = false;
            this.newAdd = false ;
            this.isCode = false;
            this.isName = false;
            this.areaInfo1.material_code = "" ;
            this.areaInfo1.material_name = "" ;
        },
        deleteCompany(){ // 删除操作
            let _this = this ;
             if(this.position_id == "" || this.position_id == null){
                _this.$message.error("请先勾选才能进行删除操作!");
            }else{
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        axios.post(url.apiUrl() + '/api/Position/PositionDel?position_id='+ _this.position_id)
                        .then(function(val) {
                            if (val.data.error == '') {
                                _this.$message({
                                    message: '删除成功!',
                                    type: 'success'
                                });
                                _this.dialogFormVisible = false ;
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
        importFile(){ // 导入文件操作
            this.$message({   
                message: '暂未开放',
                type: 'warning'
            });
        }, 
        searchResult(){    // 职位管理查询操作
            this.init();
        },
        pageSizeChange(val){   //   选择每页展示的页数大小
             console.log(val);
             this.pageSize = val;
             this.init();
        },
        currentSizeChange(val){   // 当前选择第几页
            this.currentPage = val;
            this.init();
        },
        checkbox(val){   // 用户手动勾选checkbox的勾选操作
            
            let position_id ="" ;
            val.forEach(function (value , index ) {
                position_id = value.position_id ;
            });
            this.position_id = position_id;
            console.log(this.position_id);
        },
        checkboxAll(val){   // 用户点击全选checkbox的操作
            console.log(val , typeof(val));
            //this.checkboxSelected = val;
            this.$message.error('暂不支持多选操作');
            return false ;
        },
        doubleEvents(obj){   // 双击信息进行的操作
            console.log(obj.position_id + 222222);
            this.dialogFormVisible = true ;
            this.saveShow1 = false ;
            this.isShow = true ;
            this.newAdd = true ;
            this.isDisabled1 = true ;

            this.oldCode = obj.position_code;
            this.oldName = obj.position_name;
            // //////  赋值操作
            this.position_id = obj.position_id;
            this.areaInfo1.material_code = obj.position_code ;
            this.areaInfo1.material_name = obj.position_name ;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        search(){   //点击搜索   th下面出现搜索框
            
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
                    axios.post(url.apiUrl() + '/api/Position/isAny' , data1)
                    .then(val => {
                        console.log(val)
                        if(val.data.data == true){
                            _this.$message({
                            type:"warning",
                            message:"职位代码重复!"
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
                    axios.post(url.apiUrl() + '/api/Position/isAny' , data1)
                    .then(val => {
                    console.log(val)
                    if(val.data.data == true){
                    
                        _this.$message({
                            type:"warning",
                            message:"职位名称重复!"
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
                    axios.post(url.apiUrl() + '/api/Position/isAny' , data1)
                    .then(val => {
                        console.log(val)
                        if(val.data.data == true){
                            _this.$message({
                            type:"warning",
                            message:"职位代码重复!"
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
                    axios.post(url.apiUrl() + '/api/Position/isAny' , data1)
                    .then(val => {
                    console.log(val)
                    if(val.data.data == true){
                    
                        _this.$message({
                            type:"warning",
                            message:"职位名称重复!"
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
        init(){   // 根据查询条件 获取职位详情
            const data1 = {
                "position_code": this.searchCondition.code,
                "position_name": this.searchCondition.name,
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
            axios.post(url.apiUrl() + '/api/Position/PositionList', data1)
            .then(function(val) {
                if (val.data.error == '') {
                    _this.tableData3 = val.data.data.rows;
                     _this.materielSize = val.data.data.total;
                    console.log(val.data.data)
                    
                } else {
                    _this.$message.error(val.data.error)
                }
            })
            .catch(function(val) {
                _this.$message.error(val.data.error)
            })
        },
        /////////////////// 弹窗操作
        updateInfo1(){
            this.isDisabled1 = false;
            this.saveShow1 = true ;
        },
        saveInfo1(){   // 保存
            // this.newAdd = false ;
            console.log(this.newAdd)
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
                let data2 =  {
                    position_id: this.position_id,
                    position_code: this.areaInfo1.material_code,
                    position_name: this.areaInfo1.material_name,
                    Create_Time:time,
                    Create_Org_ID: this.Create_Org_ID,
                    Create_User_ID: this.Create_User_ID,
                    Edit_User_ID: this.Create_User_ID,
                    Edit_Time: time,
                    Edit_Org_ID: this.Create_Org_ID
                }
                console.log(data2)
                axios.post(url.apiUrl() + '/api/Position/PositionUpdate', data2)
                .then( val =>{
                    if(val.data.error == ""){
                        _this.$message({
                            message: '更改成功!',
                            type: 'success'
                        });
                        _this.printValue = "" ;
                        _this.dialogFormVisible = false ;
                        _this.searchResult();
                        this.oldCode="";
                        this.oldName="";
                    }
                })
                .catch( val => {
                    _this.$message.error('数据获取错误,请过一段时间重试!');
                })
            }else{
                let data1 =  {
                    position_id: "",
                    position_code: this.areaInfo1.material_code,
                    position_name: this.areaInfo1.material_name,
                    Create_Time:time,
                    Create_Org_ID: this.Create_Org_ID,
                    Create_User_ID: this.Create_User_ID,
                    Edit_User_ID: "",
                    Edit_Time: time,
                    Edit_Org_ID: ""
                }
                if(this.areaInfo1.material_code == "" || this.areaInfo1.material_name == "" ){
                    this.$message.error("带*的为必填项,请填写后再保存!");
                }else{
                   
                    if(_this.isName == true && _this.isCode == true){
                        axios.post(url.apiUrl() + '/api/Position/PositionAdd', data1)
                    .then( val =>{
                        console.log(val.data);
                        if(val.data.error == ""){
                            _this.$message({
                                message: '添加成功!',
                                type: 'success'
                            });
                            _this.printValue = "" ;
                            _this.dialogFormVisible = false ;
                            _this.init();
                        }
                    })
                    .catch( val => {
                        _this.$message.error('数据获取错误,请过一段时间重试!');
                    })
                    }else{
                        _this.$message.error('代码或名称重复,请修改后重试!');
                    }
                }
                
            }
            
        },
        cancelInfo1(){
            this.dialogFormVisible = false ;
        },
        deleteCompany1(){
            const _this = this ;

             this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                   axios.post(url.apiUrl() + '/api/Position/PositionDel?position_id='+ _this.position_id)
                    .then(function(val) {
                        if (val.data.error == '') {
                            _this.$message({
                                message: '删除成功!',
                                type: 'success'
                            });
                            _this.dialogFormVisible = false ;
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

        this.init();
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
.cell{
     white-space: nowrap;
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


