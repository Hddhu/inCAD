// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import './index.css'

// Composables
import { createApp } from 'vue'

const { Splitpanes, Pane } = splitpanes

// Vue.createApp({
//   components: { Splitpanes, Pane }
// }).mount('#app')

const app = createApp(App)

registerPlugins(app)

app.mount('#app')