const path = require('path');
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts }
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('./vueTransformerPlugin.js'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      })
    },
    resolver: {
      sourceExts: [...sourceExts, 'vue'],
      blacklistRE: /node_modules\/.*/
    },
    watchFolders: [path.resolve(__dirname, 'src')],
    maxWorkers: 2,
    watch: {
      usePolling: false,
      interval: 1000
    },
  };
})();