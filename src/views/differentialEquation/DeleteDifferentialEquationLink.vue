<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/differential-equation'">Differential Equations</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link class="math" :to="`/differential-equation/${differentialEquation.id}`">{{
            differentialEquation.name
          }}</router-link>
        </li>
        <li v-if="loaded && link.hasProperty" v-show="rendered" class="breadcrumb-item">
          <router-link :to="`/differential-equation/${differentialEquation.id}#hasProperty`"
            >Has Property</router-link
          >
        </li>
        <li v-if="loaded && !link.hasProperty" v-show="rendered" class="breadcrumb-item">
          <router-link :to="`/differential-equation/${differentialEquation.id}#lacksProperty`"
            >Lacks Property</router-link
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
      <h5 v-if="link.hasProperty" class="text-center">has property</h5>
      <h5 v-if="!link.hasProperty" class="text-center">lacks property</h5>
      <References :references="link.references"></References>
      <hr />
      <DifferentialEquationPropertyInfo :property="property"></DifferentialEquationPropertyInfo>
      <hr />
      <h4 class="mt-2 text-center">Delete link</h4>
      <div class="alert alert-danger mt-4" v-if="errors['general']">{{ errors['general'] }}</div>
      <div class="mt-4 text-center">Do you really want to delete this link?</div>
      <div class="form-group mt-4 text-center">
        <button @click="submitDelete" class="btn btn-danger">Delete link</button>
        <router-link
          :to="`/differential-equation/${differentialEquation.id}/property/${property.id}`"
          class="btn btn-success ml-4"
          >Cancel</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import DifferentialEquationInfo from '@/components/DifferentialEquationInfo.vue'
import DifferentialEquationPropertyInfo from '@/components/DifferentialEquationPropertyInfo.vue'
import References from '@/components/References.vue'

export default {
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
  methods: {
    submitDelete() {
      this.$http
        .delete(
          `/api/differential-equation/${this.differentialEquationId}/property/${this.propertyId}`
        )
        .then(() => {
          this.$router.push(`/differential-equation/${this.differentialEquationId}`)
        })
        .catch(error => {
          this.errors = error.response.data.errors
        })
    }
  },
  mounted() {
    this.$http
      .get(`/api/differential-equation/${this.differentialEquationId}/property/${this.propertyId}`)
      .then(linkResponse => {
        this.editLink = this.clone(linkResponse.data)
        this.editReferences = this.clone(linkResponse.data.references)
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
    DifferentialEquationPropertyInfo,
    References
  }
}
</script>
