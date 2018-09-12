<template>
  <div class="main-container">
    <div class="grid-spaceAround" id="row1">
      <div class="col-2 row1">
        <p><span class="tickets">{{ mockData.supportTickets }}</span></p>
        <h3>Support tickets</h3>
      </div>
    
      <div class="col-2 row1">
        <p><span class="hours">{{ mockData.reportedHours }}</span> / <span class="weekly">{{ mockData.weeklyHours }}</span></p>
        <h3>Timmar</h3>
      </div>
    
      <div class="col-3 row1">
        <p><span>(Diagram)</span></p>
        <h3>Svarstid support</h3>
      </div>
      <div class="col-2 row1">
        <p><span>{{ mockData.randomData }}</span></p>
        <h3>Data</h3>
    </div>
    </div>
  </div>
</template>

<script>

import mockData from '../../mockdata.json'


export default {
  name: 'Row',
  mockData: mockData,
  data () {
    return {
        mockData: mockData
    }
  },
  methods: {
    
  },
  created: function(){
    console.log(mockData)
   
   /*   fetch('http://localhost/westart/mockdata.json',{mode: "no-cors"} )
    .then(response => response.json())
    .then((response) => {
      console.log(response)
    }) */
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
div.main-container{
  width: 80%;
  margin: 0px auto;
}

h3{
  font-size: 1em;
  padding: 0.6em 0em 0.4em 0em;
  margin: 0px auto;
  border-top: 1px solid #dce3ef;
  color: rgb(97, 95, 95);
}

p{
  font-size: 2em;
  margin: 0.5em 0em;
}

div.row1{
  background-color: #FFF;
  text-align: center;
  box-shadow: 0 8px 6px -6px rgb(73, 73, 73);
  border-radius: 2px;
  margin-top: 2em;
}

div.col-3{
  height: 130px;  
}

div.col-2{
  height: 130px;
}

div.grid-spaceAround [class*=col-], [class*=col_], [class~=col]{
  padding: 0.5rem 0rem; 
}

div.graph-container{
  height: 250px;
}

.hours{
  color: indianred;
}

.tickets{
  color: rgb(57, 97, 134);
}
</style>
