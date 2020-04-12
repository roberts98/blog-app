<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import store from './store';
import Header from './components/header/Header';

export default {
  name: 'App',
  components: {
    Header
  },
  mounted() {
    store.dispatch('fetchUser');
  }
};
</script>
