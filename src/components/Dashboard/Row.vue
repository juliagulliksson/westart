<template>
  <div class="main-container">
    
    <div class="grid">
      <div class="col-12 panel panel-info">
        <div class="panel-heading">
        Support tickets Table
        </div>
      </div>
    </div>
    <Row1 :mockData="mockData"></Row1>

  </div>
</template>

<script>

import mockData from '../../mockdata.json'
import Row1 from './Row1'

export default {
  name: 'Row',
  components: {
    'Row1': Row1
  },
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
  font-size: 1.2em;
  padding: 0.6em 0em 0.4em 0em;
  margin: 0px auto;
  color: rgb(97, 95, 95);
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
 
  margin-top: 2em;
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
</style>
