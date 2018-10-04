<template>
  <div class="panel-body" id="container"></div>
</template>

<script>
const Highcharts = require("highcharts");
export default {
  props: ["weeks", "nrOfTicketsPerWeek", "averageCloseDays"],
  mounted() {
    const supportChart = Highcharts.chart("container", {
      legend: {
        itemStyle: {
          color: "#9a9a9a"
          /*  display: "none" */
          /*             fontWeight: 'bold' */
        }
      },
      chart: {
        type: "column",
        backgroundColor: "#27293d",
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
          style: { color: "#9a9a9a" }
        },
        categories: this.weeks,
        labels: {
          style: {
            color: "#9a9a9a"
          }
        }
      },
      yAxis: [
        {
          title: {
            text: "Antal ärenden",
            style: { color: "#FFF" }
          },
          opposite: true,
          labels: {
            style: {
              color: "#FFF"
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
              color: "#FFF"
            }
          },
          labels: {
            style: {
              color: "#FFF"
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
            stops: [[0, "#651778"], [1, "#27293d"]]
          },
          borderWidth: "2",
          legendColor: "#FFF",
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
          color: "#FFCC00",
          legendColor: "#FFF"
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