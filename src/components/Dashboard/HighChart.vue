<template>
  <div class="panel-body" id="container"></div>
</template>

<script>
const Highcharts = require("highcharts");
export default {
  props: ["weeks", "nrOfTicketsPerWeek", "averageCloseDays"],
  mounted() {
    const gray = "#9a9a9a";
    const purple = "";
    const darkBlue = "#27293d";
    const yellow = "#FFCC00";
    const supportChart = Highcharts.chart("container", {
      legend: {
        itemStyle: {
          color: gray
          /*  display: "none" */
          /*             fontWeight: 'bold' */
        }
      },
      chart: {
        type: "column",
        backgroundColor: darkBlue,
        style: {
          fontFamily: "'Poppy', sans-serif",
          letterSpacing: "1px",
          fontSize: "1em"
        }
      },
      title: {
        text: "",
        style: { color: "#FFF" }
      },

      xAxis: {
        title: {
          text: "Vecka",
          style: { color: gray }
        },
        categories: this.weeks,
        labels: {
          style: {
            color: gray
          }
        }
      },
      yAxis: [
        {
          title: {
            text: "Antal ärenden",
            style: { color: gray }
          },
          opposite: true,
          labels: {
            style: {
              color: gray
            }
          },
          gridLineColor: "hsla(0, 0%, 100%, 0.1)"
        },
        {
          // Secondary yAxis
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: "bold",
              color: "#FFF"
            }
          },
          gridLineWidth: 0,
          title: {
            text: "Lösningstid",
            style: {
              color: gray
            }
          },
          labels: {
            style: {
              color: gray
            }
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
          data: this.averageCloseDays,
          tooltip: {
            valueSuffix: " dagar"
          },
          color: "transparent",
          borderColor: "",
          color: {
            linearGradient: {
              x1: 0,
              x2: 0,
              y1: 0,
              y2: 1
            },
            stops: [[0, "#651778"], [1, darkBlue]]
          },
          borderWidth: "2",
          legendColor: gray,
          boxShadow: "120px 80px 40px 20px #0ff"
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
          color: yellow,
          legendColor: gray
        }
      ]
    });
  }
};
</script>

<style>
#container {
  background-color: #27293d;
}
</style>