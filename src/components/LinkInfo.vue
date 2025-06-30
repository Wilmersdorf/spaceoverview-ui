<template>
  <div>
    <h4 class="text-center">{{ formatFieldLink(link.field) }}</h4>
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
  }
}
</script>
