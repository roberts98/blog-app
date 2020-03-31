<template>
  <div class="box">
    <div class="box__header">
      <h2 class="box__title">{{ title }}</h2>
      <img class="box__img" :src="img" />
    </div>
    <div class="box__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Box',
  props: ['img', 'title']
};
</script>

<style scoped lang="scss">
.box {
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: $col-light;

  &__header {
    position: relative;
  }

  &__title {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: $col-white;
    font-size: 40px;
  }

  &__img {
    max-height: 300px;
    width: 700px;
    object-fit: cover;
    display: block;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  &__content {
    padding: 40px 80px;
  }
}
</style>
