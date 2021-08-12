import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
// import createLogger from 'vuex/dist/logger';

import rootReducer, { RootState } from './reducers';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence<RootState>({
	key: 'soom',
	storage: window.localStorage,
	reducer: ({ userReducer, roomReducer, chatReducer, uploadReducer }) => ({
		userReducer: { logined: userReducer.logined },
		roomReducer: {
			host: roomReducer.host,
			sortedRooms: roomReducer.sortedRooms,
		},
		chatReducer: {
			roomLog: chatReducer.roomLog,
		},
		uploadReducer: { photos: uploadReducer.photos },
	}),
});

export default new Vuex.Store({
	modules: rootReducer,
	plugins: [vuexLocal.plugin],
});
