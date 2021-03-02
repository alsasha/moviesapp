<template>
  <header class="header">
    <BNavbar class="navbar" type="dark" variant="dark">
      <BContainer>
        <BNavbarBrand class="navbar-brand">Movies 250</BNavbarBrand>
        <BNavForm class="navbar-form">
          <BFormInput
            class="navbar-input mr-sm-2"
            placeholder="Search"
            v-model='searchValue'
            debounce='500'
          ></BFormInput>
        </BNavForm>
      </BContainer>
    </BNavbar>
  </header>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Header',
  data: () => ({
    searchValue: '',
  }),
  watch: {
    searchValue: 'onSearchValueChanged',
  },
  methods: {
    ...mapActions('movies', ['searchMovie', 'fetchMovies', 'toggleSearchState']),
    onSearchValueChanged(val) {
      if (val) {
        this.searchMovie(val);
        this.toggleSearchState(true);
      } else {
        this.fetchMovies();
        this.toggleSearchState(false);
      }
    },
  },
};
</script>

<style scoped>
  .header {
    margin-bottom: 30px;
  }

  .navbar {
    background-color: rgba(0, 0, 0, 0.7) !important;
  }

  .navbar-input {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    color: white;
  }

  .navbar-input:focus {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(0, 0, 0, 0.6);
    color: white;
    box-shadow: none;
  }
</style>
