import { ActionContext } from 'vuex';
import { RootState } from '@/store/reducers';
import { ChatState, Chat, ChatBulk } from '@/views/Room/typings';

const state = (): ChatState => ({
	chatLog: [], //local chat status
	roomLog: {},
});

const mutations = {
	updateRoomLog(state: ChatState, payload: ChatBulk): void {
		state.roomLog[payload.logined.id] = payload;
	},

	updateChatLog(state: ChatState, payload: Chat[]): void {
		state.chatLog = payload;
	},

	resetChatLog(state: ChatState): void {
		state.chatLog = [];
	},

	resetAllChats(state: ChatState): void {
		state.chatLog = [];
		state.roomLog = {};
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

	resetAllChatsAction({ commit }: ActionContext<ChatState, RootState>): void {
		commit('resetAllChats');
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
