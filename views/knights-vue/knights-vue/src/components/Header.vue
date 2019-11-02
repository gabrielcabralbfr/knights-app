<template>
  <div>
    <v-app-bar color="black accent-4" dark>
      <v-toolbar-title>Knights Application</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <router-link to="/knight/list">
          <v-icon color="#fff">mdi-view-list</v-icon>
        </router-link>
      </v-btn>

      <v-btn icon>
        <router-link to="/knight/create">
          <v-icon color="#fff">mdi-plus-thick</v-icon>
        </router-link>
      </v-btn>
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

