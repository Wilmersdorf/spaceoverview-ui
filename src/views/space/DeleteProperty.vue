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
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Delete</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <PropertyInfo :property="property"></PropertyInfo>
      <hr />
      <h4 class="mt-2 text-center">Delete property</h4>
      <div v-if="errors['general']" class="alert alert-danger mt-4">{{ errors['general'] }}</div>
      <div class="mt-4 text-center">Do you really want to delete this property?</div>
      <div class="my-4 d-flex justify-content-center">
        <button class="btn btn-danger" @click="submitDelete">Delete property</button>
        <router-link :to="`/property/${id}`" class="btn btn-success ms-4">Cancel</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import PropertyInfo from '@/components/PropertyInfo.vue'

export default {
  components: {
    PropertyInfo
  },
  data() {
    return {
      property: null,
      loaded: false,
      rendered: false,
      errors: {}
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  async mounted() {
    const response = await fetch(`/api/property/${this.id}`)
    if (response.status === 200) {
      this.property = await response.json()
      this.renderMath()
    }
  },
  methods: {
    async submitDelete() {
      const response = await this.delete(`/api/property/${this.id}`)
      if (response.status === 200) {
        this.$router.push('/property')
      } else if (response.status === 400) {
        this.errors = (await response.json()).errors || {}
      }
    }
  }
}
</script>
