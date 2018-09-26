<template>
  <HighChart v-if="nrOfSupportTicketsPerWeek.length === 5" :weeks="weeks" :nrOfTicketsPerWeek="nrOfSupportTicketsPerWeek"></HighChart>
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
    setTickets() {
      let tickets;
      this.getTickets(this.dates, "limit=100").then(response => {
        tickets = response.issues;
        if (response.issues.length === 100) {
          //Get additional tickets
          this.getTickets(this.dates, "offset=100&limit=100").then(response => {
            tickets = tickets.concat(response.issues);
            this.filterTicketsByDate(tickets);
          });
        } else {
          this.filterTicketsByDate(tickets);
        }
      });
    },
    filterTicketsByDate(tickets) {
      let ticketWeekNumbers = [];
      for (let ticket of tickets) {
        let dateObj = new Date(ticket.created_on);
        let weekNr = moment(dateObj).isoWeek();
        ticketWeekNumbers.push(weekNr);
      }

      const weekNrs = this.returnWeekNumbers();
      //Loop through weekNrs and get the number of tickets per week
      let nrOfTicketsPerWeek = [];
      for (let week of weekNrs) {
        week = Number(week);
        let ticketsPerWeek = this.returnNrOfTicketsPerWeek(
          ticketWeekNumbers,
          week
        );
        nrOfTicketsPerWeek.push(ticketsPerWeek);
      }
      this.nrOfSupportTicketsPerWeek = nrOfTicketsPerWeek;
    },
    returnNrOfTicketsPerWeek(array, weekNumber) {
      return array.filter(arr => arr === weekNumber).length;
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
      //Calculate the week numbers by offsetting the number of days, i.e 35 days = 5 weeks ago
      let dayOffsets = [35, 28, 21, 14, 7];
      return dayOffsets.map(day => this.getDates(day).format("w"));
    }
  },
  created() {
    this.dates = this.setDates(35, 7);
    this.weeks = this.returnWeekNumbers();
    this.setTickets();
  }
};
</script>