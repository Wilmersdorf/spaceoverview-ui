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
      <label for="fieldSelect" class="form-label">Field</label>
      <select
        id="fieldSelect"
        name="field"
        class="form-select"
        :class="{ 'is-invalid': errors['field'] }"
      >
        <option v-for="option in options" :key="option" :value="option">
          {{ formatFieldLink(option) }}
        </option>
      </select>
      <div class="invalid-feedback">{{ errors['field'] }}</div>
    </div>
    <div class="mt-4">
      <label for="description" class="form-label">Description (optional)</label>
      <textarea
        id="description"
        name="description"
        placeholder="Explanation of why this space has or lacks this property"
        rows="1"
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
    space: Object,
    property: Object,
    link: Object,
    errors: Object
  },
  computed: {
    options() {
      const { space, property } = this
      if (space.field === 'REAL') {
        if (property.field === 'COMPLEX') {
          return []
        } else {
          return ['REAL', 'NOT_REAL']
        }
      } else if (space.field === 'COMPLEX') {
        if (property.field === 'REAL') {
          return []
        } else {
          return ['COMPLEX', 'NOT_COMPLEX']
        }
      } else if (property.field === 'REAL') {
        return ['REAL', 'NOT_REAL']
      } else if (property.field === 'COMPLEX') {
        return ['COMPLEX', 'NOT_COMPLEX']
      } else {
        return [
          'REAL',
          'COMPLEX',
          'REAL_AND_COMPLEX',
          'NOT_REAL',
          'NOT_COMPLEX',
          'NOT_REAL_AND_NOT_COMPLEX',
          'REAL_AND_NOT_COMPLEX',
          'NOT_REAL_AND_COMPLEX'
        ]
      }
    }
  },
  mounted() {
    this.init('fieldSelect', this.link.field)
    this.initMath('description', true, this.link.description)
  }
}
</script>
