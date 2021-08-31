import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import styles from 'rollup-plugin-styles'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

/** @type {import('rollup').RollupOptions} */
const config = {
    input: 'src/main.jsx',
    output: {
        file: 'public/build/dist.js',
        format: 'iife',
        name: 'app',
        sourcemap: true,
    },
    plugins: [
        replace({
            values: {
                'process.env.NODE_ENV': JSON.stringify(
                    process.env.NODE_ENV || 'development'
                ),
            },
            preventAssignment: true,
        }),
        resolve({
            extensions: ['.mjs', '.js', '.json', '.node', '.jsx'],
            browser: true,
        }),
        commonjs(),
        babel({ babelHelpers: 'bundled' }),
        styles({
            modules: true,
        }),
        serve({
            historyApiFallback: true,
            contentBase: 'public',
        }),
        livereload('public'),
    ],
}

export default config
