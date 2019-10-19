<template>
  <div v-show="rendered">
    <div v-if="hasReferences">
      <h6 class="mt-4" :class="center ? 'text-center' : ''">{{ title }}</h6>
      <div
        class="mt-2"
        :class="center ? 'text-center' : ''"
        v-for="(reference, index) in references"
        :key="`${index}`"
      >
        <a class="d-inline math-component" :href="reference.url" target="_blank">{{
          reference.title
        }}</a>
        <div class="d-inline" v-if="isPresent(reference.page)">, page {{ reference.page }}</div>
        <div class="d-inline" v-if="reference.statement">, {{ reference.statement }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'References',
  props: {
    references: Array,
    center: {
      default: true
    }
  },
  data() {
    return {
      rendered: false
    }
  },
  computed: {
    hasReferences() {
      return this.references !== null && this.references.length > 0
    },
    title() {
      if (this.references === null || this.references.length === 0) {
        return null
      } else if (this.references.length === 1) {
        return 'Reference'
      } else {
        return 'References'
      }
    }
  },
  mounted() {
    if (this.hasReferences) {
      this.renderComponent()
    }
  }
}
</script>
