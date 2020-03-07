<template>
  <header class="header">
    <h2 class="header__logo">
      <router-link to="/">Blog app</router-link>
    </h2>
    <div>
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
import Button from './Button';

export default {
  name: 'Header',
  components: {
    Button
  }
};
</script>

<style scoped lang="scss">
.header {
  height: 80px;
  background: $col-primary;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

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

  .button {
    margin-right: 20px;
  }
}
</style>
