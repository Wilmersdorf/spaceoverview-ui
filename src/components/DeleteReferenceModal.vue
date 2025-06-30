<template>
  <div id="deleteReferenceModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete reference</h5>
          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div v-if="reference" class="modal-body">
          <div>
            <a :href="reference.url" target="_blank" class="d-inline math">{{ reference.title }}</a>
            <div v-if="reference.page" class="d-inline">, page {{ reference.page }}</div>
            <div v-if="reference.statement" class="d-inline">, {{ reference.statement }}</div>
          </div>
          <div class="mt-4">Do you really want to delete this reference?</div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-danger me-auto" @click="deleteReference">Delete reference</button>
          <button class="btn btn-success" data-bs-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reference: null,
    referenceIndex: null
  },
  emits: ['deleteReference'],
  watch: {
    reference() {
      if (this.reference !== null) {
        Modal.getOrCreateInstance(document.getElementById('deleteReferenceModal')).show()
        this.renderMathNow()
      }
    }
  },
  methods: {
    deleteReference() {
      this.$emit('deleteReference', this.referenceIndex)
      Modal.getInstance(document.getElementById('deleteReferenceModal')).hide()
    }
  }
}
</script>
