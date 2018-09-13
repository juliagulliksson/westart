<template>
  <div class="hello">
    <h2>Users</h2>
    <ul>
      <li v-for="(user, i) in users" v-bind:key="i">Name:{{user.name}} Email: {{user.email}} 
        Phone: {{user.phone}}</li>
      
    </ul>
   <!--  <input type="text" v-model="newUser.name"/>
    <input type="text" v-model="newUser.email"/> -->
    <InputField v-if="show" :msg="message" @messageChanged="message = $event"></InputField>
    <p v-else>Else</p>
    <button v-on:click="show = !show">Add user</button>
 
  </div>
</template>

<script>

import InputField from './Input'

export default {
  components: {
    'InputField': InputField
  },
  name: 'users',
  data () {
    return {
      newUser:  {
        name: "Julia",
        email: "julia@gmail.com",
        phone: "0008888"
      },
      users: [],
      message: "This is a great message!",
      show: true
    }
  },
  methods: {
    hide: function(){
      this.show = false
    }
  },
  created: function(){
    console.log("created")
   
     fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      this.users = response;
    })
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
} 
li{
  padding: 10px;
}
a {
  color: #42b983;
}
</style>
