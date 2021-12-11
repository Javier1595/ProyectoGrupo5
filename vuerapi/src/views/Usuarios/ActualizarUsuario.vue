<template>
  <b-row class="mt-5">
    <h1>Actualizar Usuarios</h1>
    <FormActualizarUsuario />
  </b-row>
</template>

<script>
import FormActualizarUsuario from "@/components/Usuarios/FormActualizarUsuario.vue";
import auth from "@/logic/autentication.js";
export default {
  name: "Usuarios",
  components: {
    FormActualizarUsuario
  },
  methods:{
    async verificarToken(){
      let token = auth.getToken();
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