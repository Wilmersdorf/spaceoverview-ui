<template>
  <div class="container">
    <h1 class="mt-3 text-center">Admin</h1>
    <button class="btn btn-primary mt-3 ms-3" @click="exportBackup">Export</button>
    <hr />
    <div>
      <input id="file" ref="file" class="ms-3" type="file" @change="handleFileUpload()" />
    </div>
    <div>
      <button class="btn btn-primary ms-3 mt-2" @click="importBackup">Import</button>
    </div>
    <hr />
    <button class="btn btn-primary ms-3" @click="createInviteCode">Create invite code</button>
    <div v-if="code" class="mt-3 ms-3">{{ code }}</div>
    <hr />
    <button class="btn btn-primary ms-3" @click="compute">Compute</button>
    <div v-if="loaded" v-show="rendered" class="mt-4">
      <div v-for="computation in computations" :key="computation.id">
        <div class="math ms-3">{{ spaces.get(computation.spaceId).symbol }}</div>
        <div class="d-flex ms-3">
          <div class="math me-1">{{ properties.get(computation.propertyId).name }}</div>
          <div class="math text-muted">({{ formatFieldLink(computation.field) }})</div>
        </div>
        <TheoremInfo class="ms-3" :info="false" :theorem="theorems.get(computation.theoremId)" />
        <hr />
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
      file: '',
      code: null,
      computations: null,
      theorems: null,
      spaces: null,
      properties: null,
      loaded: false,
      rendered: false
    }
  },
  methods: {
    handleFileUpload() {
      ;[this.file] = this.$refs.file.files
    },
    async exportBackup() {
      const response = await fetch('/api/admin/export')
      if (response.status === 200) {
        const json = await response.json()
        const link = document.createElement('a')
        const date = new Date().toISOString()
        link.download = `backup_${date}.json`
        link.href =
          'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json, null, 2))
        link.click()
      }
    },
    async createInviteCode() {
      const response = await this.post('/api/admin/invite')
      if (response.status === 200) {
        this.code = (await response.json()).code
      }
    },
    async importBackup() {
      const json = JSON.parse(await this.file.text())
      const response = await this.post('/api/admin/import', json)
      if (response.status === 200) {
        this.$router.push('/space')
      }
    },
    async compute() {
      this.loaded = false
      this.rendered = false
      const response = await this.post('/api/admin/compute')
      if (response.status === 200) {
        const theoremResponse = await fetch('/api/theorem')
        if (theoremResponse.status === 200) {
          const responseJson = await response.json()
          const theoremJson = await theoremResponse.json()
          this.spaces = new Map(responseJson.spaces.map(space => [space.id, space]))
          this.properties = new Map(
            responseJson.properties.map(property => [property.id, property])
          )
          this.computations = responseJson.computations
          this.theorems = new Map(theoremJson.map(theorem => [theorem.id, theorem]))
          this.renderMath()
        }
      }
    }
  }
}
</script>
