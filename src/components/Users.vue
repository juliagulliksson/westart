<template>
  <div class="hello">
    <h2>Users</h2>
    <ul>
      <li v-for="user in users">Name:{{user.name}} Email: {{user.email}} 
        Phone: {{user.phone}}</li>
      
    </ul>
    <input type="text" v-model="newUser.name"/>
    <input type="text" v-model="newUser.email"/>
    <button v-on:click="addUser">Add user</button>
 
  </div>
</template>

<script>

export default {
  name: 'users',
  data () {
    return {
      newUser:  {
        name: "Julia",
        email: "julia@gmail.com",
        phone: "0008888"
      },
      users: []
    }
  },
  methods: {
    addUser: function(){
      console.log(this.newUser)
      this.users.push({
        name: this.newUser.name,
        email: this.newUser.email,
        phone: this.newUser.phone

      })
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
