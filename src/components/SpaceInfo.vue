<template>
  <div v-show="rendered">
    <h1 id="spaceSymbol" class="mt-3 text-center">{{space.symbol}}</h1>
    <div id="spaceNorm" class="mt-2 text-center">{{space.norm}}</div>
    <div id="spaceDescription" class="mt-2 text-center">{{space.description}}</div>
    <div id="field" class="mt-2 text-center">{{formatField(space.field)}}</div>
    <References :id="space.id" :references="space.references"></References>
  </div>
</template>

<script>
import References from "@/components/References.vue";

export default {
  name: "SpaceInfo",
  props: {
    space: {
      required: true
    }
  },
  data: function() {
    return {
      rendered: false
    };
  },
  mounted: function() {
    this.render("spaceSymbol");
    this.render("spaceNorm");
    this.render("spaceDescription");
    this.rendered = true;
  },
  components: {
    References
  }
};
</script>
