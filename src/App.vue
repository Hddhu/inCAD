<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  //
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  padding: 0;
  height: 100vh;
}
</style>
<!-- 
<template>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/dashboard">Go to About</RouterLink>
  </nav>
  <main>
    <v-container fluid class="grey lighten-5">
      <RouterView />
    </v-container>
  </main>
</template> -->


