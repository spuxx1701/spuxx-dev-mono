import chokidar from 'chokidar';
// See: https://github.com/axe-me/vite-plugin-node/issues/87
// This script is used by `yarn start`.
//
// The script runs until `dist/main.js` is created by Vite, and then it exits.

chokidar.watch('dist').on('all', (event, path) => {
  if (event === 'add' && path === 'dist/main.mjs') {
    console.log('Waiting for dist folder...');
    process.exit(0);
  }
});
