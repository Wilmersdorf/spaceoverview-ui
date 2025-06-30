<template>
  <div id="addEditReferenceInfoModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">References explanation</h5>
          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <ul>
            <li>One can add references to Arxiv, Wikipedia or via BibTeX.</li>
            <li>
              The purpose of a reference is to allow other users to verify that the entered
              information is correct. In their current form, references are not meant to provide a
              complete overview of all papers related to an entity.
            </li>
            <li>References can for example be used to:</li>
            <ul>
              <li>
                Reference the paper where the entity was first defined (space, differential
                equation, property) or proved (theorem).
              </li>
              <li>
                If an entity has changed its definition over time, or if the original paper is not
                in English, reference an additional paper where the entity is mentioned in its
                current form.
              </li>
              <li>
                In the case of a link, reference a paper which proves that the space or differential
                equation has or lacks the property.
              </li>
            </ul>
            <li>
              We recommend references to resources that are openly available like Arxiv or
              Wikipedia.
            </li>
            <li>
              For adding books, one option is to use
              <a href="https://books.google.com" target="_blank">Google Books</a>.
            </li>
            <ul>
              <li>
                For a given book, click on
                <div class="text-success d-inline">Create citation</div>
                and then
                <div class="text-success d-inline">BibTeX</div>
                <div class="d-inline">.</div>
              </li>
              <li>Copy the content into the BibTeX field.</li>
            </ul>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
