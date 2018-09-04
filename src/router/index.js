import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/views/layout/Layout'
import storage from '@/js/localstorage.js'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '/common',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'acceptancebilling/add/:id?', // 受理开单
        component: () => import('@/views/acceptancebilling/add'),
        name: 'acceptancebilling/add',
        meta: { title: 'acceptancebilling_add', icon: 'icon', noCache: true, keepAlive: false }
      },
      {
        path: 'allotcar/add', // 配载
        component: () => import('@/views/allotcar/add'),
        name: 'allotcar/add',
        meta: { title: 'allotcar_add', keepAlive: false }
      },
      {
        path: 'allotcar/show/:id?',
        component: () => import('@/views/allotcar/show'),
        name: 'allotcar/show',
        meta: { title: 'allotcar_info', icon: 'icon', noCache: true }
      },
      {
        path: '/allotcar/addShippingList', // 运货单
        component: () => import('@/views/allotcar/addShippingList'),
        hidden: true,
        name: 'allotcar/addShippingList',
        meta: { title: 'addShippingList', keepAlive: false }
      },
      {
        path: '/UpdateOrderApply/add/:id?', // 改单申请
        component: () => import('@/views/UpdateOrderApply/add'),
        name: 'updateOrderApplys',
        meta: { title: 'updateOrderApplys', icon: 'international', keepAlive: false }
      },
      {
        path: '/Distribution/add', // 终端配送新增
        component: () => import('@/views/Distribution/add'),
        name: 'Distribution/add',
        meta: { title: 'DistributionAdd', keepAlive: false }
      },
      {
        path: '/Distribution/show/:id?',
        component: () => import('@/views/Distribution/show'),
        name: 'Distribution/show',
        meta: { title: 'DistributionShow', keepAlive: false }
      },
      { path: '/ArrivalStock/shelves', // 到货库存
        component: () => import('@/views/ArrivalStock/shelves'),
        name: 'ArrivalStock/shelves',
        hidden: true,
        meta: { title: 'shelves', keepAlive: false }
      },
      { path: '/ArrivalStock/shift',
        component: () => import('@/views/ArrivalStock/shift'),
        name: 'ArrivalStock/shift',
        hidden: true,
        meta: { title: 'shift', keepAlive: false }
      },
      { path: '/ArrivalStock/inventory',
        component: () => import('@/views/ArrivalStock/inventory'),
        name: 'ArrivalStock/inventory',
        hidden: true,
        meta: { title: 'inventory', keepAlive: false }
      },
      { path: '/DeliveryStock/shelves', // 发货库存
        component: () => import('@/views/DeliveryStock/shelves'),
        name: 'DeliveryStock/shelves',
        hidden: true,
        meta: { title: '上架', keepAlive: false }
      },
      { path: '/DeliveryStock/shift',
        component: () => import('@/views/DeliveryStock/shift'),
        name: 'DeliveryStock/shift',
        hidden: true,
        meta: { title: '移位', keepAlive: false }
      },
      { path: 'inventory',
        component: () => import('@/views/DeliveryStock/inventory'),
        name: 'DeliveryStock/inventory',
        hidden: true,
        meta: { title: '盘点', keepAlive: false }
      },
      ////////////////////////////////////
      { path: '/ArrivalConfirmation/ArrivalUnload/:id?',
        component: () => import('@/views/ArrivalConfirmation/ArrivalUnload'),
        name: 'ArrivalConfirmation/ArrivalUnload',
        hidden: true,
        meta: { title: '到货确认详情', keepAlive: false }
      },
      { // 客户自提
        path: '/customer/lading',
        component: () => import('@/views/customer/lading'),
        name: 'customer/lading',
        hidden: true,
        meta: { title: 'lading', keepAlive: false }
      },
      {
        path: '/customer/goods/:id',
        component: () => import('@/views/customer/goods'),
        name: 'customer/goods',
        hidden: true,
        meta: { title: 'goods', keepAlive: false }
      },
      { path: '/customer/extract/:id',
        component: () => import('@/views/customer/extract'),
        name: 'customer/extract',
        hidden: true,
        meta: { title: 'extract', keepAlive: false }
      },
      { path: '/SettlementSheet/add/:id', // 新增结算单
        component: () => import('@/views/SettlementSheet/add'),
        name: 'SettlementSheet/add',
        hidden: true,
        meta: { title: 'SettlementSheetAdd', keepAlive: false }
      },
      { path: '/CarSettlementSheet/add/:id', // 车运费结算单详情
        component: () => import('@/views/CarSettlementSheet/add'),
        name: 'CarSettlementSheet/add',
        hidden: true,
        meta: { title: 'CarSettlementSheetInfo', keepAlive: false }
      }
    ]
  },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

