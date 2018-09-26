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
      yAxis: [
        {
          title: {
            text: "Antal ärenden"
          },
          opposite: true
        },
        {
          // Secondary yAxis
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: "bold",
              color: "gray"
            }
          },
          gridLineWidth: 0,
          title: {
            text: "Lösningstid"
            /* style: {
                        color: Highcharts.getOptions().colors[0]
                    } */
          } /* ,
          labels: {
            format: " dagar"
            style: {
                        color: Highcharts.getOptions().colors[0]
                    }
          } */
        }
      ],
      plotOptions: {
        column: {
          stacking: "normal"
        }
      },
      series: [
        {
          name: "Lösningstid",
          type: "column",
          yAxis: 1,
          data: [2, 5, 6, 7, 8],
          tooltip: {
            valueSuffix: " dagar"
          }
        },

        /* {
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
        }, */
        {
          type: "spline",
          name: "Ärenden",
          data: this.nrOfTicketsPerWeek,
          color: "#77e03a"
        }
      ]
    });
  }
};
</script>