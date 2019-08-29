<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="'/theorem'">Theorems</router-link>
        </li>
        <li class="breadcrumb-item">
          <span v-if="loaded" v-show="rendered" id="theoremNameCrumb">{{theoremName}}</span>
        </li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <TheoremInfo :theorem="theorem"></TheoremInfo>
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link :to="`/theorem/${theorem.id}/edit`">Edit</router-link>&nbsp;|
        <router-link :to="`/theorem/${theorem.id}/delete`">Delete</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import TheoremInfo from "@/components/TheoremInfo.vue";

export default {
  data: function() {
    return {
      theorem: null,
      loaded: false,
      rendered: false
    };
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    },
    theoremName: function() {
      if (this.theorem === null || isEmpty(this.theorem.name)) {
        return "Theorem";
      } else {
        return this.theorem.name;
      }
    }
  },
  mounted() {
    this.$http
      .get(`/api/theorem/${this.id}`)
      .then(response => {
        this.theorem = response.data;
        this.loaded = true;
        this.$nextTick(() => {
          this.render("theoremNameCrumb");
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
