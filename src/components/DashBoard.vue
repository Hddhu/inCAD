<template>
  <v-app>
    <ToolBar :username="username" @toggle-pane="togglePane"/>
    <div class="splitPanes">
      <div id="systemLibrary" @dblclick="togglePane">System library</div>
      <div id="project">
        Project
      </div>
      <div id="system">System
        <div id="image-container">
          <img src="../assets/images/02A.warmtepomp1.svg" alt="svg"/>
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
      username: this.$route.params.username,
      currentZoom: 1,
    };
  },
  components: {
    ToolBar,
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
        this.isPaneClosed = true; // Ensure state is updated on drag end
      }
    });

    // Add double-click event listener to the gutter after Split.js initializes
    const gutters = document.querySelectorAll('.gutter');
    if (gutters.length > 0) {
      gutters[0].addEventListener('dblclick', this.togglePane);
    }

    //Zoom in on svg  
    const container = document.getElementById('image-container'); 
      
    container.addEventListener('wheel', (event) => {
      const direction = event.deltaY > 0 ? -1 : 1;
      this.zoomImage(direction);
    });
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

#image-container { 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  height: 100%; 
  width: 100%;
  overflow: auto;
  background-color: #6C7884;
} 
  
img { 
    max-width: 100%; 
    margin: 20px;
} 
  
#image-container img:hover { 
  cursor: zoom-in; 
} 
</style>