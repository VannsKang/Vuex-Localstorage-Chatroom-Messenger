import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const toastOptions = {
	transition: 'Vue-Toastification__bounce',
	maxToasts: 5,
	newestOnTop: true,
	timeout: 3000,
	draggable: true,
	draggablePercent: 1,
	showCloseButtonOnHover: true,
};

export default { Toast, toastOptions };
