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
          <router-link :to="`/space/${space.id}#${formatFieldLinkHash(link.field)}`">{{
            formatFieldLink(link.field)
          }}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link class="math" :to="`/property/${property.id}`">{{
            property.name
          }}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link class="math" :to="`/space/${space.id}/property/${property.id}`"
            >Link</router-link
          >
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Delete</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <SpaceInfo :space="space"></SpaceInfo>
      <hr />
      <LinkInfo :link="link"></LinkInfo>
      <hr />
      <PropertyInfo :property="property"></PropertyInfo>
      <hr />
      <h4 class="mt-2 text-center">Delete link</h4>
      <div class="alert alert-danger mt-4" v-if="errors['general']">{{ errors['general'] }}</div>
      <div class="mt-4 text-center">Do you really want to delete this link?</div>
      <div class="form-group mt-4 text-center">
        <button @click="submitDelete" class="btn btn-danger">Delete link</button>
        <router-link :to="`/space/${spaceId}/property/${propertyId}`" class="btn btn-success ml-4"
          >Cancel</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import SpaceInfo from '@/components/SpaceInfo.vue'
import PropertyInfo from '@/components/PropertyInfo.vue'
import LinkInfo from '@/components/LinkInfo.vue'

export default {
  data() {
    return {
      space: null,
      property: null,
      link: null,
      loaded: null,
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
    submitDelete() {
      this.$http
        .delete(`/api/space/${this.spaceId}/property/${this.propertyId}`)
        .then(() => {
          this.$router.push(`/space/${this.spaceId}`)
        })
        .catch(error => {
          this.errors = error.response.data.errors
        })
    }
  },
  mounted() {
    this.$http.get(`/api/space/${this.spaceId}/property/${this.propertyId}`).then(response => {
      this.space = response.data.space
      this.property = response.data.property
      this.link = response.data.link
      this.renderMath()
    })
  },
  components: {
    SpaceInfo,
    PropertyInfo,
    LinkInfo
  }
}
</script>
