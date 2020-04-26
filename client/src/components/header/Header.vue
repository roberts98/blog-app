<template>
  <header :class="{ header: true, 'header--homepage': isHomepage }">
    <h2 class="header__logo">
      <router-link to="/">Blog app</router-link>
    </h2>
    <div v-if="token" class="header__right">
      <Avatar :onClick="toggleDropdown" />
      <Dropdown :toggleDropdown="toggleDropdown" :isOpen="isDropdownOpen" />
    </div>
    <div v-else class="header__right">
      <router-link to="/login">
        <Button variant="white">Sign in</Button>
      </router-link>
      <router-link to="/register">
        <Button variant="white--outline">Sign up</Button>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';

import Button from '../shared/Button';
import Avatar from './Avatar';
import Dropdown from './Dropdown';

export default {
  name: 'Header',
  components: {
    Button,
    Avatar,
    Dropdown
  },
  data() {
    return {
      isDropdownOpen: false,
      isHomepage: false
    };
  },
  computed: mapState({
    token: state => state.auth.token,
    username: state => state.auth.user.username
  }),
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  },
  watch: {
    $route() {
      this.isHomepage = this.$router.currentRoute.path === '/';
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: relative;
  z-index: 100;
  background-color: $col-primary;

  &--homepage {
    background-color: transparent;
  }

  &__logo {
    font-size: 40px;
    font-weight: 400;
    margin: 0;
    text-transform: uppercase;
    text-decoration: none;

    a {
      text-decoration: none;
      &,
      &:hover,
      &:active {
        color: $col-white;
      }
    }
  }

  &__username {
    color: $col-white;
    font-weight: 500;
    margin-right: 20px;

    a {
      color: $col-white;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
    }
  }

  &__right {
    display: flex;
    align-items: center;

    a:not(:last-child) {
      .button {
        margin-right: 20px;
      }
    }
  }
}
</style>
