import axios from "axios";

// SECTION ======== types =========
export type Owner = { id: number; name: string } | null;

interface Room {
  id: number;
  name: string;
  profile: string;
}

export interface RoomState {
  owner: Owner;
  rooms: Room[];
  sortedRooms: Room[];
}

const state = (): RoomState => ({
  owner: null,
  rooms: [],
  sortedRooms: []
});

// SECTION ======== mutations =========
const mutations = {
  updateRooms<S extends RoomState>(state: S, payload: Room[]) {
    state.rooms = payload;
  },

  updateSortedRooms<S extends RoomState>(state: S, payload: Room[]) {
    state.sortedRooms = payload;
  },

  updateOwner<S extends RoomState>(state: S, payload: Owner) {
    state.owner = payload;
  }
};

// SECTION ======== actions =========
const actions = {
  // NOTE Direct Action for mutation
  // eslint-disable-next-line
  updateRoomsAction({ commit }: any, payload: Room[]) {
    commit("updateRooms", payload);
  },

  // eslint-disable-next-line
  updateSortedRoomsAction({ commit }: any, payload: Room[]) {
    commit("updateSortedRooms", payload);
  },

  // eslint-disable-next-line
  updateOwnerAction({ commit }: any, payload: Owner) {
    commit("updateOwner", payload);
  },

  // NOTE API Call
  // eslint-disable-next-line
  async loadRoomData({ commit }: any) {
    try {
      const response = await axios.get("http://localhost:8080/data/rooms.json");
      const validation = response && response.status === 200;
      if (!validation) throw new Error("cannot fetch the data");

      const result = await response.data.rooms;
      actions.updateRoomsAction({ commit }, result);
    } catch (error) {
      console.log(error, "!!!");
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
