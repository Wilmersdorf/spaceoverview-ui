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
            class="math"
            :to="`/property/${property.id}`"
            >{{ property.name }}</router-link
          >
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link :to="`/property/${property.id}`">{{ formatFieldLink(field) }}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link class="math" :to="`/space/${space.id}`">{{ space.symbol }}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Link</li>
        <li class="ms-auto">
          <router-link :to="`/space/${spaceId}/property/${propertyId}`">
            <Refresh class="pointer icon" width="16" height="16" />
          </router-link>
        </li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <PropertyInfo :property="property"></PropertyInfo>
      <hr />
      <h4 class="text-center d-flex justify-content-center">
        <div>{{ formatFieldLink(field) }}</div>
        <div v-if="link === null" class="ms-1">(computed)</div>
      </h4>
      <div v-if="link !== null && link.description" class="mt-3 text-center math display">
        {{ link.description }}
      </div>
      <References v-if="link" :references="link.references"></References>
      <hr />
      <SpaceInfo :space="space"></SpaceInfo>
      <hr />
      <div v-if="computations.length > 0">
        <h5>Theorems</h5>
        <div v-for="computation in computations" :key="computation.id">
          <TheoremInfo class="ms-4" :info="false" :theorem="theorems.get(computation.theoremId)" />
          <hr class="ms-4" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PropertyInfo from '@/components/PropertyInfo.vue'
import References from '@/components/References.vue'
import Refresh from '@/icons/Refresh.vue'
import SpaceInfo from '@/components/SpaceInfo.vue'
import TheoremInfo from '@/components/TheoremInfo.vue'

export default {
  components: {
    PropertyInfo,
    References,
    Refresh,
    SpaceInfo,
    TheoremInfo
  },
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
  async mounted() {
    const [response, theoremResponse] = await Promise.all([
      fetch(`/api/space/${this.spaceId}/property/${this.propertyId}`),
      fetch('/api/theorem')
    ])
    if (response.status === 200 && theoremResponse.status === 200) {
      const json = await response.json()
      this.space = json.space
      this.property = json.property
      this.link = json.link
      this.field = json.field
      this.computations = json.computations
      const theoremJson = await theoremResponse.json()
      this.theorems = new Map(theoremJson.map(theorem => [theorem.id, theorem]))
      this.renderMath()
    }
  }
}
</script>
