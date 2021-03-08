<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">My Project</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 menu-list">
          <li
            class="nav-item"
            v-if="account.login.loggedIn == true || this.userId"
          >
            <router-link class="nav-link" to="/users">Users</router-link>
          </li>
          <li
            class="nav-item"
            v-if="account.login.loggedIn == true || this.userId"
          >
            <router-link class="nav-link" to="/departements"
              >Departements</router-link
            >
          </li>
        </ul>

        <div v-if="account.login.loggedIn == true || this.userId">
          <router-link
            class="btn btn-outline-primary"
            to="/login"
            @click.native="logout()"
          >
            <b-icon icon="power" aria-hidden="true"></b-icon> Logout
          </router-link>
        </div>

        <form
          class="d-flex"
          v-if="account.login.loggedIn != true && this.userId == undefined"
        >
          <router-link class="nav-link" to="/login">Login</router-link>
          <router-link class="btn btn-outline-primary" to="/register">
            Register
          </router-link>
        </form>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      userId: undefined,
    };
  },
  created() {
    this.userId = localStorage.getItem("userId");
    console.log(this.loggedIn);
  },
  computed: {
    ...mapState(["account"]),
  },
  methods: {
    ...mapActions(["logoutAction"]),
    logout() {
      this.userId = undefined;
      this.logoutAction();
    },
  },
};
</script>