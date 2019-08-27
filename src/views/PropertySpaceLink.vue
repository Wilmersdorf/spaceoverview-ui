<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/property'">Properties</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link
            v-if="loaded"
            v-show="rendered"
            id="propertyNameCrumb"
            :to="`/property/${property.id}`"
          >{{property.name}}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link
            :to="`/property/${property.id}#${formatFieldLinkHash(link.field)}`"
          >{{formatFieldLink(link.field)}}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link id="spaceSymbolCrumb" :to="`/space/${space.id}`">{{space.symbol}}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Link</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <PropertyInfo :property="property"></PropertyInfo>
      <hr />
      <LinkInfo :link="link"></LinkInfo>
      <hr />
      <SpaceInfo :space="space"></SpaceInfo>
      <hr />
    </div>
  </div>
</template>
<script>
import SpaceInfo from "@/components/SpaceInfo.vue";
import PropertyInfo from "@/components/PropertyInfo.vue";
import LinkInfo from "@/components/LinkInfo.vue";

export default {
  data: function() {
    return {
      space: null,
      property: null,
      link: null,
      loaded: false,
      rendered: false
    };
  },
  computed: {
    spaceId: function() {
      return this.$route.params.spaceId;
    },
    propertyId: function() {
      return this.$route.params.propertyId;
    }
  },
  mounted() {
    this.$http
      .get(`/api/space/${this.spaceId}/property/${this.propertyId}`)
      .then(response => {
        this.space = response.data.space;
        this.property = response.data.property;
        this.link = response.data.link;
        this.loaded = true;
        this.$nextTick(() => {
          this.render("spaceSymbolCrumb");
          this.render("propertyNameCrumb");
          this.rendered = true;
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    SpaceInfo,
    PropertyInfo,
    LinkInfo
  }
};
</script>
