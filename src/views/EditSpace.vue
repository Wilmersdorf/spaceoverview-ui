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
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Edit</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <SpaceInfo :space="space"></SpaceInfo>
      <hr />
      <h4 class="mt-2 text-center">Edit space</h4>
      <AddEditSpaceForm :space="editSpace" :errors="errors"></AddEditSpaceForm>
      <AddEditReferences
        @changeReferences="changeReferences"
        :references="editReferences"
        :errors="errors"
      ></AddEditReferences>
      <div class="d-flex justify-content-center">
        <button @click="submitEdit" class="btn btn-primary mt-4 mb-4">Update space</button>
      </div>
    </div>
  </div>
</template>
<script>
import SpaceInfo from "@/components/SpaceInfo.vue";
import AddEditSpaceForm from "@/components/AddEditSpaceForm.vue";
import AddEditReferences from "@/components/AddEditReferences.vue";

export default {
  data: function() {
    return {
      space: null,
      editSpace: null,
      editReferences: null,
      loaded: false,
      rendered: false,
      errors: {}
    };
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    }
  },
  methods: {
    submitEdit: function() {
      let form = $("#addEditSpaceForm");
      let json = this.convertFormToJson(form);
      json["references"] = this.editReferences.map(it => ({ ...it }));
      this.$http
        .post(`/api/space/${this.id}`, json)
        .then(() => {
          this.$router.push({ path: `/space/${this.id}` });
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
      .get(`/api/space/${this.id}`)
      .then(response => {
        this.space = response.data;
        this.editSpace = { ...response.data };
        this.editReferences = response.data.references.map(it => ({ ...it }));
        this.loaded = true;
        this.$nextTick(() => {
          this.render("spaceSymbolCrumb");
          this.rendered = true;
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    SpaceInfo,
    AddEditSpaceForm,
    AddEditReferences
  }
};
</script>
