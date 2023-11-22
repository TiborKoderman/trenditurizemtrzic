import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGoogleMaps from '@fawmi/vue-google-maps';

const app = createApp(App)
app.use(router);
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC671GaN9OgoRAzaPzo1fNmqWJLHbrBLfA',
    libraries: 'places', // Add additional libraries if needed
  },
})
app.mount('#app')


