'use strict'
const Credential = require('./credential')

/**
 * Schema.org: Action.
 */
module.exports = class Action extends Credential {

  /**
  * Constructor.
  * @param {string} did The DID corresponding to the issuer of that action
  * @param {number} actionId Action unique identifier for the did
  */
  constructor (did, actionId = 0) {
    super('Action')
    this.credential.credentialSubject = {
      '@type': 'Action',
      id: did + ',actionId='+actionId
    }
  }

  /**
   * Loads a Subjects
   * @param {object} subject 
   */
  subject(subject) {
    this.credential.credentialSubject = subject
  }

  /**
  * Set the name
  * @param {string} name Full Name in ine string
  */
  name(name) {
    this.credential.credentialSubject.name = name
  }

  /**
  * Set the description
  * @param {string} description Full Name in ine string
  */
  description(description) {
    this.credential.credentialSubject.description = description
  }

  /**
   * Sets the agent of the Action for the credential.
   * @param {Persona} persona Persona Object
   */
  agent(persona) {
    this.credential.credentialSubject.agent = persona.subject
  }

  /**
   * Sets the Location for this action.
   * @param {Location} location Locatio Object
   */
  location(location) {
    this.credential.credentialSubject.location = location.subject
  }
}