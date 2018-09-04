<template>
  <div class="box">
    <el-row class="buttonBox clearfix">
      <div class="clearfix">
        <el-button type="primary" size="mini" @click="addModule">新增</el-button>
      </div>
    </el-row>
    <div class="searchCondition">
      <el-scrollbar class="tableWraper" wrapClass="scrollbar-wrapper">
        <tree-table :data="data" :columns="columns" :expandAll="expandAll" border>
            <el-table-column label="状态" width="70">
              <template slot-scope="scope">
                <el-tag :type="scope.row.module_disabled == false ? 'success' : 'danger'" disable-transitions>
                  {{ scope.row.module_disabled == false ? '正常' : '禁用' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="small" type="text" @click="editorModule(scope.row)">编辑</el-button>
                    <el-button size="small" type="text" @click="deleteModule(scope.row)">删除</el-button>
                    <el-button size="small" type="text" @click="updateModuleStatus(scope.row)">
                      {{ scope.row.module_disabled == false ? '禁用' : '启用' }}
                    </el-button>
                    <el-button size="small" type="text" @click="functionManagement(scope.row)">功能管理</el-button>
                </template>
            </el-table-column>
        </tree-table>
      </el-scrollbar>
    </div>
    <el-dialog title="模块详情" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
       <el-form ref="moduleForm" :model="moduleInfo" label-width="80px" :rules="rules">
        <el-form-item label="名称" prop="moduleName">
          <el-input v-model="moduleInfo.moduleName"></el-input>
        </el-form-item>
        <el-form-item label="上级模块" prop="moduleParent">
          <el-input v-model="moduleInfo.moduleParent" :disabled="true">
            <template slot="append">
              <el-button @click="selectParentModule">选择</el-button>
            </template>
          </el-input>
        </el-form-item>

        <!-- ------------------------------------- -->
        <el-form-item label="路由" prop="moduleRouter">
          <el-input v-model="moduleInfo.moduleUrl"></el-input>
        </el-form-item>
        <el-form-item label="路由对应组件" prop="moduleComponent">
          <el-input v-model="moduleInfo.component"></el-input>
        </el-form-item>
        <!-- ------------------------------------- -->

        <el-form-item label="模块状态">
          <el-radio-group v-model="moduleInfo.moduleDisabled">
            <el-radio label="0">正常</el-radio>
            <el-radio label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="模块描述" prop="moduleDescription">
          <el-input type="textarea" v-model="moduleInfo.moduleDescription" autosize></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveModule">保存</el-button>
          <el-button @click="dialogFormVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="模块列表" :visible.sync="dialogModuleVisible" :close-on-click-modal="false">
        <el-button type="primary" size="mini" @click="selectedParentModule" style="position:relative;top:-20px;">选择</el-button>
        <el-button size="mini" @click="dialogModuleVisible = false" style="position:relative;top:-20px;">取消</el-button>
        <el-tree
          :data="modelData"
          node-key="module_id"
          ref="tree"
          default-expand-all
          :check-strictly="true"
          :expand-on-click-node="false"
          :props="defaultProps">
        </el-tree>
    </el-dialog>
    <el-dialog title="功能管理" :visible.sync="dialogFunctionVisible" :close-on-click-modal="false" width="800px">
      <el-row>
        <el-col>
          <el-button type="primary" size="mini" @click="addFunction" style="position:relative;top:-20px;">添加功能</el-button>
          <el-table class="table" :data="functionData" height="200px" size="mini" tooltip-effect="dark" border>
            <el-table-column prop="function_name" label="功能名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="function_uniqueidentify" label="功能标识" show-overflow-tooltip>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="editorFunction(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="deleteFunction(scope.row)">删除</el-button>
                <el-button type="text" size="small" @click="selectFunction(scope.row)">选择</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col style="margin-top:10px;margin-bottom:10px;">
          <el-button type="primary" size="mini" @click="addApi" style="margin-bottom:10px;">添加API</el-button>
          <el-table class="table" :data="apiData" height="200px" size="mini" tooltip-effect="dark" border>
            <el-table-column prop="api_name" label="名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="api_url" label="URL" show-overflow-tooltip>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="editorApi(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="deleteApi(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

    </el-dialog>
    <el-dialog title="功能详情" :visible.sync="dialogFunctionFormVisible" :close-on-click-modal="false">
      <el-form ref="functionForm" :model="functionInfo" label-width="80px" :rules="functionRules">
        <el-form-item label="名称" prop="functionName">
          <el-input v-model="functionInfo.functionName"></el-input>
        </el-form-item>
        <el-form-item label="唯一标识" prop="functionUniqueIdentify">
          <el-input v-model="functionInfo.functionUniqueIdentify"></el-input>
        </el-form-item>
        <el-form-item label="模块描述" prop="functionDescription">
          <el-input type="textarea" v-model="functionInfo.functionDescription" autosize></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveFunctioin">保存</el-button>
          <el-button @click="dialogFunctionFormVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="功能详情" :visible.sync="dialogApiFormVisible" :close-on-click-modal="false">
      <el-form ref="apiForm" :model="apiInfo" label-width="80px" :rules="apiRules">
        <el-form-item label="名称" prop="apiName">
          <el-input v-model="apiInfo.apiName"></el-input>
        </el-form-item>
        <el-form-item label="API URL" prop="apiUrl">
          <el-input v-model="apiInfo.apiUrl"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="apiDescription">
          <el-input type="textarea" v-model="apiInfo.apiDescription" autosize></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveApi">保存</el-button>
          <el-button @click="dialogApiFormVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import url from '@/js/common.js'
import '@/assets/css/flex-box.css'
import treeTable from '@/components/TreeTable'
import { upModuleDisabledByModuleId, deleteModuleByModuleId, getFunctionsByModuleId, getApisByFunId, functionDelete, apiDelete } from '@/api/comm'

export default {
  components: { treeTable },
  data() {
    return {
      expandAll: true,
      columns: [
        {
          text: '模块名称',
          value: 'module_name',
          width: 200
        },
        {
          text: '模块URL',
          value: 'module_url'
        },
        {
          text: '模块描述',
          value: 'module_description',
          width: 130
        }
      ],
      data: [],
      sourceData: [],
      dialogFormVisible: false,
      dialogModuleVisible: false,
      dialogFunctionVisible: false,
      dialogFunctionFormVisible: false,
      dialogApiFormVisible: false,
      moduleInfo: {
        moduleId: 0,
        moduleName: '',
        moduleParent: '',
        moduleUrl: '',
        component: '',
        moduleDescription: '',
        parentModuleId: 0,
        moduleDisabled: '0'
      },
      rules: {
        moduleName: [
          { required: true, message: '请输入模块名称', trigger: 'blur' }
        ]
      },
      modelData: [],
      defaultProps: {
        children: 'children',
        label: 'module_name'
      },
      functionData: [],
      apiData: [],
      functionInfo: {
        functionId: 0,
        functionName: '',
        functionDescription: '',
        functionUniqueIdentify: '',
        moduleId: 0
      },
      functionRules: {
        functionName: [
          { required: true, message: '请输入功能名称', trigger: 'blur' }
        ]
      },
      apiInfo: {
        apiId: 0,
        apiName: '',
        apiUrl: '',
        apiDescription: '',
        functionId: 0
      },
      apiRules: {
        apiName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    generateData(children, parentId) {
      const result = this.sourceData.filter(d => d.parent_module_id === parentId)
      for (let i = 0; i < result.length; i++) {
        const item = result[i]
        item.children = []
        this.generateData(item.children, item.module_id)
        children.push(item)
      }
    },
    searchResult() {
      const _this = this
      var loading
      axios.interceptors.request.use(config => {
        loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        return config
      })
      axios.interceptors.response.use(config => {
        loading.close()
        return config
      })
      axios
        .get(url.apiUrl() + '/api/Module/GetAllModules')
        .then(function(json) {
          const result = json.data
          if (result.error === '') {
            const data = result.data
            _this.sourceData = data
            const newData = []
            _this.generateData(newData, 0)
            _this.data = newData
          } else {
            _this.$message.error(result.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    addModule() {
      const _this = this
      _this.methodType = 'add'
      _this.dialogFormVisible = true
      _this.$nextTick(() => {
        _this.$refs.moduleForm.resetFields()
        _this.moduleInfo = JSON.parse(_this.defaultModuleInfo)
      })
    },
    editorModule(val) {
      const _this = this
      _this.methodType = 'editor'
      _this.dialogFormVisible = true
      _this.$nextTick(() => {
        _this.$refs.moduleForm.resetFields()
        const parent = val.parent || {
          module_name: '',
          module_id: 0
        }
        _this.moduleInfo = {
          moduleId: val.module_id,
          moduleName: val.module_name,
          moduleParent: parent.module_name,
          moduleUrl: val.module_url,
          component: val.component,
          moduleDescription: val.moduel_description,
          parentModuleId: parent.module_id,
          moduleDisabled: val.module_disabled === false ? '0' : '1'
        }
      })
    },
    deleteModule(val) {
      const self = this
      self.$confirm('是否删除此模块？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '放弃'
      })
        .then(() => {
          deleteModuleByModuleId({
            moduleId: val.module_id
          }).then(json => {
            self.searchResult()
          })
        })
    },
    updateModuleStatus(val) {
      console.log('updateModuleStatus module:', val)
      const self = this
      upModuleDisabledByModuleId({
        moduleId: val.module_id,
        moduleDisabled: !val.module_disabled
      }).then(json => {
        self.searchResult()
      })
    },
    saveModule() {
      const _this = this
      this.$refs.moduleForm.validate((valid) => {
        if (valid) {
          console.log(this.moduleInfo)
          let saveUrl
          if (this.methodType === 'add') {
            saveUrl = url.apiUrl() + '/api/module/AddModule'
          } else if (this.methodType === 'editor') {
            saveUrl = url.apiUrl() + '/api/module/EditorModule'
          }
          this.moduleInfo.moduleDisabled = this.moduleInfo.moduleDisabled === '1'
          console.info(JSON.stringify(_this.moduleInfo))
          axios
            .post(saveUrl, _this.moduleInfo)
            .then(function(json) {
              const result = json.data
              if (result.error === '') {
                _this.searchResult()
                _this.dialogFormVisible = false
              } else {
                _this.$message.error(result.error)
              }
            })
            .catch(function(data) {
              _this.$message.error(data.data.error)
            })
        } else {
          return false
        }
      })
    },
    selectParentModule() {
      this.dialogModuleVisible = true
      this.modelData = this.data
      this.$nextTick(() => {
        if (this.moduleInfo.moduleParent) {
          this.$refs.tree.setCurrentKey([this.moduleInfo.parentModuleId])
        }
      })
    },
    selectedParentModule() {
      const node = this.$refs.tree.getCurrentNode()
      if (node) {
        console.log(node)
        this.moduleInfo.moduleParent = node.module_name
        this.moduleInfo.parentModuleId = node.module_id
      }
      this.dialogModuleVisible = false
    },
    functionManagement(val) {
      // console.log('功能管理', val)
      const _this = this
      _this.curModuleInfo = val
      _this.curFunctionInfo = null
      _this.functionData = null
      _this.apiData = null
      _this.dialogFunctionVisible = true
      _this.remoteGetFunctionsByModuleId(val.module_id, _this)
    },
    remoteGetFunctionsByModuleId(moduleId, that) {
      getFunctionsByModuleId(moduleId).then(json => {
        const result = json.data
        if (result.error === '') {
          const data = result.data
          that.functionData = data
        } else {
          that.$message.error(result.error)
        }
      })
    },
    addFunction() {
      // console.log('添加功能')
      const _this = this
      _this.funMethodType = 'add'
      _this.dialogFunctionFormVisible = true
      _this.$nextTick(() => {
        _this.$refs.functionForm.resetFields()
        _this.functionInfo = JSON.parse(_this.defaultFunctionInfo)
      })
    },
    editorFunction(val) {
      // console.log('编辑功能', val)
      const _this = this
      _this.funMethodType = 'editor'
      _this.dialogFunctionFormVisible = true
      _this.$nextTick(() => {
        _this.$refs.functionForm.resetFields()
        _this.functionInfo = {
          functionId: val.function_id,
          functionName: val.function_name,
          functionDescription: val.function_description,
          functionUniqueIdentify: val.function_uniqueidentify,
          moduleId: val.module_id
        }
      })
    },
    saveFunctioin() {
      const _this = this
      this.$refs.functionForm.validate((valid) => {
        if (valid) {
          let saveUrl
          if (this.funMethodType === 'add') {
            saveUrl = url.apiUrl() + '/api/function/add'
          } else if (this.funMethodType === 'editor') {
            saveUrl = url.apiUrl() + '/api/function/editor'
          }
          this.functionInfo.moduleId = _this.curModuleInfo.module_id
          axios
            .post(saveUrl, _this.functionInfo)
            .then(function(json) {
              const result = json.data
              if (result.error === '') {
                _this.remoteGetFunctionsByModuleId(_this.curModuleInfo.module_id, _this)
                _this.dialogFunctionFormVisible = false
              } else {
                _this.$message.error(result.error)
              }
            })
            .catch(function(data) {
              _this.$message.error(data.data.error)
            })
        } else {
          return false
        }
      })
    },
    deleteFunction(val) {
      console.log('删除功能:', val)
      const _this = this
      _this.$confirm('是否删除此功能？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '放弃'
      })
        .then(() => {
          functionDelete({ functionId: val.function_id }).then(json => {
            const result = json.data
            if (result.error === '') {
              _this.remoteGetFunctionsByModuleId(val.module_id, _this)
            } else {
              _this.$message.error(result.error)
            }
          })
        })
    },
    selectFunction(val) {
      const _this = this
      _this.curFunctionInfo = val
      _this.remoteApisByFunId(val.function_id, _this)
    },
    remoteApisByFunId(functionId, that) {
      getApisByFunId(functionId).then(json => {
        const result = json.data
        if (result.error === '') {
          const data = result.data
          that.apiData = data
        } else {
          that.$message.error(result.error)
        }
      })
    },
    addApi() {
      console.log('添加API')
      const _this = this
      if (!_this.curFunctionInfo) return
      _this.apiMethodType = 'add'
      _this.dialogApiFormVisible = true
      _this.$nextTick(() => {
        _this.$refs.apiForm.resetFields()
        _this.apiInfo = JSON.parse(_this.defaultApiInfo)
      })
    },
    editorApi(val) {
      console.log('编辑API', val)
      const _this = this
      _this.apiMethodType = 'editor'
      _this.dialogApiFormVisible = true
      _this.$nextTick(() => {
        _this.$refs.apiForm.resetFields()
        _this.apiInfo = {
          apiId: val.api_id,
          apiName: val.api_name,
          apiUrl: val.api_url,
          apiDescription: val.api_description,
          functionId: val.function_id
        }
      })
    },
    deleteApi(val) {
      console.log('删除API', val)

      const _this = this
      _this.$confirm('是否删除此API？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '放弃'
      })
        .then(() => {
          apiDelete([val.api_id]).then(json => {
            const result = json.data
            if (result.error === '') {
              _this.remoteApisByFunId(val.function_id, _this)
            } else {
              _this.$message.error(result.error)
            }
          })
        })
    },
    saveApi() {
      const _this = this
      this.$refs.apiForm.validate((valid) => {
        if (valid) {
          let saveUrl
          if (this.apiMethodType === 'add') {
            saveUrl = url.apiUrl() + '/api/apis/add'
          } else if (this.apiMethodType === 'editor') {
            saveUrl = url.apiUrl() + '/api/apis/editor'
          }
          console.log()
          this.apiInfo.functionId = _this.curFunctionInfo.function_id
          // axios
          //   .post(saveUrl, _this.apiInfo)
          //   .then(function(json) {
          //     const result = json.data
          //     if (result.error === '') {
          //       _this.remoteApisByFunId(_this.curFunctionInfo.function_id, _this)
          //       _this.dialogApiFormVisible = false
          //     } else {
          //       _this.$message.error(result.error)
          //     }
          //   })
          //   .catch(function(data) {
          //     _this.$message.error(data.data.error)
          //   })
        } else {
          return false
        }
      })
    }
  },
  mounted() {
    const boxHeight = document.querySelector('.box').clientHeight
    const buttonBoxHeight = document.querySelector('.buttonBox').clientHeight
    const areaBoxHeight = boxHeight - 40 - buttonBoxHeight
    document.querySelector('.tableWraper').style.height = areaBoxHeight + 'px'
    document.querySelector('.tableWraper').style.overflowY = 'auto'
    this.searchResult()
    this.defaultModuleInfo = JSON.stringify(this.moduleInfo)
    this.defaultFunctionInfo = JSON.stringify(this.functionInfo)
    this.defaultApiInfo = JSON.stringify(this.apiInfo)
  }
}
</script>
<style lang="scss" scoped>
.buttonBox {
  padding: 15px;
}
.searchCondition {
  padding: 15px 15px;
}
.tableWraper {
  width: 100%;
  overflow-x: hidden;
}
.table {
  height: 100%;
}
.box {
  height: 100%;
}
.l {
  float: left;
}
.r {
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: block;
  content: ' ';
  height: 0;
  overflow: hidden;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  zoom: 1;
}
.el-form-item {
  margin-bottom: 20px !important;
}
.buttonBox {
  padding: 15px 15px 0 15px;
}
</style>
<style>
.cell {
  white-space: nowrap !important;
}
.el-scrollbar__view {
  height: 100%;
}
</style>
