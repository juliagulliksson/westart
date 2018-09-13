<template>
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
</template>

<script>
export default {
  props: ['mockData']

}
</script>