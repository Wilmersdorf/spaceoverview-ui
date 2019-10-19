<template>
  <div v-show="rendered">
    <h1 class="mt-3 text-center math-component">{{ property.name }}</h1>
    <div class="mt-2 text-center math-component">{{ property.description }}</div>
    <References :references="property.references"></References>
  </div>
</template>

<script>
import References from '@/components/References.vue'

export default {
  name: 'DifferentialEquationPropertyInfo',
  props: {
    property: {
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
