<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">Spaces</li>
      </ol>
    </nav>
    <h1 class="mt-3 text-center">Spaces</h1>
    <div v-if="loaded" v-show="rendered">
      <div v-for="space in spaces" :key="space.id" class="mt-2">
        <router-link :to="`/space/${space.id}`" class="math">{{ space.symbol }}</router-link>
      </div>
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link to="/space/add">Add space</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      spaces: null,
      loaded: false,
      rendered: false
    }
  },
  async mounted() {
    const response = await fetch('/api/space')
    if (response.status === 200) {
      this.spaces = await response.json()
      this.renderMath()
    }
  }
}
</script>
