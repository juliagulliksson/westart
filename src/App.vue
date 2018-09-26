<template>
  <div id="app">
    <router-link to="/">Dashboard</router-link>
    <router-link to="/schema">Schema</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
}
body {
  background-color: #f7f9fc;
}
</style>