<template>
  <div id="app">
    <Header />
    <router-view />
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
