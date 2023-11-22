import './assets/main.css'
import VueGoogleMaps from '@fawmi/vue-google-maps';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
/*app.use(router, VueGoogleMaps, {
    load: {
      key: 'AIzaSyC671GaN9OgoRAzaPzo1fNmqWJLHbrBLfA',
    },
  })*/

app.mount('#app')
