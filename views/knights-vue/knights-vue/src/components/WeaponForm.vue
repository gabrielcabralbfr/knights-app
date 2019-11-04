<template>
  <div>
    <v-text-field
      v-model="weapon.name"
      :rules="[v => !!v || 'Nome da arma é obrigatório']"
      label="Nome da Arma"
      required
    ></v-text-field>
    <v-text-field
      v-model="weapon.attribute"
      :rules="[v => !!v || 'Atributo da arma é obrigatório']"
      label="Atributo da Arma"
      required
    ></v-text-field>
    <v-switch color="primary" v-model="weapon.equipped" label="Equipada"></v-switch>
    <v-subheader class="pl-0 pb-3">Mod</v-subheader>
    <v-slider v-model="weapon.mod" thumb-label="always"></v-slider>
    <v-divider></v-divider>
  </div>
</template>
<script>
export default {
  props: {
    weapon: {
      type: Object,
      required: true
    }
  },
  watch: {
    weapon(val) {
      this.$emit("EMIT", val);
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