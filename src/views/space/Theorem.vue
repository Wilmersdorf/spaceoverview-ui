<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/space">Spaces</router-link></li>
        <li class="breadcrumb-item"><router-link to="/theorem">Theorems</router-link></li>
        <li class="breadcrumb-item d-flex">
          <div v-if="loaded" v-show="rendered" class="math">{{ theoremName }}</div>
        </li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <TheoremInfo :info="true" :theorem="theorem" />
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link :to="`/theorem/${theorem.id}/edit`">Edit</router-link>
        <div class="mx-1">|</div>
        <router-link :to="`/theorem/${theorem.id}/delete`">Delete</router-link>
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
      theorem: null,
      loaded: false,
      rendered: false
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    theoremName() {
      if (this.isEmpty(this.theorem.name)) {
        return 'Theorem'
      } else {
        return this.theorem.name
      }
    }
  },
  async mounted() {
    const response = await fetch(`/api/theorem/${this.id}`)
    if (response.status === 200) {
      this.theorem = await response.json()
      this.renderMath()
    }
  }
}
</script>
