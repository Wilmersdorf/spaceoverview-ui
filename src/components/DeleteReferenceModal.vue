<template>
  <div class="modal fade" id="deleteReferenceModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete reference</h5>
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div v-if="reference" v-show="rendered" class="modal-body">
          <div>
            <a
              id="deleteReferenceTitle"
              :href="reference.url"
              target="_blank"
              class="d-inline"
            >{{reference.title}}</a>
            <div v-if="reference.page" class="d-inline">, page {{reference.page}}</div>
            <div v-if="reference.statement" class="d-inline">, {{reference.statement}}</div>
          </div>
          <div class="mt-4">Do you really want to delete this reference?</div>
        </div>
        <div class="modal-footer">
          <button
            @click="deleteReference"
            type="button"
            class="btn btn-danger mr-auto"
          >Delete reference</button>
          <button type="button" class="btn btn-success" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteReferenceModal",
  props: {
    reference: null,
    referenceIndex: null
  },
  watch: {
    reference: function() {
      if (this.reference != null) {
        this.rendered = false;
        $("#deleteReferenceModal").modal("show");
        this.$nextTick(() => {
          this.render("deleteReferenceTitle");
          this.rendered = true;
        });
      }
    }
  },
  data: function() {
    return {
      rendered: false
    };
  },
  methods: {
    deleteReference: function() {
      this.$emit("deleteReference", this.referenceIndex);
      $("#deleteReferenceModal").modal("hide");
    }
  }
};
</script>
