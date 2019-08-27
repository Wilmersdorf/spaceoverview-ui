<template>
  <div class="modal fade" id="signupModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Sign up</h5>
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form
            @submit.prevent
            id="signupForm"
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
            <div class="form-group mt-4">
              <label for="inviteCode">Invite code</label>
              <input
                class="form-control"
                name="inviteCode"
                placeholder="Invite code"
                :class="{ 'is-invalid': errors['inviteCode'] }"
              />
              <div class="invalid-feedback">{{errors["inviteCode"]}}</div>
            </div>
            <div class="form-check mt-4">
              <input
                type="checkbox"
                class="form-check-input"
                id="license"
                name="license"
                value="true"
                :class="{ 'is-invalid': errors['license'] }"
              />
              <label
                class="form-check-label"
                for="license"
              >I agree that my contributions can be published under a yet to be determined open source license.</label>
              <div class="invalid-feedback">{{errors["license"]}}</div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button @click="submitSignup" type="button" class="btn btn-primary mr-auto">Sign up</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupModal",
  data: function() {
    return {
      errors: {}
    };
  },
  methods: {
    submitSignup: function() {
      if (this.$jsCookie.get("csrf") === undefined) {
        this.$http.get("/api/space").then(() => {
          this.signup();
        });
      } else {
        this.signup();
      }
    },
    signup: function() {
      let form = $("#signupForm");
      let json = this.convertFormToJson(form);
      this.errors = {};
      this.$http
        .post("/api/user/signup", json)
        .then(() => {
          this.updatePrivileges();
          $("#signupModal").modal("hide");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  },
  mounted() {
    let self = this;
    $("#signupModal").on("hidden.bs.modal", function() {
      self.errors = {};
    });
  }
};
</script>