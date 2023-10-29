const { withPlausibleProxy } = require('next-plausible')

const config1 = {}

const config2 = withPlausibleProxy({ scriptName: 'pl', customDomain: 'https://pl.v1v2.io' })(
  config1,
)

module.exports = config2
