<template>
  <div class="grid">
    <div class="col"></div>
    <div class="col-10">
      <table>
        <tr class="th-days">
        <th>Resource</th>
        <th>Måndag</th>
        <th>Tisdag</th>
        <th>Onsdag</th>
        <th>Torsdag</th>
        <th>Fredag</th>
        </tr>


        <tr class="th-dates">
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
    </div>
    <div class="col"></div>
  </div>


</template>

<script>
export default {
  props: ["mockSchema"]
};
</script>

<style>
th {
  padding: 0em 3em;
}
</style>
