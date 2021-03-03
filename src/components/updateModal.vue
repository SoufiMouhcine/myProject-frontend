<template>
  <div>
    <b-modal
      v-model="isOpen"
      title="Update Departement"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      @cancel="onNo"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Departement new Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "updateModal",
  props: {
    message: {
      type: String,
      default: () => "",
    },
    isOpen: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      name: "",
      nameState: null,
      submittedNames: [],
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    onNo() {
      this.$emit("handleNo");
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name);
      // Hide the modal manually
      this.$emit('handleYes',this.name)
    },
  },
};
</script>