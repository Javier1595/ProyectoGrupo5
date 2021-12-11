<template>
  <b-row class="mt-5">
    <b-card
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        <h3>{{ categoria }}</h3>
        <h3>{{ nombre }}</h3>
        <p><b>codigo: </b>{{ codigo }}</p>
        <p>{{ descripcion }}</p>
        <p>{{ precio }}</p>
        <p>{{ unidades }}</p>
      </b-card-text>
      
      <b-button @click="fueclick" variant="primary">Click Me</b-button>
    </b-card>
  </b-row>
</template>

<script>

export default {
  name: "Fichas",
    props: {
        categoria: String,
        nombre: String,
        codigo: String,
        descripcion: String,
        precio: Number,
        unidades: Number
        
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
