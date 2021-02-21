import axios from "axios";

// SECTION ======== types =========
export type Logined = { id: number; name: string } | null;
type Users = { id: number; name: string; profile: string }[];

export interface UserState {
  logined: Logined;
  users: Users;
}

const state = (): UserState => ({
  logined: null,
  users: []
});

// SECTION ======== mutations =========
const mutations = {
  updateUsers<S extends UserState>(state: S, payload: Users) {
    state.users = payload;
  },

  updateLogined<S extends UserState>(state: S, payload: Logined) {
    state.logined = payload;
  }
};

// SECTION ======== actions =========
const actions = {
  // NOTE Direct Action for mutation
  // eslint-disable-next-line
  updateUsersAction({ commit }: any, payload: Users) {
    commit("updateUsers", payload);
  },

  // eslint-disable-next-line
  updateLoginedAction({ commit }: any, payload: Logined) {
    commit("updateLogined", payload);
  },

  // NOTE API Call
  // eslint-disable-next-line
  async loadUserData({ commit }: any) {
    try {
      const response = await axios.get(
        "http://localhost:8080/data/loginList.json"
      );
      const validation = response && response.status === 200;
      if (!validation) throw new Error("cannot fetch the data");
      const result = await response.data.users;
      actions.updateUsersAction({ commit }, result);
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
