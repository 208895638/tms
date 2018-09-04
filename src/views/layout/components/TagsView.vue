<template>
<div class="userSettings d-flex flex-nowrap">
  <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
  <div class="tags-view-container flex-auto">
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)"
        :to="tag" :key="tag.path" @contextmenu.prevent.native="openMenu(tag,$event)">
        {{generateTitle(tag.title)}}
        <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
      </router-link>
    </scroll-pane>
    <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag)">{{$t('tagsView.close')}}</li>
      <li @click="closeOthersTags">{{$t('tagsView.closeOthers')}}</li>
      <li @click="closeAllTags">{{$t('tagsView.closeAll')}}</li>
    </ul>
  </div>
  <div class="leftRight">
    <i class="el-icon-caret-left" @click.prevent="addIndex"></i>
    <i class="el-icon-caret-right" @click.prevent="minusIndex"></i>
  </div>
  <el-dropdown class="avatar-container d-flex right-menu-item a" trigger="click" >
      <span class="el-dropdown-link">
          {{command1}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="orgid(item.orgId,item.orgName)" v-for="(item , index) in companyList" :command="item.orgName" :orgCode = item.orgCode :orgId = item.orgId :key = index>{{item.orgName}}</el-dropdown-item>
      </el-dropdown-menu>
  </el-dropdown>
  <el-dropdown class="avatar-container d-flex right-menu-item a" trigger="click" >
      <span class="el-dropdown-link">
          {{currentUser.displayName}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  command="退出"><span @click="logout">退出</span></el-dropdown-item>
      </el-dropdown-menu>
  </el-dropdown>
</div>
  
</template>

<script>
import ScrollPane from '@/components/ScrollPane'
import { generateTitle } from '@/utils/i18n'
import Hamburger from '@/components/Hamburger'
import { mapGetters } from 'vuex'
import storage from '@/js/localstorage.js'
export default {
  components: { ScrollPane, Hamburger },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      companyList: '',
      activeIndex: '1',
      activeIndex2: '1',
      currentUser: '',
      command1: '我的工作台'
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  watch: {
    $route() {
      this.addViewTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.addViewTags()
    this.currentUser = JSON.parse(storage.getStorage('currentUser'))
    this.companyList = JSON.parse(storage.getStorage('companyList'))
    this.command1 = this.currentUser.orgName;
    if (!this.currentUser || !this.companyList) {
      this.$message.error('未获取到用户信息,请退出登录后重试!')
    }
  },
  methods: {
    addIndex() { // 切换路由
      const arr = [] // 用来找到当前所以的路由
      this.visitedViews.forEach(element => {
        arr.push(element.fullPath)
      })
      const routerIndex = arr.findIndex((value, index, arr) => { // 根据路由返回对应的下表
        return this.$route.fullPath == value
      })
      const index = routerIndex - 1
      if (index < 0) {

      } else {
        this.$router.push(arr[index])
      }
    },
    minusIndex() { // 切换路由
      const arr = [] // 用来找到当前所以的路由
      this.visitedViews.forEach(element => {
        arr.push(element.fullPath)
      })
      const routerIndex = arr.findIndex((value, index, arr) => { // 根据路由返回对应的下表
        return this.$route.fullPath == value
      })
      const index = routerIndex + 1
      if (index >= arr.length) {

      } else {
        this.$router.push(arr[index])
      }
    },
    orgid(id,name){
      console.log(this.visitedViews)
      
      this.$confirm('是否切换登陆网点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleCommand1(id,name); // 更新本地存储的登陆公司
        this.closeAllTags(); // 关闭路由 跳转到首页 
         this.$message({
          type: 'success',
            message: '切换成功!'
          }); 

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消切换!'
        });          
      });
    },
    handleCommand1(id,name) {
      this.command1 = name;
      let currentUser = JSON.parse(storage.getStorage("currentUser"));
      let userInfo = JSON.parse(storage.getStorage("userInfo"));
      console.log("currentUser",name,currentUser);
      console.log("userInfo",id,userInfo.currentOrg.orgId);
      currentUser.orgId = id;
      currentUser.orgName = name;
      userInfo.currentOrg.orgId = id;
      userInfo.currentOrg.orgName = name;
      storage.setStorage('currentUser', JSON.stringify(currentUser));
      storage.setStorage('userInfo', JSON.stringify(userInfo));
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      sessionStorage.clear()
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    generateTitle, // generateTitle by vue-i18n
    generateRoute() {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    addViewTags() {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', route)
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el)
            break
          }
        }
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags() {
      this.$store.dispatch('delAllViews')
      this.$router.push('/')
    },
    openMenu(tag, e) {
      this.visible = true
      this.selectedTag = tag
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      this.left = e.clientX - offsetLeft + 15 // 15: margin right
      this.top = e.clientY
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.userSettings{
  border-bottom: solid 1px #e6e6e6;
  .hamburger-container{
    padding: 0 10px;
    height: 34px;
    line-height: 43px;
  }
  .leftRight{
    line-height: 34px;
    cursor: pointer;
    i{
      color: #999;
    }
    i:hover{
      color: #333;
      transform:scale(1.5,1.5);
      transition: .2s ease-in;
    }
  }
  .avatar-container {
      height: 34px;
      margin-right: 30px;
      cursor: pointer;
      .el-dropdown-link{
        line-height: 34px;
      }
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
}
.d-flex{
     display: -webkit-box !important;
    display: -ms-flexbox !important;
    display: flex !important;
 }
 .flex-nowrap {
    -ms-flex-wrap: nowrap !important;
    flex-wrap: nowrap !important;
}
.flex-auto {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
.tags-view-container {
  padding: 0 10px;
  .tags-view-wrapper {
    background: #fff;
    height: 34px;
    // border-bottom: 1px solid #d8dce5;
    
    // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
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

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
