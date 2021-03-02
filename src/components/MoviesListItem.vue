<template>
  <div class='movie-item-wrap' >
    <div class='movie-item mb-3'>
      <div class="movie-poster" :style='poster'></div>
      <div class="movie-info-wrap d-flex justify-content-between flex-column">
        <div class="movie-info">
          <h3 class="movie-title">{{ movie.Title }}</h3>
          <span class="movie-year">{{ movie.Year }}</span>
        </div>
        <div class="movie-item-controls row no-gutters">
          <div class="col pr-2">
            <BButton
              size='md'
              block variant='outline-light'
              @click='onInfoClickEmit(movie.imdbID)'
            >Info</BButton>
          </div>
          <div class="col pl-2">
            <BButton
              size='md'
              block variant='outline-light'
              @click='onDeleteBtn({ id: movie.imdbID, title: movie.Title })'
            >Delete</BButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoviesListItem',
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    poster() {
      return {
        'background-image': `url(${this.movie.Poster})`,
      };
    },
  },
  methods: {
    onDeleteBtn(movie) {
      this.$emit('onDeleteBtn', movie);
    },
    onInfoClickEmit(id) {
      this.$emit('onInfoClick', id);
    },
  },
};
</script>

<style scoped>
  .movie-item-wrap {
    position: relative;
    padding-bottom: 150%;
  }
  .movie-item {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    transition: all .2s ease;
  }
  .movie-item:hover {
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
    transform: scale(1.02);
  }
  .movie-poster {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .movie-title {
    color: white;
    font-size: 20px;
  }

  .movie-year {
    color: white;
    font-size: 18px;
  }

  .movie-info-wrap {
    height: 100%;
    padding: 15px 20px;
    opacity: 0;
    transition: all 0.2s ease;
  }
  .active {
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 1;
  }
  .movie-item:hover .movie-info-wrap {
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 1;
  }
</style>
