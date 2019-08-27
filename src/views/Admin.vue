<template>
  <div class="container">
    <h1 class="mt-3 text-center">Admin</h1>
    <a href="/api/admin/export" class="btn btn-primary mt-3 ml-3">Export</a>
    <hr />
    <form @submit="submitImport">
      <div class="form-group">
        <input class="ml-3" type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary ml-3">Import</button>
      </div>
    </form>
    <hr />
    <button @click="createInviteCode" class="btn btn-primary ml-3">Create invite code</button>
    <div v-if="code" class="mt-3 ml-3">{{code}}</div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      code: null,
      errors: {},
      file: ""
    };
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    createInviteCode: function() {
      this.$http.post("/api/admin/invite").then(response => {
        this.code = response.data.code;
      });
    },
    submitImport: function(event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append("file", this.file);
      this.$http
        .post("/api/admin/import", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(() => {
          this.$router.push("/space");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
