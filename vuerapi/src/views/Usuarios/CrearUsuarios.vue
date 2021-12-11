<template>
  <b-row class="mt-5">
    <h1>Crear Usuarios</h1>
    <FormCrearUsuario />
  </b-row>
</template>

<script>
import FormCrearUsuario from "@/components/Usuarios/FormCrearUsuario.vue";
import auth from "@/logic/autentication.js";
export default {
  name: "Usuarios",
  components: {
    FormCrearUsuario
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