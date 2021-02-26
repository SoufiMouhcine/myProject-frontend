<template>
  <div class="container">
    <h1>Login to My Project</h1>
    <br />
    <br />
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <form @submit.prevent="login()">
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Email"
              v-model="email"
              required
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="password"
              required
            />
          </div>

          <button class="btn btn-primary" type="submit">Login</button>
        </form>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log(this.password);
      console.log(this.email);
    },
  },
};
</script>

<style scoped>
</style>