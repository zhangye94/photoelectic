<template>
  <div class="app-layout">
    <div class="app-head">
      <div class="app-head-left">
        <h2>
          <img src="../assets/images/pancel.png" alt="pancel" class="app-icon">
          北京理工大学集成光刻仿真并行计算软件
        </h2>
      </div>
      <div class="app-head-right">
        <el-popover ref="popoverUser" placement="bottom" width="60" trigger="click">
          <div class="popover-contain">
            <h2>
              <span v-if="user.admin">管理员：</span>
              <span v-if="!user.admin">普通用户：</span>
            </h2>
            <ul>
              <li><div>姓名：</div><div>{{user.name}}</div></li>
              <li><div>账号：</div><div>{{user.userNo}}</div></li>
              <li class="last-li"><div>手机：</div><div>{{user.phone}}</div></li>
            </ul>
            <ul class="root-list">
              <li>
                <span>SMO</span>
                <img src="../assets/images/pass.png" class="root-icon-pass" v-if="user.smo">
                <img src="../assets/images/lock.png" class="root-icon-lock" v-if="!user.smo">
              </li>
              <li>
                <span>OPC</span>
                <img src="../assets/images/pass.png" class="root-icon-pass" v-if="user.opc">
                <img src="../assets/images/lock.png" class="root-icon-lock" v-if="!user.opc">
              </li>
              <li>
                <span>SMPWO</span>
                <img src="../assets/images/pass.png" class="root-icon-pass" v-if="user.smpwo">
                <img src="../assets/images/lock.png" class="root-icon-lock" v-if="!user.smpwo">
              </li>
              <li>
                <span>偏振像差在线检测</span>
                <img src="../assets/images/pass.png" class="root-icon-pass" v-if="user.pdod">
                <img src="../assets/images/lock.png" class="root-icon-lock" v-if="!user.pdod">
              </li>
            </ul>
            <ul class="popover-contain-link-group">
              <li>
                <router-link :to="{ path: '/account'}">
                  <img src="../assets/images/edit.png" alt="edit" class="link-icon">信息修改
                </router-link>
              </li>
              <li>
                <router-link :to="{ path: '/account'}">
                  <img src="../assets/images/password.png" alt="password" class="link-icon">密码修改
                </router-link>
              </li>
              <li @click="logout();" style="cursor: pointer;">
                <img src="../assets/images/logout2.png" alt="logout" class="link-icon">登出
              </li>
            </ul>
          </div>
        </el-popover>
        <div class="fr">
          <el-button @click="logout();">
            登出
            <img src="../assets/images/logout.png" alt="logout" class="logout-icon">
          </el-button>
        </div>
        <div class="fr">
          <el-button>关于</el-button>
        </div>
        <div class="fr">
          <el-button>帮助</el-button>
        </div>
        <div class="fr popover-button">
          <el-button v-popover:popoverUser>{{user.name}}</el-button>
        </div>
      </div>
    </div>
    <div class="app-contain">
      <div class="app-menu">
        <el-menu
          router
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          @select="selectItems"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="/simPancel">
            <i class="el-icon-upload"></i>
            <span slot="title">仿真管理</span>
          </el-menu-item>
          <el-menu-item index="/simHistory">
            <i class="el-icon-document"></i>
            <span slot="title">仿真历史</span>
          </el-menu-item>
          <el-menu-item index="/user" v-if="user.admin">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/account">
            <i class="el-icon-setting"></i>
            <span slot="title">账户管理</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="app-content">
        <keep-alive>
          <router-view :user="user"></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    mounted: function () {
      this.getUserInfo();
    },
    data () {
      return {
        activeIndex: '/simPancel',
        user: {}
      }
    },
    methods: {
      getUserInfo() {
        this.$http.post('api/get_current_user_info.do',{
        }).then((res) => {
          this.user = res.data.data;
          for(let i = 0;i<res.data.data.roles.length;i++){
            if(res.data.data.roles[i] === 'admin'){
              this.user.admin = true;
              this.user.smo = true;
              this.user.opc = true;
              this.user.smpwo = true;
              this.user.pdod = true;
            }
            if(res.data.data.roles[i] === 'smo'){
              this.user.smo = true;
            }
            if(res.data.data.roles[i] === 'opc'){
              this.user.opc = true;
            }
            if(res.data.data.roles[i] === 'smpwo'){
              this.user.smpwo = true;
            }
            if(res.data.data.roles[i] === 'pdod'){
              this.user.pdod = true;
            }
          }
        }, (err) => {
          this.$message({
            message: '读取用户信息失败，请检查网络环境！',
            type: 'error',
            duration: 1500,
            showClose: true
          });
        });
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      getNavType(){
        this.activeIndex=this.$store.state.adminleftnavnum;
      },
      selectItems(index){
        this.$store.state.adminleftnavnum=index;
      },
      //注销
      logout(){
        //删除cookie并跳到登录页
        this.$http.get('api/logout.do').then((res) => {}, (err) => {});
        this.isLogouting = true;
        this.delCookie('session');
        this.$router.push('/login/');
        this.isLogouting = false;
        localStorage.removeItem("root");
      }
    },
    watch: {
      // 监测store.state
      '$store.state.adminleftnavnum': 'getNavType',
      '$route' (to, from) {
        if(from.path === '/login/'){
          this.getUserInfo();
        }
      }
    }
  }
