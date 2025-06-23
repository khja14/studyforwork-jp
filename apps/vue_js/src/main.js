// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import '@mdi/font/css/materialdesignicons.css'


// Vuetify の import
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Vuetify インスタンス作成
const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).mount('#app')
