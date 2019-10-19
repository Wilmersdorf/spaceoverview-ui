<template>
  <form v-show="rendered" @submit.prevent id="addEditLinkForm">
    <div class="form-group mt-4">
      <label for="hasProperty">Link type</label>
      <select
        class="form-control"
        id="hasProperty"
        name="hasProperty"
        v-model="link.hasProperty"
        :class="{ 'is-invalid': errors['hasProperty'] }"
      >
        <option v-for="option in options" :key="option" :value="option">{{
          formatOption(option)
        }}</option>
      </select>
      <div class="invalid-feedback">{{ errors['hasProperty'] }}</div>
    </div>
    <!-- Description -->
    <div class="form-group mt-4">
      <label for="description">Description (optional)</label>
      <input
        v-model="link.description"
        class="form-control"
        id="description"
        name="description"
        placeholder="Explanation of why this differential equation has or lacks this property"
        :class="{ 'is-invalid': errors['description'] }"
        v-on:input="inputDescription"
      />
      <div class="invalid-feedback">{{ errors['description'] }}</div>
    </div>
    <span id="mathDescription"></span>
  </form>
</template>

<script>
export default {
  name: 'AddEditDifferentialEquationLinkForm',
  props: {
    link: {
      required: true
    },
    errors: {
      required: true
    }
  },
  data() {
    return {
      rendered: false
    }
  },
  computed: {
    options() {
      return [true, false]
    }
  },
  methods: {
    formatOption(option) {
      if (option) {
        return 'Differential equation has property'
      } else {
        return "Differential equation doesn't have property"
      }
    },
    inputDescription(event) {
      $('#mathDescription').text(event.target.value)
      this.render('mathDescription')
    }
  },
  mounted() {
    $('#mathDescription').text(this.link.description)
    this.$nextTick(() => {
      this.render('mathDescription')
      this.rendered = true
    })
  }
}
</script>
