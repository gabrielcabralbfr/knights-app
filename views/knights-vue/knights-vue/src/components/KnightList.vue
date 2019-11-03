<template>
  <div>
    <div v-bind:key="knight.id" v-for="knight in knights">
      <v-card class="card" :raised="true">
        <v-card-title class="d-flex justify-space-between">
          {{ knight.nome }} ({{ knight.apelido }})
          <span>
          <v-icon color="#000">mdi-pencil</v-icon>
          <v-icon color="#000">mdi-delete</v-icon>
          </span>
        </v-card-title>
        <v-card-subtitle>{{ knight.atributo }}</v-card-subtitle>
        <v-card-text>
          <v-icon color="#fff">mdi-view-list</v-icon>
          <div class="knight-container">
            <div v-if="!isLoading" class="knight attr grid-container">
              <span class="attr grid-item">Idade: {{ knight.idade }}</span>
              <span class="attr grid-item">Qtd. Armas: {{ knight.armas }}</span>
              <span class="attr grid-item">Exp: {{ knight.exp }}</span>
              <span class="attr grid-item">Ataque: {{ knight.ataque }}</span>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    knights: Array,
    isLoading: Boolean
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span.placeholder,
span.subtitle-placeholder,
span.subtitle-placeholder {
  display: inline-block;
  width: 250px;
  height: 15px;
  background-color: #e3e3e3;
  border-radius: 4px;
  margin: 3px 0;
}
span.subtitle {
  width: 100px;
}
span.text {
  width: 125px;
}
.card {
  max-width: 500px;
  margin: 10px auto;
  width: 85%;
}
.v-card__title {
  font-size: 1rem;
}
.grid-container {
  display: grid;
  grid-column-gap: 10%;
  grid-template-columns: auto auto;
}
</style>