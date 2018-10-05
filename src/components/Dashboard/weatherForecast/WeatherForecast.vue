<template>
  <WeatherWidget :weather="weather"></WeatherWidget>
</template>

<script>
//import SmallWidget from "./SmallWidget";
const moment = require("moment");
import WeatherWidget from "./WeatherWidget";
import Icons from "../../../icons.json";
export default {
  data() {
    return {
      weather: []
      /*      icons: [] */
    };
  },
  components: {
    WeatherWidget: WeatherWidget
  },
  methods: {
    fetchWeather() {
      fetch(
        "http://api.openweathermap.org/data/2.5/forecast?lat=59.752852399999995&lon=18.7025318&appid=38825652b216759d64f897d81526a5fa&units=metric"
      )
        .then(response => response.json())
        .then(response => {
          //console.log(response.list);
          this.setWeather(response.list);
          this.setIcons();
          this.setDates();
          /*  let sunrise = response.sys.sunrise;
        let sunset = response.sys.sunset;
        sunset = new Date(sunset * 1000);
        sunrise = new Date(sunrise * 1000);

        console.log(sunrise);
        console.log(sunset);
        let imagePath =
          "http://openweathermap.org/img/w/" +
          response.weather[0].icon +
          ".png";
        console.log(imagePath); */
        });
    },
    setWeather(list) {
      this.weather = list
        .filter(w => w.dt_txt.substring(10, 13) == 12)
        .splice(0, 3);
    },
    setIcons() {
      for (let w of this.weather) {
        /* w.weather[0].icon =
          "http://openweathermap.org/img/w/" + w.weather[0].icon + ".png"; */
        const prefix = "wi wi-";
        const code = w.weather[0].id;
        let icon = Icons[code].icon;

        // If we are not in the ranges mentioned above, add a day/night prefix.
        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
          icon = "day-" + icon;
        }

        // Finally tack on the prefix.
        icon = prefix + icon;
        w.weather[0].icon = icon;
      }
    },
    setDates() {
      const today = new Date();
      const weatherDate = new Date(this.weather[1].dt_txt);
      console.log(weatherDate);
      let isToday = today.toDateString() == weatherDate.toDateString();
      console.log(isToday);
      /*    for (let w of this.weather) {
        let date = new Date(w.dt_txt);
        let options = {
          weekday: "long"
        };
        date = date.toLocaleDateString("se-SE", options);
        date = date.toUpperCase();
        w.dt_txt = date;
      } */
    }
  },
  created() {
    this.fetchWeather();
  }
};
</script>