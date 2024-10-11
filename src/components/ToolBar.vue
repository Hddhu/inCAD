<template>
  <v-toolbar class="toolbar" color="primary" dark fixed>
      <v-img max-height="100%" :max-width="200" cover inline src="../assets/images/incad_logo_small.png"></v-img>
    <v-btn icon @click="$emit('toggle-pane')">
      <v-icon>mdi-book-open-variant-outline</v-icon>
    </v-btn>
    <div class="text-center">
      <v-menu
        location="start"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="handleItemClick(item)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  name: 'ToolBar',
  props: ['username'],
  data: () => ({
    items: [
      { title: 'Profile', functionName: 'profile' },
      { title: 'Logout', functionName: 'logout' },
    ],
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
  },
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
