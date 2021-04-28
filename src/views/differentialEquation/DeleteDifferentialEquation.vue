<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/differential-equation'">Differential Equations</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link
            v-if="loaded"
            v-show="rendered"
            class="math"
            :to="`/differential-equation/${differentialEquation.id}`"
            >{{ differentialEquation.name }}</router-link
          >
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Delete</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <DifferentialEquationInfo
        :differentialEquation="differentialEquation"
      ></DifferentialEquationInfo>
      <hr />
      <h4 class="mt-2 text-center">Delete differential equation</h4>
      <div class="alert alert-danger mt-4" v-if="errors['general']">{{ errors['general'] }}</div>
      <div class="mt-4 text-center">Do you really want to delete this differential equation?</div>
      <div class="form-group mt-4 text-center">
        <button @click="submitDelete" class="btn btn-danger">Delete differential equation</button>
        <router-link :to="`/differential-equation/${id}`" class="btn btn-success ml-4"
          >Cancel</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import DifferentialEquationInfo from '@/components/DifferentialEquationInfo.vue'

export default {
  data() {
    return {
      differentialEquation: null,
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
        .delete(`/api/differential-equation/${this.id}`)
        .then(() => {
          this.$router.push('/differential-equation')
        })
        .catch(error => {
          this.errors = error.response.data.errors
        })
    }
  },
  mounted() {
    this.$http.get(`/api/differential-equation/${this.id}`).then(response => {
      this.differentialEquation = response.data
      this.renderMath()
    })
  },
  components: {
    DifferentialEquationInfo
  }
}
</script>
