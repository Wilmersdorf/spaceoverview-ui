<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/theorem'">Theorems</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link
            v-if="loaded"
            v-show="rendered"
            id="theoremNameCrumb"
            :to="`/theorem/${id}`"
          >{{theoremName}}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Delete</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <TheoremInfo :theorem="theorem"></TheoremInfo>
      <hr />
      <h4 class="mt-2 text-center">Delete theorem</h4>
      <div class="alert alert-danger mt-4" v-if="errors['general']">{{errors["general"]}}</div>
      <div class="mt-4 text-center">Do you really want to delete this theorem?</div>
      <div class="form-group mt-4 text-center">
        <button @click="submitDelete" class="btn btn-danger">Delete theorem</button>
        <router-link :to="`/theorem/${id}`" class="btn btn-success ml-4">Cancel</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import TheoremInfo from "@/components/TheoremInfo.vue";

export default {
  data: function() {
    return {
      theorem: null,
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
    submitDelete: function() {
      this.$http
        .delete(`/api/theorem/${this.id}`)
        .then(() => {
          this.$router.push("/theorem");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  },
  mounted() {
    this.$http
      .get(`/api/theorem/${this.id}`)
      .then(response => {
        this.theorem = response.data;
        this.loaded = true;
        this.$nextTick(() => {
          this.render("theoremNameCrumb");
          this.rendered = true;
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    TheoremInfo
  }
};
</script>
