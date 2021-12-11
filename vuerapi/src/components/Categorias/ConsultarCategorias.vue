<template>
  <b-row class="mt-5">
    <b-card
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        <h3>{{ nombre }}</h3>
        <p><b>Código: </b>{{ codigo }}</p>
        <p>{{ descripcion }}</p>
      </b-card-text>
      <b-button variant="primary">Click Me</b-button>
    </b-card>
  </b-row>
</template>

<script>

export default {
  name: "Fichas",
    props: {
        nombre: String,
        codigo: String,
        descripcion: String
    },
  data: function () {
    return {
      ruta: "https://picsum.photos/600/300/?image=25",
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
