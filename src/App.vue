<template>
  <div id="app">
    <div class="d-flex flex-wrap justify-content-center align-items-center">
      <div>
        <router-link to="/" class="d-inline">Home</router-link>
        <div class="mx-1 d-inline">|</div>
      </div>
      <div>
        <router-link to="/space" class="d-inline">Spaces</router-link>
        <div class="mx-1 d-inline">-</div>
      </div>
      <div>
        <router-link to="/property" class="d-inline">Properties</router-link>
        <div class="mx-1 d-inline">-</div>
      </div>
      <div>
        <router-link to="/theorem" class="d-inline">Theorems</router-link>
        <div class="mx-1 d-inline">|</div>
      </div>
      <div>
        <router-link to="/differential-equation" class="d-inline"
          >Differential&#8201;Equations</router-link
        >
        <div class="mx-1 d-inline">-</div>
      </div>
      <div>
        <router-link to="/differential-equation/property" class="d-inline">Properties</router-link>
        <div class="mx-1 d-inline">|</div>
      </div>
      <div v-if="canEdit">
        <router-link to="/info" class="d-inline">Info</router-link>
        <div class="mx-1 d-inline">|</div>
      </div>
      <div v-if="isAdmin">
        <router-link router-link to="/admin" class="d-inline">Admin</router-link>
        <div class="mx-1 d-inline">|</div>
      </div>
      <div v-if="!canEdit">
        <a href="#" data-bs-toggle="modal" data-bs-target="#signupModal" class="d-inline"
          >Sign up</a
        >
        <div class="mx-1 d-inline">|</div>
      </div>
      <div>
        <a v-if="canEdit" href="#" @click="logout">Logout</a>
        <a
          v-if="!canEdit"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
          class="d-inline"
          >Log in</a
        >
        <div class="mx-1 d-inline">|</div>
      </div>
      <Light
        v-if="settings.mode === 'light'"
        width="16"
        height="16"
        class="pointer no-select"
        @click="setMode('dark')"
      />
      <Dark
        v-if="settings.mode === 'dark'"
        width="16"
        height="16"
        class="pointer no-select"
        @click="setMode('light')"
      />
    </div>
    <router-view />
    <SignupModal></SignupModal>
    <LoginModal></LoginModal>
  </div>
</template>

<script>
import Dark from '@/icons/Dark.vue'
import Light from '@/icons/Light.vue'
import LoginModal from '@/components/LoginModal.vue'
import SignupModal from '@/components/SignupModal.vue'

export default {
  components: {
    Dark,
    Light,
    LoginModal,
    SignupModal
  },
  mounted() {
    this.setMode(this.settings.mode)
  },
  methods: {
    async logout() {
      await this.post('/api/user/logout')
      this.updatePrivileges()
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    },
    setMode(mode) {
      this.settings.mode = mode
      const { body } = document
      if (mode === 'light') {
        body.classList.add('light')
        body.classList.remove('dark')
        body.removeAttribute('data-bs-theme')
      } else if (mode === 'dark') {
        body.classList.add('dark')
        body.classList.remove('light')
        body.setAttribute('data-bs-theme', 'dark')
      }
      this.jsCookie.set('mode', mode)
    }
  }
}
</script>
<style>
@font-face {
  font-family: 'Open Sans';
  src: url('/font/OpenSans-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: 'Open Sans';
  src: url('/font/OpenSans-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}
body {
  overflow-x: hidden !important;
}
#app {
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  margin-top: 26px;
}
a {
  text-decoration: none !important;
}
.is-invalid {
  background-image: none !important;
}
.footing {
  height: 3.5rem !important;
}
.footer {
  display: flex;
  justify-content: center;
  padding-top: 0.5rem !important;
  padding-bottom: 1.5rem !important;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1030;
  text-align: center !important;
}
.pointer {
  cursor: pointer;
}
.no-select {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.is-flex {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
}
nav {
  border-radius: 4px;
  padding: 12px 16px 12px 16px;
  min-height: 49px;
}
.light {
  nav {
    background-color: rgb(233, 236, 239) !important;
  }
  .icon {
    color: black;
  }
  .footer {
    background-color: white;
  }
}
.dark {
  nav {
    background-color: rgb(40, 43, 51) !important;
  }
  .icon {
    color: rgb(222, 226, 230);
  }
  .footer {
    background-color: rgb(33, 37, 41);
  }
}
.breadcrumb {
  margin: 0px;
}
.math {
  word-wrap: break-word;
  word-break: break-word;
}
.me-nav {
  margin-right: -6px;
}
textarea {
  overflow-x: hidden !important;
}
</style>
