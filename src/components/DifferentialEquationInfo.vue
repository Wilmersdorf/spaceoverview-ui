<template>
  <div v-show="rendered">
    <h1 class="mt-3 text-center math-component">{{ differentialEquation.name }}</h1>
    <div class="mt-2 text-center math-component">{{ differentialEquation.symbol }}</div>
    <div class="mt-2 text-center math-component">{{ differentialEquation.variables }}</div>
    <div class="mt-2 text-center math-component">{{ differentialEquation.parameters }}</div>
    <div class="mt-2 text-center math-component">{{ differentialEquation.description }}</div>
    <References :references="differentialEquation.references"></References>
  </div>
</template>

<script>
import References from '@/components/References.vue'

export default {
  name: 'DifferentialEquationInfo',
  props: {
    differentialEquation: {
      required: true
    }
  },
  data() {
    return {
      rendered: false
    }
  },
  mounted() {
    this.renderComponent()
  },
  components: {
    References
  }
}
</script>
