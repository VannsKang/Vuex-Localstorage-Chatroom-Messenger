import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import createLogger from 'vuex/dist/logger';

// LINK module
import roomReducer, { RoomState } from '@/store/roomReducer';
import userReducer, { UserState } from '@/store/userReducer';
import chatReducer, { ChatState } from '@/store/chatReducer';
import uploadReducer, { UploadState } from '@/store/uploadReducer';

Vue.use(Vuex);

export interface RootState {
  userReducer: UserState;
  roomReducer: RoomState;
  chatReducer: ChatState;
  uploadReducer: UploadState;
}

const vuexLocal = new VuexPersistence<RootState>({
  key: 'soom',
  storage: window.localStorage,
  reducer: ({ userReducer, roomReducer, chatReducer, uploadReducer }) => ({
    userReducer: { logined: userReducer.logined },
    roomReducer: {
      owner: roomReducer.owner,
      sortedRooms: roomReducer.sortedRooms,
    },
    chatReducer,
    uploadReducer: { photos: uploadReducer.photos },
  }),
});

export default new Vuex.Store({
  modules: {
    userReducer,
    roomReducer,
    chatReducer,
    uploadReducer,
  },
  plugins: [createLogger(), vuexLocal.plugin],
});
