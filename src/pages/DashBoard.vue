<template>
  <v-app>
    <ToolBar :username="username" />
    <splitpanes class="default-theme splitPanes">
      <pane v-if="!isPaneClosed" :min-size="15" @dblclick="togglePane" class="bg-white">
        <div class="bg-grey-lighten-2 pl-2 flex justify-between">System library<button @click="togglePane"><svg-icon
              type="mdi" :path="mdiMenuLeftIcon" class="mr-2"></svg-icon></button></div>
        <v-treeview :density="'compact'" v-model:selected="selection" :items="items"
          :select-strategy="'single-independent'" item-value="id" @update:selected="GetInfo(selection)"></v-treeview>

      </pane>
      <pane v-else :size="1.5" :max-size="1.5" :min-size="1.5" class="bg-grey-lighten-2" @dblclick="togglePane">
        <!-- icon is pointed right through the rotation of the div, even though it says left -->
        <div class="mt-2 texto rotate-180 justify-start items-start flex">System library<button
            @click="togglePane"><svg-icon type="mdi" :path="mdiMenuLeftIcon" class="mt-2 mb-[-4px]"></svg-icon></button>
        </div>
      </pane>
      <pane class="bg-white" :min-size="15">
        <div class="bg-grey-lighten-2 pl-2">Project</div>
        <v-treeview :density="'compact'" v-model:selected="selection2" :items="Grandchild"
          :select-strategy="'single-leaf'" item-value="id" return-object></v-treeview>
      </pane>
      <pane class="bg-white" :min-size="15">
        <div class="bg-grey-lighten-2 pl-2">System</div>
        <SystemPane />
      </pane>
      <pane class="bg-white h-full" :min-size="25" :max-size="30">
        <div class="bg-grey-lighten-2 pl-2">System configuration</div>
        <div class="h-full">
          <div class="flex w-full h-fit mb-2">
            <img class="w-40 m-0"
              src="https://s3-alpha-sig.figma.com/img/439c/4abe/8df79c909330c5c24c11a8b555740d47?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gXGHtV83YAW3NzrQqlDJj7PPM2T6JH8Tjd4OgBGC4uKvQrMRPimICd3iUI~bSiulCQmtqt568ZhONTuTiwm2HdvemZF~AyJx41TeaK5jWOLsJgfBQdiUZS7Alm03BEqCc2xY~iqBeQTIM3w4K5T-oHj35u6iQCnR0v97ejDBUksrm-oZVOU3Jb5fAQ0mlYrKtaKt6iF3l03509~i83~stn8Nm93EoOHWk-fH-~LOZDzOs1bDqePm5CGVZPFjwl0hGBp6QovVGhK7adBIXZs8odl1V34OI3So49-sHSc8rbdQWXK3j1dCsWY6yZN-rW8LnW7zSfrSw~rPWQ5th---gg__" />
            <div class="flex flex-col justify-between py-2">
              <ButtonNUNU :title="'ELEMENT'" />
              <ButtonNUNU :title="'I/O POINTS'" />
              <ButtonNUNU :title="'DOCUMENTATION'" />
              <div>
                <statusMarker></statusMarker>
                <ButtonNUNU :title="'STATUS>>'" />
                <icon></icon>
              </div>
            </div>
          </div>
          <div class="flex flex-col mx-2 text-sm h-full max-h-[80%]">
            <v-list density="compact" class="mb-2">
              <v-list-item v-for="(item, index) in selectedItem[0].specs" :key="index" variant="flat">
                <v-list-item-title class="flex w-full justify-between text-sm mr-4">
                  <p>{{ item.title }}</p>
                  <div class="border-b-[1.5px] border-gray-600 border-solid w-1/2">
                    {{ item.value }}</div>
                </v-list-item-title>
              </v-list-item>
            </v-list>
            <ButtonNUNU :title="'MOTOR CURRENT'" />
            <div class="my-4">
              <ButtonNUNU :title="'CONTROL CURRENT'" />
            </div>
          </div>
        </div>
      </pane>
    </splitpanes>
  </v-app>
</template>

<script>
import ToolBar from '../components/ToolBar.vue'
import ButtonNUNU from '@/components/ButtonNUNU.vue'
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
          id: 2,
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
          id: 7,
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
      ],
      selectedItem: [
        {
          id: 1,
          title: 'selected item',
          specs: [
            { title: 'Code', value: 'CP' },
            { title: 'Manufacture', value: '' },
            { title: 'Type', value: '' },
            { title: 'Description', value: '' },
            { title: 'Characteristic', value: '' },
            { title: 'Connection number', value: '' },
            { title: 'Voltage', value: '3X400Vac' },
            { title: 'Current', value: '1.5' },
            { title: 'Power', value: '0.001' },
            { title: 'Configuration', value: 'Motor 3X400Vac' },
            { title: 'Motorgroup', value: 'Automatic' },
            { title: 'Maintenance switch', value: 'None' },
            { title: 'Insurance', value: 'Automatic' },
            { title: 'Cable placement', value: 'Open flume/ open track' },
            { title: 'Function preservation', value: 'No job rejection' },
            { title: 'Cable length', value: '5' },
            { title: 'Total length', value: '30' },
          ]

        }
      ]
    };
  },
  methods: {
    togglePane() {
      this.isPaneClosed = !this.isPaneClosed;
    },
    GetInfo(e) {
      console.log(e[0]);
      this.items.forEach(item => {
        if (item.children != null) {
          item.children.forEach(item => {
            if (item.children != null) {
              item.children.forEach(item => {
                if (item.id === e[0]) {
                  this.Grandchild.push(item);
                }
              })
            }
            if (item.id === e[0]) {
              this.Grandchild.push(item);
            }
          })
        }
        if (item.id === e[0]) {
          this.Grandchild.push(item);
        }
      })
    },
  },
  components: {
    ToolBar,
    ButtonNUNU,
    Splitpanes,
    Pane,
    SvgIcon,
  },

};
</script>

<style>
.splitpanes__splitter {
  background-color: #e0e0e0 !important;
}

.splitPanes {
  height: calc(100vh - 64px);
}

.v-list-item--density-compact.v-list-item--one-line {
  min-height: 0 !important;
}

#system {
  display: flex;
  flex-direction: column;
  min-width: fit-content;
}

.texto {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
</style>