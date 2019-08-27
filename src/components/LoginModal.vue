<template>
  <div class="modal fade" id="loginModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Log in</h5>
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="alert alert-danger" v-if="errors['general']">{{errors["general"]}}</div>
          <form
            @submit.prevent
            id="loginForm"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          >
            <div class="form-group mt-2">
              <label for="email">Email</label>
              <input
                class="form-control"
                name="email"
                placeholder="Your email"
                :class="{ 'is-invalid': errors['email'] }"
              />
              <div class="invalid-feedback">{{errors["email"]}}</div>
            </div>
            <div class="form-group mt-4">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                name="password"
                placeholder="Password for login"
                :class="{ 'is-invalid': errors['password'] }"
              />
              <div class="invalid-feedback">{{errors["password"]}}</div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button @click="submitLogin" type="button" class="btn btn-primary mr-auto">Log in</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginModal",
  data: function() {
    return {
      errors: {}
    };
  },
  methods: {
    submitLogin: function() {
      if (this.$jsCookie.get("csrf") === undefined) {
        this.$http.get("/api/space").then(() => {
          this.login();
        });
      } else {
        this.login();
      }
    },
    login: function() {
      let form = $("#loginForm");
      let json = this.convertFormToJson(form);
      this.errors = {};
      this.$http
        .post("/api/user/login", json)
        .then(() => {
          this.updatePrivileges();
          $("#loginModal").modal("hide");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  },
  mounted() {
    let self = this;
    $("#loginModal").on("hidden.bs.modal", function() {
      self.errors = {};
    });
  }
};
</script>