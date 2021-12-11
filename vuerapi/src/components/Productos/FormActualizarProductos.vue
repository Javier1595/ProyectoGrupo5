<template>
    <b-row class="justify-content-md-center mt-5">
        <b-row>
            <b-card
                title="Consultar productos">
                <b-card-text>
                    <b-form>
                        <b-row class="mt-5">
                            <b-col md="6">
                                <b-form-group
                                    aria-placeholder="Ingrese el codigo del producto"
                                    label="Codigo del producto">
                                    <b-form-input type="text" id="ConsultarProducto" placeholder="Ingrese el Codigo del producto" required></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col md="6">
                                <b-button variant="danger" @click="consultar">Consultar Producto</b-button>
                            </b-col>
                        </b-row>
                    </b-form>
                </b-card-text>
            </b-card>
        </b-row>
        <b-row v-show="existe">
            <b-card
                title="Actualización de productos">
                <b-card-text>
                    <b-form>
                        <b-row class="mt-5">
                            <b-col md="6">
                                <b-form-group
                                    description="Ingrese la categoria del Producto"
                                    label="Categoria del producto">
                                    <b-form-input type="text" id="categoriaProducto" placeholder="Ingrese el Categoria del producto" required></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col md="6">
                                <b-form-group
                                    description="Ingrese el nombre del Producto"
                                    label="Nombre Producto">
                                    <b-form-input type="text" id="nombreProducto" placeholder="Ingrese el nombre del Producto" required></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>

                        </b-row>
                        <b-row class="mt-5">
                            <b-col md="6">
                                <b-form-group
                                    description="Ingrese el codigo del Producto"
                                    label="Codigo del Producto">
                                    <b-form-input type="text" id="codigoProducto" placeholder="Ingrese el codigo del Producto" readonly></b-form-input>
                                </b-form-group>
                            </b-col>

                             <b-col md="6">
                                <b-form-group
                                    description="Ingrese la descripcion del Producto"
                                    label="Descripcion Producto">
                                    <b-form-input type="text" id="descripcionProducto" placeholder="Ingrese la descripcion del Producto" required></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>

                        </b-row>
                        <b-row class="mt-5">
                              <b-col md="6">
                                <b-form-group
                                    description="Ingrese el precio del Producto"
                                    label="Precio del Producto">
                                    <b-form-input type="number" id="precioProducto" placeholder="Ingrese el precio del Producto" required></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col md="6">
                                <b-form-group
                                    description="Ingrese las unidades del Producto"
                                    label="Unidades del producto">
                                    <b-form-input type="number" id="unidadesProducto" placeholder="Ingrese las unidades del Producto" required></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row class="mt-5">
                            <b-col md="6">
                                <b-button variant="danger" @click="actualizar">Actualizar Producto</b-button>
                            </b-col>
                            <b-col md="6">
                                <b-button variant="danger" @click="eliminar">Eliminar Producto</b-button>
                            </b-col>
                        </b-row>
                    </b-form>
                </b-card-text>
            </b-card>
        </b-row>
    </b-row>
</template>

<script>
import api from "@/logic/api.js"
import auth from "@/logic/autentication.js";
export default {
    name: "formEdit",
    data: function(){
        return {
            existe: false,
        }
    },

    methods: {
        async consultar(){

            const consulta = document.getElementById('ConsultarProducto').value;
            if (consulta != "") {
                let respuesta = await api.obtenerUno(`producto/${consulta}`, auth.getToken());
                if(respuesta.data == "Token requerido"){
                    alert("No existe una sesión activa en el momento");
                    this.$router.push({name: 'LogIn'})
                }else if(respuesta.data == "Token invalidas"){
                    auth.limpiar();
                    alert("Inicie sesión nuevamente");
                    this.$router.push({name: 'LogIn'})
                }else if (respuesta.data != "No se encontró el producto en el sistema"){
                    this.existe = true
                    document.getElementById("categoriaProducto").value = respuesta.data.categoria;
                    document.getElementById("nombreProducto").value = respuesta.data.nombre;
                    document.getElementById("codigoProducto").value = respuesta.data.codigo;
                    document.getElementById("descripcionProducto").value = respuesta.data.descripcion;
                    document.getElementById("precioProducto").value = respuesta.data.precio;
                    document.getElementById("unidadesProducto").value = respuesta.data.unidades;
                }else{
                    this.existe = false
                    alert(`No se encontró el producto ${consulta} en el sistema`);
                    this.limpiarCampos();
                }
            }else{
                alert("Por favor escriba el codigo del producto");
                this.existe = false
                this.limpiarCampos();
            }
        },
        async eliminar(){
            const codigoProducto = document.getElementById('codigoProducto').value;
            if (codigoProducto != "") {
                let respuesta = await api.borrar(`producto/${codigoProducto}`);
                if(respuesta.data == "Token requerido"){
                    alert("No existe una sesión activa en el momento");
                    this.$router.push({name: 'LogIn'})
                }else if(respuesta.data == "Token invalidas"){
                    auth.limpiar();
                    alert("Inicie sesión nuevamente");
                    this.$router.push({name: 'LogIn'})
                }else if(respuesta.data == "Producto eliminado con éxito."){
                    alert(`el producto ${codigoProducto} se elimino correctamente`);
                    this.limpiarCampos();
                    this.existe = false
                }
            }else {
                 alert("Por favor llene todos los campos")
            }
        },
        async actualizar(){
            const categoria = document.getElementById('categoriaProducto').value;
            const nombre = document.getElementById('nombreProducto').value;
            const codigo = document.getElementById('codigoProducto').value;
            const descripcion= document.getElementById('descripcionProducto').value;
            const precio = document.getElementById('precioProducto').value;
            const unidades = document.getElementById('unidadesProducto').value;

            if (categoria != "" && nombre != "" && codigo != "" &&
            descripcion != "" && precio != "" && unidades != "") {
                let respuesta = await api.actualizar(`producto/${codigo}`,{categoria: categoria, nombre: nombre, codigo: codigo,
                descripcion: descripcion, precio: precio, unidades: unidades});
                if(respuesta.data == "Token requerido"){
                    alert("No existe una sesión activa en el momento");
                    this.$router.push({name: 'LogIn'})
                }else if(respuesta.data == "Token invalidas"){
                    auth.limpiar();
                    alert("Inicie sesión nuevamente");
                    this.$router.push({name: 'LogIn'})
                }else if(respuesta.data == "Actualizacion de producto satisfactoria"){
                    alert(`El producto ${codigo} se actualizo correctamente`);
                    this.limpiarCampos();
                    this.existe = false
                }
            }else {
                 alert("Por favor llene todos los campos")
            }
            
        },
        async limpiarCampos(){
            document.getElementById("categoriaProducto").value = "";
            document.getElementById("nombreProducto").value = "";
            document.getElementById("codigoProducto").value = "";
            document.getElementById("descripcionProducto").value = "";
            document.getElementById("precioProducto").value = "";
            document.getElementById("unidadesProducto").value = "";
        },
    }
};
</script>


<style scoped>
</style>