<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/differential-equation">Differential Equations</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/differential-equation/property">Properties</router-link>
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
      :references="references"
      :errors="errors"
      @changeReferences="changeReferences"
    ></AddEditReferences>
    <div class="my-4 d-flex justify-content-center">
      <button class="btn btn-primary" @click="submitAdd">Add property</button>
    </div>
  </div>
</template>
<script>
import AddEditDifferentialEquationPropertyForm from '@/components/AddEditDifferentialEquationPropertyForm.vue'
import AddEditReferences from '@/components/AddEditReferences.vue'

export default {
  components: {
    AddEditDifferentialEquationPropertyForm,
    AddEditReferences
  },
  data() {
    return {
      property: {},
      references: [],
      errors: {}
    }
  },
  methods: {
    async submitAdd() {
      const json = this.convertFormToJson('addEditDifferentialEquationPropertyForm')
      json.references = this.clone(this.references)
      const response = await this.post('/api/differential-equation/property', json)
      if (response.status === 200) {
        const { id } = await response.json()
        this.$router.push(`/differential-equation/property/${id}`)
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
