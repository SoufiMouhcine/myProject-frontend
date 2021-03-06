<template>
  <div class="container">
    <div class="title col-md-3" v-if="!selectedUser && !isAddMode">
      Users
      <button class="button add-button" @click="addUser">
        <b-icon
          icon="person-plus-fill"
          font-scale="2"
          aria-hidden="true"
        ></b-icon>
      </button>
    </div>

    <br />
    <div v-if="!selectedUser && !isAddMode">
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
              @click="selectUser(user)"
            >
              <b-icon icon="check2" aria-hidden="true"></b-icon>
              <span class="right">Select</span>
            </button>
          </footer>
        </div>
      </div>
    </div>
    <deleteModal
      :message="modalDeleteMessage"
      :isOpen="showDeleteModal"
      @handleNo="closeModal"
      @handleYes="deleteUser"
    >
    </deleteModal>
    <userDetail
      :user="selectedUser"
      :addMode="isAddMode"
      :title="titleToShow"
      v-if="selectedUser || isAddMode"
      @cancel="cancelUser"
      @save="saveUser"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import deleteModal from "@/components/deleteModal";
import userDetail from "./User-detail.vue";

export default {
  name: "Users",
  data() {
    return {
      isAddMode: undefined,
      userToDelete: null,
      showDeleteModal: false,
      selectedUser: undefined,
    };
  },
  components: {
    deleteModal,
    userDetail,
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
    titleToShow() {
      const name =
        this.selectedUser
          ? "User info"
          : "ADD USER";
      return name;
    },
  },
  async created() {
    await this.loadUsers();
  },
  methods: {
    ...mapActions(["loadUserAction", "deleteUserAction", "addUserAction"]),
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
        await this.deleteUserAction(this.userToDelete);
      }
      await this.loadUsers();
    },
    selectUser(user) {
      this.selectedUser = user;
      console.log(this.selectedUser);
    },
    addUser() {
      this.isAddMode = true;
    },
    cancelUser() {
      this.selectedUser = undefined;
      this.isAddMode = undefined;
    },
    async saveUser(user) {
      await this.addUserAction(user);
      this.isAddMode = undefined;
      await this.loadUsers();
    },
  },
};
</script>

<style scoped>
</style>

<style>
@import "../design/style.css";
</style>