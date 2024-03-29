import Vue from 'vue'
import Router from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import DashBoard from '../components/DashBoard.vue'

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