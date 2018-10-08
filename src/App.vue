<template>
  <div id="app">
    <div class="background">
    <div class="navigation">
      <div class="navigation-menu">
        <router-link to="/">Dashboard</router-link>
        <router-link to="/schema">Schedule</router-link>
      </div>
      <div class="logo"><img src="./assets/westartlogo.svg"></div>
    </div>
    <router-view/>
    </div>
  </div>
</template>

<script>
require("./assets/weather-icons.min.css");
export default {
  name: "App"
};
</script>

<style>
/* @font-face {
  font-family: Archia;
  src: url(assets/Archia_Font_Web/03.Archia-Regular-webfont/); 
  src: url(font/weathericons-regular-webfont.eot?#iefix),
    url(assets/Achria_Font_Web/03.Archia-Regular-webfont/archia-regular-webfont.woff),
    url(assets/Achria_Font_Web/03.Archia-Regular-webfont/archia-regular-webfont.woff2),
    url(assets/Achria_Font_Web/01.Archia-Thin-webfont/archia-thin-webfont.woff2),
    url(assets/Achria_Font_Web/01.Archia-Thin-webfont/archia-thin-webfont.woff);
  font-weight: 400;
  font-style: normal;
} */

@font-face {
  font-family: "archiathin";
  src: url("assets/Archia_Font_Web/01.Archia-Thin-webfont/archia-thin-webfont.eot");
  src: url("assets/Archia_Font_Web/01.Archia-Thin-webfont/archia-thin-webfont.eot?#iefix")
      format("embedded-opentype"),
    url("assets/Archia_Font_Web/01.Archia-Thin-webfont/archia-thin-webfont.woff2")
      format("woff2"),
    url("assets/Archia_Font_Web/01.Archia-Thin-webfont/archia-thin-webfont.woff")
      format("woff"),
    url("assets/Archia_Font_Web/01.Archia-Thin-webfont/archia-thin-webfont.ttf")
      format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "archialight";
  src: url("assets/Archia_Font_Web/02.Archia-Light-webfont/archia-light-webfont.eot");
  src: url("assets/Archia_Font_Web/02.Archia-Light-webfont/archia-light-webfont.eot?#iefix")
      format("embedded-opentype"),
    url("assets/Archia_Font_Web/02.Archia-Light-webfont/archia-light-webfont.woff2")
      format("woff2"),
    url("assets/Archia_Font_Web/02.Archia-Light-webfont/archia-light-webfont.woff")
      format("woff"),
    url("assets/Archia_Font_Web/02.Archia-Light-webfont/archia-light-webfont.ttf")
      format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "archiaregular";
  src: url("assets/Archia_Font_Web/03.Archia-Regular-webfont/archia-regular-webfont.eot");
  src: url("assets/Archia_Font_Web/03.Archia-Regular-webfont/archia-regular-webfont.eot?#iefix")
      format("embedded-opentype"),
    url("assets/Archia_Font_Web/03.Archia-Regular-webfont/archia-regular-webfont.woff2")
      format("woff2"),
    url("assets/Archia_Font_Web/03.Archia-Regular-webfont/archia-regular-webfont.woff")
      format("woff"),
    url("assets/Archia_Font_Web/03.Archia-Regular-webfont/archia-regular-webfont.ttf")
      format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "archiasemibold";
  src: url("assets/Archia_Font_Web/05.Archia-Semibold-webfont/archia-semibold-webfont.eot");
  src: url("assets/Archia_Font_Web/05.Archia-Semibold-webfont/archia-semibold-webfont.eot?#iefix")
      format("embedded-opentype"),
    url("assets/Archia_Font_Web/05.Archia-Semibold-webfont/archia-semibold-webfont.woff2")
      format("woff2"),
    url("assets/Archia_Font_Web/05.Archia-Semibold-webfont/archia-semibold-webfont.woff")
      format("woff"),
    url("assets/Archia_Font_Web/05.Archia-Semibold-webfont/archia-semibold-webfont.ttf")
      format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "archiabold";
  src: url("assets/Archia_Font_Web/06.Archia-Bold-webfont/archia-bold-webfont.eot");
  src: url("assets/Archia_Font_Web/06.Archia-Bold-webfont/archia-bold-webfont.eot?#iefix")
      format("embedded-opentype"),
    url("assets/Archia_Font_Web/06.Archia-Bold-webfont/archia-bold-webfont.woff2")
      format("woff2"),
    url("assets/Archia_Font_Web/06.Archia-Bold-webfont/archia-bold-webfont.woff")
      format("woff"),
    url("assets/Archia_Font_Web/06.Archia-Bold-webfont/archia-bold-webfont.ttf")
      format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "nowaybold";
  src: url("assets/Noway/Noway-Bold-Webfont/noway-bold-webfont.eot");
  src: url("assets/Noway/Noway-Bold-Webfont/noway-bold-webfont.eot?#iefix")
      format("embedded-opentype"),
    url("assets/Noway/Noway-Bold-Webfont/noway-bold-webfont.woff2")
      format("woff2"),
    url("assets/Noway/Noway-Bold-Webfont/noway-bold-webfont.woff")
      format("woff"),
    url("assets/Noway/Noway-Bold-Webfont/noway-bold-webfont.ttf")
      format("truetype"),
    url("assets/Noway/Noway-Bold-Webfont/noway-bold-webfont.svg#nowaybold")
      format("svg");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "nowayregular";
  src: url("assets/Noway/Noway-Regular-Webfont/noway-regular-webfont.eot");
  src: url("assets/Noway/Noway-Regular-Webfont/noway-regular-webfont.eot?#iefix")
      format("embedded-opentype"),
    url("assets/Noway/Noway-Regular-Webfont/noway-regular-webfont.woff2")
      format("woff2"),
    url("assets/Noway/Noway-Regular-Webfont/noway-regular-webfont.woff")
      format("woff"),
    url("assets/Noway/Noway-Regular-Webfont/noway-regular-webfont.ttf")
      format("truetype"),
    url("assets/Noway/Noway-Regular-Webfont/noway-regular-webfont.svg#nowayregular")
      format("svg");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "nowaythin";
  src: url("assets/Noway/Noway-Thin-Webfont/noway-thin-webfont.eot");
  src: url("assets/Noway/Noway-Thin-Webfont/noway-thin-webfont.eot?#iefix")
      format("embedded-opentype"),
    url("assets/Noway/Noway-Thin-Webfont/noway-thin-webfont.woff2")
      format("woff2"),
    url("assets/Noway/Noway-Thin-Webfont/noway-thin-webfont.woff")
      format("woff"),
    url("assets/Noway/Noway-Thin-Webfont/noway-thin-webfont.ttf")
      format("truetype"),
    url("assets/Noway/Noway-Thin-Webfont/noway-thin-webfont.svg#nowaythin")
      format("svg");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "nowaylight";
  src: url("assets/Noway/Noway-Light-Webfont/noway-light-webfont.eot");
  src: url("assets/Noway/Noway-Light-Webfont/noway-light-webfont.eot?#iefix")
      format("embedded-opentype"),
    url("assets/Noway/Noway-Light-Webfont/noway-light-webfont.woff2")
      format("woff2"),
    url("assets/Noway/Noway-Light-Webfont/noway-light-webfont.woff")
      format("woff"),
    url("assets/Noway/Noway-Light-Webfont/noway-light-webfont.ttf")
      format("truetype"),
    url("assets/Noway/Noway-Light-Webfont/noway-light-webfont.svg#nowaylight")
      format("svg");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "noway_regularitalic";
  src: url("assets/Noway/Noway-Regular-Italic-Webfont/noway_regular_italic-webfont.eot");
}

#app {
  font-family: "archiaregular";
}

body {
  background-color: #f7f9fc;
}

.background::before {
  background-image: url("./assets/Logo.svg");
  background-size: cover;
  content: "";
  display: block;
  position: absolute;
  top: 300px;
  width: 70%;
  height: 100%;
  z-index: -2;
  opacity: 0.3;
  left: -300px;
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
  opacity: 0.7;
  text-decoration: none;
  font-family: "nowayregular";
}

.navigation a.router-link-exact-active {
  opacity: 1;
  font-weight: 400;
}

.navigation {
  width: 80%;
  margin: 0px auto;
  padding: 14px 0px;
  display: flex;
  justify-content: space-between;
}
.navigation-menu {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>