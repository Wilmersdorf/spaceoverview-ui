<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/space">Spaces</router-link></li>
        <li class="breadcrumb-item">Add</li>
      </ol>
    </nav>
    <h1 class="mt-3 text-center">Add Banach space</h1>
    <AddEditSpaceForm :space="space" :errors="errors"></AddEditSpaceForm>
    <AddEditReferences
      class="mt-4"
      :references="references"
      :errors="errors"
      @changeReferences="changeReferences"
    ></AddEditReferences>
    <div class="my-4 d-flex justify-content-center">
      <button class="btn btn-primary" @click="submitAdd">Add space</button>
    </div>
  </div>
</template>
<script>
import AddEditReferences from '@/components/AddEditReferences.vue'
import AddEditSpaceForm from '@/components/AddEditSpaceForm.vue'

export default {
  components: {
    AddEditReferences,
    AddEditSpaceForm
  },
  data() {
    return {
      space: {
        field: 'REAL_OR_COMPLEX'
      },
      references: [],
      errors: {}
    }
  },
  methods: {
    async submitAdd() {
      const json = this.convertFormToJson('addEditSpaceForm')
      json.references = this.clone(this.references)
      const response = await this.post('/api/space', json)
      if (response.status === 200) {
        const { id } = await response.json()
        this.$router.push(`/space/${id}`)
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
