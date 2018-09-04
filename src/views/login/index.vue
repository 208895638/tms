<template>
  <div class="login-container">

    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">

      <div class="title-container">
        <h3 class="title">后台管理系统登陆</h3>
        <!-- <lang-select class="set-language"></lang-select> -->
      </div>

      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" v-on:input="getCompany" type="text"  v-model.trim="loginForm.username" autoComplete="on" placeholder="请输入用户名"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model.trim="loginForm.password" autoComplete="on"
          placeholder="请输入密码" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item class="companyBox">
        <span class="svg-container svg-container_login">
          <i class="el-icon-setting"></i>
        </span>
        
        <el-select class="companyList" v-model="loginForm.company" placeholder="请选择公司">
          <el-option class="companyPer" v-for="(item , index) in companyList" :key="index" :label="item.org_name" :value="item.org_id"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登陆1</el-button>
      
    </el-form>

 

  </div>
</template>

<script>
 var routers = []
import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'
import axios from 'axios'
// import urlAddress from '@/commonjs/url.js'
import url from '@/js/common.js'
import storage from '@/js/localstorage.js'
import MenuUtils from '@/utils/MenuUtils'
import { addAsyncRouterMap } from '@/router'
export default {
   components: { LangSelect, SocialSign },
   name: 'login',
   data() {
     const validateUsername = (rule, value, callback) => {
       if (value.length == '' || value.length == null) {
         callback(new Error('用户名不能为空!'))
       } else {
         callback()
       }
     }
     const validatePassword = (rule, value, callback) => {
       if (value.length == '' || value.length == null) {
         callback(new Error('密码不能为空!'))
       } else {
         callback()
       }
     }
     const validateCompany = (rule, value, callback) => {
       if (value.length == '' || value.length == null) {
         callback(new Error('请选择公司!'))
       } else {
         callback()
       }
     }
     return {
       loginForm: {
         username: '',
         password: '',
         company: ''
       },
       loginRules: {
         username: [{ required: true, trigger: 'blur', validator: validateUsername }],
         password: [{ required: true, trigger: 'blur', validator: validatePassword }]
       },
       companyList: '',
       passwordType: 'password',
       loading: false,
       showDialog: false
     }
   },
   methods: {
     getCompany() {
       const _this = this
       axios.get(url.apiUrl() + '/api/User/GetUserOrgsByUserAccount?account=' + this.loginForm.username)
         .then(function(val) {
           _this.companyList = val.data.data;
           let aa = val.data.data.filter(ele =>{
             return ele.org_default == 1
           });
           console.log("aa",aa);
           if(aa[0]){
             _this.loginForm.company = aa[0].org_id;
             console.log(aa[0])
           }else{
             _this.loginForm.company = "";
           }
           
           // console.log(val.data.data)
         })
         .catch(function(val) {
           // console.log(val)
         })
     },
     aa() {
       console.log(111)
     },
     showPwd() {
       if (this.passwordType === 'password') {
         this.passwordType = ''
       } else {
         this.passwordType = 'password'
       }
     },
     handleLogin() {
       const data1 = {
           'OrgId': this.loginForm.company,
           'UserName': this.loginForm.username,
           'Password': this.loginForm.password
         }, _this = this
       this.$refs.loginForm.validate(valid => {
         if (valid) {
           if (this.loginForm.company == '' || this.loginForm.company == null) {
             _this.$message({
               message: '请先选择公司',
               type: 'warning'
             })
           } else {
             this.loading = true;
             axios.post(url.apiUrl() + '/api/User/Login', data1)
              .then(function(val) {
                const res = val.data.data
                // console.log(val);
                if(val.data.error == ""){
                  _this.$store.dispatch('LoginByUsername', _this.loginForm).then(() => {
               // console.log(data1)
                  storage.setStorage('users', JSON.stringify(_this.loginForm.username))
                  localStorage.setItem('key', JSON.stringify(res.currentUser))
                  storage.setStorage('currentUser', JSON.stringify(res.currentUser))
                  storage.setStorage('companyList', JSON.stringify(res.userInfo.orgs))
                  storage.setStorage('userInfo', JSON.stringify(res.userInfo))
                  window.sessionStorage.setItem('userInfo', JSON.stringify(res.userInfo))
                  _this.loading = false
                  console.log("currentUser",res.currentUser)
                  window.sessionStorage.setItem('user', JSON.stringify(res.userInfo))
                  MenuUtils(routers, res.userInfo.roles[0].modules)
                  console.log(routers)
                  window.sessionStorage.setItem('routers', JSON.stringify(routers))
                  addAsyncRouterMap(routers)
                  _this.$router.push({ path: '/' })
                }).catch(() => {
                  _this.loading = false
                })
                  
                }else{
                  _this.$message.error(val.data.error);
                  _this.loading = false
                }
                
                // console.log(val.data)
              })
              .catch(function(val) {
                console.log(val)
              })
             
           }
         } else {
           console.log('error submit!!')
           return false
         }
       })
     },
     afterQRScan() {
       // const hash = window.location.hash.slice(1)
       // const hashObj = getQueryObject(hash)
       // const originUrl = window.location.origin
       // history.replaceState({}, '', originUrl)
       // const codeMap = {
       //   wechat: 'code',
       //   tencent: 'code'
       // }
       // const codeName = hashObj[codeMap[this.auth_type]]
       // if (!codeName) {
       //   alert('第三方登录失败')
       // } else {
       //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
       //     this.$router.push({ path: '/' })
       //   })
       // }
     }
   },
   created() { // 这里主要是做中文处理
     this.$i18n.locale = 'zh'
     this.$store.dispatch('setLanguage', 'zh')
     // window.addEventListener('hashchange', this.afterQRScan)
   },
   destroyed() {
     // window.removeEventListener('hashchange', this.afterQRScan)
   }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .companyBox{
    .el-input{
      width: 100%;
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 320px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
.companyList{
  width: -moz-calc(100% - 34px);
  width: -webkit-calc(100% - 34px);
  width: calc(100% - 34px);
  .companyPer{
    width:100%;
  }
}
</style>
