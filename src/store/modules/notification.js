import mutations from '@/store/mutations';

const { SHOW_TOAST_NOTIFY } = mutations;

const notification = {
  state: {
    messagePool: [],
  },
  getters: {
    messagePool: ({ messagePool }) => messagePool[messagePool.length - 1],
  },
  mutations: {
    [SHOW_TOAST_NOTIFY](store, msg) {
      store.messagePool.push(msg);
    },
  },
  actions: {
    showNotify({ commit }, msg) {
      commit('SHOW_TOAST_NOTIFY', msg);
    },
  },
};

export default notification;
