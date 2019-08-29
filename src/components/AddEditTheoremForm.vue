<template>
  <div class="container">
    <div v-if="loaded" v-show="rendered">
      <form id="addEditTheoremForm">
        <div class="form-group">
          <label for="symbol">Name (Optional)</label>
          <input
            v-model="theorem.name"
            class="form-control"
            id="name"
            name="name"
            placeholder="Theorem name"
            :class="{ 'is-invalid': errors['name'] }"
            v-on:input="inputName"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
          <div class="invalid-feedback">{{errors["name"]}}</div>
        </div>
        <span class id="mathName"></span>
      </form>
      <div :class="[hasName ? 'mt-4' : 'mt-4']">
        <h2 v-if="conditionCount===1">Condition</h2>
        <h2 v-else>Conditions</h2>
      </div>
      <div
        v-for="(n, i) in conditionCount"
        :key="`condition-${i}`"
        class="form-row align-items-center"
      >
        <div class="form-group col-auto">
          <label for="property">Property</label>
          <div class="dropdown">
            <button
              class="form-control dropdown-toggle btn-block text-left is-flex"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style="min-width:300px"
            >
              <span :id="`condition-${i}-name`"></span>
            </button>
            <div class="dropdown-menu">
              <div
                class="dropdown-item pointer no-select"
                href="#"
                :id="`condition-${i}-${property.id}`"
                v-for="property in properties"
                :key="`condition-${i}-${property.id}`"
                @click="selectCondition(i, property.id)"
              >{{property.name}}</div>
            </div>
          </div>
        </div>
        <div class="form-group col-auto">
          <label for="field">Field</label>
          <select
            class="form-control"
            :id="`conditionField[${i}]`"
            :name="`conditionField[${i}]`"
            v-model="conditions[i].field"
            style="min-width:225px"
          >
            <option
              v-for="field in conditionsFieldOptions[i]"
              :key="`condition-${i}-${field}`"
              :value="field"
            >{{formatFieldLink(field)}}</option>
          </select>
        </div>
        <div v-if="conditionCount>1" class="form-group col-auto mt-4 ml-auto">
          <button
            type="button"
            class="btn btn-outline-danger btn-sm pointer"
            @click="deleteCondition(i)"
          >Delete</button>
        </div>
      </div>
      <div v-if="conditionCount<5" class="d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-outline-secondary btn-sm"
          @click="addCondition"
        >Add condition</button>
      </div>
      <h2 v-if="conclusionCount===1">Conclusion</h2>
      <h2 v-else>Conclusions</h2>
      <div
        v-for="(n, i) in conclusionCount"
        :key="`conclusion-${i}`"
        class="form-row align-items-center"
      >
        <div class="form-group col-auto">
          <label for="property">Property</label>
          <div class="dropdown">
            <button
              class="form-control dropdown-toggle btn-block text-left is-flex"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style="min-width:300px"
            >
              <span :id="`conclusion-${i}-name`"></span>
            </button>
            <div class="dropdown-menu">
              <div
                class="dropdown-item pointer no-select"
                :id="`conclusion-${i}-${property.id}`"
                v-for="property in properties"
                :key="`conclusion-${i}-${property.id}`"
                @click="selectConclusion(i, property.id)"
              >{{property.name}}</div>
            </div>
          </div>
        </div>
        <div class="form-group col-auto">
          <label for="field">Field</label>
          <select
            class="form-control"
            :id="`conclusionField[${i}]`"
            :name="`conclusionField[${i}]`"
            v-model="conclusions[i].field"
            style="min-width:225px"
          >
            <option
              v-for="field in conclusionsFieldOptions[i]"
              :key="`conclusion-${i}-${field}`"
              :value="field"
            >{{formatFieldLink(field)}}</option>
          </select>
        </div>
        <div v-if="conclusionCount>1" class="form-group col-auto mt-4 ml-auto">
          <div class="btn btn-outline-danger btn-sm pointer" @click="deleteConclusion(i)">Delete</div>
        </div>
      </div>
      <div v-if="conclusionCount<5" class="d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-outline-secondary btn-sm"
          @click="addConclusion"
        >Add conclusion</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    theorem: {
      required: true
    },
    properties: {
      required: true
    },
    errors: {
      required: true
    }
  },
  data: function() {
    return {
      conditionCount: 1,
      conditions: [],
      conditionsFieldOptions: [],
      conclusionCount: 1,
      conclusions: [],
      conclusionsFieldOptions: [],
      loaded: false,
      rendered: false
    };
  },
  computed: {
    hasName: function() {
      return !isEmpty(this.theorem.name);
    }
  },
  methods: {
    inputName: function(event) {
      $("#mathName").text(event.target.value);
      this.render("mathName");
    },
    addCondition: function() {
      this.conditionCount++;
      if (this.conditions[this.conditionCount] === undefined) {
        let property = this.properties[0];
        this.conditions.push({
          propertyId: property.id,
          field: this.getField(property.field)
        });
        this.conditionsFieldOptions.push(
          this.getFields(this.properties[0].field)
        );
      }
      this.renderAll();
    },
    deleteCondition: function(index) {
      if (index !== this.conditionCount - 1) {
        this.$delete(this.conditionsFieldOptions, index);
        this.$delete(this.conditions, index);
      }
      this.conditionCount--;
      this.renderAll();
    },
    selectCondition: function(index, propertyId) {
      let property = this.getPropertyById(propertyId);
      this.$set(
        this.conditionsFieldOptions,
        index,
        this.getFields(property.field)
      );
      this.$set(this.conditions, index, {
        propertyId: property.id,
        field: this.getField(property.field)
      });
      this.renderAll();
    },
    addConclusion: function() {
      this.conclusionCount++;
      if (this.conclusions[this.conclusionCount] === undefined) {
        let property = this.properties[0];
        this.conclusions.push({
          propertyId: property.id,
          field: this.getField(property.field)
        });
        this.conclusionsFieldOptions.push(
          this.getFields(this.properties[0].field)
        );
      }
      this.renderAll();
    },
    deleteConclusion: function(index) {
      if (index !== this.conclusionCount - 1) {
        this.$delete(this.conclusionsFieldOptions, index);
        this.$delete(this.conclusions, index);
      }
      this.conclusionCount--;
      this.renderAll();
    },
    selectConclusion: function(index, propertyId) {
      let property = this.getPropertyById(propertyId);
      this.$set(
        this.conclusionsFieldOptions,
        index,
        this.getFields(property.field)
      );
      this.$set(this.conclusions, index, {
        propertyId: property.id,
        field: this.getField(property.field)
      });
      this.renderAll();
    },
    getFields: function(field) {
      if (field === "REAL") {
        return ["REAL", "NOT_REAL"];
      } else if (field === "COMPLEX") {
        return ["COMPLEX", "NOT_COMPLEX"];
      } else {
        return [
          "REAL",
          "COMPLEX",
          "REAL_AND_COMPLEX",
          "NOT_REAL",
          "NOT_COMPLEX",
          "NOT_REAL_AND_NOT_COMPLEX"
        ];
      }
    },
    getField: function(field) {
      if (field === "REAL") {
        return "REAL";
      } else if (field === "COMPLEX") {
        return "COMPLEX";
      } else {
        return "REAL_AND_COMPLEX";
      }
    },
    getPropertyById: function(propertyId) {
      return this.properties.find(property => property.id === propertyId);
    },
    changeReferences: function(references) {
      this.references = references;
    },
    renderAll: function() {
      this.$nextTick(() => {
        for (let i = 0; i < this.conditions.length; i++) {
          let property = this.getPropertyById(this.conditions[i].propertyId);
          $(`#condition-${i}-name`).html(property.name);
          this.render(`condition-${i}-name`);
          this.renderOptions("condition", i);
        }
        for (let i = 0; i < this.conclusions.length; i++) {
          let property = this.getPropertyById(this.conclusions[i].propertyId);
          $(`#conclusion-${i}-name`).html(property.name);
          this.render(`conclusion-${i}-name`);
          this.renderOptions("conclusion", i);
        }
        this.rendered = true;
      });
    },
    renderOptions: function(type, index) {
      this.properties.forEach(property => {
        this.render(`${type}-${index}-${property.id}`);
      });
    }
  },
  mounted() {
    if (
      this.theorem.conditions === undefined ||
      this.theorem.conclusions === undefined
    ) {
      let property = this.properties[0];
      this.conditions = [
        {
          propertyId: property.id,
          field: this.getField(property.field)
        }
      ];
      this.conditionsFieldOptions = [this.getFields(property.field)];
      this.conclusions = [
        {
          propertyId: property.id,
          field: this.getField(property.field)
        }
      ];
      this.conclusionsFieldOptions = [this.getFields(property.field)];
      this.loaded = true;
      this.$nextTick(() => {
        $("#mathName").text(this.theorem.name);
        this.render("mathName");
        this.renderAll();
      });
    } else {
      this.conditions = this.theorem.conditions.map(condition => {
        return {
          propertyId: condition.propertyId,
          field: condition.field
        };
      });
      this.conditionsFieldOptions = this.theorem.conditions.map(condition => {
        let property = this.getPropertyById(condition.propertyId);
        return this.getFields(property.field);
      });
      this.conditionCount = this.conditions.length;
      this.conclusions = this.theorem.conclusions.map(conclusion => {
        return {
          propertyId: conclusion.propertyId,
          field: conclusion.field
        };
      });
      this.conclusionsFieldOptions = this.theorem.conclusions.map(
        conclusion => {
          let property = this.getPropertyById(conclusion.propertyId);
          return this.getFields(property.field);
        }
      );
      this.conclusionCount = this.conclusions.length;
      this.loaded = true;
      this.$nextTick(() => {
        $("#mathName").text(this.theorem.name);
        this.render("mathName");
        this.renderAll();
      });
    }
  }
};
</script>
