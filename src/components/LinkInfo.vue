<template>
  <div>
    <h5 class="text-center">{{ formatFieldLink(link.field) }}</h5>
    <References :references="link.references"></References>
  </div>
</template>

<script>
import References from '@/components/References.vue'

export default {
  name: 'LinkInfo',
  props: {
    link: {
      required: true
    }
  },
  components: {
    References
  }
}
</script>
