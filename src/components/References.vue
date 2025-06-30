<template>
  <div>
    <div v-if="hasReferences">
      <h6 class="mt-4">{{ title }}</h6>
      <div v-for="(item, index) in references" :key="index" class="mt-2">
        <a :href="item.url" target="_blank" class="math d-inline">{{ item.title }}</a>
        <div v-if="item.page !== null" class="d-inline text-break">, page {{ item.page }}</div>
        <div v-if="item.statement" class="d-inline text-break">, {{ item.statement }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    references: Array
  },
  computed: {
    hasReferences() {
      return this.references !== null && this.references.length > 0
    },
    title() {
      if (this.references.length === 1) {
        return 'Reference'
      } else {
        return 'References'
      }
    }
  },
  mounted() {
    if (this.hasReferences) {
      this.renderMathNow()
    }
  }
}
</script>
