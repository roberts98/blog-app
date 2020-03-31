<template>
  <div class="input-wrapper">
    <label :for="id">{{ label }}</label>
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

<style lang="scss">
.input-wrapper {
  margin: 16px 0 32px 0;
  align-items: center;
  justify-content: space-between;
}

label {
  display: block;
  margin-bottom: 10px;
  min-width: 125px;
  font-size: 12px;
  font-weight: bold;
  color: $col-dark-gray;
  text-transform: uppercase;
}

input {
  border: 1px solid $col-gray;
  border-radius: 5px;
  outline: none;
  background: transparent;
  width: 400px;
  padding: 10px 15px;
  width: 100%;

  &.error {
    border-bottom: 1px solid $col-red;
  }
}
</style>
