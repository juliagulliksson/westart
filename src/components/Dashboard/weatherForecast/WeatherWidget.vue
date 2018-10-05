<template>
 <div class="row1 panel panel-info weather-flex-wrapper">
   <!--  <div class="panel-heading">
        <h3>Vädret</h3>
      </div> -->
    <div class="panel-body">
      <div class="weather-wrapper">
      <template v-for="w in weather">
        <div class="weather-info" :key="w.dt">
          <i :class="w.weather[0].icon"></i>
          <p>{{ Math.floor(w.main.temp) }}°C</p>
          <p class="date">{{ w.dt_txt }}</p>
        </div>
      </template>
     
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["weather"]
};
</script>