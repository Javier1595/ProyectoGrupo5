<template>
    <b-row class="justify-content-md-center mt-5">
        <b-row>
            <b-card
                title="Consultar categorias">
                <b-card-text>
                    <b-form>
                        <b-row class="mt-5">
                            <b-col md="6">
                                <b-form-group
                                    aria-placeholder="Ingrese el codígo de la categoría"
                                    label="Codígo Categoría">
                                    <b-form-input type="text" id="ConsultarCategoria" placeholder="Ingrese el codígo de la categoría" required></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col md="6">
                                <b-button variant="warning" @click="consultar">Consultar categoría</b-button>
                            </b-col>
                        </b-row>
                    </b-form>
                </b-card-text>
            </b-card>
        </b-row>
        <b-row v-show="existe">
            <b-card
                title="Actualización de categorias">
                <b-card-text>
                    <b-form>
                        <b-row class="mt-5">
                            <b-col md="6">
                                <b-form-group
                                    label="Codígo Categoría">
                                    <b-form-input type="text" id="codigoCategoria" placeholder="Ingrese el codígo de la categoría" readonly></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col md="6">
                                <b-form-group
                                    description="Ingrese el nombre de la categoría"
                                    label="Nombre Categoría">
                                    <b-form-input type="text" id="nombreCategoria" placeholder="Ingrese el nombre de la categoría" required></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row class="mt-5">
                            <b-col md="12">
                                <b-form-group
                                    description="Ingrese la descripción de la categoría"
                                    label="Descripción Categoría">
                                    <b-form-textarea type="text" id="descripcionCategoria" placeholder="Ingrese la descripción de la categoría" required></b-form-textarea>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row class="mt-5">
                            <b-col md="6">
                                <b-button variant="warning" @click="actualizar">Actualizar categoría</b-button>
                            </b-col>
                            <b-col md="6">
                                <b-button variant="warning" @click="eliminar">Eliminar categoría</b-button>
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
            const consulta = document.getElementById('ConsultarCategoria').value;
            if(consulta != ""){
                let respuesta = await api.obtenerUno(`categoria/${consulta}`, auth.getToken());
                if(respuesta.data == "Token requerido"){
                    alert("No existe una sesión activa en el momento");
                    this.$router.push({name: 'LogIn'})
                }else if(respuesta.data == "Token invalidas"){
                    auth.limpiar();
                    alert("Inicie sesión nuevamente");
                    this.$router.push({name: 'LogIn'})
                }else if(respuesta.data != "No se encontró la categoría en el sistema" ){
                    this.existe = true
                    document.getElementById('codigoCategoria').value = respuesta.data.codigo;
                    document.getElementById('nombreCategoria').value = respuesta.data.nombre;
                    document.getElementById('descripcionCategoria').value = respuesta.data.descripcion;
                }else{
                    this.existe = false
                    alert(`No se encontró la categoría ${consulta} en el sistema`);
                    this.limpiarCampos();
                }
            }else{
                alert("Por favor escriba el código de la categoría");
                this.existe = false
                this.limpiarCampos();
            }
        },
        async eliminar(){
            const codigoCategoria = document.getElementById('codigoCategoria').value;
            if (codigoCategoria != "") {
                let respuesta = await api.borrar(`categoria/${codigoCategoria}`);
                if(respuesta.data == "Token requerido"){
                    alert("No existe una sesión activa en el momento");
                    this.$router.push({name: 'LogIn'})
                }else if(respuesta.data == "Token invalidas"){
                    auth.limpiar();
                    alert("Inicie sesión nuevamente");
                    this.$router.push({name: 'LogIn'})
                }else if(respuesta.data == "Categoría eliminada con éxito."){
                    alert(`La categoría ${codigoCategoria} se elimino correctamente`);
                    this.limpiarCampos();
                    this.existe = false
                }
            }
        },
        async actualizar(){
            const codigoCategoria = document.getElementById('codigoCategoria').value;
            const nombreCategoria = document.getElementById('nombreCategoria').value;
            const descripcionCategoria = document.getElementById('descripcionCategoria').value;

            if (codigoCategoria != "" && nombreCategoria != "" && descripcionCategoria != "") {
                
                let respuesta = await api.actualizar(`categoria/${codigoCategoria}`,{nombre: nombreCategoria, descripcion: descripcionCategoria});
                if(respuesta.data == "Token requerido"){
                    alert("No existe una sesión activa en el momento");
                    this.$router.push({name: 'LogIn'})
                }else if(respuesta.data == "Token invalidas"){
                    auth.limpiar();
                    alert("Inicie sesión nuevamente");
                    this.$router.push({name: 'LogIn'})
                }else if(respuesta.data == "Actualizacion de categoría satisfactoria."){
                    alert(`La categoría ${codigoCategoria} se actualizo correctamente`);
                    this.limpiarCampos();
                    this.existe = false
                }
            }else {
                 alert("Por favor llene todos los campos")
            }
        },
        async limpiarCampos(){
            document.getElementById("ConsultarCategoria").value = "";
            document.getElementById("codigoCategoria").value = "";
            document.getElementById("nombreCategoria").value = "";
            document.getElementById("descripcionCategoria").value = "";
        }
    }
};
</script>


<style scoped>
</style>