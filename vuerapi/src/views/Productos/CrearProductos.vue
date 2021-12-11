<template>
  <b-row class="mt-5">
    <h1>Crear Productos</h1>
    <FormCrearProductos />
  </b-row>
</template>

<script>
import FormCrearProductos from "@/components/Productos/FormCrearProductos.vue";
import auth from "@/logic/autentication.js";
export default {
  name: "Productos",
  components: {
    FormCrearProductos
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