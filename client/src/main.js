import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'
import Authentication from '@/components/pages/Authentication'
import Vuetify from 'vuetify'
import VueSocketIO from 'vue-socket.io'

import('../node_modules/vuetify/dist/vuetify.min.css');

Vue.use(VueCookie);
Vue.use(Vuetify);

Vue.use(VueSocketIO, 'http://localhost:3000');

Vue.config.productionTip = false;
Authentication.checkAuthentication();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
