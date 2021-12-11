<template>
  <div>
    <h1>{{miVariable}}</h1>
    <h2>{{rapi}}</h2>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data: function(){
    return{
      miVariable: "Este es el titulo del componente HelloWord",
      rapi: "Proyecto RapiDelicias"
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
