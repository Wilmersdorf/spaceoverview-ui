<template>
  <div v-show="rendered">
    <h4 v-if="link.hasProperty" class="text-center">has property</h4>
    <h4 v-if="!link.hasProperty" class="text-center">lacks property</h4>
    <div v-if="link.description" class="mt-2 text-center math-component">
      {{ link.description }}
    </div>
    <References :references="link.references"></References>
  </div>
</template>

<script>
import References from '@/components/References.vue'

export default {
  name: 'DifferentialEquationLinkInfo',
  props: {
    link: {
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
