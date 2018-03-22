<template>
  <div class="simPancel-model">
    <div class="simPancel-contain">
      <router-link :to="{ path: user.smo? '/simPancel/smo' : '/simPancel'}" class="simPancel-contain-link" :class="!user.smo? 'notAllowed': '' ">
        <div class="pancel pancel-1">
          <img src="../../assets/images/tool1.png" alt="tool" class="tool">
          <h3>SMO</h3>
        </div>
      </router-link>
      <router-link :to="{ path: user.opc? '/simPancel/opc' : '/simPancel'}" class="simPancel-contain-link" :class="!user.opc? 'notAllowed': '' ">
        <div class="pancel pancel-2">
          <img src="../../assets/images/tool2.png" alt="tool" class="tool">
          <h3>OPC</h3>
        </div>
      </router-link>
      <router-link :to="{ path: user.smpwo? '/simPancel/smpwo' : '/simPancel'}" class="simPancel-contain-link" :class="!user.smpwo? 'notAllowed': '' ">
        <div class="pancel pancel-3">
          <img src="../../assets/images/tool3.png" alt="tool" class="tool">
          <h3>SMPWO</h3>
        </div>
      </router-link>
      <router-link :to="{ path: user.pdod? '/simPancel/pdod' : '/simPancel'}" class="simPancel-contain-link" :class="!user.pdod? 'notAllowed': '' ">
        <div class="pancel pancel-4">
          <img src="../../assets/images/tool4.png" alt="tool" class="tool">
          <h3>偏振像差<br>在线检测</h3>
        </div>
      </router-link>
    </div>
    <div class="intro-root" v-if="user.smo||user.opc||user.smpwo||user.pdod">
      您好，您有使用
      <router-link :to="{ path: '/simPancel/smo'}" v-if="user.smo">
        <el-tag>SMO</el-tag>
      </router-link>
      <router-link :to="{ path: '/simPancel/opc'}" v-if="user.opc">
        <el-tag type="success">OPC</el-tag>
      </router-link>
      <router-link :to="{ path: '/simPancel/smpwo'}" v-if="user.smpwo">
        <el-tag type="warning">SMPWO</el-tag>
      </router-link>
      <router-link :to="{ path: '/simPancel/pdod'}" v-if="user.pdod">
        <el-tag type="danger">偏振像差在线检测</el-tag>
      </router-link>
      的权限
    </div>
    <div class="intro-root" v-if="!user.smo&&!user.opc&&!user.smpwo&&!user.pdod">
      您好，您没有使用仿真模块的权限
    </div>
    <div class="cpuCharts">
      <div id="userRatioChart"></div>
      <div id="sysRatioChart"></div>
      <div id="waitRatioChart"></div>
      <div id="idleRatioChart"></div>
      <div id="combinedChart"></div>
    </div>
  </div>
</template>

