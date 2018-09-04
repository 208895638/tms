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
                    <!-- <el-form-item label="所属公司" size="mini">
                        <el-select v-model="orgSelected" filterable placeholder="请选择" @change="selectorg">
                            <el-option
                            v-for="item in orgList"
                            :key="item.value"
                            :label="item.org_name"
                            :value="item.org_id">
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="姓名" size="mini">
                        <el-input v-model="searchCondition.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="职位" size="mini">
                        <el-select v-model="positionSelected" filterable placeholder="请选择" @change="selectposition">
                            <el-option
                            v-for="item in positionList"
                            :key="item.value"
                            :label="item.position_name"
                            :value="item.position_id">
                            </el-option>
                        </el-select>
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

                    <!-- <el-table-column
                        v-if="!tableShow"
                        prop="org_name"
                        label="所属公司"
                        width="120"
                        show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                        v-if="tableShow"
                        prop="org_name"
                        label="所属公司"
                         width="120"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column> -->

                    <el-table-column
                        v-if="!tableShow"
                        prop="s.staff_code"
                        label="工号"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        v-if="tableShow"
                        prop="s.staff_code"
                        label="工号"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="s.staff_name"
                        label="姓名"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        v-if="tableShow"
                        prop="s.staff_name"
                        label="姓名"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="s.staff_idcard"
                        label="身份证号"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        v-if="tableShow"
                        prop="s.staff_idcard"
                        label="身份证号"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="s.staff_gender"
                        label="性别"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        v-if="tableShow"
                        prop="s.staff_gender"
                        label="性别"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="p.position_id"
                        label="职位"
                        show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                        v-if="tableShow"
                        prop="p.position_id"
                        label="职位"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="s.staff_phone"
                        label="联系电话"
                        show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                        v-if="tableShow"
                        prop="s.staff_phone"
                        label="联系电话"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="s.staff_birthday"
                        label="生日"
                        show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                        v-if="tableShow"
                        prop="s.staff_birthday"
                        label="生日"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="s.staff_origin"
                        label="籍贯"
                        show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                        v-if="tableShow"
                        prop="s.staff_origin"
                        label="籍贯"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="s.staff_address"
                        label="联系地址"
                        show-overflow-tooltip>
                    </el-table-column>
                    
                    <el-table-column
                        v-if="tableShow"
                        prop="s.staff_address"
                        label="联系地址"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="s.staff_drivinglicense"
                        label="驾驶证号"
                        show-overflow-tooltip>
                    </el-table-column>
                    
                    <el-table-column
                        v-if="tableShow"
                        prop="s.staff_drivinglicense"
                        label="驾驶证号"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="s.staff_drivingexp"
                        label="驾龄"
                        show-overflow-tooltip>
                    </el-table-column>
                    
                    <el-table-column
                        v-if="tableShow"
                        prop="s.staff_drivingexp"
                        label="驾龄"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="s.staff_employmentcert"
                        label="从业证号"
                        show-overflow-tooltip>
                    </el-table-column>
                    
                    <el-table-column
                        v-if="tableShow"
                        prop="s.staff_employmentcert"
                        label="从业证号"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="s.wechat_account"
                        label="微信账号"
                        show-overflow-tooltip>
                    </el-table-column>
                    
                    <el-table-column
                        v-if="tableShow"
                        prop="s.wechat_account"
                        label="微信账号"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="s.alipay_account"
                        label="支付宝账号"
                        show-overflow-tooltip>
                    </el-table-column>
                    
                    <el-table-column
                        v-if="tableShow"
                        prop="s.alipay_account"
                        label="支付宝账号"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="s.deposit_bank"
                        label="开户行"
                        show-overflow-tooltip>
                    </el-table-column>
                    
                    <el-table-column
                        v-if="tableShow"
                        prop="s.deposit_bank"
                        label="开户行"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="s.deposit_holder"
                        label="开户人"
                        show-overflow-tooltip>
                    </el-table-column>
                    
                    <el-table-column
                        v-if="tableShow"
                        prop="s.deposit_holder"
                        label="开户人"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                        v-if="!tableShow"
                        prop="s.deposit_account"
                        label="银行账号"
                        show-overflow-tooltip>
                    </el-table-column>
                    
                    <el-table-column
                        v-if="tableShow"
                        prop="s.deposit_account"
                        label="银行账号"
                        show-overflow-tooltip>
                        <el-table-column
                        :render-header="renderHeader"
                        >
                            
                        </el-table-column>
                    </el-table-column>

                </el-table>
                
            </el-scrollbar>
            <div class="clearfix  d-flex justify-content-center">
                <el-button type="primary" @click="search" class="l" size="mini">搜索</el-button>
                <el-pagination
                    background
                    @size-change="pageSizeChange"
                    @current-change="currentSizeChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[10, 20, 50, 100 , staffSize > 1000 ? staffSize : 1000]"
                    :page-size="pageSize"
                    class="l"
                    layout="total , sizes, prev, pager, next"
                    :total = "staffSize"
                    >
                </el-pagination>
            </div>
        </div>
        <el-dialog title="人员详情" :visible.sync="dialogFormVisible">
            <div class="clearfix">
                <!-- <el-button type="primary" @click="addComanyInfo1" v-if="isShow" size="mini">新增</el-button> -->
                <el-button type="primary" @click="updateInfo1" v-if="isShow"  size="mini">修改</el-button>
                <el-button type="danger" @click="saveInfo1" size="mini" v-if="saveShow1">保存</el-button>
                <el-button type="primary" @click="cancelInfo1" v-if="isShow" size="mini">取消</el-button>
                <el-button type="primary" @click="deleteCompany1" v-if="isShow"  size="mini">删除</el-button>
            </div>
            <div class="clearfix staffInfo">
                <el-form :inline="true" label-width="102px" :disabled = "isDisabled1" :model="areaInfo1" class="demo-form-inline">
                    <el-form-item label="工号" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.staff_code"  placeholder="请输入工号"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.staff_name"  placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.staff_idcard"  placeholder="请输入身份证号"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.staff_gender"  placeholder="请输入性别"></el-input>
                    </el-form-item>
                    <el-form-item label="职位" size="mini">
                        <el-select v-model="areaInfo1.position_id" filterable placeholder="请选择" @change="selectSize">
                            <el-option
                            v-for="item in positionList"
                            :key="item.value"
                            :label="item.position_name"
                            :value="item.position_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="联系电话" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.staff_phone"  placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="生日" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.staff_birthday"  placeholder="请输入生日"></el-input>
                    </el-form-item>
                    <el-form-item label="籍贯" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.staff_origin"  placeholder="请输入籍贯"></el-input>
                    </el-form-item>
                    <el-form-item label="联系地址" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.staff_address"  placeholder="请输入联系地址"></el-input>
                    </el-form-item>
                    <el-form-item label="驾驶证号" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.staff_drivinglicense"  placeholder="请输入驾驶证号"></el-input>
                    </el-form-item>
                    <el-form-item label="驾龄" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.staff_drivingexp"  placeholder="请输入驾龄"></el-input>
                    </el-form-item>
                    <el-form-item label="从业证号" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.staff_employmentcert"  placeholder="请输入从业证号"></el-input>
                    </el-form-item>
                    <el-form-item label="微信账号" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.wechat_account"  placeholder="请输入微信账号"></el-input>
                    </el-form-item>
                    <el-form-item label="支付宝账号" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.alipay_account"  placeholder="请输入支付宝账号"></el-input>
                    </el-form-item>
                    <el-form-item label="开户行" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.deposit_bank"  placeholder="请输入开户行"></el-input>
                    </el-form-item>
                    <el-form-item label="开户人" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.deposit_holder"  placeholder="请输入开户人"></el-input>
                    </el-form-item>
                    <el-form-item label="银行账号" size="mini" :required = "required1" >
                        <el-input v-model.trim="areaInfo1.deposit_account"  placeholder="请输入银行账号"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="所属公司" size="mini">
                        <el-select v-model="areaInfo1.org_id" filterable placeholder="请选择" @change="selectorg">
                            <el-option
                            v-for="item in orgList"
                            :key="item.value"
                            :label="item.org_name"
                            :value="item.org_id">
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                </el-form>
            </div>
        </el-dialog>
    </div>
    
