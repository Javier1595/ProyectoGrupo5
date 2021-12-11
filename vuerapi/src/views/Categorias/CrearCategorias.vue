<template>
  <b-row class="mt-5">
    <h1>Crear categorias</h1>
    <FormCrearCategorias />
  </b-row>
</template>

<script>
import FormCrearCategorias from "@/components/Categorias/FormCrearCategoria.vue";
import auth from "@/logic/autentication.js";
export default {
  name: "Categorias",
  components: {
    FormCrearCategorias
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