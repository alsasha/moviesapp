import Vue from 'vue';
import Vuex from 'vuex';
import movies from './modules/moviesStore';
import showLoader from './modules/loader';
import notification from './modules/notification';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    movies,
    showLoader,
    notification,
  },
});

// store.dispatch('initMoviesStore');

export default store;
