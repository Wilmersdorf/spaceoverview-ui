<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/differential-equation">Differential Equations</router-link>
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
      :references="references"
      :errors="errors"
      @changeReferences="changeReferences"
    ></AddEditReferences>
    <div class="my-4 d-flex justify-content-center">
      <button class="btn btn-primary" @click="submitAdd">Add differential equation</button>
    </div>
  </div>
</template>
<script>
import AddEditDifferentialEquationForm from '@/components/AddEditDifferentialEquationForm.vue'
import AddEditReferences from '@/components/AddEditReferences.vue'

export default {
  components: {
    AddEditDifferentialEquationForm,
    AddEditReferences
  },
  data() {
    return {
      differentialEquation: {},
      references: [],
      errors: {}
    }
  },
  methods: {
    async submitAdd() {
      const json = this.convertFormToJson('addEditDifferentialEquationForm')
      json.references = this.clone(this.references)
      const response = await this.post('/api/differential-equation', json)
      if (response.status === 200) {
        const { id } = await response.json()
        this.$router.push(`/differential-equation/${id}`)
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
