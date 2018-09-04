<template>
    <div class="comBox">
        <div id="topNav">
          <commonHeader></commonHeader>
        </div>
        <div class="clearfix contentBox">
            <aside1 class="l contentL"></aside1>
            <div class="l contentInfo" >
              <router-view></router-view>
            </div>
            
        </div>
    </div>
</template>

<script>
import commonHeader from "@/components/commonHeader"
import aside from "@/components/aside"
export default {
    components: {
        commonHeader,
        aside1:aside
    },
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        width:""
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted(){
      const WHeight = document.body.clientHeight;
      const topNavHeight = document.querySelector("#topNav").clientHeight;
      const conBox = WHeight - topNavHeight +"px";
      document.querySelector(".contentBox").style.height = conBox;
      const _this = this;
      // window.onload = window.onresize = function() {
      //   const lWidth = document.querySelector(".contentL").clientWidth;
      //   const bodyWidth = document.body.clientWidth ;
      //   _this.width = `${bodyWidth - lWidth}px`;
      //   console.log(lWidth , bodyWidth)
      // };
    }
  }
</script>

<style scoped lang="scss">
.comBox{
  height: 100%;
  .contentBox{
    height: 100%;
  }
  .contentInfo{

  }
}
</style>
