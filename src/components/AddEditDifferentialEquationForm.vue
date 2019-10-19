<template>
  <form
    v-show="rendered"
    @submit.prevent
    id="addEditDifferentialEquationForm"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    spellcheck="false"
  >
    <!-- Name -->
    <div class="form-group">
      <label for="name">Name</label>
      <input
        v-model="differentialEquation.name"
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
    <!-- Symbol -->
    <div class="form-group mt-4">
      <label for="symbol">Equation</label>
      <input
        v-model="differentialEquation.symbol"
        class="form-control"
        id="symbol"
        name="symbol"
        placeholder="Equation"
        :class="{ 'is-invalid': errors['symbol'] }"
        v-on:input="inputSymbol"
      />
      <div class="invalid-feedback">{{ errors['symbol'] }}</div>
    </div>
    <span id="mathSymbol"></span>
    <!-- Variables -->
    <div class="form-group mt-4">
      <label for="variables">Variables</label>
      <input
        v-model="differentialEquation.variables"
        class="form-control"
        id="variables"
        name="variables"
        placeholder="Variables"
        :class="{ 'is-invalid': errors['variables'] }"
        v-on:input="inputVariables"
      />
      <div class="invalid-feedback">{{ errors['variables'] }}</div>
    </div>
    <span id="mathVariables"></span>
    <!-- Parameters -->
    <div class="form-group mt-4">
      <label for="parameters">Parameters</label>
      <input
        v-model="differentialEquation.parameters"
        class="form-control"
        id="parameters"
        name="parameters"
        placeholder="Parameters"
        :class="{ 'is-invalid': errors['parameters'] }"
        v-on:input="inputParameters"
      />
      <div class="invalid-feedback">{{ errors['parameters'] }}</div>
    </div>
    <span id="mathParameters"></span>
    <!-- Description -->
    <div class="form-group mt-4">
      <label for="description">Description</label>
      <input
        v-model="differentialEquation.description"
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
  name: 'AddEditDifferentialEquationForm',
  props: {
    differentialEquation: {
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
    inputSymbol(event) {
      $('#mathSymbol').text(event.target.value)
      this.render('mathSymbol')
    },
    inputVariables(event) {
      $('#mathVariables').text(event.target.value)
      this.render('mathVariables')
    },
    inputParameters(event) {
      $('#mathParameters').text(event.target.value)
      this.render('mathParameters')
    },
    inputDescription(event) {
      $('#mathDescription').text(event.target.value)
      this.render('mathDescription')
    }
  },
  mounted() {
    $('#mathName').text(this.differentialEquation.name)
    $('#mathSymbol').text(this.differentialEquation.symbol)
    $('#mathVariables').text(this.differentialEquation.variables)
    $('#mathParameters').text(this.differentialEquation.parameters)
    $('#mathDescription').text(this.differentialEquation.description)
    this.$nextTick(() => {
      this.render('mathName')
      this.render('mathSymbol')
      this.render('mathVariables')
      this.render('mathParameters')
      this.render('mathDescription')
      this.rendered = true
    })
  }
}
</script>
