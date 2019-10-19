<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/differential-equation'">Differential Equations</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link
            :to="`/differential-equation/${differentialEquation.id}`"
            v-if="loaded"
            v-show="rendered"
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
        :differentialEquation="editDifferentialEquation"
        :errors="errors"
      ></AddEditDifferentialEquationForm>
      <AddEditReferences
        class="mt-4"
        @changeReferences="changeReferences"
        :references="editReferences"
        :errors="errors"
      ></AddEditReferences>
      <div class="d-flex justify-content-center">
        <button @click="submitEdit" class="btn btn-primary mt-4 mb-4">
          Update differential equation
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import AddEditDifferentialEquationForm from '@/components/AddEditDifferentialEquationForm.vue'
import AddEditReferences from '@/components/AddEditReferences.vue'
import DifferentialEquationInfo from '@/components/DifferentialEquationInfo.vue'

export default {
  data() {
    return {
      differentialEquation: null,
      editDifferentialEquation: null,
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
  methods: {
    submitEdit() {
      const json = this.convertFormToJson('addEditDifferentialEquationForm')
      json.references = this.clone(this.editReferences)
      this.$http
        .post(`/api/differential-equation/${this.id}`, json)
        .then(() => {
          this.$router.push({ path: `/differential-equation/${this.id}` })
        })
        .catch(error => {
          this.errors = error.response.data.errors
        })
    },
    changeReferences(references) {
      this.editReferences = references
    }
  },
  mounted() {
    this.$http.get(`/api/differential-equation/${this.id}`).then(response => {
      this.editDifferentialEquation = this.clone(response.data)
      this.editReferences = this.clone(response.data.references)
      this.differentialEquation = response.data
      this.renderMath()
    })
  },
  components: {
    AddEditDifferentialEquationForm,
    AddEditReferences,
    DifferentialEquationInfo
  }
}
</script>
