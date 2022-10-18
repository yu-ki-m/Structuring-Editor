<template>
  <div>
    <ChromePicker :value="colors" @input="colors = $event"></ChromePicker>
  </div>
</template>
<script>
import { Chrome } from "vue-color";
export default {
  name: "ColorPicker",
  components: {
    ChromePicker: Chrome,
  },
  data() {
    return {
      
    };
  },
  props:{
    colors: {
      default:()=>{ 
        return {
          hex: "#000000"
        }
      }
    },
  }
};
</script>