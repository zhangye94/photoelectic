<template>
  <div class="simPancel-pdod-model">
    <div class="top-form">
      <el-upload class="upload" action="https://jsonplaceholder.typicode.com/posts/">
        <el-button size="small" type="primary">导入 txt 光强文件</el-button>
      </el-upload>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="照明方式" class="radio-contain">
          <el-radio-group v-model="form.resource">
            <el-radio label="传统"></el-radio>
            <el-radio label="离轴（预留窗口）"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="掩模种类选择" class="radio-contain radio-contain-ym">
          <el-radio-group v-model="form.resource">
            <el-radio label="二元"></el-radio>
            <el-radio label="相移"></el-radio>
            <el-radio label="正弦"></el-radio>
            <el-radio label="预留窗口"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="bottom-form">
      <div class="left-form">
        <div class="left-form-header">8个掩模摆放角度<div class="left-form-header-right">该角度下光强分布的+1阶谱数值J1-J22</div></div>
        <el-tabs v-model="activeName" tab-position="left">
          <el-tab-pane label="0°" name="0">
            <el-form ref="form" :model="form" label-width="80px" size="mini" style="margin-top: 10px;">
              <el-form-item label="活动名称" v-for="item in items">
                <el-input v-model="item.value"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="22.5°" name="22.5">22.5°</el-tab-pane>
          <el-tab-pane label="45°" name="45">45°</el-tab-pane>
          <el-tab-pane label="67.5°" name="67.5">67.5°</el-tab-pane>
          <el-tab-pane label="90°" name="90">90°</el-tab-pane>
          <el-tab-pane label="112.5°" name="112.5">112.5°</el-tab-pane>
          <el-tab-pane label="135°" name="135">135°</el-tab-pane>
          <el-tab-pane label="157.5°" name="157.5">157.5°</el-tab-pane>
        </el-tabs>
      </div>
      <div class="right-form">
        <div class="notRunning">
          <img src="../../assets/images/result.png" alt="result" class="result-icon">
          <span>点击 Start 后可查看运行结果</span>
        </div>
        <div class="right-form-button">
          <el-button type="primary" icon="el-icon-upload2">Start</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pdod',
    created: function () {
      this.$store.state.adminleftnavnum="/simPancel";
    },
    data () {
      return {
        activeName: '0',
        items: [
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
        ],
        form: {
          resource: ''
        }
      }
    },
    methods: {
    }
  }
</script>

<style lang="less">
  .simPancel-pdod-model{
    margin: 0 20px 130px 0;
    .top-form{
      overflow: hidden;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      padding: 15px;
      .radio-contain{
        float: left;
        width: 420px;
      }
      .radio-contain-ym{
        width: 430px;
      }
      .el-form-item{
        margin-bottom: 0;
      }
    }
    .bottom-form{
      overflow: hidden;
      margin-top: 20px;
    }
    .upload{
      width: 150px;
      float: left;
      margin-top: 3px;
    }
    .left-form{
      width: calc(~"22%");
      background-color: #fff;
      padding: 0 20px 20px 20px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      float: left;
      .left-form-header{
        color: #20a0ff;
        padding: 15px 0 15px 0;
        font-size: 12px;
        .left-form-header-right{
          word-break: break-all;
          float: right;
          width: 110px;
        }
      }
      .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
        margin-bottom: 5px;
      }
    }
    .right-form{
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      min-height: 400px;
      width: calc(~"78% - 60px");
      margin-left: 20px;
      float: left;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .result-icon{
        width: 150px;
        vertical-align: middle;
      }
      .notRunning{
        flex: 1;
        height: 120px;
        color: #cdcdcd;
      }
      .right-form-button{
        position: absolute;
        bottom: 20px;
      }
    }
  }
</style>
