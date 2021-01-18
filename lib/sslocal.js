const fs = require("fs")
const State = require("./sslocal/state")

module.exports = {
  isEnabled: function(environment) {
    const state = new State(environment)
    return state.isEnabled()
  },

  apply: function(environment) {
    environment.config.devServer = this.applyToDevServer(
      environment.config.mode, environment.config.devServer
    )

    return environment
  },

  applyToDevServer: function(environment, devServer) {
    const state = new State(environment)

    if (state.isEnabled()) {
      devServer.https = true
      devServer.key = fs.readFileSync(state.keyPath())
      devServer.cert = fs.readFileSync(state.certPath())
    }

    return devServer
  }
}
