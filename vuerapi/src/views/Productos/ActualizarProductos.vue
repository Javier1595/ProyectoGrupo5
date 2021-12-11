<template>
  <b-row class="mt-5">
    <h1>Actualizar productos</h1>
    <FormActualizarProductos />
  </b-row>
</template>

<script>
import FormActualizarProductos from "@/components/Productos/FormActualizarProductos.vue";
import auth from "@/logic/autentication.js";
export default {
  name: "Productos",
  components: {
    FormActualizarProductos
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