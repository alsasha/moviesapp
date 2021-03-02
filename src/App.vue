<template>
  <div id="app">
    <Notification />
    <Loader />
    <PosterBg :poster='posterBg'/>
    <Header />
    <MoviesList :list='moviesList' @onMouseOver='changePoster'/>
    <MoviesPagination
      :movies-per-page='moviesPerPage'
      :current-page='currentPage'
      :total='totalMovies'
      @changeCurrentPage='changePage'
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MoviesList from '@/components/MoviesList.vue';
import PosterBg from '@/components/PosterBg.vue';
import MoviesPagination from '@/components/MoviesPagination.vue';
import Loader from '@/components/Loader.vue';
import Header from '@/components/Header.vue';
import Notification from '@/components/Notification.vue';

export default {
  name: 'App',
  data: () => ({
    posterBg: '',
  }),
  watch: {
    '$route.query': {
      handler: 'onPageQueryChange',
      immediate: true,
      deep: true,
    },
  },
  components: {
    MoviesList,
    PosterBg,
    MoviesPagination,
    Loader,
    Header,
    Notification,
  },
  computed: {
    ...mapGetters('movies', ['moviesList', 'moviesPerPage', 'currentPage', 'totalMovies']),
  },
  methods: {
    ...mapActions('movies', ['fetchMovies', 'changeCurrentPage']),
    changePoster(posterBg) {
      this.posterBg = posterBg;
    },
    onPageQueryChange({ page = 1 }) {
      this.changeCurrentPage(Number(page));
    },
    changePage(page) {
      this.changeCurrentPage(page);
      this.$router.push({ query: { page } });
    },
  },
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
