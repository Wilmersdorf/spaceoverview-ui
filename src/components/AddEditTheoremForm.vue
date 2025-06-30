<template>
  <div v-show="rendered">
    <form
      id="addEditTheoremForm"
      autocapitalize="off"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
      @submit.prevent
    >
      <div>
        <label for="name" class="form-label">Name (Optional)</label>
        <input
          id="name"
          name="name"
          placeholder="Theorem name"
          autocomplete="off"
          class="form-control"
          :class="{ 'is-invalid': errors['name'] }"
          @input="inputMath"
        />
        <div class="invalid-feedback">{{ errors['name'] }}</div>
      </div>
      <div id="mathName" class="mt-2"></div>
      <div class="mt-4">
        <label for="description" class="form-label">Description (optional)</label>
        <input
          id="description"
          name="description"
          placeholder="Description"
          class="form-control"
          :class="{ 'is-invalid': errors['description'] }"
          @input="inputMath"
        />
        <div class="invalid-feedback">{{ errors['description'] }}</div>
      </div>
      <div id="mathDescription" class="mt-2"></div>
    </form>
    <h2 v-if="conditions.length === 1" class="mt-4">Condition</h2>
    <h2 v-else class="mt-4">Conditions</h2>
    <div v-for="(condition, index) in conditions" :key="`condition-${index}`" class="mt-4">
      <div>
        <label :for="`conditionProperty-${index}`" class="form-label">Property</label>
        <div class="dropdown">
          <button
            :id="`conditionProperty-${index}`"
            class="form-control dropdown-toggle is-flex"
            data-bs-toggle="dropdown"
          >
            <div class="math">
              {{ getPropertyById(condition.propertyId).name }}
            </div>
          </button>
          <ul class="dropdown-menu">
            <li
              v-for="property in properties"
              :key="`condition-${index}-${property.id}`"
              class="dropdown-item pointer no-select math"
              @click="selectCondition(index, property.id)"
            >
              {{ property.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-2">
        <label :for="`conditionField-${index}`" class="form-label">Field</label>
        <select
          :id="`conditionField-${index}`"
          v-model="condition.field"
          :name="`conditionField-${index}`"
          class="form-select"
        >
          <option
            v-for="field in getFieldsByPropertyId(condition.propertyId)"
            :key="`condition-${index}-${field}`"
            :value="field"
          >
            {{ formatFieldLink(field) }}
          </option>
        </select>
      </div>
      <button
        v-if="conditions.length > 1"
        class="btn btn-outline-danger btn-sm pointer mt-3 ms-auto"
        @click="deleteCondition(index)"
      >
        Delete
      </button>
    </div>
    <div v-if="conditions.length < 5" class="mt-4 d-flex justify-content-center">
      <button class="btn btn-outline-secondary btn-sm" @click="addCondition">Add condition</button>
    </div>
    <h2 v-if="conclusions.length === 1" class="mt-4">Conclusion</h2>
    <h2 v-else class="mt-4">Conclusions</h2>
    <div v-for="(conclusion, index) in conclusions" :key="`conclusion-${index}`" class="mt-4">
      <div>
        <label :for="`conclusionProperty-${index}`" class="form-label">Property</label>
        <div class="dropdown">
          <button
            :id="`conclusionProperty-${index}`"
            class="form-control dropdown-toggle is-flex"
            data-bs-toggle="dropdown"
          >
            <div class="math">
              {{ getPropertyById(conclusion.propertyId).name }}
            </div>
          </button>
          <ul class="dropdown-menu">
            <li
              v-for="property in properties"
              :key="`conclusion-${index}-${property.id}`"
              class="dropdown-item pointer no-select math"
              @click="selectConclusion(index, property.id)"
            >
              {{ property.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-2">
        <label :for="`conclusionField-${index}`" class="form-label">Field</label>
        <select
          :id="`conclusionField-${index}`"
          v-model="conclusion.field"
          :name="`conclusionField-${index}`"
          class="form-select"
        >
          <option
            v-for="field in getFieldsByPropertyId(conclusion.propertyId)"
            :key="`conclusion-${index}-${field}`"
            :value="field"
          >
            {{ formatFieldLink(field) }}
          </option>
        </select>
      </div>
      <button
        v-if="conclusions.length > 1"
        class="btn btn-outline-danger btn-sm pointer mt-3 ms-auto"
        @click="deleteConclusion(index)"
      >
        Delete
      </button>
    </div>
    <div v-if="conclusions.length < 5" class="mt-4 d-flex justify-content-center">
      <button class="btn btn-outline-secondary btn-sm" @click="addConclusion">
        Add conclusion
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    theorem: Object,
    properties: Object,
    errors: Object
  },
  data() {
    return {
      conditions: [],
      conclusions: [],
      rendered: false
    }
  },
  mounted() {
    if (this.theorem.conditions === undefined || this.theorem.conclusions === undefined) {
      const [property] = this.properties
      this.conditions = [{ propertyId: property.id, field: this.getField(property.field) }]
      this.conclusions = [{ propertyId: property.id, field: this.getField(property.field) }]
    } else {
      this.conditions = this.clone(this.theorem.conditions)
      this.conclusions = this.clone(this.theorem.conclusions)
    }
    this.initMath('name', this.theorem.name)
    this.initMath('description', this.theorem.description)
    this.renderMath()
  },
  methods: {
    addCondition() {
      const [property] = this.properties
      this.conditions.push({ propertyId: property.id, field: this.getField(property.field) })
      this.renderMath()
    },
    deleteCondition(index) {
      this.conditions.splice(index, 1)
      this.renderMath()
    },
    selectCondition(index, propertyId) {
      const property = this.getPropertyById(propertyId)
      this.conditions[index] = { propertyId: property.id, field: this.getField(property.field) }
      this.renderMath()
    },
    addConclusion() {
      const [property] = this.properties
      this.conclusions.push({ propertyId: property.id, field: this.getField(property.field) })
      this.renderMath()
    },
    deleteConclusion(index) {
      this.conclusions.splice(index, 1)
      this.renderMath()
    },
    selectConclusion(index, propertyId) {
      const property = this.getPropertyById(propertyId)
      this.conclusions[index] = { propertyId: property.id, field: this.getField(property.field) }
      this.renderMath()
    },
    getField(field) {
      if (field === 'REAL') {
        return 'REAL'
      } else if (field === 'COMPLEX') {
        return 'COMPLEX'
      } else {
        return 'REAL_AND_COMPLEX'
      }
    },
    getFieldsByPropertyId(propertyId) {
      const property = this.getPropertyById(propertyId)
      if (property.field === 'REAL') {
        return ['REAL', 'NOT_REAL']
      } else if (property.field === 'COMPLEX') {
        return ['COMPLEX', 'NOT_COMPLEX']
      } else {
        return [
          'REAL',
          'COMPLEX',
          'REAL_AND_COMPLEX',
          'NOT_REAL',
          'NOT_COMPLEX',
          'NOT_REAL_AND_NOT_COMPLEX'
        ]
      }
    },
    getPropertyById(propertyId) {
      return this.properties.find(property => property.id === propertyId)
    }
  }
}
</script>
