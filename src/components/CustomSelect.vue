<template>
  <div class="mb-3">
    <label
        :for="id"
        class="form-label"
        v-if="label"
    >
      {{ label }}
    </label>
    <select
        :id="id"
        :class="['form-select', {
          'is-invalid': isInvalid
        }]"
        @change="$emit('input', $event.target.value)"
    >
      <template v-if="options.length">
        <option value="" disabled selected>{{ placeholder }}</option>
        <option
            v-for="option in options"
            :key="option.id"
            :value="option.id"
            :selected="value === option.id"
        >
          {{ option.label }}
        </option>
      </template>
      <option
          disabled
          v-else
      >
        Ничего нет
      </option>
    </select>
    <slot name="errorMessage" v-if="isInvalid"></slot>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    label: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Ничего не выбрано'
    },
    isInvalid: {
      type: Boolean,
      default: false
    },
  }
}
</script>
