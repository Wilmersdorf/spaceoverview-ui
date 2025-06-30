<template>
  <div id="signupModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Sign up</h5>
          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form
            id="signupForm"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
            @submit.prevent
          >
            <div class="mt-2">
              <label for="emailSignup" class="form-label">Email</label>
              <input
                id="emailSignup"
                name="email"
                placeholder="Your email"
                autocomplete="off"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
              />
              <div class="invalid-feedback">{{ errors['email'] }}</div>
            </div>
            <div class="mt-4">
              <label for="passwordSignup" class="form-label">Password</label>
              <input
                id="passwordSignup"
                name="password"
                type="password"
                placeholder="Password for login"
                autocomplete="off"
                class="form-control"
                :class="{ 'is-invalid': errors['password'] }"
              />
              <div class="invalid-feedback">{{ errors['password'] }}</div>
            </div>
            <div class="mt-4">
              <label for="inviteCode" class="form-label">Invite code</label>
              <input
                id="inviteCode"
                name="inviteCode"
                placeholder="Invite code"
                class="form-control"
                :class="{ 'is-invalid': errors['inviteCode'] }"
              />
              <div class="invalid-feedback">{{ errors['inviteCode'] }}</div>
            </div>
            <div class="form-check mt-4">
              <input
                id="license"
                name="license"
                type="checkbox"
                class="form-check-input"
                value="true"
                :class="{ 'is-invalid': errors['license'] }"
              />
              <label class="form-check-label no-select pointer" for="license"
                >I agree that my contributions can be published under one or more yet to be
                determined open source licenses.</label
              >
              <div class="invalid-feedback">{{ errors['license'] }}</div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary me-auto" @click="submitSignup">Sign up</button>
          <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: {}
    }
  },
  mounted() {
    document.getElementById('signupModal').addEventListener('hidden.bs.modal', () => {
      document.getElementById('passwordSignup').value = ''
      this.errors = {}
    })
  },
  methods: {
    async submitSignup() {
      if (this.jsCookie.get('csrf') === undefined) {
        await fetch('/api/space')
      }
      const json = this.convertFormToJson('signupForm')
      this.errors = {}
      const response = await this.post('/api/user/signup', json)
      if (response.status === 200) {
        setTimeout(() => {
          document.getElementById('signupForm').reset()
        }, 100)
        this.updatePrivileges()
        Modal.getInstance(document.getElementById('signupModal')).hide()
      } else if (response.status === 400) {
        this.errors = (await response.json()).errors || {}
      }
    }
  }
}
</script>
