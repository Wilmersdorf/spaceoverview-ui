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
        <li v-if="loaded && link.hasProperty" v-show="rendered" class="breadcrumb-item">
          <router-link :to="`/differential-equation/${differentialEquation.id}`"
            >Has property</router-link
          >
        </li>
        <li v-if="loaded && !link.hasProperty" v-show="rendered" class="breadcrumb-item">
          <router-link :to="`/differential-equation/${differentialEquation.id}`"
            >Lacks property</router-link
          >
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link class="math" :to="`/differential-equation/property/${property.id}`">{{
            property.name
          }}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link
            :to="`/differential-equation/${differentialEquation.id}/property/${property.id}`"
            >Link</router-link
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
      <DifferentialEquationLinkInfo :link="link"></DifferentialEquationLinkInfo>
      <hr />
      <DifferentialEquationPropertyInfo :property="property"></DifferentialEquationPropertyInfo>
      <hr />
      <h4 class="mt-2 text-center">Delete link</h4>
      <div v-if="errors['general']" class="alert alert-danger mt-4">{{ errors['general'] }}</div>
      <div class="mt-4 text-center">Do you really want to delete this link?</div>
      <div class="my-4 d-flex justify-content-center">
        <button class="btn btn-danger" @click="submitDelete">Delete link</button>
        <router-link
          :to="`/differential-equation/${differentialEquation.id}/property/${property.id}`"
          class="btn btn-success ms-4"
          >Cancel</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import DifferentialEquationInfo from '@/components/DifferentialEquationInfo.vue'
import DifferentialEquationLinkInfo from '@/components/DifferentialEquationLinkInfo.vue'
import DifferentialEquationPropertyInfo from '@/components/DifferentialEquationPropertyInfo.vue'

export default {
  components: {
    DifferentialEquationInfo,
    DifferentialEquationLinkInfo,
    DifferentialEquationPropertyInfo
  },
  data() {
    return {
      differentialEquation: null,
      property: null,
      link: null,
      loaded: false,
      rendered: false,
      errors: {}
    }
  },
  computed: {
    differentialEquationId() {
      return this.$route.params.differentialEquationId
    },
    propertyId() {
      return this.$route.params.propertyId
    }
  },
  async mounted() {
    const [linkResponse, differentialEquationResponse, propertyResponse] = await Promise.all([
      fetch(
        `/api/differential-equation/${this.differentialEquationId}/property/${this.propertyId}`
      ),
      fetch(`/api/differential-equation/${this.differentialEquationId}`),
      fetch(`/api/differential-equation/property/${this.propertyId}`)
    ])
    if (
      linkResponse.status === 200 &&
      differentialEquationResponse.status === 200 &&
      propertyResponse.status === 200
    ) {
      this.link = await linkResponse.json()
      this.differentialEquation = await differentialEquationResponse.json()
      this.property = await propertyResponse.json()
      this.renderMath()
    }
  },
  methods: {
    async submitDelete() {
      const response = await this.delete(
        `/api/differential-equation/${this.differentialEquationId}/property/${this.propertyId}`
      )
      if (response.status === 200) {
        this.$router.push(`/differential-equation/${this.differentialEquationId}`)
      } else if (response.status === 400) {
        this.errors = (await response.json()).errors || {}
      }
    }
  }
}
</script>
