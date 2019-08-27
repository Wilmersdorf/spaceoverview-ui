<template>
  <form
    v-show="rendered"
    @submit.prevent
    id="addEditPropertyForm"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    spellcheck="false"
  >
    <div class="form-group mt-4">
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
      <div class="invalid-feedback">{{errors["name"]}}</div>
    </div>
    <div id="mathName"></div>
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
      <div class="invalid-feedback">{{errors["description"]}}</div>
    </div>
    <div id="mathDescription"></div>
    <div class="form-group mt-4">
      <label for="field">Field</label>
      <select class="form-control" id="field" name="field" v-model="property.field">
        <option value="REAL_OR_COMPLEX">Real or complex numbers</option>
        <option value="REAL">Real numbers only</option>
        <option value="COMPLEX">Complex numbers only</option>
      </select>
    </div>
  </form>
</template>

<script>
export default {
  name: "AddEditPropertyForm",
  props: {
    property: {
      required: true
    },
    errors: {
      required: true
    }
  },
  data: function() {
    return {
      rendered: false
    };
  },
  methods: {
    inputName: function(event) {
      $("#mathName").text(event.target.value);
      this.render("mathName");
    },
    inputDescription: function(event) {
      $("#mathDescription").text(event.target.value);
      this.render("mathDescription");
    }
  },
  mounted: function() {
    $("#mathName").text(this.property.name);
    $("#mathDescription").text(this.property.description);
    this.$nextTick(() => {
      this.render("mathName");
      this.render("mathDescription");
      this.rendered = true;
    });
  }
};
</script>