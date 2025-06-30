<template>
  <form
    id="addEditLinkForm"
    autocapitalize="off"
    autocomplete="off"
    autocorrect="off"
    spellcheck="false"
    @submit.prevent
  >
    <div class="mt-4">
      <label for="hasProperty" class="form-label">Link type</label>
      <select
        id="hasProperty"
        name="hasProperty"
        class="form-select"
        :class="{ 'is-invalid': errors['hasProperty'] }"
      >
        <option v-for="option in options" :key="option" :value="option">
          {{ formatOption(option) }}
        </option>
      </select>
      <div class="invalid-feedback">{{ errors['hasProperty'] }}</div>
    </div>
    <div class="mt-4">
      <label for="description" class="form-label">Description (optional)</label>
      <input
        id="description"
        name="description"
        placeholder="Explanation of why this differential equation has or lacks this property"
        class="form-control"
        :class="{ 'is-invalid': errors['description'] }"
        @input="inputMath"
      />
      <div class="invalid-feedback">{{ errors['description'] }}</div>
    </div>
    <div id="mathDescription" class="mt-2"></div>
  </form>
</template>

<script>
export default {
  props: {
    link: Object,
    errors: Object
  },
  data() {
    return {
      options: [true, false]
    }
  },
  mounted() {
    this.init('hasProperty', `${this.link.hasProperty}`)
    this.initMath('description', this.link.description)
  },
  methods: {
    formatOption(option) {
      if (option) {
        return 'Differential equation has property'
      } else {
        return "Differential equation doesn't have property"
      }
    }
  }
}
</script>
