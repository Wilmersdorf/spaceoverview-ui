<template>
  <div id="addEditLinkFieldInfoModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Selection explanation</h5>
          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <ol>
            <li>There are currently 8 options to link a property to a space.</li>
            <li>
              If the space actually describes a collection of spaces, the selected statement must
              apply to all spaces.
            </li>
            <li>
              If the option "Real" is selected, this means that the property always applies in the
              real case, but no statement is made about the complex case. This happens if
              <ul>
                <li>
                  The author is not sure if the property always applies or doesn't apply in the
                  complex case.
                </li>
                <li>The property is sometimes true and sometimes false in the complex case.</li>
              </ul>
              If it is known that the property always applies in the real but never in the complex
              case, the option "Real and not complex" should be choosen instead.
            </li>
            <li>
              Similar to point 3), the option
              <ul>
                <li>"Not real" doesn't make a statement about the complex case.</li>
                <li>"Complex" doesn't make a statement about the real case.</li>
                <li>"Not complex" doesn't make a statement about the real case.</li>
              </ul>
            </li>
            <li>
              Depending on the fields of the space and property, fewer than 8 options might be
              available for selection.
            </li>
          </ol>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
