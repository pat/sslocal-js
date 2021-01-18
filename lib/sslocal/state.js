const fs = require('fs')
const path = require('path')

class State {
  constructor(environment) {
    this.environment = environment
  }

  certPath() {
    return path.resolve(`config/certificates/${this.environment}.crt`)
  }

  isEnabled() {
    try {
      fs.accessSync(this.keyPath(), fs.constants.R_OK)
      fs.accessSync(this.certPath(), fs.constants.R_OK)

      return true
    } catch (err) {
      return false
    }
  }

  keyPath() {
    return path.resolve(`config/certificates/${this.environment}.key`)
  }
}

module.exports = State
