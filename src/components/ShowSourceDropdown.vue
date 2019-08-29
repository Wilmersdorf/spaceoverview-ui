<template>
  <li class="ml-auto" style="margin-right:-6px">
    <i
      class="pointer"
      data-toggle="dropdown"
      data-feather="more-vertical"
      width="20"
      height="20"
      color="black"
    ></i>
    <div id="dropdownMenu" class="dropdown-menu dropdown-menu-right mt-2">
      <h6 class="dropdown-header no-select">Options</h6>
      <label class="no-select ml-4 mt-2 pointer">
        <input
          id="showSource"
          :checked="showSource"
          class="checkbox"
          type="checkbox"
          @change="toggleShowSource"
        />
        <span style="margin-left:8px">Show source</span>
      </label>
    </div>
  </li>
</template>

<script>
export default {
  name: "ShowSourceDropdown",
  methods: {
    toggleShowSource: function() {
      if ($("#showSource").is(":checked")) {
        this.$jsCookie.set("showSource", true, { expires: 30 });
      } else {
        this.$jsCookie.remove("showSource");
      }
      this.updateSettings();
    }
  },
  mounted: function() {
    this.$feather.replace();
    $("#dropdownMenu").click(function(e) {
      e.stopPropagation();
    });
  }
};
</script>
