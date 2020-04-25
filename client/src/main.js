import Vue from 'vue';
import Axios from 'axios';
import moment from 'moment';
import Toasted from 'vue-toasted';
import CKEditor from '@ckeditor/ckeditor5-vue/';
import 'normalize.css';

import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles/global.scss';
import { authorize } from './services/user.service';

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

Vue.use(CKEditor);
Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 3000
});

Vue.$mount;

new Vue({
  router,
  store,
  render: h => h(App),
  async mounted() {
    try {
      if (token) {
        await authorize();
      }
    } catch (error) {
      if (error.response.status === 401) {
        this.$store.dispatch('logout');
      }
    }
  }
}).$mount('#app');
