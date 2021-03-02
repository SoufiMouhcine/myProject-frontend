<template>
<div id="modal" class="modal" :class="{ 'aria-hidden': isOpen }" tabindex="-1" >
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Confirm</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>{{ message }}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="onNo">No</button>
        <button type="button" class="btn btn-primary" @click="onYes">Yes</button>
      </div>
    </div>
  </div>
</div>
</template>



<script>
export default {
  name: 'Modal',
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

