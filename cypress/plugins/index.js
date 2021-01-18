/// <reference types = "node" />

const webpack = require("@cypress/webpack-preprocessor");

module.exports = (on, config, bool = false) => {
  const options = {
    webpackOptions: require("../../webpack.config"),
    watchOptions: {}
  };
  on("file:preprocessor", getWepPackWithFileChange(options));

  if (bool) {
    require('@cypress/code-coverage/task')(on, config)
    return config
  }
};

function getWepPackWithFileChange(options) {
  const webPackPreProcessor = webpack(options);
  return function(file) {
    file.outputPath = file.outputPath.replace(".ts", ".js");
    return webPackPreProcessor(file);
  };
}
