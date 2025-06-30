<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/space">Spaces</router-link></li>
        <li class="breadcrumb-item">Theorems</li>
      </ol>
    </nav>
    <h1 class="mt-3 text-center">Theorems</h1>
    <div class="mt-2">Click on an arrow for more info.</div>
    <div v-if="loaded" v-show="rendered">
      <hr />
      <div v-for="theorem in theorems" :key="theorem.id">
        <TheoremInfo :info="false" :theorem="theorem"></TheoremInfo>
        <hr />
      </div>
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link to="/theorem/add">Add theorem</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import TheoremInfo from '@/components/TheoremInfo.vue'

export default {
  components: {
    TheoremInfo
  },
  data() {
    return {
      theorems: null,
      loaded: false,
      rendered: false
    }
  },
  async mounted() {
    const response = await fetch('/api/theorem')
    if (response.status === 200) {
      this.theorems = await response.json()
      this.renderMath()
    }
  }
}
</script>
