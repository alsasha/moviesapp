<template>
  <div class="poster-bg" :style='posterStyle'></div>
</template>

<script>
export default {
  name: 'PosterBg',
  props: {
    poster: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    defaultPosterImage: 'linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(85, 15, 117) 100%)',
  }),
  computed: {
    posterStyle() {
      return {
        'background-image': this.posterBgImage,
      };
    },
    posterBgImage() {
      return this.poster ? `url(${this.poster})` : this.defaultPosterImage;
    },
  },
};
</script>

<style scoped>
  .poster-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-position: center;
    background-size: cover;
    z-index: -1;
  }

  .poster-bg:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(85, 15, 117) 100%);
    opacity: 0.7;
  }
</style>
