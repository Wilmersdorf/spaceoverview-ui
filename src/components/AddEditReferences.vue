<template>
  <div>
    <div class="d-flex">
      <div class="me-1">References</div>
      <a href="#" data-bs-toggle="modal" data-bs-target="#addEditReferenceInfoModal">
        <small>Info</small>
      </a>
    </div>
    <div v-for="(item, index) in references" :key="`${item.title}-${index}`">
      <div class="d-flex align-items-center">
        <div class="me-2">
          <a :href="item.url" target="_blank" class="math d-inline">{{ item.title }}</a>
          <div v-if="item.page" class="d-inline text-break">, page {{ item.page }}</div>
          <div v-if="item.statement" class="d-inline text-break">, {{ item.statement }}</div>
        </div>
        <button
          class="ms-auto btn btn-outline-secondary btn-sm mt-2"
          @click="openEditReference(index)"
        >
          Edit
        </button>
        <button class="ms-2 btn btn-outline-danger btn-sm mt-2" @click="openDeleteReference(index)">
          Delete
        </button>
      </div>
      <div v-if="errors[`reference[${index}]`]" class="text-danger">
        {{ errors[`reference[${index}]`] }}
      </div>
    </div>
    <button class="btn btn-outline-secondary btn-sm mt-2" @click="openAddReference">
      Add reference
    </button>
    <AddEditReferenceModal
      :reference="reference"
      :referenceIndex="referenceIndex"
      @addEditReference="addEditReferenceCallback"
    ></AddEditReferenceModal>
    <DeleteReferenceModal
      :reference="deleteReference"
      :referenceIndex="deleteReferenceIndex"
      @deleteReference="deleteReferenceCallback"
    ></DeleteReferenceModal>
    <AddEditReferenceInfoModal />
  </div>
</template>

<script>
import AddEditReferenceInfoModal from '@/components/AddEditReferenceInfoModal.vue'
import AddEditReferenceModal from '@/components/AddEditReferenceModal.vue'
import DeleteReferenceModal from '@/components/DeleteReferenceModal.vue'

export default {
  components: {
    AddEditReferenceInfoModal,
    AddEditReferenceModal,
    DeleteReferenceModal
  },
  props: {
    references: Array,
    errors: Object
  },
  emits: ['changeReferences'],
  data() {
    return {
      reference: null,
      deleteReference: null,
      referenceIndex: null,
      deleteReferenceIndex: null
    }
  },
  mounted() {
    document.getElementById('referenceModal').addEventListener('hidden.bs.modal', () => {
      this.resetModals()
    })
    document.getElementById('deleteReferenceModal').addEventListener('hidden.bs.modal', () => {
      this.resetModals()
    })
    this.renderMathNow()
  },
  updated() {
    this.renderMathNow()
  },
  methods: {
    openAddReference() {
      this.referenceIndex = null
      this.reference = {}
    },
    openEditReference(index) {
      this.referenceIndex = index
      this.reference = this.references[index]
    },
    openDeleteReference(index) {
      this.deleteReferenceIndex = index
      this.deleteReference = this.references[index]
    },
    addEditReferenceCallback(reference, index) {
      const references = this.clone(this.references)
      if (index !== null) {
        references[index] = reference
      } else {
        references.push(reference)
      }
      this.$emit('changeReferences', references)
    },
    deleteReferenceCallback(index) {
      const references = this.clone(this.references)
      references.splice(index, 1)
      this.$emit('changeReferences', references)
    },
    resetModals() {
      this.deleteReference = null
      this.deleteReferenceIndex = null
      this.reference = null
      this.referenceIndex = null
    }
  }
}
</script>
