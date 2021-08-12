import axios, { AxiosError } from 'axios';

const interceptorAjax = (): void => {
	// axios intercept
	axios.interceptors.request.use(
		function(config) {
			return config;
		},
		function(error: ErrorEvent) {
			if (axios.isAxiosError(error)) {
				console.error((error as AxiosError).response?.data.message);
			} else {
				console.error(error.message);
			}
			return Promise.reject(error);
		}
	);

	axios.interceptors.response.use(
		function(response) {
			return response;
		},
		function(error: ErrorEvent) {
			if (axios.isAxiosError(error)) {
				if ((error as AxiosError).response) console.error(error.message);
				console.error((error as AxiosError).response?.data.message);
			} else {
				console.error(error.message);
			}
			return Promise.reject(error);
		}
	);
};

export default { interceptorAjax };
