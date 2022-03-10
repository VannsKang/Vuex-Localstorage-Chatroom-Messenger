import { ActionContext } from 'vuex';
import { getPhotoList } from '@/views/Room/api';
import { RootState } from '@/store/reducers';
import { UploadState, Photo } from '@/views/Room/typings';

const state = (): UploadState => ({
	isClicked: false,
	photos: [],
});

// SECTION ======== mutations =========
const mutations = {
	activeUploadMenu(state: UploadState): void {
		state.isClicked = !state.isClicked;
	},

	resetClicked(state: UploadState): void {
		state.isClicked = false;
	},

	updatePhotos(state: UploadState, payload: Photo[]): void {
		state.photos = payload;
	},
};

// SECTION ======== actions =========
const actions = {
	activeUploadMenuAction({ commit }: ActionContext<UploadState, RootState>): void {
		commit('activeUploadMenu');
	},

	resetClickedAction({ commit }: ActionContext<UploadState, RootState>): void {
		commit('resetClicked');
	},

	updatePhotosAction({ commit }: ActionContext<UploadState, RootState>, payload: Photo[]): void {
		commit('updatePhotos', payload);
	},

	// NOTE API Call
	async loadPhotoData({ commit }: ActionContext<UploadState, RootState>): Promise<void> {
		try {
			const response = await getPhotoList();

			const validation = response && response.status === 200;
			if (!validation) throw new Error('Error: Impossible to load photo data');

			const photos = response.data;
			commit('updatePhotos', photos);
		} catch (error) {
			console.error((error as Error).message);
		}
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
