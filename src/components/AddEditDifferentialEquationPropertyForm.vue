<template>
  <form
    id="addEditDifferentialEquationPropertyForm"
    autocapitalize="off"
    autocomplete="off"
    autocorrect="off"
    spellcheck="false"
    @submit.prevent
  >
    <div>
      <label for="name" class="form-label">Name</label>
      <input
        id="name"
        name="name"
        placeholder="Name"
        autocomplete="off"
        class="form-control"
        :class="{ 'is-invalid': errors['name'] }"
        @input="inputMath"
      />
      <div class="invalid-feedback">{{ errors['name'] }}</div>
    </div>
    <div id="mathName" class="mt-2"></div>
    <div class="mt-4">
      <label for="description" class="form-label">Description</label>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        class="form-control"
        rows="1"
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
    property: Object,
    errors: Object
  },
  mounted() {
    this.initMath('name', false, this.property.name)
    this.initMath('description', true, this.property.description)
  }
}
</script>
