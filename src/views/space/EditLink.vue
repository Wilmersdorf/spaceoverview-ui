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
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link :to="`/space/${space.id}`">{{ formatFieldLink(link.field) }}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link class="math" :to="`/property/${property.id}`">{{
            property.name
          }}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link :to="`/space/${space.id}/property/${property.id}`">Link</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Edit</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <SpaceInfo :space="space"></SpaceInfo>
      <hr />
      <LinkInfo :link="link"></LinkInfo>
      <hr />
      <PropertyInfo :property="property"></PropertyInfo>
      <hr />
      <h4 class="mt-2 text-center">Change field</h4>
      <div class="d-inline">
        Please select for which fields the property applies or doesn't apply. If the space actually
        describes a collection of spaces, the below selection must apply in all cases.
      </div>
      <a
        class="d-inline"
        href="#"
        data-bs-toggle="modal"
        data-bs-target="#addEditLinkFieldInfoModal"
      >
        <small>Info</small>
      </a>
      <AddEditLinkForm
        :space="space"
        :property="property"
        :link="link"
        :errors="errors"
      ></AddEditLinkForm>
      <AddEditReferences
        class="mt-4"
        :references="editReferences"
        :errors="errors"
        @changeReferences="changeReferences"
      ></AddEditReferences>
      <div class="my-4 d-flex justify-content-center">
        <button class="btn btn-primary" @click="submitEdit">Update Link</button>
      </div>
    </div>
    <AddEditLinkInfoModal />
  </div>
</template>
<script>
import AddEditLinkForm from '@/components/AddEditLinkForm.vue'
import AddEditLinkInfoModal from '@/components/AddEditLinkInfoModal.vue'
import AddEditReferences from '@/components/AddEditReferences.vue'
import LinkInfo from '@/components/LinkInfo.vue'
import PropertyInfo from '@/components/PropertyInfo.vue'
import SpaceInfo from '@/components/SpaceInfo.vue'

export default {
  components: {
    AddEditLinkForm,
    AddEditLinkInfoModal,
    AddEditReferences,
    LinkInfo,
    PropertyInfo,
    SpaceInfo
  },
  data() {
    return {
      space: null,
      property: null,
      link: null,
      editReferences: null,
      loaded: false,
      rendered: false,
      errors: {}
    }
  },
  computed: {
    spaceId() {
      return this.$route.params.spaceId
    },
    propertyId() {
      return this.$route.params.propertyId
    }
  },
  async mounted() {
    const response = await fetch(`/api/space/${this.spaceId}/property/${this.propertyId}`)
    if (response.status === 200) {
      const json = await response.json()
      this.space = json.space
      this.property = json.property
      this.link = json.link
      this.editReferences = this.clone(json.link.references)
      this.renderMath()
    }
  },
  methods: {
    async submitEdit() {
      const json = this.convertFormToJson('addEditLinkForm')
      json.references = this.clone(this.editReferences)
      const response = await this.post(
        `/api/space/${this.spaceId}/property/${this.propertyId}`,
        json
      )
      if (response.status === 200) {
        this.$router.push(`/space/${this.spaceId}/property/${this.propertyId}`)
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
