<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/space'">Spaces</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link class="math" v-if="loaded" v-show="rendered" :to="`/space/${space.id}`">{{
            space.symbol
          }}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Delete</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <SpaceInfo :space="space"></SpaceInfo>
      <hr />
      <h4 class="mt-2 text-center">Delete space</h4>
      <div class="alert alert-danger mt-4" v-if="errors['general']">{{ errors['general'] }}</div>
      <div class="mt-4 text-center">Do you really want to delete this space?</div>
      <div class="form-group mt-4 text-center">
        <button @click="submitDelete" class="btn btn-danger">Delete space</button>
        <router-link :to="`/space/${id}`" class="btn btn-success ml-4">Cancel</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import SpaceInfo from '@/components/SpaceInfo.vue'

export default {
  data() {
    return {
      space: null,
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
  methods: {
    submitDelete() {
      this.$http
        .delete(`/api/space/${this.id}`)
        .then(() => {
          this.$router.push('/space')
        })
        .catch(error => {
          this.errors = error.response.data.errors
        })
    }
  },
  mounted() {
    this.$http.get(`/api/space/${this.id}`).then(response => {
      this.space = response.data
      this.renderMath()
    })
  },
  components: {
    SpaceInfo
  }
}
</script>
