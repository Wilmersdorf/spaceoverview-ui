<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/space">Spaces</router-link></li>
        <li class="breadcrumb-item d-flex">
          <div v-if="loaded" v-show="rendered" class="math">{{ space.symbol }}</div>
        </li>
        <ShowSourceDropdown></ShowSourceDropdown>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <SpaceInfo :space="space"></SpaceInfo>
      <hr />
      <div v-for="fieldLink in fieldLinks" :key="fieldLink" class="mt-2">
        <div v-if="linkPropertyList.some(it => it.field === fieldLink)" class="fw-bold">
          {{ formatFieldLink(fieldLink) }}
        </div>
        <div
          v-for="linkProperty in linkPropertyList"
          :key="`${fieldLink}-${linkProperty.property.id}`"
        >
          <div v-if="linkProperty.field === fieldLink" class="mt-2">
            <router-link
              class="d-inline math"
              :to="`/space/${space.id}/property/${linkProperty.property.id}`"
              >{{ linkProperty.property.name }}</router-link
            >
            <div v-if="showSource" class="d-inline-flex text-muted">
              <div class="ms-1">(</div>
              <div v-if="linkProperty.linked">linked</div>
              <div v-if="linkProperty.linked && linkProperty.computed" class="me-1">,</div>
              <div v-if="linkProperty.computed">computed</div>
              <div>)</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="linkPropertyList.length === 0">
        This space hasn't been linked to any properties yet.
      </div>
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link :to="`/space/${space.id}/property/add`">Add link to property</router-link>
        <div class="mx-1">|</div>
        <router-link :to="`/space/${space.id}/edit`">Edit</router-link>
        <div class="mx-1">|</div>
        <router-link :to="`/space/${space.id}/delete`">Delete</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import ShowSourceDropdown from '@/components/ShowSourceDropdown.vue'
import SpaceInfo from '@/components/SpaceInfo.vue'

export default {
  components: {
    ShowSourceDropdown,
    SpaceInfo
  },
  data() {
    return {
      space: null,
      linkPropertyList: null,
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
      fetch(`/api/space/${this.id}/property`)
    ])
    if (spaceResponse.status === 200 && propertyResponse.status === 200) {
      this.space = await spaceResponse.json()
      this.linkPropertyList = await propertyResponse.json()
      this.renderMath()
    }
  }
}
</script>
