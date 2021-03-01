<template>
  <div>Hello {{ account.login.loggedIn }} and {{ account.login.user.firstName }}</div>

</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Users",
  computed: {
    ...mapState(["account"]),
  },
};
</script>

<style scoped>
</style>
