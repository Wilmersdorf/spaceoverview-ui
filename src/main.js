import Vue from 'vue'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import lodash from 'lodash'
import axios from 'axios'
import xml2js from 'xml2js'
import bibtexParseJs from 'bibtex-parse-js'
import jsCookie from 'js-cookie'
import feather from 'feather-icons'
import App from './App.vue'

import router from './router'

const privileges = {
  isAdmin: jsCookie.get('isAdmin') === 'true',
  canEdit: jsCookie.get('canEdit') === 'true'
}
const settings = {
  showSource: jsCookie.get('showSource') === 'true'
}

axios.interceptors.request.use(config => {
  // eslint-disable-next-line
  config.headers.post['X-CSRF-Token'] = jsCookie.get('csrf')
  // eslint-disable-next-line
  config.headers.delete['X-CSRF-Token'] = jsCookie.get('csrf')
  return config
})

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (
      (error.response.config.method === 'post' || error.response.config.method === 'delete') &&
      $.type(error.response.data) === 'string' &&
      error.response.data.startsWith('Proxy error')
    ) {
      // eslint-disable-next-line
      error.response.data = {
        errors: {}
      }
    }
    return Promise.reject(error)
  }
)

Vue.prototype.$http = axios
Vue.prototype.$xml = xml2js
Vue.prototype.$bibtex = bibtexParseJs
Vue.prototype.$jsCookie = jsCookie
Vue.prototype.$feather = feather
Vue.prototype._ = lodash

const FIELD_LINK = [
  'REAL',
  'COMPLEX',
  'REAL_AND_COMPLEX',
  'NOT_REAL',
  'NOT_COMPLEX',
  'NOT_REAL_AND_NOT_COMPLEX',
  'REAL_AND_NOT_COMPLEX',
  'NOT_REAL_AND_COMPLEX'
]

window.isEmpty = str => {
  return str === null || str === undefined || str.trim().length === 0
}

const renderMathElement = element => {
  renderMathInElement(element, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false }
    ]
  })
}

const loadMathLibrary = cb => {
  if (typeof renderMathInElement === 'function') {
    cb()
  } else {
    setTimeout(() => loadMathLibrary(cb), 1)
  }
}

Vue.mixin({
  data() {
    return {
      privileges,
      settings,
      FIELD_LINK
    }
  },
  methods: {
    isPresent(object) {
      return object !== null && object !== undefined
    },
    clone(object) {
      return this._.cloneDeep(object)
    },
    convertFormToJson(formId) {
      const array = $(`#${formId}`).serializeArray()
      const json = {}
      // eslint-disable-next-line
      $.each(array, function() {
        const value = this.value ? this.value.trim() : null
        json[this.name] = value
      })
      return json
    },
    renderComponent() {
      loadMathLibrary(() => {
        this.$nextTick(() => {
          $(this.$el)
            .find('.math-component')
            .each((index, element) => renderMathElement(element))
          this.rendered = true
        })
      })
    },
    renderMath() {
      this.loaded = true
      loadMathLibrary(() => {
        this.$nextTick(() => {
          $(this.$el)
            .find('.math')
            .each((index, element) => renderMathElement(element))
          this.rendered = true
        })
      })
    },
    render(id) {
      loadMathLibrary(() => {
        renderMathElement($(`#${id}`)[0])
      })
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
    formatFieldLinkHash(fieldLink) {
      if (fieldLink === 'REAL') {
        return 'Real'
      } else if (fieldLink === 'COMPLEX') {
        return 'Complex'
      } else if (fieldLink === 'REAL_AND_COMPLEX') {
        return 'Real_and_complex'
      } else if (fieldLink === 'NOT_REAL') {
        return 'Not_real'
      } else if (fieldLink === 'NOT_COMPLEX') {
        return 'Not_complex'
      } else if (fieldLink === 'NOT_REAL_AND_NOT_COMPLEX') {
        return 'Not_real_and_not_complex'
      } else if (fieldLink === 'REAL_AND_NOT_COMPLEX') {
        return 'Real_and_not_complex'
      } else if (fieldLink === 'NOT_REAL_AND_COMPLEX') {
        return 'Complex_and_not_real'
      } else {
        return ''
      }
    },
    hasProperty(field) {
      if (field === 'REAL' || field === 'COMPLEX' || field === 'REAL_AND_COMPLEX') {
        return true
      } else {
        return false
      }
    },
    updatePrivileges() {
      this.privileges.canEdit = this.$jsCookie.get('canEdit') === 'true'
      this.privileges.isAdmin = this.$jsCookie.get('isAdmin') === 'true'
    },
    updateSettings() {
      this.settings.showSource = this.$jsCookie.get('showSource') === 'true'
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
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
