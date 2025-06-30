<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/space">Spaces</router-link></li>
        <li class="breadcrumb-item"><router-link to="/property">Properties</router-link></li>
        <li class="breadcrumb-item">
          <router-link
            v-if="loaded"
            v-show="rendered"
            :to="`/property/${property.id}`"
            class="math"
            >{{ property.name }}</router-link
          >
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Edit</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <PropertyInfo :property="property"></PropertyInfo>
      <hr />
      <h4 class="mt-2 text-center">Edit property</h4>
      <AddEditPropertyForm :property="property" :errors="errors"></AddEditPropertyForm>
      <AddEditReferences
        class="mt-4"
        :references="editReferences"
        :errors="errors"
        @changeReferences="changeReferences"
      ></AddEditReferences>
      <div class="my-4 d-flex justify-content-center">
        <button class="btn btn-primary" @click="submitEdit">Update property</button>
      </div>
    </div>
  </div>
</template>
<script>
import AddEditPropertyForm from '@/components/AddEditPropertyForm.vue'
import AddEditReferences from '@/components/AddEditReferences.vue'
import PropertyInfo from '@/components/PropertyInfo.vue'

export default {
  components: {
    AddEditPropertyForm,
    AddEditReferences,
    PropertyInfo
  },
  data() {
    return {
      property: null,
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
    const response = await fetch(`/api/property/${this.id}`)
    if (response.status === 200) {
      this.property = await response.json()
      this.editReferences = this.clone(this.property.references)
      this.renderMath()
    }
  },
  methods: {
    async submitEdit() {
      const json = this.convertFormToJson('addEditPropertyForm')
      json.references = this.clone(this.editReferences)
      const response = await this.post(`/api/property/${this.id}`, json)
      if (response.status === 200) {
        this.$router.push(`/property/${this.id}`)
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
