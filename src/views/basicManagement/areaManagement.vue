<template>
    <div class="areaBox">
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
            <el-col class=" l" :xs="24" :sm="4" :md="4">
                <el-scrollbar class="tree" wrapClass="scrollbar-wrapper">
                    <el-tree :data="data1" class="aa" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </el-scrollbar>
            </el-col>
            <el-col :xs="24" :sm="20" :md="20" class="companyInfos l">
                <el-form :inline="true" label-width="86px" :disabled = "isDisabled" :model="areaInfo" class="demo-form-inline">
                    <el-form-item label="区域代码" size="mini" :required = "required" >
                        <el-input v-model.trim="areaInfo.areaCode" @blur="checkCodeAndName(0)" placeholder="区域代码"></el-input>
                    </el-form-item>
                    <el-form-item label="区域名称" size="mini" :required = "required" >
                        <el-input v-model.trim="areaInfo.areaName"  @blur="checkCodeAndName(1)" placeholder="区域名称"></el-input>
                    </el-form-item>
                    <el-form-item label="区域类型" size="mini" :required = "required" >
                        <el-select v-model="selectedArea" filterable placeholder="请选择" @change="selectArea">
                            <el-option
                            v-for="item in areaOptions"
                            :key="item.value"
                            :label="item.area_type_name"
                            :value="item.area_type_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上级区域" size="mini"  >
                        <!-- <el-input v-model.trim="areaInfo.higherArea" :disabled="areaDisabled" placeholder="上级区域"></el-input> -->
                        <el-select v-model="areaInfo.higherArea" @change="selectParentArea" :disabled="areaDisabled" filterable placeholder="请选择">
                            <el-option
                            v-for="item in higherAreas"
                            :key="item.value"
                            :label="item.area_name"
                            :value="item.area_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="经度" size="mini"  >
                        <el-input v-model.trim="areaInfo.longitude"  placeholder="经度"></el-input>
                    </el-form-item>
                    <el-form-item label="纬度" size="mini"  >
                        <el-input v-model.trim="areaInfo.latitude"  placeholder="纬度"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import axios from 'axios'
