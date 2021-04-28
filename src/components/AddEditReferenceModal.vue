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
          <div class="alert alert-danger mt-2" v-if="referenceErrors['general']">
            {{ referenceErrors['general'] }}
          </div>
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
              <div class="invalid-feedback">{{ referenceErrors['arxivId'] }}</div>
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
              <div class="invalid-feedback">{{ referenceErrors['wikipediaUrl'] }}</div>
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
              <div class="invalid-feedback">{{ referenceErrors['bibtex'] }}</div>
            </div>
            {{ referenceErrors['bibtex'] }}
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
              <div class="invalid-feedback">{{ referenceErrors['page'] }}</div>
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
          <button @click="submitReference" type="button" class="btn btn-primary mr-auto">
            {{ leftButtonLabel }}
          </button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            {{ rightButtonLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddEditReferenceModal',
  props: {
    reference: null,
    referenceIndex: null
  },
  watch: {
    reference() {
      this.referenceErrors = {}
      if (this.reference !== null) {
        this.referenceUi = this.clone(this.reference)
        if (this.referenceUi.wikipediaId !== null) {
          this.wikipediaUrl = this.referenceUi.url
        } else {
          this.wikipediaUrl = null
        }
        $('#referenceModal').modal('show')
      }
    }
  },
  data() {
    return {
      referenceErrors: {},
      referenceUi: null,
      wikipediaUrl: null
    }
  },
  computed: {
    leftButtonLabel() {
      return this.referenceIndex === null ? 'Add reference' : 'Update reference'
    },
    rightButtonLabel() {
      return this.referenceIndex === null ? 'Close' : 'Cancel'
    },
    title() {
      return this.referenceIndex === null ? 'Add reference' : 'Edit reference'
    }
  },
  methods: {
    submitReference() {
      const formJson = this.convertFormToJson('referenceForm')
      const errors = {}
      const { arxivId, bibtex, wikipediaUrl, page, statement } = formJson
      const contentCount = (arxivId ? 1 : 0) + (wikipediaUrl ? 1 : 0) + (bibtex ? 1 : 0)
      if (contentCount === 0) {
        errors.general = 'Please provide either an Arxiv id or an English Wikipedia url or BibTeX.'
      } else if (contentCount >= 2) {
        errors.general =
          'Please provide either an Arxiv id or an English Wikipedia url or BibTeX, but not more than one.'
      }
      const pageNumber = page ? parseInt(page, 10) : null
      if (page !== null && (Number.isNaN(pageNumber) || pageNumber < 0 || pageNumber > 100000)) {
        errors.page = 'Please enter a single positive number or leave empty.'
      }
      if ($.isEmptyObject(errors)) {
        if (!isEmpty(wikipediaUrl)) {
          if (!wikipediaUrl.startsWith('https://en.wikipedia.org/wiki/')) {
            this.showError('wikipediaUrl', 'Unable to parse Wikipedia url.')
          } else {
            const name = wikipediaUrl.slice('https://en.wikipedia.org/wiki/'.length)
            this.$http
              .get(
                `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${name}&origin=*`
              )
              .then(response => {
                const { title, pageid } = response.data.parse
                if (title !== null && pageid !== null) {
                  const underscoreTitle = title.replace(new RegExp(' ', 'g'), '_')
                  const reference = {
                    url: `https://en.wikipedia.org/wiki/${underscoreTitle}`,
                    arxivId: null,
                    wikipediaId: pageid,
                    bibtex: null,
                    title,
                    page: pageNumber,
                    statement
                  }
                  this.emitReference(reference)
                } else {
                  this.showError('wikipediaUrl', 'Unable to parse Wikipedia url.')
                }
              })
              .catch(() => {
                this.showError('wikipediaUrl', 'Unable to parse Wikipedia url.')
              })
          }
        } else if (!isEmpty(arxivId)) {
          this.$http
            .get(`https://export.arxiv.org/api/query?search_query=&id_list=${arxivId}`, {
              responseType: 'text'
            })
            .then(response => {
              const self = this
              this.$xml.parseString(response.data, (err, result) => {
                const title = result.feed.entry[0].title[0]
                const reference = {
                  url: `https://arxiv.org/abs/${arxivId}`,
                  arxivId,
                  wikipediaId: null,
                  title,
                  page: pageNumber,
                  statement,
                  bibtex: null
                }
                self.emitReference(reference)
              })
            })
            .catch(() => {
              this.showError('arxivId', 'Please enter a valid Arxiv id.')
            })
        } else {
          try {
            const json = this.$bibtex.toJSON(bibtex)
            const { title } = json[0].entryTags
            if (isEmpty(title)) {
              this.showError('bibtex', 'Please provide BibTex with a title.')
            } else {
              const { url } = json[0].entryTags
              const reference = {
                url,
                arxivId: null,
                wikipediaId: null,
                title,
                page: pageNumber,
                statement,
                bibtex
              }
              this.emitReference(reference)
            }
          } catch (error) {
            this.showError('bibtex', 'Unable to parse BibTex.')
          }
        }
      } else {
        this.referenceErrors = errors
      }
    },
    showError(key, value) {
      this.referenceErrors = { [key]: value }
    },
    emitReference(reference) {
      $('#referenceModal').modal('hide')
      this.referenceErrors = {}
      this.$emit('addEditReference', reference, this.referenceIndex)
    }
  }
}
</script>
