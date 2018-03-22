<template>
  <div id="not-found-page">
    <!--<img src="../assets/images/404.png">-->
    <div class="not-found-contain">
      <div>404&nbsp;&nbsp;Not&nbsp;&nbsp;Found</div>
      <span>访问的页面不存在</span>
      <router-link to="/simPancel">返回主页</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    created: function () {
    },
    data () {
      return {

      }
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  #app{
    .app-contain{
      height: 100%;
    }
  }
  #not-found-page{
    position: relative;
    height: 100%;
    min-height: 450px;
    text-align: center;
    .not-found-contain{
      text-align: center;
      width: 620px;
      height: 320px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -160px;
      margin-left: -310px;
      div{
        margin-top: 50px;
        font-size: 56px;
        line-height: 120px;
        /*font-family: 'Josefin Slab', serif;*/
        font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
      }
      span{
        font-size: 20px;
        line-height: 60px;
        padding-right: 20px;
      }
      a{
        color: #20a0ff;
        font-size: 20px;
        line-height: 60px;
      }
    }

  }
  .content {
    z-index: 1;
  }
  .not-found-contain:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255,255,255,0.3);
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    z-index: -1;
  }
</style>
