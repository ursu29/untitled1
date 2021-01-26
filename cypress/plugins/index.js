
module.exports = (on, config, bool = false) => {
  if (bool) {
    require('@cypress/code-coverage/task')(on, config)

    return config
  }
};
