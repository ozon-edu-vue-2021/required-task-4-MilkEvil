<template>
  <div class="mb-3">
    <label
        :for="id"
        class="form-label"
        v-if="label"
    >{{ label }}</label>
    <input
        :id="id"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        v-mask="mask"
        :class="['form-control', {
          'is-invalid': isInvalid
        }]"
        @input="$emit('input', $event.target.value)"
    >
    <slot name="errorMessage" v-if="isInvalid"></slot>
  </div>
</template>

<script>
import { VueMaskDirective } from 'v-mask';

export default {
  name: 'CustomInput',
  directives: {
    mask: VueMaskDirective
  },
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    isInvalid: {
      type: Boolean,
      default: false
    },
    mask: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.form-control[type="number"] {
  -moz-appearance: textfield;
  -webkit-appearance: textfield;
  appearance: textfield;
}

.form-control[type="number"]::-webkit-outer-spin-button,
.form-control[type="number"]::-webkit-inner-spin-button {
  display: none;
}
</style>