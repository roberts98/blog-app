<template>
  <div class="page">
    <div class="page__inner container">
      <h1 class="page__header">Page not found</h1>
      <h2 class="page__subheader">404</h2>
      <p class="page__hint">
        Go to
        <router-link to="/">home</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404'
};
</script>

<style lang="scss" scoped>
.page {
  min-height: calc(100vh - 80px);
  background-color: $col-primary;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  &__header {
    margin-top: 0;
    font-size: 60px;
    color: $col-white;
    text-transform: uppercase;
    font-weight: 400;
    margin-bottom: 0;
  }

  &__subheader {
    margin-top: 20px;
    font-size: 300px;
    color: $col-text;
    margin-bottom: 0;
  }

  &__hint {
    a {
      color: $col-white;
    }
  }
}
</style>
