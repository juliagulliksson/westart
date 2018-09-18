<template>
 
<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="" alt="First slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="" alt="Second slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="" alt="Third slide">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

</template>

<script>

import InputField from './Input'
import Users from '../test.json'

export default {
  components: {
    'InputField': InputField
  },
  name: 'users',
  data () {
    return {
      /* newUser:  {
        name: "Julia",
        email: "julia@gmail.com",
        phone: "0008888"
      },
      users: [],
      message: "This is a great message!",
      show: true */
      users: Users.filter(User => User.age === 21)
    }
  },
  methods: {
    hide: function(){
      this.show = false
    }
  },
  created: function(){
    console.log("created")
   
    

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
