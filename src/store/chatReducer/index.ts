import { Logined } from '@/store/userReducer';
import { Owner } from '@/store/roomReducer';

// SECTION ======== types =========
interface Time {
  absoluteTime: number;
  year: number;
  month: number;
  date: number;
  day: string;
  hours: string;
  minutes: string;
}

export interface Chat {
  name: Logined;
  time: Time;
  message: string;
  photo: string | null;
  isRead: boolean;
  isSameDay: boolean;
  isSameTime: boolean;
}

interface ChatLog {
  owner: Owner;
  chats: Chat[];
}

export interface ChatState {
  [room: number]: ChatLog;
  chatLog: Chat[];
}

const state = (): ChatState => ({ chatLog: [] });

// SECTION ======== mutations =========
const mutations = {
  updateChat<S extends ChatState>(state: S, payload: ChatLog) {
    // eslint-disable-next-line
    state[payload.owner!.id] = payload;
  },

  updateChatLog<S extends ChatState>(state: S, payload: Chat[]) {
    state.chatLog = payload;
  },
};

// SECTION ======== actions =========
const actions = {
  // NOTE Direct Action for mutation
  // eslint-disable-next-line
  updateChatAction({ commit }: any, payload: ChatLog) {
    commit('updateChat', payload);
  },

  // eslint-disable-next-line
  updateChatLogAction({ commit }: any, payload: Chat[]) {
    commit('updateChatLog', payload);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
