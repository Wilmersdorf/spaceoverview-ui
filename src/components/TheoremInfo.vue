<template>
  <div>
    <h1 v-if="info" class="mt-3 text-center math">
      {{ theoremName }}
    </h1>
    <div v-if="!info && theorem.name !== null" class="mt-3 math">
      {{ theoremName }}
    </div>
    <div v-if="info" class="mt-2 text-center math display">{{ theorem.description }}</div>
    <div class="d-flex flex-column" :class="{ 'align-items-center': info }">
      <div>
        <div v-for="condition in theorem.conditions" :key="condition.id" class="d-flex mt-2">
          <div v-if="!theoremHasProperty(condition.field)" class="text-muted me-1">
            ({{ formatFieldLink(condition.field) }})
          </div>
          <router-link class="math" :to="`/property/${condition.propertyId}`">{{
            condition.propertyName
          }}</router-link>
          <div v-if="theoremHasProperty(condition.field)" class="text-muted ms-1">
            ({{ formatFieldLink(condition.field) }})
          </div>
        </div>
        <div class="mt-2">
          <div v-if="info" class="math">$\Longrightarrow$</div>
          <router-link v-if="!info" class="math" :to="`/theorem/${theorem.id}`"
            >$\Longrightarrow$</router-link
          >
        </div>
        <div
          v-for="conclusion in theorem.conclusions"
          :key="conclusion.id"
          class="d-flex mt-2 ms-5"
        >
          <div v-if="!theoremHasProperty(conclusion.field)" class="text-muted me-1">
            ({{ formatFieldLink(conclusion.field) }})
          </div>
          <router-link :to="`/property/${conclusion.propertyId}`" class="math">{{
            conclusion.propertyName
          }}</router-link>
          <div v-if="theoremHasProperty(conclusion.field)" class="text-muted ms-1">
            ({{ formatFieldLink(conclusion.field) }})
          </div>
        </div>
      </div>
    </div>
    <References v-if="info" :references="theorem.references"></References>
  </div>
</template>

<script>
import References from '@/components/References.vue'

export default {
  components: {
    References
  },
  props: {
    info: Boolean,
    theorem: Object
  },
  computed: {
    theoremName() {
      if (this.isEmpty(this.theorem.name)) {
        return 'Theorem'
      } else {
        return this.theorem.name
      }
    }
  },
  mounted() {
    this.renderMathNow()
  },
  methods: {
    theoremHasProperty(field) {
      if (field === 'REAL' || field === 'COMPLEX' || field === 'REAL_AND_COMPLEX') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
