<template>
  <div class="modal fade" id="referenceModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add reference</h5>
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div v-if="referenceUi" class="modal-body">
          Please provide either an Arxiv id or English Wikipedia url or BibTeX.
          <div
            class="alert alert-danger mt-2"
            v-if="referenceErrors['general']"
          >{{referenceErrors["general"]}}</div>
          <form
            @submit.prevent
            id="referenceForm"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          >
            <div class="form-group mt-4">
              <label for="arxivId">Arxiv id</label>
              <input
                class="form-control"
                id="arxivId"
                name="arxivId"
                v-model="referenceUi.arxivId"
                placeholder="1234.56789"
                :class="{ 'is-invalid': referenceErrors['arxivId'] }"
              />
              <div class="invalid-feedback">{{referenceErrors["arxivId"]}}</div>
            </div>
            <div class="form-group mt-4">
              <label for="wikipediaUrl">English Wikipedia url</label>
              <input
                class="form-control"
                id="wikipediaUrl"
                name="wikipediaUrl"
                v-model="wikipediaUrl"
                placeholder="https://en.wikipedia.org/wiki/Lp_space"
                :class="{ 'is-invalid': referenceErrors['wikipediaUrl'] }"
              />
              <div class="invalid-feedback">{{referenceErrors["wikipediaUrl"]}}</div>
            </div>
            <div class="form-group mt-4">
              <label for="bibtex">BibTeX</label>
              <textarea
                class="form-control"
                id="bibtex"
                name="bibtex"
                v-model="referenceUi.bibtex"
                rows="10"
                :class="{ 'is-invalid': referenceErrors['bibtex'] }"
              />
              <div class="invalid-feedback">{{referenceErrors['bibtex']}}</div>
            </div>
            {{referenceErrors['bibtex']}}
            <div class="form-group mt-4">
              <label for="page">Page (Optional)</label>
              <input
                class="form-control"
                id="page"
                name="page"
                v-model="referenceUi.page"
                placeholder="2"
                :class="{ 'is-invalid': referenceErrors['page'] }"
              />
              <div class="invalid-feedback">{{referenceErrors['page']}}</div>
            </div>
            <div class="form-group mt-4">
              <label for="statement">Statement (Optional)</label>
              <input
                class="form-control"
                id="statement"
                name="statement"
                v-model="referenceUi.statement"
                placeholder="Theorem 3.4"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            @click="submitReference"
            type="button"
            class="btn btn-primary mr-auto"
          >{{leftButtonLabel}}</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">{{rightButtonLabel}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddEditReferenceModal",
  props: {
    reference: null,
    referenceIndex: null
  },
  watch: {
    reference: function() {
      this.referenceErrors = {};
      if (this.reference != null) {
        this.referenceUi = { ...this.reference };
        if (this.referenceUi.wikipediaId !== null) {
          this.wikipediaUrl = this.referenceUi.url;
        } else {
          this.wikipediaUrl = null;
        }
        $("#referenceModal").modal("show");
      }
    }
  },
  data: function() {
    return {
      referenceErrors: {},
      referenceUi: null,
      wikipediaUrl: null
    };
  },
  computed: {
    leftButtonLabel: function() {
      return this.referenceIndex === null
        ? "Add reference"
        : "Update reference";
    },
    rightButtonLabel: function() {
      return this.referenceIndex === null ? "Close" : "Cancel";
    },
    title: function() {
      return this.referenceIndex === null ? "Add reference" : "Edit reference";
    }
  },
  methods: {
    submitReference: function() {
      let form = $("#referenceForm");
      let json = this.convertFormToJson(form);
      let errors = {};
      let arxivId = json.arxivId;
      let bibtex = json.bibtex;
      let wikipediaUrl = json.wikipediaUrl;
      let page = json.page;
      let statement = json.statement;
      let contentCount =
        (arxivId ? 1 : 0) + (wikipediaUrl ? 1 : 0) + (bibtex ? 1 : 0);
      if (contentCount === 0) {
        errors["general"] =
          "Please provide either an Arxiv id or an English Wikipedia url or BibTeX.";
      } else if (contentCount >= 2) {
        errors["general"] =
          "Please provide either an Arxiv id or an English Wikipedia url or BibTeX, but not more than one.";
      }
      if (
        page != null &&
        (!isFinite(page) || parseInt(page) < 0 || parseInt(page) > 100000)
      ) {
        errors["page"] =
          "Please enter a single positive number or leave empty.";
      }
      if ($.isEmptyObject(errors)) {
        let pageNumber = page ? parseInt(page) : null;
        if (!isEmpty(wikipediaUrl)) {
          if (!wikipediaUrl.startsWith("https://en.wikipedia.org/wiki/")) {
            this.showError("wikipediaUrl", "Unable to parse Wikipedia url.");
          } else {
            let name = wikipediaUrl.slice(
              "https://en.wikipedia.org/wiki/".length
            );
            this.$http
              .get(
                `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${name}&origin=*`
              )
              .then(response => {
                let title = response.data.parse.title;
                let pageid = response.data.parse.pageid;
                if (title !== null && pageid !== null) {
                  let reference = {
                    url:
                      `https://en.wikipedia.org/wiki/` +
                      title.replace(new RegExp(" ", "g"), "_"),
                    arxivId: null,
                    wikipediaId: pageid,
                    bibtex: null,
                    title: title,
                    page: pageNumber,
                    statement: statement
                  };
                  this.emitReference(reference);
                } else {
                  this.showError(
                    "wikipediaUrl",
                    "Unable to parse Wikipedia url."
                  );
                }
              })
              .catch(() => {
                this.showError(
                  "wikipediaUrl",
                  "Unable to parse Wikipedia url."
                );
              });
          }
        } else if (!isEmpty(arxivId)) {
          this.$http
            .get(
              `https://export.arxiv.org/api/query?search_query=&id_list=${arxivId}`,
              { responseType: "text" }
            )
            .then(response => {
              let self = this;
              this.$xml.parseString(response.data, function(err, result) {
                let title = result.feed.entry[0].title[0];
                let reference = {
                  url: `https://arxiv.org/abs/${arxivId}`,
                  arxivId: arxivId,
                  wikipediaId: null,
                  title: title,
                  page: pageNumber,
                  statement: statement,
                  bibtex: null
                };
                self.emitReference(reference);
              });
            })
            .catch(() => {
              this.showError("arxivId", "Please enter a valid Arxiv id.");
            });
        } else {
          try {
            let json = this.$bibtex.toJSON(bibtex);
            let title = json[0].entryTags.title;
            if (isEmpty(title)) {
              this.showError("bibtex", "Please provide BibTex with a title.");
            } else {
              let url = json[0].entryTags.url;
              let reference = {
                url: url,
                arxivId: null,
                wikipediaId: null,
                title: title,
                page: pageNumber,
                statement: statement,
                bibtex: bibtex
              };
              this.emitReference(reference);
            }
          } catch (error) {
            this.showError("bibtex", "Unable to parse BibTex.");
          }
        }
      } else {
        this.referenceErrors = errors;
      }
    },
    showError: function(key, value) {
      this.referenceErrors = { [key]: value };
    },
    emitReference: function(reference) {
      $("#referenceModal").modal("hide");
      this.referenceErrors = {};
      this.$emit("addEditReference", reference, this.referenceIndex);
    }
  }
};
</script>
