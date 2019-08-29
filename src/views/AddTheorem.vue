<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/theorem'">Theorems</router-link>
        </li>
        <li class="breadcrumb-item">Add</li>
      </ol>
    </nav>
    <div v-if="loaded">
      <h1 class="mt-3 text-center">Add theorem</h1>
      <AddEditTheoremForm
        ref="addEditTheoremForm"
        :theorem="theorem"
        :properties="properties"
        :errors="errors"
      ></AddEditTheoremForm>
      <div class="mt-4"></div>
      <AddEditReferences
        @changeReferences="changeReferences"
        :references="references"
        :errors="errors"
      ></AddEditReferences>
      <div class="d-flex justify-content-center">
        <button class="btn btn-primary mt-4 mb-4" @click="submitAdd">Add theorem</button>
      </div>
    </div>
  </div>
</template>

<script>
import AddEditTheoremForm from "@/components/AddEditTheoremForm.vue";
import AddEditReferences from "@/components/AddEditReferences.vue";

export default {
  data: function() {
    return {
      theorem: {},
      properties: null,
      references: [],
      loaded: false,
      errors: {}
    };
  },
  methods: {
    inputName: function(event) {
      $("#mathName").text(event.target.value);
      this.render("mathName");
    },
    submitAdd: function() {
      let form = $("#addEditTheoremForm");
      let json = this.convertFormToJson(form);
      json["conditions"] = this.$refs.addEditTheoremForm.conditions
        .slice(0, this.$refs.addEditTheoremForm.conditionCount)
        .map(it => ({ ...it }));
      json["conclusions"] = this.$refs.addEditTheoremForm.conclusions
        .slice(0, this.$refs.addEditTheoremForm.conclusionCount)
        .map(it => ({ ...it }));
      json["references"] = this.references.map(it => ({ ...it }));
      this.$http
        .post("/api/theorem", json)
        .then(response => {
          let id = response.data.id;
          this.$router.push(`/theorem/${id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    changeReferences: function(references) {
      this.references = references;
    }
  },
  mounted() {
    this.$http
      .get(`/api/property`)
      .then(response => {
        if (response.data.length > 0) {
          this.properties = response.data;
          this.loaded = true;
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    AddEditTheoremForm,
    AddEditReferences
  }
};
</script>
