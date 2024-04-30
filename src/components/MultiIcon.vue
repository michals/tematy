<template>
  <button type="button" class="my-custom-button" @click="toggleState">
    <i :class="`bi ${options[selectedIndex]}`"></i>
  </button>
</template>

<script>
export default {
  name: 'MultiIcon',
  props: {
    options: {
      type: Array,
      required: true,
    },
    selected: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selectedIndex: this.selected % this.options.length,
    };
  },
  methods: {
    toggleState() {
      this.selectedIndex = (this.selectedIndex + 1) % this.options.length;
      this.state = this.options[this.selectedIndex];
    },
  },
};
</script>

<style scoped>
.my-custom-button {
  border: none;
  background: none;
  cursor: pointer;
}
</style>
