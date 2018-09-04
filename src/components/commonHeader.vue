<template>
    <div class="clearfix topNav">
        <div class="logo l">
            TMS
        </div>
        <div class="r clearfix">
            <el-menu background-color="#fff" text-color="#666" active-text-color="#333" :default-active="activeIndex" class="el-menu-demo l" mode="horizontal" @select="handleSelect">
                <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1" v-for="(item , index) in companyList" :orgCode = item.orgCode :orgId = item.orgId :key = index >{{item.orgName}}</el-menu-item>
                    
                </el-submenu>
            </el-menu>
            <el-menu background-color="transparent" text-color="#666" active-text-color="#333" :default-active="activeIndex" class="el-menu-demo l" mode="horizontal" @select="handleSelect">
                <el-submenu index="2">
                    <template slot="title">{{currentUser.displayName}}</template>
                    <el-menu-item index="2-1">退出</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        
    </div>
</template>
<script>
import storage from "@/js/localstorage.js"
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        currentUser:"",
        companyList:""
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted(){
        this.currentUser = JSON.parse(storage.getStorage("currentUser"));
        this.companyList = JSON.parse(storage.getStorage("companyList"));
    }
  }
</script>
<style lang="scss" scoped>
    .topNav{
        background: #fff;
        height: 60px;
        border-bottom: 1px solid #e6e6e6;
        .logo{
            width: 70px;
            text-align: center;
            font-weight: bold;
            padding-left: 10px;
            color: #333;
            font-size: 18px;
            height: 100%;
            line-height: 60px;
        }
    }
</style>