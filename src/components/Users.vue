<template>
<div>
<div>
  {{array1}}
</div>
<div>
  {{array2}}
</div>
</div>

</template>

<script>

import InputField from './Input'
import Users from '../test.json'

export default {
  components: {
    'InputField': InputField
  },
  name: 'users',
  data () {
    return {
      array1: [],
      array2: []
    }
  },
  methods: {
    hide: function(){
      this.show = false
    }
  },
  created: function(){
    let array = [1, 2, 3, 4, 5, 6, 7, 8 ,9 ,10, 11, 12, 13, 14];

    if(array.length > 10){
      
     /*  console.log(array.slice(10))
      console.log(array.splice(0,10))  */
      
      /* this.array2 = array.slice(10); */ 
      this.array1 = array.splice(0,10);
      console.log(array)
    }
   
    

  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
} 
li{
  padding: 10px;
}
a {
  color: #42b983;
}
</style>
