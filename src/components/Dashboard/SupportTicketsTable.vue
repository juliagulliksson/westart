<template>
  <div class="support-tickets panel panel-info">
    <div class="panel-heading">
    <h3>Support tickets</h3>
    </div>
    <div class="panel-body">
      <table>
        <tr>
            <th>#</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Subject</th>
            <th>Assignee</th>
            <th>Due date</th>
            <th>Created</th> 
            <th>Updated</th>
        </tr>
        <template v-for="supportTicket in supportTickets">
          <tr :key="supportTicket.id" :class="{immediate: supportTicket.priority.name === 'Omedelbar'}">
          <td >
            {{supportTicket.id}}
          </td>
            <td>
            {{supportTicket.status.name}}
          </td>
          <td :class="{red: supportTicket.priority.name === 'Omedelbar'}">
            {{supportTicket.priority.name}}
          </td>
          <td>
            {{supportTicket.subject.slice(0,50)}}<span v-if="supportTicket.subject.length > 50">...</span>
          </td>
          <td v-if="supportTicket.assigned_to != undefined">
            {{supportTicket.assigned_to.name}}
          </td>
          <td v-else>Unknown</td>
          <td>
            {{supportTicket.due_date}}
          </td>
          
          <td>
            {{ sliceDate(supportTicket.created_on) }}
          </td> 
          <td>
            {{ sliceDate(supportTicket.updated_on) }}
          </td>
          </tr>
        </template>
      </table>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    supportTickets: Array
  },
  methods: {
    sliceDate(date) {
      return date.slice(0, 16).replace("T", " ");
    }
  }
};
</script>

<style>
table {
  width: 100%;
  margin-bottom: 10px;
  border-collapse: collapse;
}

.red {
  /*  color: rgb(197, 8, 8); */
  /* color: #ffcc00; */
  font-weight: 700;
}

/* .immediate {
  background-color: #44486b;
} */

/* .immediate td {
  color: #ffcc00;
} */

/* .immediate td {
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
} */

table td {
  padding: 12px 0px 12px 0px;
  border-top: 1px solid hsla(0, 0%, 100%, 0.1);
  color: hsla(0, 0%, 100%, 0.8);
  font-size: 0.9em;
}

table td:not(:last-child) {
  padding-right: 10px;
}

table td:not(:first-child) {
  padding-left: 10px;
}

table th {
  padding: 10px 0px 10px 0px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  color: hsla(0, 0%, 100%, 0.7);
  font-size: 0.8em;
}

table th:not(:last-child) {
  padding-right: 10px;
}
table th:not(:first-child) {
  padding-left: 10px;
}
</style>