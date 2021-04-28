<template>
  <div v-show="rendered">
    <h1 id="propertyName" class="mt-3 text-center math-component">{{ property.name }}</h1>
    <div id="propertyDescription" class="mt-2 text-center math-component">
      {{ property.description }}
    </div>
    <div id="propertyField" class="mt-2 text-center">{{ formatField(property.field) }}</div>
    <References :references="property.references"></References>
  </div>
</template>

<script>
import References from '@/components/References.vue'

export default {
  name: 'PropertyInfo',
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
