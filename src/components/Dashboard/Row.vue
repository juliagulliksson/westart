<template>
  <div class="main-container">
    
    <SupportTicketsTable v-if="page1" :supportTickets="supportTickets"></SupportTicketsTable>
    <SupportTicketsTable v-else :supportTickets="supportTicketsPage2"></SupportTicketsTable>
       
    <Row1 :mockData="mockData" :nrOfSupportTickets="nrOfSupportTickets"></Row1>
    
  </div>
</template>

<script>

import mockData from '../../mockdata.json'
import Row1 from './Row1'
import SupportTicketsTable from './SupportTicketsTable';
import Key from '../../key.json';

export default {
  name: 'Row',
  components: {
    'Row1': Row1,
    'SupportTicketsTable': SupportTicketsTable
  },
  
  data () {
    return {
        mockData: mockData,
        supportTickets: [],
        supportTicketsPage2: [],
        nrOfSupportTickets: "",
        APIkey: Key.key,
        page1: true,
        page2: false
    }
  },
  methods: {
    getSupportTickets(urlParameters){
      fetch(`http://redmine.westart.se/issues.json?key=${this.APIkey}&${urlParameters}`)
        .then(response => response.json())
        .then((response) => {
          this.setSupportTickets(response.issues);
        });
    },
    setSupportTickets(tickets){
      
      this.nrOfSupportTickets = tickets.length;

      tickets = this.setTicketsInOrder(tickets);

        if (tickets.length > 10) {
          this.supportTicketsPage2 = tickets.slice(10);
          this.supportTickets = tickets.splice(0, 10);
        } else {
          this.supportTickets = tickets;
        }

    },
    setTicketsInOrder(tickets){

      const highPriorityTickets = tickets
      .filter(response => response.priority.name === "Hög" 
      || response.priority.name === "Omedelbar" || response.priority.name === "Brådskande"); 

      highPriorityTickets.sort(this.sortTickets);

      return highPriorityTickets;
    },
    sortTickets(tickets){
      let sortingOrder;

      if (tickets.priority.name === "Hög") sortingOrder = 1;
      else if (tickets.priority.name === "Omedelbar") sortingOrder = -1;
      return sortingOrder;
    }
    
  },
  created(){
     this.getSupportTickets("limit=100");
     //setInterval(this.getSupportTickets("limit=100"), 10000);
     
  },
  mounted(){
    /* setInterval(() => {
       this.page1 = false;
     }, 5000)
     setInterval(() => {
       this.page1 = true;
     }, 10000) */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.support-tickets{
  width: 98%;
  margin: 0px auto; 
  margin-bottom: 20px; 
}

.support-tickets .panel-body{
  width: 95%;
  margin: 0px auto;
}
  
div.main-container{
  width: 80%;
  margin: 0px auto;
}

.panel-heading h3{
  font-size: 1.2em;
  padding: 0.6em 0em 0.4em 0em;
  margin: 0px auto;
  color: #31708f;
  font-weight: 700;
  text-align: center;
}

p{
  font-size: 2em;
  margin: 0.5em 0em;
}

[class*=col-], [class*=col_], [class~=col]{
  padding: 0;
}

div.row1{
  background-color: #FFF;
  text-align: center;
}

.hours{
  color: indianred;
} 

.tickets{
  color: rgb(57, 97, 134);
}

div.graph{
  height: 300px;
}

.panel-heading{
  border-radius: 0;
}

.dashboard-wrapper{
  display: flex;
  justify-content: space-between;
}

.diagram-wrapper{
  flex-basis: 50%;
}

.diagram-wrapper .panel{
  height: 100%;
}

.four-wrap{
  flex-basis: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

div.row1{
  flex-basis: 46%;
}

.no-margin{
  margin: 0;
} 
</style>
