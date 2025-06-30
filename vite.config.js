import { defineConfig } from 'vite'
import { exec, execSync } from 'child_process'
import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'

const lint = mode => {
  if (mode === 'development') {
    exec('npm run lint', (error, stdout) => {
      // eslint-disable-next-line
      console.log(stdout)
    })
  } else {
    try {
      execSync('npm run lint')
    } catch (error) {
      // eslint-disable-next-line
      console.log(error.stdout)
      throw error
    }
  }
}

const htmlPlugin = mode => {
  return {
    name: 'html-transform',
    buildStart: () => lint(mode),
    handleHotUpdate: () => lint(mode),
    enforce: 'pre'
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: '',
    plugins: [vue(), htmlPlugin(mode)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: false,
      port: 8080,
      strictPort: true,
      proxy: {
        '^/api': {
          target: 'http://localhost:3000',
          configure: proxy => {
            proxy.on('proxyReq', proxyReq => {
              proxyReq.setHeader('origin', 'http://localhost:3000')
            })
          }
        }
      }
    },
    build: {
      outDir: 'build',
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: function manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            } else {
              return null
            }
          }
        }
      }
    }
  }
})
