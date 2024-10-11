<template>
  <v-app>
    <ToolBar :username="username" @toggle-pane="togglePane"/>
    <div class="splitPanes">
      <div id="systemLibrary" @dblclick="togglePane">System library</div>
      <div id="project">
        Project
      </div>
      <div id="system">System
        <SystemPane/>
      </div>
      <div id="systemConfiguration">System configuration</div>
    </div>
  </v-app>
</template>

<script>
import ToolBar from '../components/ToolBar.vue'
import SystemPane from '../components/SystemPane.vue'
import Split from 'split.js'

export default {
  data() {
    return {
      isPaneClosed: false,
      username: this.$route.params.username,
    };
  },
  components: {
    ToolBar,
    SystemPane
  },
  mounted() {
    //Splits the panes
    this.splitInstance = Split(['#systemLibrary', '#project', '#system', '#systemConfiguration'], {
      minSize: [60, 150, 150, 150],
      sizes: [15, 20, 40, 20], 
      gutterSize: 10,
      onDrag: () => {
        this.isPaneClosed = true; // Ensure state is updated on drag
      },
      onDragEnd: () => {
        this.isPaneClosed = false; // Ensure state is updated on drag end
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
      const pane1 = document.getElementById('systemLibrary');
      if (this.isPaneClosed) {
        this.splitInstance.setSizes([15, 15, 50, 20]);
        pane1.style.display = 'block';
      } else {
        this.splitInstance.collapse(0); 
        pane1.style.display = 'none';
      }
      this.isPaneClosed = !this.isPaneClosed; 
    },
  }
};
</script>

<style>
.splitPanes {
  display: flex;
  flex-direction: row;
  height: 100%;
}

#system {
  display: flex;
  flex-direction: column;
  min-width: fit-content;
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