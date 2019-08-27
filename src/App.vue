<template>
  <div id="app">
    <div id="nav" style="text-align: center;">
      <router-link to="/">Home</router-link>&nbsp;|
      <router-link to="/space">Spaces</router-link>&nbsp;|
      <router-link to="/property">Properties</router-link>
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
import SignupModal from "@/components/SignupModal.vue";
import LoginModal from "@/components/LoginModal.vue";

export default {
  components: {
    SignupModal,
    LoginModal
  },
  methods: {
    logout: function() {
      this.$http.post("/api/user/logout").then(() => {
        this.updatePrivileges();
        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
      });
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
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
</style>
