<template>
  <div>
    <h1 class="mt-3 text-center math">{{ space.symbol }}</h1>
    <div class="mt-2 text-center math">{{ space.norm }}</div>
    <div class="mt-2 text-center math">{{ space.description }}</div>
    <div class="mt-2 text-center">{{ formatField(space.field) }}</div>
    <References :references="space.references"></References>
  </div>
</template>

<script>
import References from '@/components/References.vue'

export default {
  components: {
    References
  },
  props: {
    space: Object
  },
  mounted() {
    this.renderMathNow()
  }
}
</script>
