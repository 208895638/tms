<template>
    <div class="main">
        <el-row class="mainContent">
            <div  class="registerMain">
                <el-card class="box-card">
                    <div slot="header" class="" style="text-align:center;">
                        <span>{{msg}}</span>
                    </div>
                    <div class="box-card1">
                        <el-form :label-position="labelPosition"  ref="formLabelAlign" :rules="rules" label-width="80px" :model="formLabelAlign">
                            <el-form-item label="账户" prop="name">
                                <el-input v-model.trim="formLabelAlign.name"  @blur="getCompany" placeholder="请输入登录账户"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="region">
                                <el-input v-model.trim="formLabelAlign.region" placeholder="请输入登录密码"></el-input>
                            </el-form-item>
                             <el-form-item class="companyBox">
                                <el-select class="companyList" v-model="loginForm.company" placeholder="请选择公司">
                                <el-option class="companyPer" v-for="(item , index) in companyList" :key="index" :label="item.org_name" :value="item.org_id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="login"  type="primary"  @click="submitForm('formLabelAlign')">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    
                </el-card>
            </div>
        </el-row>
    </div>
  
</template>

<script>
import axios from 'axios'
import qs from "qs"
import reg from "@/js/reg.js"
import commonUrl from "@/js/common.js"
import storage from "@/js/localstorage.js"
export default {
  name: "HelloWorld",
  data() {
      var checkAccount = (rule, value, callback) => {
        if (value.length == 0) {
            return callback(new Error('账户不能为空!'));
        }else{
            setTimeout(() => {
                callback();
        }, 1000);
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value.length == 0) {
            return callback(new Error('密码不能为空!'));
        }else{
            setTimeout(() => {
                callback();
        }, 1000);
        }
      };
      var checkCode = (rule, value, callback) => {
        if (value.length == 0) {
            return callback(new Error('验证码不能为空!'));
        } else {
          callback();
        }
      };
    return {
        loginForm: {
            username: '',
            password: '',
            company:""
        },
       companyList:"",
        msg: "后台管理系统登陆",
        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        imgSrc:'121',
        formInline: {
          user: '',
          region: ''
        },
        rules: {
            name: [
                { validator: checkAccount, trigger: 'blur' }
            ],
            region: [
                { validator: validatePass, trigger: 'blur' }
            ],
            type: [
                { validator: checkCode, trigger: 'blur' }
            ]
        }
        
    };
  },
  methods: {
        changeImgSrc(){
            let _this = this;
            axios.post(commonUrl.imgUrl()+'?'+Math.random, {})
            .then(function (response) {
                _this.imgSrc = response.data;
            })
            .catch(function (response) {
            });
        },
        submitForm(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                const data1 = {
                    "OrgId": this.loginForm.company,
                    "UserName": this.formLabelAlign.name,
                    "Password": this.formLabelAlign.region
                }
                axios.post(commonUrl.apiUrl() + "/api/User/Login", data1)
                .then(function (response) {
                    const res = response.data.data;
                    console.log(res);
                    if(response.data.error == ""){
                        _this.$message({
                            message: '登录成功,三秒后跳转到首页!',
                            type: 'success'
                        });
                        storage.setStorage("user" ,JSON.stringify( _this.loginForm.username));
                        localStorage.setItem("key" , JSON.stringify(res.currentUser));
                        storage.setStorage("currentUser" , JSON.stringify(res.currentUser ));
                        storage.setStorage("companyList" , JSON.stringify(res.userInfo.orgs ));
                        storage.setStorage("userInfo" , JSON.stringify(res.userInfo ));
                        //判断是否有权限进入页面
                        // _this.$store.state.userLogin = true;
                        setTimeout(() => {
                            _this.$router.push("/");
                        }, 3000);
                    }else{
                        _this.$message.error(res.error);
                    }
                })
                .catch(function (response) {
                    console.log(response);
                    
                });
            } else {
                return false;
            }
        });
    },
    getCompany(){
      const _this = this;
      axios.get(commonUrl.apiUrl()+"/api/Org/GetAllOrgs")
      .then(function(val){
        _this.companyList = val.data.data;
        console.log(val.data.data)
      })
      .catch(function(val){
        console.log(val)
      })
    },
  },
  beforeMount(){
     
  }
};
</script>
<style scoped lang="scss">
.box-card1{
    padding: 0 50px;
}
.login{
    width: 100%;
    margin-top: 12px;
    background-color: #fea904;
    background-image: -webkit-gradient(linear,left top,right top,from(#fea904),to(#ff6f1e));
    background-image: linear-gradient(90deg,#fea904,#ff6f1e)
}
.main{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 80px;
    padding-top: 20px;
    .el-input{
        width: 100%;
    }
}
.mainContent{
    position: absolute;
    top: 20%;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
}
.logos{
    .logo{
        img{
            vertical-align: middle;
            height: 34px;
        }
    }
}
.register{
    text-align: right;
}
.registerMain{
        width: 464px;
        text-align: left;
        background-color: #fff;
        margin: 0 auto;
        z-index: 4;
}
.demo-form-inline{
    img{
        height: 40px;
        cursor: pointer;
        width: 114px;
    }
    .el-form-item{
        margin-right: 0;
    }
}
@media (max-width: 660px){
    .registerMain{
        margin-left: auto;
        width: 90%;
    }
    .mainContent{
        margin-top: 0%;
    }
    .box-card1{
        padding: 0;
    }
}
@media (max-width: 360px){
    .registerMain{
        margin-left: auto;
        width: 100%;
    }
    .demo-form-inline{
        .el-input {
            width: 149px;
        }
    }
}
</style>
