<template>
   <v-app>
      <v-main>
         <v-container fluid fill-height class="h-100">
            <v-layout class="align-center justify-center h-100">
                  <v-card class="elevation-12 w-33">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>{{ isRegister ? stateObj.register.name : stateObj.login.name }}
                           form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <form ref="form" @submit.prevent="isRegister ? register() : login()">
                           <v-text-field v-model="username" name="username" label="Username" type="text"
                              placeholder="username" required :rules="isRegister ? [rules.email] : []"></v-text-field>

                           <v-text-field v-model="password" name="password" label="Password" type="password"
                              placeholder="password" required :rules="isRegister ? [rules.password] : []"></v-text-field>

                           <v-text-field v-if="isRegister" v-model="confirmPassword" name="confirmPassword"
                              label="Confirm Password" type="password" placeholder="confirm password"
                              required></v-text-field>
                           <div class="red--text"> {{ errorMessage }}</div>
                           <v-btn type="submit" class="mt-4" color="primary" value="log in">{{ isRegister ?
                              stateObj.register.name : stateObj.login.name }}</v-btn>
                           <div id="toggleMessage" class="mt-4" color="primary" v-on:click="isRegister = !isRegister;">
                              {{ toggleMessage }}
                           </div>
                        </form>
                     </v-card-text>
                  </v-card>
            </v-layout>
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
export default {
   name: "App",
   data() {
      return {
         username: "",
         password: "",
         confirmPassword: "",
         isRegister: false,
         errorMessage: "",
         stateObj: {
            register: {
               name: 'Register',
               message: 'Already have an account? Login.'
            },
            login: {
               name: 'Login',
               message: 'Register'
            }
         },
         rules: {
        email: value =>
          (!!value &&
            value.match(
              /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
            )) ||
          'please provide a valid email adres',
          password: value =>
          (!!value &&
          value.match(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
          )) ||
          'your pasword need to contain at least: 8 characters, 1 letter, 1 number, 1 special character'
      },
      };
   },
   methods: {
      login() {
         const { username } = this;
         this.$router.replace({ name: "dashboard", params: { username: username } });
      },
      register() {
         if (this.password == this.confirmPassword) {
            this.isRegister = false;
            this.errorMessage = "";
            this.$refs.form.reset();
         }
         else {
            this.errorMessage = "password did not match"
         }
      }
   },
   computed: {
      toggleMessage: function () {
         return this.isRegister ? this.stateObj.register.message : this.stateObj.login.message
      }
   }
};
</script>

<style>
#toggleMessage {
   cursor: pointer;
}
</style>