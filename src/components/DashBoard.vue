<template>
  <v-app>
    <ToolBar :username="username" />
      <div class="split">
        <div id="split-0"></div>
        <div id="split-1"></div>
        <div id="split-2"></div>
        <div id="split-3"></div>
      </div>
  </v-app>
</template>

<script>
import ToolBar from './ToolBar.vue'
import Split from 'split.js'

export default {
  mounted(){
    Split(['#split-0', '#split-1', '#split-2', '#split-3'], {
        minSize: 150,
    })
  },
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

<style>
.split {
    display: flex;
    flex-direction: row;
    height: 100%;
}

.gutter {
    background-color: #eee;
    background-repeat: no-repeat;
    background-position: 50%;
}

.gutter.gutter-horizontal {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
    cursor: col-resize;
}

/* .v-application--wrap {
  flex: none;
  flex-direction: row;
} */
</style>