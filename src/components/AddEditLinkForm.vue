<template>
  <form @submit.prevent id="addEditLinkForm">
    <div class="form-group mt-4">
      <label for="field">Field</label>
      <select
        class="form-control"
        id="field"
        name="field"
        v-model="link.field"
        :class="{ 'is-invalid': errors['field'] }"
      >
        <option v-for="option in options" :key="option" :value="option">{{formatFieldLink(option)}}</option>
      </select>
      <div class="invalid-feedback">{{errors["field"]}}</div>
    </div>
  </form>
</template>

<script>
export default {
  name: "AddEditLinkForm",
  props: {
    space: {
      required: true
    },
    property: {
      required: true
    },
    link: {
      required: true
    },
    errors: {
      required: true
    }
  },
  computed: {
    options: function() {
      let space = this.space;
      let property = this.property;
      if (space.field === "REAL") {
        if (property.field === "COMPLEX") {
          return [];
        } else {
          return ["REAL", "NOT_REAL"];
        }
      } else if (space.field === "COMPLEX") {
        if (property.field === "REAL") {
          return [];
        } else {
          return ["COMPLEX", "NOT_COMPLEX"];
        }
      } else {
        if (property.field === "REAL") {
          return ["REAL", "NOT_REAL"];
        } else if (property.field === "COMPLEX") {
          return ["COMPLEX", "NOT_COMPLEX"];
        } else {
          return [
            "REAL",
            "COMPLEX",
            "REAL_AND_COMPLEX",
            "NOT_REAL",
            "NOT_COMPLEX",
            "NOT_REAL_AND_NOT_COMPLEX",
            "REAL_AND_NOT_COMPLEX",
            "NOT_REAL_AND_COMPLEX"
          ];
        }
      }
    }
  }
};
</script>