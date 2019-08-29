<template>
  <div v-show="rendered">
    <div v-if="hasReferences">
      <h6 class="mt-4" :class="center ? 'text-center' : ''">{{title}}</h6>
      <div
        class="mt-2"
        :class="center ? 'text-center' : ''"
        v-for="(reference,index) in references"
        :key="`${index}`"
      >
        <a
          class="d-inline"
          :id="`reference-${id}-${index}`"
          :href="reference.url"
          target="_blank"
        >{{reference.title}}</a>
        <div class="d-inline" v-if="reference.page">, page {{reference.page}}</div>
        <div class="d-inline" v-if="reference.statement">, {{reference.statement}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "References",
  props: {
    id: null,
    references: Array,
    center: {
      default: true
    }
  },
  data: function() {
    return {
      rendered: false
    };
  },
  computed: {
    hasReferences: function() {
      return this.references !== null && this.references.length > 0;
    },
    title: function() {
      if (this.references === null || this.references.length === 0) {
        return null;
      } else if (this.references.length === 1) {
        return "Reference";
      } else {
        return "References";
      }
    }
  },
  mounted: function() {
    if (this.hasReferences) {
      this.$nextTick(() => {
        for (let i = 0; i < this.references.length; i++) {
          this.render(`reference-${this.id}-${i}`);
        }
        this.rendered = true;
      });
    }
  }
};
</script>