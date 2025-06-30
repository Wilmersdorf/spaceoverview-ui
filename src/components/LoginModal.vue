<template>
  <div id="loginModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Log in</h5>
          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div v-if="errors['general']" class="alert alert-danger">{{ errors['general'] }}</div>
          <form
            id="loginForm"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
            @submit.prevent
          >
            <div class="mt-2">
              <label for="email" class="form-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
                autocomplete="off"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
              />
              <div class="invalid-feedback">{{ errors['email'] }}</div>
            </div>
            <div class="mt-4">
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password for login"
                autocomplete="off"
                class="form-control"
                :class="{ 'is-invalid': errors['password'] }"
              />
              <div class="invalid-feedback">{{ errors['password'] }}</div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary me-auto" @click="submitLogin">Log in</button>
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
    document.getElementById('loginModal').addEventListener('hidden.bs.modal', () => {
      document.getElementById('password').value = ''
      this.errors = {}
    })
    document.getElementById('password').addEventListener('keyup', event => {
      if (event.key === 'Enter') {
        this.submitLogin()
      }
    })
  },
  methods: {
    async submitLogin() {
      if (this.jsCookie.get('csrf') === undefined) {
        await fetch('/api/space')
      }
      const json = this.convertFormToJson('loginForm')
      this.errors = {}
      const response = await this.post('/api/user/login', json)
      if (response.status === 200) {
        setTimeout(() => {
          document.getElementById('loginForm').reset()
        }, 100)
        this.updatePrivileges()
        Modal.getInstance(document.getElementById('loginModal')).hide()
      } else if (response.status === 400) {
        this.errors = (await response.json()).errors || {}
      }
    }
  }
}
</script>
