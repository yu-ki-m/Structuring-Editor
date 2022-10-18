<template>
  <div id="app">

      <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  
  name: 'App',
  components: {
  },
  data(){
    return {
      
    };
  },    
  watch: {},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
body{
    background-color: rgb(245, 245, 245);
    margin:0px;
    height: 100%;
}
html{
  height: 100%;
}
</style>
