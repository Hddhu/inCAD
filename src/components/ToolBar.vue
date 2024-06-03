<template>
  <v-toolbar class="toolbar" color="primary" dark fixed>
    <v-img class="toolbar-logo" height="56" src="../assets/images/incad_logo_small.png"></v-img>
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
      //TODO Log out are you sure
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
  /* margin-left: 10px; Adjust as needed */
  max-height: 36px;
  max-width: 77px;
}
</style>
