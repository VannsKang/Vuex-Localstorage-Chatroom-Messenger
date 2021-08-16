import { ActionContext } from 'vuex';
import { getUserList } from '@/views/Home/api';
import { RootState } from '@/store/reducers';
import { UserState, User, Logined } from '@/views/Home/typings';

const state = (): UserState => ({
	logined: null,
	users: null,
	isLoading: false,
});

const mutations = {
	updateUsers(state: UserState, payload: User[]): void {
		state.users = payload;
	},

	updateLogined(state: UserState, payload: Logined): void {
		state.logined = payload;
	},

	updateLoadingStatus(state: UserState, payload: boolean): void {
		state.isLoading = payload;
	},
};

const actions = {
	updateUsersAction({ commit }: ActionContext<UserState, RootState>, payload: User[]): void {
		commit('updateUsers', payload);
	},

	updateLoginedAction({ commit }: ActionContext<UserState, RootState>, payload: Logined): void {
		commit('updateLogined', payload);
	},

	updateLoadingStatusAction(
		{ commit }: ActionContext<UserState, RootState>,
		payload: string
	): void {
		switch (payload) {
			case 'loading':
				commit('updateLoadingStatus', true);
				break;
			case 'complete':
				commit('updateLoadingStatus', false);
				break;
		}
	},

	// NOTE API Call
	async loadUserData({ commit }: ActionContext<UserState, RootState>): Promise<void> {
		try {
			const response = await getUserList();

			const validation = response && response.status === 200;
			if (!validation) throw new Error('Error: Impossible to load user data');

			const users = response.data;
			commit('updateUsers', users);
		} catch (error) {
			console.error(error.message);
		}
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
