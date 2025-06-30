<template>
  <div id="referenceModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div v-if="reference" class="modal-body">
          Please provide either an Arxiv id or English Wikipedia url or BibTeX.
          <div v-if="referenceErrors['general']" class="alert alert-danger mt-2">
            {{ referenceErrors['general'] }}
          </div>
          <form
            id="referenceForm"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
            @submit.prevent
          >
            <div class="mt-4">
              <label for="arxivId" class="form-label">Arxiv id</label>
              <input
                id="arxivId"
                name="arxivId"
                placeholder="1234.56789"
                class="form-control"
                :class="{ 'is-invalid': referenceErrors['arxivId'] }"
              />
              <div class="invalid-feedback">{{ referenceErrors['arxivId'] }}</div>
            </div>
            <div class="mt-4">
              <label for="wikipediaUrl" class="form-label">English Wikipedia url</label>
              <input
                id="wikipediaUrl"
                name="wikipediaUrl"
                placeholder="https://en.wikipedia.org/wiki/Lp_space"
                class="form-control"
                :class="{ 'is-invalid': referenceErrors['wikipediaUrl'] }"
              />
              <div class="invalid-feedback">{{ referenceErrors['wikipediaUrl'] }}</div>
            </div>
            <div class="mt-4">
              <label for="bibtex" class="form-label">BibTeX</label>
              <textarea
                id="bibtex"
                name="bibtex"
                rows="10"
                class="form-control"
                :class="{ 'is-invalid': referenceErrors['bibtex'] }"
              ></textarea>
              <div class="invalid-feedback">{{ referenceErrors['bibtex'] }}</div>
            </div>
            <div class="mt-4">
              <label for="page" class="form-label">Page (Optional)</label>
              <input
                id="page"
                name="page"
                placeholder="2"
                class="form-control"
                :class="{ 'is-invalid': referenceErrors['page'] }"
              />
              <div class="invalid-feedback">{{ referenceErrors['page'] }}</div>
            </div>
            <div class="mt-4">
              <label for="statement" class="form-label">Statement (Optional)</label>
              <input
                id="statement"
                name="statement"
                placeholder="Theorem 3.4"
                class="form-control"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary me-auto" @click="submitReference">
            {{ leftButtonLabel }}
          </button>
          <button class="btn btn-secondary" data-bs-dismiss="modal">
            {{ rightButtonLabel }}
          </button>
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
  emits: ['addEditReference'],
  data() {
    return {
      referenceErrors: {},
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
  watch: {
    reference() {
      this.referenceErrors = {}
      if (this.reference !== null) {
        if (this.reference.wikipediaId !== null) {
          this.wikipediaUrl = this.reference.url
        } else {
          this.wikipediaUrl = null
        }
        this.$nextTick(() => {
          this.init('arxivId', this.reference.arxivId)
          this.init('wikipediaUrl', this.wikipediaUrl)
          this.init('bibtex', this.reference.bibtex)
          this.init('page', this.reference.page)
          this.init('statement', this.reference.statement)
        })
        Modal.getOrCreateInstance(document.getElementById('referenceModal')).show()
      }
    }
  },
  methods: {
    async submitReference() {
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
      if (
        pageNumber !== null &&
        (Number.isNaN(pageNumber) || pageNumber < 1 || pageNumber > 100000)
      ) {
        errors.page = 'Please enter a single positive number or leave empty.'
      }
      if (Object.keys(errors).length === 0) {
        if (!this.isEmpty(wikipediaUrl)) {
          if (!wikipediaUrl.startsWith('https://en.wikipedia.org/wiki/')) {
            this.showError('wikipediaUrl', 'Unable to parse Wikipedia url.')
          } else {
            const name = wikipediaUrl.slice('https://en.wikipedia.org/wiki/'.length)
            const response = await fetch(
              `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${name}&origin=*`
            )
            if (response.status === 200) {
              const json = await response.json()
              if (json.parse) {
                const { title, pageid } = json.parse
                if (!this.isEmpty(title) && pageid !== null && pageid !== undefined) {
                  const underscoreTitle = title.replace(/ /gu, '_')
                  const reference = {
                    url: `https://en.wikipedia.org/wiki/${underscoreTitle}`,
                    title,
                    arxivId: null,
                    wikipediaId: pageid,
                    bibtex: null,
                    page: pageNumber,
                    statement
                  }
                  this.emitReference(reference)
                } else {
                  this.showError('wikipediaUrl', 'Unable to parse Wikipedia url.')
                }
              } else {
                this.showError('wikipediaUrl', 'Unable to parse Wikipedia url.')
              }
            } else {
              this.showError('wikipediaUrl', 'Unable to parse Wikipedia url.')
            }
          }
        } else if (!this.isEmpty(arxivId)) {
          const response = await fetch(
            `https://export.arxiv.org/api/query?search_query=&id_list=${arxivId}`
          )
          if (response.status === 200) {
            const text = await response.text()
            const parser = new DOMParser()
            const doc = parser.parseFromString(text, 'text/xml')
            const title = doc
              .getElementsByTagName('entry')[0]
              .getElementsByTagName('title')[0].textContent
            const reference = {
              url: `https://arxiv.org/abs/${arxivId}`,
              title,
              arxivId,
              wikipediaId: null,
              page: pageNumber,
              statement,
              bibtex: null
            }
            this.emitReference(reference)
          } else {
            this.showError('arxivId', 'Please enter a valid Arxiv id.')
          }
        } else {
          try {
            const cite = new this.Cite(bibtex)
            const [{ title, URL }] = cite.data
            if (this.isEmpty(title)) {
              this.showError('bibtex', 'Please provide BibTeX with a title.')
            } else if (this.isEmpty(URL)) {
              this.showError('bibtex', 'Please provide BibTeX with a url.')
            } else {
              const reference = {
                url: URL,
                title,
                arxivId: null,
                wikipediaId: null,
                page: pageNumber,
                statement,
                bibtex
              }
              this.emitReference(reference)
            }
          } catch {
            this.showError('bibtex', 'Unable to parse BibTeX.')
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
      this.referenceErrors = {}
      this.$emit('addEditReference', reference, this.referenceIndex)
      Modal.getInstance(document.getElementById('referenceModal')).hide()
    }
  }
}
</script>
