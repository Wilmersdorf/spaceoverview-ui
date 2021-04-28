<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/differential-equation'">Differential Equations</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="'/differential-equation/property'">Properties</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link
            v-if="loaded"
            v-show="rendered"
            class="math"
            :to="`/differential-equation/property/${property.id}`"
            >{{ property.name }}</router-link
          >
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Delete</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <DifferentialEquationPropertyInfo :property="property"></DifferentialEquationPropertyInfo>
      <hr />
      <h4 class="mt-2 text-center">Delete property</h4>
      <div class="alert alert-danger mt-4" v-if="errors['general']">{{ errors['general'] }}</div>
      <div class="mt-4 text-center">Do you really want to delete this property?</div>
      <div class="form-group mt-4 text-center">
        <button @click="submitDelete" class="btn btn-danger">Delete property</button>
        <router-link :to="`/differential-equation/property/${id}`" class="btn btn-success ml-4"
          >Cancel</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import DifferentialEquationPropertyInfo from '@/components/DifferentialEquationPropertyInfo.vue'

export default {
  data() {
    return {
      property: null,
      loaded: false,
      rendered: false,
      errors: {}
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  methods: {
    submitDelete() {
      this.$http
        .delete(`/api/differential-equation/property/${this.id}`)
        .then(() => {
          this.$router.push('/differential-equation/property')
        })
        .catch(error => {
          this.errors = error.response.data.errors
        })
    }
  },
  mounted() {
    this.$http.get(`/api/differential-equation/property/${this.id}`).then(response => {
      this.property = response.data
      this.renderMath()
    })
  },
  components: {
    DifferentialEquationPropertyInfo
  }
}
</script>
