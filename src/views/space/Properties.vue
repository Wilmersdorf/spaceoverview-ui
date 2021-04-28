<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/space'">Spaces</router-link>
        </li>
        <li class="breadcrumb-item">Properties</li>
      </ol>
    </nav>
    <h1 class="mt-3 text-center">Properties</h1>
    <div v-if="loaded" v-show="rendered">
      <div class="flex-column">
        <div v-for="property in properties" :key="property.id" class="mt-2">
          <router-link :to="`/property/${property.id}`">
            <div class="math">{{ property.name }}</div>
          </router-link>
        </div>
      </div>
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link to="/property/add">Add property</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      properties: null,
      loaded: false,
      rendered: false
    }
  },
  mounted() {
    this.$http.get('/api/property').then(response => {
      this.properties = response.data
      this.renderMath()
    })
  }
}
</script>
