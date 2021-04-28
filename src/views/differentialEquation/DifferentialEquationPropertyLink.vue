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
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link class="math" :to="`/differential-equation/property/${property.id}`">{{
            property.name
          }}</router-link>
        </li>
        <li v-if="loaded && link.hasProperty" v-show="rendered" class="breadcrumb-item">
          <router-link :to="`/differential-equation/property/${property.id}#hasProperty`"
            >Has Property</router-link
          >
        </li>
        <li v-if="loaded && !link.hasProperty" v-show="rendered" class="breadcrumb-item">
          <router-link :to="`/differential-equation/property/${property.id}#lacksProperty`"
            >Lacks Property</router-link
          >
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link class="math" :to="`/differential-equation/${differentialEquation.id}`">{{
            differentialEquation.name
          }}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Link</li>
        <li class="ml-auto">
          <router-link
            :to="`/differential-equation/${differentialEquationId}/property/${propertyId}`"
          >
            <i class="pointer" data-feather="refresh-cw" width="16" height="16" color="black"></i>
          </router-link>
        </li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <DifferentialEquationPropertyInfo :property="property"></DifferentialEquationPropertyInfo>
      <hr />
      <DifferentialEquationLinkInfo :link="link"></DifferentialEquationLinkInfo>
      <hr />
      <DifferentialEquationInfo
        :differentialEquation="differentialEquation"
      ></DifferentialEquationInfo>
      <hr />
    </div>
  </div>
</template>
<script>
import DifferentialEquationInfo from '@/components/DifferentialEquationInfo.vue'
import DifferentialEquationLinkInfo from '@/components/DifferentialEquationLinkInfo.vue'
import DifferentialEquationPropertyInfo from '@/components/DifferentialEquationPropertyInfo.vue'

export default {
  data() {
    return {
      differentialEquation: null,
      property: null,
      link: null,
      loaded: false,
      rendered: false
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
  mounted() {
    this.$feather.replace()
    this.$http
      .get(`/api/differential-equation/${this.differentialEquationId}/property/${this.propertyId}`)
      .then(linkResponse => {
        this.link = linkResponse.data
        this.$http
          .get(`/api/differential-equation/${this.differentialEquationId}`)
          .then(differentialEquationResponse => {
            this.differentialEquation = differentialEquationResponse.data
            this.$http
              .get(`/api/differential-equation/property/${this.propertyId}`)
              .then(propertyResponse => {
                this.property = propertyResponse.data
                this.renderMath()
              })
          })
      })
  },
  components: {
    DifferentialEquationInfo,
    DifferentialEquationLinkInfo,
    DifferentialEquationPropertyInfo
  }
}
</script>
