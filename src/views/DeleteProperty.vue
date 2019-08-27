<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/property'">Properties</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link
            v-if="loaded"
            v-show="rendered"
            :to="`/property/${property.id}`"
            id="propertyNameCrumb"
          >{{property.name}}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Delete</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <PropertyInfo :property="property"></PropertyInfo>
      <hr />
      <h4 class="mt-2 text-center">Delete property</h4>
      <div class="alert alert-danger mt-4" v-if="errors['general']">{{errors["general"]}}</div>
      <div class="mt-4 text-center">Do you really want to delete this property?</div>
      <div class="form-group mt-4 text-center">
        <button @click="submitDelete" class="btn btn-danger">Delete property</button>
        <router-link :to="`/property/${id}`" class="btn btn-success ml-4">Cancel</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import PropertyInfo from "@/components/PropertyInfo.vue";

export default {
  data: function() {
    return {
      property: null,
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
    submitDelete: function() {
      this.$http
        .delete(`/api/property/${this.id}`)
        .then(() => {
          this.$router.push("/property");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  },
  mounted() {
    this.$http
      .get(`/api/property/${this.id}`)
      .then(response => {
        this.property = response.data;
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
    PropertyInfo
  }
};
</script>
