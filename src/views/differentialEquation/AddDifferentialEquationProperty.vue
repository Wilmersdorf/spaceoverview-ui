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
        <li class="breadcrumb-item">Add</li>
      </ol>
    </nav>
    <h1 class="mt-3 text-center">Add property</h1>
    <AddEditDifferentialEquationPropertyForm
      :property="property"
      :errors="errors"
    ></AddEditDifferentialEquationPropertyForm>
    <AddEditReferences
      class="mt-4"
      @changeReferences="changeReferences"
      :references="references"
      :errors="errors"
    ></AddEditReferences>
    <div class="d-flex justify-content-center">
      <button class="btn btn-primary mt-4 mb-4" @click="submitAdd">Add property</button>
    </div>
  </div>
</template>
<script>
import AddEditDifferentialEquationPropertyForm from '@/components/AddEditDifferentialEquationPropertyForm.vue'
import AddEditReferences from '@/components/AddEditReferences.vue'

export default {
  data() {
    return {
      property: {},
      references: [],
      errors: {}
    }
  },
  methods: {
    submitAdd() {
      const json = this.convertFormToJson('addEditDifferentialEquationPropertyForm')
      json.references = this.clone(this.references)
      this.$http
        .post('/api/differential-equation/property', json)
        .then(response => {
          const { id } = response.data
          this.$router.push(`/differential-equation/property/${id}`)
        })
        .catch(error => {
          this.errors = error.response.data.errors
        })
    },
    changeReferences(references) {
      this.references = references
    }
  },
  components: {
    AddEditDifferentialEquationPropertyForm,
    AddEditReferences
  }
}
</script>
