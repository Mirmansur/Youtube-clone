import { createStore } from "vuex";

export default createStore({
  state: {
    isSidebarOpen: false,
  },
  mutations: {
    SET_SIDEBAR_OPEN(state, payload: boolean) {
      state.isSidebarOpen = payload;
    },
  },
  actions: {
    toggleSidebar({ commit, state }) {
      commit("SET_SIDEBAR_OPEN", !state.isSidebarOpen);
    },
  },
  getters: {
    isSidebarOpen: (state) => state.isSidebarOpen,
  },
});
