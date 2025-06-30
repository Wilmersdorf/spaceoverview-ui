import { Modal } from 'bootstrap'
window.Modal = Modal
import 'bootstrap/dist/css/bootstrap.min.css'
import 'katex/dist/katex.min.js'
import 'katex/dist/katex.min.css'
import renderMathInElement from 'katex/dist/contrib/auto-render.min.js'
import jsCookie from 'js-cookie'
import { Cite } from '@citation-js/core'
import '@citation-js/plugin-bibtex/lib/index.js'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

const privileges = {
  isAdmin: jsCookie.get('isAdmin') === 'true',
  canEdit: jsCookie.get('canEdit') === 'true'
}

const settings = {
  showSource: (jsCookie.get('showSource') || 'true') === 'true',
  mode: jsCookie.get('mode') || 'light'
}

const fieldLinks = [
  'REAL',
  'COMPLEX',
  'REAL_AND_COMPLEX',
  'NOT_REAL',
  'NOT_COMPLEX',
  'NOT_REAL_AND_NOT_COMPLEX',
  'REAL_AND_NOT_COMPLEX',
  'NOT_REAL_AND_COMPLEX'
]

const renderMathElement = element => {
  renderMathInElement(element, {
    delimiters: [{ left: '$', right: '$', display: false }]
  })
}

const globalMixin = {
  data() {
    return {
      Cite,
      fieldLinks,
      jsCookie,
      privileges,
      settings
    }
  },
  methods: {
    isEmpty(str) {
      return str === null || str === undefined || str.trim().length === 0
    },
    clone(object) {
      return JSON.parse(JSON.stringify(object))
    },
    convertFormToJson(formId) {
      const formData = new FormData(document.getElementById(formId))
      const json = {}
      for (const pair of formData.entries()) {
        json[pair[0]] = pair[1].trim()
      }
      return json
    },
    renderMath() {
      this.loaded = true
      this.$nextTick(() => {
        Array.from(this.$el.getElementsByClassName('math')).forEach(element => {
          renderMathElement(element)
        })
        this.rendered = true
      })
    },
    renderMathNow() {
      Array.from(this.$el.getElementsByClassName('math')).forEach(element => {
        renderMathElement(element)
      })
    },
    render(id) {
      renderMathElement(document.getElementById(id))
    },
    init(id, value) {
      document.getElementById(id).value = value || ''
    },
    initMath(id, value) {
      document.getElementById(id).value = value || ''
      const mathId = 'math' + this.capitalize(id)
      const mathElement = document.getElementById(mathId)
      mathElement.textContent = value || ''
      mathElement.classList.add('text-break')
      this.render(mathId)
    },
    inputMath(event) {
      const mathId = 'math' + this.capitalize(event.target.id)
      document.getElementById(mathId).textContent = event.target.value
      this.render(mathId)
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    formatField(field) {
      if (field === 'REAL') {
        return 'Real numbers only'
      } else if (field === 'COMPLEX') {
        return 'Complex numbers only'
      } else if (field === 'REAL_OR_COMPLEX') {
        return 'Real or complex numbers'
      } else {
        return ''
      }
    },
    formatFieldLink(fieldLink) {
      if (fieldLink === 'REAL') {
        return 'Real'
      } else if (fieldLink === 'COMPLEX') {
        return 'Complex'
      } else if (fieldLink === 'REAL_AND_COMPLEX') {
        return 'Real and complex'
      } else if (fieldLink === 'NOT_REAL') {
        return 'Not real'
      } else if (fieldLink === 'NOT_COMPLEX') {
        return 'Not complex'
      } else if (fieldLink === 'NOT_REAL_AND_NOT_COMPLEX') {
        return 'Not real and not complex'
      } else if (fieldLink === 'REAL_AND_NOT_COMPLEX') {
        return 'Real and not complex'
      } else if (fieldLink === 'NOT_REAL_AND_COMPLEX') {
        return 'Complex and not real'
      } else {
        return ''
      }
    },
    updatePrivileges() {
      this.privileges.canEdit = this.jsCookie.get('canEdit') === 'true'
      this.privileges.isAdmin = this.jsCookie.get('isAdmin') === 'true'
    },
    updateSettings() {
      this.settings.showSource = this.jsCookie.get('showSource') === 'true'
    },
    post(url, json) {
      const data = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': this.jsCookie.get('csrf')
        }
      }
      if (json !== undefined) {
        data.body = JSON.stringify(json)
      }
      return fetch(url, data)
    },
    delete(url) {
      return fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': this.jsCookie.get('csrf')
        }
      })
    }
  },
  computed: {
    canEdit() {
      return this.privileges.canEdit
    },
    isAdmin() {
      return this.privileges.isAdmin
    },
    showSource() {
      return this.settings.showSource
    }
  }
}

document.addEventListener('hide.bs.modal', () => {
  if (document.activeElement) {
    document.activeElement.blur()
  }
})

const app = createApp(App)

app.use(router).mixin(globalMixin).mount('#app')
