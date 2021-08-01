/** @type {import("snowpack").SnowpackUserConfig } */
export default {
    mount: {
        public: { url: '/', static: true },
        src: { url: '/static' },
        'node_modules/@hpcc-js/wasm/dist': { url: '/static/graphviz', static: true },
        'node_modules/emoji-picker-element-data/en/emojibase': { url: '/static/emojibase', static: true },
    },
    plugins: [
        '@snowpack/plugin-react-refresh',
        '@snowpack/plugin-dotenv',
        '@snowpack/plugin-sass',
        'snowpack-plugin-svgr',
        [
            '@snowpack/plugin-typescript',
            {
                /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
                ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {})
            }
        ]
    ],
    routes: [
        /* Enable an SPA Fallback in development: */
        // {"match": "routes", "src": ".*", "dest": "/index.html"},
    ],
    optimize: {
        bundle: true,
        minify: true,
        treeshake: true
    },
    packageOptions: {
        polyfillNode: true,
        external: [
            'crypto',
            'fs',
            'path'
        ]
    },
    devOptions: {
        port: Number(process.env.PORT || 3001)
    },
    buildOptions: {
        /* ... */
    }
}
