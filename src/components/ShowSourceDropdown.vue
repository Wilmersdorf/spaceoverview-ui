<template>
  <li class="ms-auto me-nav">
    <More class="pointer icon" data-bs-toggle="dropdown" width="20" height="20" />
    <ul id="dropdownMenu" class="dropdown-menu dropdown-menu-end mt-2">
      <li><h6 class="dropdown-header no-select">Options</h6></li>
      <li class="form-check ms-3">
        <input
          id="showSource"
          :checked="showSource"
          class="form-check-input pointer"
          type="checkbox"
          @change="toggleShowSource"
        />
        <label for="showSource" class="form-check-label no-select pointer">Show source</label>
      </li>
    </ul>
  </li>
</template>

<script>
import More from '@/icons/More.vue'

export default {
  components: {
    More
  },
  mounted() {
    document.getElementById('dropdownMenu').addEventListener('click', event => {
      event.stopPropagation()
    })
  },
  methods: {
    toggleShowSource() {
      if (document.getElementById('showSource').checked) {
        this.jsCookie.set('showSource', 'true')
      } else {
        this.jsCookie.set('showSource', 'false')
      }
      this.updateSettings()
    }
  }
}
</script>
