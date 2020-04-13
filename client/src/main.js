import Vue from 'vue';
import Axios from 'axios';
import wysiwyg from 'vue-wysiwyg';
import moment from 'moment';
import Toasted from 'vue-toasted';
import 'normalize.css';

import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles/global.scss';

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${token}`;
}

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD');
  }
});

Vue.use(wysiwyg, {});
Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 3000
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
