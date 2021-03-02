import mutations from '@/store/mutations';

const { TOGGLE_LOADER } = mutations;

const showLoader = {
  state: {
    isShowLoader: false,
  },
  getters: {
    isShowLoader: ({ isShowLoader }) => isShowLoader,
  },
  mutations: {
    [TOGGLE_LOADER](state, value) {
      state.isShowLoader = value;
    },
  },
  actions: {
    toggleLoader({ commit }, bool) {
      commit('TOGGLE_LOADER', bool);
    },
  },
};

export default showLoader;
