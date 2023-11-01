// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';

import "primeflex/primeflex.css";
// import "primeflex/themes/primeone-light.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/lara-light-blue/theme.css"       //theme

import Button from "primevue/button"
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import Checkbox from 'primevue/checkbox';
import RadioButton from 'primevue/radiobutton';


const app = createApp(App);
app.use(PrimeVue, { ripple: true });
app.component('Button', Button);
app.component('ConfirmDialog', ConfirmDialog);
app.component('Checkbox', Checkbox);
app.component('RadioButton', RadioButton);

app.use(createPinia())
app.use(router)
app.use(ConfirmationService);

app.mount('#app')
