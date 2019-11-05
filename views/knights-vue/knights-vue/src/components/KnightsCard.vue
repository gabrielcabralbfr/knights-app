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
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" @click="toggleKnightEdit(knight)" color="#000">mdi-pencil</v-icon>
              </template>
              <span>Editar apelido</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" @click="deleteKnight(knight)" color="#000">mdi-delete</v-icon>
              </template>
              <span>Tornar um herói</span>
            </v-tooltip>
          </span>
        </v-card-title>
        <v-card-subtitle>{{ knight.atributo }}</v-card-subtitle>
        <v-card-text>
          <v-icon color="#fff">mdi-view-list</v-icon>
          <div class="knight-container">
            <div class="knight attr grid-container">
              <span class="attr grid-item">
                Idade:
                <span class="ml-2">{{ knight.idade }}</span>
              </span>
              <span class="attr grid-item">
                Qtd. Armas:
                <v-fade-transition :group="true" leave-absolute>
                  <span class="ml-2" v-bind:key="n" v-for="n in knight.armas">
                    <v-icon color="black" size="15">mdi-sword-cross</v-icon>
                  </span>
                </v-fade-transition>
              </span>
              <span class="attr grid-item d-flex flex-row align-center">
                Exp:
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-progress-linear
                      class="pl-2"
                      color="black"
                      v-on="on"
                      :value="knight.exp > 1 ? (knight.exp/maxExpNumber) * 100 : 0"
                    ></v-progress-linear>
                  </template>
                  <span>{{knight.exp}}</span>
                </v-tooltip>
              </span>
              <span class="attr grid-item">
                Ataque:
                <v-progress-circular
                  :value="knight.ataque > 1 ? (knight.ataque / maxAtackNumber) * 100 : 0"
                  rotate="85"
                  size="40"
                  color="black"
                  class="ml-2"
                >{{ knight.ataque }}</v-progress-circular>
              </span>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn color="primary" text @click="snackbar.show = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "KnightList",
  props: {
    knights: Array
  },
  data: function() {
    return {
      snackbar: {
        show: false,
        text: "",
        timeout: 4000
      },
      maxAtackNumber: 200,
      maxExpNumber: 5000
    };
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
        .catch(() => {
          this.callSnackbar(
            "Não foi possível editar este Knight. Tente novamente mais tarde"
          );
        });
    },
    toggleKnightEdit: function(knight) {
      knight.ataque = knight.finalAtack;
      // knight.isBeeingEdited = !knight.isBeeingEdited;

      // // Esperando para dar foco no input por conta do delay até que ele esteja na tela
      // setTimeout(() => {
      //   if (knight.isBeeingEdited)
      //     document.getElementById("nickname-edit").focus();
      // }, 100);
    },
    deleteKnight: function(knight) {
      if (knight.isHero) {
        this.callSnackbar("Este Knight já é um herói");
        return;
      }
      axios
        .delete(`http://localhost:3000/knights/${knight.id}`)
        .then(() => {
          this.callSnackbar("Knight deletado com sucesso", 3000);
          this.knights.splice(this.knights.indexOf({ id: knight.id }), 1);
        })
        .catch(() => {
          this.callSnackbar(
            "Não foi possivel deletar este Knight. Tente novamente mais tarde"
          );
        });
    },
    callSnackbar(text, timeout = this.snackbar.timeout) {
      this.snackbar.text = text;
      this.snackbar.timeout = timeout;
      this.snackbar.show = true;
    },
    callAtackFill() {
      this.knights.map(knight => {
        return (knight.ataque = knight.finalAtack);
      });
    },
    callExpFill() {
      this.knights.map(knight => {
        return (knight.exp = knight.finalExp);
      });
    }
  },
  mounted: function() {
    setTimeout(() => {
      this.callExpFill();
    }, 1800);

    setTimeout(() => {
      this.callAtackFill();
    }, 2000);
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
  grid-template-columns: 24% 58%;
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