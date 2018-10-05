<template>
   <div class="row1 panel panel-info">
      <div class="panel-heading">
          <h3>Namnsdag {{today }}</h3>
        </div>
      <div class="namnsdag panel-body"> 
        <p v-for="(namn, index) in namnsdagar" :key="index">{{namn}}</p>
      </div>
    </div>
</template>

<script>
const moment = require("moment");
export default {
  data() {
    return {
      today: "",
      namnsdagar: []
    };
  },
  methods: {
    fetchNamnsdag() {
      const today = moment().format("YYYY/MM/DD");
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const targetUrl = "http://api.dryg.net/dagar/v2.1/" + today;
      fetch(proxyUrl + targetUrl)
        .then(response => response.json())
        .then(response => {
          this.namnsdagar = response.dagar[0].namnsdag;
        });
    },
    setToday() {
      let today = new Date();
      let options = { day: "numeric", month: "long" };
      today = today.toLocaleDateString("se-SE", options);
      this.today = today;
    }
  },
  created() {
    this.setToday();
    this.fetchNamnsdag();
  }
};
</script>