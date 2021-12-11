<template>
  <b-row class="justify-content-md-center mt-5">
    <b-card title="Creacion de productos">
      <b-card-text>
        <b-form>
          <b-row class="mt-5">

            <!-- Aqúi deberia colocar un select para categoria-->
                  <b-col md="6">
              <b-form-group
                description="Ingrese la categoría del producto"
                label="Categoria del Producto"
              >
                <b-form-input
                  type="text"
                  id="categoriaProducto"
                  placeholder="Ingrese la categoria del producto"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>

                  <b-col md="6">
              <b-form-group
                description="Ingrese el nombre del producto"
                label="Nombre del Producto"
              >
                <b-form-input
                  type="text"
                  id="nombreProducto"
                  placeholder="Ingrese el nombre del producto"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>         
          </b-row>

          <b-row class="mt-5">

              <b-col md="6">
              <b-form-group
                description="Ingrese el codigo del producto"
                label="Codigo del producto"
              >
                <b-form-input
                  type="text"
                  id="codigoProducto"
                  placeholder="Ingrese el codigo del producto"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>

              <b-col md="6">
              <b-form-group
                description="Ingrese una descripcion del producto"
                label="Descripcion del producto"
              >
                <b-form-input
                  type="text"
                  id="descripcionProducto"
                  placeholder="Ingrese una descripcion del producto"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="mt-5">
            

            <b-col md="6">
              <b-form-group
                description="Ingrese el precio"
                label="Precio del Producto"
              >
                <b-form-input
                  type="number"
                  id="precioProducto"
                  placeholder="Ingrese el precio"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>

             <b-col md="6">
              <b-form-group
                description="Ingrese unidades del producto"
                label="Unidades del Producto"
              >
                <b-form-input
                  type="number"
                  id="unidadesProducto"
                  placeholder="Ingrese unidades del producto"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
         
          <b-row class="mt-5">
            <b-col md="12">
              <b-button variant="danger" @click="crearProductos">Crear Producto</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-card-text>
    </b-card>
  </b-row>
</template>

<script>
import api from "@/logic/api.js";
import auth from "@/logic/autentication.js";
export default {
  name: "formEntrada",
  data: function () {
    return {};
  },

  methods: {
    async crearProductos() {
      const consulta = document.getElementById("codigoProducto").value;
      if (consulta != "") {
        let respuesta = await api.obtenerUno(`producto/${consulta}`, auth.getToken());
        if(respuesta.data == "Token requerido"){
            alert("No existe una sesión activa en el momento");
            this.$router.push({name: 'LogIn'})
        }else if(respuesta.data == "Token invalidas"){
            auth.limpiar();
            alert("Inicie sesión nuevamente");
            this.$router.push({name: 'LogIn'})
        }else if (respuesta.data === "No se encontró el producto en el sistema") {

          const categoriaProducto = document.getElementById("categoriaProducto").value;
          const nombreProducto = document.getElementById("nombreProducto").value;
          const codigoProducto = document.getElementById("codigoProducto").value;
          const descripcionProducto = document.getElementById("descripcionProducto").value;
          const precioProducto = document.getElementById("precioProducto").value;
          const unidadesProducto = document.getElementById("unidadesProducto").value;

          if (
            categoriaProducto != "" &&
            nombreProducto != "" &&
            codigoProducto != "" &&
            descripcionProducto != "" &&
            precioProducto != "" &&            
            unidadesProducto != ""
          ) {
            
            let respuesta = await api.crear("producto", {

              categoria: categoriaProducto,
              nombre: nombreProducto,
              codigo: codigoProducto,
              descripcion: descripcionProducto,
              precio: precioProducto,             
              unidades: unidadesProducto,
              token: auth.getToken()
            });
            if(respuesta.data == "Producto creado satisfactoriamente."){
                console.log(respuesta)
                alert(`El producto ${nombreProducto} se ha creado correctamente`);
                this.limpiarCampos();
            }
          } else {
            alert("Por favor llene todos los campos");
          }
        } else {
          alert(`el producto ${consulta} ya se encuentra en el sistema`);
          this.limpiarCampos();
        }
      } else {
        alert("Por favor escriba el codigo del producto");
      }
    },
    async limpiarCampos(){
        document.getElementById("categoriaProducto").value = "";
        document.getElementById("nombreProducto").value = "";
        document.getElementById("codigoProducto").value = ""; 
        document.getElementById("descripcionProducto").value = "";
        document.getElementById("precioProducto").value = "";           
        document.getElementById("unidadesProducto").value = "";
    }
  },
};
</script>
<style scoped>
</style>