<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">Info</li>
      </ol>
    </nav>
    <div v-if="loaded" v-show="rendered">
      <h1 class="mt-3 text-center text-decoration-underline">Info</h1>
      <h3 class="text-center mt-4">Math mode</h3>
      <h5 class="fw-bold">How can I write in math mode?</h5>
      <div>
        Everything enclosed in dollar signs $ ... $ will be rendered in math mode. For example,
        $L^1$ will be rendered as
        <div class="d-inline math">$L^1$</div>
        <div class="d-inline">.</div>
        <br />A complete list, sorted into logical groups, can be found
        <a href="https://katex.org/docs/supported.html" target="_blank">here</a>. <br />A complete
        list, sorted alphabetically, can be found
        <a href="https://katex.org/docs/support_table.html" target="_blank">here</a>. <br />If you
        know the shape of a character, but not its name,
        <a href="http://detexify.kirelabs.org/classify.html" target="_blank">Detexify</a> can help.
      </div>
      <!-- differential equations -->
      <h1 class="mt-4 text-center text-decoration-underline">Differential Equations</h1>
      <h3 class="mt-4 text-center">Links between differential equations and properties</h3>
      <h5 class="mt-2 fw-bold">Terminology</h5>
      <div>
        We call the relationship between a differential equation and a property a link. This
        includes both the case where a differential equation has a property, and the case where a
        differential equation lacks a property.
      </div>
      <h5 class="mt-2 fw-bold">
        How can I specify that a differential equation has or lacks a property?
      </h5>
      <ol>
        <li>
          Click on
          <router-link to="/differential-equation">Differential Equations</router-link> in the top
          menu.
        </li>
        <li>Click on the differential equation you would like to link the property to.</li>
        <li>
          Click on
          <div class="d-inline text-success">Add link to property</div>
          in the bottom menu.
        </li>
        <li>Select the property which the differential equation has or lacks.</li>
        <li>
          Under the section "Select link type", select if the differential equation has or does not
          have the property.
        </li>
      </ol>
      <h5 class="mt-2 fw-bold">
        How can I edit or delete an existing link between a differential equation and a property?
      </h5>
      <ol>
        <li>
          Click on
          <router-link to="/differential-equation">Differential Equations</router-link> in the top
          menu.
        </li>
        <li>Click on the differential equation for which you would like to make the change.</li>
        <li>Click on the property for which you would like to make the change.</li>
        <li>
          Click on
          <div class="d-inline text-success">Edit</div>
          or
          <div class="d-inline text-success">Delete</div>
          in the bottom menu.
        </li>
      </ol>
      <h3 class="mt-4 text-center">Differential equations</h3>
      <h5 class="fw-bold">How can I add a differential equation?</h5>
      <ol>
        <li>
          Click on
          <router-link to="/differential-equation">Differential Equations</router-link> in the top
          menu.
        </li>
        <li>
          Click on
          <router-link to="/differential-equation/add">Add differential equation</router-link> in
          the bottom menu.
        </li>
      </ol>
      <h5 class="fw-bold">How can I edit or delete a differential equation?</h5>
      <ol>
        <li>
          Click on
          <router-link to="/differential-equation">Differential Equations</router-link> in the top
          menu.
        </li>
        <li>Click on the differential equation you would like to edit or delete.</li>
        <li>
          Click on
          <div class="d-inline text-success">Edit</div>
          or
          <div class="d-inline text-success">Delete</div>
          in the bottom menu.
        </li>
      </ol>
      <h3 class="mt-4 text-center">Properties of differential equations</h3>
      <h5 class="fw-bold">How can I add a property?</h5>
      <ol>
        <li>
          Click on
          <router-link to="/differential-equation/property">Properties</router-link> in the top menu
          next to Differential Equations.
        </li>
        <li>
          Click on
          <router-link to="/differential-equation/property/add">Add property</router-link> in the
          bottom menu.
        </li>
      </ol>
      <h5 class="fw-bold">How can I edit or delete a property?</h5>
      <ol>
        <li>
          Click on
          <router-link to="/differential-equation/property">Properties</router-link> in the top menu
          next to Differential Equations.
        </li>
        <li>Click on the property you would like to edit or delete.</li>
        <li>
          Click on
          <div class="d-inline text-success">Edit</div>
          or
          <div class="d-inline text-success">Delete</div>
          in the bottom menu.
        </li>
      </ol>
      <!-- Spaces -->
      <h1 class="mt-4 text-center text-decoration-underline">Spaces</h1>
      <h3 class="mt-4 text-center">Links between spaces and properties</h3>
      <h5 class="mt-2 fw-bold">Terminology</h5>
      <div>
        We call the relationship between a space and a property a link. This includes both the case
        where a space has a property, and the case where a space lacks a property.
      </div>
      <h5 class="mt-2 fw-bold">How can I specify that a space has or lacks a property?</h5>
      <ol>
        <li>
          Click on
          <router-link to="/space">Spaces</router-link> in the top menu.
        </li>
        <li>Click on the space you would like to link the property to.</li>
        <li>
          Click on
          <div class="d-inline text-success">Add link to property</div>
          in the bottom menu.
        </li>
        <li>Select the property which the space has or lacks.</li>
        <li>
          Under the section "Field", select the fields where the space has the property or lacks the
          property.
        </li>
      </ol>
      <h5 class="mt-2 fw-bold">
        How can I edit or delete an existing link between a space and a property?
      </h5>
      <ol>
        <li>
          Click on
          <router-link to="/space">Spaces</router-link> in the top menu.
        </li>
        <li>Click on the space for which you would like to make the change.</li>
        <li>Click on the property for which you would like to make the change.</li>
        <li>
          Click on
          <div class="d-inline text-success">Edit</div>
          or
          <div class="d-inline text-success">Delete</div>
          in the bottom menu.
        </li>
      </ol>
      <h3 class="mt-4 text-center">Spaces</h3>
      <h5 class="fw-bold">How can I add a space?</h5>
      <ol>
        <li>
          Click on
          <router-link to="/space">Spaces</router-link> in the top menu.
        </li>
        <li>
          Click on
          <router-link to="/space/add">Add space</router-link> in the bottom menu.
        </li>
      </ol>
      <h5 class="fw-bold">How can I edit or delete a space?</h5>
      <ol>
        <li>
          Click on
          <router-link to="/space">Spaces</router-link> in the top menu.
        </li>
        <li>Click on the space you would like to edit or delete.</li>
        <li>
          Click on
          <div class="d-inline text-success">Edit</div>
          or
          <div class="d-inline text-success">Delete</div>
          in the bottom menu.
        </li>
      </ol>
      <h3 class="mt-4 text-center">Properties of spaces</h3>
      <h5 class="fw-bold">How can I add a property?</h5>
      <ol>
        <li>
          Click on
          <router-link to="/property">Properties</router-link> in the top menu next to Spaces.
        </li>
        <li>
          Click on
          <router-link to="/property/add">Add property</router-link> in the bottom menu.
        </li>
      </ol>
      <h5 class="fw-bold">How can I edit or delete a property?</h5>
      <ol>
        <li>
          Click on
          <router-link to="/property">Properties</router-link> in the top menu next to Spaces.
        </li>
        <li>Click on the property you would like to edit or delete.</li>
        <li>
          Click on
          <div class="d-inline text-success">Edit</div>
          or
          <div class="d-inline text-success">Delete</div>
          in the bottom menu.
        </li>
      </ol>
      <h3 class="mt-4 text-center">Theorems of spaces</h3>
      <h5 class="fw-bold">How can I add a theorem?</h5>
      <ol>
        <li>
          Click on
          <router-link to="/theorem">Theorems</router-link> in the top menu.
        </li>
        <li>
          Click on
          <router-link to="/theorem/add">Add theorem</router-link> in the bottom menu.
        </li>
      </ol>
      <h5 class="fw-bold">How can I edit or delete a theorem?</h5>
      <ol>
        <li>
          Click on
          <router-link to="/theorem">Theorems</router-link> in the top menu.
        </li>
        <li>
          Click on the arrow
          <div class="d-inline math">$\Longrightarrow$</div>
          of the theorem you would like to edit or delete.
        </li>
        <li>
          Click on
          <div class="d-inline text-success">Edit</div>
          or
          <div class="d-inline text-success">Delete</div>
          in the bottom menu.
        </li>
      </ol>
      <h5 class="fw-bold">How are properties computed from theorems?</h5>
      <div>Currently, only linked properties are used to compute properties from theorems.</div>
    </div>
    <div class="mt-4"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
      rendered: false
    }
  },
  mounted() {
    this.renderMath()
  }
}
</script>
