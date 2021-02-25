// for adding code-coverage
module.exports = (on, config, bool = false) => {
  if (bool) {
    require('@cypress/code-coverage/task')(on, config)

    return config
  }
}

//for adding tags
/*
If we want to execute only tests with the ‘E2E’ tag we will use the command: yarn cypress run --env grep="E2E"
test.js: describe('login to www website (E2E)', () => {})
*/
const selectTestsWithGrep = require('cypress-select-tests/grep')
module.exports = (on, config) => {
  on('file:preprocessor', selectTestsWithGrep(config))
}

// snapshots
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin')

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config)
}
