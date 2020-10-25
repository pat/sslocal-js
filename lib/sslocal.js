const fs = require('fs')
const State = require("./sslocal/state")

module.exports = {
  apply: function(environment) {
    const state = new State(environment.config.mode);

    if (state.isEnabled()) {
      environment.config.devServer.https = true
      environment.config.devServer.key = fs.readFileSync(state.keyPath())
      environment.config.devServer.cert = fs.readFileSync(state.certPath())
    }
    
    return environment
  }
}
