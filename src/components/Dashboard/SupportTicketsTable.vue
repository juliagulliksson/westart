<template>
  <table>
    <tr>
        <th>Id</th>
        <th>Author</th>
        <th>Due date</th>
        <th>Assigned to</th>
        <th>Project</th>
        <th>Created</th>
        <th>Status</th>
        <th>Subject</th>
        <!-- <th>Description</th> -->
    </tr>
    <tr v-for="supportTicket in supportTickets" :key="supportTicket.id">
      <template>
        <td >
          {{supportTicket.id}}
        </td>
        <td>
          {{supportTicket.author.name}}
        </td>
        <td>
          {{supportTicket.due_date}}
        </td>
        <td>
          {{supportTicket.assigned_to.name}}
        </td>
        <td>
          {{supportTicket.project.name}}
        </td>
        <td>
          {{supportTicket.created_on.slice(0, 10)}}
        </td>
         <td>
          {{supportTicket.status.name}}
        </td>
        <td>
          {{supportTicket.subject}}
        </td>
        <!-- <td>
          {{supportTicket.description.slice(0,150)}}
        </td> -->
      </template>
    </tr>
  </table>

</template>

<script>
export default{
  props: ['supportTickets']
}

</script>

<style>



</style>