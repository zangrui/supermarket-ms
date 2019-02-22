//引入vue
import Vue from 'vue'
//引入elementui组件和样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//vue粒子特效
import VueParticles from 'vue-particles'

//引入顶级组件
import App from './App.vue'
//引入路由文件
import router from './router'
// 引入request.js(axios封装)
import req from '@/api/request';
//引入公用样式
import '@/styles/common.less'
//引入图标
import '@/assets/icon/iconfont.css'
//注册elementui
Vue.use(ElementUI);
//注册vue-particles
Vue.use(VueParticles);

//把封装后axios挂在Vue原型上
Vue.prototype.req = req;

//全局路由守卫 拦截所有路由
router.beforeEach((to, from, next) => {
  //获取token
  const token = window.sessionStorage.getItem('token');
  if (!token && to.path !== '/login') {
    Vue.prototype.$message.error('请登录以后再操作！')
    //如果去其他页面，跳转到登录页
    next('/login')
  } else if (token && to.path === '/login') {
    //如果去登录页，中断
    next(false)
  } else {
    next();//放行 
  }
});

//阻止生产提示
Vue.config.productionTip = false

//创建vue实例对象 挂载dom 把路由 和 app顶级组件传入 渲染进入dom容器中
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
