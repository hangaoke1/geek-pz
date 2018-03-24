const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const path = require('path');

module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);

    config.resolve.alias['@service'] = path.resolve(__dirname, './src/service');
    config.resolve.alias['@components'] = path.resolve(__dirname, './src/components');
    config.resolve.alias['@model'] = path.resolve(__dirname, './src/model');
    config.resolve.alias['@lib'] = path.resolve(__dirname, './src/lib');
    config.resolve.alias['@auth'] = path.resolve(__dirname, './src/auth');
    config.resolve.alias['@view'] = path.resolve(__dirname, './src/view');
    config.resolve.alias['@asset'] = path.resolve(__dirname, './src/asset');

    config = rewireLess.withLoaderOptions({
      // modifyVars: {
      //   "@primary-color": "#145293"
      // },
    })(config, env);
  return config;
};
