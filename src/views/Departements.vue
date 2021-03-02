<template>
  <div class="md">
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
              <button class="text-muted btn btn-outline-info">Update</button>
            </div>
          </div>
        </a>
      </div>
      <Modal
        :message="modalMessage"
        :isOpen="showModal"
        @handleNo="closeModal"
        @handleYes="deleteHero"
      >
      </Modal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Modal from "@/components/modal";

export default {
  name: "Departements",
  data() {
    return {
      departementToDelete: null,
      showModal: false,
    };
  },
    components: {
    Modal,
  },
  async created() {
    await this.loadDepartements();
  },
  methods: {
    ...mapActions(["getDepartementsAction", "deleteDepartement"]),
    async loadDepartements() {
      console.log("azeaea");
      await this.getDepartementsAction();
    },
    askToDelete(departement) {
      console.log("clok");
      this.departementToDelete = departement;
      console.log(this.showModal);
      this.showModal = true;
      console.log(this.showModal);
    },
    closeModal() {
      this.showModal = false;
    },
    async deleteHero() {
      this.closeModal();
      if (this.departementToDelete) {
        await this.deleteDepartement(this.departementToDelete);
      }
      await this.loadDepartements();
    },
  },
  computed: {
    ...mapState(["departement"]),
    modalMessage() {
      const name =
        this.departementToDelete && this.departementToDelete.name
          ? this.departementToDelete.name
          : "";
      return `Would you like to delete ${name} ?`;
    },
  },
};
</script>

<style>
@import "../design/style.css";
</style>
