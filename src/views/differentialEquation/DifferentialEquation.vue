<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/differential-equation'">Differential Equations</router-link>
        </li>
        <li class="breadcrumb-item">
          <span v-if="loaded" v-show="rendered" class="math">{{ differentialEquation.name }}</span>
        </li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <DifferentialEquationInfo
        :differentialEquation="differentialEquation"
      ></DifferentialEquationInfo>
      <hr />
      <div class="font-weight-bold mt-2" v-if="hasProperties.length === 1" id="hasProperty">
        Has property:
      </div>
      <div class="font-weight-bold mt-2" v-if="hasProperties.length > 1" id="hasProperty">
        Has properties:
      </div>
      <div class="mt-2" v-for="property in hasProperties" :key="property.id">
        <router-link
          class="math"
          :id="`${property.id}`"
          :to="`/differential-equation/${differentialEquation.id}/property/${property.id}`"
          >{{ property.name }}</router-link
        >
      </div>
      <div class="font-weight-bold mt-2" v-if="lacksProperties.length === 1" id="lacksProperty">
        Lacks property:
      </div>
      <div class="font-weight-bold mt-2" v-if="lacksProperties.length > 1" id="lacksProperty">
        Lacks properties:
      </div>
      <div class="mt-2" v-for="property in lacksProperties" :key="property.id">
        <router-link
          class="math"
          :id="`${property.id}`"
          :to="`/differential-equation/${differentialEquation.id}/property/${property.id}`"
          >{{ property.name }}</router-link
        >
      </div>
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link :to="`/differential-equation/${differentialEquation.id}/property/add`"
          >Add link to property</router-link
        >&nbsp;|
        <router-link :to="`/differential-equation/${differentialEquation.id}/edit`"
          >Edit</router-link
        >&nbsp;|
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
  mounted() {
    this.$http.get(`/api/differential-equation/${this.id}`).then(differentialEquationResponse => {
      this.differentialEquation = differentialEquationResponse.data
      this.$http.get(`/api/differential-equation/${this.id}/property`).then(propertyResponse => {
        this.properties = propertyResponse.data
        this.renderMath()
      })
    })
  },
  components: {
    DifferentialEquationInfo
  }
}
</script>
