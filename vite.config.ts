import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(async ({ command, mode, ssrBuild }) => {
  console.log(command, mode, ssrBuild)
  const name = 'page-update-checker'
  return {
    plugins: [dts()],
    build: {
      lib: {
        name,
        entry: resolve(__dirname, 'src/index.ts'),
        formats: ['es', 'cjs', 'umd'],
        fileName: (format) => `${name}.${format}.js`,
      },
    },
  }
})
