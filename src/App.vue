<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="less">
  @import './less/reset.less';
  @import './less/common.less';
  @import './less/style.less';
</style>
