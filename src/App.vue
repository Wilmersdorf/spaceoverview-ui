<template>
  <div id="app">
    <div id="nav" style="text-align: center;">
      <router-link to="/">Home</router-link>&nbsp;|
      <router-link to="/space">Spaces</router-link>&nbsp;&#45;
      <router-link to="/property">Properties</router-link>&nbsp;&#45;
      <router-link to="/theorem">Theorems</router-link>&nbsp;|
      <router-link to="/differential-equation">Differential&#8201;Equations</router-link>&nbsp;&#45;
      <router-link to="/differential-equation/property">Properties</router-link>
      <span v-if="canEdit">&nbsp;|&nbsp;</span>
      <router-link v-if="canEdit" to="/info">Info</router-link>
      <span v-if="isAdmin">&nbsp;|&nbsp;</span>
      <router-link v-if="isAdmin" router-link to="/admin">Admin</router-link>
      <span v-if="!canEdit">&nbsp;|&nbsp;</span>
      <a class v-if="!canEdit" href="#" data-toggle="modal" data-target="#signupModal">Sign up</a>
      <span v-if="!canEdit">&nbsp;|&nbsp;</span>
      <a v-if="!canEdit" href="#" data-toggle="modal" data-target="#loginModal">Log in</a>
      <span v-if="canEdit">&nbsp;|&nbsp;</span>
      <a href="#" v-if="canEdit" @click="logout">Logout</a>
    </div>
    <router-view />
    <SignupModal></SignupModal>
    <LoginModal></LoginModal>
  </div>
</template>

<script>
import SignupModal from '@/components/SignupModal.vue'
import LoginModal from '@/components/LoginModal.vue'

export default {
  components: {
    SignupModal,
    LoginModal
  },
  methods: {
    logout() {
      this.$http.post('/api/user/logout').then(() => {
        this.updatePrivileges()
        if (this.$route.path !== '/') {
          this.$router.push('/')
        }
      })
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
  overflow-y: scroll;
}
#app {
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50; */
  margin-top: 26px;
}
a {
  text-decoration: none !important;
}
.is-invalid {
  background-image: none !important;
}
.action {
  color: #17a2b8 !important;
}
.footing {
  height: 3.5rem !important;
}
.footer {
  background-color: white !important;
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
.checkbox {
  width: 13px;
  height: 13px;
  padding: 0;
  margin: 0;
  vertical-align: bottom;
  position: relative;
  top: -6.5px;
}
.underline {
  text-decoration: underline;
}
</style>
