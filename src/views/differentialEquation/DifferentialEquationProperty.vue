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
          <span v-if="loaded" v-show="rendered" class="math">{{ property.name }}</span>
        </li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <DifferentialEquationPropertyInfo :property="property"></DifferentialEquationPropertyInfo>
      <hr />
      <div class="font-weight-bold mt-2" v-if="hasProperty.length === 1" id="hasProperty">
        Has property:
      </div>
      <div class="font-weight-bold mt-2" v-if="hasProperty.length > 1" id="hasProperty">
        Have property:
      </div>
      <div class="mt-2" v-for="differentialEquation in hasProperty" :key="differentialEquation.id">
        <router-link
          class="math"
          :to="
            `/differential-equation/property/${property.id}/differential-equation/${differentialEquation.id}`
          "
          >{{ differentialEquation.name }}</router-link
        >
      </div>
      <div class="font-weight-bold mt-2" v-if="lacksProperty.length === 1" id="lacksProperty">
        Lacks property:
      </div>
      <div class="font-weight-bold mt-2" v-if="lacksProperty.length > 1" id="lacksProperty">
        Lack property:
      </div>
      <div
        class="mt-2"
        v-for="differentialEquation in lacksProperty"
        :key="differentialEquation.id"
      >
        <router-link
          class="math"
          :to="
            `/differential-equation/property/${property.id}/differential-equation/${differentialEquation.id}`
          "
          >{{ differentialEquation.name }}</router-link
        >
      </div>
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link :to="`/differential-equation/property/${property.id}/edit`">Edit</router-link
        >&nbsp;|
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
  mounted() {
    this.$http.get(`/api/differential-equation/property/${this.id}`).then(propertyResponse => {
      this.property = propertyResponse.data
      this.$http
        .get(`/api/differential-equation/property/${this.id}/differential-equation`)
        .then(differentialEquationResponse => {
          this.differentialEquations = differentialEquationResponse.data
          this.renderMath()
        })
    })
  },
  components: {
    DifferentialEquationPropertyInfo
  }
}
</script>
