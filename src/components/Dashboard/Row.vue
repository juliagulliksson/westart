<template>
  <div class="main-container">
    
    <div class="grid">
      <div class="col-12 panel panel-info">
        <div class="panel-heading">
        <h3>Support tickets</h3>
        </div>
        <div class="panel-body">
          <SupportTicketsTable :supportTickets="supportTickets"></SupportTicketsTable>
        </div>
      </div>
    </div>
    <Row1 :mockData="mockData" 
    :nrOfSupportTickets="nrOfSupportTickets"></Row1>
    

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
        nrOfSupportTickets: "",
        key: Key.key
    }
  },
  methods: {
    setSupportTickets(tickets){
        tickets = tickets.issues;
        const highPriority = tickets.filter(response => response.priority.name === "Hög")
        this.supportTickets = highPriority
        this.nrOfSupportTickets = tickets.length
    }
    
  },
  created: function(){
     fetch(`http://redmine.westart.se/issues.json?key=${this.key}&limit=100`)
      .then(response => response.json())
      .then((response) => {
        this.setSupportTickets(response)
      })
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

table tr:nth-child(even){
  background-color: #d9edf7;
}

table td{
  padding: 10px;
  border: 1px solid #bce8f1;
}

table th{
  padding: 10px;
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
 /* 
  margin-top: 2em; */
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
  flex-basis: 44%;
}

.no-margin{
  margin: 0;
}
</style>
