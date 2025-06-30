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
          <router-link :to="`/space/${space.id}/property/add`">Add link to property</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link class="math" :to="`/property/${property.id}`">{{
            property.name
          }}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Select field</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <SpaceInfo :space="space"></SpaceInfo>
      <hr />
      <PropertyInfo :property="property"></PropertyInfo>
      <hr />
      <h4 class="mt-2 text-center">Select field</h4>
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
        :link="link"
        :space="space"
        :property="property"
        :errors="errors"
      ></AddEditLinkForm>
      <AddEditReferences
        class="mt-4"
        :references="references"
        :errors="errors"
        @changeReferences="changeReferences"
      ></AddEditReferences>
      <div class="my-4 d-flex justify-content-center">
        <button class="btn btn-primary" @click="submitAdd">Add link</button>
      </div>
      <AddEditLinkInfoModal />
    </div>
  </div>
</template>
<script>
import AddEditLinkForm from '@/components/AddEditLinkForm.vue'
import AddEditLinkInfoModal from '@/components/AddEditLinkInfoModal.vue'
import AddEditReferences from '@/components/AddEditReferences.vue'
import PropertyInfo from '@/components/PropertyInfo.vue'
import SpaceInfo from '@/components/SpaceInfo.vue'

export default {
  components: {
    AddEditLinkForm,
    AddEditLinkInfoModal,
    AddEditReferences,
    PropertyInfo,
    SpaceInfo
  },
  data() {
    return {
      space: null,
      property: null,
      link: null,
      references: [],
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
    const [spaceResponse, propertyResponse] = await Promise.all([
      fetch(`/api/space/${this.spaceId}`),
      fetch(`/api/property/${this.propertyId}`)
    ])
    if (spaceResponse.status === 200 && propertyResponse.status === 200) {
      this.space = await spaceResponse.json()
      this.property = await propertyResponse.json()
      if (this.space.field === 'REAL' || this.property.field === 'REAL') {
        this.link = { field: 'REAL' }
      } else if (this.space.field === 'COMPLEX' || this.property.field === 'COMPLEX') {
        this.link = { field: 'COMPLEX' }
      } else {
        this.link = { field: 'REAL_AND_COMPLEX' }
      }
      this.renderMath()
    }
  },
  methods: {
    async submitAdd() {
      const json = this.convertFormToJson('addEditLinkForm')
      json.references = this.clone(this.references)
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
      this.references = references
    }
  }
}
</script>
