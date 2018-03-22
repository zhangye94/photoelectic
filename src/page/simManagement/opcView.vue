<template>
  <div class="simPancel-opc-model">
    <el-tabs v-model="activeName">
      <el-tab-pane label="Parameters" name="Parameters">
        <div class="top-card top-card-input" v-loading="loading">
          <div class="card-body">
            <div class="fl download-doc-btn">
              <i class="el-icon-document"></i>
              <a :href="ip + '/upload/' + inputMask" target="_blank">{{inputMask}}</a>
            </div>
            <el-form ref="form" :model="form" label-width="180px" size="mini" class="corenum-input" style="margin-left: 500px;">
              <el-form-item label="Core Number">
                <div>:<span class="paramContent">{{form.coreNum}}</span></div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="card">
          <div class="card-header">掩模参数</div>
          <div class="card-form" v-loading="loading">
            <el-form ref="form" :model="form" label-width="180px" size="mini">
              <el-form-item label="掩模尺寸">
                <div>:<span class="paramContent">{{form.maskDimension}}</span></div>
              </el-form-item>
              <el-form-item label="像素大小（nm）">
                <div>:<span class="paramContent">{{form.pixelSize}}</span></div>
              </el-form-item>
              <el-form-item label="掩模反射层反射系数">
                <div>:<span class="paramContent">{{form.reflect}}</span></div>
              </el-form-item>
              <el-form-item label="掩模吸收层吸收系数">
                <div>:<span class="paramContent">{{form.absorb}}</span></div>
              </el-form-item>
              <el-form-item label="近侧最大阴影宽度">
                <div>:<span class="paramContent">{{form.shadowNear}}</span></div>
              </el-form-item>
              <el-form-item label="远侧最大阴影宽度">
                <div>:<span class="paramContent">{{form.shadowFar}}</span></div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="card">
          <div class="card-header">优化参数</div>
          <div class="card-form" v-loading="loading">
            <el-form ref="form" :model="form" label-width="180px" size="mini">
              <el-form-item label="掩模主图形优化步长">
                <div>:<span class="paramContent">{{form.stepMain}}</span></div>
              </el-form-item>
              <el-form-item label="掩模辅助图形优化步长">
                <div>:<span class="paramContent">{{form.stepSraf}}</span></div>
              </el-form-item>
              <el-form-item label="掩模罚函数权重因子">
                <div>:<span class="paramContent">{{form.omegaQua}}</span></div>
              </el-form-item>
              <el-form-item label="最大循环次数">
                <div>:<span class="paramContent">{{form.maxloopOpc}}</span></div>
              </el-form-item>
              <el-form-item label="误差阈值">
                <div>:<span class="paramContent">{{form.threshold}}</span></div>
              </el-form-item>
              <el-form-item label="光刻胶阈值">
                <div>:<span class="paramContent">{{form.tr}}</span></div>
              </el-form-item>
              <el-form-item label="光刻胶倾斜因子">
                <div>:<span class="paramContent">{{form.aSource}}</span></div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="card">
          <div class="card-header">光源参数</div>
          <div class="card-form" v-loading="loading">
            <el-form ref="form" :model="form" label-width="180px" size="mini">
              <el-form-item label="波长（nm）">
                <div>:<span class="paramContent">{{form.wavelength}}</span></div>
              </el-form-item>
              <el-form-item label="内相干因子">
                <div>:<span class="paramContent">{{form.sigmaIn}}</span></div>
              </el-form-item>
              <el-form-item label="外相干因子">
                <div>:<span class="paramContent">{{form.sigmaOut}}</span></div>
              </el-form-item>
              <el-form-item label="阴影系数">
                <div>:<span class="paramContent">{{form.tis}}</span></div>
              </el-form-item>
              <el-form-item label="数值孔径">
                <div>:<span class="paramContent">{{form.na}}</span></div>
              </el-form-item>
              <el-form-item label="缩放率">
                <div>:<span class="paramContent">{{form.ratio}}</span></div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Convergence" name="Convergence">
        <div class="top-card" v-loading="loading">
          <div class="card-body">
            <div class="top-card-text">Iteration number:<span>{{form.maxloopOpc || 0}}</span></div>
            <div class="top-card-text">Pattern Error:<span>{{patternError || 0}}</span></div>
          </div>
        </div>
        <div style="overflow: hidden;">
          <div class="img-card" v-loading="loading">
            <div class="card-header">Source Pattern</div>
            <div class="notRunning-contain" v-show="!gdResultOpc.sourcePatternPng">
              <div class="notRunning">
                <img src="../../assets/images/result.png" alt="result" class="result-icon">
                <span>点击 Start 后可查看运行结果</span>
              </div>
            </div>
            <div class="img-card-body" v-show="gdResultOpc.sourcePatternPng">
              <img :src="ip + '/opc/' + gdResultOpc.sourcePatternPng" class="output-img" @click="handleImgClick('sourcePatternPng')">
              <i class="el-icon-zoom-in"></i>
              <el-dialog :visible.sync="dialogVisible.sourcePatternPng">
                <img width="100%" :src="ip + '/opc/' + gdResultOpc.sourcePatternPng" alt="服务器未找到该图片">
              </el-dialog>
            </div>
          </div>
          <div class="img-card" v-loading="loading">
            <div class="card-header">Mask Pattern</div>
            <div class="notRunning-contain" v-show="!gdResultOpc.maskPatternPng">
              <div class="notRunning">
                <img src="../../assets/images/result.png" alt="result" class="result-icon">
                <span>点击 Start 后可查看运行结果</span>
              </div>
            </div>
            <div class="img-card-body" v-show="gdResultOpc.maskPatternPng">
              <img :src="ip + '/opc/' + gdResultOpc.maskPatternPng" class="output-img" @click="handleImgClick('maskPatternPng')">
              <i class="el-icon-zoom-in"></i>
              <el-dialog :visible.sync="dialogVisible.maskPatternPng">
                <img width="100%" :src="ip + '/opc/' + gdResultOpc.maskPatternPng" alt="服务器未找到该图片">
              </el-dialog>
            </div>
          </div>
          <div class="img-card" v-loading="loading">
            <div class="card-header">Print Image</div>
            <div class="notRunning-contain" v-show="!gdResultOpc.printImagePng">
              <div class="notRunning">
                <img src="../../assets/images/result.png" alt="result" class="result-icon">
                <span>点击 Start 后可查看运行结果</span>
              </div>
            </div>
            <div class="img-card-body" v-show="gdResultOpc.printImagePng">
              <img :src="ip + '/opc/' + gdResultOpc.printImagePng" class="output-img" @click="handleImgClick('printImagePng')">
              <i class="el-icon-zoom-in"></i>
              <el-dialog :visible.sync="dialogVisible.printImagePng">
                <img width="100%" :src="ip + '/opc/' + gdResultOpc.printImagePng" alt="服务器未找到该图片">
              </el-dialog>
            </div>
          </div>
          <div class="img-card" v-loading="loading">
            <div class="card-header">Convergence Curve</div>
            <div class="notRunning-contain" v-show="!gdResultOpc.errorConvergencePng">
              <div class="notRunning">
                <img src="../../assets/images/result.png" alt="result" class="result-icon">
                <span>点击 Start 后可查看运行结果</span>
              </div>
            </div>
            <div class="img-card-body" v-show="gdResultOpc.errorConvergencePng">
              <img :src="ip + '/opc/' + gdResultOpc.errorConvergencePng" class="output-img" @click="handleImgClick('errorConvergencePng')">
              <i class="el-icon-zoom-in"></i>
              <el-dialog :visible.sync="dialogVisible.errorConvergencePng">
                <img width="100%" :src="ip + '/opc/' + gdResultOpc.errorConvergencePng" alt="服务器未找到该图片">
              </el-dialog>
            </div>
          </div>
          <div class="img-card" v-loading="loading">
            <div class="card-header">加权误差收敛曲线</div>
            <div class="notRunning-contain" v-show="!gdResultOpc.errorConvergenceWeightPng">
              <div class="notRunning">
                <img src="../../assets/images/result.png" alt="result" class="result-icon">
                <span>点击 Start 后可查看运行结果</span>
              </div>
            </div>
            <div class="img-card-body" v-show="gdResultOpc.errorConvergenceWeightPng">
              <img :src="ip + '/opc/' + gdResultOpc.errorConvergenceWeightPng" class="output-img" @click="handleImgClick('errorConvergenceWeightPng')">
              <i class="el-icon-zoom-in"></i>
              <el-dialog :visible.sync="dialogVisible.errorConvergenceWeightPng">
                <img width="100%" :src="ip + '/opc/' + gdResultOpc.errorConvergenceWeightPng" alt="服务器未找到该图片">
              </el-dialog>
            </div>
          </div>
        </div>
        <div class="top-card" style="margin-top: 15px;">
          <div class="card-header">文件列表</div>
          <div class="card-body" v-loading="loading">
            <ul class="download-doc-list">
              <li><i class="el-icon-document"></i><a :href="ip + '/opc/' + gdResultOpc.errorMat" target="_blank">{{gdResultOpc.errorMat}}</a></li>
              <li><i class="el-icon-document"></i><a :href="ip + '/opc/' + gdResultOpc.errorWeightMat" target="_blank">{{gdResultOpc.errorWeightMat}}</a></li>
              <li><i class="el-icon-document"></i><a :href="ip + '/opc/' + gdResultOpc.maskPatternMat" target="_blank">{{gdResultOpc.maskPatternMat}}</a></li>
              <li><i class="el-icon-document"></i><a :href="ip + '/opc/' + gdResultOpc.printImageMat" target="_blank">{{gdResultOpc.printImageMat}}</a></li>
              <li><i class="el-icon-document"></i><a :href="ip + '/opc/' + gdResultOpc.sourcePatternMat" target="_blank">{{gdResultOpc.sourcePatternMat}}</a></li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'opc',
    props: ["user"],
    created: function () {
      this.$store.state.adminleftnavnum="/simPancel";
    },
    mounted: function () {
      this.getOpcParam();
    },
    data () {
      return {
        activeName: this.$route.query.type,
        dialogVisible: {
          errorConvergencePng: false,
          printImagePng: false,
          maskPatternPng: false,
          errorConvergenceWeightPng: false,
          sourcePatternPng: false
        },
        loading: true,
        inputMask: '',
        ip: '',
        patternError: '',
        gdResultOpc: {},
        form: {
          maskDimension: '',
          pixelSize: '',
          reflect: '',
          absorb: '',
          shadowNear: '',
          shadowFar: '',
          stepMain: '',
          stepSraf: '',
          omegaQua: '',
          maxloopOpc: '',//150
          threshold: '',
          tr: '',
          aSource: '',
          wavelength: '',
          sigmaIn: '',
          sigmaOut: '',
          tis: '',
          na: '',
          ratio: '',
          coreNum: ''
        }
      }
    },
    methods: {
      getOpcParam() {
        this.$http.post('api/get_record_detail.do',{
          moduleName: (this.$route.path.split('/')[this.$route.path.split('/').length - 1]).replace('View',''),
          parametersId: this.$route.query.parametersId,
          resultId: this.$route.query.resultId
        }).then((res) => {
          this.form = res.data.data.gdParameterOpc;
          this.inputMask = res.data.data.gdParameterOpc.inputMask;
          this.gdResultOpc = res.data.data.gdResultOpc;
          this.ip = 'http://' + res.data.data.ip;
          this.patternError = res.data.data.error;
          this.loading = false;
        }, (err) => {
          this.$message({
            message: '访问数据失败，请检查网络环境！',
            type: 'error',
            duration: 1500,
            showClose: true
          });
        });
      },
      handleImgClick(type) {
        this.dialogVisible[type] = true;
      }
    },
    watch: {
      '$route' (to, from) {
        if(to.path === '/simPancel/opcView'){
          this.activeName = this.$route.query.type;
          this.getOpcParam();
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .simPancel-opc-model{
    margin: 0 20px 130px 15px;
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
      margin-bottom: 10px;
    }
    .corenum-input .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
      margin-bottom: 0;
    }
    .paramContent{
      margin-left: 10px;
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
      .corenum-input{
        margin-left: 200px;
        max-width: 300px;
      }
      .download-doc-btn, .download-doc-list li{
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
