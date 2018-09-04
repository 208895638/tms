<template>
  <div class="box">
    <el-row class="buttonBox clearfix">
      <div class="clearfix">
        <el-button type="primary" size="mini" @click="addUser">新增</el-button>
        <el-button type="primary" size="mini" @click="deleteUsers">删除</el-button>
      </div>
      <div>
        <el-form :inline="true" :model="searchUser" class="demo-form-inline">
          <el-form-item label="帐号" size="mini">
            <el-input v-model="searchUser.account" placeholder="请输入帐号"></el-input>
          </el-form-item>
          <el-form-item label="显示名" size="mini">
            <el-input v-model="searchUser.name" placeholder="请输入显示名"></el-input>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="searchResult">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
    <div class="searchCondition">
      <el-scrollbar class="tableWraper" wrapClass="scrollbar-wrapper">
        <el-table class="table" ref="multipleTable" :data="userData" height="100%" max-height="100%" size="mini" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange">

          <el-table-column type="selection" width="55">
          </el-table-column>

          <el-table-column label="序号" type="index" width="50">
          </el-table-column>

          <el-table-column prop="user_account" label="帐户" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="user_displayname" label="显示名" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="org_name" label="所属公司" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="role_name" label="所属角色" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="user_disabled" label="状态" width="90" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag :type="scope.row.user_disabled == false ? 'success' : 'danger'" disable-transitions>
                {{ scope.row.user_disabled == false ? '正常' : '禁用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="enableOrDisabled(scope.row)">
                {{ scope.row.user_disabled == false ? '禁用' : '启用' }}
              </el-button>
              <el-button type="text" size="small" @click="resetPwd(scope.row)">重置密码</el-button>
              <el-button type="text" size="small" @click="editor(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
      <div class="clearfix d-flex justify-content-center">
        <el-pagination background @size-change="pageSizeChange" @current-change="currentSizeChange" :page-sizes="[10, 20, 50, 100 , materielSize > 1000 ? materielSize : 1000]" :page-size="pageSize" class="l" layout="total , sizes, prev, pager, next" :total="materielSize">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="用户详情" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form ref="userForm" :model="userInfo" label-width="80px" :rules="rules">
        <el-form-item label="用户名" prop="user_account">
          <el-input v-model="userInfo.user_account"></el-input>
        </el-form-item>
        <el-form-item label="显示名" prop="user_displayname">
          <el-input v-model="userInfo.user_displayname"></el-input>
        </el-form-item>
        <el-form-item label="所属公司">
          <el-select @change="orgSelChange" v-model="userInfo.org_id" multiple placeholder="请选择" style="width:100%">
            <el-option v-for="item in orgOptions" :key="item.org_id" :label="item.org_name" :value="item.org_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="默认公司">
          <el-select v-model="userInfo.default_org" placeholder="请选择" style="width:100%">
            <el-option v-for="item in selOrgOptions" :key="item.org_id" :label="item.org_name" :value="item.org_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属角色">
          <el-select v-model="userInfo.role_id" placeholder="请选择" style="width:100%">
            <el-option v-for="item in roleOptions" :key="item.role_id" :label="item.role_name" :value="item.role_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-radio-group v-model="userInfo.user_disabled">
            <el-radio label="0">正常</el-radio>
            <el-radio label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveUser">保存</el-button>
          <el-button @click="dialogFormVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import url from '@/js/common.js'
import '@/assets/css/flex-box.css'
import { getAllOrgs, getAllRoles } from '@/api/comm'
export default {
  data() {
    return {
      searchUser: {
        account: '',
        name: ''
      },
      userData: [],
      multipleSelection: [],
      pageSize: 20,
      currentPage: 1,
      materielSize: 0,
      tableShow: false,
      dialogFormVisible: false,
      required: true,
      userInfo: {
        user_id: 0,
        user_account: '',
        user_displayname: '',
        org_id: [],
        role_id: '',
        user_disabled: '0',
        default_org: ''
      },
      orgOptions: [],
      selOrgOptions: [],
      roleOptions: [],
      rules: {
        user_account: [
          { required: true, message: '请输入帐号', trigger: 'blur' }
        ],
        user_displayname: [
          { required: true, message: '请输入显示名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    searchResult() {
      const searchData = {
        account: this.searchUser.account,
        displayName: this.searchUser.name,
        page: this.currentPage,
        rows: this.pageSize
      }
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
        .post(url.apiUrl() + '/api/User/QueryUserListForPage', searchData)
        .then(function(json) {
          const result = json.data
          if (result.error === '') {
            const data = result.data
            _this.userData = data.rows
            _this.materielSize = data.records
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
    pageSizeChange(val) {
      this.pageSize = val
      this.searchResult()
    },
    currentSizeChange(val) {
      this.currentPage = val
      this.searchResult()
    },
    initEditorForm(callback) {
      axios.all([getAllOrgs(), getAllRoles()])
        .then(axios.spread(function(orgsResult, rolesResult) {
          const orgs = orgsResult.data.data
          const roles = rolesResult.data.data
          callback(orgs, roles)
        }))
    },
    addUser() {
      const _this = this
      _this.initEditorForm((orgs, roles) => {
        _this.methodType = 'add'
        _this.orgOptions = orgs
        _this.roleOptions = roles
        _this.dialogFormVisible = true
        _this.$nextTick(() => {
          _this.$refs.userForm.resetFields()
          _this.userInfo = JSON.parse(_this.defaultUserInfo)
        })
      })
    },
    deleteUsers() {
      if (!this.multipleSelection.length) {
        this.$message.warning('请选择需要删除的用户')
      }
      const _this = this
      const userIds = this.multipleSelection.map(u => {
        return u.user_id
      })
      this.$confirm('是否删除已选择用户？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '放弃'
      })
        .then(() => {
          axios
            .post(url.apiUrl() + '/api/User/Delete', userIds)
            .then(function(json) {
              const result = json.data
              if (result.error === '') {
                _this.searchResult()
              } else {
                _this.$message.error(result.error)
              }
            })
            .catch(function(err) {
              _this.$message.error(err)
            })
        })
        .catch(action => {})
    },
    editor(val) {
      const _this = this
      _this.initEditorForm((orgs, roles) => {
        _this.methodType = 'editor'
        _this.orgOptions = orgs
        _this.roleOptions = roles
        const curSelRoleIds = (val.role_id || '').split(',')
        const selRoles = []
        for (let index = 0; index < curSelRoleIds.length; index++) {
          const roleId = curSelRoleIds[index]
          if (roleId) {
            selRoles.push(Number.parseInt(roleId))
          }
        }
        const curSelOrgIds = (val['org_id'] || '').split(',')
        const curSelOrgDefaults = (val['org_default'] || '').split(',')
        const curSelOrg = {}
        for (let i = 0; i < curSelOrgIds.length; i++) {
          curSelOrg[curSelOrgIds[i]] = curSelOrgDefaults[i]
        }
        const selOrgs = []
        let defaultOrg = ''
        for (const orgId in curSelOrg) {
          if (orgId) {
            const numOrgId = Number.parseInt(orgId)
            selOrgs.push(numOrgId)
            if (curSelOrg[orgId] === '1') {
              defaultOrg = numOrgId
            }
          }
        }
        // console.log(val, _this.userInfo, selOrgs, defaultOrg, selRoles)
        _this.dialogFormVisible = true
        _this.$nextTick(() => {
          _this.$refs.userForm.resetFields()
          _this.userInfo = {
            user_id: val.user_id,
            user_account: val.user_account,
            user_displayname: val.user_displayname,
            org_id: selOrgs,
            role_id: selRoles.length ? selRoles[0] : '',
            user_disabled: val.user_disabled ? '1' : '0',
            default_org: defaultOrg
          }
        })
      })
    },
    resetPwd(val) {
      const _this = this
      axios
        .get(url.apiUrl() + '/api/User/ResetPwd?userId=' + val.user_id)
        .then(function(json) {
          const result = json.data
          if (result.error === '') {
            _this.$message.success('重置成功')
          } else {
            _this.$message.error(result.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    enableOrDisabled(val) {
      const _this = this
      const user = {
        userId: val.user_id,
        disabled: !val.user_disabled
      }
      axios
        .post(url.apiUrl() + '/api/User/Disabled', user)
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
    },
    saveUser() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          const user = {
            userId: this.userInfo.user_id,
            account: this.userInfo.user_account,
            displayName: this.userInfo.user_displayname,
            disabled: this.userInfo.user_disabled === '1',
            orgs: this.userInfo.org_id,
            role: this.userInfo.role_id,
            defaultOrg: this.userInfo.default_org
          }
          console.log(this.userInfo, this.defaultUserInfo, user)
          if (this.methodType === 'add') {
            this.remoteAddUser(user)
          } else if (this.methodType === 'editor') {
            this.remoteEditorUser(user)
          }
        } else {
          return false
        }
      })
    },
    remoteAddUser(user) {
      const _this = this
      axios
        .post(url.apiUrl() + '/api/User/Add', user)
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
    },
    remoteEditorUser(user) {
      const _this = this
      axios
        .post(url.apiUrl() + '/api/User/Editor', user)
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
    },
    orgSelChange(val) {
      if (val.indexOf(this.userInfo.default_org) === -1) {
        this.userInfo.default_org = ''
      }
    }
  },
  mounted() {
    const boxHeight = document.querySelector('.box').clientHeight
    const buttonBoxHeight = document.querySelector('.buttonBox').clientHeight
    const areaBoxHeight = boxHeight - 40 - buttonBoxHeight
    document.querySelector('.tableWraper').style.height = areaBoxHeight + 'px'
    document.querySelector('.tableWraper').style.overflowY = 'auto'
    this.searchResult()
    this.defaultUserInfo = JSON.stringify(this.userInfo)
  },
  watch: {
    'userInfo.org_id': function(val, oldVal) {
      const selOrgs = this.orgOptions.filter(o => {
        return val.indexOf(o.org_id) !== -1
      })
      this.selOrgOptions = selOrgs
    }
  }
}
</script>
<style lang="scss" scoped>
.buttonBox {
  padding: 15px;
}
.searchCondition {
  padding: 0 15px;
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
