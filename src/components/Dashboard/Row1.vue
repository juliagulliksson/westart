<template>
  <div class="wrapper">
  <div class="dashboard-wrapper" id="row1">

    <div class="diagram-wrapper">
      <div class="panel panel-info graph">
        <div class="panel-heading">
          Svarstid support
        </div>
        <div class="panel-body">
          (Diagram)
        </div>
      </div>
    </div>
      
      <div class="four-wrap">
          <div class="col-2 row1 panel panel-info">
            <div class="panel-body">
                <p><span class="tickets">{{ mockData.supportTickets }}</span></p>
              </div>
              <div class="panel-heading">
                <h3>Support tickets</h3>
              </div>
            
          </div>
        
          <div class="col-2 row1 panel panel-info">
            <div class="panel-body">
              <p><span class="hours">{{ mockData.reportedHours }}</span> / <span class="weekly">{{ mockData.weeklyHours }}</span></p>
            </div>
            <div class="panel-heading">
              <h3>Timmar</h3>
            </div>
        </div>
          <div class="col-2 row1 panel panel-info">
            <div class="panel-body">
                <p><span class="tickets">{{ mockData.supportTickets }}</span></p>
              </div>
              <div class="panel-heading">
                <h3>Support tickets</h3>
              </div>
            
          </div>
        
          <div class="col-2 row1 panel panel-info">
            <div class="panel-body">
              <p><span class="hours">{{ mockData.reportedHours }}</span> / <span class="weekly">{{ mockData.weeklyHours }}</span></p>
            </div>
            <div class="panel-heading">
              <h3>Timmar</h3>
            </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  props: ['mockData']

}
</script>