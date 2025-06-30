<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/space">Spaces</router-link></li>
        <li class="breadcrumb-item">
          <router-link v-if="loaded" v-show="rendered" class="math" :to="`/space/${space.id}`">{{
            space.symbol
          }}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Edit</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <SpaceInfo :space="space"></SpaceInfo>
      <hr />
      <h4 class="mt-2 text-center">Edit space</h4>
      <AddEditSpaceForm :space="space" :errors="errors"></AddEditSpaceForm>
      <AddEditReferences
        class="mt-4"
        :references="editReferences"
        :errors="errors"
        @changeReferences="changeReferences"
      ></AddEditReferences>
      <div class="my-4 d-flex justify-content-center">
        <button class="btn btn-primary" @click="submitEdit">Update space</button>
      </div>
    </div>
  </div>
</template>
<script>
import AddEditReferences from '@/components/AddEditReferences.vue'
import AddEditSpaceForm from '@/components/AddEditSpaceForm.vue'
import SpaceInfo from '@/components/SpaceInfo.vue'

export default {
  components: {
    AddEditReferences,
    AddEditSpaceForm,
    SpaceInfo
  },
  data() {
    return {
      space: null,
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
    const response = await fetch(`/api/space/${this.id}`)
    if (response.status === 200) {
      this.space = await response.json()
      this.editReferences = this.clone(this.space.references)
      this.renderMath()
    }
  },
  methods: {
    async submitEdit() {
      const json = this.convertFormToJson('addEditSpaceForm')
      json.references = this.clone(this.editReferences)
      const response = await this.post(`/api/space/${this.id}`, json)
      if (response.status === 200) {
        this.$router.push(`/space/${this.id}`)
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
