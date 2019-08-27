<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/property'">Properties</router-link>
        </li>
        <li class="breadcrumb-item">
          <span v-if="loaded" v-show="rendered" id="propertyNameCrumb">{{property.name}}</span>
        </li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <PropertyInfo :property="property"></PropertyInfo>
      <hr />
      <div v-for="fieldLink in FIELD_LINK" :key="fieldLink" class="mt-2">
        <div
          :id="formatFieldLinkHash(fieldLink)"
          class="font-weight-bold"
          v-if="linkSpaceList.some(it=>it.link.field===fieldLink)"
        >{{formatFieldLink(fieldLink)}}</div>
        <div v-for="linkSpace in linkSpaceList" :key="linkSpace.link.id">
          <div class="mt-2">
            <router-link
              :id="`${linkSpace.space.id}-symbol`"
              :to="`/property/${property.id}/space/${linkSpace.space.id}`"
              v-if="linkSpace.link.field === fieldLink"
            >{{linkSpace.space.symbol}}</router-link>
          </div>
        </div>
      </div>
      <div v-if="linkSpaceList.length === 0">This property hasn't been linked to any spaces yet.</div>
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link :to="`/property/${id}/edit`">Edit</router-link>&nbsp;|
        <router-link :to="`/property/${id}/delete`">Delete</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import PropertyInfo from "@/components/PropertyInfo.vue";

export default {
  data: function() {
    return {
      property: null,
      linkSpaceList: null,
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
      .get(`/api/property/${this.id}`)
      .then(propertyResponse => {
        this.property = propertyResponse.data;
        this.$http.get(`/api/property/${this.id}/space`).then(spaceResponse => {
          this.linkSpaceList = spaceResponse.data;
          this.loaded = true;
          this.$nextTick(() => {
            this.linkSpaceList.forEach(linkSpace => {
              this.render(`${linkSpace.space.id}-symbol`);
            });
            this.render("propertyNameCrumb");
            this.rendered = true;
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    PropertyInfo
  }
};
</script>