</script>

<style lang="less">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    height: 100%;
  }
  .app-layout{
    height: 100%;
    background-color: #eaedf1;
  }
  .app-head{
    background-color: rgb(55,61,65);
    min-width: 1200px;
    width: 100%;
    position: fixed;
    z-index: 9;
    top: 0;
    .app-head-left{
      width: 60%;
      min-width: 800px;
      float: left;
      h2{
        line-height: 60px;
        color: #fff;
        margin-left: 25px;
        font-size: 16px;
      }
      .app-icon{
        width: 30px;
        float: left;
        margin: 15px 10px 15px 10px;
      }
    }
    .app-head-right{
      float: right;
      margin-right: 100px;
      background-color: #373d41;
      button{
        background-color: rgba(0,0,0,0.3);
        border: none;
        color: #fff;
        line-height: 40px;
      }
      .logout-icon{
        width: 15px;
        position: relative;
        left: 5px;
        top: 2px;
      }
    }
  }
  .app-contain{
    height: 100%;
    overflow: auto;
    margin: 60px 10px 0 0;
    .app-menu{
      position: fixed;
      top: 60px;
      height: 100%;
      ul{
        width: 180px;
      }
    }
    .app-content{
      margin-left: 200px;
    }
  }
  .el-popover{
    .popover-contain{
      h2{
        font-size: 14px;
        color: #20a0ff;
      }
      ul{
        margin-top: 10px;
        li{
          font-size: 12px;
          div{
            line-height: 24px;
            display: inline-block;
          }
          div:nth-child(1){
            width: 50px;
            text-align: right;
          }
          div:nth-child(2){
            text-align: left;
            margin-left: 10px;
            width: 85px;
            word-break: break-all;
            vertical-align: top;
          }
          .popover-contain-link{
            display: block;
          }
        }
        .last-li{
          margin-bottom: 10px;
        }
      }
      .root-list{
        border-bottom: 1px solid #ccc;
        border-top: 1px solid #ccc;
        padding: 5px 0 5px 0;
        li{
          padding: 5px 10px 5px 10px;
        }
        .root-icon-pass{
          width: 18px;
          float: right;
        }
        .root-icon-lock{
          width: 15px;
          margin-right: 1px;
          float: right;
        }
      }
      .popover-contain-link-group{
        padding-top: 5px;
        li{
          padding: 5px 10px 5px 10px;
          a{
            display: block;
          }
          .link-icon{
            width: 18px;
            vertical-align: middle;
            margin-right: 10px;
          }
        }
        li:hover{
          background-color: rgba(0,0,0,0.1) !important;
        }
      }
    }
    .popover-button-group{
      margin-top: 10px;
      float: right;
      button{
        margin-left: 5px;
        font-size: 12px;
      }
    }
  }
</style>
