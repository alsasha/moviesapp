<template>
  <div class="movies-pagination d-flex justify-content-center">
    <BPagination
      v-model='currentPageModel'
      :per-page='moviesPerPage'
      :total-rows='total'
      prev-text='Prev'
      next-text='Next'
    />
  </div>
</template>

<script>
export default {
  name: 'MoviesPagination',
  props: {
    total: {
      type: Number,
      default: 1,
    },
    moviesPerPage: {
      type: Number,
      default: 1,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    currentPageModel: {
      get() {
        return this.currentPage;
      },
      set(value) {
        this.$emit('changeCurrentPage', value);
      },
    },
  },
};
</script>

<style scoped>
  .movies-pagination {
    margin-top: auto;
  }
  .movies-pagination >>> .pagination .page-item .page-link {
    background-color: transparent;
    color: white;
    box-shadow: none;
  }

  .movies-pagination >>> .pagination .page-item.active .page-link {
    background-color: white;
    border-color: white;
    color: black;
  }

  .movies-pagination >>> .pagination .page-item.disabled .page-link {
    color: lightgray;
  }

  .movies-pagination >>> .pagination .page-item:not(.disabled, .active) .page-link:hover {
    box-shadow: 0px 0px 10px white;
  }
</style>
