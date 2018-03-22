<template>
  <div class="account-model">
    <img src="../../assets/images/bread.png" alt="pancel" class="simPancel-icon">
    <el-breadcrumb separator="/" class="simPancel-breadcrumb">
      <el-breadcrumb-item>账户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="account-contain">
      <div class="account-card account-left-card">
        <div class="account-card-header">
          信息修改
        </div>
        <el-form ref="newUser" :rules="phoneRules" :model="newUser" label-width="100px" class="account-card-form">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="newUser.name"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="newUser.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="modifyInfo('newUser')">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="account-card account-right-card">
        <div class="account-card-header">
          密码修改
        </div>
        <el-form :rules="rules" ref="password" :model="password" label-width="100px" class="account-card-form">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input type="password" v-model="password.oldPassword"></el-input>
          </el-form-item>
          <el-form-item label="设置新密码" prop="newPassword">
            <el-input type="password" v-model="password.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmPassword">
            <el-input type="password" v-model="password.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="modifyPassword('password')">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'account',
    props: ["user"],
    created: function () {
      this.$store.state.adminleftnavnum="/account";
    },
    mounted: function () {
      this.getUserInfo();
    },
    data () {
      const confirmPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.password.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        newUser: {},
        password: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        rules: {
          oldPassword: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          ],
          confirmPassword: [
            { required: true, message: '请再次输入新密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
            { validator: confirmPass, trigger: 'blur' }
          ]
        },
        phoneRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { max: 20, message: '长度至多 20 个字符', trigger: 'blur' }
          ],
          phone: [
            { pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/, message: '手机号格式错误' }
          ]
        }
      }
    },
    methods: {
      getUserInfo() {
        this.$http.post('api/get_current_user_info.do',{
        }).then((res) => {
          this.newUser = res.data.data;
        }, (err) => {
          this.$message({
            message: '读取用户信息失败，请检查网络环境！',
            type: 'error',
            duration: 1500,
            showClose: true
          });
        });
      },
      modifyInfo(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/modify_user_info.do',{
              newName: this.newUser.name,
              newPhone: this.newUser.phone
            }).then((res) => {
              this.user.name = this.newUser.name;
              this.user.phone =  this.newUser.phone;
              this.$message({
                message: res.data.msg,
                type: res.data.success?'success':'error',
                duration: 1500,
                showClose: true
              });
            }, (err) => {
              this.$message({
                message: '修改信息失败，请检查网络环境！',
                type: 'error',
                duration: 1500,
                showClose: true
              });
            });
          }
        });
      },
      modifyPassword(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/modify_pwd.do',{
              oldPassword: this.password.oldPassword,
              newPassword: this.password.newPassword
            })
              .then((res) => {
                this.$message({
                  message: res.data.msg,
                  type: res.data.success?'success':'error',
                  duration: 1500,
                  showClose: true
                });
                if(res.data.success){
                  this.password = {};
                }
              }, (err) => {
                this.$message({
                  message: '修改密码失败，网络环境不稳定！',
                  type: 'error',
                  duration: 1500,
                  showClose: true
                });
              });
          } else {
            this.$message({
              message: '请完整填写表单',
              type: 'warning',
              duration: 1500,
              showClose: true
            });
            return false;
          }
        });
      }
    },
    watch: {
      '$route' (to, from) {
        if(from.path === '/account' || to.path === '/account'){
          this.getUserInfo();
        }
        if(to.path === '/account'){
          this.$refs['newUser'].resetFields();
          this.$refs['password'].resetFields();
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .account-contain{
    margin: 0 15px 130px 15px;
    min-height: 400px;
    overflow: hidden;
  }
  .account-card{
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    min-height: 200px;
    padding: 10px 20px 10px 20px;
  }
  .account-left-card{
    width: calc(~"50% - 50px");
    float: left;
    margin-right: 10px;
  }
  .account-right-card{
    width: calc(~"50% - 50px");
    float: right;
    margin-left: 10px;
  }
  .account-card-header{
    font-weight: bold;
    padding: 10px 5px 10px 5px;
    border-bottom: 2px solid #20a0ff;
  }
  .account-card-form{
    margin-top: 20px;
  }
</style>
