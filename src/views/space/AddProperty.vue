<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/space">Spaces</router-link></li>
        <li class="breadcrumb-item"><router-link to="/property">Properties</router-link></li>
        <li class="breadcrumb-item">Add</li>
      </ol>
    </nav>
    <h1 class="mt-3 text-center">Add property</h1>
    <AddEditPropertyForm :property="property" :errors="errors"></AddEditPropertyForm>
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
import AddEditPropertyForm from '@/components/AddEditPropertyForm.vue'
import AddEditReferences from '@/components/AddEditReferences.vue'

export default {
  components: {
    AddEditPropertyForm,
    AddEditReferences
  },
  data() {
    return {
      property: {
        field: 'REAL_OR_COMPLEX'
      },
      references: [],
      errors: {}
    }
  },
  methods: {
    async submitAdd() {
      const json = this.convertFormToJson('addEditPropertyForm')
      json.references = this.clone(this.references)
      const response = await this.post('/api/property', json)
      if (response.status === 200) {
        const { id } = await response.json()
        this.$router.push(`/property/${id}`)
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
