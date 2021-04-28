<template>
  <div v-show="rendered">
    <h1 id="spaceSymbol" class="mt-3 text-center math-component">{{ space.symbol }}</h1>
    <div id="spaceNorm" class="mt-2 text-center math-component">{{ space.norm }}</div>
    <div id="spaceDescription" class="mt-2 text-center math-component">{{ space.description }}</div>
    <div id="field" class="mt-2 text-center">{{ formatField(space.field) }}</div>
    <References :references="space.references"></References>
  </div>
</template>

<script>
import References from '@/components/References.vue'

export default {
  name: 'SpaceInfo',
  props: {
    space: {
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
