    import { fileURLToPath, URL } from 'node:url'
    import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'
    // import vueDevTools from 'vite-plugin-vue-devtools' // <-- DEVE ESTAR COMENTADA OU APAGADA!

    export default defineConfig({
      plugins: [
        vue(),
        // vueDevTools(), // <-- DEVE ESTAR COMENTADA OU APAGADA!
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        },
      },
    })
