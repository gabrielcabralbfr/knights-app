<template>
  <div>
    <v-app-bar color="black accent-4" dark>
      <v-toolbar-title>Knights Application</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <router-link to="/knight/list">
            <v-btn v-on="on" icon>
              <v-icon color="#fff">mdi-view-list</v-icon>
            </v-btn>
          </router-link>
        </template>
        <span>Lista de Knights</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <router-link to="/knight/create">
            <v-btn v-on="on" icon>
              <v-icon color="#fff">mdi-plus-thick</v-icon>
            </v-btn>
          </router-link>
        </template>
        <span>Criar um Knight</span>
      </v-tooltip>
    </v-app-bar>
  </div>
</template>

<style lang="css" scoped>
a:visited {
  text-decoration: none;
  color: #fff;
}

a {
  text-decoration: none;
}
</style>

