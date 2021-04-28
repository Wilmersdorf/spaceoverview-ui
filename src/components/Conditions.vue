<template>
  <div v-show="rendered">
    <div v-for="condition in theorem.conditions" :key="condition.id" class="d-flex mt-2">
      <div v-if="!hasProperty(condition.field)" class="text-muted mr-1">
        ({{ formatFieldLink(condition.field) }})
      </div>
      <router-link class="math-component" :to="`/property/${condition.propertyId}`">{{
        condition.propertyName
      }}</router-link>
      <span v-if="hasProperty(condition.field)" class="text-muted ml-1">
        ({{ formatFieldLink(condition.field) }})
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Conditions',
  props: {
    theorem: {
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
  }
}
</script>