<script>
  Date.prototype.toLocaleString = function() {
    return this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
  };

  import echarts from 'echarts'
  export default {
    name: 'simPancel',
    props: ["user"],
    created: function () {
      this.$store.state.adminleftnavnum="/simPancel";
    },
    mounted() {
      this.drawLine();
      this.getCpuInfo();
    },
    data () {
      return {
        userRatioChart: {},
        userRatioData: [[],[],[],[],[],[],[],[]],
        sysRatioData: [[],[],[],[],[],[],[],[]],
        waitRatioData: [[],[],[],[],[],[],[],[]],
        idleRatioData: [[],[],[],[],[],[],[],[]],
        combinedData: [[],[],[],[],[],[],[],[]],
        cpuData: [[],[],[],[],[],[],[],[]],
        time: [],
        dataLimit: 18,
        loopFlag: true
      }
    },
    methods: {
      drawLine(){
        // 折线
        this.userRatioChart = echarts.init(document.getElementById('userRatioChart'));
        this.sysRatioChart = echarts.init(document.getElementById('sysRatioChart'));
        this.waitRatioChart = echarts.init(document.getElementById('waitRatioChart'));
        this.idleRatioChart = echarts.init(document.getElementById('idleRatioChart'));
        this.combinedChart = echarts.init(document.getElementById('combinedChart'));

        // 折线图
        // CPU用户使用率
        this.userRatioChart.setOption({
          title: {
            text: 'CPU用户使用率',
            left: 'center',
            top: 20,
            textStyle: {fontSize: 14}
          },
          xAxis: {type: 'category', data: this.time},
          yAxis: {type: 'value', name : '(%)'},
          tooltip: {trigger: 'axis',},
          legend: {
            bottom: 5,
            type: 'scroll',
            data:['cpu-1','cpu-2','cpu-3','cpu-4','cpu-5','cpu-6','cpu-7','cpu-8']
          },
          series: [
            {
              name: 'cpu-1',
              itemStyle:{ normal:{ color: "#62A515"} },
              lineStyle:{ normal:{ color: "#62A515"} },
              data: this.userRatioData[0],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-2',
              itemStyle:{ normal:{ color: "#94BE14"} },
              lineStyle:{ normal:{ color: "#94BE14"} },
              data: this.userRatioData[1],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-3',
              itemStyle:{ normal:{ color: "#C8D71C"} },
              lineStyle:{ normal:{ color: "#C8D71C"} },
              data: this.userRatioData[2],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-4',
              itemStyle:{ normal:{ color: "#F7E215"} },
              lineStyle:{ normal:{ color: "#F7E215"} },
              data: this.userRatioData[3],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-5',
              itemStyle:{ normal:{ color: "#F9BD14"} },
              lineStyle:{ normal:{ color: "#F9BD14"} },
              data: this.userRatioData[4],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-6',
              itemStyle:{ normal:{ color: "#EF8D12"} },
              lineStyle:{ normal:{ color: "#EF8D12"} },
              data: this.userRatioData[5],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-7',
              itemStyle:{ normal:{ color: "#E45814"} },
              lineStyle:{ normal:{ color: "#E45814"} },
              data: this.userRatioData[6],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-8',
              itemStyle:{ normal:{ color: "#DC2C2C"} },
              lineStyle:{ normal:{ color: "#DC2C2C"} },
              data: this.userRatioData[7],
              type: 'line',
              smooth: true
            },
          ]
        })

        // CPU系统使用率
        this.sysRatioChart.setOption({
          title: {
            text: 'CPU系统使用率',
            left: 'center',
            top: 20,
            textStyle: {fontSize: 14}
          },
          xAxis: {type: 'category', data: this.time},
          yAxis: {type: 'value', name : '(%)'},
          tooltip: {trigger: 'axis',},
          legend: {
            bottom: 5,
            type: 'scroll',
            data:['cpu-1','cpu-2','cpu-3','cpu-4','cpu-5','cpu-6','cpu-7','cpu-8']
          },
          series: [
            {
              name: 'cpu-1',
              itemStyle:{ normal:{ color: "#62A515"} },
              lineStyle:{ normal:{ color: "#62A515"} },
              data: this.sysRatioData[0],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-2',
              itemStyle:{ normal:{ color: "#94BE14"} },
              lineStyle:{ normal:{ color: "#94BE14"} },
              data: this.sysRatioData[1],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-3',
              itemStyle:{ normal:{ color: "#C8D71C"} },
              lineStyle:{ normal:{ color: "#C8D71C"} },
              data: this.sysRatioData[2],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-4',
              itemStyle:{ normal:{ color: "#F7E215"} },
              lineStyle:{ normal:{ color: "#F7E215"} },
              data: this.sysRatioData[3],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-5',
              itemStyle:{ normal:{ color: "#F9BD14"} },
              lineStyle:{ normal:{ color: "#F9BD14"} },
              data: this.sysRatioData[4],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-6',
              itemStyle:{ normal:{ color: "#EF8D12"} },
              lineStyle:{ normal:{ color: "#EF8D12"} },
              data: this.sysRatioData[5],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-7',
              itemStyle:{ normal:{ color: "#E45814"} },
              lineStyle:{ normal:{ color: "#E45814"} },
              data: this.sysRatioData[6],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-8',
              itemStyle:{ normal:{ color: "#DC2C2C"} },
              lineStyle:{ normal:{ color: "#DC2C2C"} },
              data: this.sysRatioData[7],
              type: 'line',
              smooth: true
            },
          ]
        })

        // CPU当前等待率
        this.waitRatioChart.setOption({
          title: {
            text: 'CPU当前等待率',
            left: 'center',
            top: 20,
            textStyle: {fontSize: 14}
          },
          xAxis: {type: 'category', data: this.time},
          yAxis: {type: 'value', name : '(%)'},
          tooltip: {trigger: 'axis',},
          legend: {
            bottom: 5,
            type: 'scroll',
            data:['cpu-1','cpu-2','cpu-3','cpu-4','cpu-5','cpu-6','cpu-7','cpu-8']
          },
          series: [
            {
              name: 'cpu-1',
              itemStyle:{ normal:{ color: "#62A515"} },
              lineStyle:{ normal:{ color: "#62A515"} },
              data: this.waitRatioData[0],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-2',
              itemStyle:{ normal:{ color: "#94BE14"} },
              lineStyle:{ normal:{ color: "#94BE14"} },
              data: this.waitRatioData[1],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-3',
              itemStyle:{ normal:{ color: "#C8D71C"} },
              lineStyle:{ normal:{ color: "#C8D71C"} },
              data: this.waitRatioData[2],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-4',
              itemStyle:{ normal:{ color: "#F7E215"} },
              lineStyle:{ normal:{ color: "#F7E215"} },
              data: this.waitRatioData[3],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-5',
              itemStyle:{ normal:{ color: "#F9BD14"} },
              lineStyle:{ normal:{ color: "#F9BD14"} },
              data: this.waitRatioData[4],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-6',
              itemStyle:{ normal:{ color: "#EF8D12"} },
              lineStyle:{ normal:{ color: "#EF8D12"} },
              data: this.waitRatioData[5],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-7',
              itemStyle:{ normal:{ color: "#E45814"} },
              lineStyle:{ normal:{ color: "#E45814"} },
              data: this.waitRatioData[6],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-8',
              itemStyle:{ normal:{ color: "#DC2C2C"} },
              lineStyle:{ normal:{ color: "#DC2C2C"} },
              data: this.waitRatioData[7],
              type: 'line',
              smooth: true
            },
          ]
        })

        // CPU当前空闲率
        this.idleRatioChart.setOption({
          title: {
            text: 'CPU当前空闲率',
            left: 'center',
            top: 20,
            textStyle: { fontSize: 14 }
          },
          xAxis: { type: 'category', data: this.time },
          yAxis: { type: 'value', name : '(%)' },
          tooltip: { trigger: 'axis' },
          legend: {
            bottom: 5,
            type: 'scroll',
            data:['cpu-1','cpu-2','cpu-3','cpu-4','cpu-5','cpu-6','cpu-7','cpu-8']
          },
          series: [
            {
              name: 'cpu-1',
              itemStyle:{ normal:{ color: "#62A515"} },
              lineStyle:{ normal:{ color: "#62A515"} },
              data: this.idleRatioData[0],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-2',
              itemStyle:{ normal:{ color: "#94BE14"} },
              lineStyle:{ normal:{ color: "#94BE14"} },
              data: this.idleRatioData[1],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-3',
              itemStyle:{ normal:{ color: "#C8D71C"} },
              lineStyle:{ normal:{ color: "#C8D71C"} },
              data: this.idleRatioData[2],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-4',
              itemStyle:{ normal:{ color: "#F7E215"} },
              lineStyle:{ normal:{ color: "#F7E215"} },
              data: this.idleRatioData[3],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-5',
              itemStyle:{ normal:{ color: "#F9BD14"} },
              lineStyle:{ normal:{ color: "#F9BD14"} },
              data: this.idleRatioData[4],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-6',
              itemStyle:{ normal:{ color: "#EF8D12"} },
              lineStyle:{ normal:{ color: "#EF8D12"} },
              data: this.idleRatioData[5],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-7',
              itemStyle:{ normal:{ color: "#E45814"} },
              lineStyle:{ normal:{ color: "#E45814"} },
              data: this.idleRatioData[6],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-8',
              itemStyle:{ normal:{ color: "#DC2C2C"} },
              lineStyle:{ normal:{ color: "#DC2C2C"} },
              data: this.idleRatioData[7],
              type: 'line',
              smooth: true
            },
          ]
        })

        // CPU总使用率
        this.combinedChart.setOption({
          title: {
            text: 'CPU总使用率',
            left: 'center',
            top: 20,
            textStyle: {fontSize: 14}
          },
          xAxis: {type: 'category', data: this.time},
          yAxis: {type: 'value', name : '(%)'},
          tooltip: {trigger: 'axis'},
          legend: {
            bottom: 5,
            type: 'scroll',
            data:['cpu-1','cpu-2','cpu-3','cpu-4','cpu-5','cpu-6','cpu-7','cpu-8']
          },
          series: [
            {
              name: 'cpu-1',
              itemStyle:{ normal:{ color: "#62A515"} },
              lineStyle:{ normal:{ color: "#62A515"} },
              data: this.combinedData[0],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-2',
              itemStyle:{ normal:{ color: "#94BE14"} },
              lineStyle:{ normal:{ color: "#94BE14"} },
              data: this.combinedData[1],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-3',
              itemStyle:{ normal:{ color: "#C8D71C"} },
              lineStyle:{ normal:{ color: "#C8D71C"} },
              data: this.combinedData[2],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-4',
              itemStyle:{ normal:{ color: "#F7E215"} },
              lineStyle:{ normal:{ color: "#F7E215"} },
              data: this.combinedData[3],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-5',
              itemStyle:{ normal:{ color: "#F9BD14"} },
              lineStyle:{ normal:{ color: "#F9BD14"} },
              data: this.combinedData[4],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-6',
              itemStyle:{ normal:{ color: "#EF8D12"} },
              lineStyle:{ normal:{ color: "#EF8D12"} },
              data: this.combinedData[5],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-7',
              itemStyle:{ normal:{ color: "#E45814"} },
              lineStyle:{ normal:{ color: "#E45814"} },
              data: this.combinedData[6],
              type: 'line',
              smooth: true
            },{
              name: 'cpu-8',
              itemStyle:{ normal:{ color: "#DC2C2C"} },
              lineStyle:{ normal:{ color: "#DC2C2C"} },
              data: this.combinedData[7],
              type: 'line',
              smooth: true
            },
          ]
        })
      },
      getCpuInfo(){
        this.$http.post('api/get_cpu_info.do',{
        }).then((res) => {
            if(this.loopFlag){
              for(let i=0;i<res.data.data.cpuInfoVoList.length;i++){
                if(this.userRatioData[0].length >= this.dataLimit){
                  this.userRatioData[i].shift();
                  this.sysRatioData[i].shift();
                  this.waitRatioData[i].shift();
                  this.idleRatioData[i].shift();
                  this.combinedData[i].shift();

                  (this.userRatioData[i]).push((res.data.data.cpuInfoVoList[i].userRatio * 100).toFixed(1));
                  (this.sysRatioData[i]).push((res.data.data.cpuInfoVoList[i].sysRatio * 100).toFixed(1));
                  (this.waitRatioData[i]).push((res.data.data.cpuInfoVoList[i].waitRatio * 100).toFixed(1));
                  (this.idleRatioData[i]).push((res.data.data.cpuInfoVoList[i].idleRatio * 100).toFixed(1));
                  (this.combinedData[i]).push((res.data.data.cpuInfoVoList[i].combined * 100).toFixed(1));
                }else{
                  this.userRatioData[i].push((res.data.data.cpuInfoVoList[i].userRatio * 100).toFixed(1));
                  this.sysRatioData[i].push((res.data.data.cpuInfoVoList[i].sysRatio * 100).toFixed(1));
                  this.waitRatioData[i].push((res.data.data.cpuInfoVoList[i].waitRatio * 100).toFixed(1));
                  this.idleRatioData[i].push((res.data.data.cpuInfoVoList[i].idleRatio * 100).toFixed(1));
                  this.combinedData[i].push((res.data.data.cpuInfoVoList[i].combined * 100).toFixed(1));
                }
                this.cpuData[i].push((res.data.data.cpuInfoVoList[i].userRatio * 100).toFixed(1));
                this.cpuData[i].push((res.data.data.cpuInfoVoList[i].sysRatio * 100).toFixed(1));
                this.cpuData[i].push((res.data.data.cpuInfoVoList[i].waitRatio * 100).toFixed(1));
                this.cpuData[i].push((res.data.data.cpuInfoVoList[i].idleRatio * 100).toFixed(1));
                this.cpuData[i].push((res.data.data.cpuInfoVoList[i].combined * 100).toFixed(1));
              }
              if(this.userRatioData[0].length >= this.dataLimit){
                this.time.shift();
                this.time.push(new Date(res.data.data.timeStamp).toLocaleString());
              }else{
                this.time.push(new Date(res.data.data.timeStamp).toLocaleString());
              }

              this.drawLine();
              setTimeout(() => {
                this.getCpuInfo();
              }, 4000);
            }
        }, (err) => {
          this.$message({
            message: '访问CPU数据失败，请检查网络环境！',
            type: 'error',
            duration: 1500,
            showClose: true
          });
        });
      }
    },
    watch: {
      '$route' (to, from) {
        if(from.path === '/simPancel'){
          this.loopFlag = false;
        }
        if(to.path === '/simPancel'){
          this.getCpuInfo();
          this.loopFlag = true;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .simPancel-model{
    margin-bottom: 100px;
  }
  .simPancel-contain{
    overflow: hidden;
    width: 100%;
  }
  .cpuCharts{
    overflow: hidden;
    div{
      float: left;
      margin-right: 20px;
      min-width: 510px;
      width: 30%;
      height: 300px;
    }
  }
  .pancel{
    width: 190px;
    float: left;
    height: 90px;
    margin-right: 15px;
    margin-left: 15px;
    border-radius: 5px;
    padding: 20px;
    .tool{
      width: 50px;
      float: left;
      margin-top: 20px;
      margin-left: 10px;
    }
    h3{
      color: #fff;
      font-size: 27px;
      line-height: 90px;
      position: relative;
      left: 15px;
    }
  }
  .pancel-1{
    background-color: rgb(217,84,79);
  }
  .pancel-2{
    background-color: rgb(65,129,202);
  }
  .pancel-3{
    background-color: rgb(22,160,133);
  }
  .pancel-4{
    background-color: rgb(63,78,98);
    h3{
      font-size: 16px;
      line-height: 20px;
      padding: 25px 0 30px 0;
      left: 20px;
    }
  }
  .intro-root{
    margin: 30px 20px 5px 20px;
    span{
      margin-left: 3px;
      margin-right: 3px;
      font-weight: bold;
    }
  }
  .notAllowed:hover{
    cursor: not-allowed;
  }
  #myChart{
    margin: 0 15px 0 15px;
  }
</style>
