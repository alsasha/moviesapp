<template>
  <div>
    <BContainer class="mb-3">
      <h3 class="movielist-title">{{ listTitle }}</h3>
      <BRow>
        <template v-if="isExist">
          <BCol
            class="b-col"
            lg="3" cols="6" sm="6" md="4" v-for="movie in list" :key="movie.imdbID">
              <MoviesListItem
                @mouseover.native='onMouseOver(movie.Poster)'
                :movie='movie'
                @onDeleteBtn='onMovieDelete'
                @onInfoClick='onMovieInfoClick'
                />
          </BCol>
        </template>
        <template v-else>
          <div>Empty list</div>
        </template>
      </BRow>
      <BModal
        body-class='movie-modal-body'
        :id='modalID'
        size='xl'
        hide-footer
        hide-header
      >
        <MovieInfoModal
          :movie='modalMovie'
          @onCloseModalClick='closeModal'
        />
      </BModal>
    </BContainer>
  </div>
</template>

<script>
import MoviesListItem from '@/components/MoviesListItem.vue';
import { mapActions, mapGetters } from 'vuex';
import MovieInfoModal from '@/components/MovieInfoModal.vue';

export default {
  name: 'MoviesList',
  components: {
    MoviesListItem,
    MovieInfoModal,
  },
  data: () => ({
    movieInfoID: '',
    modalID: 'movie-modal',
  }),
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters('movies', ['searchResult']),
    isExist() {
      return !!Object.values(this.list).length;
    },
    listTitle() {
      return this.searchResult ? 'Search Result' : 'IMDB Top 250';
    },
    modalMovie() {
      return this.movieInfoID ? this.list[this.movieInfoID] : null;
    },
  },
  methods: {
    ...mapActions('movies', ['deleteMovie']),
    onMouseOver(poster) {
      this.$emit('onMouseOver', poster);
    },
    async onMovieDelete({ id, title }) {
      const response = await this.$bvModal.msgBoxConfirm(`Are you sure delete ${title}?`);
      if (response) {
        this.deleteMovie(id);
      }
    },
    onMovieInfoClick(movieID) {
      this.$bvModal.show(this.modalID);
      this.movieInfoID = movieID;
    },
    closeModal() {
      this.$bvModal.hide(this.modalID);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .movielist-title {
    font-size: 40px;
    padding: 10px 0;
    color: white;
  }
</style>

<style>
  .movie-modal-body {
    padding: 0 !important;
  }
  @media (max-width: 480px) {
    .b-col {
      flex: 0 0 100% !important;
      max-width: 100% !important;
  }
  }
</style>
