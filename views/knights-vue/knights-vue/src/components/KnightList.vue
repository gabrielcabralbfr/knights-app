<template>
  <div>
    <div v-bind:key="knight.id" v-for="knight in knights">
      <v-card class="card" :raised="true">
        <v-card-title class="d-flex justify-space-between">
          <span v-if="!knight.isBeeingEdited">{{ knight.nome }} ({{ knight.apelido }})</span>
          <span v-if="knight.isBeeingEdited">
            {{ knight.nome }}
            <input id="nickname-edit" type="text" v-model="knight.apelido" />
            <v-btn text color="#000" @click="editKnight(knight)">OK</v-btn>
            <v-icon color="#00ff38" v-if="knight.editedSuccessfully">mdi-progress-check</v-icon>
          </span>
          <span>
            <v-icon @click="toggleKnightEdit(knight)" color="#000">mdi-pencil</v-icon>
            <v-icon @click="deleteKnight(knight.id)" color="#000">mdi-delete</v-icon>
          </span>
        </v-card-title>
        <v-card-subtitle>{{ knight.atributo }}</v-card-subtitle>
        <v-card-text>
          <v-icon color="#fff">mdi-view-list</v-icon>
          <div class="knight-container">
            <div class="knight attr grid-container">
              <span class="attr grid-item">Idade: {{ knight.idade }}</span>
              <span class="attr grid-item">
                Qtd. Armas:
                <span v-bind:key="n" v-for="n in knight.armas">
                  <v-icon color="black" size="15">mdi-sword-cross</v-icon>
                </span>
              </span>
              <span class="attr grid-item d-flex flex-row align-center">
                Exp:
                <v-progress-linear class="pl-2" color="black" :value="(knight.exp/5000) * 100"></v-progress-linear>
              </span>
              <span class="attr grid-item">
                Ataque:
                <v-progress-circular :value="knight.ataque" color="black">{{ knight.ataque }}</v-progress-circular>
              </span>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "KnightList",
  props: {
    knights: Array
  },
  methods: {
    editKnight: function(knight) {
      axios
        .put(`http://localhost:3000/knights/${knight.id}`, {
          nickname: knight.apelido
        })
        .then(() => {
          // Flag para exibição do icone de sucesso
          knight.editedSuccessfully = true;

          // Aguardando 1s para remover icones
          setTimeout(() => {
            knight.isBeeingEdited = false;
            knight.editedSuccessfully = false;
          }, 1500);
        })
        .catch(err => console.log(err));
    },
    toggleKnightEdit: function(knight) {
      knight.isBeeingEdited = !knight.isBeeingEdited;

      // Esperando para dar foco no input por conta do delay até que ele esteja na tela
      setTimeout(() => {
        if (knight.isBeeingEdited)
          document.getElementById("nickname-edit").focus();
      }, 100);
    },
    deleteKnight: function(id) {
      axios
        .delete(`http://localhost:3000/knights/${id}`)
        .then((response) => {
          console.log(response);
          
          this.knights.splice(this.knights.indexOf({id: id}), 1)
        })
        .catch(err => console.log(err));
    }
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
  grid-column-gap: 30%;
  grid-template-columns: auto auto;
}

#nickname-edit:focus {
  outline: none;
}
#nickname-edit {
  border-bottom: 1px solid #000;
  padding: 0 10px;
  max-width: 100px;
  width: 40%;
}
</style>