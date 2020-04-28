<template>
  <div id="app">
    <Header />
    <router-view />
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import Header from './components/header/Header';

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      isHomepage: false
    };
  },
  mounted() {
    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start();

      next();
    });
    this.$router.afterEach((to, from) => {
      this.$Progress.finish();
    });

    this.$store.dispatch('fetchUser');
    this.$store.dispatch('getPosts').then(() => {
      this.$store.state.posts.messages.forEach(message => {
        this.$toasted.show(message, {
          type: this.$store.state.posts.messageType
        });
      });
    });
  }
};
</script>
