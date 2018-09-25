<template>
  <div class="panel-body" id="container"></div>
</template>

<script>
const Highcharts = require("highcharts");
export default {
  props: ["weeks", "nrOfTicketsPerWeek"],
  mounted() {
    const supportChart = Highcharts.chart("container", {
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
        color: "#2bd86d",
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
          data: [5, 7, 3, 7, 5],
          stack: "time"
        },
        {
          type: "column",
          name: "WestArt answer time",
          data: [5, 7, 6, 3, 8],
          stack: "time"
        },
        {
          type: "spline",
          name: "nrOfTickets",
          data: this.nrOfTicketsPerWeek,
          color: "#2bd86d"
        }
      ]
    });
  }
};
</script>