import url from '@/js/common.js'
import storage from '@/js/localstorage.js'
export default {
  data() {
    return {
      higherAreas: [
        {
          label: '市1',
          value: '1'
        },
        {
          label: '市2',
          value: '2'
        }
      ],
      required: true,
      saveShow: false,
      options: [

      ],
      value: '',
      defaultProps: {
        children: 'child',
        label: 'name',
        orgid: 'orgid'
      },
      data1: [

      ],
      isDisabled: true,
      areaDisabled: false,
      areaInfo: {
        areaCode: '',
        areaName: '',
        higherArea: '',
        longitude: '',
        latitude: ''
      },
      areaOptions: '',
      selectedArea: '',
      areaType: '',
      Create_Org_ID: '',
      Create_User_ID: '',
      treeClick: '',
      allCompanyInfo: '',
      selectedCompany: '',
      isName: false,
      isCode: false,
      oldCode: '',
      oldName: ''
    }
  },
  methods: {
    addComanyInfo() { // 点击新增执行的操作
      this.saveShow = true // 保存按钮显示
      this.isDisabled = false // 让地区详情可以点击
      this.treeClick = '' // 给tree型菜单重置
      this.isCode = false
      this.isName = false
      // 清空表单中的数据
      this.areaInfo.areaCode = ''
      this.areaInfo.areaName = ''
      this.areaInfo.higherArea = ''
      this.areaInfo.longitude = ''
      this.areaInfo.latitude = ''
      this.selectedArea = ''
    },
    saveInfo() { // 点击保存执行的操作
      this.saveAreaInfo()
    },
    updateInfo() { // 点击修改执行的操作
      if (this.treeClick == '') {
        this.$message.error('请先选择左边区域信息才能继续下一步操作!')
      } else {
        this.saveShow = true // 保存按钮显示
        this.isDisabled = false // 让地区详情可以点击
        this.isCode = false
        this.isName = false
      }
    },
    deleteCompany() { // 点击删除执行的操作
      const _this = this
      if (this.treeClick == '') {
        this.$message.error('请先选择左边区域信息才能继续下一步操作!')
      } else {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(url.apiUrl() + '/api/MetadataArea/MetadataAreaDel?area_id=' + this.treeClick)
            .then(function(val) {
              if (val.data.error == '') {
                _this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                _this.init();
              } else {
                _this.$message.error(val.data.error)
              }
            })
            .catch(function(data) {
              _this.$message.error(data.data.error)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        })

        // this.saveShow = true; //保存按钮显示
      }
    },
    handleNodeClick(data) { // 树形菜单点击获取对应的数据
      this.treeClick = data.value
      this.searchByOrgId(data.value)
    },
    init() { // 初始化获取树形菜单以及获取区域类型
      const _this = this
      axios.post(url.apiUrl() + '/api/MetadataArea/MetadataAreaList')
        .then(function(val) {
          _this.data1 = val.data.data
          const aa = val.data.data
          var arr = []
          for (var i = 0; i < aa.length; i++) {
            arr.push({
              name: aa[i].name,
              orgid: aa[i].area_code
            })
            for (var j = 0; j < aa[i].child.length; j++) {
              arr.push({
                name: aa[i].child[j].name,
                orgid: aa[i].child[j].area_code
              })
              for (var k = 0; k < aa[i].child[j].child.length; k++) {
                arr.push({
                  name: aa[i].child[j].child[k].name,
                  orgid: aa[i].child[j].child[k].area_code
                })
              }
            }
          }
          _this.allCompanyInfo = arr
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })

      axios.post(url.apiUrl() + '/api/MetadataArea/MetadataAreaTypeList')
        .then(function(val) {
          if (val.data.error == '') {
            _this.areaOptions = val.data.data
          } else {
            _this.$message.error(val.data.error)
          }

          // _this.data1 = val.data.data;
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    searchByOrgId(val) { // 点击树形菜单 右边展现对应结果
      const _this = this
      // this.getParentCompanyList();
      this.saveShow = false
      this.isDisabled = true
      axios.post(url.apiUrl() + '/api/MetadataArea/MetadataAreas?area_id=' + val)
        .then(data => {
          const msg = data.data
          const msg1 = data.data.data[0]

          if (msg.error == '') {
            //         areaInfo:{
            //     areaCode:"",
            //     areaName:"",
            //     higherArea:"",
            //     longitude:"",
            //     latitude:""
            // }
            _this.oldCode = msg1.area_code
            _this.oldName = msg1.area_name
            _this.areaInfo.areaCode = msg1.area_code
            _this.areaInfo.areaName = msg1.area_name
            if (msg1.parent_area_id == -1) {
              _this.areaInfo.higherArea = '请选择'
            } else {
              _this.areaInfo.higherArea = msg1.parent_area_id
            }

            _this.areaInfo.longitude = msg1.area_lng
            _this.areaInfo.latitude = msg1.area_lat
            _this.areaType = msg1.area_type // 给点击左边地区时获取的区域类型赋默认值
            _this.getParentArea(msg1.area_type - 1) // 根据区域类型给上级区域赋值

            switch (msg1.area_type) {
              case 1:
                _this.selectedArea = msg1.area_type
                break
              case 2:
                _this.selectedArea = msg1.area_type
                break
              case 3:
                _this.selectedArea = msg1.area_type
                break
              case 4:
                _this.selectedArea = msg1.area_type
                break
              default:
                break
            }
          } else {
            this.$message.error(msg.error)
          }
        })
        .catch(data => {
          this.$message.error(data.data.error)
        })
    },
    selectAreaValue(value) { // 选中区域的值
      console.log(value)
    },
    selectArea(val) { // 根据区域类型选择上级区域
      const _this = this
      switch (val) {
        case 1:
          _this.areaDisabled = true
          break
        case 2:
          _this.areaDisabled = false
          _this.getParentArea(val - 1)
          break
        case 3:
          _this.areaDisabled = false
          _this.getParentArea(val - 1)
          break
        case 4:
          _this.areaDisabled = false
          _this.getParentArea(val - 1)
          break
        default:
          break
      }
    },
    getParentArea(val) { // 获取上级区域信息
      const _this = this
      axios.post(url.apiUrl() + '/api/MetadataArea/MetadataAreaByTypeList?area_type=' + val)
        .then(function(val) {
          if (val.data.error == '') {
            _this.higherAreas = val.data.data
          } else {
            _this.$message.error(val.data.error)
          }

          // _this.data1 = val.data.data;
        })
        .catch(function(data) {
          _this.$message.error(data.data.error)
        })
    },
    checkCodeAndName(str) { // 检查是否名称或代码是否存在
      const _this = this

      // 判断是否是左边点击进入详情
      if (this.treeClick) {
        if (this.areaInfo.areaCode == this.oldCode && this.areaInfo.areaName == this.oldName) { // 判断公司代码和公司名称是否修改
          _this.isCode = true
          _this.isName = true
        } else {
          if (str == 0) {
            const data1 = {
              code: _this.areaInfo.areaCode,
              name: ''
            }
            if (this.areaInfo.areaCode == this.oldCode) {
              _this.isCode = true
            } else {
              axios.post(url.apiUrl() + '/api/MetadataArea/isAny', data1)
                .then(val => {
                  console.log(val)
                  if (val.data.data == true) {
                    _this.$message({
                      type: 'warning',
                      message: '区域代码重复!'
                    })
                    _this.isCode = false
                  } else {
                    _this.isCode = true
                  }
                })
                .catch(val => {
                  _this.$message.error(val.data.error)
                })
            }
          } else {
            const data1 = {
              code: '',
              name: _this.areaInfo.areaName
            }
            if (_this.areaInfo.areaName == this.oldName) {
              _this.isName = true
            } else {
              axios.post(url.apiUrl() + '/api/MetadataArea/isAny', data1)
                .then(val => {
                  console.log(val)
                  if (val.data.data == true) {
                    _this.$message({
                      type: 'warning',
                      message: '区域名称重复!'
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
      } else { // 新增的时候判断
        if (str == 0) {
          const data1 = {
            code: _this.areaInfo.areaCode,
            name: ''
          }
          axios.post(url.apiUrl() + '/api/MetadataArea/isAny', data1)
            .then(val => {
              console.log(val)
              if (val.data.data == true) {
                _this.$message({
                  type: 'warning',
                  message: '区域代码重复!'
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
            name: _this.areaInfo.areaName
          }
          axios.post(url.apiUrl() + '/api/MetadataArea/isAny', data1)
            .then(val => {
              console.log(val)
              if (val.data.data == true) {
                _this.$message({
                  type: 'warning',
                  message: '区域名称重复!'
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
    saveAreaInfo() { // 点击保存按钮 保存新改信息
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
      const data1 = {
        area_id: _this.treeClick ? _this.treeClick : '',
        area_code: this.areaInfo.areaCode,
        area_name: this.areaInfo.areaName,
        area_type: this.selectedArea,
        parent_area_id: this.areaInfo.higherArea,
        area_lng: this.areaInfo.longitude,
        area_lat: this.areaInfo.latitude,
        Create_Time: time,
        Create_Org_ID: this.Create_Org_ID,
        Create_User_ID: this.Create_User_ID,
        Edit_User_ID: '',
        Edit_Time: time,
        Edit_Org_ID: ''
      }
      if (this.areaInfo.areaCode == '' || this.areaInfo.areaName == '' || this.selectedArea == '') {
        this.$message.error('带*的为必填项,请填写后再保存!')
      } else {
        if (_this.isName == true && _this.isCode == true) {
          axios.post(url.apiUrl() + '/api/MetadataArea/MetadataAreaAdd', data1)
            .then(function(val) {
              if (val.data.error == '') {
                // _this.areaOptions = val.data.data;
                _this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                _this.init()
                _this.saveShow = false // 保存按钮显示
                _this.isDisabled = true // 让地区详情可以点击
              } else {
                _this.$message.error(val.data.error)
              }
            })
            .catch(function(data) {
              _this.$message.error(data.data.error)
            })
        } else {
          _this.$message({
            type: 'warning',
            message: '代码或名称重复,请修改后重试!'
          })
        }
      }
    },
    selectParentArea(val) { //
      this.areaInfo.higherArea = val
    },
    deleteArea() { // 删除地区信息
      // axios.post(url.apiUrl()+"/api/MetadataArea/MetadataAreaAdd" , data1)
      // .then(function(val){
      //     if( val.data.error == ""){
      //         // _this.areaOptions = val.data.data;
      //         _this.$message({
      //             message: '保存成功',
      //             type: 'success'
      //         });
      //         _this.init();
      //         _this.saveShow = false; //保存按钮显示
      //         _this.isDisabled = true; // 让地区详情可以点击
      //     }else{
      //         _this.$message.error(val.data.error);
      //     }
      // })
      // .catch(function(data){
      //     _this.$message.error(data.data.error);
      // });
    }
  },
  mounted() {
    this.init()
    const loginInfo = JSON.parse(storage.getStorage('currentUser'))
    this.Create_Org_ID = loginInfo.orgId
    this.Create_User_ID = loginInfo.userId
    const bodyWidth = document.body.clientHeight
    const buttonBoxHeight = document.querySelector('.buttonBox').clientHeight
    const areaBoxHeight = bodyWidth - 114 - buttonBoxHeight
    document.querySelector('.tree').style.height = areaBoxHeight + 'px'
    document.querySelector('.tree').style.overflowY = 'auto'
    document.querySelector('.tree').style.overflowX = 'hidden'
  }
}
</script>

<style lang="scss" scoped>
.buttonBox{
    padding: 15px;
    .tree{
        // width: 200px;
        overflow-x: hidden;
    }
    .companyInfos{
        // width:-moz-calc(100% - 200px);
        // width:-webkit-calc(100% - 200px); 
        // width: calc(100% - 200px);
        // overflow-x: auto;
    }
}
.l{
    float: left;
}
.aa{
  overflow-x: hidden!important; 
}
.clearfix:before, .clearfix:after { content: " "; display: block; height: 0; overflow: hidden; }  
.clearfix:after { clear: both; }  
.clearfix { zoom: 1; } 
// ::-webkit-scrollbar{width:0px;height:0px;-webkit-appearance: none;}

</style>

