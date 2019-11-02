<template>
  <div>
    <div v-bind:key="knight.id" v-for="knight in knights">
      <v-card class="card" :raised="true">
        <v-card-title>
          <span v-if="isLoading" class="placeholder title"></span>
          {{ knight.nome }} ({{ knight.apelido }})
        </v-card-title>

        <v-card-subtitle>
          <span v-if="isLoading" class="placeholder subtitle"></span>
          {{ knight.atributo }}
        </v-card-subtitle>
        <v-card-text>
          <div class="knight-container">
            <p class="knight-basic-info"></p>
            <div v-if="isLoading" class="knight attr grid-container">
              <span v-if="isLoading" class="attr grid-item placeholder text"></span>
              <span v-if="isLoading" class="attr grid-item placeholder text"></span>
              <span v-if="isLoading" class="attr grid-item placeholder text"></span>
              <span v-if="isLoading" class="attr grid-item placeholder text"></span>
            </div>
            <div v-if="!isLoading" class="knight attr grid-container">
              <span class="attr grid-item">Idade: {{ knight.idade }}</span>
              <span class="attr grid-item">Qtd. Armas{{ knight.armas }}</span>
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
}

.grid-container {
  display: grid;
  grid-column-gap: 150px;
  grid-row-gap: 10px;
  grid-template-columns: auto auto;
  /* grid-gap: 50px 100px; */
}
</style>