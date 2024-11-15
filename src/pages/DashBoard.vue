<template>
  <v-app>
    <ToolBar :username="username" />
    <splitpanes class="default-theme">
      <pane v-if="isPaneClosed" :min-size="20" @dblclick="togglePane">
          <div class="bg-grey-lighten-2 pl-2 flex justify-between">System library<svg-icon type="mdi" :path="mdiMenuLeftIcon" class="mr-2"></svg-icon></div>
          <v-treeview :density="'compact'" v-model:selected="selection" :items="items"
            :select-strategy="'single-independent'" item-value="id" return-object
            @update:selected="GetInfo(selection)"></v-treeview>
      </pane>
      <pane v-else :size="1.5" :max-size="2" :min-size="1.5" class="bg-grey-lighten-2" @dblclick="togglePane">
        <!-- icon is pointed right through the rotation of the div -->
        <div class="mt-2 texto rotate-180 justify-start items-start flex">System library<svg-icon type="mdi" :path="mdiMenuLeftIcon"></svg-icon></div>
      </pane>
      <pane>
          <div class="bg-grey-lighten-2 pl-2">Project</div>
          <v-treeview :density="'compact'" v-model:selected="selection3" :items="Grandchild"
            :select-strategy="'single-leaf'" item-value="id" return-object></v-treeview>
      </pane>
      <pane>
          <div class="bg-grey-lighten-2 pl-2">System</div>
          <SystemPane />
      </pane>
      <pane>
        <div class="bg-grey-lighten-2 pl-2">System configuration</div>
      </pane>
    </splitpanes>
  </v-app>
</template>

<script>
import ToolBar from '../components/ToolBar.vue'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMenuLeft } from '@mdi/js'

export default {

  data() {
    return {
      isPaneClosed: false,
      username: this.$route.params.username,
      selection: [],
      selection2: [],
      selection3: [],
      mdiMenuLeftIcon: mdiMenuLeft,
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
          Topid: 2,
          title: 'Child 1',
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
        {
          Topid: 3,
          title: 'Child 2',
          children: [
            { id: 8, title: 'ChildXX #1' },
            { id: 9, title: 'ChildXX #2' },
            {
              id: 10,
              title: 'Child #3',
              children: [
                { id: 11, title: 'GrandchildXX #1' },
                { id: 12, title: 'GrandchildXX #2' },
              ],
            },
          ],
        },
      ]
    };
  },
  components: {
    ToolBar,
    // SystemPane,
    Splitpanes,
    Pane,
    SvgIcon
  },
  mounted() {
   
  },
  methods: {
    togglePane() {
      // const pane1 = document.getElementById('systemLibrary');
      // if (this.isPaneClosed) {
      //   this.splitInstance.setSizes([20, 20, 50, 30]);
      //   pane1.style.display = 'block';
      // } else {
      //   this.splitInstance.collapse(0);
      //   pane1.style.display = 'none';
      // }
      this.isPaneClosed = !this.isPaneClosed;
    },
    GetInfo(e) {
      this.selection2 = [];
      this.Grandchild.forEach(item => {
        if (item.Topid === e[0].id) {
          this.selection2.push(item);
        }
      });
    }
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

.texto {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
</style>