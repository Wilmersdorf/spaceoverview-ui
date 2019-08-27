<template>
  <div v-show="rendered">
    <h1 id="propertyName" class="mt-3 text-center">{{property.name}}</h1>
    <div id="propertyDescription" class="mt-2 text-center">{{property.description}}</div>
    <div id="propertyField" class="mt-2 text-center">{{formatField(property.field)}}</div>
    <References :id="property.id" :references="property.references"></References>
  </div>
</template>

<script>
import References from "@/components/References.vue";

export default {
  name: "PropertyInfo",
  props: {
    property: {
      required: true
    }
  },
  data: function() {
    return {
      rendered: false
    };
  },
  mounted: function() {
    this.render("propertyName");
    this.render("propertyDescription");
    this.rendered = true;
  },
  components: {
    References
  }
};
</script>
