<template>
  <div>
    <form id="app" @submit="checkForm" action="https://vuejs.org/" method="post">
      <p v-if="errors.length">
        <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="name">Nombre</label>
        <input id="name" v-model="name" type="text" name="name" >
      </p>

      <p>
        <label for="code">Código</label>
        <input id="code" v-model="code" type="number"  name="code" min="0">
      </p>

      <p>
        <label for="description">Descripción</label>
        <input id="description" v-model="description" type="text" name="description" >
      </p>

      <p>
        <label for="cost">Precio</label>
        <input id="cost" v-model="cost" type="number"  name="cost" min="0">
      </p>

      <p>
        <label for="unit">Unidades</label>
        <input id="unit" v-model="unit" type="number"  name="unit" min="0">
      </p>

      <p>
        <label for="category">Categoria</label>
        <select id="category" v-model="category" name="category">
          <option>Comidas</option>
          <option>Bebidas</option>
          <option>Servicios</option>
        </select>
      </p>

      <p>
        <input type="submit" value="Enviar">
      </p>

    </form>
  </div>
</template>

<script>
export default {
  name: "Productos",
  data: function(){
      return {
          errors: [],
          name: null,
          code: null,
          description: null,
          cost: null,
          unit: null,
          category: null
      }
  },

  components: {
    
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];

      if (!this.name) {
        this.errors.push("El nombre es obligatorio.");
      }
       if (!this.code) {
        this.errors.push("El código es obligatorio.");
      }

       if (!this.cost) {
        this.errors.push("El precio es obligatorio.");
      }
      
      if (!this.errors.length) {
        return true;
      }

      e.preventDefault();
    }
    
  }
};
</script>