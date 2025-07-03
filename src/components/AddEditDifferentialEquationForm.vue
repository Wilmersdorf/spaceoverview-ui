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
      <textarea
        id="symbol"
        name="symbol"
        placeholder="Equation"
        rows="1"
        class="form-control"
        :class="{ 'is-invalid': errors['symbol'] }"
        @input="inputMath"
      />
      <div class="invalid-feedback">{{ errors['symbol'] }}</div>
    </div>
    <div id="mathSymbol" class="mt-2"></div>
    <div class="mt-4">
      <label for="variables" class="form-label">Variables</label>
      <textarea
        id="variables"
        name="variables"
        placeholder="Variables"
        rows="1"
        class="form-control"
        :class="{ 'is-invalid': errors['variables'] }"
        @input="inputMath"
      />
      <div class="invalid-feedback">{{ errors['variables'] }}</div>
    </div>
    <div id="mathVariables" class="mt-2"></div>
    <div class="mt-4">
      <label for="parameters" class="form-label">Parameters</label>
      <textarea
        id="parameters"
        name="parameters"
        placeholder="Parameters"
        rows="1"
        class="form-control"
        :class="{ 'is-invalid': errors['parameters'] }"
        @input="inputMath"
      />
      <div class="invalid-feedback">{{ errors['parameters'] }}</div>
    </div>
    <div id="mathParameters" class="mt-2"></div>
    <div class="mt-4">
      <label for="description" class="form-label">Description</label>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
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
    differentialEquation: Object,
    errors: Object
  },
  mounted() {
    this.initMath('name', false, this.differentialEquation.name)
    this.initMath('symbol', true, this.differentialEquation.symbol)
    this.initMath('variables', true, this.differentialEquation.variables)
    this.initMath('parameters', true, this.differentialEquation.parameters)
    this.initMath('description', true, this.differentialEquation.description)
  }
}
</script>
