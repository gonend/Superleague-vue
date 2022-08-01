<template>
  <div id="app">
    <b-navbar  toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand :to="{ name: 'main' }">Superliga Vue</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          
          <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
          <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
          <b-nav-item :to="{ name: 'currentRound' }">Current Round</b-nav-item>
          <b-nav-item-dropdown v-if="$root.store.user">
            <template #button-content>
              Personal
            </template>
            <b-dropdown-item :to="{ name: 'favoriteGames' }"
              >Favorites Games</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item
            :to="{ name: 'manage' }"
            v-if="$root.store.user && $root.store.user.isAdmin"
            >Manage</b-nav-item
          >
        
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!$root.store.user">
          Hello Guest
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <v-avatar>
            <img
              :src="$root.store.user.picture"
              :alt="$root.store.user.firstName"
            />
          </v-avatar>
          <b-nav-item-dropdown right>
            <template #button-content>
              {{ $root.store.user.firstName }} {{ $root.store.user.lastName }}
            </template>
            <b-dropdown-item v-on:click="Logout">Log Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
@import "./assets/style.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("./assets/back2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}



#nav {
  padding: 40px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #EFEFEF;
}

 .navbar.navbar-dark.bg-dark{
    background-color: RGBA(33,108,5,0.49)!important;
 }
</style>