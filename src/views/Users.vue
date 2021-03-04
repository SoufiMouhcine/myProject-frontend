<template>
  <div class="container">
    <h2 class="title col-md-3">Users</h2>
    <br />
    <div class="col-md-10" v-for="user in user.users" :key="user._id">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <div class="name">{{ user.firstName }} {{ user.lastName }}</div>
            <div class="description">{{ user.email }}</div>
          </div>
        </div>
        <footer class="card-footer">
          <button
            class="link card-footer-item card-footerbutton"
            @click="askToDelete(user)"
          >
            <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
            <span class="right">Delete</span>
          </button>
          <button
            class="link card-footer-item card-footerbuttoncheck"
            @click="askToDelete(hero)"
          >
            <b-icon icon="check2" aria-hidden="true"></b-icon>
            <span class="right">Select</span>
          </button>
        </footer>
      </div>
    </div>
    <deleteModal
      :message="modalDeleteMessage"
      :isOpen="showDeleteModal"
      @handleNo="closeModal"
      @handleYes="deleteUser"
    >
    </deleteModal>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import deleteModal from "@/components/deleteModal";

export default {
  name: "Users",
  data() {
    return {
      userToDelete: null,
      showDeleteModal: false,
    };
  },
  components: {
    deleteModal,
  },
  computed: {
    ...mapState(["user"]),
    modalDeleteMessage() {
      const name =
        this.userToDelete && this.userToDelete.firstName
          ? this.userToDelete.firstName + " " + this.userToDelete.lastName
          : "";
      return `Would you like to delete ${name} ?`;
    },
  },
  async created() {
    await this.loadUsers();
  },
  methods: {
    ...mapActions(["loadUserAction", "deleteUser"]),
    async loadUsers() {
      await this.loadUserAction();
    },
    askToDelete(user) {
      this.userToDelete = user;
      this.showDeleteModal = true;
    },
    closeModal() {
      this.showDeleteModal = false;
    },
    async deleteUser() {
      this.closeModal();
      if (this.userToDelete) {
        await this.deleteUser(this.departementToDelete);
      }
      await this.loadDepartements();
    },
  },
};
</script>

<style scoped>
</style>

<style>
@import "../design/style.css";
</style>