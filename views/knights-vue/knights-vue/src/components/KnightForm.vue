<template>
  <v-row class="d-flex justify-center mb-5" align="center">
    <v-form ref="knightForm" v-model="valid" :lazy-validation="false">
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step @click="step = 1" :complete="step > 1" step="1">Guerreiro</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step @click="step = 2" :complete="step > 2" step="2">Armas</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step @click="step = 3" step="3">Atributos</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-text-field
              v-model="knight.name"
              :rules="[v => !!v || 'Nome do guerreiro é obrigatório']"
              label="Nome"
              required
            ></v-text-field>
            <v-text-field
              v-model="knight.nickname"
              :rules="[v => !!v || 'Apelido do guerreiro é obrigatório']"
              label="Apelido"
              required
            ></v-text-field>
            <v-text-field
              v-model="knight.keyAttribute"
              :rules="[v => !!v || 'Atributo principal do guerreiro é obrigatório']"
              label="Atributo Principal"
              required
            ></v-text-field>
            <div class="mb-3 d-flex flex-column">
              <p class="birthday pb-3 text-center">Data de Nascimento do Guerreiro</p>
              <v-date-picker class="datepicker" v-model="knight.birthday" required></v-date-picker>
            </div>
            <v-btn outlined color="default" class="float-right" @click="step = 2">Avançar</v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <div ref="weaponContainer" class="w-form-container">
              <div v-bind:key="weapon.id" v-for="(weapon, index) in weapons">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon class="float-right" @click="removeWeapon(weapon)" v-on="on">mdi-close</v-icon>
                  </template>
                  <span>Remover arma</span>
                </v-tooltip>

                <WeaponForm :weapon="weapon" v-model="weapon[index]" />
              </div>
            </div>
            <v-btn
              class="d-block center mx-auto mt-5 mb-5"
              color="default"
              @click="addWeapon"
            >Adicionar nova arma</v-btn>
            <v-btn outlined class="float-right raised" color="default" @click="step = 3">Avançar</v-btn>

            <v-btn text @click="step = 1">Voltar</v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <div class="mt-4 grid-container">
              <div>
                <v-subheader class="pl-0 pb-3 d-block">Força</v-subheader>
                <v-slider v-model="knight.attributes.strength" thumb-label="always" class="d-block"></v-slider>
              </div>
              <div>
                <v-subheader class="pl-0 pb-3 d-block">Destreza</v-subheader>
                <v-slider
                  v-model="knight.attributes.dexterity"
                  thumb-label="always"
                  class="d-block"
                ></v-slider>
              </div>
              <div>
                <v-subheader class="pl-0 pb-3 d-block">Constituição</v-subheader>
                <v-slider
                  v-model="knight.attributes.constituition"
                  thumb-label="always"
                  class="d-block"
                ></v-slider>
              </div>
              <div>
                <v-subheader class="pl-0 pb-3 d-block">Inteligência</v-subheader>
                <v-slider
                  v-model="knight.attributes.intelligence"
                  thumb-label="always"
                  class="d-block"
                ></v-slider>
              </div>
              <div>
                <v-subheader class="pl-0 pb-3 d-block">Sabedoria</v-subheader>
                <v-slider v-model="knight.attributes.wisdom" thumb-label="always" class="d-block"></v-slider>
              </div>
              <div>
                <v-subheader class="pl-0 pb-3 d-block">Carisma</v-subheader>
                <v-slider v-model="knight.attributes.charisma" thumb-label="always" class="d-block"></v-slider>
              </div>
            </div>
            <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4 float-right"
              @click="submitForm"
            >Criar</v-btn>

            <v-btn text @click="step = 2">Voltar</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-form>
    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn color="primary" text @click="snackbar.show = false">FECHAR</v-btn>
    </v-snackbar>
  </v-row>
</template>

<script>
import axios from "axios";
import WeaponForm from "@/components/WeaponForm.vue";
import store from "@/store";
export default {
  name: "KnightForm",
  components: {
    WeaponForm
  },
  data() {
    return {
      valid: false,
      step: 1,
      knight: {
        name: "",
        nickname: "",
        birthday: "",
        weapons: [],
        attributes: {},
        keyAttribute: "",
        id: ""
      },
      snackbar: {
        show: false,
        text: "",
        timeout: 4000
      }
    };
  },
  methods: {
    submitForm() {
      this.knight.weapons = this.weapons;
      axios
        .post("http://localhost:3000/knights", this.knight)
        .then(() => {
          this.callSnackbar("Knight criado com sucesso!");
          this.$refs.knightForm.reset();
          this.step = 1;
        })
        .catch(() => {
          this.callSnackbar(
            "Não foi possível criar o Knight. Tente novamente mais tarde"
          );
        });
    },
    callSnackbar(text, timeout = this.snackbar.timeout) {
      this.snackbar.text = text;
      this.snackbar.timeout = timeout;
      this.snackbar.show = true;
    },
    addWeapon() {
      store.dispatch("AddWeapon", {
        id: this.weapons.length + 1,
        name: "",
        mod: 0,
        attribute: "",
        equipped: false
      });
    },
    removeWeapon(weapon) {
      store.dispatch("RemoveWeapon", weapon);
    }
  },
  computed: {
    weapons() {
      return store.getters.getWeapons;
    }
  }
};
</script>

<style lang="css" scoped>
form {
  width: 80%;
  max-width: 750px;
  margin-top: 5%;
}
.v-input {
  padding: 12px;
}
.grid-container {
  display: grid;
  grid-column-gap: 10%;
  grid-template-columns: auto auto;
}
.datepicker {
  margin: 0 auto;
}
.birthday {
  color: rgba(0, 0, 0, 0.54);
}
.v-stepper:not(.v-stepper--vertical) .v-stepper__label {
  display: block !important;
}
.v-stepper__step {
  cursor: pointer;
}
</style>