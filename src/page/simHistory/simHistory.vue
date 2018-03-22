<template>
  <div class="simHistory-model">
    <img src="../../assets/images/bread.png" alt="pancel" class="simPancel-icon">
    <el-breadcrumb separator="/" class="simPancel-breadcrumb">
      <el-breadcrumb-item>仿真历史</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search-group">
      <el-form ref="form" :model="form" label-width="15px">
        <el-form-item>
          <el-date-picker
            class="fl"
            popper-class="date-picker"
            value-format="yyyy-MM-dd"
            v-model="form.date"
            type="daterange"
            align="left"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
          <el-col :span="5" style="margin-left: 30px;">
            <el-select v-model="form.moduleName" placeholder="请选择" popper-class="moduleName-sel">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-input
              class="userNameSearch"
              placeholder="请输入账号"
              v-model="form.userNo"
              clearable>
            </el-input>
          </el-col>
          <el-button type="primary" icon="search" class="query" @click="getSimHistory('query')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="simHistory-download">
      <div class="simHistory-record">
        <span>{{user.name}}</span>，您当前可查看的仿真条数是<span> {{page.total || 0}} </span>条
      </div>
      <!--<el-button type="text" class="download"><i class="el-icon-document"></i>导出数据</el-button>-->
    </div>
    <div class="simHistory-contain">
      <el-table
        :data="simHistoryData"
        v-loading="simHistoryLoading"
        style="width: 100%;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);">
        <el-table-column
          type="index"
          :index="index"
          label="序号"
          min-width="50">
        </el-table-column>
        <el-table-column
          prop="userNo"
          label="账号"
          min-width="140">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机"
          min-width="140">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="仿真开始时间"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="仿真结束时间"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="moduleName"
          label="仿真类型"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="parameter"
          min-width="100"
          label="仿真参数">
          <template slot-scope="scope">
            <router-link :to="{ path: '/simPancel/' + scope.row.moduleName + 'View' , query: { parametersId: scope.row.parametersId, resultId: scope.row.resultId, type: 'Parameters'}}">
              <span class="simHistory-link">查看参数</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="result"
          label="仿真结果"
          min-width="100">
          <template slot-scope="scope">
            <router-link :to="{ path: '/simPancel/' + scope.row.moduleName + 'View' , query: { parametersId: scope.row.parametersId, resultId: scope.row.resultId, type: 'Convergence'}}">
              <span class="simHistory-link">查看结果</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          v-if="false"
          prop="parametersId"
          label="parametersId">
        </el-table-column>
        <el-table-column
          v-if="false"
          prop="resultId"
          label="resultId">
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page.currentPage"
          :page-size="page.pageSize"
          layout="prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'simHistory',
    props: ["user"],
    created: function () {
      this.getSimHistory();
      this.$store.state.adminleftnavnum="/simHistory";
    },
    methods: {
      //分页
      handleSizeChange(val) {
        this.page.currentPage = 1;
      },
      handleCurrentChange(val) {
        this.page.currentPage = val;
        this.getSimHistory();
      },
      getSimHistory(type) {
        if(type === 'query'){
          this.page.currentPage = 1;
        }
        this.$http.post('api/get_all_simulation_records.do',{
          startDay: this.form.date ? this.form.date[0]:'',
          endDay: this.form.date ? this.form.date[1]:'',
          userNo: this.form.userNo,
          moduleName: this.form.moduleName,
          pageNum: this.page.currentPage,
          pageSize: this.page.pageSize
        }).then((res) => {
          this.simHistoryData = res.data.data.list;
          this.page.total = res.data.data.total;
          this.index = (this.page.currentPage - 1 ) * this.page.pageSize + 1;
          this.simHistoryLoading = false;
        }, (err) => {
          this.$message({
            message: '读取仿真历史失败，请检查网络环境！',
            type: 'error',
            duration: 1500,
            showClose: true
          });
        });
      }
    },
    data () {
      return {
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        form: {
          date: ['',''],
          userNo: '',
          moduleName: ''
        },
        options: [{
          value: '',
          label: '全部'
        }, {
          value: 'smo',
          label: 'SMO'
        }, {
          value: 'opc',
          label: 'OPC'
        }, {
          value: 'smpwo',
          label: 'SMPWO'
        }, {
          value: 'pdod',
          label: '偏振像差在线检测'
        }],
        simHistoryData: [],
        simHistoryLoading: true,
        index: 1,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    watch: {
      '$route' (to, from) {
        if(to.path === '/simHistory'){
          this.getSimHistory();
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .simHistory-contain{
    margin: 10px 15px 130px 15px;
  }
  .simHistory-download{
    margin-right: 15px;
    overflow: hidden;
    .simHistory-record{
      float: left;
      line-height: 34px;
      margin-left: 15px;
      span{
        font-weight: bold;
        color: #20a0ff;
      }
    }
    .download{
      float: right;
    }
    .el-icon-document{
      margin-right: 5px;
    }
  }
  .search-group{
    .line{
      width: 10%;
      div{
        text-align: right;
        padding-right: 12px;
      }
    }
    .el-form-item{
      margin-bottom: 5px;
    }
    .userNameSearch{
      margin-left: 30px;
    }
    .query{
      margin-left: 60px;
    }
  }
  .pagination{
    float: right;
    margin: 10px 0 10px 0;
    overflow: hidden;
  }
  .simHistory-link{
    color: #20a0ff;
  }
  .date-picker{
    top:95px !important;
  }
  .moduleName-sel{
    top:95px !important;
  }
</style>
