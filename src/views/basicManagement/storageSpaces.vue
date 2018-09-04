<template>
    <div class="box">
       <el-row class="buttonBox clearfix">
            <div class="clearfix">
                <el-button type="primary" @click="addComanyInfo" size="mini">新增</el-button>
                <el-button type="primary" @click="deleteCompany" size="mini">删除</el-button>
                <el-button type="primary" @click="importFile" size="mini">批量导入</el-button>
                <el-select v-model="printValue" size="small" placeholder="请选择" class="r">
                    <el-option
                    v-for="item in print"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
                    <el-form-item label="所属公司" size="mini">
                        <el-select clearable v-model="customerSelected" filterable placeholder="请选择" @change="selectCustomer">
                            <el-option
                            v-for="item in customerList"
                            :key="item.value"
                            :label="item.Org_name"
                            :value="item.Org_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="所属仓间" size="mini">
                        <el-input v-model="searchCondition.warehouse_id" placeholder="请输入承运商名称"></el-input>
                    </el-form-item> -->
                    <el-form-item label="所属仓间" size="mini">
                        <el-select clearable v-model="searchCondition.warehouse_id" filterable placeholder="请选择" @change="selectCustomer">
                            <el-option
                            v-for="item in WarehouseList"
                            :key="item.value"
                            :label="item.w.warehouse_name"
                            :value="item.w.warehouse_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属库区" size="mini">
                        <el-autocomplete
                            clearable
                            popper-class="my-autocomplete"
                            v-model.trim="searchCondition.warehousearea_id"
                            :fetch-suggestions="getReservoirArea"
                            placeholder=""
                            @select="selectedProvince">
                            <template slot-scope="{ item }">
                                <div class="name">{{ item.w.warehousearea_name }}</div>
                            </template>
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item size="mini">
                        <el-button type="primary" @click="searchResult">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-row>
        <div class="searchCondition">
            <el-scrollbar class="tableWraper"  wrapClass="scrollbar-wrapper">
                <el-table
                    class="table"
                    ref="multipleTable"
                    :data="tableData3"
                     height="100%"
                    max-height="100%"
                    tooltip-effect="dark"
                    size="mini"
                    style="width: 100%"
                    :summary-method="aa"
                    show-summary
                    border
                    @select = "checkbox"
                    @select-all = "checkboxAll"
                    @cell-dblclick="doubleEvents"
                    @selection-change="handleSelectionChange">

                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    
                    <el-table-column
                        label="序号"
                        type="index"
                        width="50">
                    </el-table-column>

                    <el-table-column
                        
                        prop="Org_name"
                        label="所属网点"
                        width="120">
                    </el-table-column>

                    <el-table-column
                        
                        prop="warehouse_name"
                        label="所属仓间"
                        show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                       
                        prop="warehousearea_name"
                        label="所属库区" 
                        show-overflow-tooltip>
                    </el-table-column>

                     <el-table-column
                       
                        prop="w.warehouselocation_code"
                        label="储位代码" 
                        show-overflow-tooltip>
                    </el-table-column>

                     <el-table-column
                       
                        prop="w.warehouselocation_name"
                        label="储位名称" 
                        show-overflow-tooltip>
                    </el-table-column>

                     <!-- <el-table-column
                       
                        prop="w.warehouse_name"
                        label="储位条码" 
                        show-overflow-tooltip>
                    </el-table-column> -->
                </el-table>
                
            </el-scrollbar>
            <div class="clearfix d-flex justify-content-center">
                <el-button type="primary" @click="search" class="l" size="mini">搜索</el-button>
                <el-pagination
                    background
                    @size-change="pageSizeChange"
                    @current-change="currentSizeChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[10, 20, 50, 100 , materielSize > 1000 ? materielSize : 1000]"
                    :page-size="pageSize"
                    class="l"
                    layout="total , sizes, prev, pager, next"
                    :total = "materielSize"
                    >
                </el-pagination>
            </div>
        </div>
        <el-dialog title="储位管理详情" :visible.sync="dialogFormVisible">
            <div class="clearfix">
                <!-- <el-button type="primary" @click="addComanyInfo1" v-if="isShow" size="mini">新增</el-button> -->
                <el-button type="primary" @click="updateInfo1" v-if="isShow"  size="mini">修改</el-button>
                <el-button type="danger" @click="saveInfo1" size="mini" v-if="saveShow1">保存</el-button>
                <el-button type="primary" @click="cancelInfo1" v-if="isShow" size="mini">取消</el-button>
                <el-button type="primary" @click="deleteCompany1" v-if="isShow"  size="mini">删除</el-button>
            </div>
            <div class="clearfix materielInfo">
                <el-form :inline="true" label-width="106px" :disabled = "isDisabled1" :model="areaInfo1" class="demo-form-inline">
                    <!-- <el-form-item label="所属仓间" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.warehouse_id"  placeholder="请输入承运商代码"></el-input>
                    </el-form-item> -->
                    <el-form-item label="所属仓间" size="mini" :required = "required1">
                        <el-select v-model="areaInfo1.warehouse_id" filterable placeholder="请选择" @change="selectCustomer">
                            <el-option
                            v-for="item in WarehouseList"
                            :key="item.value"
                            :label="item.w.warehouse_name"
                            :value="item.w.warehouse_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="所属库区" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.warehousearea_id"  placeholder="请输入承运商名称"></el-input>
                    </el-form-item> -->
                     <el-form-item label="所属库区" size="mini" :required = "required1">
                        <!-- <el-select v-model="areaInfo1.warehousearea_id" filterable placeholder="请选择" @change="selectCustomer">
                            <el-option
                            v-for="item in maskOfWarehouseAreaList"
                            :key="item.value"
                            :label="item.w.warehousearea_name"
                            :value="item.w.warehousearea_id">
                            </el-option>
                        </el-select> -->
                        <el-autocomplete
                            popper-class="my-autocomplete"
                            v-model.trim="areaInfo1.warehousearea_id"
                            :fetch-suggestions="getReservoirArea1"
                            placeholder=""
                            @select="selectedProvince1">
                            <template slot-scope="{ item }">
                                <div class="name">{{ item.w.warehousearea_name }}</div>
                            </template>
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item label="储位代码" size="mini" :required = "required1" >
                        <el-input @blur="checkCodeAndName(0)" v-model.trim="areaInfo1.warehouselocation_code"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="储位名称" size="mini" :required = "required1" >
                        <el-input @blur="checkCodeAndName(1)" v-model.trim="areaInfo1.warehouselocation_name"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="储位条码" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.warehouse_keeper"  placeholder="请输入承运商联系人"></el-input>
                    </el-form-item> -->
                     <el-form-item label="所属公司" size="mini" >
                        <el-select v-model="areaInfo1.org_id" filterable placeholder="请选择" @change="selectCustomer">
                            <el-option
                            v-for="item in customerMaskList"
                            :key="item.value"
                            :label="item.Org_name"
                            :value="item.Org_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
