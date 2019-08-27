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
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link
            :to="`/space/${space.id}#${formatFieldLinkHash(link.field)}`"
          >{{formatFieldLink(link.field)}}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link id="propertyNameCrumb" :to="`/property/${property.id}`">{{property.name}}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Link</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <SpaceInfo :space="space"></SpaceInfo>
      <hr />
      <LinkInfo :link="link"></LinkInfo>
      <hr />
      <PropertyInfo :property="property"></PropertyInfo>
      <hr />
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link :to="`/space/${spaceId}/property/${propertyId}/edit`">Edit</router-link>&nbsp;|
        <router-link :to="`/space/${spaceId}/property/${propertyId}/delete`">Delete</router-link>
      </div>
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
