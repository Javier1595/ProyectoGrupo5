<template>
    <b-row class="justify-content-md-center mt-5">
        <b-card
            title="Iniciar Sesión">
            <b-card-text>
                <b-form>
                    <b-row class="mt-5">
                        <b-col md="12">
                            <b-form-group
                                description="Ingrese el número de documento"
                                label="Documento de identidad">
                                <b-form-input type="number" id="documento" placeholder="Ingrese el número de documento" required></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mt-5">
                        <b-col md="12">
                            <b-form-group
                                description="Ingrese la contraseña"
                                label="Contraseña">
                                <b-form-input type="password" id="clave" placeholder="Ingrese la contraseña" required></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mt-5">
                        <b-col md="12">
                            <b-button variant="danger" @click="iniciarSesion">Iniciar Sesión</b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </b-card-text>
        </b-card>
    </b-row>
</template>

<script>
import api from "@/logic/api.js"
import autho from "@/logic/autentication.js"

export default {
    name: "formEntrada",
    data: function(){
        return {
        }
    },

    methods: {
        async iniciarSesion(){
            const documento = document.getElementById('documento').value;
            const clave = document.getElementById('clave').value;
            if (documento != "" && clave != "") {
                try{
                    let respuesta = await api.crear("usuario/tokenUsuario", {
                        documento: documento,
                        clave: clave
                    });
                    console.log(respuesta);
                    if(respuesta.data == "Usuario no encontrado"){
                        alert("El usuario no se encuentra registrado en el sistema");
                    }else if(respuesta.data == "Clave incorrecta"){
                        alert("La clave ingresada es incorrecta");
                    }else if(respuesta.data == "credenciales requeridas"){
                        alert("Por favor llene todos los campos");
                    }else{
                        autho.createToken(respuesta.data);
                        location.reload()
                    }
                }catch(err){
                    console.log(err);
                }
            }else {
                 alert("Por favor llene todos los campos")
            }            
        }
    }
};
</script>
<style scoped>
</style>