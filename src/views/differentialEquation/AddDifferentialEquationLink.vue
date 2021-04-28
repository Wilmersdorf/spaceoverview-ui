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
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link :to="`/differential-equation/${differentialEquation.id}/property/add`"
            >Add link to property</router-link
          >
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link class="math" :to="`/differential-equation/property/${property.id}`">{{
            property.name
          }}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Select link type</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <DifferentialEquationInfo
        :differentialEquation="differentialEquation"
      ></DifferentialEquationInfo>
      <hr />
      <DifferentialEquationPropertyInfo :property="property"></DifferentialEquationPropertyInfo>
      <hr />
      <h4 class="mt-2 text-center">Select link type</h4>
      <div class="d-inline">Please select if the property applies or doesn't apply.&nbsp;</div>
      <div class="d-inline">
        The below selection must apply for all parameters of the differential equation.
      </div>
      <AddEditDifferentialEquationLinkForm
        :link="link"
        :errors="errors"
      ></AddEditDifferentialEquationLinkForm>
      <AddEditReferences
        class="mt-4"
        @changeReferences="changeReferences"
        :references="references"
        :errors="errors"
      ></AddEditReferences>
      <div class="d-flex justify-content-center">
        <button @click="submitAdd" class="btn btn-primary mt-4 mb-4">Add link</button>
      </div>
    </div>
  </div>
</template>
<script>
import DifferentialEquationInfo from '@/components/DifferentialEquationInfo.vue'
import DifferentialEquationPropertyInfo from '@/components/DifferentialEquationPropertyInfo.vue'
import AddEditDifferentialEquationLinkForm from '@/components/AddEditDifferentialEquationLinkForm.vue'
import AddEditReferences from '@/components/AddEditReferences.vue'

export default {
  data() {
    return {
      differentialEquation: null,
      property: null,
      link: { hasProperty: true },
      references: [],
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
    submitAdd() {
      const json = this.convertFormToJson('addEditLinkForm')
      json.references = this.clone(this.references)
      this.$http
        .post(
          `/api/differential-equation/${this.differentialEquationId}/property/${this.propertyId}`,
          json
        )
        .then(() => {
          this.$router
            .push(
              `/differential-equation/${this.differentialEquationId}/property/${this.propertyId}`
            )
            .catch(error => {
              this.errors = error.response.data.errors
            })
        })
    },
    changeReferences(references) {
      this.references = references
    }
  },
  mounted() {
    this.$http
      .get(`/api/differential-equation/${this.differentialEquationId}`)
      .then(differentialEquationResponse => {
        this.$http
          .get(`/api/differential-equation/property/${this.propertyId}`)
          .then(propertyResponse => {
            this.differentialEquation = differentialEquationResponse.data
            this.property = propertyResponse.data
            this.renderMath()
          })
      })
  },
  components: {
    DifferentialEquationInfo,
    DifferentialEquationPropertyInfo,
    AddEditDifferentialEquationLinkForm,
    AddEditReferences
  }
}
</script>
