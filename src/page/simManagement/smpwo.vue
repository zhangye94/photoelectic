<template>
  <div class="simPancel-smpwo-model">
    <el-tabs v-model="activeName">
      <el-tab-pane label="Parameters" name="Parameters">
        <div class="card card-sp">
          <div class="card-header">System Parameters</div>
          <div class="card-form">
            <el-form ref="form" :model="form" label-width="140px" size="mini">
              <el-form-item label="Wavelength (nm)">
                <el-input v-model="form.wl"></el-input>
              </el-form-item>
              <el-form-item label="Numerical Aperture">
                <el-input v-model="form.na"></el-input>
              </el-form-item>
              <el-form-item label="Reduction Ratio">
                <el-input v-model="form.rr"></el-input>
              </el-form-item>
              <el-form-item label="Polarization">
                <el-input v-model="form.po"></el-input>
              </el-form-item>
              <el-form-item label="Refractive Index">
                <el-input v-model="form.ri"></el-input>
              </el-form-item>
              <el-form-item label="Mask Pixel (nm)">
                <el-input v-model="form.mp"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="card card-op">
          <div class="card-header">Optimization Parameters</div>
          <div class="card-form">
            <el-form ref="form" :model="form" label-width="180px" size="mini">
              <el-form-item label="Step Pupil">
                <el-input v-model="form.sp"></el-input>
              </el-form-item>
              <el-form-item label="Pupil Smoothness Weight">
                <el-input v-model="form.psw"></el-input>
              </el-form-item>
              <el-form-item label="Resist Slope">
                <el-input v-model="form.rs"></el-input>
              </el-form-item>
              <el-form-item label="Threshold">
                <el-input v-model="form.th"></el-input>
              </el-form-item>
              <el-form-item label="Pupil Dimension">
                <el-input v-model="form.pd"></el-input>
              </el-form-item>
              <el-form-item label="Pupil Maxloop">
                <el-input v-model="form.pm"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="card card-cozc">
          <div class="card-header">Choose Optimized Zernike Coefficients</div>
          <div class="card-form">
            <el-form ref="form" :model="form" label-width="0px" size="mini">
              <el-form-item>
                <el-checkbox-group v-model="form.type">
                  <el-checkbox label="z1" name="type"></el-checkbox>
                  <el-checkbox label="z2" name="type"></el-checkbox>
                  <el-checkbox label="z3" name="type"></el-checkbox>
                  <el-checkbox label="z4" name="type"></el-checkbox>
                  <el-checkbox label="z5" name="type"></el-checkbox>
                  <el-checkbox label="z6" name="type"></el-checkbox>
                  <el-checkbox label="z7" name="type"></el-checkbox>
                  <el-checkbox label="z8" name="type"></el-checkbox>
                  <el-checkbox label="z9" name="type"></el-checkbox>
                  <el-checkbox label="z10" name="type"></el-checkbox>
                  <el-checkbox label="z11" name="type"></el-checkbox>
                  <el-checkbox label="z12" name="type"></el-checkbox>
                  <el-checkbox label="z13" name="type"></el-checkbox>
                  <el-checkbox label="z14" name="type"></el-checkbox>
                  <el-checkbox label="z15" name="type"></el-checkbox>
                  <el-checkbox label="z16" name="type"></el-checkbox>
                  <el-checkbox label="z17" name="type"></el-checkbox>
                  <el-checkbox label="z18" name="type"></el-checkbox>
                  <el-checkbox label="z19" name="type"></el-checkbox>
                  <el-checkbox label="z20" name="type"></el-checkbox>
                  <el-checkbox label="z21" name="type"></el-checkbox>
                  <el-checkbox label="z22" name="type"></el-checkbox>
                  <el-checkbox label="z23" name="type"></el-checkbox>
                  <el-checkbox label="z24" name="type"></el-checkbox>
                  <el-checkbox label="z25" name="type"></el-checkbox>
                  <el-checkbox label="z26" name="type"></el-checkbox>
                  <el-checkbox label="z27" name="type"></el-checkbox>
                  <el-checkbox label="z28" name="type"></el-checkbox>
                  <el-checkbox label="z29" name="type"></el-checkbox>
                  <el-checkbox label="z30" name="type"></el-checkbox>
                  <el-checkbox label="z31" name="type"></el-checkbox>
                  <el-checkbox label="z32" name="type"></el-checkbox>
                  <el-checkbox label="z33" name="type"></el-checkbox>
                  <el-checkbox label="z34" name="type"></el-checkbox>
                  <el-checkbox label="z35" name="type"></el-checkbox>
                  <el-checkbox label="z36" name="type"></el-checkbox>
                  <el-checkbox label="z37" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Convergence" name="Convergence">
        <div class="top-card">
          <div class="start">
            <el-button type="primary" icon="el-icon-upload2">Start</el-button>
          </div>
          <div class="top-card-text">Iteration number:<span>0</span></div>
          <div class="top-card-text">Pattern Error:<span>0</span></div>
        </div>
        <div class="img-card">
          <div class="card-header">
            <el-upload class="upload" action="https://jsonplaceholder.typicode.com/posts/">
              <el-button size="small" type="primary">Load Source</el-button>
            </el-upload>
          </div>
          <div class="notRunning-contain">
            <div class="notRunning">
              <img src="../../assets/images/result.png" alt="result" class="result-icon">
              <span>点击 Start 后可查看运行结果</span>
            </div>
          </div>
        </div>
        <div class="img-card">
          <div class="card-header">
            <el-upload class="upload" action="https://jsonplaceholder.typicode.com/posts/">
              <el-button size="small" type="primary">Load Mask</el-button>
            </el-upload>
          </div>
          <div class="notRunning-contain">
            <div class="notRunning">
              <img src="../../assets/images/result.png" alt="result" class="result-icon">
              <span>点击 Start 后可查看运行结果</span>
            </div>
          </div>
        </div>
        <div class="img-card">
          <div class="card-header">
            <el-upload class="upload" action="https://jsonplaceholder.typicode.com/posts/">
              <el-button size="small" type="primary">Load Target Pattern</el-button>
            </el-upload>
          </div>
          <div class="notRunning-contain">
            <div class="notRunning">
              <img src="../../assets/images/result.png" alt="result" class="result-icon">
              <span>点击 Start 后可查看运行结果</span>
            </div>
          </div>
        </div>
        <div class="img-card">
          <div class="card-header">Optimized Pupil Wavefront</div>
          <div class="notRunning-contain">
            <div class="notRunning">
              <img src="../../assets/images/result.png" alt="result" class="result-icon">
              <span>点击 Start 后可查看运行结果</span>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'smpwo',
    created: function () {
      this.$store.state.adminleftnavnum="/simPancel";
    },
    data () {
      return {
        activeName: 'Parameters',
        form: {
          // System Parameters
          wl: 193,
          na: 1.35,
          rr: 4,
          po: 'TE',
          ri: 1.44,
          mp: 22.5,
          // Optimization Parameters
          sp: 0.0001,
          psw: 0.00002,
          rs: 25,
          th: 0.2,
          pd: 301,
          pm: 37,
          // Choose Optimized Zernike Coefficients
          type: [],
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .simPancel-smpwo-model{
    margin: 0 20px 130px 15px;
    .start{
      float: left;
    }
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
      margin-bottom: 10px;
    }
    .card-header{
      font-size: 16px;
      line-height: 18px;
      border-bottom: 1px solid #ebeef5;
      padding: 15px 17px;
      color: #20a0ff;
      text-align: center;
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
    .card-op{
      width: calc(~"30% - 20px");
    }
    .card-sp{
      width: calc(~"25% - 20px");
    }
    .card-cozc{
      width: calc(~"45% - 20px");
    }
    .top-card{
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      width: 950px;
      padding: 15px;
      overflow: hidden;
      .top-card-text{
        float: left;
        line-height: 40px;
        width: 300px;
        margin-left: 100px;
        span{
          color: #20a0ff;
          margin-left: 10px;
          font-weight: bold;
        }
      }
    }
    .img-card{
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      width: 480px;
      height: 480px;
      float: left;
      margin: 20px 20px 0 0;
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
