<template>
  <div class="simPancel-model">
    <img src="../../assets/images/bread.png" alt="pancel" class="simPancel-icon">
    <el-breadcrumb separator="/" class="simPancel-breadcrumb">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="user-contain">
      <el-button
        type="primary"
        @click="handleAddUserButton();" class="addUserButton">新增用户</el-button>
      <el-dialog
        title="新增用户"
        :before-close="handleClose"
        :visible.sync="dialogVisible"
        width="30%">
        <div>
          <el-form ref="form" :model="form" :rules="rules" label-width="70px">
            <el-form-item label="账号" prop="userNo">
              <el-input v-model="form.userNo"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleAddUser('form');">确 定</el-button>
        </span>
      </el-dialog>
      <el-tabs v-model="activeName">
        <el-tab-pane label="可用用户列表" name="activeUserList">
          <el-table
            :data="activeUserLists"
            v-loading="activeUserListLoading"
            style="width: 100%;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);">
            <el-table-column
              type="index"
              :index="activeIndex"
              label="序号"
              min-width="80">
            </el-table-column>
            <el-table-column
              prop="userNo"
              label="账号"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="id"
              label="数据库ID"
              v-if=false
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机"
              min-width="150">
            </el-table-column>
            <el-table-column label="SMO" min-width="100">
              <template slot-scope="scope">
                <el-switch @change="switchChange(scope.row.id,'smo');"
                           v-model="scope.row.smo"
                           active-color="#13ce66">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="OPC" min-width="100">
              <template slot-scope="scope">
                <el-switch @change="switchChange(scope.row.id,'opc');"
                           v-model="scope.row.opc"
                           active-color="#13ce66">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="SMPWO" min-width="100">
              <template slot-scope="scope">
                <el-switch @change="switchChange(scope.row.id,'smpwo');"
                           v-model="scope.row.smpwo"
                           active-color="#13ce66">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="偏振像差在线检测" min-width="100">
              <template slot-scope="scope">
                <el-switch @change="switchChange(scope.row.id,'pdod');"
                           v-model="scope.row.pdod"
                           active-color="#13ce66">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="150" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  plain
                  @click="handleDeleteOpen(scope.row.userNo,'active')">删除</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  plain
                  @click="handleFreeze(scope.row.userNo)">冻结</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="activeHandleSizeChange"
              @current-change="activeHandleCurrentChange"
              :current-page.sync="page.active.currentPage"
              :page-size="page.active.pageSize"
              layout="prev, pager, next, jumper"
              :total="page.active.total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="冻结用户列表" name="frozenUserList">
          <el-table
            :data="frozenUserLists"
            v-loading="frozenUserListLoading"
            style="width: 100%;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);">
            <el-table-column
              type="index"
              :index="frozenIndex"
              label="序号"
              min-width="80">
            </el-table-column>
            <el-table-column
              prop="userNo"
              label="账号"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="id"
              label="数据库ID"
              v-if=false
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机"
              min-width="150">
            </el-table-column>
            <el-table-column label="SMO" min-width="100">
              <template slot-scope="scope">
                <el-switch @change="switchChange(scope.row.id,'smo');"
                           v-model="scope.row.smo"
                           active-color="#13ce66">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="OPC" min-width="100">
              <template slot-scope="scope">
                <el-switch @change="switchChange(scope.row.id,'opc');"
                           v-model="scope.row.opc"
                           active-color="#13ce66">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="SMPWO" min-width="100">
              <template slot-scope="scope">
                <el-switch @change="switchChange(scope.row.id,'smpwo');"
                           v-model="scope.row.smpwo"
                           active-color="#13ce66">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="偏振像差在线检测" min-width="100">
              <template slot-scope="scope">
                <el-switch @change="switchChange(scope.row.id,'pdod');"
                           v-model="scope.row.pdod"
                           active-color="#13ce66">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="150" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  plain
                  @click="handleDeleteOpen(scope.row.userNo,'frozen')">删除</el-button>
                <el-button
                  size="mini"
                  type="success"
                  plain
                  @click="handleActivate(scope.row.userNo)">激活</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="frozenHandleSizeChange"
              @current-change="frozenHandleCurrentChange"
              :current-page.sync="page.frozen.currentPage"
              :page-size="page.frozen.pageSize"
              layout="prev, pager, next, jumper"
              :total="page.frozen.total">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'userManagement',
    props: ["user"],
    created: function () {
      this.$store.state.adminleftnavnum="/user";
    },
    mounted: function () {
      this.getActiveUserList();
      this.getFrozenUserList();
    },
    data () {
      return {
        activeName: 'activeUserList',
        dialogVisible: false,
        activeUserListLoading: true,
        frozenUserListLoading: true,
        rules: {
          userNo: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { max: 20, message: '长度至多 20 个字符', trigger: 'blur' }
          ],
          phone: [
            { pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/, message: '手机号格式错误' }
          ]
        },
        activeIndex: 1,
        frozenIndex: 1,
        form: {
          userNo: '',
          name: '',
          phone: ''
        },
        page: {
          frozen: {
            currentPage: 1,
            pageSize: 10,
            total: 0
          },
          active: {
            currentPage: 1,
            pageSize: 10,
            total: 0
          }
        },
        activeUserLists: [],
        frozenUserLists: []
      }
    },
    methods: {
      // 新增用户
      handleAddUserButton() {
        this.form = {};
        this.dialogVisible = true;
      },
      handleClose(done) {
        this.$refs['form'].resetFields();
        this.dialogVisible = false;
      },
      handleAddUser(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/add_user.do',{
              userNo: this.form.userNo,
              name: this.form.name,
              phone: this.form.phone
            }).then((res) => {
              this.dialogVisible = false;
              this.$message({
                message: res.data.msg,
                type: res.data.success?'success':'error',
                duration: 1500,
                showClose: true
              });
              this.getActiveUserList();
            }, (err) => {
              this.$message({
                message: '新增用户失败，请检查网络环境！',
                type: 'error',
                duration: 1500,
                showClose: true
              });
            });
          } else {
            return false;
          }
        });
      },
      // 分页
      activeHandleSizeChange(val) {
        this.page.active.currentPage = 1;
      },
      activeHandleCurrentChange(val) {
        this.page.active.currentPage = val;
        this.getActiveUserList();
      },
      frozenHandleSizeChange(val) {
        this.page.frozen.currentPage = 1;
      },
      frozenHandleCurrentChange(val) {
        this.page.frozen.currentPage = val;
        this.getFrozenUserList();
      },
      // 删除
      handleDeleteOpen(userNo,type){
        this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.handleDelete(userNo,type);
        }).catch(() => {
        });
      },
      handleDelete(userNo,type){
        this.$http.post('api/delete_the_user.do',{
          userNo: userNo,
        }).then((res) => {
          this.$message({
            message: res.data.msg,
            type: res.data.success?'success':'error',
            duration: 1500,
            showClose: true
          });
          if(type === 'active'){
            this.getActiveUserList();
          }else if(type === 'frozen'){
            this.getFrozenUserList();
          }
        }, (err) => {
          this.$message({
            message: '删除用户失败，请检查网络环境！',
            type: 'error',
            duration: 1500,
            showClose: true
          });
        });
      },
      // 冻结
      handleFreeze(userNo){
        this.$http.post('api/freeze_the_user.do',{
          userNo: userNo,
        }).then((res) => {
          this.$message({
            message: res.data.msg,
            type: res.data.success?'success':'error',
            duration: 1500,
            showClose: true
          });
          this.getActiveUserList();
          this.getFrozenUserList();
        }, (err) => {
          this.$message({
            message: '冻结用户失败，请检查网络环境！',
            type: 'error',
            duration: 1500,
            showClose: true
          });
        });
      },
      // 激活
      handleActivate(userNo){
        this.$http.post('api/activate_the_user.do',{
          userNo: userNo,
        }).then((res) => {
          this.$message({
            message: res.data.msg,
            type: res.data.success?'success':'error',
            duration: 1500,
            showClose: true
          });
          this.getActiveUserList();
          this.getFrozenUserList();
        }, (err) => {
          this.$message({
            message: '激活用户失败，请检查网络环境！',
            type: 'error',
            duration: 1500,
            showClose: true
          });
        });
      },
      // 开关
      switchChange(userId,roleName){
        this.$http.post('api/change_the_role_of_the_user.do',{
          userId: userId,
          roleName: roleName
        }).then((res) => {
          this.getActiveUserList();
          this.getFrozenUserList();
        }, (err) => {
          this.$message({
            message: '权限控制失败，请检查网络环境！',
            type: 'error',
            duration: 1500,
            showClose: true
          });
        });
      },
      getActiveUserList() {
        this.$http.post('api/get_all_active_users.do',{
          pageNum: this.page.active.currentPage,
          pageSize: this.page.active.pageSize
        }).then((res) => {
          this.activeUserListLoading = false;
          this.activeUserLists = res.data.data.list;
          for(let i=0;i<this.activeUserLists.length;i++){
            for(let j=0;j<this.activeUserLists[i].roles.length;j++){
              if(this.activeUserLists[i].roles[j] === 'admin'){
                this.activeUserLists[i].admin = true;
                this.activeUserLists[i].smo = true;
                this.activeUserLists[i].opc = true;
                this.activeUserLists[i].smpwo = true;
                this.activeUserLists[i].pdod = true;
              }
              if(this.activeUserLists[i].roles[j] === 'smo'){
                this.activeUserLists[i].smo = true;
              }
              if(this.activeUserLists[i].roles[j] === 'opc'){
                this.activeUserLists[i].opc = true;
              }
              if(this.activeUserLists[i].roles[j] === 'smpwo'){
                this.activeUserLists[i].smpwo = true;
              }
              if(this.activeUserLists[i].roles[j] === 'pdod'){
                this.activeUserLists[i].pdod = true;
              }
            }
          }
          this.page.active.total = res.data.data.total;
          this.activeIndex = (this.page.active.currentPage - 1 ) * this.page.active.pageSize + 1;
        }, (err) => {
          this.$message({
            message: '读取用户列表失败，请检查网络环境！',
            type: 'error',
            duration: 1500,
            showClose: true
          });
        });
      },
      getFrozenUserList() {
        this.$http.post('api/get_all_frozen_users.do',{
          pageNum: this.page.frozen.currentPage,
          pageSize: this.page.frozen.pageSize
        }).then((res) => {
          this.frozenUserListLoading = false;
          this.frozenUserLists = res.data.data.list;
          for(let i=0;i<this.frozenUserLists.length;i++){
            for(let j=0;j<this.frozenUserLists[i].roles.length;j++){
              if(this.frozenUserLists[i].roles[j] === 'admin'){
                this.frozenUserLists[i].admin = true;
                this.frozenUserLists[i].smo = true;
                this.frozenUserLists[i].opc = true;
                this.frozenUserLists[i].smpwo = true;
                this.frozenUserLists[i].pdod = true;
              }
              if(this.frozenUserLists[i].roles[j] === 'smo'){
                this.frozenUserLists[i].smo = true;
              }
              if(this.frozenUserLists[i].roles[j] === 'opc'){
                this.frozenUserLists[i].opc = true;
              }
              if(this.frozenUserLists[i].roles[j] === 'smpwo'){
                this.frozenUserLists[i].smpwo = true;
              }
              if(this.frozenUserLists[i].roles[j] === 'pdod'){
                this.frozenUserLists[i].pdod = true;
              }
            }
          }
          this.page.frozen.total = res.data.data.total;
          this.frozenIndex = (this.page.frozen.currentPage - 1 ) * this.page.frozen.pageSize + 1;
        }, (err) => {
          this.$message({
            message: '读取用户列表失败，请检查网络环境！',
            type: 'error',
            duration: 1500,
            showClose: true
          });
        });
      },
      checkRoot() {
        if(!this.user.admin) {
          this.$router.push('/simPancel');
        }
      }
    },
    watch: {
      '$route' (to, from) {
        if(to.path === '/user'){
          this.checkRoot();
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .user-contain{
    margin: 0 15px 70px 15px;
    position: relative;
  }
  .addUserButton{
    position: absolute;
    right: 0;
    top: -38px;
  }
  .pagination{
    float: right;
    margin: 10px 0 10px 0;
    overflow: hidden;
  }
</style>
