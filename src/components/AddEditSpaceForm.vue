<template>
  <form
    v-show="rendered"
    @submit.prevent
    id="addEditSpaceForm"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    spellcheck="false"
  >
    <div class="form-group">
      <label for="symbol">Symbol</label>
      <input
        v-model="space.symbol"
        class="form-control"
        id="symbol"
        name="symbol"
        placeholder="Symbol"
        :class="{ 'is-invalid': errors['symbol'] }"
        v-on:input="inputSymbol"
      />
      <div class="invalid-feedback">{{errors["symbol"]}}</div>
    </div>
    <span id="mathSymbol"></span>
    <div class="form-group mt-4">
      <label for="norm">Norm</label>
      <input
        v-model="space.norm"
        class="form-control"
        id="norm"
        name="norm"
        placeholder="Norm"
        :class="{ 'is-invalid': errors['norm'] }"
        v-on:input="inputNorm"
      />
      <div class="invalid-feedback">{{errors["norm"]}}</div>
    </div>
    <div id="mathNorm"></div>
    <div class="form-group mt-4">
      <label for="description">Description</label>
      <input
        v-model="space.description"
        class="form-control"
        id="description"
        name="description"
        placeholder="Description"
        :class="{ 'is-invalid': errors['description'] }"
        v-on:input="inputDescription"
      />
      <div class="invalid-feedback">{{errors["description"]}}</div>
    </div>
    <div id="mathDescription"></div>
    <div class="form-group mt-4">
      <label for="field">Field</label>
      <select class="form-control" id="field" name="field" v-model="space.field">
        <option value="REAL_OR_COMPLEX">Real or complex numbers</option>
        <option value="REAL">Real numbers only</option>
        <option value="COMPLEX">Complex numbers only</option>
      </select>
    </div>
  </form>
</template>

<script>
export default {
  name: "AddEditSpaceForm",
  props: {
    space: {
      required: true
    },
    errors: {}
  },
  data: function() {
    return {
      rendered: false
    };
  },
  methods: {
    inputSymbol: function(event) {
      $("#mathSymbol").text(event.target.value);
      this.render("mathSymbol");
    },
    inputDescription: function(event) {
      $("#mathDescription").text(event.target.value);
      this.render("mathDescription");
    },
    inputNorm: function(event) {
      $("#mathNorm").text(event.target.value);
      this.render("mathNorm");
    }
  },
  mounted: function() {
    $("#mathSymbol").text(this.space.symbol);
    $("#mathNorm").text(this.space.norm);
    $("#mathDescription").text(this.space.description);
    this.$nextTick(() => {
      this.render("mathSymbol");
      this.render("mathNorm");
      this.render("mathDescription");
      this.rendered = true;
    });
  }
};
</script>
