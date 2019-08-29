<template>
  <div v-show="rendered">
    <div v-for="conclusion in theorem.conclusions" :key="conclusion.id" class="d-flex mt-2">
      <div
        v-if="!hasProperty(conclusion.field)"
        class="text-muted"
      >({{formatFieldLink(conclusion.field)}})&nbsp;</div>
      <router-link
        :to="`/property/${conclusion.propertyId}`"
        :id="conclusion.id"
      >{{conclusion.propertyName}}</router-link>
      <div
        v-if="hasProperty(conclusion.field)"
        class="text-muted"
      >&nbsp;({{formatFieldLink(conclusion.field)}})</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Conclusions",
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
      this.theorem.conclusions.forEach(conclusion => {
        this.render(conclusion.id);
      });
      this.rendered = true;
    });
  }
};
</script>
