# TypeScript and React Widget Components using Webpack


Simple and optimized React boilerplate. It includes: 

- [x] React v16
- [x] TypeScript v3 and TSX support
- [x] React Router v5
- [x] Latest Webpack (v.4.16.5) and Webpack Dev Server (v.3.1.5)
- [x] Hot Module Replacement using [webpack-hmr](https://webpack.js.org/concepts/hot-module-replacement/)
- [x] SASS support
- [x] Production Config
- [x] Custom TypeScript config
- [x] TS Linting
- [x] Redux (v4.0.5) API integration


## Starting the dev server

Make sure you have **Node.js** installed.

1. Run `npm install`
2. Start the dev server using `npm start`
3. Open [http://localhost:3000](http://localhost:3000)


## Available Commands

- `npm start` - start the dev server
- `npm clean` - delete the dist folder
- `npm run build` - create a production ready build in `dist` folder


## Breaking down the Commands

- `npm start`
    - Script: `"webpack-dev-server --mode development --progress --colors --open --hot --port 3000"`
    - Script breakdown:
        - `webpack-dev-server`: Runs webpack.config.js, creates the build and host the files on webpack development server.
        - `--mode development`: Sets the webpack build mode to development.
        - `--progress --colors`: Shows the progress of the build on the console with different colors for different assets.
        - `--open`: Opens the default system browser.
        - `--hot`: Activates the hot reload functionality where the browser itself reloads the component whenever the developer make any changes in the corresponding code.
        - `--port 3000`: Targets the dev server and serve the distributable files on port 3000.
        - Please note that `npm run clean` runs as before `npm start` which deletes the pre-existing dist folder from the project file system. 
    
- `npm run build`
    - Script: `"npm run clean && webpack --mode production --progress --colors"`
    - Script breakdown:
        - `npm run clean`: Deletes the pre-existing dist folder from the project file system. 
        - `webpack`: Runs webpack.config.js and creates the build.
        - `--mode production`: Sets the webpack build mode to production.
        - `--progress --colors`: Shows the progress of the build with different colors for different assets on the console.
        

- **Plugins and Optimizations:**
    - The `CommonsChunkPlugin` was removed in webpack 4 and has been replaced with a set of defaults and API called `optimization.splitChunks` and `optimization.runtimeChunk`. This means you now get to have shared chunks automatically generated for you.


- **Other updates:**
    - Improve stats output alignment.
    - Improve stats text output when all exports are used.
    - Add `prefetched/preloaded` chunks and assets to stats text output.
    - `UglifyJs` now caches and parallizes by default.
    - Performance improvement for `RemoveParentModulesPlugin`.
    - Script tags are no longer `text/javascript` and async as this are the default values (saves a few bytes).
    - Persistent Caching.


## TO DOS
    - **ISSUE:** SCSS imports are not working in production environment with `import` statements. Currently using `require` for the same. This is happening only at the components level, while the base entry levels are importing as expected.