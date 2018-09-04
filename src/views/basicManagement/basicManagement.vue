<template>
    <div>
        <el-row class="buttonBox">
            <el-button type="primary" @click="addComanyInfo" size="mini">新增</el-button>
            <el-button type="danger" @click="saveInfo" v-if="saveShow" size="mini">保存</el-button>
            <el-button type="primary" @click="updateInfo" size="mini">修改</el-button>
            <el-button type="primary" @click="deleteCompany" size="mini">删除</el-button>
            <el-button type="primary" size="mini">复制新增</el-button>
            <el-select v-model="value" placeholder="请选择" size="mini">
                <el-option
                v-for="( item , index ) in options"
                :key="index"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" size="mini">管理区域导入</el-button>
            <el-button type="primary" size="mini">附件上传</el-button>
        </el-row>
        <el-row class="buttonBox clearfix">
            <el-col :xs="24" :sm="4" :md="4" class=" l">
                <!-- <el-scrollbar class="tree aa" wrapClass="scrollbar-wrapper"> -->
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                <!-- </el-scrollbar> -->
                
            </el-col>
            <el-col :xs="24" :sm="20" :md="20" class=" l">
                <el-scrollbar class="companyInfos" wrapClass="scrollbar-wrapper">
                
                <el-form :inline="true" label-width="86px" :disabled = "isDisabled" :model="companyInfo" class="demo-form-inline">
                    <el-form-item label="公司代码" size="mini" :required = "required" >
                        <el-input @blur="checkCodeAndName(0)" v-model.trim="companyInfo.companyCode"  placeholder="公司代码"></el-input>
                    </el-form-item>
                    <el-form-item label="公司名称" size="mini" :required = "required" >
                        <el-input @blur="checkCodeAndName(1)" v-model.trim="companyInfo.companyName"  placeholder="公司名称"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" size="mini">
                        <el-input v-model.trim="companyInfo.companyContact" placeholder="公司联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" size="mini">
                        <el-input v-model.trim="companyInfo.companyPhone" placeholder="公司联系电话"></el-input>
                    </el-form-item>
                    <div>
                        <el-form-item label="公司地址" size="mini">
                            <el-autocomplete 
                                popper-class="my-autocomplete"
                                v-model.trim="companyInfo.province"
                                :fetch-suggestions="getProvince"
                                placeholder="请输入内容"
                                
                                @select="selectedProvince"
                                clearable
                                >
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.area_name }}</div>
                                </template>
                            </el-autocomplete>
                        </el-form-item>
                        <el-form-item size="mini">
                            <el-autocomplete 
                                popper-class="my-autocomplete"
                                v-model.trim="companyInfo.city"
                                :fetch-suggestions="getCity"
                                placeholder="请输入内容"
                                @select="selectedCity"
                                clearable>
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.area_name }}</div>
                                </template>
                            </el-autocomplete>
                        </el-form-item>
                        <el-form-item size="mini">
                            <el-autocomplete 
                                popper-class="my-autocomplete"
                                v-model.trim="companyInfo.area"
                                :fetch-suggestions="getArea"
                                placeholder="请输入内容"
                                @select="selectedArea"
                                clearable>
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.area_name }}</div>
                                </template>
                            </el-autocomplete>
                        </el-form-item>
                        <el-form-item size="mini">
                            <el-input v-model.trim="companyInfo.areaInfo" placeholder="地址详情"></el-input>
                        </el-form-item>
                    </div>
                    
                    <el-form-item label="微信账号" size="mini">
                        <el-input v-model.trim="companyInfo.wx" placeholder="公司微信账号"></el-input>
                    </el-form-item>
                    <el-form-item label="支付宝账号" size="mini">
                        <el-input v-model.trim="companyInfo.zfb" placeholder="公司支付宝账号"></el-input>
                    </el-form-item>
                    <el-form-item label="开户行" size="mini">
                        <el-input v-model.trim="companyInfo.openingBank" placeholder="公司开户行"></el-input>
                    </el-form-item>
                    <el-form-item label="银行账号" size="mini">
                        <el-input v-model.trim="companyInfo.bankAccount" placeholder="公司银行账号"></el-input>
                    </el-form-item>
                    <el-form-item label="油卡主卡号" size="mini">
                        <el-input v-model.trim="companyInfo.mainAccount" placeholder="公司油卡主卡号"></el-input>
                    </el-form-item>
                    <el-form-item label="上级公司"   size="mini">
                        <!-- <el-input v-model.trim="companyInfo.higherCompany" placeholder="上级公司"></el-input> -->
                        <el-select v-model="companyInfo.higherCompany"  placeholder="请选择" @change="selectArea">
                            <el-option
                            v-for="(item , index) in options1"
                            :key="index"
                            :label="item.Org_name"
                            :value="item.Org_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                
                <!-- 配送区域 -->
                <!-- <el-row class="buttonBox" size="mini">
                     <el-button type="primary" size="mini">配送区域</el-button>
                </el-row>
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    border
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">

                    <el-table-column type="selection" width="55">
                    </el-table-column>

                    <el-table-column label="序号" width="120">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>

                    <el-table-column prop="name" label="省" width="120">
                    </el-table-column>

                    <el-table-column prop="address" label="市" show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column prop="area" label="区" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <v-table is-horizontal-resize style="width:100%" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff" :cell-edit-done="cellEditDone"></v-table> -->
                </el-scrollbar>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import axios from 'axios'
