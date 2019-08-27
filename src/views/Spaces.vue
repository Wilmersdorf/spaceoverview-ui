<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">Spaces</li>
      </ol>
    </nav>
    <h1 class="mt-3 text-center">Spaces</h1>
    <div v-if="loaded" v-show="rendered">
      <div class="flex-column">
        <div v-for="space in spaces" :key="space.id" class="mt-2">
          <router-link :to="'/space/'+space.id">
            <div :id="space.id+'-symbol'">{{space.symbol}}</div>
          </router-link>
        </div>
      </div>
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link to="/space/add">Add space</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      spaces: null,
      loaded: false,
      rendered: false
    };
  },
  mounted() {
    this.$http
      .get("/api/space")
      .then(response => {
        this.spaces = response.data;
        this.loaded = true;
        this.$nextTick(() => {
          response.data.forEach(space => {
            this.render(space.id + "-symbol");
          });
          this.rendered = true;
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
