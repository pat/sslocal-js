const fs = require("fs")
const State = require("./sslocal/state")

module.exports = {
  isEnabled: function(environment) {
    const state = new State(environment)
    return state.isEnabled()
  },

  apply: function(environment, version) {
    environment.config.devServer = this.applyToDevServer(
      environment.config.mode, environment.config.devServer, version
    )

    return environment
  },

  applyToDevServer: function(environment, devServer, version) {
    const state = new State(environment)
    version = version || 3

    if (state.isEnabled()) {
      if (version < 4) {
        devServer.https = true
        devServer.key = fs.readFileSync(state.keyPath())
        devServer.cert = fs.readFileSync(state.certPath())
      } else {
        devServer.https = devServer.https || {}
        devServer.https.key = fs.readFileSync(state.keyPath())
        devServer.https.cert = fs.readFileSync(state.certPath())
      }
    }

    return devServer
  }
}
