<template>
  <div class="table">

    <h1>Schema</h1>

   <!--  <Table :mockSchema="mockSchema"></Table> -->
   <template v-for="cm in mockSchema">
    <div v-for="names in cm" :key="names.id">
      {{names.name}}
    </div>
   </template>
   
  </div>

</template>


<script>
import Table from "./Table";
import mockSchema from "../../mockschema.json";

export default {
  name: "Schema",
  data() {
    return {
      mockSchema: mockSchema.map(mockSchema => mockSchema.cm)
      /*   cm: mockSchema.map(mockSchema => mockSchema.name) */
    };
  },
  components: {
    Table: Table
  },
  created() {
    console.log(mockSchema);
  }
};
</script>

<style>
.table {
  text-align: center;
  width: 60%;
  margin: 0px auto;
}

table td {
  padding: 10px 30px;
  border: 1px solid black;
}

.th-days th {
  border-top: 1px solid black;
}

.th-dates th,
.th-days th {
  padding: 5px 30px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  color: #31708f;
  background-color: #d9edf7;
  border-color: #31708f;
  text-align: center;
}

/* th{
   padding: 0em 3em;
} */
</style>