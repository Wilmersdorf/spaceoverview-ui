<template>
  <div v-show="rendered">
    <div v-for="conclusion in theorem.conclusions" :key="conclusion.id" class="d-flex mt-2">
      <div v-if="!hasProperty(conclusion.field)" class="text-muted mr-1">
        ({{ formatFieldLink(conclusion.field) }})
      </div>
      <router-link :to="`/property/${conclusion.propertyId}`" class="math-component">{{
        conclusion.propertyName
      }}</router-link>
      <div v-if="hasProperty(conclusion.field)" class="text-muted ml-1">
        ({{ formatFieldLink(conclusion.field) }})
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Conclusions',
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
