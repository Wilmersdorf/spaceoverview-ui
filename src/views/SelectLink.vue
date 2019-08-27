<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/space'">Spaces</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link
            v-if="loaded"
            v-show="rendered"
            id="spaceSymbolCrumb"
            :to="`/space/${space.id}`"
          >{{space.symbol}}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Add link to property</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <SpaceInfo :space="space"></SpaceInfo>
      <hr />
      <h4 class="mt-2 text-center">Add link to property</h4>
      <div class="mt-4 font-weight-bold">Please select the property to link to this space</div>
      <div
        class="mt-2"
        v-if="properties.length === 0"
      >All properties that can be linked to this space have already been linked.</div>
      <div class="flex-column mt-2" id="properties">
        <div v-for="property in properties" :key="property.id" class="mt-2">
          <router-link :to="`/space/${id}/property/${property.id}/add`">
            <div :id="property.id+'-name'">{{property.name}}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SpaceInfo from "@/components/SpaceInfo.vue";

export default {
  data: function() {
    return {
      space: null,
      properties: null,
      loaded: false,
      rendered: false
    };
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    }
  },
  mounted() {
    this.$http
      .get(`/api/space/${this.id}`)
      .then(spaceResponse => {
        this.$http
          .get(`/api/space/${this.id}/property?unlinked=true`)
          .then(propertyResponse => {
            this.space = spaceResponse.data;
            this.properties = propertyResponse.data.map(it => it.property);
            this.loaded = true;
            this.$nextTick(() => {
              this.render("spaceSymbolCrumb");
              this.properties.forEach(property => {
                this.render(`${property.id}-name`);
              });
              this.rendered = true;
            });
          });
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    SpaceInfo
  }
};
</script>
