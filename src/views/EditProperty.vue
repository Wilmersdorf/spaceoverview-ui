<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/property'">Properties</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link
            :to="`/property/${property.id}`"
            v-if="loaded"
            v-show="rendered"
            id="propertyNameCrumb"
          >{{property.name}}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Edit</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <PropertyInfo :property="property"></PropertyInfo>
      <hr />
      <h4 class="mt-2 text-center">Edit property</h4>
      <AddEditPropertyForm :property="editProperty" :errors="errors"></AddEditPropertyForm>
      <AddEditReferences
        @changeReferences="changeReferences"
        :references="editReferences"
        :errors="errors"
      ></AddEditReferences>
      <div class="d-flex justify-content-center">
        <button @click="submitEdit" class="btn btn-primary mt-4 mb-4">Update property</button>
      </div>
    </div>
  </div>
</template>
<script>
import PropertyInfo from "@/components/PropertyInfo.vue";
import AddEditPropertyForm from "@/components/AddEditPropertyForm.vue";
import AddEditReferences from "@/components/AddEditReferences.vue";

export default {
  data: function() {
    return {
      property: null,
      editProperty: null,
      editReferences: null,
      loaded: false,
      rendered: false,
      errors: {}
    };
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    }
  },
  methods: {
    submitEdit: function() {
      let form = $("#addEditPropertyForm");
      let json = this.convertFormToJson(form);
      json["references"] = this.editReferences.map(it => ({ ...it }));
      this.$http
        .post(`/api/property/${this.id}`, json)
        .then(() => {
          this.$router.push({ path: `/property/${this.id}` });
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
      .get(`/api/property/${this.id}`)
      .then(response => {
        this.property = response.data;
        this.editProperty = { ...response.data };
        this.editReferences = response.data.references.map(it => ({ ...it }));
        this.loaded = true;
        this.$nextTick(() => {
          this.render("propertyNameCrumb");
          this.rendered = true;
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    PropertyInfo,
    AddEditPropertyForm,
    AddEditReferences
  }
};
</script>
