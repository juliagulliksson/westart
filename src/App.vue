<template>
  <div id="app">
    <div class="navigation">
      <div class="navigation-menu">
        <router-link to="/">Dashboard</router-link>
        <router-link to="/schema">Schedule</router-link>
      </div>
      <div class="logo"><img src="./assets/westartlogo.svg"></div>
    </div>
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
  font-family: "Poppins", sans-serif;
}
body {
  background-color: #f7f9fc;
}

.logo {
  width: 150px;
  margin-right: 17px;
}

.logo img {
  width: 100%;
}

.navigation a {
  color: #fff;
  margin-left: 17px;
  margin-top: 3px;
  text-transform: uppercase;
  font-size: 1.2em;
  font-weight: 300;
  opacity: 0.7;
  text-decoration: none;
}

.navigation a.router-link-exact-active {
  opacity: 1;
  font-weight: 400;
}

.navigation {
  width: 80%;
  margin: 0px auto;
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
}
.navigation-menu {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>