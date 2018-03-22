<template>
  <div class="login">
    <div class="page-container">
      <h1 class="login-h1">北京理工大学集成光刻仿真并行计算软件</h1>
      <el-form ref="form" :model="form" class="login-form">
        <el-form-item>
          <el-input v-model="form.account" placeholder="请输入账号" class="login-input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" @keyup.enter.native="login();" type="password" placeholder="请输入密码" class="login-input"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="login();" class="login-button">登录</el-button>
      <div class="connect">
        <p>Lithography imaging performance simulation, lithography imaging performance data query and analysis</p>
        <p style="margin-top:20px;">光刻成像性能的仿真、光刻成像性能数据的查询和分析</p>
      </div>
    </div>
    <div class="alert" style="display:none">
      <h2>消息</h2>
      <div class="alert_con">
        <p id="ts"></p>
        <p style="line-height:70px"><a class="btn">确定</a></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data(){
      return {
        isLoging: false,
        form: {
          account: '',
          password: ''
        }
      }
    },
    methods:{

      //登录逻辑
      login(){
        if(this.form.account!='' && this.form.password!=''){
          this.toLogin();
        }
      },

      //登录请求
      toLogin(){
        //sha 1算法加密
        let password_sha = hex_sha1(hex_sha1( this.form.password ));
        //登录参数
        let loginParam = {
          account: this.form.account,
          password_sha
        };

        //权限控制模拟
//        if(this.account == 10001){
//          localStorage.root = 10001;
//        }else if(this.account == 10002){
//          localStorage.root = 10002;
//        }else if(this.account == 10003){
//          localStorage.root = 10003;
//        }else if(this.account == 10004){
//          localStorage.root = 10004;
//        }else if(this.account == 10005){
//          localStorage.root = 10005;
//        }
        //设置在登录状态
        this.isLoging = true;

        //请求后端,比如:
        /*this.$http.post( 'example.com/login.php', {
         param: loginParam).then((response) => {
         if(response.data.code == 1){
         let expireDays = 1000 * 60 * 60 * 24 * 15;
         this.setCookie('session', response.data.session, expireDays);
         //登录成功后
         this.$router.push('/user_info');
         }
         }, (response) => {
         //Error
         });
         */
        let expireDays = 1000 * 60 * 60 * 24 * 15;
        this.setCookie('session','blablablablabla...', expireDays);
        this.isLoging = false;

        this.$http.post('api/login.do',{
          username: this.form.account,
          password: this.form.password,
        }).then((res) => {
          if(res.data.success){
            this.$router.push('/simPancel');
          }else{
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        }, (err) => {
        });
      },
    }
  }
</script>

<style>
  .login-form{
    width: 300px;
    margin-top: 40px;
  }
  .login-button{
    width: 100px;
    -moz-box-shadow:
      0 15px 30px 0 rgba(255,255,255,.25) inset,
      0 2px 7px 0 rgba(0,0,0,.2);
    -webkit-box-shadow:
      0 15px 30px 0 rgba(255,255,255,.25) inset,
      0 2px 7px 0 rgba(0,0,0,.2);
    box-shadow:
      0 15px 30px 0 rgba(255,255,255,.25) inset,
      0 2px 7px 0 rgba(0,0,0,.2);
    text-shadow: 0 1px 2px rgba(0,0,0,.1);
    -o-transition: all .2s;
    -moz-transition: all .2s;
    -webkit-transition: all .2s;
    -ms-transition: all .2s;
    background: rgba(45,45,45,.15);
    color: #fff;
    border: 0px;
  }
  .login-input input{
    background: #2d2d2d; /* browsers that don't support rgba */
    *background-color:transparent;
    background: rgba(45,45,45,.15);
    border: 1px solid #3d3d3d; /* browsers that don't support rgba */
    border: 1px solid rgba(255,255,255,.15);
    -moz-box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
    -webkit-box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,.1);
    -o-transition: all .2s;
    -moz-transition: all .2s;
    -webkit-transition: all .2s;
    -ms-transition: all .2s;
  }
  .login-input input:-moz-placeholder { color: #fff; }
  .login-input input:-ms-input-placeholder { color: #fff; }
  .login-input input::-webkit-input-placeholder { color: #fff; }

  .login-input input:focus {
    outline: none;
    border: 1px solid rgba(255,255,255,.15);
    -moz-box-shadow:
      0 2px 3px 0 rgba(0,0,0,.1) inset,
      0 2px 7px 0 rgba(0,0,0,.2);
    -webkit-box-shadow:
      0 2px 3px 0 rgba(0,0,0,.1) inset,
      0 2px 7px 0 rgba(0,0,0,.2);
    box-shadow:
      0 2px 3px 0 rgba(0,0,0,.1) inset,
      0 2px 7px 0 rgba(0,0,0,.2);
  }
</style>
