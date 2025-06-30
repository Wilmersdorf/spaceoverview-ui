<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/differential-equation">Differential Equations</router-link>
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
      <div v-if="errors['general']" class="alert alert-danger mt-4">{{ errors['general'] }}</div>
      <div class="mt-4 text-center">Do you really want to delete this differential equation?</div>
      <div class="my-4 d-flex justify-content-center">
        <button class="btn btn-danger" @click="submitDelete">Delete differential equation</button>
        <router-link :to="`/differential-equation/${id}`" class="btn btn-success ms-4"
          >Cancel</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import DifferentialEquationInfo from '@/components/DifferentialEquationInfo.vue'

export default {
  components: {
    DifferentialEquationInfo
  },
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
  async mounted() {
    const response = await fetch(`/api/differential-equation/${this.id}`)
    if (response.status === 200) {
      this.differentialEquation = await response.json()
      this.renderMath()
    }
  },
  methods: {
    async submitDelete() {
      const response = await this.delete(`/api/differential-equation/${this.id}`)
      if (response.status === 200) {
        this.$router.push('/differential-equation')
      } else if (response.status === 400) {
        this.errors = (await response.json()).errors || {}
      }
    }
  }
}
</script>
