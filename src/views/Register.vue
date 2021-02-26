<template>
  <div class="container">
    <h1>Register to My Project</h1>
    <br />
    <br />
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <form @submit.prevent="register()">
          <div class="row">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="First name"
                aria-label="First name"
                required
                v-model="user.firstName"
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Last name"
                aria-label="Last name"
                required
                v-model="user.lastName"
              />
            </div>
          </div>
          <br />
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              required
              v-model="user.email"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
              v-model="user.password"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              required
              placeholder="Confirm Password"
              v-model="confirmPassword"
            />
          </div>
          <br />
          <button class="btn-lg btn-primary">Register</button>
        </form>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "register",
  data() {
    return {
      confirmPassword: "",
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["registerAction"]),
    async register() {
      if (this.confirmPassword != this.user.password) {
        alert("Password do not much");
      } else if (this.user.password.length < 6) {
        alert("Password length should be greater than 6");
      } else {
        await this.registerAction(this.user);
      }
      alert("compte créer avec succes");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
</style>