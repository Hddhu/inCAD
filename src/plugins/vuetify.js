import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#337AB7',
          primary_lighter_1: '#4089C9',
          primary_darker_1: '#3174AF',
          primary_lighter_2: '#5093CE',
          primary_darker_2: '#2D6A9F',
          secondary: '#FF4A17',
          secondary_lighter_1: '#FF5F33',
          secondary_darker_1: '#FF3F0A',
          error: '#FC3131',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
    },
  })
  
  export default vuetify

  
