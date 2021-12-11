<template>
  <b-row class="mt-5">
    <HelloWorld/>
    <H2> comidas </H2>
  </b-row>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import auth from "@/logic/autentication.js";
export default {
  name: "Home",
  components: {
    HelloWorld
  },
  methods:{
    async verificarToken(){
      let token = auth.getToken();
      console.log(token)
      if(token==null){
          alert("No existe una sesión activa en el momento");
          this.$router.push({name: 'LogIn'})
      }
    }
  },
  created(){
    this.verificarToken();
  }
};
</script>
<style scoped>
</style>