</template>
<script>
import axios from 'axios'
import url from '@/js/common.js'
import storage from '@/js/localstorage.js'
import "@/assets/css/flex-box.css"
export default {
  data() {
    return {
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
      printValue: '打印',
      searchCondition: {
        user: '',
        code: '',
        name: ''
      },
      tableData3: [],
      multipleSelection: [],
      positionSelected: '',
      positionList: [

      ],
      pageSize: 10,
      currentPage1: '',
      currentPage: 1,
      staffSize: 0,
      tableShow: false,
      dialogFormVisible: false,
      required1: true,
      isDisabled1: true,
      printValue1: '',
      saveShow1: false,
      areaInfo1: {
        staff_id: '',
        staff_code: '',
        staff_name: '',
        staff_idcard: '',
        staff_gender: '',
        position_id: '',
        staff_phone: '',
        staff_birthday: '',
        staff_origin: '',
        staff_address: '',
        staff_drivinglicense: '',
        staff_drivingexp: '',
        staff_employmentcert: '',
        wechat_account: '',
        alipay_account: '',
        deposit_bank: '',
        deposit_holder: '',
        deposit_account: ''
        // org_id:"",
      },
      Create_Org_ID: '',
      Create_User_ID: '',
      staff_id: '',
      checkboxSelected: '',
      isShow: false,
      sizeList: '',
      newAdd: false
    }
  },
  methods: {
      aa(val){
            
            //return [1,2]
            const { columns, data } = val;
            const sums = [];
            columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = '总价';
                return;
            }
            if (index === 1) {
                sums[index] = '个数';
                return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                    return prev + curr;
                } else {
                    return prev;
                }
                }, 0);
                sums[index] += ' 元';
            } else {
                sums[index] = 'N/A';
            }
            });

            return sums;
        },
    renderHeader(createElement, { column }) {
      var self = this
      return createElement('el-input', {
        domProps: {
          value: self.value
        },
        on: {
          input: function(event) {
            console.log(event)
            self.inputvalue = event
            self.$emit('input', event)
          }
        }
      })
    },
    addComanyInfo() { // 添加按钮执行的操作
      this.dialogFormVisible = true
      this.isShow = false
      this.saveShow1 = true
      let date = new Date(), _this = this
      this.isDisabled1 = false
      this.newAdd = false
      // 点击新增 先清空操作
      this.areaInfo1.staff_id = ''
      this.areaInfo1.staff_code = ''
      this.areaInfo1.staff_name = ''
      this.areaInfo1.staff_idcard = ''
      this.areaInfo1.staff_gender = ''
      this.areaInfo1.position_id = ''
      this.areaInfo1.staff_phone = ''
      this.areaInfo1.staff_birthday = ''
      this.areaInfo1.staff_origin = ''
      this.areaInfo1.staff_address = ''
      this.areaInfo1.staff_drivinglicense = ''
      this.areaInfo1.staff_drivingexp = ''
      this.areaInfo1.staff_employmentcert = ''
      this.areaInfo1.wechat_account = ''
      this.areaInfo1.alipay_account = ''
      this.areaInfo1.deposit_bank = ''
      this.areaInfo1.deposit_holder = ''
      this.areaInfo1.deposit_account = ''
      // this.areaInfo1.org_id = "" ;
    },
    deleteCompany() { // 删除按钮执行的操作
      let _this = this, arr = [], data1 = ''
      console.log(this.checkboxSelected)
      if (this.checkboxSelected == '' || this.checkboxSelected == null) {
        _this.$message.error('请先勾选才能进行删除操作!')
      } else {
        this.checkboxSelected.forEach(function(value, index) {
          arr = value.s.staff_id
        })
        axios.post(url.apiUrl() + '/api/Staff/StaffDel?staff_id=' + arr)
          .then(function(val) {
            if (val.data.error == '') {
              _this.$message({
                message: '删除成功!',
                type: 'success'
              })
              _this.searchResult()
              _this.checkboxSelected = ''
            } else {
              _this.$message.error(val.data.error)
            }
          })
          .catch(function(data) {
            _this.$message.error('获取数据失败,请稍后再试11!')
          })
      }
    },
    importFile() { // 导入文件执行的操作
      this.$message({
        message: '暂未开放',
        type: 'warning'
      })
    },
    searchResult() { // 点击查询执行的操作
      const data1 = {
          // "org_id": this.orgSelected,
          'staff_name': this.searchCondition.name ? this.searchCondition.name : '',
          'position_id': this.positionSelected,
          'Page': this.currentPage,
          'Rows': this.pageSize
        }, _this = this
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
      axios.post(url.apiUrl() + '/api/Staff/StaffList', data1)
        .then(function(val) {
          if (val.data.error == '') {
            _this.areaOptions = val.data.data
            _this.tableData3 = val.data.data.rows
            _this.staffSize = val.data.data.total
            console.log(val.data.data)
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // selectorg(value){
    //     console.log(value , this.orgSelected);
    // },
    selectposition(value) {
      console.log(value, this.positionSelected)
    },
    pageSizeChange(val) { //   选择每页展示的页数大小
      console.log(val)
      this.pageSize = val
      this.searchResult()
    },
    // ///////////////////////////////
    currentSizeChange(val) { // 当前选择第几页
      this.currentPage = val
      
    },
    search() { // 点击搜索   th下面出现搜索框
      // this.tableShow = !this.tableShow ;
      // this.searchResult();
    },
    doubleEvents(obj) { // 双击信息进行的操作
      console.log(obj)
      this.dialogFormVisible = true
      this.saveShow1 = false
      this.isShow = true
      this.newAdd = true
      this.isDisabled1 = true
      this.areaInfo1.staff_id = obj.s.staff_id
      this.areaInfo1.staff_code = obj.s.staff_code
      this.areaInfo1.staff_name = obj.s.staff_name
      this.areaInfo1.staff_idcard = obj.s.staff_idcard
      this.areaInfo1.staff_gender = obj.s.staff_gender
      this.positionSelected = obj.p.position_id
      this.areaInfo1.staff_phone = obj.s.staff_phone
      this.areaInfo1.staff_birthday = obj.s.staff_birthday
      this.areaInfo1.staff_origin = obj.s.staff_origin
      this.areaInfo1.staff_address = obj.s.staff_address
      this.areaInfo1.staff_drivinglicense = obj.s.staff_drivinglicense
      this.areaInfo1.staff_drivingexp = obj.s.staff_drivingexp
      this.areaInfo1.staff_employmentcert = obj.s.staff_employmentcert
      this.areaInfo1.wechat_account = obj.s.wechat_account
      this.areaInfo1.alipay_account = obj.s.alipay_account
      this.areaInfo1.deposit_bank = obj.s.deposit_bank
      this.areaInfo1.deposit_holder = obj.s.deposit_holder
      this.areaInfo1.deposit_account = obj.s.deposit_account
      console.log(this.areaInfo1)
      // this.areaInfo1.org_id = obj.org_id;
    },
    // getorg(){   //   获取所属公司信息
    //     const data1 = {
    //         Page: 1,
    //         Rows: 1000
    //     },_this = this ;
    //    axios.post(url.apiUrl() + '/api/Org/GetCurrentUserOrg', data1)
    //     .then( val =>{
    //         console.log(val.data);
    //         _this.orgList = val.data.data.rows ;
    //     })
    //     .catch( val => {
    //         _this.$message.error('数据获取错误,请过一段时间重试!');
    //     })
    // },
    getposition() { //   获取职位信息
      const data1 = {
          Page: 1,
          Rows: 1000
        }, _this = this
      axios.post(url.apiUrl() + '/api/Position/PositionList', data1)
        .then(val => {
          console.log(val.data)
          _this.positionList = val.data.data.rows
        })
        .catch(val => {
          _this.$message.error('数据获取错误,请过一段时间重试!')
        })
    },
    selectSize() {},
    checkbox(val) { // 用户手动勾选checkbox的勾选操作
      console.log(val, typeof (val))
      this.checkboxSelected = val
    },
    checkboxAll(val) { // 用户点击全选checkbox的操作
      console.log(val, typeof (val))
      // this.checkboxSelected = val;
      this.$message.error('暂不支持多选操作')
      return false
    },
    // getSize(){  //获取物料单位
    //     const _this = this ;
    //     axios.get(url.apiUrl() + '/api/Material/GetUnit')
    //     .then( val =>{
    //         console.log(val.data.data);
    //         _this.sizeList = val.data.data ;
    //     })
    //     .catch( val => {
    //         _this.$message.error('数据获取错误,请过一段时间重试!');
    //     })
    // },
    // selectSize(){},
    // ////////////////////////////////////////  弹窗中的事件
    addComanyInfo1() {

    },
    updateInfo1() {
      this.isDisabled1 = false
      this.saveShow1 = true
    },
    saveInfo1() {
      // this.newAdd = false ;
      console.log(this.newAdd)
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
          metadata_Material: {
            staff_id: this.areaInfo1.staff_id ? this.areaInfo1.staff_id : '',
            staff_code: this.areaInfo1.staff_code,
            staff_name: this.areaInfo1.staff_name,
            staff_idcard: this.areaInfo1.staff_idcard,
            staff_gender: this.areaInfo1.staff_gender,
            position_id: this.areaInfo1.position_id,
            staff_phone: this.areaInfo1.staff_phone,
            staff_birthday: this.areaInfo1.staff_birthday,
            staff_origin: this.areaInfo1.staff_origin,
            staff_address: this.areaInfo1.staff_address,
            staff_drivinglicense: this.areaInfo1.staff_drivinglicense,
            staff_drivingexp: this.areaInfo1.staff_drivingexp,
            staff_employmentcert: this.areaInfo1.staff_employmentcert,
            wechat_account: this.areaInfo1.wechat_account,
            alipay_account: this.areaInfo1.alipay_account,
            deposit_bank: this.areaInfo1.deposit_bank,
            deposit_holder: this.areaInfo1.deposit_holder,
            deposit_account: this.areaInfo1.deposit_account,
            // org_id: this.org_id,
            Create_Time: time,
            Create_Org_ID: this.Create_Org_ID,
            Create_User_ID: this.Create_User_ID,
            Edit_User_ID: '',
            Edit_Time: time,
            Edit_Org_ID: ''
          },
          // 啥意思？
          // metadata_R_Staff_Org: {
          //     r_staff_org_id: "",
          metadata_R_Staff: {
            r_staff_id: '',
            staff_id: this.areaInfo1.staff_id ? this.areaInfo1.staff_id : ''
            // org_id: this.orgSelected
          }
        }
        axios.post(url.apiUrl() + '/api/Staff/StaffUpdate', data1)
          .then(val => {
            console.log(val.data)
            if (val.data.error == '') {
              _this.$message({
                message: '更改成功!',
                type: 'success'
              })
              _this.printValue = ''
              _this.dialogFormVisible = false
              _this.searchResult()
            }
          })
          .catch(val => {
            _this.$message.error('数据获取错误,请过一段时间重试!')
          })
      } else {
        const data1 = {
          metadata_staff: {
            staff_id: '',
            staff_code: this.areaInfo1.staff_code,
            staff_name: this.areaInfo1.staff_name,
            staff_idcard: this.areaInfo1.staff_idcard,
            staff_gender: this.areaInfo1.staff_gender,
            position_id: this.areaInfo1.position_id,
            staff_phone: this.areaInfo1.staff_phone,
            staff_birthday: this.areaInfo1.staff_birthday,
            staff_origin: this.areaInfo1.staff_origin,
            staff_address: this.areaInfo1.staff_address,
            staff_drivinglicense: this.areaInfo1.staff_drivinglicense,
            staff_drivingexp: this.areaInfo1.staff_drivingexp,
            staff_employmentcert: this.areaInfo1.staff_employmentcert,
            wechat_account: this.areaInfo1.wechat_account,
            alipay_account: this.areaInfo1.alipay_account,
            deposit_bank: this.areaInfo1.deposit_bank,
            deposit_holder: this.areaInfo1.deposit_holder,
            deposit_account: this.areaInfo1.deposit_account,
            // org_id: this.areaInfo1.org_id,
            Create_Time: time,
            Create_Org_ID: this.Create_Org_ID,
            Create_User_ID: this.Create_User_ID,
            Edit_User_ID: '',
            Edit_Time: time,
            Edit_Org_ID: ''
          },
          // metadata_R_Staff_Org: {
          //     r_staff_org_id: "",
          metadata_R_Staff: {
            r_staff_id: '',
            staff_id: ''
            // org_id: this.orgSelected
          }
        }
        axios.post(url.apiUrl() + '/api/Staff/StaffAdd', data1)
          .then(val => {
            console.log(val.data)
            if (val.data.error == '') {
              _this.$message({
                message: '添加成功!',
                type: 'success'
              })
              _this.printValue = ''
              _this.dialogFormVisible = false
              _this.searchResult()
            }
          })
          .catch(val => {
            _this.$message.error('数据获取错误,请过一段时间重试!')
          })
      }
    },
    cancelInfo1() {
      this.dialogFormVisible = false
    },
    deleteCompany1() { // 弹窗 删除操作
      const _this = this

      axios.post(url.apiUrl() + '/api/Staff/StaffDel?staff_id=' + _this.areaInfo1.staff_id)
        .then(function(val) {
          if (val.data.error == '') {
            _this.$message({
              message: '删除成功!',
              type: 'success'
            })
            _this.dialogFormVisible = false
            _this.searchResult()
            _this.checkboxSelected = ''
          } else {
            _this.$message.error(val.data.error)
          }
        })
        .catch(function(data) {
          _this.$message.error('获取数据失败,请稍后再试11!')
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
    this.searchResult()
    this.getposition()
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
.el-form-item{
    margin-bottom: 0px;
}
.buttonBox{
    padding: 15px 15px 0 15px;
}
</style>
<style>
    .cell{
     white-space: nowrap!important;
 }
 .el-scrollbar__view{
     height: 100%;
 }
</style>
