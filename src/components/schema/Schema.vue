<template>
  <div class="table">

    <h1>Schema</h1>

    <Table :mockSchema="mockSchema"></Table>
  </div>

</template>


<script>
import Table from './Table'
import mockSchema from '../../mockschema.json'

export default {
  name: "Schema",
  data(){
    return {
      mockSchema: mockSchema
    }
  },
  components: {
    'Table': Table
  },
  created(){
    console.log(mockSchema)
  }
}

</script>

<style>
/* th{
   padding: 0em 3em;
} */
</style>