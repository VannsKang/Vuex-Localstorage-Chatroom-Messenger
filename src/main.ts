import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import assets from './assets';
import api from './api';

// LINK style
import 'reset-css';
import '@/styles/common.scss';

// fontawesome
Vue.component('FontAwesomeIcon', assets.FontAwesomeIcon);

// run interceptor
api.interceptorAjax();

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
