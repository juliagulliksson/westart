<template>
  <div class="main-container">
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
