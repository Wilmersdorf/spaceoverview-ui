<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/differential-equation">Differential Equations</router-link>
        </li>
        <li class="breadcrumb-item">Properties</li>
      </ol>
    </nav>
    <h1 class="mt-3 text-center">Properties</h1>
    <div v-if="loaded" v-show="rendered">
      <div class="flex-column">
        <div v-for="property in properties" :key="property.id" class="mt-2">
          <router-link :to="`/differential-equation/property/${property.id}`" class="math">
            {{ property.name }}
          </router-link>
        </div>
      </div>
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link to="/differential-equation/property/add">Add property</router-link>
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
  async mounted() {
    const response = await fetch('/api/differential-equation/property')
    if (response.status === 200) {
      this.properties = await response.json()
      this.renderMath()
    }
  }
}
</script>
