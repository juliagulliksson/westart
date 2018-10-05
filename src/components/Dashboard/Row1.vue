<template>
  <div class="dashboard-wrapper" id="row1">
    <div class="diagram-wrapper">
      <div class="panel panel-info graph">
        <div class="panel-heading">
          <h3>Svarstid support</h3>
        </div>
        <Diagram></Diagram>
      </div>
    </div>
    
    <div class="four-wrapper">
      <SmallWidget :data="nrOfSupportTickets" :title="'Support Tickets'" :margin="true"></SmallWidget>
      
      
        <div class="row1 panel panel-info margin">
          <div class="panel-heading">
            <h3>Timmar</h3>
          </div>
          <div class="panel-body">
            <p><span class="hours">{{ mockData.reportedHours }}</span> / <span class="weekly">{{ mockData.weeklyHours }}</span></p>
          </div>
        </div>
       
      <!-- <SmallWidget :data="nrOfSupportTickets" :title="'Namnsdag'" :margin="false"></SmallWidget> -->
      <Namnsdag></Namnsdag>
      <WeatherForecast></WeatherForecast>
        
      <!-- <SmallWidget :data="nrOfSupportTickets" :title="'Vädret'" :margin="false"></SmallWidget> -->
    </div><!-- four-wrapper-->
  </div><!-- dashboard-wrapper -->
</template>

<script>
import Diagram from "./Diagram";
import SmallWidget from "./SmallWidget";
import WeatherForecast from "./weatherForecast/WeatherForecast";
import Namnsdag from "./namnsdag/Namnsdag";
export default {
  props: ["mockData", "nrOfSupportTickets"],
  components: {
    Diagram: Diagram,
    SmallWidget: SmallWidget,
    WeatherForecast: WeatherForecast,
    Namnsdag: Namnsdag
  }
};
</script>