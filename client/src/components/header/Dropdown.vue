<template>
  <div :class="{ dropdown: true, open: isOpen }">
    <ul class="dropdown__list">
      <li @click="toggleDropdown" class="dropdown__item">
        <router-link to="/add-post">Create post</router-link>
      </li>
      <li @click="toggleDropdown" class="dropdown__item">
        <router-link to="/profile">My profile</router-link>
      </li>
      <li @click="toggleDropdown" class="dropdown__item">
        <router-link to="/profile/edit">Edit profile</router-link>
      </li>
      <li @click="toggleDropdown" class="dropdown__item">
        <button class="btnReset dropdown__btn" @click="logout">Logout</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: ['isOpen', 'toggleDropdown'],
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
};
</script>

<style lang="scss">
.dropdown {
  position: absolute;
  width: 200px;
  top: 80px;
  right: 20px;
  background-color: $col-light;
  transition-duration: 0.4s;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);

  &.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  &__list {
    padding-left: 20px;
    margin: 0;
    list-style: none;
  }

  &__item {
    margin-top: 30px;

    &:last-child {
      margin-bottom: 30px;
    }

    a {
      text-decoration: none;
      color: $col-text;
      font-weight: 500;

      &.router-link-exact-active {
        color: $col-primary;
      }
    }
  }

  &__btn {
    font-weight: 500;
    cursor: pointer;
    color: $col-text;
  }
}
</style>
