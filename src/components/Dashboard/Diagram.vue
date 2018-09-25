<template>
  <HighChart :weeks="weeks" :nrOfTicketsPerWeek="nrOfSupportTicketsPerWeek"></HighChart>
</template>

<script>
const moment = require("moment");
import Key from "../../key.json";
import HighChart from "./HighChart";

export default {
  data() {
    return {
      APIkey: Key.key,
      nrOfSupportTicketsPerWeek: [],
      weeks: [],
      isLoaded: false,
      dates: {}
    };
  },
  components: {
    HighChart: HighChart
  },
  methods: {
    getTickets(dates, urlParameters) {
      return fetch(
        `http://redmine.westart.se/issues.json?key=${
          this.APIkey
        }&created_on=%3E%3C${dates.startDate}|${
          dates.endDate
        }&status_id=*&${urlParameters}`
      ).then(response => response.json());
    },
    filterTicketsByDate(tickets) {
      //console.log(tickets);
      let ticketWeekNumbers = [];
      for (let ticket of tickets) {
        let dateObj = new Date(ticket.created_on);
        let weekNr = moment(dateObj).isoWeek();
        //console.log(weekNr);
        ticketWeekNumbers.push(weekNr);
      }

      console.log(ticketWeekNumbers);

      const weekNrs = this.returnWeekNumbers();
      //Loop through weekNrs [34,35 etc], and get the number of tickets per week
      /*  console.log(weekNrs); */
      for (let week of weekNrs) {
        //console.log(week);
        week = week.toString();
        console.log(this.filterWeek(ticketWeekNumbers, week));
      }
    },
    filterWeek(array, weekNumber) {
      return array.filter(arr => arr === weekNumber).length;
    },
    returnDateValues() {
      const dates = [
        this.setDates(35, 35),
        this.setDates(28, 28),
        this.setDates(21, 21),
        this.setDates(14, 14),
        this.setDates(7, 7)
      ];

      return dates;
    },
    setDates(startDate, endDate) {
      return {
        startDate: this.getDates(startDate).format("YYYY-MM-DD"),
        endDate: moment(this.getDates(endDate))
          .isoWeekday("Sunday")
          .format("YYYY-MM-DD")
      };
    },
    getDates(dayOffset) {
      return moment()
        .subtract(dayOffset, "d")
        .isoWeekday("Monday");
    },
    returnWeekNumbers() {
      return [
        this.getDates(35).format("w"),
        this.getDates(28).format("w"),
        this.getDates(21).format("w"),
        this.getDates(14).format("w"),
        this.getDates(7).format("w")
      ];
    }
  },
  created() {
    this.dates = this.setDates(35, 7);
    let tickets;
    this.getTickets(this.dates, "limit=100").then(response => {
      tickets = response.issues;
      if (response.issues.length === 100) {
        this.getTickets(this.dates, "offset=100&limit=100").then(response => {
          tickets = tickets.concat(response.issues);
          this.filterTicketsByDate(tickets);
        });
      }
    });
    const weeks = this.returnWeekNumbers();
    this.weeks = weeks;
  }
};
</script>