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
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Add link to property</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <DifferentialEquationInfo
        :differentialEquation="differentialEquation"
      ></DifferentialEquationInfo>
      <hr />
      <h4 class="mt-2 text-center">Add link to property</h4>
      <div class="mt-4 font-weight-bold">
        Please select the property to link to this differential equation
      </div>
      <div class="mt-2" v-if="properties.length === 0">
        All properties that can be linked to this differential equation have already been linked.
      </div>
      <div class="flex-column mt-2" id="properties">
        <div v-for="property in properties" :key="property.id" class="mt-2">
          <router-link :to="`/differential-equation/${id}/property/${property.id}/add`">
            <div class="math">{{ property.name }}</div>
          </router-link>
        </div>
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
  mounted() {
    this.$http.get(`/api/differential-equation/${this.id}`).then(differentialEquationResponse => {
      this.$http
        .get(`/api/differential-equation/${this.id}/property?unlinked=true`)
        .then(propertyResponse => {
          this.differentialEquation = differentialEquationResponse.data
          this.properties = propertyResponse.data.map(it => it.differentialEquationProperty)
          this.renderMath()
        })
    })
  },
  components: {
    DifferentialEquationInfo
  }
}
</script>
