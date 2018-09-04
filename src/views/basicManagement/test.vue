<template>
<div class="select-box">
    <!-- <h3 class="select-title"
        :name="selectData.selectOptions[selectData.defaultIndex].name"
        :class="{'select-title-active': selectData.selectStatus}">
        {{ selectData.selectOptions[selectData.defaultIndex].context }} 
    </h3> -->
    <h3 class="align-items-center">
      <el-input
        placeholder="请输入内容"
        class=""
        v-model="selectData.selectOptions[selectData.defaultIndex].context"
        @focus="changeStatus"
        clearable>
      </el-input>
    </h3>
    <transition name="slide-down">
      <ul class="select-options" v-show="selectData.selectStatus">
        <table>
          <tr>
            <th>单位</th><th>发货人</th><th>电话</th><th>地址</th>
          </tr>
          <tr v-for="(item,index) in selectData.selectOptions"
            :key="index"
            @click="EmitchangeOption(index)"
            :class="{'select-option-active':selectData.defaultIndex===index}">
            <td class="w4"> <span :title="selectData.selectOptions[index].context">{{ selectData.selectOptions[index].context }}</span></td>
            <td class="w4"><span>{{ selectData.selectOptions[index].context }}</span></td>
            <td class="w4"><span>{{ selectData.selectOptions[index].context }}</span></td>
            <td class="w8"><em>{{ selectData.selectOptions[index].context }}</em></td>
          </tr>
        </table>
        <div class="arrow-top"></div>
      </ul>   
    </transition>     
</div>
</template>
<script>
import '@/assets/css/reset.css'
export default{
  name: 'oSelect',
  props: { // 子组件接收父组件传过来的值，使用props
    selectData: {
      type: Object // 传过来的必须是对象
    }
  },
  methods: {
    EmitchangeOption(index) {
      this.selectData.selectStatus = !this.selectData.selectStatus
      this.$emit('changeOption', index)
    },
    changeStatus() {
      this.selectData.selectStatus = !this.selectData.selectStatus
    }
  }
}
</script>
<style lang="scss" scoped>
$size:12px;
$lineHeight:25px;
$color: #606266;
table{
  width: 100%;
  td,th{
    width: 25%;
    
  }
  td{
    padding: 0 4px;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
      
    span,em{
      display: block;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    span{
      width: 40px;
      border-right: 1px solid #ccc;
    }
    em{
      width: 80px;
      font-style: normal;
    }
  }
  .w4{
    width: 40px;
  }
  .w8{
    width: 80px;
  }
  tr:hover{
    background-color: #f5f7fa;
  }
}
 .d-flex{
     display: -webkit-box !important;
    display: -ms-flexbox !important;
    display: flex !important;
 }
 .justify-content-center {
    -webkit-box-pack: center !important;
    -ms-flex-pack: center !important;
    justify-content: center !important;
}
.align-items-center {
    -webkit-box-align: center !important;
    -ms-flex-align: center !important;
    align-items: center !important;
}
.justify-content-around {
    -ms-flex-pack: distribute !important;
    justify-content: space-around !important;
}
.select-box{
    position: relative;
    max-width: 250px;
    line-height: 35px;
    margin: 0px auto;
    width: 80%;
    font-size: $size;
    line-height: $lineHeight;
    color:$color;
    margin-top: 2px;
}
.select-title{
    position: relative;
    padding: 0 30px 0 10px;
    border: 1px solid #d8dce5;
    border-radius: 5px;
    transition-duration: 300ms;
    cursor: pointer;
    font-size: $size;
    line-height: $lineHeight;
    color:#333;
}
.select-title:after{
    content: '';
    position: absolute;
    height: 0;
    width: 0;
    border-top: 6px solid #d8dce5;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    right: 9px;
    top: 0;
    bottom: 0;
    margin: auto;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    font-size: $size;
    line-height: $lineHeight;
    color:$color;
}
.select-title-active{
    border-color: #409eff;
    font-size: $size;
    line-height: $lineHeight;
    color:$color;
}
.select-title-active:after{
    transform: rotate(-180deg);
    border-top-color: #409eff;
    font-size: $size;
    line-height: $lineHeight;
    color:$color;
}
.select-options{
    position: absolute;
    padding:10px 0;
    top: 45px;
    border:1px solid #d8dce5;
    
    border-radius: 5px;
    z-index: 99;
    background: #fff;
    font-size: $size;
    line-height: $lineHeight;
    color:$color;
}
.select-option-item{
    padding:0 10px;
    cursor: pointer;
    transition-duration: 300ms;
    font-size: $size;
    line-height: $lineHeight;
    color:$color;
}
.select-option-item:hover,.select-option-active{
    background: #f1f1f1;
    color: #409eff;
    font-size: $size;
    line-height: $lineHeight;
    color:$color;
}
.arrow-top{
    position: absolute;
    height: 0;
    width: 0;
    top: -7px;
    border-bottom: 7px solid #d8dce5;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 99;
    font-size: $size;
    line-height: $lineHeight;
    color:$color;
}
.arrow-top:after{
    content: '';
    position: absolute;
    display: block;
    height: 0;
    width: 0;
    border-bottom: 6px solid #fff;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    left: -6px;
    top: 1px;
    z-index: 99;
    font-size: $size;
    line-height: $lineHeight;
    color:$color;
}

.slide-down-enter-active,.slide-down-leave{
    transition: all .3s ease-in-out;
    transform-origin:0 top;
    transform: scaleY(1);
    
}
.slide-down-enter{
    transform: scaleY(0);
}
.slide-down-leave-active{
    transition: all .3s ease-in-out;
    transform-origin:0 top;
    transform: scaleY(0);
}
</style>
