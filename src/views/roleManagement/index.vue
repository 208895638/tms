<template>
  <div class="box">
    <el-row class="buttonBox clearfix">
      <div class="clearfix">
        <el-button type="primary" size="mini" @click="addRole">新增</el-button>
      </div>
    </el-row>
    <div class="searchCondition">
      <el-scrollbar class="tableWraper" wrapClass="scrollbar-wrapper">
        <el-table class="table" ref="multipleTable" :data="roleData" height="100%" max-height="100%" size="mini" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>

          <el-table-column label="序号" type="index" width="50">
          </el-table-column>

          <el-table-column prop="role_name" label="角色名称" show-overflow-tooltip width="200">
          </el-table-column>

          <el-table-column prop="role_description" label="角色描述" show-overflow-tooltip>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editorRole(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteRole(scope.row)">删除</el-button>
              <el-button type="text" size="small" @click="authority(scope.row)">权限管理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </div>
     <el-dialog title="角色详情" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form ref="roleForm" :model="roleInfo" label-width="80px" :rules="rules">
        <el-form-item label="角色名称" prop="role_name">
          <el-input v-model="roleInfo.role_name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="role_description">
          <el-input v-model="roleInfo.role_description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveRole">保存</el-button>
          <el-button @click="dialogFormVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog width="500px" title="权限模块详情" :visible.sync="dialogAuthorityVisable" :close-on-click-modal="false">
        <el-button type="primary" size="mini" @click="saveModules" style="position:relative;top:-20px;">保存</el-button>
        <el-tree
          :data="modelData"
          show-checkbox
          node-key="id"
          ref="tree"
          default-expand-all
          :check-strictly="true"
          :expand-on-click-node="false"
          :render-content="renderContent"
          :props="defaultProps">
        </el-tree>
    </el-dialog>
    <el-dialog title="权限模块功能详情" :visible.sync="dialogAuthorityFunctionsVisable" :close-on-click-modal="false">
      <el-button type="primary" size="mini" @click="saveFunctions" style="position:relative;top:-20px;">保存</el-button>
      <el-table ref="functionsDataTable" class="table" height="400px" :data="functionData"  size="mini" tooltip-effect="dark" style="width: 100%" border @selection-change="functionHandleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="function_name" label="功能名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="function_description" label="功能描述" show-overflow-tooltip>
          </el-table-column>
        </el-table>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import url from '@/js/common.js'
import '@/assets/css/flex-box.css'
import { getEnableModulesByRoleId, getTreeModules, getFunctionsByModuleId, getFunctionsByRoleIdAndModuleId, batchRoleUpFunction } from '@/api/comm'
export default {
  data() {
    return {
      roleData: [],
      multipleSelection: [],
      functionsMultipleSelection: [],
      modelData: [],
      roleInfo: {
        role_id: 0,
        role_name: '',
        role_description: ''
      },
      dialogFormVisible: false,
      rules: {
        role_name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      dialogAuthorityVisable: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dialogAuthorityFunctionsVisable: false,
      functionData: []
    }
  },
  methods: {
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
        .get(url.apiUrl() + '/api/Role/GetAllRoles')
        .then(function(json) {
          const result = json.data
          if (result.error === '') {
            const data = result.data
            _this.roleData = data
          } else {
            _this.$message.error(result.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    addRole() {
      const _this = this
      _this.methodType = 'add'
      _this.dialogFormVisible = true
      _this.$nextTick(() => {
        _this.$refs.roleForm.resetFields()
        _this.roleInfo = JSON.parse(_this.defaultRoleInfo)
      })
    },
    editorRole(val) {
      // console.log(val)
      const _this = this
      _this.methodType = 'editor'
      _this.dialogFormVisible = true
      _this.$nextTick(() => {
        _this.$refs.roleForm.resetFields()
        _this.roleInfo = {
          role_id: val.role_id,
          role_name: val.role_name,
          role_description: val.role_description
        }
      })
    },
    saveRole() {
      const _this = this
      this.$refs.roleForm.validate((valid) => {
        if (valid) {
          let saveUrl
          if (this.methodType === 'add') {
            saveUrl = url.apiUrl() + '/api/Role/BatchAddRoles'
          } else if (this.methodType === 'editor') {
            saveUrl = url.apiUrl() + '/api/Role/BatchEditorRoles'
          }
          axios
            .post(saveUrl, [{ 0: _this.roleInfo }])
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
    deleteRole(val) {
      const _this = this
      this.$confirm('是否删除角色？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '放弃'
      })
        .then(() => {
          axios
            .post(url.apiUrl() + '/api/Role/Editor', val)
            .then(function(json) {
              const result = json.data
              if (result.error === '') {
                _this.searchResult()
              } else {
                _this.$message.error(result.error)
              }
            })
            .catch(function(data) {
              _this.$message.error(data.data.error)
            })
        })
    },
    renderContent(h, { node, data, store }) {
      return (
        <span style='display: flex;align-items: center;justify-content: space-between;flex:1'>
          <span>{node.label}</span>
          <span>
            <el-button size='mini' type='text' on-click={ () => this.functions(data) }>功能管理</el-button>
          </span>
        </span>)
    },
    generateData(children, parentId) {
      const result = this.modelSourceData.filter(d => d.parent === parentId)
      for (let i = 0; i < result.length; i++) {
        const item = result[i]
        item.children = []
        this.generateData(item.children, item.id)
        children.push(item)
      }
    },
    authority(val) {
      const _this = this
      _this.curRole = val
      this.dialogAuthorityVisable = true
      axios.all([getEnableModulesByRoleId(val.role_id), getTreeModules()])
        .then(axios.spread(function(roleModulesJson, modulesJson) {
          const modulesResult = modulesJson.data
          const roleModulesResult = roleModulesJson.data
          if (modulesResult.error || roleModulesResult.error) {
            _this.$message.error(`${modulesResult.error} ${roleModulesResult.error}`)
            return
          }

          let modules = modulesResult.data
          const ids = []
          modules = modules.map(m => {
            m.id = Number.parseInt(m.id)
            m.parent = Number.parseInt(m.parent)
            m.label = m.name
            ids.push(m.id)
            return m
          })
          const roleModules = roleModulesResult.data
          _this.modelSourceData = modules
          _this.moduleIds = ids
          const newData = []
          _this.generateData(newData, 0)
          _this.modelData = newData
          _this.$refs.tree.setCheckedKeys(roleModules)
        }))
    },
    saveModules() {
      const _this = this
      axios
        .post(url.apiUrl() + '/api/role/RoleHandler', {
          roleId: _this.curRole.role_id,
          checked: false,
          moduleIds: _this.moduleIds
        })
        .then(function(json) {
          const result = json.data
          if (result.error === '') {
            const checkedIds = _this.$refs.tree.getCheckedKeys()
            if (!checkedIds.length) {
              _this.$message.success('保存成功')
              return
            }
            axios
              .post(url.apiUrl() + '/api/role/RoleHandler', {
                roleId: _this.curRole.role_id,
                checked: true,
                moduleIds: checkedIds
              })
              .then(function(json) {
                const result = json.data
                if (result.error === '') {
                  _this.$message.success('保存成功')
                } else {
                  _this.$message.error(result.error)
                }
              })
              .catch(function(data) {
                _this.$message.error(data.data.error)
              })
          } else {
            _this.$message.error(result.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    functions(val) {
      const _this = this
      _this.curModule = val
      const checkedIds = _this.$refs.tree.getCheckedKeys()
      if (!checkedIds.includes(val.id)) return
      _this.dialogAuthorityFunctionsVisable = true
      axios.all([getFunctionsByModuleId(val.id), getFunctionsByRoleIdAndModuleId(_this.curRole.role_id, val.id)])
        .then(axios.spread(function(functionsJson, roleFunctionsJson) {
          const functionsResult = functionsJson.data
          const roleFunctionsResult = roleFunctionsJson.data
          if (functionsResult.error || roleFunctionsResult.error) {
            _this.$message.error(`${functionsResult.error} ${roleFunctionsResult.error}`)
            return
          }
          const functions = functionsResult.data
          const roleFunctions = roleFunctionsResult.data
          const selectedRows = functions.filter(f => {
            if (roleFunctions.includes(f.function_id)) {
              return f
            }
          })
          // console.log(selectedRows)
          _this.functionData = functions
          _this.roleFunctions = roleFunctions
          _this.$nextTick(() => {
            _this.toggleSelection(selectedRows)
          })
        }))
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.functionsDataTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.functionsDataTable.clearSelection()
      }
    },
    functionHandleSelectionChange(val) {
      this.functionsMultipleSelection = val
    },
    saveFunctions() {
      const _this = this
      const roleUpClearFunctionViews = []
      _this.roleFunctions.forEach(f => {
        roleUpClearFunctionViews.push({
          roleId: _this.curRole.role_id,
          moduleId: _this.curModule.id,
          functionId: f,
          functionChecked: false
        })
      })
      batchRoleUpFunction(roleUpClearFunctionViews).then(json => {
        const roleUpFunctionViews = []
        _this.functionsMultipleSelection.forEach(f => {
          roleUpFunctionViews.push({
            roleId: _this.curRole.role_id,
            moduleId: _this.curModule.id,
            functionId: f.function_id,
            functionChecked: true
          })
        })
        batchRoleUpFunction(roleUpFunctionViews).then(jsonObj => {
          // console.log(jsonObj)
        })
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
    this.defaultRoleInfo = JSON.stringify(this.roleInfo)
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
