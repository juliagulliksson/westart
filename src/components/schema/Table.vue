<template>

<table>
  <tr>
  <th>Resource</th>
  <th>Måndag</th>
  <th>Tisdag</th>
  <th>Onsdag</th>
  <th>Torsdag</th>
  <th>Fredag</th>
  </tr>


   <tr>
     <th></th>
  <th v-for="(mockSchemas, i) in mockSchema.schema" v-bind:key="i"> {{mockSchemas.date}}</th>
  </tr> 

  <tr>
 
    <tr>
      <td>Christoffer Mossberg</td>
      <td v-for="workLoads in mockSchema.schema" v-bind:key="workLoads.cm[0].id">
        {{workLoads.cm[0].name}}</td>
      

    </tr> 
    
    <tr>
      <td></td>
      <td v-for="workLoads in mockSchema.schema" v-bind:key="workLoads.cm[1].id">
      {{workLoads.cm[1].name}}</td></tr>

</table>


</template>

<script>
export default {
  props: ['mockSchema'],
  methods: {
    isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
    }
    return true;
}
  }
}
</script>

<style>

th{
  padding: 0em 3em;
}

</style>
