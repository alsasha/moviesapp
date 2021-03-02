import axios from '@/plugins/axios';
import IDs from '@/store/mock/imdb_top250';
import mutations from '@/store/mutations';

const {
  MOVIES, CURRENT_PAGE, DELETE_MOVIE, TOGGLE_SEARCH,
} = mutations;

function serializeResponse(movies) {
  return movies.reduce((acc, item) => {
    acc[item.imdbID] = item;
    return acc;
  }, {});
}

const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    moviesPerPage: 12,
    currentPage: 1,
    movies: {},
    isSearch: false,
  },
  getters: {
    slicedIDs: ({ top250IDs }) => (from, to) => top250IDs.slice(from, to),
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    currentPage: ({ currentPage }) => currentPage,
    moviesList: ({ movies }) => movies,
    totalMovies: ({ top250IDs, isSearch, movies }) => {
      if (isSearch) {
        return Object.keys(movies).length;
      }
      return Object.keys(top250IDs).length;
    },
    moviesIDs: ({ top250IDs }) => top250IDs,
    searchResult: ({ isSearch }) => isSearch,
  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value;
    },
    [CURRENT_PAGE](state, value) {
      state.currentPage = value;
    },
    [DELETE_MOVIE](state, index) {
      state.top250IDs.splice(index, 1);
    },
    [TOGGLE_SEARCH](state, bool) {
      state.isSearch = bool;
    },
  },
  actions: {
    async fetchMovies({ getters, commit, dispatch }) {
      try {
        dispatch('toggleLoader', true, { root: true });
        const { slicedIDs, moviesPerPage, currentPage } = getters;
        const from = currentPage * moviesPerPage - moviesPerPage;
        const to = currentPage * moviesPerPage;
        const moviesToFetch = slicedIDs(from, to);
        const requests = moviesToFetch.map((id) => axios.get('/', {
          params: {
            i: id,
          },
        }));
        const response = await Promise.all(requests);
        const movies = serializeResponse(response);
        commit(MOVIES, movies);
      } catch (err) {
        dispatch('showNotify', {
          msg: err.message,
          title: 'Connection Error',
          variant: 'danger',
        }, { root: true });
      } finally {
        dispatch('toggleLoader', false, { root: true });
      }
    },
    changeCurrentPage({ commit, dispatch }, value) {
      commit(CURRENT_PAGE, value);
      dispatch('fetchMovies');
    },
    deleteMovie({ getters, commit, dispatch }, id) {
      const { moviesIDs } = getters;
      const index = moviesIDs.findIndex((item) => item === id);

      if (index !== -1) {
        commit(DELETE_MOVIE, index);
        dispatch('fetchMovies');
        dispatch('showNotify', {
          msg: 'Movie deleted successful',
          title: 'Success',
          variant: 'success',
        }, { root: true });
      }
    },
    async searchMovie({ commit, dispatch }, query) {
      try {
        dispatch('toggleLoader', true, { root: true });

        const response = await axios.get(`/?s=${query}`);
        if (response.Error) {
          throw new Error(response.Error);
        }
        const movies = serializeResponse(response.Search);
        commit(MOVIES, movies);
        commit(CURRENT_PAGE, 1);
      } catch (err) {
        dispatch('showNotify', {
          msg: err.message,
          title: 'Search Error',
          variant: 'danger',
        }, { root: true });
      } finally {
        dispatch('toggleLoader', false, { root: true });
      }
    },
    toggleSearchState({ commit }, bool) {
      commit(TOGGLE_SEARCH, bool);
    },
  },
};

export default moviesStore;
