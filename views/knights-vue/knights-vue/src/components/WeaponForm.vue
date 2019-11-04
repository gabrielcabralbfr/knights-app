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
    <v-divider class="divider"></v-divider>
  </div>
</template>
<script>
export default {
  props: {
    weapon: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="css" scoped>

.v-input {
  padding: 12px;
}
.divider {
  margin: 0 0 35px 0;
}
</style>