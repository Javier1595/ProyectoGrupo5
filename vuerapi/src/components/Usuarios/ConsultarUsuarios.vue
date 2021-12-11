<template>
  <b-row class="mt-5">
    <b-card
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        <h3>{{ nombre }}</h3>
        <h3>{{ apellido }}</h3>
        <p><b> Documento: </b>{{ documento }}</p>
        <p>{{ telefono }}</p>
        <p>{{ correo }}</p>
        <p>{{ clave }}</p>
      </b-card-text>
      
      <!--<b-button @click="fueclick" variant="primary">Click Me</b-button>-->
    </b-card>
  </b-row>
</template>

<script>

export default {
  name: "Fichas",
    props: {
        documento: String,
        nombre: String,
        apellido: String,
        telefono: String,
        direcciones: Object,
        correo: String,
        clave: String
        
    },
  data: function () {
    return {
      boton: " ",
    };
  },
    methods: {
      fueclick(){
        this.$emit("seleccionado")
      }
    }
};
</script>

<style scoped>
</style>
