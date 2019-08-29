<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">Theorems</li>
      </ol>
    </nav>
    <h1 class="mt-3 text-center">Theorems</h1>
    <div v-if="loaded" v-show="rendered">
      <hr />
      <div v-for="theorem in theorems" :key="theorem.id">
        <TheoremInfo
          :theorem="theorem"
          :titleSize="'small'"
          :showReferences="false"
          :showLink="true"
          :center="false"
        ></TheoremInfo>
        <hr />
      </div>
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link to="/theorem/add">Add theorem</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import TheoremInfo from "@/components/TheoremInfo.vue";

export default {
  data: function() {
    return {
      theorems: null,
      loaded: false,
      rendered: false
    };
  },
  methods: {},
  mounted() {
    this.$http
      .get("/api/theorem")
      .then(response => {
        this.theorems = response.data;
        this.loaded = true;
        this.$nextTick(() => {
          this.rendered = true;
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    TheoremInfo
  }
};
</script>
