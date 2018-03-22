import Vue from 'vue'
import Router from 'vue-router'
// 404 Not Found
import NotFoundComponent from '@/page/404Page'
// import HelloWorld from '@/components/HelloWorld'
// 登录
import Login from '@/page/login'
// 布局
import layoutPage from '@/page/layout'
// 仿真面板
import breadCrumbPage from '@/page/simManagement/breadCrumb'
import simPancelPage from '@/page/simManagement/simPancel'
import smoPage from '@/page/simManagement/smo'
import smoViewPage from '@/page/simManagement/smoView'
import opcPage from '@/page/simManagement/opc'
import opcViewPage from '@/page/simManagement/opcView'
import smpwoPage from '@/page/simManagement/smpwo'
import pdodPage from '@/page/simManagement/pdod'
// 仿真历史
import simHistoryPage from '@/page/simHistory/simHistory'
// 用户管理
import userPage from '@/page/userManagement/userManagement'
// 账户管理
import accountPage from '@/page/accountManagement/account'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: layoutPage,
      redirect: '/simPancel',
      children: [
        {
          path: '/simPancel',
          component: breadCrumbPage,
          children: [
            {
              path: '/',
              component: simPancelPage
            }, {
              path: 'smo',
              component: smoPage
            }, {
              path: 'smoView',
              component: smoViewPage
            }, {
              path: 'opc',
              component: opcPage
            }, {
              path: 'opcView',
              component: opcViewPage
            }, {
              path: 'smpwo',
              component: smpwoPage
            }, {
              path: 'pdod',
              component: pdodPage
            }
          ]
        },
        {
          path: '/user',
          component: userPage
        },
        {
          path: '/simHistory',
          component: simHistoryPage
        },
        {
          path: '/account',
          component: accountPage
        }
      ]
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
