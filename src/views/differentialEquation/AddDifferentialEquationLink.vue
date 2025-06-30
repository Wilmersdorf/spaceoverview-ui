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
      <div>
        Please select if the property applies or doesn't apply. The below selection must apply for
        all parameters of the differential equation.
      </div>
      <AddEditDifferentialEquationLinkForm
        :link="link"
        :errors="errors"
      ></AddEditDifferentialEquationLinkForm>
      <AddEditReferences
        class="mt-4"
        :references="references"
        :errors="errors"
        @changeReferences="changeReferences"
      ></AddEditReferences>
      <div class="my-4 d-flex justify-content-center">
        <button class="btn btn-primary" @click="submitAdd">Add link</button>
      </div>
    </div>
  </div>
</template>
<script>
import AddEditDifferentialEquationLinkForm from '@/components/AddEditDifferentialEquationLinkForm.vue'
import AddEditReferences from '@/components/AddEditReferences.vue'
import DifferentialEquationInfo from '@/components/DifferentialEquationInfo.vue'
import DifferentialEquationPropertyInfo from '@/components/DifferentialEquationPropertyInfo.vue'

export default {
  components: {
    AddEditDifferentialEquationLinkForm,
    AddEditReferences,
    DifferentialEquationInfo,
    DifferentialEquationPropertyInfo
  },
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
  async mounted() {
    const [differentialEquationResponse, propertyResponse] = await Promise.all([
      fetch(`/api/differential-equation/${this.differentialEquationId}`),
      fetch(`/api/differential-equation/property/${this.propertyId}`)
    ])
    if (differentialEquationResponse.status === 200 && propertyResponse.status === 200) {
      this.differentialEquation = await differentialEquationResponse.json()
      this.property = await propertyResponse.json()
      this.renderMath()
    }
  },
  methods: {
    async submitAdd() {
      const json = this.convertFormToJson('addEditLinkForm')
      json.references = this.clone(this.references)
      const response = await this.post(
        `/api/differential-equation/${this.differentialEquationId}/property/${this.propertyId}`,
        json
      )
      if (response.status === 200) {
        this.$router.push(
          `/differential-equation/${this.differentialEquationId}/property/${this.propertyId}`
        )
      } else if (response.status === 400) {
        this.errors = (await response.json()).errors || {}
      }
    },
    changeReferences(references) {
      this.references = references
    }
  }
}
</script>
