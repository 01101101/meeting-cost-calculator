import { createApp } from 'vue'
import { store, key } from './store'
import App from './App.vue'
import './index.css'
import '@fontsource/noto-sans-jp'
import '@fontsource/noto-sans-jp/700.css'
import '@fontsource/noto-sans-jp/900.css'

createApp(App)
  .use(store, key)
  .directive('focus', {
    mounted(el) {
      el.focus()
    }
  })
  .mount('#app')
