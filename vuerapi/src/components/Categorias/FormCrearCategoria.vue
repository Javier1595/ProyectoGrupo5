<template>
    <b-row class="justify-content-md-center mt-5">
        <b-card
            title="Creación de categorias">
            <b-card-text>
                <b-form>
                    <b-row class="mt-5">
                        <b-col md="6">
                            <b-form-group
                                description="Ingrese el codígo de la categoría"
                                label="Codígo Categoría">
                                <b-form-input type="number"  id="codigoCategoria" placeholder="Ingrese el codígo de la categoría" required></b-form-input>
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
                        <b-col md="12">
                            <b-button variant="warning" @click="crearCategoria">Agregar categoría</b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </b-card-text>
        </b-card>
    </b-row>
</template>

<script>
import api from "@/logic/api.js"
import auth from "@/logic/autentication.js";
export default {
    name: "formEntrada",
    data: function(){
        return {

        }
    },

    methods: {
        async crearCategoria(){
            const consulta = document.getElementById('codigoCategoria').value;
            if(consulta != ""){
                let respuesta = await api.obtenerUno(`categoria/${consulta}`, auth.getToken());
                
                if(respuesta.data == "Token requerido"){
                    alert("No existe una sesión activa en el momento");
                    this.$router.push({name: 'LogIn'})
                }else if(respuesta.data == "Token invalidas"){
                    auth.limpiar();
                    alert("Inicie sesión nuevamente");
                    this.$router.push({name: 'LogIn'})
                }else if(respuesta.data === "No se encontró la categoría en el sistema"){
                    const codigo = document.getElementById('codigoCategoria').value;
                    const nombre = document.getElementById('nombreCategoria').value;
                    const descripcion = document.getElementById('descripcionCategoria').value;
                    if (codigo != "" && nombre != "" && descripcion != "") {
                        
                        let respuesta = await api.crear ("categoria",{nombre: nombre, codigo: codigo, descripcion: descripcion, token: auth.getToken()});
                        if(respuesta.data == "Categoría creada satisfactoriamente."){
                            console.log(respuesta)
                            alert(`La categoría ${nombre} se ha creado correctamente`);
                            this.limpiarCampos();
                        }
                    }else {
                        alert ("Por favor llene todos los campos");
                    }
                    
                }else{
                    alert(`La categoría ${consulta} ya se encuentra en el sistema`);
                    this.limpiarCampos();
                }
            }else{
                alert("Por favor escriba el código de la categoría");
            }
        },
        async limpiarCampos(){
            document.getElementById("codigoCategoria").value = "";
            document.getElementById("nombreCategoria").value = "";
            document.getElementById("descripcionCategoria").value = "";
        }
    }
};
</script>
<style scoped>
</style>