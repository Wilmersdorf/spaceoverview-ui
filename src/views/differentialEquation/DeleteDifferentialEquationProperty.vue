<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/differential-equation">Differential Equations</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/differential-equation/property">Properties</router-link>
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
      <div v-if="errors['general']" class="alert alert-danger mt-4">{{ errors['general'] }}</div>
      <div class="mt-4 text-center">Do you really want to delete this property?</div>
      <div class="my-4 d-flex justify-content-center">
        <button class="btn btn-danger" @click="submitDelete">Delete property</button>
        <router-link :to="`/differential-equation/property/${id}`" class="btn btn-success ms-4"
          >Cancel</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import DifferentialEquationPropertyInfo from '@/components/DifferentialEquationPropertyInfo.vue'

export default {
  components: {
    DifferentialEquationPropertyInfo
  },
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
  async mounted() {
    const response = await fetch(`/api/differential-equation/property/${this.id}`)
    if (response.status === 200) {
      this.property = await response.json()
      this.renderMath()
    }
  },
  methods: {
    async submitDelete() {
      const response = await this.delete(`/api/differential-equation/property/${this.id}`)
      if (response.status === 200) {
        this.$router.push('/differential-equation/property')
      } else if (response.status === 400) {
        this.errors = (await response.json()).errors || {}
      }
    }
  }
}
</script>
