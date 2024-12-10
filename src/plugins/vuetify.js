/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { VTreeview } from 'vuetify/labs/VTreeview'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    theme: {
    defaultTheme: 'light',
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
        dark: {
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
  components: {
    VTreeview,
  },
  })
