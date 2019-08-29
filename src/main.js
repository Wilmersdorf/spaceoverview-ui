import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import xml2js from 'xml2js';
import bibtexParseJs from 'bibtex-parse-js';
import jsCookie from 'js-cookie';
import feather from 'feather-icons';

var privileges = {
  isAdmin: jsCookie.get('isAdmin') === 'true',
  canEdit: jsCookie.get('canEdit') === 'true'
};
var settings = {
  showSource: jsCookie.get('showSource') === 'true'
};

axios.interceptors.request.use(config => {
  config.headers.post['X-CSRF-Token'] = jsCookie.get('csrf');
  config.headers.delete['X-CSRF-Token'] = jsCookie.get('csrf');
  return config;
});

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (
      (error.response.config.method === 'post' || error.response.config.method === 'delete') &&
      $.type(error.response.data) === 'string' &&
      error.response.data.startsWith('Proxy error')
    ) {
      error.response.data = {
        errors: {}
      };
    }
    return Promise.reject(error);
  }
);

Vue.prototype.$http = axios;
Vue.prototype.$xml = xml2js;
Vue.prototype.$bibtex = bibtexParseJs;
Vue.prototype.$jsCookie = jsCookie;
Vue.prototype.$feather = feather;

const FIELD_LINK = [
  'REAL',
  'COMPLEX',
  'REAL_AND_COMPLEX',
  'NOT_REAL',
  'NOT_COMPLEX',
  'NOT_REAL_AND_NOT_COMPLEX',
  'REAL_AND_NOT_COMPLEX',
  'NOT_REAL_AND_COMPLEX'
];

window.isEmpty = function(str) {
  return str === null || str === undefined || str.trim().length === 0;
};

Vue.mixin({
  data: function() {
    return {
      privileges: privileges,
      settings: settings,
      FIELD_LINK: FIELD_LINK
    };
  },
  methods: {
    convertFormToJson: function(form) {
      let array = form.serializeArray();
      let json = {};
      $.each(array, function() {
        let value = this.value ? this.value.trim() : null;
        json[this.name] = value;
      });
      return json;
    },
    renderByClass: function(clazz, root = $(document)) {
      if (typeof renderMathInElement === 'function') {
        root.find('.' + clazz).each((index, element) => {
          renderMathInElement(element, {
            delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }]
          });
        });
      } else {
        setTimeout(() => this.renderByClass(clazz, root), 1);
      }
    },
    render: function(id) {
      if (typeof renderMathInElement === 'function') {
        renderMathInElement($('#' + id)[0], {
          delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }]
        });
      } else {
        setTimeout(() => this.render(id), 1);
      }
    },
    formatField: function(field) {
      if (field === 'REAL') {
        return 'Real numbers only';
      } else if (field === 'COMPLEX') {
        return 'Complex numbers only';
      } else if (field === 'REAL_OR_COMPLEX') {
        return 'Real or complex numbers';
      } else {
        return '';
      }
    },
    formatFieldLink: function(fieldLink) {
      if (fieldLink === 'REAL') {
        return 'Real';
      } else if (fieldLink === 'COMPLEX') {
        return 'Complex';
      } else if (fieldLink === 'REAL_AND_COMPLEX') {
        return 'Real and complex';
      } else if (fieldLink === 'NOT_REAL') {
        return 'Not real';
      } else if (fieldLink === 'NOT_COMPLEX') {
        return 'Not complex';
      } else if (fieldLink === 'NOT_REAL_AND_NOT_COMPLEX') {
        return 'Not real and not complex';
      } else if (fieldLink === 'REAL_AND_NOT_COMPLEX') {
        return 'Real and not complex';
      } else if (fieldLink === 'NOT_REAL_AND_COMPLEX') {
        return 'Complex and not real';
      }
    },
    formatFieldLinkHash: function(fieldLink) {
      if (fieldLink === 'REAL') {
        return 'Real';
      } else if (fieldLink === 'COMPLEX') {
        return 'Complex';
      } else if (fieldLink === 'REAL_AND_COMPLEX') {
        return 'Real_and_complex';
      } else if (fieldLink === 'NOT_REAL') {
        return 'Not_real';
      } else if (fieldLink === 'NOT_COMPLEX') {
        return 'Not_complex';
      } else if (fieldLink === 'NOT_REAL_AND_NOT_COMPLEX') {
        return 'Not_real_and_not_complex';
      } else if (fieldLink === 'REAL_AND_NOT_COMPLEX') {
        return 'Real_and_not_complex';
      } else if (fieldLink === 'NOT_REAL_AND_COMPLEX') {
        return 'Complex_and_not_real';
      }
    },
    hasProperty: function(field) {
      if (field === 'REAL' || field === 'COMPLEX' || field === 'REAL_AND_COMPLEX') {
        return true;
      } else {
        return false;
      }
    },
    updatePrivileges: function() {
      this.privileges.canEdit = this.$jsCookie.get('canEdit') === 'true';
      this.privileges.isAdmin = this.$jsCookie.get('isAdmin') === 'true';
    },
    updateSettings: function() {
      this.settings.showSource = this.$jsCookie.get('showSource') === 'true';
    }
  },
  computed: {
    canEdit: function() {
      return this.privileges.canEdit;
    },
    isAdmin: function() {
      return this.privileges.isAdmin;
    },
    showSource: function() {
      return this.settings.showSource;
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
