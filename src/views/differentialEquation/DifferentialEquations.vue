<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">Differential Equations</li>
      </ol>
    </nav>
    <h1 class="mt-3 text-center">Differential Equations</h1>
    <div v-if="loaded" v-show="rendered">
      <div class="flex-column">
        <div
          v-for="differentialEquation in differentialEquations"
          :key="differentialEquation.id"
          class="mt-2"
        >
          <router-link :to="`/differential-equation/${differentialEquation.id}`">
            <div class="math">{{ differentialEquation.name }}</div>
          </router-link>
        </div>
      </div>
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link to="/differential-equation/add">Add differential equation</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      differentialEquations: null,
      loaded: false,
      rendered: false
    }
  },
  mounted() {
    this.$http.get('/api/differential-equation').then(response => {
      this.differentialEquations = response.data
      this.renderMath()
    })
  }
}
</script>
