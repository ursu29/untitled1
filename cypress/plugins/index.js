
module.exports = (on, config, bool = false) => {
  if (bool) {
    require('@cypress/code-coverage/task')(on, config)

    return config
  }
};

// snapshots
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
};
