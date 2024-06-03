<template>
  <v-app>
    <ToolBar :username="username" />
  </v-app>
</template>

<script>
import ToolBar from './ToolBar.vue'

export default {
  data() {
    return {
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' },
      ],
      username: this.$route.params.username,
    };
  },
  methods: {
    logout() {
      this.$router.replace({ name: 'login' });
    },
  },
  components: {
    ToolBar,
  },
};
</script>
