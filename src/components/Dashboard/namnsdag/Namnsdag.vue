<template>
   <div class="row1 panel">
      <div class="panel-heading">
          <h3>Namnsdag {{today }}</h3>
        </div>
      <div class="namnsdag panel-body"> 
        <p v-for="(namn, index) in namnsdagar" :key="index">{{namn}}</p>
      </div>
    </div>
</template>

<script>
import { ProxyFetch } from "./../mixins/ProxyFetch.js";
const moment = require("moment");
export default {
  data() {
    return {
      today: "",
      namnsdagar: []
    };
  },
  mixins: [ProxyFetch],
  methods: {
    fetchNamnsdag() {
      const today = moment().format("YYYY/MM/DD");
      const targetUrl = "http://api.dryg.net/dagar/v2.1/" + today;
      this.proxyFetch(targetUrl).then(response => {
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