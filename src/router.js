//引入vue
import Vue from 'vue'
//引入路由
import Router from 'vue-router'
//注册路由
Vue.use(Router);
//导出路由实例
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login/Login.vue')
    },
    {
      path: '/',
      component: () => import('./views/Index/Index.vue'),
      children:[
        {
          path:'',
          name:'home',
          component: () => import('./views/Home/Home.vue')
        },
        {
          path:'accountmanage',
          name:'accountmanage',
          component: () => import('./views/AccountManage/AccountManage.vue')
        },
        {
          path:'accountadd',
          name:'accountadd',
          component: () => import('./views/AccountAdd/AccountAdd.vue')
        },
        {
          path: '/passwordmodify',
          name: 'passwordmodify',
          component: () => import('./views/PasswordModify/PasswordModify.vue')
        },
        {
          path: '/goodsmanage',
          name: 'goodsmanage',
          component: () => import('./views/GoodsManage/GoodsManage.vue')
        },
        {
          path: '/goodsadd',
          name: 'goodsadd',
          component: () => import('./views/GoodsAdd/GoodsAdd.vue')
        },
        {
          path: '/salestatistics',
          name: 'salestatistics',
          component: () => import('./views/SaleStatistics/SaleStatistics.vue')
        },
        {
          path: '/stockmanage',
          name: 'stockmanage',
          component: () => import('./views/Stockmanage/Stockmanage.vue')
        },
        {
          path: '/stockadd',
          name: 'stockadd',
          component: () => import('./views/Stockadd/Stockadd.vue')
        },
        {
          path: '/saleslist',
          name: 'saleslist',
          component: () => import('./views/Saleslist/Saleslist.vue')
        },
        {
          path: '/goodsoutstock',
          name: 'goodsoutstock',
          component: () => import('./views/Goodsoutstock/Goodsoutstock.vue')
        },
        {
          path: '/goodsreturn',
          name: 'goodsreturn',
          component: () => import('./views/Goodsreturn/Goodsreturn.vue')
        }
      ]
    }
  ]
})
