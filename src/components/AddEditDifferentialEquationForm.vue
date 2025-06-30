<template>
  <form
    id="addEditDifferentialEquationForm"
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
      <label for="symbol" class="form-label">Equation</label>
      <input
        id="symbol"
        name="symbol"
        placeholder="Equation"
        class="form-control"
        :class="{ 'is-invalid': errors['symbol'] }"
        @input="inputMath"
      />
      <div class="invalid-feedback">{{ errors['symbol'] }}</div>
    </div>
    <div id="mathSymbol" class="mt-2"></div>
    <div class="mt-4">
      <label for="variables" class="form-label">Variables</label>
      <input
        id="variables"
        name="variables"
        placeholder="Variables"
        class="form-control"
        :class="{ 'is-invalid': errors['variables'] }"
        @input="inputMath"
      />
      <div class="invalid-feedback">{{ errors['variables'] }}</div>
    </div>
    <div id="mathVariables" class="mt-2"></div>
    <div class="mt-4">
      <label for="parameters" class="form-label">Parameters</label>
      <input
        id="parameters"
        name="parameters"
        placeholder="Parameters"
        class="form-control"
        :class="{ 'is-invalid': errors['parameters'] }"
        @input="inputMath"
      />
      <div class="invalid-feedback">{{ errors['parameters'] }}</div>
    </div>
    <div id="mathParameters" class="mt-2"></div>
    <div class="mt-4">
      <label for="description" class="form-label">Description</label>
      <input
        id="description"
        name="description"
        placeholder="Description"
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
    differentialEquation: Object,
    errors: Object
  },
  mounted() {
    this.initMath('name', this.differentialEquation.name)
    this.initMath('symbol', this.differentialEquation.symbol)
    this.initMath('variables', this.differentialEquation.variables)
    this.initMath('parameters', this.differentialEquation.parameters)
    this.initMath('description', this.differentialEquation.description)
  }
}
</script>
