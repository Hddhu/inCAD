<template>
  <v-toolbar class="toolbar" color="primary" dark fixed>
    <div class="flex">
      <p class="font-bold ml-4 text-2xl">InCAD</p>
      <div class="flex gap-x-4 ml-4">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="white" v-bind="props">
              File
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in fileItems" :key="index" :value="index" @click="handleItemClick(item)">
              <v-list-item-title class="flex"><svg-icon type="mdi" :path="item.icon" class="mr-2"></svg-icon>{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="white" v-bind="props">
              Domain
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in domainItems" :key="index" :value="index"
              @click="handleItemClick(item)">
              <v-list-item-title class="flex"><svg-icon v-if="domainStatus === item.title" type="mdi" :path="item.icon"
                  class="mr-2"></svg-icon>
                <svg-icon v-else type="mdi" :path="''" class="mr-2"></svg-icon>{{
                  item.title
                }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="white" v-bind="props">
              Project
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in projectItems" :key="index" :value="index"
              @click="handleItemClick(item)">
              <v-list-item-title class="flex"><svg-icon type="mdi" :path="item.icon" class="mr-2"></svg-icon>{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="white" v-bind="props">
              Manage
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in manageItems" :key="index" :value="index"
              @click="handleItemClick(item)">
              <v-list-item-title class="flex"><svg-icon type="mdi" :path="item.icon" class="mr-2"></svg-icon>{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <v-btn icon @click="$emit('toggle-pane')">
      <v-icon>mdi-book-open-variant-outline</v-icon>
    </v-btn>
    <div class="text-center">
      <v-menu location="start" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" @click="handleItemClick(item)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiPlus, mdiFolder, mdiBookmark, mdiClose, mdiRepeatVariant, mdiPencil, mdiHome, mdiCircleSmall } from '@mdi/js'

export default {
  name: 'ToolBar',
  props: ['username'],
  domainStatus: "HVAC",
  data: () => ({
    items: [
      { title: 'Profile', functionName: 'profile' },
      { title: 'Logout', functionName: 'logout' },
    ],
    fileItems: [
      { title: 'New', icon: mdiPlus, functionName: 'fileNew' },
      { title: 'Open', icon: mdiFolder, functionName: 'fileOpen' },
      { title: 'Save', icon: mdiBookmark, functionName: 'fileSave' },
      { title: 'Save as', icon: mdiBookmark, functionName: 'fileSaveAs' },
      { title: 'Close', icon: mdiClose, functionName: 'fileClose' },
    ],
    domainItems: [
      { title: 'HVAC', icon: mdiCircleSmall, functionName: 'domainHVAC' },
      { title: 'Assimilation', icon: mdiCircleSmall, functionName: 'domainAssimilation' },
    ],
    projectItems: [
      { title: 'I/O create configuration', icon: mdiRepeatVariant, functionName: 'projectCreateConfig' },
      { title: 'I/O expand configuration', icon: mdiRepeatVariant, functionName: 'projectEpandConfig' },
      { title: 'Process coding', icon: '', functionName: 'projectProcessCoding' },
      { title: 'Group division HS/SS', icon: '', functionName: 'projectGroupDiv' },
      { title: 'Design rules (Total project)', icon: mdiPencil, functionName: 'projectDesignRules' },
    ],
    manageItems: [
      { title: 'Manage companies', icon: mdiHome, functionName: 'manageCompanies' },
    ]
  }),
  methods: {
    handleItemClick(item) {
      if (this[item.functionName] && typeof this[item.functionName] === 'function') {
        this[item.functionName]();
      } else {
        console.error(`Function ${item.functionName} is not defined.`);
      }
    },
    profile() {
      console.log('Profile clicked');
      console.log(this.username);
      // TODO profile page
    },
    logout() {
      this.$router.replace({ name: 'login' });
      //TODO Log out, are you sure
    },
    domainHVAC() {
      this.domainStatus = "HVAC";
    },
    domainAssimilation() {
      this.domainStatus = "Assimilation";
    }
  },
  components: {
    SvgIcon
  }
}
</script>

<style>
.toolbar {
  flex: 0;
}

.v-toolbar__content {
  display: flex;
  justify-content: space-between;
}

.toolbar-logo {
  margin-left: -20px;
  margin-top: -20px;
  max-width: 100px;
}
</style>
