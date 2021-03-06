import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat'
import VueSocketIO from 'vue-socket.io'
import * as Auth from '@/components/pages/Authentication'

import Authentication from '../components/pages/Authentication/Authentication'

// Register components
Vue.use(VueSocketIO, 'http://localhost:3000');
Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: Chat,
        header: Chat,
        list: Chat,
        create: Chat
      }
    },
    {
      path: '/login',
      name: 'Authentication',
      component: Authentication
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (Auth.default.user.authenticated) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})
export default router
