<template>
  <div class="simPancel-smo-model">
    <el-tabs v-model="activeName">
      <el-tab-pane label="Parameters" name="Parameters">
        <div class="start" style="overflow: hidden;">
          <el-button class="fl" type="primary" icon="el-icon-upload2" @click="checkSim();" :disabled="ifRunning || startDisabled" :loading="startDisabled">Start</el-button>
          <el-progress class="fl" style="width: 80%;margin: 10px 0 0 30px;" :percentage="progress" v-show="ifRunning"></el-progress>
        </div>
        <div class="top-card top-card-input">
          <div class="card-body">
            <div class="fl">
              <el-upload class="upload" action="api/upload.do"
                         ref="upload"
                         :on-success="handleUploadSuccess"
                         :before-upload="beforeUpload"
                         :disabled="ifRunning || startDisabled"
                         :before-remove="beforeRemove"
                         :limit="1">
                <el-button size="small" type="primary">Initial Mask Pattern</el-button>
              </el-upload>
            </div>
            <el-form ref="form" :model="form" label-width="100px" size="mini" class="corenum-input fl" style="margin-left: 40px;">
              <el-form-item label="Core Number">
                <el-input v-model="form.cn" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="140px" size="mini" class="corenum-input fl" style="margin-left: 40px;">
              <el-form-item label="历史成功仿真次数">
                <div>:<span class="paramContent">{{performedTasks}}</span></div>
              </el-form-item>
            </el-form>
            <el-button @click="resetStatus()" size="small" type="primary" style="margin-left: 60px;">重置运行状态</el-button>
          </div>
        </div>
        <div class="card">
          <div class="card-header">掩模参数</div>
          <div class="card-form">
            <el-form ref="form" :model="form" label-width="180px" size="mini">
              <el-form-item label="掩模尺寸">
                <el-input v-model="form.md" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
              <el-form-item label="像素大小（nm）">
                <el-input v-model="form.ps" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
              <el-form-item label="掩模反射层反射系数">
                <el-input v-model="form.re" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
              <el-form-item label="掩模吸收层吸收系数">
                <el-input v-model="form.ab" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
              <el-form-item label="近侧最大阴影宽度">
                <el-input v-model="form.sn" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
              <el-form-item label="远侧最大阴影宽度">
                <el-input v-model="form.sf" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="card">
          <div class="card-header">优化参数</div>
          <div class="card-form">
            <el-form ref="form" :model="form" label-width="180px" size="mini">
              <el-form-item label="掩模主图形优化步长">
                <el-input v-model="form.sm" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
              <el-form-item label="掩模辅助图形优化步长">
                <el-input v-model="form.ssr" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
              <el-form-item label="光源图形优化步长">
                <el-input v-model="form.sso" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
              <el-form-item label="掩模罚函数权重因子">
                <el-input v-model="form.omq" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
              <el-form-item label="光源罚函数权重因子">
                <el-input v-model="form.osq" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
              <el-form-item label="最大循环次数">
                <el-input v-model="form.ma" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
              <el-form-item label="误差阈值">
                <el-input v-model="form.ep" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
              <el-form-item label="光刻胶阈值">
                <el-input v-model="form.rt" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
              <el-form-item label="光刻胶倾斜因子">
                <el-input v-model="form.rs" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="card">
          <div class="card-header">光源参数</div>
          <div class="card-form">
            <el-form ref="form" :model="form" label-width="180px" size="mini">
              <el-form-item label="波长（nm）">
                <el-input v-model="form.wa" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
              <el-form-item label="内相干因子">
                <el-input v-model="form.si" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
              <el-form-item label="外相干因子">
                <el-input v-model="form.so" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
              <el-form-item label="阴影系数">
                <el-input v-model="form.ff" :disabled=true></el-input>
              </el-form-item>
              <el-form-item label="数值孔径">
                <el-input v-model="form.na" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
              <el-form-item label="缩放率">
                <el-input v-model="form.ra" :disabled="ifRunning || startDisabled"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Convergence" name="Convergence">
        <div class="top-card">
          <div class="card-body">
            <div class="top-card-text">Iteration number:<span>{{intermediateResult.iterationCount || 0}}</span></div>
            <div class="top-card-text">Pattern Error:<span>{{intermediateResult.error || 0}}</span></div>
          </div>
        </div>
        <div style="overflow: hidden;">
          <div class="img-card">
            <div class="card-header">Source Pattern</div>
            <div class="notRunning-contain" v-show="!intermediateResult.smoSourcePatternPng">
              <div class="notRunning">
                <img src="../../assets/images/result.png" alt="result" class="result-icon">
                <span>未运行或暂无中间结果</span>
              </div>
            </div>
            <div class="img-card-body" v-show="intermediateResult.smoSourcePatternPng">
              <img :src="'http://' + ip + '/inter/' + intermediateResult.smoSourcePatternPng" class="output-img" @click="handleImgClick('smoSourcePatternPng')">
              <i class="el-icon-zoom-in"></i>
              <el-dialog :visible.sync="dialogVisible.smoSourcePatternPng">
                <img width="100%" :src="'http://' + ip + '/inter/' + intermediateResult.smoSourcePatternPng" alt="服务器未找到该图片">
              </el-dialog>
            </div>
          </div>
          <div class="img-card">
            <div class="card-header">Mask Pattern</div>
            <div class="notRunning-contain" v-show="!intermediateResult.smoMaskPattrenPng">
              <div class="notRunning">
                <img src="../../assets/images/result.png" alt="result" class="result-icon">
                <span>未运行或暂无中间结果</span>
              </div>
            </div>
            <div class="img-card-body" v-show="intermediateResult.smoMaskPattrenPng">
              <img :src="'http://' + ip + '/inter/' + intermediateResult.smoMaskPattrenPng" class="output-img" @click="handleImgClick('smoMaskPattrenPng')">
              <i class="el-icon-zoom-in"></i>
              <el-dialog :visible.sync="dialogVisible.smoMaskPattrenPng">
                <img width="100%" :src="'http://' + ip + '/inter/' + intermediateResult.smoMaskPattrenPng" alt="服务器未找到该图片">
              </el-dialog>
            </div>
          </div>
          <div class="img-card">
            <div class="card-header">Print Image</div>
            <div class="notRunning-contain" v-show="!intermediateResult.smoPrintImagePng">
              <div class="notRunning">
                <img src="../../assets/images/result.png" alt="result" class="result-icon">
                <span>未运行或暂无中间结果</span>
              </div>
            </div>
            <div class="img-card-body" v-show="intermediateResult.smoPrintImagePng">
              <img :src="'http://' + ip + '/inter/' + intermediateResult.smoPrintImagePng" class="output-img" @click="handleImgClick('smoPrintImagePng')">
              <i class="el-icon-zoom-in"></i>
              <el-dialog :visible.sync="dialogVisible.smoPrintImagePng">
                <img width="100%" :src="'http://' + ip + '/inter/' + intermediateResult.smoPrintImagePng" alt="服务器未找到该图片">
              </el-dialog>
            </div>
          </div>
          <div class="img-card">
            <div class="card-header">Convergence Curve</div>
            <div class="notRunning-contain" v-show="!intermediateResult.smoErrorConvergencePng">
              <div class="notRunning">
                <img src="../../assets/images/result.png" alt="result" class="result-icon">
                <span>未运行或暂无中间结果</span>
              </div>
            </div>
            <div class="img-card-body" v-show="intermediateResult.smoErrorConvergencePng">
              <img :src="'http://' + ip + '/inter/' + intermediateResult.smoErrorConvergencePng" class="output-img" @click="handleImgClick('smoErrorConvergencePng')">
              <i class="el-icon-zoom-in"></i>
              <el-dialog :visible.sync="dialogVisible.smoErrorConvergencePng">
                <img width="100%" :src="'http://' + ip + '/inter/' + intermediateResult.smoErrorConvergencePng" alt="服务器未找到该图片">
              </el-dialog>
            </div>
          </div>
          <div class="img-card">
            <div class="card-header">加权误差收敛曲线</div>
            <div class="notRunning-contain" v-show="!intermediateResult.smoErrorConvergenceWeightPng">
              <div class="notRunning">
                <img src="../../assets/images/result.png" alt="result" class="result-icon">
                <span>未运行或暂无中间结果</span>
              </div>
            </div>
            <div class="img-card-body" v-show="intermediateResult.smoErrorConvergenceWeightPng">
              <img :src="'http://' + ip + '/inter/' + intermediateResult.smoErrorConvergenceWeightPng" class="output-img" @click="handleImgClick('smoErrorConvergenceWeightPng')">
              <i class="el-icon-zoom-in"></i>
              <el-dialog :visible.sync="dialogVisible.smoErrorConvergenceWeightPng">
                <img width="100%" :src="'http://' + ip + '/inter/' + intermediateResult.smoErrorConvergenceWeightPng" alt="服务器未找到该图片">
              </el-dialog>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'smo',
    props: ["user"],
    created: function () {
      this.$store.state.adminleftnavnum="/simPancel";
    },
    mounted: function () {
      this.getIfRunning();
    },
    data () {
      return {
        dialogVisible: {
          smoErrorConvergencePng: false,
          smoPrintImagePng: false,
          smoMaskPattrenPng: false,
          smoErrorConvergenceWeightPng: false,
          smoSourcePatternPng: false
        },
        activeName: 'Parameters',
        tmp: 'http://10.1.0.121:8080/tmp/',
        inputMask: '',
        startDisabled: false,
        gdResultSmo: '',
        inputMaskHash: '',
        ifRunning: false,
        loopFlag: true,
        progress: 0,
        performedTasks: 0,
        ip: '',
        status: 8,
        intermediateResult: {},
        form: {
          md: 201,
          ps: 11,
          re: 0.64,
          ab: 0.005,
          sn: 1.424,
          sf: 1.835,
          sm: 0.1,
          ssr: 0.1,
          sso: 0.03,
          omq: 0.0005,
          osq: 0.001,
          ma: 1,//150
          ep: 100,
          rt: 0.25,
          rs: 25,
          wa: 13.5,
          si: 0.24,
          so: 0.84,
          ff: 0.169,
          na: 0.25,
          ra: 4,
          cn: 4
        }
      }
    },
    methods: {
      handleImgClick(type) {
        this.dialogVisible[type] = true;
      },
      resetStatus() {
        this.$confirm('此操作将重置你在该模块的运行状态, 请确认你在该模块下已无正在运行的仿真', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$http.post('api/reset_running_state.do',{
            moduleName : 'smo'
          }).then((res) => {
            this.$message({
              message: res.data.msg,
              type: 'success',
              duration: 1500,
              showClose: true
            });
            this.getIfRunning('reset');
          }, (err) => {
            this.$message({
              message: '重置模块运行状态失败，请检查网络环境！',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          });
        }).catch(() => {
        });
      },
      getIfRunning(type) {
        this.$http.post('api/get_running_state.do',{
          moduleName : 'smo'
        }).then((res) => {
            if(res.data.data.performedTasks){
              this.performedTasks = res.data.data.performedTasks
            }
            if(this.loopFlag){
              if(res.data.status === 9){
                this.status = 9;
                this.$message({
                  message: res.data.msg,
                  type: 'info',
                  duration: 1500,
                  showClose: true
                });
                if(localStorage.progressPer){
                    this.progress = Number(localStorage.progressPer);
                }
                this.ifRunning = true;
                this.loopFlag = true;
                // 假进度条
                // if(this.progress < 99){
                //   this.progress += 1;
                // }else{
                //   this.progress = this.progress + 0.5 * ( 1 - this.progress );
                // }
                // 真进度条
                if(res.data.data.iterationCount){
                  this.progress += (res.data.data.iterationCount * 100 / this.form.ma);
                }


                localStorage.setItem('progressPer',this.progress);
                if(res.data.data.smoErrorConvergencePng || res.data.data.smoPrintImagePng || res.data.data.smoMaskPattrenPng || res.data.data.smoSourcePatternPng){
                  this.intermediateResult = res.data.data;
                  this.ip = res.data.data.ip;
                }
                setTimeout(() => {
                  this.getIfRunning();
                }, 60000);
              }else if((res.data.status === 8 && this.status != 9) || type === 'reset'){
                this.status = 8;
                if(localStorage.progressPer){
                  localStorage.removeItem('progressPer');
                }else{
                  localStorage.progressPer = 0;
                }
                this.ifRunning = false;
              }else if(res.data.status === 8 && this.status == 9){
                this.status = 8;
                if(localStorage.progressPer){
                  localStorage.removeItem('progressPer');
                }else{
                  localStorage.progressPer = 0;
                }
                this.$notify({
                  title: '成功',
                  message: '仿真已经完成，请在仿真历史中查看仿真参数和结果！',
                  type: 'success',
                  duration: 0,
                  offset: 60
                });
                this.$router.push({ path: '/simHistory' });
//                this.$router.push({ path: '/simPancel/smoView', query: { parametersId: res.data.data.parametersId, resultId: res.data.data.id, type: 'Convergence'}});
              }
            }
        }, (err) => {
          this.$message({
            message: '获取模块运行状态失败，请检查网络环境！',
            type: 'error',
            duration: 1500,
            showClose: true
          });
        });
      },
      checkSim() {
        if(this.inputMask != ''){
          this.startDisabled = true;
          this.$refs.upload.clearFiles();
          setTimeout(() => {
            this.startDisabled = false;
          }, 5000);
          this.$http.post('api/smo_parameters_simulated.do',{
            maskDimension: this.form.md,
            pixelSize: this.form.ps,
            reflect: this.form.re,
            absorb: this.form.ab,
            shadowNear: this.form.sn,
            shadowFar: this.form.sf,
            wavelength: this.form.wa,
            sigmaIn: this.form.si,
            sigmaOut: this.form.so,
            tis: this.form.ff,
            na: this.form.na,
            ratio: this.form.ra,
            stepSource: this.form.sso,
            omegaSourceQua: this.form.osq,
            stepMaskMain: this.form.sm,
            stepMaskSraf: this.form.ssr,
            omegaMaskQua: this.form.omq,
            maxloopSmo: this.form.ma,
            threshold: this.form.ep,
            tr: this.form.rt,
            aSource: this.form.rs,
            coreNum: this.form.cn,
            inputMask: this.inputMask,
            inputMaskHash: this.inputMaskHash
          }).then((res) => {
            if(res.data.status === 3){
              this.$confirm('该组参数已经仿真过，是否需要重新仿真？', '提示', {
                confirmButtonText: '重新仿真',
                cancelButtonText: '查看仿真历史',
                type: 'warning',
                center: true
              }).then(() => {
                this.startSim();
              }).catch(() => {
                this.$router.push({ path: '/simPancel/smoView', query: { parametersId: res.data.data.parametersId, resultId: res.data.data.resultId, type: 'Convergence'}});
              });
            }else{
              this.$message({
                message: res.data.msg,
                type: res.data.success ?'success': 'error',
                duration: 1500,
                showClose: true
              });
              this.startSim();
            }
          }, (err) => {
          });
        }else{
          this.$message({
            message: '请先上传.mat文件！',
            type: 'warning',
            duration: 1500,
            showClose: true
          });
        }
      },
      startSim() {
        this.startDisabled = true;
        setTimeout(() => {
          this.startDisabled = false;
        }, 5000);
        setTimeout(() => {
          this.getIfRunning();
        }, 2000);
        this.$http.post('api/smo_simulate.do',{
          maskDimension: this.form.md,
          pixelSize: this.form.ps,
          reflect: this.form.re,
          absorb: this.form.ab,
          shadowNear: this.form.sn,
          shadowFar: this.form.sf,
          wavelength: this.form.wa,
          sigmaIn: this.form.si,
          sigmaOut: this.form.so,
          tis: this.form.ff,
          na: this.form.na,
          ratio: this.form.ra,
          stepSource: this.form.sso,
          omegaSourceQua: this.form.osq,
          stepMaskMain: this.form.sm,
          stepMaskSraf: this.form.ssr,
          omegaMaskQua: this.form.omq,
          maxloopSmo: this.form.ma,
          threshold: this.form.ep,
          tr: this.form.rt,
          aSource: this.form.rs,
          coreNum: this.form.cn,
          inputMask: this.inputMask,
          inputMaskHash: this.inputMaskHash
        }).then((res) => {
          this.$message({
            message: res.data.msg,
            type: res.data.success?'success':'error',
            duration: 1500,
            showClose: true
          });
          this.status = 8;
          if(localStorage.progressPer){
            localStorage.removeItem('progressPer');
          }else{
            localStorage.progressPer = 0;
          }
          this.$notify({
            title: '成功',
            message: '仿真已经完成，请在仿真历史中查看仿真参数和结果！',
            type: 'success',
            duration: 0,
            offset: 60
          });
          if(res.data.status === 11){
            this.$router.push({ path: '/simPancel/smoView', query: { parametersId: res.data.data.parametersId, resultId: res.data.data.id, type: 'Convergence'}});
          }
        }, (err) => {
        });
        this.inputMask = '';
      },
      handleUploadSuccess(res) {
        if(res.success){
          this.$message({
            message: '文件上传至服务器成功！',
            type: 'success',
            duration: 1500,
            showClose: true
          });
          this.inputMaskHash = res.data.fileHash;
        }else{
          this.$message({
            message: '文件上传失败，请检查网络环境！',
            type: 'error',
            duration: 1500,
            showClose: true
          });
        }
        this.inputMask = res.data.targetFileName;
      },
      beforeUpload(file){
        const fileName = file.name;
        console.log((fileName.split('.')[fileName.split('.').length - 1]));
        const isMat = (fileName.split('.')[fileName.split('.').length - 1]).toLowerCase() === 'mat';
        const isLt10M = file.size / 1024 / 1024 < 10;
        const isEnglish = !((/[\u4E00-\u9FA5\uF900-\uFA2D]/).test(fileName));
        if (!isMat) {
          this.$message.error('上传文件只能是 .mat 格式!');
        }
        if (!isEnglish) {
          this.$message.error('上传文件名不能包含中文!');
        }
        if (!isLt10M) {
          this.$message.error('上传文件大小不能超过 10MB!');
        }
        return isMat && isLt10M && isEnglish;
      },
      beforeRemove(file, fileList) {
        this.inputMask = '';
      },
      // 重置表单
      resetForm(formName) {
        console.log(this.$refs[formName]);
        this.$refs[formName].resetFields();
      }
    },
    watch: {
      '$route' (to, from) {
        if(from.path === '/simPancel/smo'){
          this.loopFlag = false;
        }
        if(to.path === '/simPancel/smo'){
          this.loopFlag = true;
          this.getIfRunning();
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .simPancel-smo-model{
    margin: 0 20px 130px 15px;
    .start{
      margin-bottom: 15px;
    }
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
      margin-bottom: 10px;
    }
    .corenum-input .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
      margin-bottom: 0;
    }
    .card-header{
      font-size: 16px;
      line-height: 18px;
      border-bottom: 1px solid #ebeef5;
      padding: 15px 17px;
      color: #20a0ff;
    }
    .card-body{
      margin: 15px;
      overflow: hidden;
    }
    .card{
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      min-height: 100px;
      width: calc(~"33% - 20px");
      margin: 0 20px 0 0;
      float: left;
      .card-form{
        padding: 15px;
      }
    }
    .top-card{
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      width: 980px;
      overflow: hidden;
      .reset-status-tip{
        font-size: 10px;
        color: rgb(245,108,108);
        margin-left: 20px;
      }
      .corenum-input{
        margin-left: 200px;
        max-width: 300px;
      }
      .download-doc-list li{
        line-height: 28px;
        a{
          color: #20a0ff;
          margin-left: 3px;
        }
        a:hover{
          text-decoration: underline;
        }
      }
      .top-card-text{
        float: left;
        line-height: 28px;
        width: 300px;
        margin-left: 20px;
        span{
          color: #20a0ff;
          margin-left: 10px;
          font-weight: bold;
        }
      }
    }
    .paramContent{
      color: #20a0ff;
      margin-left: 10px;
      font-weight: bold;
    }
    .top-card-input{
      width: 1082px;
      margin-bottom: 20px;
    }
    .img-card{
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      width: 480px;
      height: 480px;
      float: left;
      margin: 20px 20px 0 0;
      .img-card-body{
        position: relative;
      }
      .img-card-body:hover .el-icon-zoom-in{
        visibility: visible;
      }
      .output-img{
        width: 360px;
        height: 360px;
        margin: 30px 60px 0 60px;
        position: absolute;
      }
      .output-img:hover{
        cursor: pointer;
      }
      .el-icon-zoom-in{
        font-size: 70px;
        position: absolute;
        color: #20a0ff;
        top: 176px;
        left: 210px;
        visibility: hidden;
        pointer-events: none;
      }
      .result-icon{
        width: 150px;
        vertical-align: middle;
      }
      .notRunning-contain{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 400px;
        .notRunning{
          text-align: center;
          flex: 1;
          height: 120px;
          color: #cdcdcd;
        }
      }
    }
  }
</style>
