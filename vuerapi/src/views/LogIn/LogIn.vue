<template>
  <b-row class="mt-5">
    <h1>Iniciar sesión</h1>
    <FormLogIn />
  </b-row>
</template>

<script>
import FormLogIn from "@/components/LogIn/FormLogIn.vue";
import auth from "@/logic/autentication.js";
export default {
  name: "LogIn",
  components: {
    FormLogIn
  },
  methods:{
    async verificarToken(){
      let token = auth.getToken();
      console.log(token)
      if(token!=null){
          alert("Ya se encuentra logueado en el sistema");
          this.$router.push({name: 'Home'})
      }
    }
  },
  created(){
    this.verificarToken();
  }
};
</script>