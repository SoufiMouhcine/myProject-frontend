<template>
  <div class="md">
    <div class="verticalLine">
      <b-button variant="light">+</b-button>
    </div>
    <h2>Departements</h2>
    <br />
    <div class="container">
      <div class="list-group">
        <a
          class="list-group-item list-group-item-action zoom"
          v-for="d in departement.departements"
          :key="d._id"
        >
          <div class="row list">
            <h5 class="col-md-3 dep">{{ d.name }}</h5>
            <div class="col-md-6">
              <small class="text-muted"
                >Created by {{ d.created_by.firstName }}
                {{ d.created_by.lastName }}<br />
                le {{ d.createdAt }}
              </small>
            </div>
            <div class="col-md-3 depButton">
              <button
                class="btn btn-outline-danger text-muted"
                @click="askToDelete(d)"
              >
                Delete
              </button>
              <div class="divider" />
              <button
                class="text-muted btn btn-outline-info"
                @click="askToUpdate(d)"
              >
                Update
              </button>
            </div>
          </div>
        </a>
      </div>
      <deleteModal
        :message="modalDeleteMessage"
        :isOpen="showDeleteModal"
        @handleNo="closeModal"
        @handleYes="deleteDep"
      >
      </deleteModal>
      <updateModal
        :title="title"
        :message="modalMessage"
        :isOpen="showUpdateModal"
        @handleNo="closeModal"
        @handleYes="updateDep"
      >
      </updateModal>
      <br />
      <div class="col-md-3 dep">
        <b-button variant="secondary" @click="askToUpdate"
          >Add departement</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import deleteModal from "@/components/deleteModal";
import updateModal from "@/components/updateModal";

export default {
  name: "Departements",
  data() {
    return {
      departementToDelete: null,
      departementToUpdate: null,
      showDeleteModal: false,
      showUpdateModal: false,
    };
  },
  components: {
    deleteModal,
    updateModal,
  },
  async created() {
    await this.loadDepartements();
  },
  methods: {
    ...mapActions([
      "getDepartementsAction",
      "deleteDepartement",
      "updateDepartement",
      "AddDepartement",
    ]),
    async loadDepartements() {
      await this.getDepartementsAction();
    },
    askToDelete(departement) {
      this.departementToDelete = departement;
      this.showDeleteModal = true;
    },
    askToUpdate(departement) {
      this.departementToUpdate = departement;

      this.showUpdateModal = true;
      console.log(this.showUpdateModal);
    },
    closeModal() {
      this.showDeleteModal = false;
      this.showUpdateModal = false;
    },
    async deleteDep() {
      this.closeModal();
      if (this.departementToDelete) {
        await this.deleteDepartement(this.departementToDelete);
      }
      await this.loadDepartements();
    },
    async updateDep(name) {
      this.closeModal();
      this.departementToUpdate._id
        ? await this.updateDepartement({
            name: name,
            departement: this.departementToUpdate,
          })
        : await this.AddDepartement(name);
      await this.loadDepartements();
    },
  },
  computed: {
    ...mapState(["departement"]),
    modalDeleteMessage() {
      const name =
        this.departementToDelete && this.departementToDelete.name
          ? this.departementToDelete.name
          : "";
      return `Would you like to delete ${name} departement ?`;
    },
    modalMessage() {
      const name =
        this.departementToUpdate && this.departementToUpdate.name
          ? `Would you like to update ${this.departementToUpdate.name} departement name`
          : "write the name of new departement to add";
      console.log(name);
      return name;
    },
    title() {
      const name =
        this.departementToUpdate && this.departementToUpdate.name
          ? `Update ${this.departementToUpdate.name} departement`
          : "Add département";
      console.log(name);
      return name;
    },
  },
};
</script>

<style>
@import "../design/style.css";
</style>
