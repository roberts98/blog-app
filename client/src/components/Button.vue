<template>
  <button
    :type="type || 'button'"
    @click="handleClick"
    :class="'button button--' + variant"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: ['variant', 'type'],
  methods: {
    handleClick() {
      this.$emit('onClick');
    }
  }
};
</script>

<style scoped lang="scss">
.button {
  border: unset;
  min-width: 120px;
  transition: all 0.4s;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: 700;
  border: 2px solid transparent;

  &--primary {
    background: $col-primary;
    color: $col-white;

    &:hover {
      border: 2px solid $col-primary;
      background: $col-white;
      color: $col-primary;
    }
  }

  &--white {
    background: $col-white;
    color: $col-primary;

    &:hover {
      border: 2px solid $col-white;
      background: transparent;
      color: $col-white;
    }

    &--outline {
      background: transparent;
      border: 2px solid $col-white;
      color: $col-white;

      &:hover {
        background: $col-white;
        color: $col-primary;
        border: 2px solid transparent;
      }
    }
  }
}
</style>
