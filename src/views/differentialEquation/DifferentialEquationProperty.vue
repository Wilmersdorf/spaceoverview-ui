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
        <li class="breadcrumb-item d-flex">
          <div v-if="loaded" v-show="rendered" class="math">{{ property.name }}</div>
        </li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <DifferentialEquationPropertyInfo :property="property"></DifferentialEquationPropertyInfo>
      <hr />
      <div v-if="hasProperty.length === 1" class="fw-bold mt-2">Has property:</div>
      <div v-if="hasProperty.length > 1" class="fw-bold mt-2">Have property:</div>
      <div v-for="differentialEquation in hasProperty" :key="differentialEquation.id" class="mt-2">
        <router-link
          class="math"
          :to="`/differential-equation/property/${property.id}/differential-equation/${differentialEquation.id}`"
          >{{ differentialEquation.name }}</router-link
        >
      </div>
      <div v-if="lacksProperty.length === 1" class="fw-bold mt-2">Lacks property:</div>
      <div v-if="lacksProperty.length > 1" class="fw-bold mt-2">Lack property:</div>
      <div
        v-for="differentialEquation in lacksProperty"
        :key="differentialEquation.id"
        class="mt-2"
      >
        <router-link
          :to="`/differential-equation/property/${property.id}/differential-equation/${differentialEquation.id}`"
          class="math"
          >{{ differentialEquation.name }}</router-link
        >
      </div>
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link :to="`/differential-equation/property/${property.id}/edit`">Edit</router-link>
        <div class="mx-1">|</div>
        <router-link :to="`/differential-equation/property/${property.id}/delete`"
          >Delete</router-link
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
      differentialEquations: [],
      loaded: false,
      rendered: false
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    hasProperty() {
      return this.differentialEquations
        .filter(it => it.hasProperty)
        .map(it => it.differentialEquation)
    },
    lacksProperty() {
      return this.differentialEquations
        .filter(it => !it.hasProperty)
        .map(it => it.differentialEquation)
    }
  },
  async mounted() {
    const [propertyResponse, differentialEquationResponse] = await Promise.all([
      fetch(`/api/differential-equation/property/${this.id}`),
      fetch(`/api/differential-equation/property/${this.id}/differential-equation`)
    ])
    if (propertyResponse.status === 200 && differentialEquationResponse.status === 200) {
      this.property = await propertyResponse.json()
      this.differentialEquations = await differentialEquationResponse.json()
      this.renderMath()
    }
  }
}
</script>
