import Vue from 'vue'
import Router from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import DashBoard from '../views/DashBoard.vue'
// import ToolBar from '../components/ToolBar.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginForm
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard,
      props: {}
    }
  ]
})