<template>
  <div class='modal-info-wrap'>
    <header class="modal-header">
      <h3 class="header-title">Movie view</h3>
      <BIconX
        class="modal-icon"
        @click='onCloseModalClick'
      ></BIconX>
    </header>
    <div class="movie-info">
      <BRow>
        <BCol sm='4'>
          <div class="movie-poster-wrap" >
            <div
              class="movie-poster"
              :style='posterBg'
            ></div>
          </div>
        </BCol>
        <BCol sm='8'>
          <h3 class="movie-title">{{ movie.Title }}</h3>
          <BFormRating
            class="movie-rating"
            v-model="ratingValue"
            variant="warning"
            readonly
            precision="1"
            show-value
            show-value-max
            stars='10'
            no-border
          ></BFormRating>
          <p class="movie-plot">{{ movie.Plot }}
          </p>
          <div class="movie-badget-wrap mb-3">
            <BBadge class="mr-2" variant="success">{{ movie.Year }}</BBadge>
            <BBadge class="mr-2" variant="success">{{ movie.Runtime }}</BBadge>
            <BBadge class="mr-2" variant="success">{{ movie.Genre }}</BBadge>
            <BBadge class="mr-2" variant="success">{{ movie.Language }}</BBadge>
          </div>
          <table class="table small">
            <tr>
              <th>Production</th>
              <td>{{ movie.Language }}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{{ movie.Country }}</td>
            </tr>
            <tr>
              <th>Director</th>
              <td>{{ movie.Director }}</td>
            </tr>
            <tr>
              <th>Writer</th>
              <td>{{ movie.Writer }}</td>
            </tr>
            <tr>
              <th>Actors</th>
              <td>{{ movie.Actors }}</td>
            </tr>
            <tr>
              <th>Awards</th>
              <td>{{ movie.Awards }}</td>
            </tr>
          </table>
        </BCol>
      </BRow>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieInfoModal',
  props: {
    movie: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    posterBg() {
      return {
        'background-image': `url(${this.movie.Poster})`,
      };
    },
    ratingValue() {
      return this.movie.imdbRating;
    },
  },
  methods: {
    onCloseModalClick() {
      this.$emit('onCloseModalClick');
    },
  },
};
</script>

<style scoped>
  .modal-info-wrap {
    border-radius: 5px;
  }

  .modal-header {
    background-image: linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(85, 15, 117) 100%);
      opacity: 0.7;
  }
  .header-title {
    font-size: 1.25rem;
    color: white;
    margin: 0;
  }
  .modal-icon {
    color: white;
    font-size: 25px;
    cursor: pointer;
  }
  .movie-info {
    padding: 1rem;
  }
  .movie-poster-wrap {
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    padding-bottom: 150%;
    transition: all 0.2s ease;
  }
  .movie-poster {
    background-position: center center;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
  }
  .movie-title {
    color: rgb(20, 20, 20);
    font-weight: 300;
    font-size: 40px;
  }
  .movie-rating {
    padding: 0;
  }
  .movie-rating >>> .b-rating-star,
  .movie-rating >>> .b-rating-value {
    justify-content: flex-start;
    flex-grow: 0 !important;
    padding: 0;
  }
  .movie-rating >>> .b-rating-star + .b-rating-star {
    margin-left: 4px;
  }
  .movie-rating >>> .b-rating-value {
    margin-left: 10px;
    font-weight: 200;
    font-size: 1.2rem;
  }
  .movie-plot {
    font-weight: 200;
  }
</style>
