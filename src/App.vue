<template>
  <div id="app">
    <router-link to="/">Row</router-link>
    <router-link to="/users">Users</router-link>
    <router-link to="/schema">Schema</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
body{
  background-color: #dce3ef;
}
</style>