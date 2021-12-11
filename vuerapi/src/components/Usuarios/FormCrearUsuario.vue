<template>
  <b-row class="justify-content-md-center mt-5">
    <b-card title="Creacion de usuarios">
      <b-card-text>
        <b-form>
          <b-row class="mt-5">
            <b-col md="6">
              <b-form-group
                description="Ingrese el nombre del usuario"
                label="Nombres"
              >
                <b-form-input
                  type="text"
                  id="nombreUsuario"
                  placeholder="Ingrese el nombre del usuario"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                description="Ingrese el apellido del usuario"
                label="Apellidos"
              >
                <b-form-input
                  type="text"
                  id="apellidoUsuario"
                  placeholder="Ingrese el apellido del usuario"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mt-5">
            <b-col md="6">
              <b-form-group 
              description="Ingrese el documento del usuario"
              label="Documento">
                <b-form-input
                  type="number"
                  id="documentoUsuario"
                  placeholder="Ingrese el documento del usuario"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                description="Ingrese el telefono del usuario"
                label="Telefono Usuario"
              >
                <b-form-input
                  type="number"
                  id="telefonoUsuario"
                  placeholder="Ingrese el telefono del usuario"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mt-5">
            <b-col md="6">
              <b-form-group
                description="Ingrese el correo eléctronico del usuario"
                label="Correo eléctronico"
              >
                <b-form-input
                  type="email"
                  id="correoUsuario"
                  placeholder="Ingrese el correo eléctronico del usuario"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                description="Ingrese la clave del usuario"
                label="Clave"
              >
                <b-form-input
                  type="password"
                  id="claveUsuario"
                  placeholder="Ingrese la clave del usuario"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mt-5">
            <b-col md="12">
              <b-button variant="warning" @click="crearUsuario">Crear Usuario</b-button>
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
    async crearUsuario() {
      const consulta = document.getElementById("documentoUsuario").value;
      if (consulta != "") {
        let respuesta = await api.obtenerUno(`usuario/${consulta}`, auth.getToken());
        
        if(respuesta.data == "Token requerido"){
            alert("No existe una sesión activa en el momento");
            this.$router.push({name: 'LogIn'})
        }else if(respuesta.data == "Token invalidas"){
            auth.limpiar();
            alert("Inicie sesión nuevamente");
            this.$router.push({name: 'LogIn'})
        }else if (respuesta.data == "No se encontró el usuario en el sistema") {
          const documentoUsuario =
            document.getElementById("documentoUsuario").value;
          const nombreUsuario = document.getElementById("nombreUsuario").value;
          const apellidoUsuario =
            document.getElementById("apellidoUsuario").value;
          const telefonoUsuario =
            document.getElementById("telefonoUsuario").value;
          const correoUsuario = document.getElementById("correoUsuario").value;
          const claveUsuario = document.getElementById("claveUsuario").value;

          if (
            documentoUsuario != "" &&
            nombreUsuario != "" &&
            apellidoUsuario != "" &&
            telefonoUsuario != "" &&
            correoUsuario != "" &&
            claveUsuario != ""
          ) {
          let respuesta = await api.crear("usuario", {
              documento: documentoUsuario,
              nombre: nombreUsuario,
              apellido: apellidoUsuario,
              telefono: telefonoUsuario,
              correo: correoUsuario,
              clave: claveUsuario,
              token: auth.getToken()
            });
            if(respuesta.data == "Usuario creado exitosamente"){
              alert("Usuario creado con exito");
              this.limpiarCampos();
            }
          } else {
            alert("Por favor llene todos los campos");
          }
        } else {
          alert(`el usuario ${consulta} ya se encuentra en el sistema`);
          this.limpiarCampos();
        }
      } else {
        alert("Por favor escriba el documento del usuario");
      }
    },
    async limpiarCampos(){
        document.getElementById("documentoUsuario").value = "";
        document.getElementById("nombreUsuario").value = "";
        document.getElementById("apellidoUsuario").value = "";
        document.getElementById("telefonoUsuario").value = "";
        document.getElementById("correoUsuario").value = "";
        document.getElementById("claveUsuario").value = "";
    }
  }
};
</script>
<style scoped>
</style>