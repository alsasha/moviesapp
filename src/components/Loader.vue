<template>
  <div
  class="loader-wrapper d-flex align-items-center justify-content-center"
  v-if='isShowLoader'
  >
    <b-spinner type="grow" label="Loading..."></b-spinner>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Loader',
  computed: {
    ...mapGetters(['isShowLoader']),
  },
};
</script>

<style scoped>
  .loader-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
  }
</style>
