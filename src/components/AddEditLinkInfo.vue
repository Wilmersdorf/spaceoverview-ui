<template>
  <div class="modal fade" id="addEditLinkFieldInfoModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Selection explanation</h5>
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div id="modalBody" class="modal-body">
          <ol>
            <li>There are currently 8 options to link a property to a space.</li>
            <li>If the space actually describes a collection of spaces, the selected statement must apply to all spaces.</li>
            <li>
              If the option "Real" is selected, this means that the property always applies in the real case, but no statement is made about the complex case.
              This happens if
              <ul class="mb-0">
                <li>The author is not sure if the property always applies or doesn't apply in the complex case.</li>
                <li>The property is sometimes true and sometimes false in the complex case.</li>
              </ul>If it is known that the property always applies in the real but never in the complex case, the option "Real and not complex" should be choosen instead.
            </li>
            <li>
              Similar to point 3), the option
              <ul class="mb-0">
                <li>"Not real" doesn't make a statement about the complex case.</li>
                <li>"Complex" doesn't make a statement about the real case.</li>
                <li>"Not complex" doesn't make a statement about the real case.</li>
              </ul>
            </li>
            <li>Depending on the fields of the space and property, fewer than 8 options might be available for selection.</li>
          </ol>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddEditLinkInfo"
};
</script>