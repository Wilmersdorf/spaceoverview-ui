<template>
  <div v-show="rendered">
    <div v-for="condition in theorem.conditions" :key="condition.id" class="d-flex mt-2">
      <div
        v-if="!hasProperty(condition.field)"
        class="text-muted"
      >({{formatFieldLink(condition.field)}})&nbsp;</div>
      <router-link
        :to="`/property/${condition.propertyId}`"
        :id="condition.id"
      >{{condition.propertyName}}</router-link>
      <div
        v-if="hasProperty(condition.field)"
        class="text-muted"
      >&nbsp;({{formatFieldLink(condition.field)}})</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Conditions",
  props: {
    theorem: {
      required: true
    }
  },
  data: function() {
    return {
      rendered: false
    };
  },
  mounted: function() {
    this.$nextTick(() => {
      this.theorem.conditions.forEach(condition => {
        this.render(condition.id);
      });
      this.rendered = true;
    });
  }
};
</script>
