import { ActionContext } from 'vuex';
import { getRoomList } from '@/views/List/api';
import { RootState } from '@/store/reducers';
import { RoomState, Room, Host } from '@/views/List/typings';

const state = (): RoomState => ({
	host: null,
	rooms: null,
	sortedRooms: null,
});

const mutations = {
	updateRooms(state: RoomState, payload: Room[]): void {
		state.rooms = payload;
	},

	updateSortedRooms(state: RoomState, payload: Room[]): void {
		state.sortedRooms = payload;
	},

	updateHost(state: RoomState, payload: Host): void {
		state.host = payload;
	},
};

const actions = {
	updateRoomsAction({ commit }: ActionContext<RoomState, RootState>, payload: Room[]): void {
		commit('updateRooms', payload);
	},

	updateSortedRoomsAction({ commit }: ActionContext<RoomState, RootState>, payload: Room[]): void {
		commit('updateSortedRooms', payload);
	},

	updateHostAction({ commit }: ActionContext<RoomState, RootState>, payload: Host): void {
		commit('updateHost', payload);
	},

	// NOTE API Call
	async loadRoomData({ commit }: ActionContext<RoomState, RootState>): Promise<void> {
		try {
			const response = await getRoomList();

			const validation = response && response.status === 200;
			if (!validation) throw new Error('Error: Impossible to load room data');

			const rooms = response.data;
			commit('updateRooms', rooms);
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
