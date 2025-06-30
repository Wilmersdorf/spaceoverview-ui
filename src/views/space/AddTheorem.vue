<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/space">Spaces</router-link></li>
        <li class="breadcrumb-item"><router-link to="/theorem">Theorems</router-link></li>
        <li class="breadcrumb-item">Add</li>
      </ol>
    </nav>
    <div v-if="loaded">
      <h1 class="mt-3 text-center">Add theorem</h1>
      <AddEditTheoremForm
        ref="addEditTheoremForm"
        :theorem="theorem"
        :properties="properties"
        :errors="errors"
      ></AddEditTheoremForm>
      <AddEditReferences
        class="mt-4"
        :references="references"
        :errors="errors"
        @changeReferences="changeReferences"
      ></AddEditReferences>
      <div class="my-4 d-flex justify-content-center">
        <button class="btn btn-primary" @click="submitAdd">Add theorem</button>
      </div>
    </div>
  </div>
</template>

<script>
import AddEditReferences from '@/components/AddEditReferences.vue'
import AddEditTheoremForm from '@/components/AddEditTheoremForm.vue'

export default {
  components: {
    AddEditReferences,
    AddEditTheoremForm
  },
  data() {
    return {
      theorem: {},
      properties: null,
      references: [],
      loaded: false,
      errors: {}
    }
  },
  async mounted() {
    const response = await fetch(`/api/property`)
    if (response.status === 200) {
      this.properties = await response.json()
      this.renderMath()
    }
  },
  methods: {
    async submitAdd() {
      const json = this.convertFormToJson('addEditTheoremForm')
      json.conditions = this.clone(this.$refs.addEditTheoremForm.conditions)
      json.conclusions = this.clone(this.$refs.addEditTheoremForm.conclusions)
      json.references = this.clone(this.references)
      const response = await this.post('/api/theorem', json)
      if (response.status === 200) {
        const { id } = await response.json()
        this.$router.push(`/theorem/${id}`)
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
