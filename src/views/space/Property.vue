<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/space">Spaces</router-link></li>
        <li class="breadcrumb-item"><router-link to="/property">Properties</router-link></li>
        <li class="breadcrumb-item d-flex">
          <div v-if="loaded" v-show="rendered" class="math">{{ property.name }}</div>
        </li>
        <ShowSourceDropdown></ShowSourceDropdown>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <PropertyInfo :property="property"></PropertyInfo>
      <hr />
      <div v-for="fieldLink in fieldLinks" :key="fieldLink" class="mt-2">
        <div v-if="linkSpaceList.some(it => it.field === fieldLink)" class="fw-bold">
          {{ formatFieldLink(fieldLink) }}
        </div>
        <div v-for="linkSpace in linkSpaceList" :key="`${fieldLink}-${linkSpace.space.id}`">
          <div v-if="linkSpace.field === fieldLink" class="mt-2">
            <router-link
              class="d-inline math"
              :to="`/property/${property.id}/space/${linkSpace.space.id}`"
              >{{ linkSpace.space.symbol }}</router-link
            >
            <div v-if="showSource" class="d-inline-flex text-muted">
              <div class="ms-1">(</div>
              <div v-if="linkSpace.linked">linked</div>
              <div v-if="linkSpace.linked && linkSpace.computed" class="me-1">,</div>
              <div v-if="linkSpace.computed">computed</div>
              <div>)</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="linkSpaceList.length === 0">
        This property hasn't been linked to any spaces yet.
      </div>
      <div v-if="theorems.length > 0">
        <hr />
        <h5>Theorems</h5>
        <div v-for="theorem in theorems" :key="theorem.id">
          <TheoremInfo class="ms-4" :info="false" :theorem="theorem" />
          <hr class="ms-4" />
        </div>
      </div>
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link :to="`/property/${id}/edit`">Edit</router-link>
        <div class="mx-1">|</div>
        <router-link :to="`/property/${id}/delete`">Delete</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import PropertyInfo from '@/components/PropertyInfo.vue'
import ShowSourceDropdown from '@/components/ShowSourceDropdown.vue'
import TheoremInfo from '@/components/TheoremInfo.vue'

export default {
  components: {
    PropertyInfo,
    ShowSourceDropdown,
    TheoremInfo
  },
  data() {
    return {
      property: null,
      linkSpaceList: null,
      theorems: null,
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
    const [propertyResponse, spaceResponse, theoremsResponse] = await Promise.all([
      fetch(`/api/property/${this.id}`),
      fetch(`/api/property/${this.id}/space`),
      fetch(`/api/theorem?propertyId=${this.id}`)
    ])
    if (
      propertyResponse.status === 200 &&
      spaceResponse.status === 200 &&
      theoremsResponse.status === 200
    ) {
      this.property = await propertyResponse.json()
      this.linkSpaceList = await spaceResponse.json()
      this.theorems = await theoremsResponse.json()
      this.renderMath()
    }
  }
}
</script>
