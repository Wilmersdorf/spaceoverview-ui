<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/space'">Spaces</router-link>
        </li>
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
        Please select for which fields the property applies or doesn't apply.&nbsp;
      </div>
      <div class="d-inline">
        If the space actually describes a collection of spaces, the below selection must apply in
        all cases.&nbsp;
      </div>
      <a class="d-inline" href="#" data-toggle="modal" data-target="#addEditLinkFieldInfoModal">
        <small>Info</small>
      </a>
      <AddEditLinkForm
        :link="link"
        :space="space"
        :property="property"
        :errors="errors"
      ></AddEditLinkForm>
      <AddEditReferences
        @changeReferences="changeReferences"
        :references="references"
        :errors="errors"
      ></AddEditReferences>
      <div class="d-flex justify-content-center">
        <button @click="submitAdd" class="btn btn-primary mt-4 mb-4">Add link</button>
      </div>
      <AddEditLinkInfo></AddEditLinkInfo>
    </div>
  </div>
</template>
<script>
import SpaceInfo from '@/components/SpaceInfo.vue'
import PropertyInfo from '@/components/PropertyInfo.vue'
import AddEditLinkForm from '@/components/AddEditLinkForm.vue'
import AddEditReferences from '@/components/AddEditReferences.vue'
import AddEditLinkInfo from '@/components/AddEditLinkInfo.vue'

export default {
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
  methods: {
    submitAdd() {
      const json = this.convertFormToJson('addEditLinkForm')
      json.references = this.clone(this.references)
      this.$http.post(`/api/space/${this.spaceId}/property/${this.propertyId}`, json).then(() => {
        this.$router.push(`/space/${this.spaceId}/property/${this.propertyId}`).catch(error => {
          this.errors = error.response.data.errors
        })
      })
    },
    changeReferences(references) {
      this.references = references
    }
  },
  mounted() {
    this.$http.get(`/api/space/${this.spaceId}`).then(spaceResponse => {
      this.$http.get(`/api/property/${this.propertyId}`).then(propertyResponse => {
        this.space = spaceResponse.data
        this.property = propertyResponse.data
        if (this.space.field === 'REAL' || this.property.field === 'REAL') {
          this.link = { field: 'REAL' }
        } else if (this.space.field === 'COMPLEX' || this.property.field === 'COMPLEX') {
          this.link = { field: 'COMPLEX' }
        } else {
          this.link = { field: 'REAL_AND_COMPLEX' }
        }
        this.renderMath()
      })
    })
  },
  components: {
    SpaceInfo,
    PropertyInfo,
    AddEditLinkForm,
    AddEditReferences,
    AddEditLinkInfo
  }
}
</script>
