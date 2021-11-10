<template>
  <div class="dropdown" v-click-outside="dropdownClose">
    <label
        class="form-label"
        :for="id"
        v-if="label"
    >
      {{ label }}
    </label>
    <button
        :id="id"
        type="button"
        :class="['form-select text-start', {
          'is-invalid': isInvalid
        }]"
        @click="dropdownToggle"
    >
      {{ chosen }}
    </button>
    <ul
        :class="['w-100 dropdown-menu', {
          'show': isOpen
        }]">
      <li class="px-2 pb-2">
        <input
            class="form-control"
            v-model="searchWord"
        >
      </li>
      <template v-if="optionsList.length">
        <li
            v-for="option in optionsList"
            :key="option.id"
            :class="['dropdown-item', {
              'active': selected === option.id
            }]"
            @click="dropdownSelect(option.id)"
        >
          {{ option.label }}
        </li>
      </template>
      <li class="dropdown-item" v-else>{{ notFound }}</li>
    </ul>
    <slot name="errorMessage" v-if="isInvalid"></slot>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import { debounce } from "@/helpers/debounce";

export default {
  name: 'CustomDropdown',
  directives: {
    ClickOutside
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
    value: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Ничего не выбрано'
    },
    notFound: {
      type: String,
      default: 'Ничего не найдено'
    },
    isInvalid: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      optionsList: [],
      selected: '',
      isOpen: false,
      searchWord: '',
      debouncedList: null
    }
  },
  created() {
    this.debouncedList = debounce(this.filterOptions);
  },
  mounted() {
    this.debouncedList();
  },
  computed: {
    chosen() {
      return this.options.find(el => el.id === this.selected)?.label || this.placeholder
    }
  },
  watch: {
    searchWord(newValue) {
      this.debouncedList(newValue)
    }
  },
  methods: {
    dropdownToggle() {
      this.isOpen = !this.isOpen
    },
    dropdownClose() {
      this.isOpen = false
    },
    dropdownSelect(value) {
      this.selected = value;
      this.searchWord = '';
      this.$emit('input', value);
      this.dropdownClose();
    },
    filterOptions(value = '') {
      this.optionsList = this.options.filter(el => el.label.toLowerCase().includes(value.toLowerCase()));
    }
  }
}
</script>

<style>
.dropdown-menu {
  max-height: 300px;
  overflow: auto;
}
.dropdown-item {
  cursor: pointer;
}
</style>
