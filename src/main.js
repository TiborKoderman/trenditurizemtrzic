import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGoogleMaps from '@fawmi/vue-google-maps';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faBars } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faBars)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router);
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC671GaN9OgoRAzaPzo1fNmqWJLHbrBLfA',
    libraries: 'places', // Add additional libraries if needed
  },
})
app.mount('#app')


