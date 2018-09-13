<template>
  <div>
    <h1>{{msg}}</h1>
  <input type="text" v-bind:value="msg" @input="changeMessage">
  <p>{{ message }}</p>

  </div>
</template>

<script>

  export default{
    props: ['msg',],
    data(){
      return{
        message: ''
      }
    },
    methods: {
      changeMessage(event){
        this.message = event.target.value
        this.$emit('messageChanged', this.message)
      }
    }
  }

</script>