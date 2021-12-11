import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

// Seccion de categorias
import Categorias from "../views/Categorias/Categorias.vue";
import CrearCategorias from "../views/Categorias/CrearCategorias.vue";
import ActualizarCategorias from "../views/Categorias/ActualizarCategoria.vue";

// Seccion de Usuarios
import Usuarios from "../views/Usuarios/Usuarios.vue";
import CrearUsuarios from "../views/Usuarios/CrearUsuarios.vue";
import ActualizarUsuario from "../views/Usuarios/ActualizarUsuario.vue";

// Seccion de Productos
import Productos from "../views/Productos/Productos.vue";
import CrearProductos from "../views/Productos/CrearProductos.vue";
import ActualizarProductos from "../views/Productos/ActualizarProductos.vue";

import LogIn from "../views/LogIn/LogIn.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },

  // Categorias
  {
    path: "/categorias",
    name: "Categorias",
    component: Categorias,
  },
  {
    path: "/ActualizarCategorias",
    name: "ActualizarCategorias",
    component: ActualizarCategorias,
  },
  {
    path: "/CrearCategorias",
    name: "CrearCategorias",
    component: CrearCategorias,
  },

  // Usuarios
  {
    path: "/usuarios",
    name: "Usuarios",
    component: Usuarios,
  },
  {
    path: "/ActualizarUsuario",
    name: "ActualizarUsuario",
    component: ActualizarUsuario,
  },
  {
    path: "/CrearUsuarios",
    name: "CrearUsuarios",
    component: CrearUsuarios,
  },
  // Productos
  {
    path: "/productos",
    name: "Productos",
    component: Productos,
  },
  {
    path: "/ActualizarProductos",
    name: "ActualizarProductos",
    component: ActualizarProductos,
  },
  {
    path: "/CrearProductos",
    name: "CrearProductos",
    component: CrearProductos,
  },  
  {
    path: "/login",
    name: "LogIn",
    component: LogIn,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
