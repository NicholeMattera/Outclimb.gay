import { defineConfig } from 'vite'
import { env } from 'node:process'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

function lookasidePlugin() {
    return {
        name: 'lookaside-plugin',
        transformIndexHtml(html) {
            if (env.LOOKASIDE !== undefined) {
                return html.replace(/"(\/assets\/.*?)"/g, '"$1?version=' + encodeURIComponent(env.LOOKASIDE) + '"')
            }

            return html
        },
    }
}

export default defineConfig({
    plugins: [tsconfigPaths(), react(), lookasidePlugin()],
    css: {
        preprocessorOptions: {
            scss: {
                includePaths: ['src'],
            },
        },
    },
})
