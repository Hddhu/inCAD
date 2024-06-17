<template>
  <v-app>
    <ToolBar :username="username" @toggle-pane="togglePane"/>
    <div class="split">
      <div id="systemLibrary" @dblclick="togglePane">System library</div>
      <div id="project">
        Project
      </div>
      <div id="system">System
        <!-- <img src="../assets/images/01.koudedistributiebron.svg" alt="svg"/> -->
        <div id="image-container">
          <img src="../assets/images/02A.warmtepomp1.svg" alt="svg2"/>
        </div>
      </div>
      <div id="systemConfiguration">System configuration</div>
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
      currentZoom: 1,
    };
  },
  components: {
    ToolBar,
  },
  mounted() {
    this.splitInstance = Split(['#systemLibrary', '#project', '#system', '#systemConfiguration'], {
      minSize: [60, 150, 150, 150], // Set minSize for each pane
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

    //Zoomin svg  
    const container = document.getElementById('image-container'); 
      
    container.addEventListener('wheel', (event) => {
      const direction = event.deltaY > 0 ? -1 : 1;
      this.zoomImage(direction);
    });
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
    zoomImage(direction) {
      const minZoom = 1;
      const maxZoom = 5;
      const stepSize = 0.1;

      const newZoom = this.currentZoom + direction * stepSize;

      if (newZoom < minZoom || newZoom > maxZoom) {
        return;
      }

      this.currentZoom = newZoom;

      const image = document.querySelector('#image-container img');
      image.style.transform = `scale(${this.currentZoom})`;
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

#system {
  display: flex;
  flex-direction: column;
  align-items: center;
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

#image-container { 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  height: 100vh; 
} 
  
img { 
    max-width: 100%; 
    margin: 20px;
} 
  
#image-container img:hover { 
  cursor: zoom-in; 
} 
</style>