<template>
  <b-modal id="modal-center" centered v-model="isOpen" @ok="onYes" @cancel="onNo" title="Confirm" ok-title = "Yes" ok-variant=danger>
<p class="my-4">{{message}}</p>
  </b-modal>
</template>

<script>
export default {
  name: 'deleteModal',
  props: {
    message: {
      type: String,
      default: () => '',
    },
    isOpen: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    onNo() {
      this.$emit('handleNo');
    },
    onYes() {
      this.$emit('handleYes');
    },
  },
};
</script>

<style lang="scss"></style>
