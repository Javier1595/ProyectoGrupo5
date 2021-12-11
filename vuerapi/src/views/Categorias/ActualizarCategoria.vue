<template>
  <b-row class="mt-5">
    <h1>Actualizar categorias</h1>
    <FormActualizarCategorias />
  </b-row>
</template>

<script>
import FormActualizarCategorias from "@/components/Categorias/FormActualizarCategorias.vue";
import auth from "@/logic/autentication.js";
export default {
  name: "Categorias",
  components: {
    FormActualizarCategorias
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