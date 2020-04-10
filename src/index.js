const Organization = require('./lib/organization')
const Person = require('./lib/person')
const Action = require('./lib/action')
const Location = require('./lib/location')
const signCredential = require('./lib/signCredential')
const verifyCredential = require('./lib/verifyCredential')

module.exports = { Organization, Person, Action, Location, signCredential, verifyCredential  }
