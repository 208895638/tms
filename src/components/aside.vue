<template>
    <div class="asideBarContent">
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->
        <!-- <happy-scroll color="rgba(0,0,0,0.5)" size="5"> -->
        <el-menu  class="el-menu-vertical-demo asideBar" @open="handleOpen" @close="handleClose" background-color="#fff"
                text-color="#333"
                :router = "router"
                :default-active = "activeLink"
                :default-openeds = "array"
                :unique-opened = "false"
                active-text-color="#ffd04b"  :collapse="false">
            <el-submenu index="1" >
                <template slot="title">
                    <i class="iconfont icon-sha"></i>
                    <span slot="title">基础管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="companyManagement">物料管理</el-menu-item>
                    <el-menu-item index="b">职位管理</el-menu-item>
                    <el-menu-item index="c">人员管理</el-menu-item>
                    <el-menu-item index="d">承运商管理</el-menu-item>
                    <el-menu-item index="e">车辆管理</el-menu-item>
                    <el-menu-item index="f">公司管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">业务流程</span>
            </el-menu-item>
            <el-submenu index="3">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>结算管理</span>
                </template>
                <el-submenu index="1-4">
                    <template slot="title">运费价格体系</template>
                    <el-menu-item index="1-4-1">运费价格设定</el-menu-item>
                    <el-menu-item index="1-4-2">运费规则设定</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="4">
                <i class="el-icon-menu"></i>
                <span slot="title">报表管理</span>
            </el-menu-item>
            <el-submenu index="5" >
                <template slot="title">
                    <i class="iconfont icon-sha"></i>
                    <span slot="title">系统管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="a">角色管理</el-menu-item>
                    <el-menu-item index="b">模块管理</el-menu-item>
                    <el-menu-item index="c">用户管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
        <!-- </happy-scroll> -->
    </div>
</template>

<script>
import iconfont from "@/assets/iconfont/iconfont.css"
import storage from "@/js/localstorage.js"
export default {
    data() {
      return {
        isCollapse: false,
        router:true,
        activeLink:"",
        module:"",
        array:["1" , "2" ,"3" ,"4" ,"5"]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    created:function(){
        this.activeLink = this.$route.name;
        const module = JSON.parse(storage.getStorage("userInfo")).roles[0].modules;
        this.module = module;
        console.log(module)
    }
  }
</script>

<style scoped lang = "scss">
.asideBarContent{
    /* position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    background: #fff;
    z-index: 99; */
    overflow-y: auto;
    height: 100%;
    background: #fff;
}
.asideBar{
    width: 200px;
    .iconfont{
        margin-right: 8px;
        margin-left: 5px;
    }
}
.el-menu{
    border-right: 0;
}
.el-submenu__title:hover{
    background: forestgreen!important;
}
</style>
