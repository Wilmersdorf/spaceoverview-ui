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
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Add link to property</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <DifferentialEquationInfo
        :differentialEquation="differentialEquation"
      ></DifferentialEquationInfo>
      <hr />
      <h4 class="mt-2 text-center">Add link to property</h4>
      <div class="mt-4 fw-bold">
        Please select the property to link to this differential equation
      </div>
      <div v-if="properties.length === 0" class="mt-2">
        All properties that can be linked to this differential equation have already been linked.
      </div>
      <div class="flex-column">
        <div v-for="property in properties" :key="property.id" class="mt-2">
          <router-link
            :to="`/differential-equation/${id}/property/${property.id}/add`"
            class="math"
          >
            {{ property.name }}
          </router-link>
        </div>
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
      properties: null,
      loaded: false,
      rendered: false
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  async mounted() {
    const [differentialEquationResponse, propertyResponse] = await Promise.all([
      fetch(`/api/differential-equation/${this.id}`),
      fetch(`/api/differential-equation/${this.id}/property?unlinked=true`)
    ])
    if (differentialEquationResponse.status === 200 && propertyResponse.status === 200) {
      this.differentialEquation = await differentialEquationResponse.json()
      this.properties = (await propertyResponse.json()).map(it => it.differentialEquationProperty)
      this.renderMath()
    }
  }
}
</script>
