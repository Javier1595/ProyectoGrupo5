<template>
  <b-row class="mt-5">
    <h1>Consultar categorias</h1>
    <b-col cols="12" md="4" v-for="(valor) in informacion" :key="valor._id">
      <ConsultarCategorias :codigo="valor.codigo" :nombre="valor.nombre" :descripcion="valor.descripcion" />
    </b-col>
  </b-row>
</template>

<script>
import ConsultarCategorias from "@/components/Categorias/ConsultarCategorias.vue";
import api from "@/logic/api"
import auth from "@/logic/autentication.js";

export default {
  name: "Categorias",
  components: {
    ConsultarCategorias
  },
  data: function(){
    return{
      informacion:[],
    }
  },
  methods:{
    async buscarInfo(){
      let token = auth.getToken();
      if(token){
        let respuesta = await api.obtenerTodo("categorias",token);
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
    this.buscarInfo();
  }
};
</script>
<style scoped>
</style>