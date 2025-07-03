<template>
  <form
    id="addEditSpaceForm"
    autocapitalize="off"
    autocomplete="off"
    autocorrect="off"
    spellcheck="false"
    @submit.prevent
  >
    <div>
      <label for="symbol" class="form-label">Symbol</label>
      <input
        id="symbol"
        name="symbol"
        placeholder="Symbol"
        class="form-control"
        :class="{ 'is-invalid': errors['symbol'] }"
        @input="inputMath"
      />
      <div class="invalid-feedback">{{ errors['symbol'] }}</div>
    </div>
    <div id="mathSymbol" class="mt-2"></div>
    <div class="mt-4">
      <label for="norm" class="form-label">Norm</label>
      <textarea
        id="norm"
        name="norm"
        placeholder="Norm"
        rows="1"
        class="form-control"
        :class="{ 'is-invalid': errors['norm'] }"
        @input="inputMath"
      />
      <div class="invalid-feedback">{{ errors['norm'] }}</div>
    </div>
    <div id="mathNorm" class="mt-2"></div>
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
    <div class="mt-4">
      <label for="fieldSelect" class="form-label">Field</label>
      <select id="fieldSelect" name="field" class="form-select">
        <option value="REAL_OR_COMPLEX">Real or complex numbers</option>
        <option value="REAL">Real numbers only</option>
        <option value="COMPLEX">Complex numbers only</option>
      </select>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    space: Object,
    errors: Object
  },
  mounted() {
    this.init('fieldSelect', this.space.field)
    this.initMath('symbol', false, this.space.symbol)
    this.initMath('norm', true, this.space.norm)
    this.initMath('description', true, this.space.description)
  }
}
</script>
