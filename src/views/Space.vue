<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/space'">Spaces</router-link>
        </li>
        <li class="breadcrumb-item">
          <span v-if="loaded" v-show="rendered" id="spaceSymbolCrumb">{{space.symbol}}</span>
        </li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <SpaceInfo :space="space"></SpaceInfo>
      <hr />
      <div v-for="fieldLink in FIELD_LINK" :key="fieldLink" class="mt-2">
        <div
          :id="formatFieldLinkHash(fieldLink)"
          class="font-weight-bold"
          v-if="linkPropertyList.some(it=>it.link.field===fieldLink)"
        >{{formatFieldLink(fieldLink)}}</div>
        <div v-for="linkProperty in linkPropertyList" :key="linkProperty.link.id">
          <div class="mt-2" v-if="linkProperty.link.field === fieldLink">
            <router-link
              :id="`${linkProperty.property.id}-name`"
              :to="`/space/${space.id}/property/${linkProperty.property.id}`"
            >{{linkProperty.property.name}}</router-link>
          </div>
        </div>
      </div>
      <div v-if="linkPropertyList.length === 0">This space hasn't been linked to any properties yet.</div>
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link :to="`/space/${space.id}/property/add`">Add link to property</router-link>&nbsp;|
        <router-link :to="`/space/${space.id}/edit`">Edit</router-link>&nbsp;|
        <router-link :to="`/space/${space.id}/delete`">Delete</router-link>
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
      linkPropertyList: null,
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
        this.space = spaceResponse.data;
        this.$http
          .get(`/api/space/${this.id}/property`)
          .then(propertyResponse => {
            this.linkPropertyList = propertyResponse.data;
            this.loaded = true;
            this.$nextTick(() => {
              this.render("spaceSymbolCrumb");
              this.linkPropertyList.forEach(linkProperty => {
                this.render(`${linkProperty.property.id}-name`);
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
