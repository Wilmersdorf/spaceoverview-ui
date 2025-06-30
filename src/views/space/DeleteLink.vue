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
      <div v-if="errors['general']" class="alert alert-danger mt-4">{{ errors['general'] }}</div>
      <div class="mt-4 text-center">Do you really want to delete this link?</div>
      <div class="my-4 d-flex justify-content-center">
        <button class="btn btn-danger" @click="submitDelete">Delete link</button>
        <router-link :to="`/space/${spaceId}/property/${propertyId}`" class="btn btn-success ms-4"
          >Cancel</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import LinkInfo from '@/components/LinkInfo.vue'
import PropertyInfo from '@/components/PropertyInfo.vue'
import SpaceInfo from '@/components/SpaceInfo.vue'

export default {
  components: {
    LinkInfo,
    PropertyInfo,
    SpaceInfo
  },
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
  async mounted() {
    const response = await fetch(`/api/space/${this.spaceId}/property/${this.propertyId}`)
    if (response.status === 200) {
      const json = await response.json()
      this.space = json.space
      this.property = json.property
      this.link = json.link
      this.renderMath()
    }
  },
  methods: {
    async submitDelete() {
      const response = await this.delete(`/api/space/${this.spaceId}/property/${this.propertyId}`)
      if (response.status === 200) {
        this.$router.push(`/space/${this.spaceId}`)
      } else if (response.status === 400) {
        this.errors = (await response.json()).errors || {}
      }
    }
  }
}
</script>
