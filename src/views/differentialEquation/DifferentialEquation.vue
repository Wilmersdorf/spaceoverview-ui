<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/differential-equation">Differential Equations</router-link>
        </li>
        <li class="breadcrumb-item d-flex">
          <div v-if="loaded" v-show="rendered" class="math">{{ differentialEquation.name }}</div>
        </li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <DifferentialEquationInfo
        :differentialEquation="differentialEquation"
      ></DifferentialEquationInfo>
      <hr />
      <div v-if="hasProperties.length === 1" class="fw-bold mt-2">Has property:</div>
      <div v-if="hasProperties.length > 1" class="fw-bold mt-2">Has properties:</div>
      <div v-for="property in hasProperties" :key="property.id" class="mt-2">
        <router-link
          :to="`/differential-equation/${differentialEquation.id}/property/${property.id}`"
          class="math"
          >{{ property.name }}</router-link
        >
      </div>
      <div v-if="lacksProperties.length === 1" class="fw-bold mt-2">Lacks property:</div>
      <div v-if="lacksProperties.length > 1" class="fw-bold mt-2">Lacks properties:</div>
      <div v-for="property in lacksProperties" :key="property.id" class="mt-2">
        <router-link
          :to="`/differential-equation/${differentialEquation.id}/property/${property.id}`"
          class="math"
          >{{ property.name }}</router-link
        >
      </div>
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link :to="`/differential-equation/${differentialEquation.id}/property/add`"
          >Add link to property</router-link
        >
        <div class="mx-1">|</div>
        <router-link :to="`/differential-equation/${differentialEquation.id}/edit`"
          >Edit</router-link
        >
        <div class="mx-1">|</div>
        <router-link :to="`/differential-equation/${differentialEquation.id}/delete`"
          >Delete</router-link
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
      properties: [],
      loaded: false,
      rendered: false
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    hasProperties() {
      return this.properties.filter(it => it.hasProperty).map(it => it.differentialEquationProperty)
    },
    lacksProperties() {
      return this.properties
        .filter(it => !it.hasProperty)
        .map(it => it.differentialEquationProperty)
    }
  },
  async mounted() {
    const [differentialEquationResponse, propertyResponse] = await Promise.all([
      fetch(`/api/differential-equation/${this.id}`),
      fetch(`/api/differential-equation/${this.id}/property`)
    ])
    if (differentialEquationResponse.status === 200 && propertyResponse.status === 200) {
      this.differentialEquation = await differentialEquationResponse.json()
      this.properties = await propertyResponse.json()
      this.renderMath()
    }
  }
}
</script>
