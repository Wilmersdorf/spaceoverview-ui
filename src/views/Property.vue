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
        <ShowSourceDropdown v-if="loaded" v-show="rendered"></ShowSourceDropdown>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <PropertyInfo :property="property"></PropertyInfo>
      <hr />
      <div v-for="fieldLink in FIELD_LINK" :key="fieldLink" class="mt-2">
        <div
          :id="formatFieldLinkHash(fieldLink)"
          class="font-weight-bold"
          v-if="linkSpaceList.some(it=>it.field===fieldLink)"
        >{{formatFieldLink(fieldLink)}}</div>
        <div v-for="linkSpace in linkSpaceList" :key="`${fieldLink}-${linkSpace.space.id}`">
          <div class="d-flex mt-2" v-if="linkSpace.field === fieldLink">
            <router-link
              :id="`${linkSpace.space.id}-symbol`"
              :to="`/property/${property.id}/space/${linkSpace.space.id}`"
            >{{linkSpace.space.symbol}}</router-link>
            <div v-if="showSource" class="d-flex">
              <div class="text-muted">&nbsp;(</div>
              <span class="text-muted" v-if="linkSpace.linked">linked</span>
              <span class="text-muted" v-if="linkSpace.linked && linkSpace.computed">,&nbsp;</span>
              <span class="text-muted" v-if="linkSpace.computed">computed</span>
              <div>)</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="linkSpaceList.length === 0">This property hasn't been linked to any spaces yet.</div>
      <div v-if="theorems.length>0">
        <hr />
        <h5>Theorems</h5>
        <div v-for="theorem in theorems" :key="theorem.id">
          <TheoremInfo
            class="ml-4"
            :center="false"
            :titleSize="'small'"
            :showReferences="false"
            :showLink="true"
            :theorem="theorem"
          />
          <hr class="ml-4" />
        </div>
      </div>
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
import ShowSourceDropdown from "@/components/ShowSourceDropdown.vue";
import TheoremInfo from "@/components/TheoremInfo.vue";

export default {
  data: function() {
    return {
      property: null,
      linkSpaceList: null,
      theorems: null,
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
        this.$http
          .get(`/api/property/${this.id}/space`)
          .then(spaceResponse => {
            this.$http
              .get(`/api/theorem?propertyId=${this.id}`)
              .then(theoremsResponse => {
                this.property = propertyResponse.data;
                this.linkSpaceList = spaceResponse.data;
                this.theorems = theoremsResponse.data;
                this.loaded = true;
                this.$nextTick(() => {
                  this.linkSpaceList.forEach(linkSpace => {
                    this.render(`${linkSpace.space.id}-symbol`);
                  });
                  this.render("propertyNameCrumb");
                  this.rendered = true;
                });
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    PropertyInfo,
    ShowSourceDropdown,
    TheoremInfo
  }
};
</script>
