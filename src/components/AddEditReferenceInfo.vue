<template>
  <div class="modal fade" id="addEditReferenceInfoModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">References explanation</h5>
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div id="modalBody" class="modal-body">
          <ul>
            <li>One can add references to arxiv, wikipedia or via bibtex.</li>
            <li>
              The purpose of a reference is to allow another user to verify that the entered information is correct.
              In their current form, references are not meant to provide a complete overview of all papers related to a space or property.
            </li>
            <li>References can for example be used to:</li>
            <ul>
              <li>In the case of spaces / properties, reference the paper where the space or property was first defined.</li>
              <li>If a property or space has changed their definition over time, or if the original paper is not in English, reference an additional paper where the space or property is mentioned in its current form.</li>
              <li>In the case of a link between a space and a property, reference a paper which proves that the space has / lacks the property.</li>
            </ul>
            <li>We recommend references to resources that are openly available like arxiv or wikipedia.</li>
            <li>
              For adding books, one option is to use
              <a
                href="https://books.google.com"
                target="_blank"
              >Google Books</a>.
            </li>
            <ul>
              <li>
                For a given book, click on
                <span class="action">About this book</span> on the left side.
              </li>
              <li>
                Scroll to the bottom of the page, click
                <span class="action">BibTex</span>, and copy the content into the BibTeX field.
              </li>
            </ul>
          </ul>
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
  name: "AddEditReferenceInfo"
};
</script>