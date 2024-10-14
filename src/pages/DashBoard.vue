<template>
  <v-app>
    <ToolBar :username="username" @toggle-pane="togglePane"/>
    <div class="splitPanes">
      <div id="systemLibrary" @dblclick="togglePane">System library
        <v-treeview
        v-model:selected="selection"
          :items="items"
          :select-strategy="'single-independent'"
          item-value="id"
          return-object
          selectable
        ></v-treeview>
</div>
      <div id="project">
        Project
        <template v-if="!selection.length">
          No nodes selected.
        </template>
        <template v-else>
          <div
            v-for="node in selection"
            :key="node.id"
          >
            {{ node.title }}
          </div>
          <v-treeview
        v-model:selected="selection2"
          :items="selection"
          :select-strategy="selectionType"
          item-value="id"
          return-object
          selectable
        ></v-treeview>
        </template>
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
      selectionType: 'single-leaf',
      selection: [],
      selection2: [],
      items: [
        {
          id: 1,
          title: 'Root',
          children: [
            { id: 2, title: 'Child #1' },
            { id: 3, title: 'Child #2' },
            {
              id: 4,
              title: 'Child #3',
              children: [
                { id: 5, title: 'Grandchild' },
                { id: 6, title: 'Grandchild #2' },
              ],
            },
          ],
        },
          ],
          Grandchild: [
          {
          id: 1,
          title: 'Root',
          children: [
            { id: 2, title: 'ChildX #1' },
            { id: 3, title: 'ChildX #2' },
            {
              id: 4,
              title: 'Child #3',
              children: [
                { id: 5, title: 'GrandchildX #1' },
                { id: 6, title: 'GrandchildX #2' },
              ],
            },
          ],
        },
          ]
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