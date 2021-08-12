import { ActionContext } from 'vuex';
import { RootState } from '@/store/reducers';
import { ChatState, Chat, ChatBulk } from '@/views/Room/typings';

const state = (): ChatState => ({
	chatLog: [],
	roomLog: {},
});

const mutations = {
	updateRoomLog(state: ChatState, payload: ChatBulk): void {
		state.roomLog[payload.host.id] = payload;
	},

	updateChatLog(state: ChatState, payload: Chat[]): void {
		state.chatLog = payload;
	},

	resetChatLog(state: ChatState): void {
		state.chatLog = [];
	},
};

const actions = {
	updateRoomLogAction({ commit }: ActionContext<ChatState, RootState>, payload: ChatBulk): void {
		commit('updateRoomLog', payload);
	},

	updateChatLogAction({ commit }: ActionContext<ChatState, RootState>, payload: Chat[]): void {
		commit('updateChatLog', payload);
	},

	resetChatLogAction({ commit }: ActionContext<ChatState, RootState>): void {
		commit('resetChatLog');
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
