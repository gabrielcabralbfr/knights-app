<template>
  <div class="home">
    <v-switch color="#000" v-model="showHeroes" class="ma-4" label="Mostrar somente heróis"></v-switch>
    <KnightsCard v-bind:knights="knightsList" />
    <p v-if="!isLoading && knightsList.length < 1" class="text-center">
      Nenhum knight encontrado
      <v-icon color="#000">mdi-emoticon-sad-outline</v-icon>
    </p>

    <v-card v-if="isLoading" class="card" :raised="true" :loading="true">
      <v-card-title>
        <span class="placeholder title"></span>
      </v-card-title>

      <v-card-subtitle>
        <span class="placeholder subtitle"></span>
      </v-card-subtitle>
      <v-card-text>
        <div class="knight-container">
          <p class="knight-basic-info"></p>
          <div class="knight attr grid-container">
            <span class="attr grid-item placeholder text"></span>
            <span class="attr grid-item placeholder text"></span>
            <span class="attr grid-item placeholder text"></span>
            <span class="attr grid-item placeholder text"></span>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn color="primary" text @click="snackbar.show = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
// @ is an alias to /src
import KnightsCard from "@/components/KnightsCard.vue";
import axios from "axios";

export default {
  name: "knightlist",
  components: {
    KnightsCard
  },
  data() {
    return {
      knightsList: [],
      isLoading: true,
      showHeroes: false,
      snackbar: {
        show: false,
        text: "",
        timeout: 4000
      }
    };
  },
  watch: {
    showHeroes(newValue) {
      this.isLoading = true;
      this.knightsList = [];
      this.getKnights(newValue);
    }
  },
  mounted() {
    // Forçando espera de 1s
    setTimeout(() => {
      this.getKnights(false);
    }, 1000);
  },
  methods: {
    getKnights: function(showOnlyHeroes) {
      axios
        .get(
          `http://localhost:3000/knights${
            showOnlyHeroes ? `?filter=heroes` : ""
          }`
        )
        .then(response => {
          if (!response.data) return;
          response.data.map(knight => {
            knight.isBeeingEdited = false;
            knight.editedSuccessfully = false;
          });
          this.knightsList = response.data;
        })
        .catch(() => {
          this.callSnackbar(
            "Erro ao obter listagem de knights. Cheque sua conexão com a internet",
            7000
          );
        })
        .finally(() => (this.isLoading = false));
    },
    callSnackbar(text, timeout = this.snackbar.timeout) {
      this.snackbar.text = text;
      this.snackbar.timeout = timeout;
      this.snackbar.show = true;
    }
  }
};
</script>

<style lang="css" scoped>
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
.knight-container {
  animation: shine 1s infinite;
}
span.subtitle {
  width: 100px;
}
span.text {
  width: 125px;
}
.card {
  max-width: 500px;
  width: 85%;
  margin: 10px auto;
}

.grid-container {
  display: grid;
  grid-column-gap: 30%;
  grid-template-columns: auto auto;
}

@keyframes shine {
  to {
    background-position: 0 0, 100% 0, /* move highlight to right */ 120px 0,
      120px 40px, 120px 80px, 120px 120px;
  }
}
</style>