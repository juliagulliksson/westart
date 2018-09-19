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
            {{supportTicket.created_on.slice(0, 16).replace("T", " ")}}
          </td> 
          <td>
            {{supportTicket.updated_on.slice(0, 16).replace("T", " ")}}
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
  }
};
</script>

<style>
table {
  width: 100%;
}

.red {
  color: rgb(197, 8, 8);
  font-weight: 700;
}

/* table tr:nth-child(even){
  background-color: #d9edf7;
} */

.immediate {
  background-color: rgb(247, 199, 199);
}

.immediate td {
  border: 1px solid rgb(212, 111, 111);
}

table td {
  padding: 10px;
  border: 1px solid #bbbcbd;
}

table th {
  padding: 10px;
}
</style>