let asyncRouterMap = []

const addAsyncRouterMap = function(router) {
  asyncRouterMap = router
}

export { asyncRouterMap, addAsyncRouterMap }

// asyncRouterMap = [
//   {
//     'path': '/basic',
//     'component': Layout,
//     'redirect': '/basicManagement',
//     'meta': {
//       'title': 'basicManagement',
//       'icon': 'component',
//       roles: ['admin','editor']
//     },
//     'children': [
//       {
//         'path': 'basicManagement',
//         component: () => import('@/views/basicManagement/basicManagement'),
//         'name': 'basicManagement',
//         'meta': { 'title': 'basicManagement', 'keepAlive': true ,roles: ['admin','editor']}
//       },
//       {
//         'path': 'areaManagement',
//         component: () => import('@/views/basicManagement/areaManagement'),
//         'name': 'areaManagement',
//         'meta': { 'title': 'areaManagement', 'keepAlive': true ,roles: ['admin','editor']}
//       },
//       {
//         'path': 'customerManagement',
//         component: () => import('@/views/basicManagement/customerManagement'),
//         'name': 'customerManagement',
//         'meta': { 'title': 'customerManagement', 'keepAlive': true }
//       },
//       {
//         'path': 'materielManagement',
//         component: () => import('@/views/basicManagement/materielManagement'),
//         'name': 'materielManagement',
//         'meta': { 'title': 'materielManagement', 'keepAlive': true }
//       },
//       {
//         'path': 'jobManagement',
//         component: () => import('@/views/basicManagement/jobManagement'),
//         'name': 'jobManagement',
//         'meta': { 'title': 'jobManagement', 'keepAlive': true }
//       },
//       {
//         'path': 'personalManagement',
//         component: () => import('@/views/basicManagement/personalManagement'),
//         'name': 'personalManagement',
//         'meta': { 'title': 'personalManagement', 'keepAlive': true }
//       },
//       {
//         'path': 'carrierManagement',
//         component: () => import('@/views/basicManagement/carrierManagement'),
//         'name': 'carrierManagement',
//         'meta': { 'title': 'carrierManagement', 'keepAlive': true }
//       },
//       {
//         'path': 'vehicleManagement',
//         component: () => import('@/views/basicManagement/vehicleManagement'),
//         'name': 'vehicleManagement',
//         'meta': { 'title': 'vehicleManagement', 'keepAlive': true }
//       },
//       {
//         'path': 'storehouse',
//         component: () => import('@/views/basicManagement/storehouse'),
//         'name': 'storehouse',
//         'meta': { 'title': 'storehouse', 'keepAlive': true }
//       },
//       {
//         'path': 'reservoir',
//         component: () => import('@/views/basicManagement/reservoir'),
//         'name': 'reservoir',
//         'meta': { 'title': 'reservoir', 'keepAlive': true }
//       },
//       {
//         'path': 'storageSpaces',
//         component: () => import('@/views/basicManagement/storageSpaces'),
//         'name': 'storageSpaces',
//         'meta': { 'title': 'storageSpaces', 'keepAlive': true }
//       },
//       {
//         'path': 'users',
//         component: () => import('@/views/userManagement/index'),
//         'name': 'users',
//         'meta': { 'title': 'users', 'keepAlive': true }
//       },
//       {
//         'path': 'roles',
//         component: () => import('@/views/roleManagement/index'),
//         'name': 'roles',
//         'meta': { 'title': 'roles', 'keepAlive': true }
//       },
//       {
//         'path': 'models',
//         component: () => import('@/views/modelManagement/index'),
//         'name': 'models',
//         'meta': { 'title': 'models', 'keepAlive': true }
//       }
//     ]
//   },
//   {
//     path: '/operationFlow',
//     component: Layout,
//     alwaysShow: true,
//     redirct: '/UpdateOrderApply',
//     meta: {
//       title: 'operationFlow',
//       icon: 'international'
//     },
//     children: [
//       {
//         path: '/UpdateOrderApply',
//         component: () => import('@/views/UpdateOrderApply/index'),
//         children: [
//           {
//             path: 'index',
//             component: () => import('@/views/UpdateOrderApply/index'),
//             name: 'UpdateOrderApply',
//             meta: { title: 'updateOrderApply', keepAlive: false }
//           }
//         ]
//       },
//       {
//         path: '/UpdateOrderApply/add/:id?',
//         component: () => import('@/views/UpdateOrderApply/add'),
//         name: 'updateOrderApplys',
//         hidden: true,
//         meta: { title: 'updateOrderApplys', icon: 'international', keepAlive: false }
//       },
//       {
//         path: '/acceptancebilling',
//         component: () => import('@/views/acceptancebilling/index'),
//         children: [
//           { path: 'index',
//             component: () => import('@/views/acceptancebilling/index'),
//             name: 'acceptancebilling',
//             meta: { title: 'acceptancebilling', keepAlive: false }}]
//       },
//       {
//         path: '/acceptancebilling/add/:id?',
//         hidden: true,
//         component: () => import('@/views/acceptancebilling/add'),
//         name: 'acceptancebilling/add',
//         meta: { title: 'acceptancebillingAdd',
//           keepAlive: false }
//       },
//       {
//         path: '/allotcar',
//         component: () => import('@/views/allotcar/index'),
//         children: [
//           { path: 'index', component: () => import('@/views/allotcar/index'),
//             name: 'allotcar', meta: { title: 'allotcar', keepAlive: false }}]
//       },
//       {
//         path: '/allotcar/add',
//         component: () => import('@/views/allotcar/add'),
//         name: 'allotcar/add',
//         hidden: true,
//         meta: { title: 'allotcarAdd', keepAlive: false }
//       },
//       {
//         path: '/allotcar/show/:id?',
//         component: () => import('@/views/allotcar/show'),
//         name: 'allotcar/show',
//         hidden: true,
//         meta: { title: 'allotcarShow', keepAlive: false }
//       },
//       {
//         path: '/allotcar/addShippingList', // 运货单
//         component: () => import('@/views/allotcar/addShippingList'),
//         hidden: true,
//         name: 'allotcar/addShippingList',
//         meta: { title: 'addShippingList', keepAlive: false }
//       },
//       {
//         path: '/Distribution', // 终端配送
//         component: () => import('@/views/Distribution/index'),
//         children: [
//           { path: 'index', component: () => import('@/views/Distribution/index'),
//             name: 'Distribution/index',
//             meta: { title: 'Distribution', keepAlive: false }}]
//       },
//       {
//         path: '/Distribution/add', // 终端配送新增
//         component: () => import('@/views/Distribution/add'),
//         name: 'Distribution/add',
//         meta: { title: 'DistributionAdd', keepAlive: false },
//         hidden: true
//       },
//       {
//         path: '/Distribution/show/:id?',
//         component: () => import('@/views/Distribution/show'),
//         name: 'Distribution/show',
//         hidden: true,
//         meta: { title: 'DistributionShow', keepAlive: false }
//       },
//       {
//         path: '/ArrivalStock', // 到货库存
//         component: () => import('@/views/ArrivalStock/index'),
//         children: [
//           { path: 'index',
//             component: () => import('@/views/ArrivalStock/index'),
//             name: 'ArrivalStock/index',
//             meta: { title: 'ArrivalStock', keepAlive: false }}]
//       },
//       { path: '/ArrivalStock/shelves',
//         component: () => import('@/views/ArrivalStock/shelves'),
//         name: 'ArrivalStock/shelves',
//         hidden: true,
//         meta: { title: 'shelves', keepAlive: false }
//       },
//       { path: '/ArrivalStock/shift',
//         component: () => import('@/views/ArrivalStock/shift'),
//         name: 'ArrivalStock/shift',
//         hidden: true,
//         meta: { title: 'shift', keepAlive: false }
//       },
//       { path: '/ArrivalStock/inventory',
//         component: () => import('@/views/ArrivalStock/inventory'),
//         name: 'ArrivalStock/inventory',
//         hidden: true,
//         meta: { title: 'inventory', keepAlive: false }
//       },
//       {
//         path: '/DeliveryStock', // 发货库存
//         component: () => import('@/views/DeliveryStock/index'),
//         children: [
//           { path: 'index',
//             component: () => import('@/views/DeliveryStock/index'),
//             name: 'DeliveryStock/index',
//             meta: { title: 'DeliveryStock', keepAlive: false }}]
//       },
//       { path: '/DeliveryStock/shelves',
//         component: () => import('@/views/DeliveryStock/shelves'),
//         name: 'DeliveryStock/shelves',
//         hidden: true,
//         meta: { title: '上架', keepAlive: false }
//       },
//       { path: '/DeliveryStock/shift',
//         component: () => import('@/views/DeliveryStock/shift'),
//         name: 'DeliveryStock/shift',
//         hidden: true,
//         meta: { title: '移位', keepAlive: false }
//       },
//       { path: 'inventory',
//         component: () => import('@/views/DeliveryStock/inventory'),
//         name: 'DeliveryStock/inventory',
//         hidden: true,
//         meta: { title: '盘点', keepAlive: false }
//       },
//       {
//         path: '/customer', // 客户自提
//         component: () => import('@/views/customer/index'),
//         children: [
//           { path: 'index',
//             component: () => import('@/views/customer/index'),
//             name: 'customer/index',
//             meta: { title: 'customer', keepAlive: false }}]
//       },
//       {
//         path: '/customer/lading',
//         component: () => import('@/views/customer/lading'),
//         name: 'customer/lading',
//         hidden: true,
//         meta: { title: 'lading', keepAlive: false }
//       },
//       {
//         path: '/customer/goods/:id',
//         component: () => import('@/views/customer/goods'),
//         name: 'customer/goods',
//         hidden: true,
//         meta: { title: 'goods', keepAlive: false }
//       },
//       { path: '/customer/extract/:id',
//         component: () => import('@/views/customer/extract'),
//         name: 'customer/extract',
//         hidden: true,
//         meta: { title: 'extract', keepAlive: false }
//       },
//       {
//         path: '/Reconciliation', // 应收对账单
//         component: () => import('@/views/Reconciliation/index'),
//         children: [
//           { path: 'index',
//             component: () => import('@/views/Reconciliation/index'),
//             name: 'Reconciliation/index',
//             meta: { title: 'Reconciliation', keepAlive: false }}]
//       },
//       {
//         path: '/CarFreightBill', // 车运费对账列表
//         component: () => import('@/views/CarFreightBill/index'),
//         children: [{
//           path: 'index',
//           component: () => import('@/views/CarFreightBill/index'),
//           name: 'CarFreightBill/index',
//           meta: { title: 'CarFreightBill', keepAlive: false }}]
//       },
//       {
//         path: '/WarehouseBill', // 进仓费对账对账列表
//         component: () => import('@/views/WarehouseBill/index'),
//         children: [
//           { path: 'index',
//             component: () => import('@/views/WarehouseBill/index'),
//             name: 'WarehouseBill/index',
//             meta: { title: 'WarehouseBill', keepAlive: false }}]
//       },
//       {
//         path: '/arrivalConfirmation',
//         component: () => import('@/views/arrivalConfirmation/index'),
//         children: [
//           { path: 'index',
//             component: () => import('@/views/arrivalConfirmation/index'),
//             name: 'arrivalConfirmation/index',
//             meta: { title: 'arrivalConfirmation', keepAlive: false }}]
//       },
//       {
//         path: '/SettlementSheet',
//         component: () => import('@/views/SettlementSheet/index'),
//         children: [
//           { path: 'index',
//             component: () => import('@/views/SettlementSheet/index'),
//             name: 'SettlementSheet/index',
//             meta: { title: 'SettlementSheet', keepAlive: false }}]
//       },
//       { path: '/SettlementSheet/add/:id',
//         component: () => import('@/views/SettlementSheet/add'),
//         name: 'SettlementSheet/add',
//         hidden: true,
//         meta: { title: 'SettlementSheetAdd', keepAlive: false }
//       },
//       {
//         path: '/CarSettlementSheet',
//         component: () => import('@/views/CarSettlementSheet/index'),
//         children: [
//           { path: 'index',
//             component: () => import('@/views/CarSettlementSheet/index'),
//             name: 'CarSettlementSheet/index',
//             meta: { title: 'CarSettlementSheet', keepAlive: false }}]
//       },
//       { path: '/CarSettlementSheet/add/:id',
//         component: () => import('@/views/CarSettlementSheet/add'),
//         name: 'CarSettlementSheet/add',
//         hidden: true,
//         meta: { title: 'CarSettlementSheetInfo', keepAlive: false }}
//     ]
//   },

//   {
//     path: '/icon',
//     component: Layout,
//     children: [{
//       path: 'index',
//       component: () => import('@/views/svg-icons/index'),
//       name: 'icons',
//       meta: { title: 'icons', icon: 'icon', noCache: true }
//     }]
//   },

//   { path: '*', redirect: '/404', hidden: true }
// ]
