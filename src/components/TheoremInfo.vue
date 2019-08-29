<template>
  <div v-show="rendered">
    <h1
      v-if="titleSize === 'big'"
      class="mt-3 math-theorem"
      :class="center ? 'text-center' : ''"
    >{{theoremName}}</h1>
    <div
      v-if="titleSize === 'small' && theorem.name !== null"
      class="mt-3 math-theorem"
      :class="center ? 'text-center' : ''"
    >{{theoremName}}</div>
    <div class="d-flex flex-column" :class="center ? 'align-items-center' : ''">
      <div>
        <Conditions :theorem="theorem"></Conditions>
        <div class="mt-2">
          <div v-if="!showLink" class="math-theorem">$\Longrightarrow$</div>
          <router-link
            v-if="showLink"
            class="math-theorem"
            :to="`/theorem/${theorem.id}`"
          >$\Longrightarrow$</router-link>
        </div>
        <Conclusions class="ml-5" :theorem="theorem"></Conclusions>
      </div>
    </div>
    <References v-if="showReferences" :id="theorem.id" :references="theorem.references"></References>
  </div>
</template>

<script>
import Conditions from "@/components/Conditions.vue";
import Conclusions from "@/components/Conclusions.vue";
import References from "@/components/References.vue";

export default {
  name: "TheoremInfo",
  props: {
    theorem: {
      required: true
    },
    titleSize: {
      default: "big"
    },
    showReferences: {
      default: true
    },
    showLink: {
      default: false
    },
    center: {
      default: true
    }
  },
  data: function() {
    return {
      rendered: false
    };
  },
  computed: {
    theoremName: function() {
      if (this.theorem === null || isEmpty(this.theorem.name)) {
        return "Theorem";
      } else {
        return this.theorem.name;
      }
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      this.renderByClass("math-theorem", $(this.$el));
      this.rendered = true;
    });
  },
  components: {
    Conditions,
    Conclusions,
    References
  }
};
</script>
