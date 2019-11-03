<template>
  <div class="home">
    <v-switch color="#000" v-model="showHeroes" class="ma-4" label="Mostrar somente heróis"></v-switch>
    <KnightsList v-bind:knights="knightsList" />

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
  </div>
</template>

<script>
// @ is an alias to /src
import KnightsList from "@/components/KnightList.vue";
import axios from "axios";

export default {
  name: "knightlist",
  components: {
    KnightsList
  },
  data() {
    return {
      knightsList: [],
      isLoading: true,
      showHeroes: false
    };
  },
  watch: {
    showHeroes(newValue) {
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
          console.log(response);
          this.knightsList = response.data;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => (this.isLoading = false));
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
  grid-column-gap: 10%;
  grid-template-columns: auto auto;
}

@keyframes shine {
  to {
    background-position: 0 0, 100% 0, /* move highlight to right */ 120px 0,
      120px 40px, 120px 80px, 120px 120px;
  }
}
</style>