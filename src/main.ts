import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

// LINK style
import 'reset-css';
import '@/styles/common.scss';

// LINK fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignal } from '@fortawesome/free-solid-svg-icons';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { faBatteryHalf } from '@fortawesome/free-solid-svg-icons';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faBluetoothB } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faSignal,
  faWifi,
  faLocationArrow,
  faLock,
  faStopwatch,
  faBluetoothB,
  faSignInAlt,
  faBatteryHalf,
  faPalette
);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
