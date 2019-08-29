<template>
  <div>
    <div>
      <span>References&nbsp;</span>
      <a class="d-inline" href="#" data-toggle="modal" data-target="#addEditReferenceInfoModal">
        <small>Info</small>
      </a>
    </div>
    <div v-for="(reference,index) in references" :key="`${reference.title}-${index}`">
      <div class="d-flex flex-row align-items-center">
        <a :id="`reference-${index}`" :href="reference.url" target="_blank">{{reference.title}}</a>
        <div v-if="reference.page">, page {{reference.page}}</div>
        <div v-if="reference.statement">, {{reference.statement}}</div>
        <button
          @click="openEditReference(index)"
          class="ml-auto btn btn-outline-secondary btn-sm mt-2"
        >Edit</button>
        <button
          @click="openDeleteReference(index)"
          class="ml-2 btn btn-outline-danger btn-sm mt-2"
        >Delete</button>
      </div>
      <div
        v-if="errors[`reference[${index}]`]"
        class="text-danger"
      >{{errors[`reference[${index}]`]}}</div>
    </div>
    <button class="btn btn-outline-secondary btn-sm mt-2" @click="openAddReference">Add reference</button>
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
    <AddEditReferenceInfo></AddEditReferenceInfo>
  </div>
</template>

<script>
import AddEditReferenceModal from "@/components/AddEditReferenceModal.vue";
import DeleteReferenceModal from "@/components/DeleteReferenceModal.vue";
import AddEditReferenceInfo from "@/components/AddEditReferenceInfo.vue";

export default {
  name: "AddEditReferences",
  props: {
    references: Array,
    errors: {}
  },
  data: function() {
    return {
      reference: null,
      deleteReference: null,
      referenceIndex: null,
      deleteReferenceIndex: null
    };
  },
  methods: {
    openAddReference: function() {
      this.referenceIndex = null;
      this.reference = {};
    },
    openEditReference: function(index) {
      this.referenceIndex = index;
      this.reference = this.references[index];
    },
    openDeleteReference: function(index) {
      this.deleteReferenceIndex = index;
      this.deleteReference = this.references[index];
    },
    addEditReferenceCallback: function(reference, index) {
      let references = this.references.map(it => ({ ...it }));
      if (index != null) {
        references[index] = reference;
      } else {
        references.push(reference);
      }
      this.$emit("changeReferences", references);
    },
    deleteReferenceCallback: function(index) {
      let references = this.references.map(it => ({ ...it }));
      references.splice(index, 1);
      this.$emit("changeReferences", references);
    },
    resetModals: function() {
      this.deleteReference = null;
      this.deleteReferenceIndex = null;
      this.reference = null;
      this.referenceIndex = null;
    }
  },
  mounted() {
    let self = this;
    $("#referenceModal").on("hidden.bs.modal", function() {
      self.resetModals();
    });
    $("#deleteReferenceModal").on("hidden.bs.modal", function() {
      self.resetModals();
    });
    for (let i = 0; i < this.references.length; i++) {
      this.render(`reference-${i}`);
    }
  },
  updated() {
    for (let i = 0; i < this.references.length; i++) {
      this.render(`reference-${i}`);
    }
  },
  components: {
    AddEditReferenceModal,
    DeleteReferenceModal,
    AddEditReferenceInfo
  }
};
</script>
