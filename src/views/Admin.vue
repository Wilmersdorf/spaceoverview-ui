<template>
  <div class="container">
    <h1 class="mt-3 text-center">Admin</h1>
    <a href="/api/admin/export" class="btn btn-primary mt-3 ml-3">Export</a>
    <hr />
    <form @submit="submitImport">
      <div class="form-group">
        <input class="ml-3" type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary ml-3">Import</button>
      </div>
    </form>
    <hr />
    <button @click="createInviteCode" class="btn btn-primary ml-3">Create invite code</button>
    <div v-if="code" class="mt-3 ml-3">{{ code }}</div>
    <hr />
    <form @submit="submitCompute">
      <div class="form-group">
        <button type="submit" class="btn btn-primary ml-3">Compute</button>
      </div>
    </form>
    <div class="mt-4" v-if="loaded" v-show="rendered">
      <div v-for="computation in computations" :key="computation.id">
        <div>
          <div class="math ml-3">{{ spaces.get(computation.spaceId).symbol }}</div>
          <div class="d-flex ml-3">
            <div class="math mr-1">{{ properties.get(computation.propertyId).name }}</div>
            <div class="math text-muted">({{ formatFieldLink(computation.field) }})</div>
          </div>
          <TheoremInfo
            class="ml-3"
            :titleSize="'small'"
            :showLink="true"
            :theorem="theorems.get(computation.theoremId)"
          />
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TheoremInfo from '@/components/TheoremInfo.vue'

export default {
  data() {
    return {
      loaded: false,
      rendered: false,
      code: null,
      errors: {},
      file: '',
      computations: null,
      theorems: null,
      spaces: null,
      properties: null
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
    createInviteCode() {
      this.$http.post('/api/admin/invite').then(response => {
        this.code = response.data.code
      })
    },
    submitImport(event) {
      event.preventDefault()
      const formData = new FormData()
      formData.append('file', this.file)
      this.$http
        .post('/api/admin/import', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          this.$router.push('/space')
        })
    },
    submitCompute(event) {
      this.loaded = false
      event.preventDefault()
      this.$http.post('/api/admin/compute').then(response => {
        this.$http.get('/api/theorem').then(theoremResponse => {
          this.theorems = new Map(theoremResponse.data.map(theorem => [theorem.id, theorem]))
          this.spaces = new Map(response.data.spaces.map(space => [space.id, space]))
          this.properties = new Map(
            response.data.properties.map(property => [property.id, property])
          )
          this.computations = response.data.computations
          this.renderMath()
        })
      })
    }
  },
  components: {
    TheoremInfo
  }
}
</script>