import url from '@/js/common.js'
import storage from '@/js/localstorage.js'
import '@/assets/css/flex-box.css'
export default {
  data() {
    return {
      printValue: '',
      print: [
        {
          label: '打印1',
          value: '1'
        },
        {
          label: '打印2',
          value: '2'
        },
        {
          label: '打印3',
          value: '3'
        }
      ],
      searchCondition: {
        user: '',
        code: '',
        name: ''
      },
      customerSelected: '',
      customerList: [

      ],
      tableData3: [
        {
          carrier_id: '1',
          carrier_code: '1',
          carrier_name: '1',
          contact_name: '1',
          contact_phone: '1',
          carrier_province: '1',
          carrier_city: '1',
          carrier_district: '1',
          carrier_address: '1',
          wechat_account: '1',
          alipay_account: '1',
          deposit_bank: '1',
          deposit_holder: '1',
          deposit_account: '1',
          invoice_taxrate: '1',
          org_id: '1',
          city: '1',
          area: '1',
          areaInfo: '1'
        }
      ],
      pageSize: 10,
      currentPage: 1,
      materielSize: 0,
      dialogFormVisible: false,
      areaInfo1: {
        warehouse_id: '',
        warehousearea_id: '',
        warehouselocation_code: '',
        warehouselocation_name: '',
        org_id: ''
      },
      required1: true,
      isDisabled1: true,
      isShow: false,
      saveShow1: false,
      Create_Org_ID: '',
      Create_User_ID: '',
      newAdd: false,
      selectProvinceId: '',
      selectCityId: '',
      selectAreaId: '',
      checkboxSelected: '',
      customerMaskList: '',
      WarehouseAreaList: '',
      maskOfWarehouseAreaList: '',
      WarehouseList: '',
      maskOfWarehouseList: '',
      isCode: false,
      isName: false,
      oldCode: '',
      oldName: ''
    }
  },
  methods: {
    aa(val) {
      // return [1,2]
      const { columns, data } = val
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        if (index === 1) {
          sums[index] = '个数'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    },
    selectedProvince(val) { // 库区根据仓间获取数据
      this.searchCondition.warehousearea_id = val.w.warehousearea_name
      // this.selectProvinceId = val.area_id
    },
    selectedProvince1(val) { // 库区新增根据仓间获取数据
      this.areaInfo1.warehousearea_id = val.w.warehousearea_name
      // this.selectProvinceId = val.area_id
    },
    addComanyInfo() { // 新增
      this.dialogFormVisible = true
      this.isShow = false
      this.saveShow1 = true
      let date = new Date(), _this = this
      this.isDisabled1 = false
      this.newAdd = false

      // 点击新增 先清空操作
      this.areaInfo1.warehouse_id = ''
      this.areaInfo1.warehousearea_id = ''
      this.areaInfo1.warehouselocation_code = ''
      this.areaInfo1.warehouselocation_name = ''
      this.areaInfo1.org_id = ''
      // 保存当前登陆公司为默认公司
      this.areaInfo1.org_id = this.Create_Org_ID
    },
    deleteCompany() { // 删除
      const _this = this
      if (this.checkboxSelected == '' || this.checkboxSelected == null) {
        _this.$message.error('请先勾选才能进行删除操作!')
      } else {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(url.apiUrl() + '/api/WarehouseLocation/WarehouseLocationDel?warehouselocation_id=' + this.checkboxSelected)
            .then(function(val) {
              if (val.data.error == '') {
                _this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                _this.init()
                _this.checkboxSelected = ''
              } else {
                _this.$message.error(val.data.error)
              }
            })
            .catch(function(data) {
              _this.$message.error('获取数据失败,请稍后再试16!')
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        })
      }
    },
    importFile() { // 批量导入
      this.$message({
        message: '暂未开放',
        type: 'warning'
      })
    },
    selectCustomer(value) {
      console.log(value, this.customerSelected)
    },
    searchResult() { // 查询操作
      this.init()
    },
    getReservoirArea(msg, cb) { // 获取所属库区列表
      let data1 = {
          warehouse_id: this.searchCondition.warehouse_id,
          Page: 1,
          Rows: 100
        }, _this = this
      axios.post(url.apiUrl() + '/api/WarehouseArea/WarehouseAreaList', data1)
        .then(function(val) {
          console.info(val)
          if (val.data.error == '') {
            cb(val.data.data.rows)
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error('获取数据失败,请稍后再试13!')
        })
    },
    getReservoirArea1(msg, cb) { // 获取所属库区列表
      let data1 = {
          warehouse_id: this.areaInfo1.warehouse_id,
          Page: 1,
          Rows: 100
        }, _this = this
      axios.post(url.apiUrl() + '/api/WarehouseArea/WarehouseAreaList', data1)
        .then(function(val) {
          console.info(val)
          if (val.data.error == '') {
            cb(val.data.data.rows)
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error('获取数据失败,请稍后再试13!')
        })
    },
    getWarehouseList(msg) { // 获取所属仓间列表
      let data1 = {
          Page: 1,
          Rows: 100
        }, _this = this
      axios.post(url.apiUrl() + '/api/Warehouse/WarehouseList', data1)
        .then(function(val) {
          // console.log(val)
          if (val.data.error == '') {
            if (msg == 0) {
              _this.WarehouseList = val.data.data.rows
            } else {
              _this.maskOfWarehouseList = val.data.data.rows
            }

            // console.log(JSON.stringify( val.form-view-data))
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error('获取数据失败,请稍后再试12!')
        })
    },
    // getMaskReservoirArea(){  // 获取弹窗所属库区
    //     let data1 = {
    //         Page: 1,
    //         Rows: 10
    //     },_this = this;
    //     axios.post(url.apiUrl() + '/api/WarehouseArea/WarehouseAreaList' , data1)
    //     .then(function(val) {
    //         console.log(val)
    //         if (val.data.error == '') {

    //             console.log(JSON.stringify( val.form-view-data))
    //         } else {
    //             _this.$message.error(val.data.error)
    //         }
    //     })
    //     .catch(function(data) {
    //         _this.$message.error("获取数据失败,请稍后再试13!")
    //     })
    // },
    init() { // 获取数据
      let data1 = {
          org_id: this.customerSelected,
          warehousearea_id: this.searchCondition.warehousearea_id,
          warehouse_id: this.searchCondition.warehouse_id,
          Page: this.currentPage,
          Rows: this.pageSize
        }, _this = this
      let loading
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
      axios.post(url.apiUrl() + '/api/WarehouseLocation/WarehouseLocationList', data1)
        .then(function(val) {
          if (val.data.error == '') {
            _this.areaOptions = val.data.data
            _this.tableData3 = val.data.data.rows
            _this.materielSize = val.data.data.total
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error('获取数据失败,请稍后再试14!')
        })
    },
    currentSizeChange(val) { // 当前选择第几页
      this.currentPage = val
      this.init()
    },
    getCompanyList() { // 获取所属公司所以数据
      const _this = this
      axios.post(url.apiUrl() + '/api/MetadataOrg/GeOrgs')
        .then(function(val) {
          _this.customerList = val.data.data
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    checkbox(val) { // 用户手动勾选checkbox的勾选操作
      this.checkboxSelected = val[0].w.warehouselocation_id
      // console.log(JSON.stringify(val))
    },
    checkboxAll(val) { // 用户点击全选checkbox的操作
      // this.checkboxSelected = val;
      this.$message.error('暂不支持多选操作')
      return false
    },
    doubleEvents(obj) { // 双击信息进行的操作
      console.log(JSON.stringify(obj))
      this.dialogFormVisible = true
      this.saveShow1 = false
      this.isShow = true
      this.newAdd = true
      this.isDisabled1 = true

      this.oldCode = obj.w.warehouselocation_code
      this.oldName = obj.w.warehouselocation_name

      this.checkboxSelected = obj.w.warehouselocation_id //  对承运商 id 赋值
      this.areaInfo1.warehouse_id = obj.w.warehouse_id
      this.areaInfo1.warehousearea_id = obj.w.warehousearea_id
      this.areaInfo1.warehouselocation_code = obj.w.warehouselocation_code
      this.areaInfo1.warehouselocation_name = obj.w.warehouselocation_name
      this.areaInfo1.org_id = obj.w.org_id
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    pageSizeChange(val) { //   选择每页展示的页数大小
      this.pageSize = val
      this.init()
    },
    // ///////////////////////////////
    getMaskCompany() { // 弹窗中的 所属网点
      const _this = this
      axios.post(url.apiUrl() + '/api/MetadataOrg/GeOrgs')
        .then(function(val) {
          _this.customerMaskList = val.data.data
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    search() {
      this.$message.error('暂未开放!')
    },
    checkCodeAndName(str) { // 检查是否名称或代码是否存在
      const _this = this

      // 判断是否是左边点击进入详情
      console.log(this.oldCode, this.oldName)
      if (this.oldCode != '' || this.oldName != '') {
        if (this.areaInfo1.warehouselocation_code == this.oldCode && this.areaInfo1.warehouselocation_name == this.oldName) { // 判断公司代码和公司名称是否修改
          _this.isCode = true
          _this.isName = true
        } else {
          if (str == 0) {
            const data1 = {
              code: _this.areaInfo1.warehouselocation_code,
              name: ''
            }
            axios.post(url.apiUrl() + '/api/WarehouseLocation/isAny', data1)
              .then(val => {
                console.log(val)
                if (val.data.data == true) {
                  _this.$message({
                    type: 'warning',
                    message: '储位代码重复!'
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
              code: '',
              name: _this.areaInfo1.warehouselocation_name
            }
            axios.post(url.apiUrl() + '/api/WarehouseLocation/isAny', data1)
              .then(val => {
                console.log(val)
                if (val.data.data == true) {
                  _this.$message({
                    type: 'warning',
                    message: '储位名称重复!'
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
            code: _this.areaInfo1.warehouselocation_code,
            name: ''
          }
          axios.post(url.apiUrl() + '/api/WarehouseLocation/isAny', data1)
            .then(val => {
              console.log(val)
              if (val.data.data == true) {
                _this.$message({
                  type: 'warning',
                  message: '储位代码重复!'
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
            code: '',
            name: _this.areaInfo1.warehouselocation_name
          }
          axios.post(url.apiUrl() + '/api/WarehouseLocation/isAny', data1)
            .then(val => {
              console.log(val)
              if (val.data.data == true) {
                _this.$message({
                  type: 'warning',
                  message: '储位名称重复!'
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
    },
    saveInfo1() { // 弹窗的保存操作
      // this.newAdd = false ;
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
        }, time = o.y + '-' + o.M + '-' + o.d + ' ' + o.h + ':' + o.m + ':' + o.s
      if (this.newAdd) {
        const data1 = {
          warehouselocation_id: this.checkboxSelected,
          warehouselocation_code: this.areaInfo1.warehouselocation_code,
          warehouselocation_name: this.areaInfo1.warehouselocation_name,
          warehousearea_id: this.areaInfo1.warehousearea_id,
          warehouse_id: this.areaInfo1.warehouse_id,
          org_id: this.areaInfo1.org_id,
          Create_Time: time,
          Create_Org_ID: this.Create_Org_ID,
          Create_User_ID: this.Create_User_ID,
          Edit_User_ID: this.Create_User_ID,
          Edit_Time: time,
          Edit_Org_ID: this.Create_Org_ID
        }
        axios.post(url.apiUrl() + '/api/WarehouseLocation/WarehouseLocationUpdate', data1)
          .then(val => {
            if (val.data.error == '') {
              _this.$message({
                message: '添加成功!',
                type: 'success'
              })
              _this.printValue = ''
              _this.dialogFormVisible = false
              _this.init()
              this.oldCode = ''
              this.oldName = ''
            }
          })
          .catch(val => {
            _this.$message.error('数据获取错误,请过一段时间重试!')
          })
      } else {
        const data1 = {
          warehouselocation_id: '',
          warehouselocation_code: this.areaInfo1.warehouselocation_code,
          warehouselocation_name: this.areaInfo1.warehouselocation_name,
          warehousearea_id: this.areaInfo1.warehousearea_id,
          warehouse_id: this.areaInfo1.warehouse_id,
          org_id: this.areaInfo1.org_id,
          Create_Time: time,
          Create_Org_ID: this.Create_Org_ID,
          Create_User_ID: this.Create_User_ID,
          Edit_User_ID: '',
          Edit_Time: time,
          Edit_Org_ID: ''
        }
        if (this.areaInfo1.warehouse_id == '' || this.areaInfo1.warehousearea_id == '' || this.areaInfo1.warehouselocation_code == '' || this.areaInfo1.warehouselocation_name == '') {
          this.$message.error('带*的为必填项,请填写后再保存!')
        } else {
          axios.post(url.apiUrl() + '/api/WarehouseLocation/WarehouseLocationAdd', data1)
            .then(val => {
              if (val.data.error == '') {
                _this.$message({
                  message: '添加成功!',
                  type: 'success'
                })
                _this.printValue = ''
                _this.dialogFormVisible = false
                _this.init()
              }
            })
            .catch(val => {
              _this.$message.error('数据获取错误,请过一段时间重试!')
            })
        }
      }
    },
    updateInfo1() { // 点击修改使内容可编辑
      this.isDisabled1 = false
      this.saveShow1 = true
    },
    cancelInfo1() { // 取消操作
      this.dialogFormVisible = false
    },
    deleteCompany1() { // 弹窗 删除操作
      const _this = this
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post(url.apiUrl() + '/api/WarehouseLocation/WarehouseLocationDel?warehouselocation_id=' + this.checkboxSelected)
          .then(function(val) {
            if (val.data.error == '') {
              _this.$message({
                message: '删除成功!',
                type: 'success'
              })
              _this.dialogFormVisible = false
              _this.checkboxSelected = ''
              _this.init()
            } else {
              _this.$message.error(val.data.error)
            }
          })
          .catch(function(data) {
            _this.$message.error('获取数据失败,请稍后再试15!')
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    }
  },
  mounted() {
    const loginInfo = JSON.parse(storage.getStorage('currentUser'))
    this.Create_Org_ID = loginInfo.orgId
    this.Create_User_ID = loginInfo.userId

    const boxHeight = document.querySelector('.box').clientHeight
    const buttonBoxHeight = document.querySelector('.buttonBox').clientHeight
    const areaBoxHeight = boxHeight - 40 - buttonBoxHeight
    document.querySelector('.tableWraper').style.height = areaBoxHeight + 'px'
    document.querySelector('.tableWraper').style.overflowY = 'auto'

    this.getCompanyList() // 获取 所属公司 数据
    this.init() // 初始化获取所有表格数据
    this.getMaskCompany() // 弹窗中的所属网点
    // this.getReservoirArea(0) // 获取所属库区
    // this.getReservoirArea(1) // 获取弹窗中的所属库区
    this.getWarehouseList(0) // 获取所属仓间
    this.getWarehouseList(1) // 获取弹窗中的所属仓间
  }
}
</script>
<style lang="scss" scoped>
.buttonBox{
    padding: 15px;
}
.searchCondition{
    padding: 0 15px;
}
.tableWraper{
    width: 100%;
    overflow-x: hidden;
}
.table{
    height: 100%;
}
.box{
    height: 100%;
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


