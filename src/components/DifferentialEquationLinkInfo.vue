<template>
  <div>
    <h4 v-if="link.hasProperty" class="text-center">Has property</h4>
    <h4 v-if="!link.hasProperty" class="text-center">Lacks property</h4>
    <div v-if="link.description" class="mt-3 text-center math">{{ link.description }}</div>
    <References :references="link.references"></References>
  </div>
</template>

<script>
import References from '@/components/References.vue'

export default {
  components: {
    References
  },
  props: {
    link: Object
  },
  mounted() {
    this.renderMathNow()
  }
}
</script>
