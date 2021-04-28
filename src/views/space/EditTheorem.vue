<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/space'">Spaces</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="'/theorem'">Theorems</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link class="math" v-if="loaded" v-show="rendered" :to="`/theorem/${id}`">{{
            theoremName
          }}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Edit</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <TheoremInfo :theorem="theorem"></TheoremInfo>
      <hr />
      <h4 class="mt-2 text-center">Edit theorem</h4>
      <AddEditTheoremForm
        ref="addEditTheoremForm"
        :theorem="editTheorem"
        :properties="properties"
        :errors="errors"
      ></AddEditTheoremForm>
      <div class="mt-4"></div>
      <AddEditReferences
        @changeReferences="changeReferences"
        :references="editReferences"
        :errors="errors"
      ></AddEditReferences>
      <div class="d-flex justify-content-center">
        <button class="btn btn-primary mt-4 mb-4" @click="submitEdit">Update theorem</button>
      </div>
    </div>
  </div>
</template>

<script>
import TheoremInfo from '@/components/TheoremInfo.vue'
import AddEditTheoremForm from '@/components/AddEditTheoremForm.vue'
import AddEditReferences from '@/components/AddEditReferences.vue'

export default {
  data() {
    return {
      theorem: null,
      editTheorem: null,
      properties: null,
      editReferences: null,
      loaded: false,
      rendered: false,
      errors: {}
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    theoremName() {
      if (this.theorem === null || isEmpty(this.theorem.name)) {
        return 'Theorem'
      } else {
        return this.theorem.name
      }
    }
  },
  methods: {
    inputName(event) {
      $('#mathName').text(event.target.value)
      this.render('mathName')
    },
    submitEdit() {
      const json = this.convertFormToJson('addEditTheoremForm')
      json.conditions = this.clone(
        this.$refs.addEditTheoremForm.conditions.slice(
          0,
          this.$refs.addEditTheoremForm.conditionCount
        )
      )
      json.conclusions = this.clone(
        this.$refs.addEditTheoremForm.conclusions.slice(
          0,
          this.$refs.addEditTheoremForm.conclusionCount
        )
      )
      json.references = this.clone(this.editReferences)
      this.$http
        .post(`/api/theorem/${this.id}`, json)
        .then(() => {
          this.$router.push(`/theorem/${this.id}`)
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
    this.$http.get(`/api/theorem/${this.id}`).then(theoremResponse => {
      this.editTheorem = this.clone(theoremResponse.data)
      this.editReferences = this.clone(theoremResponse.data.references)
      this.theorem = theoremResponse.data
      this.$http.get(`/api/property`).then(propertyResponse => {
        if (propertyResponse.data.length > 0) {
          this.properties = propertyResponse.data
          this.renderMath()
        }
      })
    })
  },
  components: {
    TheoremInfo,
    AddEditTheoremForm,
    AddEditReferences
  }
}
</script>
