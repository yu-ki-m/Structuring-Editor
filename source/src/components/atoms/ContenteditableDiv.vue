<template>
  <label>
    <div
        contenteditable="true"
        v-text="text"
        v-on:input="OnUpdate"
        v-on:focus="OnFocus"
        v-on:blur="OnBlur"
    ></div>
  </label>
</template>
<script>
export default {
  name: "ContenteditableDiv",
  props: {
    value: {
      type: String,
      default:"-"
    },
  },
  data() {
    return {
      focusIn: false,
      text: ""
    };
  },
  mounted() {
    this.text = this.value;
  },
  methods: {
    input(str) {
      this.$emit("input", str);
    },
    OnUpdate(event) {
      const target = event.target;
      this.input(target.innerText);
    },
    OnFocus() {
      this.focusIn = true;
    },
    OnBlur() {
      this.focusIn = false;
    }
  },
  watch: {
    value() {
      if (this.focusIn) return;
      this.text = this.value;
    }
  }
};
</script>