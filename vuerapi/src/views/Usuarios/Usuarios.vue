<template>
  <b-row class="mt-5">
    <h1>Consultar Usuarios</h1>
    <b-col cols="12" md="4" v-for="(valor) in informacion" :key="valor._id">
      <ConsultarUsuarios :documento="valor.documento" :nombre="valor.nombre" :apellido="valor.apellido" :telefono="valor.telefono" :correo="valor.correo"/>
    </b-col>
  </b-row>
</template>

<script>
import ConsultarUsuarios from "@/components/Usuarios/ConsultarUsuarios.vue";
import api from "@/logic/api";
import auth from "@/logic/autentication.js";

export default {
  name: "Usuarios",
  components: {
    ConsultarUsuarios
  },
  data: function(){
    return{
      informacion:[],
    }
  },
  methods:{
    async verificarToken(){
      let token = auth.getToken();
      if(token){
        let respuesta = await api.obtenerTodo("usuarios",token);
        if(respuesta.data == "Token requerido"){
            alert("No existe una sesión activa en el momento");
            this.$router.push({name: 'LogIn'})
        }else if(respuesta.data == "Token invalidas"){
            auth.limpiar();
            alert("Inicie sesión nuevamente");
            this.$router.push({name: 'LogIn'})
        }else{
          this.informacion = respuesta.data;
        }
      }else{
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