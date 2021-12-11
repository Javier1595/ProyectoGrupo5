<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="warning" class="fixed-top" >
      <b-container>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand exact><img src="@/assets/logotiporapi.png"></b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <!--<b-nav-item :to="{name: 'About'}">Nosotros</b-nav-item>-->
            <b-nav-item-dropdown
              v-if="logueado"
              id="my-nav-dropdown"
              text="Categorías"
              toggle-class="nav-link-custom"
              right
            >
              <b-dropdown-item v-if="logueado" :to="{name: 'Categorias'}">Consultar</b-dropdown-item>
              <b-dropdown-item v-if="logueado" :to="{name: 'CrearCategorias'}">Crear</b-dropdown-item>
              <b-dropdown-item v-if="logueado" :to="{name: 'ActualizarCategorias'}">Actualizar</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown
              v-if="logueado"
              id="my-nav-dropdown"
              text="Usuarios"
              toggle-class="nav-link-custom"
            >
              <b-dropdown-item v-if="logueado" :to="{name: 'Usuarios'}">Consultar</b-dropdown-item>
              <b-dropdown-item v-if="logueado" :to="{name: 'CrearUsuarios'}">Crear</b-dropdown-item>
              <b-dropdown-item v-if="logueado" :to="{name: 'ActualizarUsuario'}">Actualizar</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown
              v-if="logueado"
              id="my-nav-dropdown"
              text="Productos"
              toggle-class="nav-link-custom"
            >
              <b-dropdown-item v-if="logueado" :to="{name: 'Productos'}">Consultar</b-dropdown-item>
              <b-dropdown-item v-if="logueado" :to="{name: 'CrearProductos'}">Crear</b-dropdown-item>
              <b-dropdown-item v-if="logueado" :to="{name: 'ActualizarProductos'}">Actualizar</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          <b-navbar-nav>
              <b-nav-item v-if="!logueado" :to="{name: 'LogIn'}">Iniciar Sesión</b-nav-item>
              <b-nav-item v-if="logueado" @click="cerrarsesion">Cerrar Sesión</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>
<script>
import auth from "@/logic/autentication.js"
export default {
  name: "App",
  data:function() {
      return {
        logueado: auth.isToken()
      }
  },
  methods:{
    cerrarsesion(){
      auth.limpiar();
      location.reload()
      this.$router.push({name: 'LogIn'})
    }
  }
};
</script>
<style>
#app {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0px;
  color: black;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.miesitlo {
  color: black;
}
 body{
   margin: 0px;
   padding: 0px;
   background: rgb(226, 125, 9);
 }

 img {
  width: 200px;
  height: 80px;
}
</style>
