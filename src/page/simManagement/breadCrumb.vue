<template>
  <div class="simPancel-model">
    <img src="../../assets/images/bread.png" alt="pancel" class="simPancel-icon">
    <el-breadcrumb separator="/" class="simPancel-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/simPancel/' }">仿真面板</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.path === '/simPancel/smo' ">SMO</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.path === '/simPancel/smoView' ">SMO</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.path === '/simPancel/opc' ">OPC</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.path === '/simPancel/opcView' ">OPC</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.path === '/simPancel/smpwo' ">SMPWO</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.path === '/simPancel/smpwoView' ">SMPWO</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.path === '/simPancel/pdod' ">偏振像差在线检测</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.path === '/simPancel/pdodView' ">偏振像差在线检测</el-breadcrumb-item>
    </el-breadcrumb>
    <keep-alive>
      <router-view :user="user"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'breadCrumb',
    props: ["user"],
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
