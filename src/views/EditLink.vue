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
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link
            id="propertyNameCrumb"
            :to="`/space/${space.id}/property/${property.id}`"
          >Link</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Edit</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <SpaceInfo :space="space"></SpaceInfo>
      <hr />
      <LinkInfo :link="link"></LinkInfo>
      <hr />
      <PropertyInfo :property="property"></PropertyInfo>
      <hr />
      <h4 class="mt-2 text-center">Change field</h4>
      <div
        class="d-inline"
      >Please select for which fields the property applies or doesn't apply.&nbsp;</div>
      <div
        class="d-inline"
      >If the space actually describes a collection of spaces, the below selection must apply in all cases.&nbsp;</div>
      <a class="d-inline" href="#" data-toggle="modal" data-target="#addEditLinkFieldInfoModal">
        <small>Info</small>
      </a>
      <AddEditLinkForm :space="space" :property="property" :link="editLink" :errors="errors"></AddEditLinkForm>
      <AddEditReferences
        @changeReferences="changeReferences"
        :references="editReferences"
        :errors="errors"
      ></AddEditReferences>
      <div class="d-flex justify-content-center">
        <button @click="submitEdit" class="btn btn-primary mt-4 mb-4">Update Link</button>
      </div>
      <AddEditLinkInfo></AddEditLinkInfo>
    </div>
  </div>
</template>
<script>
import SpaceInfo from "@/components/SpaceInfo.vue";
import PropertyInfo from "@/components/PropertyInfo.vue";
import LinkInfo from "@/components/LinkInfo.vue";
import AddEditLinkForm from "@/components/AddEditLinkForm.vue";
import AddEditReferences from "@/components/AddEditReferences.vue";
import AddEditLinkInfo from "@/components/AddEditLinkInfo.vue";

export default {
  data: function() {
    return {
      space: null,
      property: null,
      link: null,
      editLink: null,
      editReferences: null,
      loaded: false,
      rendered: false,
      errors: {}
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
  methods: {
    submitEdit: function() {
      let form = $("#addEditLinkForm");
      let json = this.convertFormToJson(form);
      json["references"] = this.editReferences.map(it => ({ ...it }));
      this.$http
        .post(`/api/space/${this.spaceId}/property/${this.propertyId}`, json)
        .then(() => {
          this.$router.push(
            `/space/${this.spaceId}/property/${this.propertyId}`
          );
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    changeReferences: function(references) {
      this.editReferences = references;
    }
  },
  mounted() {
    this.$http
      .get(`/api/space/${this.spaceId}/property/${this.propertyId}`)
      .then(response => {
        this.space = response.data.space;
        this.property = response.data.property;
        this.link = response.data.link;
        this.editLink = { ...response.data.link };
        this.editReferences = response.data.link.references.map(it => ({
          ...it
        }));
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
    LinkInfo,
    AddEditLinkForm,
    AddEditReferences,
    AddEditLinkInfo
  }
};
</script>
