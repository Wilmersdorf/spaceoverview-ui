<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/theorem'">Theorems</router-link>
        </li>
        <li class="breadcrumb-item">
          <span v-if="loaded" v-show="rendered" id="theoremNameCrumb">{{theoremName}}</span>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Edit</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <TheoremInfo :theorem="theorem"></TheoremInfo>
      <hr />
      <h4 class="mt-2 text-center">Edit theorem</h4>
      <AddEditTheoremForm
        ref="addEditTheoremForm"
        :theorem="editTheorem"
        :properties="properties"
        :errors="errors"
      ></AddEditTheoremForm>
      <div class="mt-4"></div>
      <AddEditReferences
        @changeReferences="changeReferences"
        :references="editReferences"
        :errors="errors"
      ></AddEditReferences>
      <div class="d-flex justify-content-center">
        <button class="btn btn-primary mt-4 mb-4" @click="submitEdit">Update theorem</button>
      </div>
    </div>
  </div>
</template>

<script>
import TheoremInfo from "@/components/TheoremInfo.vue";
import AddEditTheoremForm from "@/components/AddEditTheoremForm.vue";
import AddEditReferences from "@/components/AddEditReferences.vue";

export default {
  data: function() {
    return {
      theorem: null,
      editTheorem: null,
      properties: null,
      editReferences: null,
      loaded: false,
      rendered: false,
      errors: {}
    };
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    },
    theoremName: function() {
      if (this.theorem === null || isEmpty(this.theorem.name)) {
        return "Theorem";
      } else {
        return this.theorem.name;
      }
    }
  },
  methods: {
    inputName: function(event) {
      $("#mathName").text(event.target.value);
      this.render("mathName");
    },
    submitEdit: function() {
      let form = $("#addEditTheoremForm");
      let json = this.convertFormToJson(form);
      json["conditions"] = this.$refs.addEditTheoremForm.conditions
        .slice(0, this.$refs.addEditTheoremForm.conditionCount)
        .map(it => ({
          ...it
        }));
      json["conclusions"] = this.$refs.addEditTheoremForm.conclusions
        .slice(0, this.$refs.addEditTheoremForm.conclusionCount)
        .map(it => ({ ...it }));
      json["references"] = this.editReferences.map(it => ({ ...it }));
      this.$http
        .post(`/api/theorem/${this.id}`, json)
        .then(() => {
          this.$router.push(`/theorem/${this.id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    changeReferences: function(references) {
      this.editReferences = references;
    }
  },
  mounted() {
    this.$http
      .get(`/api/theorem/${this.id}`)
      .then(theoremResponse => {
        this.theorem = theoremResponse.data;
        this.editTheorem = { ...theoremResponse.data };
        this.editReferences = theoremResponse.data.references.map(it => ({
          ...it
        }));
        this.$http
          .get(`/api/property`)
          .then(propertyResponse => {
            if (propertyResponse.data.length > 0) {
              this.properties = propertyResponse.data;
              this.loaded = true;
              this.$nextTick(() => {
                this.render("theoremNameCrumb");
                this.rendered = true;
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    TheoremInfo,
    AddEditTheoremForm,
    AddEditReferences
  }
};
</script>
