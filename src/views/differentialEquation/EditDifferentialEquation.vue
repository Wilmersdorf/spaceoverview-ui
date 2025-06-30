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
            :to="`/differential-equation/${differentialEquation.id}`"
            class="math"
            >{{ differentialEquation.name }}</router-link
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
      <h4 class="mt-2 text-center">Edit differential equation</h4>
      <AddEditDifferentialEquationForm
        :differentialEquation="differentialEquation"
        :errors="errors"
      ></AddEditDifferentialEquationForm>
      <AddEditReferences
        class="mt-4"
        :references="editReferences"
        :errors="errors"
        @changeReferences="changeReferences"
      ></AddEditReferences>
      <div class="my-4 d-flex justify-content-center">
        <button class="btn btn-primary" @click="submitEdit">Update differential equation</button>
      </div>
    </div>
  </div>
</template>
<script>
import AddEditDifferentialEquationForm from '@/components/AddEditDifferentialEquationForm.vue'
import AddEditReferences from '@/components/AddEditReferences.vue'
import DifferentialEquationInfo from '@/components/DifferentialEquationInfo.vue'

export default {
  components: {
    AddEditDifferentialEquationForm,
    AddEditReferences,
    DifferentialEquationInfo
  },
  data() {
    return {
      differentialEquation: null,
      editReferences: null,
      loaded: false,
      rendered: false,
      errors: {}
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  async mounted() {
    const response = await fetch(`/api/differential-equation/${this.id}`)
    if (response.status === 200) {
      this.differentialEquation = await response.json()
      this.editReferences = this.clone(this.differentialEquation.references)
      this.renderMath()
    }
  },
  methods: {
    async submitEdit() {
      const json = this.convertFormToJson('addEditDifferentialEquationForm')
      json.references = this.clone(this.editReferences)
      const response = await this.post(`/api/differential-equation/${this.id}`, json)
      if (response.status === 200) {
        this.$router.push(`/differential-equation/${this.id}`)
      } else if (response.status === 400) {
        this.errors = (await response.json()).errors || {}
      }
    },
    changeReferences(references) {
      this.editReferences = references
    }
  }
}
</script>
