<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/property'">Properties</router-link>
        </li>
        <li class="breadcrumb-item">Add</li>
      </ol>
    </nav>
    <h1 class="mt-3 text-center">Add property</h1>
    <AddEditPropertyForm :property="property" :errors="errors"></AddEditPropertyForm>
    <AddEditReferences
      @changeReferences="changeReferences"
      :references="references"
      :errors="errors"
    ></AddEditReferences>
    <div class="d-flex justify-content-center">
      <button class="btn btn-primary mt-4 mb-4" @click="submitAdd">Add property</button>
    </div>
  </div>
</template>
<script>
import AddEditPropertyForm from "@/components/AddEditPropertyForm.vue";
import AddEditReferences from "@/components/AddEditReferences.vue";

export default {
  data: function() {
    return {
      property: {
        field: "REAL_OR_COMPLEX"
      },
      references: [],
      errors: {}
    };
  },
  methods: {
    submitAdd: function() {
      let form = $("#addEditPropertyForm");
      let json = this.convertFormToJson(form);
      json["references"] = this.references.map(it => ({ ...it }));
      this.$http
        .post("/api/property", json)
        .then(response => {
          let id = response.data.id;
          this.$router.push(`/property/${id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    changeReferences: function(references) {
      this.references = references;
    }
  },
  components: {
    AddEditPropertyForm,
    AddEditReferences
  }
};
</script>
