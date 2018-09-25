<template>
  <div v-if="nrOfSupportTicketsPerWeek.length === 5">
  <HighChart :weeks="weeks" :nrOfTicketsPerWeek="nrOfSupportTicketsPerWeek"></HighChart>
  </div>
</template>

<script>
const moment = require("moment");
import Key from "../../key.json";
import HighChart from "./HighChart";

export default {
  data() {
    return {
      APIkey: Key.key,
      nrOfSupportTicketsPerWeek: [],
      weeks: []
    };
  },
  components: {
    HighChart: HighChart
  },
  methods: {
    getTickets(dates) {
      for (let date of dates) {
        fetch(
          `http://redmine.westart.se/issues.json?key=${
            this.APIkey
          }&created_on=%3E%3C${date.startDate}|${
            date.endDate
          }&limit=100&status_id=*`
        )
          .then(response => response.json())
          .then(response => {
            this.nrOfSupportTicketsPerWeek.push(response.issues.length);
          });
      }
    },
    setDateValues() {
      let dates = [
        this.setDates(35),
        this.setDates(28),
        this.setDates(21),
        this.setDates(14),
        this.setDates(7)
      ];

      return dates;
    },
    setDates(day) {
      return {
        startDate: this.getDates(day).format("YYYY-MM-DD"),
        endDate: moment(this.getDates(day))
          .isoWeekday("Sunday")
          .format("YYYY-MM-DD")
      };
    },
    getDates(dayOffset) {
      return moment()
        .subtract(dayOffset, "d")
        .isoWeekday("Monday");
    },
    returnWeekNumbers() {
      return [
        this.getDates(35).format("w"),
        this.getDates(28).format("w"),
        this.getDates(21).format("w"),
        this.getDates(14).format("w"),
        this.getDates(7).format("w")
      ];
    }
  },
  created() {
    let dates = this.setDateValues();
    this.getTickets(dates);

    const weeks = this.returnWeekNumbers();
    this.weeks = weeks;

    this.isLoaded = true;
  },
  mounted() {
    /*  const supportChart = Highcharts.chart("container", {
      chart: {
        type: "column"
      },
      title: {
        text: "Svarstid Support"
      },
      xAxis: {
        title: {
          text: "Vecka"
        },
        categories: this.weeks
      },
      yAxis: {
        title: {
          text: "Antal ärenden"
        }
      },
      plotOptions: {
        column: {
          stacking: "normal"
        }
      },
      series: [
        {
          type: "column",
          name: "Customer answer time",
          data: [20, 20, 60, 20, 30],
          stack: "time"
        },
        {
          type: "column",
          name: "WestArt answer time",
          data: [20, 15, 30, 30, 20],
          stack: "time"
        },
        {
          type: "spline",
          name: "nrOfTickets",
          data: this.nrOfTicketsPerWeek,
          color: "#2bd86d"
        }
      ]
    }); */
  }
};
</script>