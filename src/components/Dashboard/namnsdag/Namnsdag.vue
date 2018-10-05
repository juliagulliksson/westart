<template>
   <div class="row1 panel panel-info">
      <div class="panel-heading">
          <h3>Namnsdag<span v-if="namnsdagar.length > 1">ar</span> {{today }}</h3>
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
      today: moment().format("DD/MM"),
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
    }
  },
  created() {
    this.fetchNamnsdag();
  }
};
</script>