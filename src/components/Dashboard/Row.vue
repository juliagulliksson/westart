<template>
  <div class="main-container">
    
    <SupportTicketsTable v-if="page1" :supportTickets="supportTickets"></SupportTicketsTable>
    <SupportTicketsTable v-else :supportTickets="supportTicketsPage2"></SupportTicketsTable>
       
    <Row1 :mockData="mockData" :nrOfSupportTickets="nrOfSupportTickets"></Row1>
 <!--   <div id="container" style="width:100%; height:400px;"></div> -->
    
  </div>
</template>

<script>
import mockData from "../../mockdata.json";
import Row1 from "./Row1";
import SupportTicketsTable from "./SupportTicketsTable";
import Key from "../../key.json";

export default {
  name: "Row",
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
      APIkey: Key.key,
      page1: true
    };
  },
  methods: {
    getSupportTickets(urlParameters) {
      fetch(
        `http://redmine.westart.se/issues.json?key=${
          this.APIkey
        }&${urlParameters}`
      )
        .then(response => response.json())
        .then(response => {
          this.setSupportTickets(response.issues);
        });
    },
    setSupportTickets(tickets) {
      this.nrOfSupportTickets = tickets.length;

      tickets = this.filterTickets(tickets);
      tickets.sort(this.sortTickets);
      console.log(tickets);

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
    filterTickets(tickets) {
      const highPriorityTickets = tickets.filter(
        ticket =>
          ticket.priority.name === "Hög" ||
          ticket.priority.name === "Omedelbar" ||
          ticket.priority.name === "Brådskande"
      );

      const noCostumerFeedback = highPriorityTickets.filter(
        ticket => ticket.status.name != "Waiting for customer feedback"
      );
      /*Get the "Waiting for costumer feedback" tickets updated 5 or more days ago
      If there are none, the function returns the original noCustomerFeedback array */
      const filteredTickets = this.sortCostumerFeedbackTickets(
        highPriorityTickets,
        noCostumerFeedback
      );

      return filteredTickets;
    },
    sortCostumerFeedbackTickets(highPriorityTickets, ticketArray) {
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const today = new Date();

      const customerFeedBackTickets = highPriorityTickets.filter(
        ticket => ticket.status.name === "Waiting for customer feedback"
      );

      for (let ticket of customerFeedBackTickets) {
        const updateDate = new Date(ticket.updated_on);
        //Calculate the difference of days between today and the date the ticket was last updated on
        const diffDays = Math.round(
          Math.abs((today.getTime() - updateDate.getTime()) / oneDay)
        );
        if (diffDays >= 5) {
          /*Push the tickets where Status = "Waiting for costumer feedback"
           and updated_on date is 5 or more days ago*/
          ticketArray.push(ticket);
        }
      }
      return ticketArray;
    },
    sortTickets(tickets) {
      let sortingOrder;

      if (tickets.priority.name === "Hög") sortingOrder = 1;
      else if (tickets.priority.name === "Omedelbar") sortingOrder = -1;
      return sortingOrder;
    }
  },
  created() {
    this.getSupportTickets("limit=100");
    //Get support tickets every 5 minutes
    setInterval(() => {
      this.getSupportTickets("limit=100");
    }, 300000);
  },
  mounted() {
    /* setInterval(() => {
      this.page1 = false;
    }, 5000);
    setInterval(() => {
      this.page1 = true;
    }, 10000); */
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

div.row1 {
  background-color: #fff;
  text-align: center;
}

.hours {
  color: indianred;
}

.tickets {
  color: rgb(57, 97, 134);
}

div.graph {
  height: 300px;
}

.panel-heading {
  border-radius: 0;
  height: 60px;
  padding-bottom: 1.5em;
}

.margin {
  margin-bottom: 30px;
}

.panel-heading h3 {
  font-size: 1.2em;
  color: #31708f;
  font-weight: 700;
  text-align: center;
  margin-top: 10px;
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
}

.no-margin {
  margin: 0;
}
</style>
