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
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Edit</li>
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
      <h4 class="mt-2 text-center">Select link type</h4>
      <div class="d-inline">Please select if the property applies or doesn't apply.&nbsp;</div>
      <div class="d-inline">
        The below selection must apply for all parameters of the differential equation.
      </div>
      <AddEditDifferentialEquationLinkForm
        :link="editLink"
        :errors="errors"
      ></AddEditDifferentialEquationLinkForm>
      <AddEditReferences
        class="mt-4"
        @changeReferences="changeReferences"
        :references="editReferences"
        :errors="errors"
      ></AddEditReferences>
      <div class="d-flex justify-content-center">
        <button @click="submitEdit" class="btn btn-primary mt-4 mb-4">Update link</button>
      </div>
    </div>
  </div>
</template>
<script>
import DifferentialEquationInfo from '@/components/DifferentialEquationInfo.vue'
import DifferentialEquationPropertyInfo from '@/components/DifferentialEquationPropertyInfo.vue'
import DifferentialEquationLinkInfo from '@/components/DifferentialEquationLinkInfo.vue'
import AddEditDifferentialEquationLinkForm from '@/components/AddEditDifferentialEquationLinkForm.vue'
import AddEditReferences from '@/components/AddEditReferences.vue'

export default {
  data() {
    return {
      differentialEquation: null,
      property: null,
      link: null,
      editLink: null,
      editReferences: null,
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
    submitEdit() {
      const json = this.convertFormToJson('addEditLinkForm')
      json.references = this.clone(this.editReferences)
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
      this.editReferences = references
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
    DifferentialEquationLinkInfo,
    AddEditDifferentialEquationLinkForm,
    AddEditReferences
  }
}
</script>
