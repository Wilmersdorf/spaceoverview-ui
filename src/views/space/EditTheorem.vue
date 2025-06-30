<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/space">Spaces</router-link></li>
        <li class="breadcrumb-item"><router-link to="/theorem">Theorems</router-link></li>
        <li class="breadcrumb-item">
          <router-link v-if="loaded" v-show="rendered" :to="`/theorem/${id}`" class="math">{{
            theoremName
          }}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Edit</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <TheoremInfo :info="true" :theorem="theorem" />
      <hr />
      <h4 class="mt-2 text-center">Edit theorem</h4>
      <AddEditTheoremForm
        ref="addEditTheoremForm"
        :theorem="theorem"
        :properties="properties"
        :errors="errors"
      ></AddEditTheoremForm>
      <AddEditReferences
        class="mt-4"
        :references="editReferences"
        :errors="errors"
        @changeReferences="changeReferences"
      ></AddEditReferences>
      <div class="my-4 d-flex justify-content-center">
        <button class="btn btn-primary" @click="submitEdit">Update theorem</button>
      </div>
    </div>
  </div>
</template>

<script>
import AddEditReferences from '@/components/AddEditReferences.vue'
import AddEditTheoremForm from '@/components/AddEditTheoremForm.vue'
import TheoremInfo from '@/components/TheoremInfo.vue'

export default {
  components: {
    AddEditReferences,
    AddEditTheoremForm,
    TheoremInfo
  },
  data() {
    return {
      theorem: null,
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
      if (this.isEmpty(this.theorem.name)) {
        return 'Theorem'
      } else {
        return this.theorem.name
      }
    }
  },
  async mounted() {
    const [theoremResponse, propertyResponse] = await Promise.all([
      fetch(`/api/theorem/${this.id}`),
      fetch(`/api/property`)
    ])
    if (theoremResponse.status === 200 && propertyResponse.status === 200) {
      this.theorem = await theoremResponse.json()
      this.editReferences = this.clone(this.theorem.references)
      this.properties = await propertyResponse.json()
      this.renderMath()
    }
  },
  methods: {
    async submitEdit() {
      const json = this.convertFormToJson('addEditTheoremForm')
      json.conditions = this.clone(this.$refs.addEditTheoremForm.conditions)
      json.conclusions = this.clone(this.$refs.addEditTheoremForm.conclusions)
      json.references = this.clone(this.editReferences)
      const response = await this.post(`/api/theorem/${this.id}`, json)
      if (response.status === 200) {
        this.$router.push(`/theorem/${this.id}`)
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
