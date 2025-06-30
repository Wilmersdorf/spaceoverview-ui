<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/differential-equation">Differential Equations</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link
            v-if="loaded"
            v-show="rendered"
            class="math"
            :to="`/differential-equation/${differentialEquation.id}`"
            >{{ differentialEquation.name }}</router-link
          >
        </li>
        <li v-if="loaded && link.hasProperty" v-show="rendered" class="breadcrumb-item">
          <router-link :to="`/differential-equation/${differentialEquation.id}`"
            >Has property</router-link
          >
        </li>
        <li v-if="loaded && !link.hasProperty" v-show="rendered" class="breadcrumb-item">
          <router-link :to="`/differential-equation/${differentialEquation.id}`"
            >Lacks property</router-link
          >
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">
          <router-link class="math" :to="`/differential-equation/property/${property.id}`">{{
            property.name
          }}</router-link>
        </li>
        <li v-if="loaded" v-show="rendered" class="breadcrumb-item">Link</li>
        <li class="ms-auto">
          <router-link
            :to="`/differential-equation/property/${propertyId}/differential-equation/${differentialEquationId}`"
          >
            <Refresh class="pointer icon" width="16" height="16" />
          </router-link>
        </li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <DifferentialEquationInfo
        :differentialEquation="differentialEquation"
      ></DifferentialEquationInfo>
      <hr />
      <DifferentialEquationLinkInfo :link="link"></DifferentialEquationLinkInfo>
      <hr />
      <DifferentialEquationPropertyInfo :property="property"></DifferentialEquationPropertyInfo>
      <hr />
      <div class="footing"></div>
      <div v-if="canEdit" class="footer">
        <router-link
          :to="`/differential-equation/${differentialEquationId}/property/${propertyId}/edit`"
          >Edit</router-link
        >
        <div class="mx-1">|</div>
        <router-link
          :to="`/differential-equation/${differentialEquationId}/property/${propertyId}/delete`"
          >Delete</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import DifferentialEquationInfo from '@/components/DifferentialEquationInfo.vue'
import DifferentialEquationLinkInfo from '@/components/DifferentialEquationLinkInfo.vue'
import DifferentialEquationPropertyInfo from '@/components/DifferentialEquationPropertyInfo.vue'
import Refresh from '@/icons/Refresh.vue'

export default {
  components: {
    DifferentialEquationInfo,
    DifferentialEquationLinkInfo,
    DifferentialEquationPropertyInfo,
    Refresh
  },
  data() {
    return {
      differentialEquation: null,
      property: null,
      link: null,
      loaded: false,
      rendered: false
    }
  },
  computed: {
    differentialEquationId() {
      return this.$route.params.differentialEquationId
    },
    propertyId() {
      return this.$route.params.propertyId
    }
  },
  async mounted() {
    const [linkResponse, differentialEquationResponse, propertyResponse] = await Promise.all([
      fetch(
        `/api/differential-equation/${this.differentialEquationId}/property/${this.propertyId}`
      ),
      fetch(`/api/differential-equation/${this.differentialEquationId}`),
      fetch(`/api/differential-equation/property/${this.propertyId}`)
    ])
    if (
      linkResponse.status === 200 &&
      differentialEquationResponse.status === 200 &&
      propertyResponse.status === 200
    ) {
      this.link = await linkResponse.json()
      this.differentialEquation = await differentialEquationResponse.json()
      this.property = await propertyResponse.json()
      this.renderMath()
    }
  }
}
</script>
