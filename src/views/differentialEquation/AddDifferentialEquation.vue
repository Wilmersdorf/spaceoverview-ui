<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/differential-equation'">Differential Equations</router-link>
        </li>
        <li class="breadcrumb-item">Add</li>
      </ol>
    </nav>
    <h1 class="mt-3 text-center">Add differential equation</h1>
    <AddEditDifferentialEquationForm
      :differentialEquation="differentialEquation"
      :errors="errors"
    ></AddEditDifferentialEquationForm>
    <AddEditReferences
      class="mt-4"
      @changeReferences="changeReferences"
      :references="references"
      :errors="errors"
    ></AddEditReferences>
    <div class="d-flex justify-content-center">
      <button class="btn btn-primary mt-4 mb-4" @click="submitAdd">
        Add differential equation
      </button>
    </div>
  </div>
</template>
<script>
import AddEditDifferentialEquationForm from '@/components/AddEditDifferentialEquationForm.vue'
import AddEditReferences from '@/components/AddEditReferences.vue'

export default {
  data() {
    return {
      differentialEquation: {},
      references: [],
      errors: {}
    }
  },
  methods: {
    submitAdd() {
      const json = this.convertFormToJson('addEditDifferentialEquationForm')
      json.references = this.clone(this.references)
      this.$http
        .post('/api/differential-equation', json)
        .then(response => {
          const { id } = response.data
          this.$router.push(`/differential-equation/${id}`)
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
    AddEditDifferentialEquationForm,
    AddEditReferences
  }
}
</script>
