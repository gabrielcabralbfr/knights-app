<template>
  <div class="home">
    <KnightsList v-bind:knights="lista"/>
    <v-card v-if="isLoading" class="card" :raised="true" :loading="isLoading">
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
      lista: [],
      isLoading: true
    };
  },
  updated() {
    console.log("CALLED:");
  },
  mounted() {
    setTimeout(() => {
      axios
        .get("http://localhost:3000/knights")
        .then(response => {
          console.log(response);
          this.lista = response.data;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => (this.isLoading = false));
    }, 2000);
  }
};
// this. lista =  [{id: 1, name: 'Gabriel'}]
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
</style>
