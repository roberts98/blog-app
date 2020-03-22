<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import store from './store';
import Header from './components/Header';

export default {
  name: 'App',
  components: {
    Header
  },
  mounted() {
    store.dispatch('auth/fetchUser');
  }
};
</script>