import url from '@/js/common.js'
import reg from '@/js/reg.js'
import storage from '@/js/localstorage.js'

export default {
  data() {
    return {

      treeClick: '',
      required: true,
      saveShow: false,
      Create_Org_ID: '',
      Create_User_ID: '',
      Edit_User_ID: '',
      value: '',
      options: [

      ],
      options1: '',
      data: [

      ],
      defaultProps: {
        children: 'child',
        label: 'name',
        orgid: 'orgid'
      },
      companyInfo: {
        companyCode: '',
        companyName: '',
        companyContact: '',
        companyPhone: '',
        province: '',
        city: '',
        area: '',
        areaInfo: '',
        wx: '',
        zfb: '',
        openingBank: '',
        bankAccount: '',
        mainAccount: '',
        higherCompany: ''
      },
      isDisabled: true,
      tableData3: [
        {
          date: '1',
          name: '上海市',
          address: '上海市',
          area: '嘉定区'
        },
        {
          date: '2',
          name: '安徽省',
          address: '11',
          area: '11'
        }
      ],
      multipleSelection: [],
      dialogFormVisible: false,
      addOrd: '',
      addcomInfo: [{
        org_id: '',
        org_code: '',
        org_name: '',
        contact_name: '',
        contact_phone: '',
        org_province: '',
        org_city: '',
        org_district: '',
        org_address: '',
        wechat_account: '',
        alipay_account: '',
        deposit_bank: '',
        deposit_account: '',
        fuel_card: '',
        parent_org_id: '',
        Create_Time: '',
        Create_Org_ID: '',
        Create_User_ID: '',
        Edit_User_ID: '',
        Edit_Time: '',
        Edit_Org_ID: ''
      }],
      orgid: '',
      options: [
        {
          value: '0',
          label: '地址1'
        },
        {
          value: '1',
          label: '地址2'
        }
      ],
      value: '',
      tableData: [
        { 'name': 'a', 'tel': '上海', 'hobby': '上海1', 'address': '上海2' }
      ],
      columns: [
        { width: 60, titleAlign: 'center', columnAlign: 'center', type: 'selection' },
        { field: 'name', title: '序号', width: 80, titleAlign: 'center', columnAlign: 'center', isEdit: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return `<span class='cell-edit-color'>${rowData[field]}</span>`
          }, isResize: true },
        { field: 'tel', title: '省', width: 150, titleAlign: 'center', columnAlign: 'center', isEdit: true, isResize: true },
        { field: 'hobby', title: '市', width: 150, titleAlign: 'center', columnAlign: 'center', isEdit: true, isResize: true },
        { field: 'address', title: '区', width: 150, titleAlign: 'center', columnAlign: 'left', isEdit: true, isResize: true }
      ],
      getAreaInfo: [],
      selectProvinceId: '',
      selectCityId: '',
      selectAreaId: '',
      selectInfoId: '',
      selectedCompany: '',
      allCompanyInfo: '',
      isCode: false,
      isName: false,
      oldCode: '',
      oldName: ''
    }
  },
  methods: {
    getProvince(queryString, cb) { // 点击省
      axios.post(url.apiUrl() + '/api/MetadataArea/MetadataProvince')
        .then(function(val) {
          if (val.data.error == '') {
            cb(val.data.data)
          } else {
            _this.$message.error(val.data.error)
          }
        })
    },
    selectedProvince(val) { // 省对应的列表点击显示数据
      this.companyInfo.province = val.area_name
      this.selectProvinceId = val.area_id
    },
    getCity(queryString, cb) { // 点击省areaid 获取市数据
      if (this.companyInfo.province == '') {
        this.$message.error('请先选择省!')
      } else {
        axios.post(url.apiUrl() + '/api/MetadataArea/MetadataCity?area_id=' + this.selectProvinceId)
          .then(function(val) {
            if (val.data.error == '') {
              cb(val.data.data)
            } else {
              _this.$message.error(val.data.error)
            }
          })
      }
    },
    selectedCity(val) { // 市下拉框选择时给下拉框赋值
      this.companyInfo.city = val.area_name
      this.selectCityId = val.area_id
    },
    getArea(queryString, cb) { // 点击市areaid 获取县数据
      if (this.companyInfo.city == '') {
        this.$message.error('请先选择市!')
      } else {
        axios.post(url.apiUrl() + '/api/MetadataArea/MetadataArea?area_id=' + this.selectCityId)
          .then(function(val) {
            if (val.data.error == '') {
              cb(val.data.data)
            } else {
              _this.$message.error(val.data.error)
            }
          })
      }
    },
    selectedArea(val) { // 市下拉框选择时给下拉框赋值
      this.companyInfo.area = val.area_name
      this.selectAreaId = val.area_id
    },

    handleNodeClick(data) { // 树形菜单点击获取对应的数据
      this.treeClick = data.orgid
      this.searchByOrgId(data.orgid)
      this.selectedCompany = data.orgid
      console.log(JSON.stringify(data))
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getAllCompany() { // 获取所以公司数据
      axios.get(url.apiUrl() + '/api/Org/GetAllOrgs')
        .then(data => {
          const msg = data.data
          if (msg.error != '') {

          }
        })
        .catch(data => {
          this.$message.error(data.data.error)
        })
    },
    addComanyInfo() { // 点击按钮区域新增是信息可编辑 && 重置信息
      // this.dialogFormVisible = true;
      this.saveShow = true //
      this.selectedCompany = '' //
      this.isCode = false
      this.isName = false

      this.isDisabled = false
      this.companyInfo.companyCode = ''
      this.companyInfo.companyName = ''
      this.companyInfo.companyContact = ''
      this.companyInfo.companyPhone = ''
      this.companyInfo.companyPhone = ''
      this.companyInfo.province = ''
      this.companyInfo.city = ''
      this.companyInfo.area = ''
      this.companyInfo.areaInfo = ''
      this.companyInfo.wx = ''
      this.companyInfo.zfb = ''
      this.companyInfo.openingBank = ''
      this.companyInfo.bankAccount = ''
      this.companyInfo.mainAccount = ''
      this.companyInfo.higherCompany = ''
    },
    updateInfo() { // 点击修改修改公司信息
      if (this.treeClick == '') {
        this.$message.error('请先选择左边的公司才能继续操作!')
      } else {
        this.isDisabled = false
        this.saveShow = true

        this.isCode = false
        this.isName = false
      }
    },
    // /////////////////////////////////////////////
    saveInfo() { // 点击保存修改公司信息
      let date = new Date(), _this = this
      const o = {
        'y': date.getFullYear(), // 年份
        'M': date.getMonth() + 1, // 月份
        'd': date.getDate(), // 日
        'h': date.getHours(), // 小时
        'm': date.getMinutes(), // 分
        's': date.getSeconds(), // 秒
        'q': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      const time = o.y + '-' + o.M + '-' + o.d + ' ' + o.h + ':' + o.m + ':' + o.s

      if (this.selectedCompany == '') {
        const data1 = {
          Org_id: this.selectedCompany,
          Org_code: _this.companyInfo.companyCode,
          Org_name: _this.companyInfo.companyName,
          Contact_name: _this.companyInfo.companyContact,
          Contact_phone: _this.companyInfo.companyPhone,
          Org_province: _this.selectProvinceId,
          Org_city: _this.selectCityId,
          Org_district: _this.selectAreaId,
          Org_address: _this.companyInfo.areaInfo,
          Wechat_account: _this.companyInfo.wx,
          Alipay_account: _this.companyInfo.zfb,
          Deposit_bank: _this.companyInfo.openingBank,
          Deposit_account: _this.companyInfo.bankAccount,
          Fuel_card: _this.companyInfo.mainAccount,
          Parent_org_id: _this.companyInfo.higherCompany ? _this.companyInfo.higherCompany : 0,
          Create_time: time,
          Create_org_id: this.Create_Org_ID,
          Create_user_id: this.Create_User_ID,
          Edit_user_id: '',
          Edit_time: time,
          Edit_org_id: ''
        }
        if (this.companyInfo.companyCode == '' || this.companyInfo.companyName == '') {
          this.$message.error('带*的为必填项,请填写后再保存!')
        } else {
          if (_this.isName == true && _this.isCode == true) {
            axios.post(url.apiUrl() + '/api/MetadataOrg/MetadataOrgAdd', data1)
              .then(function(val) {
                if (val.data.error == '') {
                  _this.$message({
                    message: '添加成功!',
                    type: 'success'
                  })
                  _this.saveShow = false
                  _this.init()
                  _this.isDisabled = true
                } else {
                  _this.$message.error(val.data.error)
                }
              })
              .catch(function(data) {
                this.$message.error(data.data.error)
              })
          } else {
            _this.$message({
              type: 'warning',
              message: '代码或名称重复,请修改后再试!'
            })
          }
        }
      } else {
        const data1 = {
          Org_id: this.selectedCompany,
          Org_code: _this.companyInfo.companyCode,
          Org_name: _this.companyInfo.companyName,
          Contact_name: _this.companyInfo.companyContact,
          Contact_phone: _this.companyInfo.companyPhone,
          Org_province: _this.selectProvinceId,
          Org_city: _this.selectCityId,
          Org_district: _this.selectAreaId,
          Org_address: _this.companyInfo.areaInfo,
          Wechat_account: _this.companyInfo.wx,
          Alipay_account: _this.companyInfo.zfb,
          Deposit_bank: _this.companyInfo.openingBank,
          Deposit_account: _this.companyInfo.bankAccount,
          Fuel_card: _this.companyInfo.mainAccount,
          Parent_org_id: _this.companyInfo.higherCompany ? _this.companyInfo.higherCompany : 0,
          Create_time: time,
          Create_org_id: this.Create_Org_ID,
          Create_user_id: this.Create_User_ID,
          Edit_user_id: this.Create_User_ID,
          Edit_time: time,
          Edit_org_id: this.Create_Org_ID
        }
        if (this.companyInfo.companyCode == '' || this.companyInfo.companyName == '') {
          this.$message.error('带*的为必填项,请填写后再保存!')
        } else {
          axios.post(url.apiUrl() + '/api/MetadataOrg/MetadataOrgUpdate', data1)
            .then(function(val) {
              if (val.data.error == '') {
                _this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                _this.saveShow = false
                _this.init()
                _this.isDisabled = true
              } else {
                _this.$message.error(val.data.error)
              }
            })
            .catch(function(data) {
              this.$message.error(data.data.error)
            })
        }
      }
    },
    init() { // 初始化获取树形菜单
      const _this = this
      axios.get(url.apiUrl() + '/api/MetadataOrg/GetAllOrg')
        .then(function(val) {
          _this.data = val.data.data
        })
        .catch(function(data) {
          this.$message.error(data.data.error)
        })
    },
    selectArea(val) { // 上级公司点击选择
      this.companyInfo.higherCompany = val
    },
    searchByOrgId(val) { // 点击树形菜单 右边展现对应结果
      const _this = this
      this.getParentCompanyList()
      this.saveShow = false
      this.isDisabled = true
      axios.post(url.apiUrl() + '/api/MetadataOrg/GeOrgId?org_id=' + val)
        .then(data => {
          const msg = data.data
          const msg1 = data.data.data[0]
          if (msg.error == '') {
            console.log(msg1)
            // ///////// 点击树形菜单时获取公司代码和公司名称 为后面做对比
            _this.oldCode = msg1.o.Org_code
            _this.oldName = msg1.o.Org_name
            // /////////////
            _this.companyInfo.companyCode = msg1.o.Org_code
            _this.companyInfo.companyName = msg1.o.Org_name
            _this.companyInfo.companyContact = msg1.o.Contact_name
            _this.companyInfo.companyPhone = msg1.o.Contact_phone
            _this.companyInfo.province = msg1.Org_province
            _this.companyInfo.city = msg1.Org_city
            _this.companyInfo.area = msg1.Org_district
            _this.companyInfo.areaInfo = msg1.o.Org_address
            _this.companyInfo.wx = msg1.o.Wechat_account
            _this.companyInfo.zfb = msg1.o.Alipay_account
            _this.companyInfo.openingBank = msg1.o.Deposit_bank
            _this.companyInfo.bankAccount = msg1.o.Deposit_account
            _this.companyInfo.mainAccount = msg1.o.Fuel_card
            _this.companyInfo.higherCompany = msg1.o.Parent_org_id == 0 ? '' : msg1.o.Parent_org_id
            _this.getParentCompanyList()
          } else {
            this.$message.error(msg.error)
          }
        })
        .catch(data => {
          this.$message.error(data.data.error)
        })
    },
    getParentCompanyList() { // 获取上级公司列表
      const _this = this
      axios.post(url.apiUrl() + '/api/MetadataOrg/GeOrgs')
        .then(data => {
          const msg = data.data.data
          _this.options1 = msg
        })
        .catch(data => {
          this.$message.error(data.data.error)
        })
    },
    deleteCompany() { // 删除公司
      const _this = this
      const orgid = this.treeClick
      if (orgid == '') {
        this.$message.error('清先选择左边的公司才能继续删除!')
      } else {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(url.apiUrl() + '/api/MetadataOrg/MetadataOrgDel?org_id=' + orgid)
            .then(data => {
              const msg = data.data
              if (msg.error == '') {
                _this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                _this.treeClick = ''
                _this.init()
              } else {
                this.$message.error(msg.error)
              }
            })
            .catch(data => {
              this.$message.error(data.data.error)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        })
      }
    },
    cellEditDone(newValue, oldValue, rowIndex, rowData, field) { // 单元格选中之后进行的回调
      this.tableData[rowIndex][field] = newValue
    },
    checkCodeAndName(str) { // 检查是否名称或代码是否存在
      const _this = this

      // 判断是否是左边点击进入详情
      if (this.treeClick) {
        if (this.companyInfo.companyCode == this.oldCode && this.companyInfo.companyName == this.oldName) { // 判断公司代码和公司名称是否修改
          _this.isCode = true
          _this.isName = true
        } else {
          if (str == 0) {
            const data1 = {
              org_code: _this.companyInfo.companyCode,
              org_name: ''
            }
            axios.post(url.apiUrl() + '/api/MetadataOrg/OrgisAny', data1)
              .then(val => {
                console.log(val)
                if (val.data.data == true) {
                  _this.$message({
                    type: 'warning',
                    message: '公司代码重复!'
                  })
                  _this.isCode = false
                } else {
                  _this.isCode = true
                }
              })
              .catch(val => {
                _this.$message.error(val.data.error)
              })
          } else {
            const data1 = {
              org_code: '',
              org_name: _this.companyInfo.companyName
            }
            axios.post(url.apiUrl() + '/api/MetadataOrg/OrgisAny', data1)
              .then(val => {
                console.log(val)
                if (val.data.data == true) {
                  _this.$message({
                    type: 'warning',
                    message: '公司名称重复!'
                  })
                  _this.isName = false
                } else {
                  _this.isName = true
                }
              })
              .catch(val => {
                _this.$message.error(val.data.error)
              })
          }
        }
      } else {
        if (str == 0) {
          const data1 = {
            org_code: _this.companyInfo.companyCode,
            org_name: ''
          }
          axios.post(url.apiUrl() + '/api/MetadataOrg/OrgisAny', data1)
            .then(val => {
              console.log(val)
              if (val.data.data == true) {
                _this.$message({
                  type: 'warning',
                  message: '公司代码重复!'
                })
                _this.isCode = false
              } else {
                _this.isCode = true
              }
            })
            .catch(val => {
              _this.$message.error(val.data.error)
            })
        } else {
          const data1 = {
            org_code: '',
            org_name: _this.companyInfo.companyName
          }
          axios.post(url.apiUrl() + '/api/MetadataOrg/OrgisAny', data1)
            .then(val => {
              console.log(val)
              if (val.data.data == true) {
                _this.$message({
                  type: 'warning',
                  message: '公司名称重复!'
                })
                _this.isName = false
              } else {
                _this.isName = true
              }
            })
            .catch(val => {
              _this.$message.error(val.data.error)
            })
        }
      }
    }
  },
  mounted() {
    this.getAllCompany()
    const loginInfo = JSON.parse(storage.getStorage('currentUser'))
    this.Create_Org_ID = loginInfo.orgId
    this.Create_User_ID = loginInfo.userId
    console.log(JSON.parse(storage.getStorage('userInfo')).roles[0].modules[5])
    this.init()
    // ////////////////////
    const bodyWidth = document.body.clientHeight
    const buttonBoxHeight = document.querySelector('.buttonBox').clientHeight
    const areaBoxHeight = bodyWidth - 114 - buttonBoxHeight
    console.log(areaBoxHeight)
    // document.querySelector('.tree').style.height = areaBoxHeight + 'px'
    // document.querySelector('.tree').style.overflowY = 'auto'
    // document.querySelector('.tree').style.overflowX = 'hidden'
    document.querySelector('.companyInfos').style.height = areaBoxHeight + 'px'
    document.querySelector('.companyInfos').style.overflowY = 'auto'
    document.querySelector('.companyInfos').style.overflowX = 'hidden'
  }
}
</script>
<style lang="scss" scoped>
.buttonBox{
    padding: 15px;
    .tree{
        width: 200px;
    }
    .companyInfos{
        // width:-moz-calc(100% - 200px);
        // width:-webkit-calc(100% - 200px); 
        // width: calc(100% - 200px);
        overflow-x: hidden;
    }
}
.aa{
  overflow-x: hidden!important;
}
.l{
    float:left;
}
.clearfix:before, .clearfix:after { content: " "; display: block; height: 0; overflow: hidden; }  
.clearfix:after { clear: both; }  
.clearfix { zoom: 1; } 
// ::-webkit-scrollbar{width:0px;height:0px;}
</style>


