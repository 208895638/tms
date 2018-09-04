import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'
import distributionAdd from "./modules/distributionAdd" // 终端配送新增
import distributionShow from "./modules/distributionShow" // 终端配送新增
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    distributionAdd,
    distributionShow
  },
  getters
})

export default store
