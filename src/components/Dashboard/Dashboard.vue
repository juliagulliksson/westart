<template>
  <div class="main-container">
    
    <SupportTicketsTable :supportTickets="supportTickets"></SupportTicketsTable>
   <!--  <SupportTicketsTable v-else :supportTickets="supportTicketsPage2"></SupportTicketsTable> -->
       
    <Row1 :mockData="mockData" :nrOfSupportTickets="nrOfSupportTickets"></Row1>
    
  </div>
</template>

<script>
import mockData from "../../mockdata.json";
import Row1 from "./Row1";
import SupportTicketsTable from "./SupportTicketsTable";
import { DiffDays } from "./mixins/DiffDays.js";
import { GetTickets } from "./mixins/GetTickets.js";
const moment = require("moment");

export default {
  name: "Dashboard",
  components: {
    Row1: Row1,
    SupportTicketsTable: SupportTicketsTable
  },
  data() {
    return {
      mockData: mockData,
      supportTickets: [],
      supportTicketsPage2: [],
      nrOfSupportTickets: "",
      page1: true
    };
  },
  mixins: [DiffDays, GetTickets],
  methods: {
    getSupportTickets() {
      this.getTickets("limit=100").then(response => {
        this.setSupportTickets(response.issues);
      });
    },
    setSupportTickets(tickets) {
      this.nrOfSupportTickets = tickets.length;

      tickets = this.filterTickets(tickets);
      tickets.sort(this.sortTickets);

      if (tickets.length > 10) {
        this.supportTickets = tickets.splice(0, 10);
        this.supportTicketsPage2 = this.setPage2Tickets(tickets);
      } else {
        this.supportTickets = tickets;
      }
    },
    setPage2Tickets(tickets) {
      let page2Tickets = tickets.slice(10);
      if (page2Tickets.length > 10) {
        page2Tickets = page2Tickets.splice(0, 10);
      }
      return page2Tickets;
    },
    returnHighPriorityTickets(tickets) {
      return tickets.filter(
        ticket =>
          ticket.priority.name === "Hög" ||
          ticket.priority.name === "Omedelbar" ||
          ticket.priority.name === "Brådskande"
      );
    },
    filterTickets(tickets) {
      const highPriorityTickets = this.returnHighPriorityTickets(tickets);

      const noCostumerFeedback = highPriorityTickets.filter(
        ticket => ticket.status.name != "Waiting for customer feedback"
      );
      /* Get the "Waiting for costumer feedback" tickets updated 5 or more days ago
      If there are none, the function returns the original noCustomerFeedback array */
      const filteredTickets = this.sortCostumerFeedbackTickets(
        highPriorityTickets,
        noCostumerFeedback
      );

      return filteredTickets;
    },
    sortCostumerFeedbackTickets(highPriorityTickets, ticketArray) {
      const today = new Date();

      const customerFeedBackTickets = highPriorityTickets.filter(
        ticket => ticket.status.name === "Waiting for customer feedback"
      );

      for (let ticket of customerFeedBackTickets) {
        const updateDate = new Date(ticket.updated_on);
        // Calculate the difference of days between today and the date the ticket was last updated on
        const diffDays = this.returnDiffDays(
          today.getTime(),
          updateDate.getTime()
        );
        if (diffDays >= 5) {
          /* Push the tickets where Status = "Waiting for costumer feedback"
           and updated_on date is 5 or more days ago */
          ticketArray.push(ticket);
        }
      }
      return ticketArray;
    },
    sortTickets(tickets) {
      let sortingOrder;

      if (tickets.priority.name === "Hög") sortingOrder = 1;
      else if (tickets.priority.name === "Omedelbar") sortingOrder = -1;
      else if (tickets.priority.name === "Brådskande") sortingOrder = -1;
      return sortingOrder;
    }
  },
  created() {
    this.getSupportTickets();
    // Get support tickets every 5 minutes
    setInterval(() => {
      this.getSupportTickets();
    }, 300000);
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?lat=59.752852399999995&lon=18.7025318&appid=38825652b216759d64f897d81526a5fa&units=metric"
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        let sunrise = response.sys.sunrise;
        let sunset = response.sys.sunset;
        sunset = new Date(sunset * 1000);
        sunrise = new Date(sunrise * 1000);

        console.log(sunrise);
        console.log(sunset);
      });
  },
  mounted() {
    /* setInterval(() => {
      this.page1 = false;
    }, 10000);
    setInterval(() => {
      this.page1 = true;
    }, 30000); */
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.support-tickets {
  width: 98%;
  margin: 0px auto;
  margin-bottom: 20px;
}

.support-tickets .panel-body {
  width: 95%;
  margin: 0px auto;
}

div.main-container {
  width: 80%;
  margin: 0px auto;
}

p {
  font-size: 2em;
  margin: 0.5em 0em;
}

[class*="col-"],
[class*="col_"],
[class~="col"] {
  padding: 0;
}

div.row1 p {
  text-align: center;
}

.hours {
  color: #ed4736;
}

.panel-body p {
  color: hsla(0, 0%, 100%, 0.8);
  font-size: 2.6em;
}

div.graph {
  height: 300px;
}

.panel-heading {
  border-radius: 0;
}

body {
  background-color: #05101d;
}

.panel-info > .panel-heading {
  background-color: #27293d;
  border: 0;
}

.panel-info {
  border: 1px solid transparent;
}

.panel {
  background-color: #27293d;
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);
}

.panel-body {
  background-color: #27293d;
  padding: 5px;
}

.margin {
  margin-bottom: 30px;
}

.panel-heading h3 {
  font-size: 1.3em;
  color: #fff;
  font-weight: 200;
  margin-top: 10px;
  padding-left: 25px;
}

.dashboard-wrapper {
  display: flex;
  justify-content: space-between;
}

.diagram-wrapper {
  flex-basis: 49%;
  margin-left: 14px;
}

.diagram-wrapper .panel {
  height: 100%;
}

.four-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 40%;
  /*  flex-basis: 45%; */
  width: 95%;
}

.four-wrapper {
  display: flex;
  /*  align-items: center; */
  justify-content: center;
  flex-basis: 50%;
  height: 470px;
}

div.row1 {
  flex-basis: 46%;
  height: 100%;
  background-color: #27293d;
}

.no-margin {
  margin: 0;
}
</style>
