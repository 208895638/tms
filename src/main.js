import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
import './mock' // simulation data

// import MenuUtils from '@/utils/MenuUtils.js'
// let data = ''
// if (window.sessionStorage.getItem('user')) {
//   //console.info(JSON.parse(window.sessionStorage.getItem('user')))
//   data = JSON.parse(window.sessionStorage.getItem('user')).roles[0].modules
// }
// if (data) {
//   // 这里是防止用户手动刷新页面，整个app要重新加载,动态新增的路由，会消失，所以我们重新add一次
//   const routes = []
//   MenuUtils(routes, data)
//   router.addRoutes(routes)
//   window.sessionStorage.removeItem('isLoadNodes')
// }
// router.beforeEach((route, redirect, next) => {
//   let data = JSON.parse(window.sessionStorage.getItem('user'))
//   if(data&&route.path === '/login'){
//     //这里不使用router进行跳转，是因为，跳转到登录页面的时候，是需要重新登录，获取数据的，这个时候，会再次向router实例里面add路由规则，
//     //而next()跳转过去之后，没有刷新页面，之前的规则还是存在的，但是使用location的话，可以刷新页面，当刷新页面的时候，整个app会重新加载
//     //而我们在刷新之前已经把sessionStorage里的user移除了，所以上面的添加路由也不行执行
//     window.sessionStorage.removeItem('user')
//     window.sessionStorage.removeItem('isLoadNodes')
//     window.location.href = '/'
//     return false
//   }
//   if (!data && route.path !== '/login') {
//     next({ path: '/login' })
//   } else {
//     if (route.path) {
//       next()
//     } else {
//       next({ path: '/nofound' })
//     }
//   }
// })

import * as filters from './filters' // global filters

// 引入vueeasy table
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import { VTable, VPagination } from 'vue-easytable'

// 注册vue easytable到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

var vm = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
