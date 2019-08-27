<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/space'">Spaces</router-link>
        </li>
        <li class="breadcrumb-item">Add</li>
      </ol>
    </nav>
    <h1 class="mt-3 text-center">Add Banach space</h1>
    <AddEditSpaceForm :space="space" :errors="errors"></AddEditSpaceForm>
    <AddEditReferences
      @changeReferences="changeReferences"
      :references="references"
      :errors="errors"
    ></AddEditReferences>
    <div class="d-flex justify-content-center">
      <button class="btn btn-primary mt-4 mb-4" @click="submitAdd">Add space</button>
    </div>
  </div>
</template>
<script>
import AddEditSpaceForm from "@/components/AddEditSpaceForm.vue";
import AddEditReferences from "@/components/AddEditReferences.vue";

export default {
  data: function() {
    return {
      space: {
        field: "REAL_OR_COMPLEX"
      },
      references: [],
      errors: {}
    };
  },
  methods: {
    submitAdd: function() {
      let form = $("#addEditSpaceForm");
      let json = this.convertFormToJson(form);
      json["references"] = this.references.map(it => ({ ...it }));
      this.$http
        .post("/api/space", json)
        .then(response => {
          let id = response.data.id;
          this.$router.push(`/space/${id}`);
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
    AddEditSpaceForm,
    AddEditReferences
  }
};
</script>
