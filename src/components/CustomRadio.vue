<template>
  <div class="form-check form-check-inline">
    <input
        :id="id"
        :type="type"
        :name="name"
        :value="value"
        class="form-check-input"
        @change="$emit('change', $event.target.value)"
        :checked="currentValue === value"
    >
    <label
        class="form-check-label"
        :for="id"
    >{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'CustomRadio',
  props: {
    label: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'radio'
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: [Boolean, String],
      default: ''
    },
    currentValue: {
      type: [Boolean, String],
      default: ''
    }
  }
}
</script>
