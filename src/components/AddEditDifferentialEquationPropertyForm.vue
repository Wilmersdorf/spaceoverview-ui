<template>
  <form
    v-show="rendered"
    @submit.prevent
    id="addEditDifferentialEquationPropertyForm"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    spellcheck="false"
  >
    <!-- Name -->
    <div class="form-group">
      <label for="name">Name</label>
      <input
        v-model="property.name"
        class="form-control"
        id="name"
        name="name"
        placeholder="Name"
        :class="{ 'is-invalid': errors['name'] }"
        v-on:input="inputName"
      />
      <div class="invalid-feedback">{{ errors['name'] }}</div>
    </div>
    <span id="mathName"></span>
    <!-- Description -->
    <div class="form-group mt-4">
      <label for="description">Description</label>
      <input
        v-model="property.description"
        class="form-control"
        id="description"
        name="description"
        placeholder="Description"
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
  name: 'AddEditDifferentialEquationPropertyForm',
  props: {
    property: {
      required: true
    },
    errors: {}
  },
  data() {
    return {
      rendered: false
    }
  },
  methods: {
    inputName(event) {
      $('#mathName').text(event.target.value)
      this.render('mathName')
    },
    inputDescription(event) {
      $('#mathDescription').text(event.target.value)
      this.render('mathDescription')
    }
  },
  mounted() {
    $('#mathName').text(this.property.name)
    $('#mathDescription').text(this.property.description)
    this.$nextTick(() => {
      this.render('mathName')
      this.render('mathDescription')
      this.rendered = true
    })
  }
}
</script>
