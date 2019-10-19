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
          <router-link :to="`/space/${space.id}#${formatFieldLinkHash(field)}`">{{
            formatFieldLink(field)
          }}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link class="math" :to="`/property/${property.id}`">{{
            property.name
          }}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Link</li>
        <li class="ml-auto">
          <router-link :to="`/property/${propertyId}/space/${spaceId}`">
            <i class="pointer" data-feather="refresh-cw" width="16" height="16" color="black"></i>
          </router-link>
        </li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <SpaceInfo :space="space"></SpaceInfo>
      <hr />
      <h5 class="text-center">
        <span>{{ formatFieldLink(field) }}</span>
        <span v-if="link === null" class="ml-1">(computed)</span>
      </h5>
      <References v-if="link" :references="link.references"></References>
      <hr />
      <PropertyInfo :property="property"></PropertyInfo>
      <hr />
      <div v-if="computations.length > 0">
        <h5>Theorems</h5>
        <div v-for="computation in computations" :key="computation.id">
          <TheoremInfo
            class="ml-4"
            :center="false"
            :titleSize="'small'"
            :showReferences="false"
            :showLink="true"
            :theorem="theorems.get(computation.theoremId)"
          />
          <hr class="ml-4" />
        </div>
      </div>
      <div class="footing"></div>
      <div v-if="canEdit && link !== null" class="footer">
        <router-link :to="`/space/${spaceId}/property/${propertyId}/edit`">Edit</router-link>&nbsp;|
        <router-link :to="`/space/${spaceId}/property/${propertyId}/delete`">Delete</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import SpaceInfo from '@/components/SpaceInfo.vue'
import PropertyInfo from '@/components/PropertyInfo.vue'
import References from '@/components/References.vue'
import TheoremInfo from '@/components/TheoremInfo.vue'

export default {
  data() {
    return {
      space: null,
      property: null,
      link: null,
      field: null,
      computations: null,
      theorems: null,
      loaded: false,
      rendered: false
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
  mounted() {
    this.$feather.replace()
    this.$http.get(`/api/space/${this.spaceId}/property/${this.propertyId}`).then(response => {
      this.$http.get('/api/theorem').then(theoremResponse => {
        this.space = response.data.space
        this.property = response.data.property
        this.link = response.data.link
        this.field = response.data.field
        this.computations = response.data.computations
        this.theorems = new Map(theoremResponse.data.map(theorem => [theorem.id, theorem]))
        this.renderMath()
      })
    })
  },
  components: {
    SpaceInfo,
    PropertyInfo,
    References,
    TheoremInfo
  }
}
</script>
