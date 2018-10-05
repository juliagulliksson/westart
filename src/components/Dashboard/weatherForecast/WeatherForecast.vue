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
          /* console.log(response.list); */
          this.setWeather(response.list);
          this.setIcons();
          this.setDates();
        });
    },
    setWeather(list) {
      const weather = this.returnComingDaysWeather(list);
      let todaysWeather = this.returnTodaysWeather(list);
      // Add the coming weather for today first in the array
      weather.unshift(todaysWeather[1]);

      this.weather = weather;
    },
    returnComingDaysWeather(list) {
      return list.filter(w => {
        const weatherDate = new Date(w.dt_txt);
        if (
          this.checkIfDateIsTomorrow(weatherDate) ||
          this.checkIfDateIsDayAfterTomorrow(weatherDate)
        ) {
          if (w.dt_txt.substring(10, 13) == 12) {
            //If the forecast dates are for tomorrow or the day after tomorrow, and the time is 12 o'clock
            return w;
          }
        }
      });
    },
    returnTodaysWeather(list) {
      return list.filter(w => {
        const weatherDate = new Date(w.dt_txt);
        if (this.checkIfDateIsToday(weatherDate)) {
          return w;
        }
      });
    },
    checkIfDateIsToday(date) {
      let today = new Date();
      return today.toDateString() == date.toDateString();
    },
    checkIfDateIsTomorrow(date) {
      let tomorrow = this.returnDates(1);
      return tomorrow == date.toDateString();
    },
    checkIfDateIsDayAfterTomorrow(date) {
      let dayAfter = this.returnDates(2);
      return dayAfter == date.toDateString();
    },
    returnDates(dayOffSet) {
      return moment()
        .add(dayOffSet, "days")
        .format("ddd MMM DD YYYY");
    },
    setIcons() {
      for (let w of this.weather) {
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
      for (let w of this.weather) {
        let weatherDate = new Date(w.dt_txt);
        let hours = moment(weatherDate).format("HH:mm");
        if (this.checkIfDateIsToday(weatherDate)) {
          w.dt_txt = "Idag " + hours;
        } else if (this.checkIfDateIsTomorrow(weatherDate)) {
          w.dt_txt = "Imorgon " + hours;
        } else if (this.checkIfDateIsDayAfterTomorrow(weatherDate)) {
          let options = {
            weekday: "long"
          };
          let date = weatherDate.toLocaleDateString("se-SE", options);
          date = date.charAt(0).toUpperCase() + date.substr(1);
          w.dt_txt = date + " " + hours;
        }
      }
    }
  },
  created() {
    this.fetchWeather();
  }
};
</script>