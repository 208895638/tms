<template>
<div></div>
  <!-- <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <error-log class="errLog-container right-menu-item"></error-log>

      <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>

      <lang-select class="international right-menu-item"></lang-select>

      <el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">
        <theme-picker class="theme-switch right-menu-item"></theme-picker>
      </el-tooltip>
      <el-dropdown class="avatar-container right-menu-item a" trigger="click" @command="handleCommand1">
          <span class="el-dropdown-link">
              {{command1}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  v-for="(item , index) in companyList" :command="item.orgName" :orgCode = item.orgCode :orgId = item.orgId :key = index>{{item.orgName}}</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="avatar-container right-menu-item a" trigger="click" >
          <span class="el-dropdown-link">
              {{currentUser.displayName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  command="退出"><span @click="logout">退出</span></el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{$t('navbar.dashboard')}}
            </el-dropdown-item>
          </router-link>
          <a target='_blank' href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>
              {{$t('navbar.github')}}
            </el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu> -->
</template>

<script>
// import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
// import LangSelect from '@/components/LangSelect'
// import ThemePicker from '@/components/ThemePicker'
// import storage from '@/js/localstorage.js'
// export default {
//   components: {
//     Breadcrumb,
//     Hamburger,
//     ErrorLog,
//     Screenfull,
//     LangSelect,
//     ThemePicker
//   },
//   data() {
//     return {
//       activeIndex: '1',
//       activeIndex2: '1',
//       currentUser: '',
//       companyList: '',
//       command1: '我的工作台'
//     }
//   },
//   computed: {
//     ...mapGetters([
//       'sidebar',
//       'name',
//       'avatar'
//     ])
//   },
//   methods: {
//     toggleSideBar() {
//       this.$store.dispatch('toggleSideBar')
//     },
//     logout() {
//       this.$store.dispatch('LogOut').then(() => {
//         location.reload()// In order to re-instantiate the vue-router object to avoid bugs
//       })
//     },
//     handleSelect(key, keyPath) {
//       console.log(key, keyPath)
//     },
//     handleCommand1(command) {
//       this.command1 = command
//     }
//   },
//   mounted() {
//     console.log()
//     this.currentUser = JSON.parse(storage.getStorage('currentUser'));
//     this.companyList = JSON.parse(storage.getStorage('companyList'));
//     if(!this.currentUser || !this.companyList){
//       this.$message.error('未获取到信息,请退出登录后重试!');
//     }
//   }
// }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .navbar {
//   height: 50px;
//   line-height: 50px;
//   border-radius: 0px !important;
//   .hamburger-container {
//     line-height: 58px;
//     height: 50px;
//     float: left;
//     padding: 0 10px;
//   }
//   .breadcrumb-container{
//     float: left;
//   }
//   .errLog-container {
//     display: inline-block;
//     vertical-align: top;
//   }
//   .right-menu {
//     float: right;
//     height: 100%;
//     &:focus{
//      outline: none;
//     }
//     .right-menu-item {
//       display: inline-block;
//       margin: 0 8px;
//     }
//     .screenfull {
//       height: 20px;
//     }
//     .international{
//       vertical-align: top;
//     }
//     .theme-switch {
//       vertical-align: 15px;
//     }
//     .avatar-container {
//       height: 50px;
//       margin-right: 30px;
//       .avatar-wrapper {
//         cursor: pointer;
//         margin-top: 5px;
//         position: relative;
//         .user-avatar {
//           width: 40px;
//           height: 40px;
//           border-radius: 10px;
//         }
//         .el-icon-caret-bottom {
//           position: absolute;
//           right: -20px;
//           top: 25px;
//           font-size: 12px;
//         }
//       }
//     }
//   }
// }
// .a{
//   vertical-align: top;
// }
</style>
