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
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Add link to property</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <SpaceInfo :space="space"></SpaceInfo>
      <hr />
      <h4 class="mt-2 text-center">Add link to property</h4>
      <div class="mt-4 fw-bold">Please select the property to link to this space</div>
      <div v-if="properties.length === 0" class="mt-2">
        All properties that can be linked to this space have already been linked.
      </div>
      <div class="flex-column">
        <div v-for="property in properties" :key="property.id" class="mt-2">
          <router-link :to="`/space/${id}/property/${property.id}/add`" class="math">
            {{ property.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SpaceInfo from '@/components/SpaceInfo.vue'

export default {
  components: {
    SpaceInfo
  },
  data() {
    return {
      space: null,
      properties: null,
      loaded: false,
      rendered: false
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  async mounted() {
    const [spaceResponse, propertyResponse] = await Promise.all([
      fetch(`/api/space/${this.id}`),
      fetch(`/api/space/${this.id}/property?unlinked=true`)
    ])
    if (spaceResponse.status === 200 && propertyResponse.status === 200) {
      this.space = await spaceResponse.json()
      this.properties = (await propertyResponse.json()).map(it => it.property)
      this.renderMath()
    }
  }
}
</script>
