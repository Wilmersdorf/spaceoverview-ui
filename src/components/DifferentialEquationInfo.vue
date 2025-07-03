<template>
  <div>
    <h1 class="mt-3 text-center math">{{ differentialEquation.name }}</h1>
    <div class="mt-2 text-center math display">{{ differentialEquation.symbol }}</div>
    <div class="mt-2 text-center math display">{{ differentialEquation.variables }}</div>
    <div class="mt-2 text-center math display">{{ differentialEquation.parameters }}</div>
    <div class="mt-2 text-center math display">{{ differentialEquation.description }}</div>
    <References :references="differentialEquation.references"></References>
  </div>
</template>

<script>
import References from '@/components/References.vue'

export default {
  components: {
    References
  },
  props: {
    differentialEquation: Object
  },
  mounted() {
    this.renderMathNow()
  }
}
</script>
