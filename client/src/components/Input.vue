<template>
  <div class="input-wrapper">
    <label :for="id">
      {{ label }}
    </label>
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
      :id="id"
      :type="type"
      :class="className"
    />
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: ['type', 'label', 'id', 'placeholder', 'value', 'className']
};
</script>

<style scoped lang="scss">
.input-wrapper {
  margin: 16px 0 32px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

label {
  margin-right: 20px;
  min-width: 125px;
}

input {
  border: unset;
  border-bottom: 1px solid $col-gray;
  outline: none;
  background: transparent;
  width: 400px;
  padding: 5px 0;
  width: 100%;

  &.error {
    border-bottom: 1px solid $col-red;
  }
}
</style>
