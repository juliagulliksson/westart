<template>
  <HighChart v-if="nrOfSupportTicketsPerWeek.length === 5" 
  :averageCloseDays="averageCloseDays"
  :weeks="weeks" :nrOfTicketsPerWeek="nrOfSupportTicketsPerWeek"></HighChart>
</template>

<script>
const moment = require("moment");
import HighChart from "./HighChart";
import { DiffDays } from "./mixins/DiffDays.js";
import { GetTickets } from "./mixins/GetTickets.js";

export default {
  data() {
    return {
      weeks: [],
      weeksOfTickets: [],
      nrOfSupportTicketsPerWeek: [],
      averageCloseDays: []
    };
  },
  mixins: [DiffDays, GetTickets],
  components: {
    HighChart: HighChart
  },
  methods: {
    setTickets(dates) {
      let urlParameters = `created_on=%3E%3C${dates.startDate}|${
        dates.endDate
      }&status_id=*&limit=100`;
      let tickets;
      this.getTickets(urlParameters).then(response => {
        tickets = response.issues;
        if (response.issues.length === 100) {
          urlParameters = `created_on=%3E%3C${dates.startDate}|${
            dates.endDate
          }&status_id=*&limit=100&offset=100`;
          //Get additional tickets
          this.getTickets(urlParameters).then(response => {
            //Combine the 2 arrays
            tickets = tickets.concat(response.issues);
            this.setTicketFunctions(tickets);
          });
        } else {
          this.setTicketFunctions(tickets);
        }
      });
    },
    setTicketFunctions(tickets) {
      this.setWeeksOfTickets(tickets);
      this.setNrOfSupportTicketsPerWeek();
      this.setAverageCloseDays();
    },
    setNrOfSupportTicketsPerWeek() {
      const tickets = this.weeksOfTickets.map(week => week.tickets.length);
      this.nrOfSupportTicketsPerWeek = tickets;
    },
    setWeeksOfTickets(tickets) {
      // Set objects to an array, with empty values except for week numbers
      let weeksOfTickets = this.setWeekObjects();
      // Add tickets to every week
      weeksOfTickets = this.setTicketsToWeekObjects(tickets, weeksOfTickets);
      this.weeksOfTickets = weeksOfTickets;
    },
    setTicketsToWeekObjects(tickets, weeksOfTickets) {
      for (let ticket of tickets) {
        let createdOnWeek = this.returnCreatedOnWeekNumber(ticket.created_on);
        for (let week of weeksOfTickets) {
          if (createdOnWeek === week.week) {
            week.tickets.push(ticket);
          }
        }
      }
      return weeksOfTickets;
    },
    returnCreatedOnWeekNumber(date) {
      let createdOnDate = new Date(date);
      return moment(createdOnDate).isoWeek();
    },
    setWeekObjects() {
      const weekNrs = this.returnWeekNumbers();
      // Create the objects that will hold the tickets for the respective week
      return weekNrs.map(week => {
        week = Number(week);
        return {
          week: week,
          tickets: [],
          closeDays: [],
          averageCloseDays: ""
        };
      });
    },
    setTicketsToClosedTickets() {
      for (let week of this.weeksOfTickets) {
        week.tickets = week.tickets.filter(
          ticket => ticket.status.name === "Closed"
        );
      }
    },
    calculateCloseDays() {
      for (let week of this.weeksOfTickets) {
        for (let ticket of week.tickets) {
          let dateFrom = this.getTicketDates(ticket.created_on);
          let dateTo = this.getTicketDates(ticket.closed_on);
          // Function from DiffDays mixin
          week.closeDays.push(this.returnDiffDays(dateFrom, dateTo));
        }
      }
    },
    getTicketDates(date) {
      let ticketDate = moment(date);
      return new Date(ticketDate).getTime();
    },
    setAverageCloseDaysForWeeks() {
      for (let week of this.weeksOfTickets) {
        let sum = 0;
        for (let closeDays of week.closeDays) {
          sum += closeDays;
        }
        let total = sum / week.tickets.length;
        total = Math.round(total * 10) / 10;
        week.averageCloseDays = total;
      }
    },
    returnAverageCloseDays() {
      return this.weeksOfTickets.map(week => week.averageCloseDays);
    },
    setAverageCloseDays() {
      this.setTicketsToClosedTickets();

      // Calculate how many days between closed_on and created_on
      this.calculateCloseDays();

      this.setAverageCloseDaysForWeeks();

      this.averageCloseDays = this.returnAverageCloseDays();
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
      // Calculate the week numbers by offsetting the number of days, i.e 35 days = 5 weeks ago
      let dayOffsets = [35, 28, 21, 14, 7];
      return dayOffsets.map(day => this.getDates(day).format("w"));
    }
  },
  created() {
    this.weeks = this.returnWeekNumbers();
    this.setTickets(this.setDates(35, 7));
  }
};
</script>