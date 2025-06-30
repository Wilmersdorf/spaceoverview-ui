<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/space">Spaces</router-link></li>
        <li class="breadcrumb-item"><router-link to="/theorem">Theorems</router-link></li>
        <li class="breadcrumb-item">
          <router-link v-if="loaded" v-show="rendered" :to="`/theorem/${id}`" class="math">{{
            theoremName
          }}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Delete</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <TheoremInfo :info="true" :theorem="theorem" />
      <hr />
      <h4 class="mt-2 text-center">Delete theorem</h4>
      <div v-if="errors['general']" class="alert alert-danger mt-4">{{ errors['general'] }}</div>
      <div class="mt-4 text-center">Do you really want to delete this theorem?</div>
      <div class="my-4 d-flex justify-content-center">
        <button class="btn btn-danger" @click="submitDelete">Delete theorem</button>
        <router-link :to="`/theorem/${id}`" class="btn btn-success ms-4">Cancel</router-link>
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
      rendered: false,
      errors: {}
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
  },
  methods: {
    async submitDelete() {
      const response = await this.delete(`/api/theorem/${this.id}`)
      if (response.status === 200) {
        this.$router.push('/theorem')
      } else if (response.status === 400) {
        this.errors = (await response.json()).errors || {}
      }
    }
  }
}
</script>
