import { ActionContext } from 'vuex';
import { getUserList } from '@/views/Home/api';
import { RootState } from '@/store/reducers';
import { UserState, User, Logined } from '@/views/Home/typings';

const state = (): UserState => ({
	logined: null,
	users: null,
});

const mutations = {
	updateUsers(state: UserState, payload: User[]): void {
		state.users = payload;
	},

	updateLogined(state: UserState, payload: Logined): void {
		state.logined = payload;
	},
};

const actions = {
	updateUsersAction({ commit }: ActionContext<UserState, RootState>, payload: User[]): void {
		commit('updateUsers', payload);
	},

	updateLoginedAction({ commit }: ActionContext<UserState, RootState>, payload: Logined): void {
		commit('updateLogined', payload);
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
