// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import router from './router'
import echarts from 'echarts'
import '../src/assets/css/supersized.css'
import '../src/assets/css/style.css'
import '../src/assets/js/supersized.3.2.7.min.js'
import '../src/assets/js/supersized-init.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    count: 0,
    adminleftnavnum:"1",  //管理后台左侧导航
  },
  mutations: {
    increment (state) {
      state.count++
    },
    //更新用户信息
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    }
  }
});

//设置cookie,增加到vue实例方便全局调用
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

//获取cookie
function getCookie(name) {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
Vue.prototype.getCookie = getCookie;

//删除cookie
Vue.prototype.delCookie =(name) => {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

/* eslint-disable no-new */
new Vue({
  data: {},
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  watch:{
    "$route" : 'checkLogin'
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin(){
      //检查是否存在session,不存在则跳转至登录页
      if(!this.getCookie('session')){
        this.$router.push('/login');
      }
    }
  }
})
