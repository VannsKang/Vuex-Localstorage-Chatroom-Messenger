import axios from 'axios';

// SECTION ======== types =========
type Photos = { id: number; url: string };

export interface UploadState {
  isClicked: boolean;
  photos: Photos[];
}

const state = (): UploadState => ({
  isClicked: false,
  photos: [],
});

// SECTION ======== mutations =========
const mutations = {
  updateClicked<S extends UploadState>(state: S) {
    state.isClicked = !state.isClicked;
  },

  resetClicked<S extends UploadState>(state: S) {
    state.isClicked = false;
  },

  updatePhotos<S extends UploadState>(state: S, payload: Photos[]) {
    state.photos = payload;
  },
};

// SECTION ======== actions =========
const actions = {
  // NOTE Direct Action for mutation
  // eslint-disable-next-line
  updateClickedAction({ commit }: any) {
    commit('updateClicked');
  },

  // eslint-disable-next-line
  resetClickedAction({ commit }: any) {
    commit('resetClicked');
  },

  // eslint-disable-next-line
  updatePhotosAction({ commit }: any, payload: Photos[]) {
    commit('updatePhotos', payload);
  },

  // NOTE API Call
  // eslint-disable-next-line
  async loadPhotoData({ commit }: any) {
    try {
      const response = await axios.get('http://localhost:8080/data/files.json');
      const validation = response && response.status === 200;
      if (!validation) throw new Error('cannot fetch the data');
      const result = await response.data.photos;
      actions.updatePhotosAction({ commit }, result);
    } catch (error) {
      console.log(error, '!!!');
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
