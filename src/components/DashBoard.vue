<template>
  <v-app>
    <ToolBar :username="username" />
    <div class="split">
      <div id="split-0" @dblclick="togglePane">System library</div>
      <div id="split-1">Project</div>
      <div id="split-2">System</div>
      <div id="split-3">System configuration</div>
    </div>
  </v-app>
</template>

<script>
import ToolBar from './ToolBar.vue';
import Split from 'split.js';

export default {
  data() {
    return {
      isPaneClosed: false,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' },
      ],
      username: this.$route.params.username,
    };
  },
  components: {
    ToolBar,
  },
  mounted() {
    this.splitInstance = Split(['#split-0', '#split-1', '#split-2', '#split-3'], {
      minSize: [30, 150, 150, 150], // Set minSize for each pane
      sizes: [15, 15, 50, 20], // Optional: initial sizes in percentages
      gutterSize: 10, // Size of the gutter between the panes
      onDrag: () => {
        this.isPaneClosed = true; // Ensure state is updated on drag
      },
      onDragEnd: () => {
        this.isPaneClosed = true; // Ensure state is updated on drag end
      }
    });

    // Add double-click event listener to the gutter after Split.js initializes
    const gutters = document.querySelectorAll('.gutter');
    if (gutters.length > 0) {
      gutters[0].addEventListener('dblclick', this.togglePane);
    }
  },
  methods: {
    togglePane() {
      const pane1 = document.getElementById('split-0');
      if (this.isPaneClosed) {
        this.splitInstance.setSizes([15, 15, 50, 20]); // Reopen the pane
        pane1.style.display = 'block';
      } else {
        this.splitInstance.collapse(0); // Collapse the pane
        // this.splitInstance.setSizes([0, 20, 60, 20]);
        pane1.style.display = 'none';
      }
      this.isPaneClosed = !this.isPaneClosed; // Toggle the closed state
    },
    logout() {
      this.$router.replace({ name: 'login' }); // Logout and go to the login page
    },
  }
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
</style>