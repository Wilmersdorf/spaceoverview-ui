<template>
  <div>
    <h1 class="mt-3 text-center math">{{ property.name }}</h1>
    <div class="mt-2 text-center math">{{ property.description }}</div>
    <References :references="property.references"></References>
  </div>
</template>

<script>
import References from '@/components/References.vue'

export default {
  components: {
    References
  },
  props: {
    property: Object
  },
  mounted() {
    this.renderMathNow()
  }
}
</script>
