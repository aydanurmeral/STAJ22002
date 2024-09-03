import { createStore } from 'vuex';

const store = createStore({
  state: {
    errorInfo: '',
    successInfo: '',
    themeColor: 'blue', 
  },
  mutations: {
    setErrorMessage(state, message) {
      state.errorInfo = message;
    },
    setSuccessMessage(state, message) {
      state.successInfo = message;
    },
    setThemeColor(state, color) {
      state.themeColor = color;
    },
  },
  actions: {
    updateErrorMessage({ commit }, message) {
      commit('setErrorMessage', message);
    },
    updateSuccessMessage({ commit }, message) {
      commit('setSuccessMessage', message);
    },
    updateThemeColor({ commit }, color) {
      commit('setThemeColor', color);
    },
  },
  getters: {
    errorAlert: state => state.errorInfo,
    successAlert: state => state.successInfo,
    themeColor: state => state.themeColor,
  },
});

export default store;
