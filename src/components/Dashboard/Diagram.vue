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
      dates: {},
      averageDays: []
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
            //Combine the 2 arrays
            tickets = tickets.concat(response.issues);
            this.setNrOfTicketsPerWeek(tickets);
            this.setAverageCloseDays(tickets);
            /* console.log(tickets); */
          });
        } else {
          this.setNrOfTicketsPerWeek(tickets);
          this.setAverageCloseDays(tickets);
        }
      });
    },
    setNrOfTicketsPerWeek(tickets) {
      const ticketWeekNumbers = this.getTicketWeekNumbers(tickets);
      const nrOfTicketsPerWeek = this.getNrOfTicketsPerWeek(ticketWeekNumbers);
      this.nrOfSupportTicketsPerWeek = nrOfTicketsPerWeek;
    },
    setAverageCloseDays(tickets) {
      const closedTickets = tickets.filter(
        ticket => ticket.status.name === "Closed"
      );
      /* 
      console.log(closedTickets); */

      const weekNrs = this.returnWeekNumbers();
      const weeksOfTickets = weekNrs.map(week => {
        week = Number(week);
        return {
          week: week,
          tickets: [],
          averageCloseDays: [],
          sumOfDays: ""
        };
      });

      for (let ticket of tickets) {
        let createdOnDate = new Date(ticket.created_on);
        let createdOnWeek = moment(createdOnDate).isoWeek();
        for (let week of weeksOfTickets) {
          if (createdOnWeek == week.week) {
            week.tickets.push(ticket);
          }
        }
      }
      /* console.log(weeksOfTickets); */
      let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      for (let week of weeksOfTickets) {
        let diffDays;
        for (let ticket of week.tickets) {
          let closedOn = moment(ticket.closed_on);
          closedOn = new Date(closedOn);
          let createdOn = moment(ticket.created_on);
          createdOn = new Date(createdOn);
          diffDays = Math.round(
            Math.abs((createdOn.getTime() - closedOn.getTime()) / oneDay)
          );
          //console.log(closedOn, createdOn);
          week.averageCloseDays.push(diffDays);
        }
      }
      /* console.log(weeksOfTickets); */
      let arraySum = [];

      for (let week of weeksOfTickets) {
        let sum = 0;
        /* console.log(week.averageCloseDays); */
        for (let closeDays of week.averageCloseDays) {
          if (!isNaN(closeDays)) {
            sum += closeDays;
          }
        }
        week.sumOfDays = sum;
      }
      /*  console.log(weeksOfTickets); */

      for (let week of weeksOfTickets) {
        //console.log(week.sumOfDays / week.tickets.length);
        let total = week.sumOfDays / week.tickets.length;
        total = Math.round(total * 10) / 10;
        console.log(total);
      }
      console.log(weeksOfTickets);

      /* for (let ticket of closedTickets) {
        let closedOn = new Date(ticket.closed_on);
        let createdOn = new Date(ticket.created_on);
        let diffDays = Math.round(
          Math.abs((createdOn.getTime() - closedOn.getTime()) / oneDay)
        ); */
      /* console.log(diffDays); */
    },
    getTicketWeekNumbers(tickets) {
      return tickets.map(ticket => {
        let createdOnDate = new Date(ticket.created_on);
        return moment(createdOnDate).isoWeek();
      });
    },
    getNrOfTicketsPerWeek(ticketWeekNrs) {
      const weekNrs = this.returnWeekNumbers();
      return weekNrs.map(week => {
        week = Number(week);
        return this.returnNrOfTicketsPerWeek(ticketWeekNrs, week);
      });
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