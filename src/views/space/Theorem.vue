<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/space'">Spaces</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="'/theorem'">Theorems</router-link>
        </li>
        <li class="breadcrumb-item">
          <span v-if="loaded" v-show="rendered" class="math">{{ theoremName }}</span>
        </li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <TheoremInfo :theorem="theorem"></TheoremInfo>
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link :to="`/theorem/${theorem.id}/edit`">Edit</router-link>&nbsp;|
        <router-link :to="`/theorem/${theorem.id}/delete`">Delete</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import TheoremInfo from '@/components/TheoremInfo.vue'

export default {
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
      if (this.theorem === null || isEmpty(this.theorem.name)) {
        return 'Theorem'
      } else {
        return this.theorem.name
      }
    }
  },
  mounted() {
    this.$http.get(`/api/theorem/${this.id}`).then(response => {
      this.theorem = response.data
      this.renderMath()
    })
  },
  components: {
    TheoremInfo
  }
}
</script>
