<template>
  <div class="container">
    <h2 class="title col-md-3">{{ title.title }}</h2>
    <br />
    <div class="col-md-9">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {{ clonedUser.firstName }} {{ clonedUser.lastName }}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label">first name</label>
              <input
                class="input"
                :disabled="disabled"
                v-model="clonedUser.firstName"
              />
            </div>
            <div class="field">
              <label class="label">last name</label>
              <input
                class="input"
                :disabled="disabled"
                name="lastName"
                v-model="clonedUser.lastName"
              />
            </div>
            <div class="field">
              <label class="label">email</label>
              <input
                class="input"
                :disabled="disabled"
                name="description"
                v-model="clonedUser.email"
              />
            </div>
            <div class="field" v-if="addMode">
              <label class="label">password</label>
              <input
                class="input"
                :disabled="disabled"
                name="password"
                type="password"
                v-model="clonedUser.password"
              />
            </div>
            <div class="field" v-if="addMode">
              <label class="label">département</label>
              <b-form-select v-model="clonedUser.departement_id" class="mb-3">
                <b-form-select-option :value="null" disabled
                  >-- Please select département --</b-form-select-option
                >

                <b-form-select-option
                  v-for="d in departement.departements"
                  :key="d._id"
                  :value="d._id"
                  >{{ d.name }}</b-form-select-option
                >
              </b-form-select>
            </div>
            <div class="field" v-if="clonedUser.departement_id && !addMode">
              <label class="label">département</label>
              <input
                class="input"
                :disabled="disabled"
                name="dep"
                v-model="clonedUser.departement_id.name"
              />
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <button
            class="link card-footer-item card-footerbutton"
            @click="cancelUser"
          >
            <b-icon icon="arrow-counterclockwise" aria-hidden="true"></b-icon>
            <span class="right">{{title.retour}}</span>
          </button>
          <button v-if="addMode"
            class="link card-footer-item card-footerbuttoncheck"
            @click="saveUser()"
          >
            <b-icon icon="cloud-upload" aria-hidden="true"></b-icon>
            <span class="right">Save</span>
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "userDetail",
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    addMode: {
      type: Boolean,
      default: false,
    },
    title: {
      type: Object,
      default: ()=>{},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      clonedUser: {},
    };
  },
  async created() {
    if (this.addMode) {
      this.clonedUser = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        departement_id: null,
      };
      await this.loadDepartements();
    } else {
      console.log("azejazoejaozejazejaez");
      this.clonedUser = { ...this.user };
    }
  },
  methods: {
    ...mapActions(["getDepartementsAction"]),
    async loadDepartements() {
      await this.getDepartementsAction();
      console.log(this.departement.departements);
    },
    cancelUser() {
      this.$emit("cancel");
    },
    saveUser() {
      this.$emit("save", this.clonedUser);
    },
  },
  computed: {
    ...mapState(["departement"]),
  },
};
</script>

<style scoped>
@import "../design/style.css";
</style>