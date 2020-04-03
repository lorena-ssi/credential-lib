'use strict'
const Credential = require('./credential')

/**
 * Schema.org: Organization.
 */
module.exports = class Organization extends Credential {

  /**
  * Constructor.
  * @param {string} did The DID corresponding to the persona 
  */
  constructor (did) {
    super('Organization')
    this.credential.credentialSubject = {
      '@type': 'Organization',
      id: did
    }
  }

  /**
  * Set the name
  * @param {string} name Full Name in ine string
  */
  name(name) {
    this.credential.credentialSubject.name = name
  }


  /**
   * Sets the member of one organization for the credential.
   * @param {string} roleName role name
   * @param {Persona} persona Persona Object
   */
  member(roleName, persona) {
    this.credential.credentialSubject.member = {
      '@type': 'OrganizationRole',
      roleName : roleName,
      member: persona.subject
    }
  }

}