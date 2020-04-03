'use strict'
const Credential = require('./credential')

/**
 * Schema.org: Organization.
 */
module.exports = class Organization {

  /**
  * Constructor.
  * @param {string} did The DID corresponding to the persona 
  */
  constructor (did) {
    this.base = new Credential('Organization')
    this.base.credential.credentialSubject = {
      '@type': 'Organization',
      id: did
    }
  }

  /**
   * Loads a Subjects
   * @param {object} subject 
   */
  load(subject) {
    this.base.credential.credentialSubject = subject
  }

  /**
   * Returns the credential.
   * @returns {object} The Credential
   */
  credential() {
    return this.base.credential
  }

  async signCredential(keypair, issuer_id, issuer, verification) {
    await this.base.signCredential(keypair, issuer_id, issuer, verification)
  }

  async verifyCredential(issuer_id, pubKey) {
    return await this.base.verifyCredential(issuer_id, pubKey)
  }


  /**
  * Set the name
  * @param {string} name Full Name in ine string
  */
  name(name) {
    this.base.credential.credentialSubject.name = name
  }

  /**
   * Sets the member of one organization for the credential.
   * @param {string} roleName role name
   * @param {Persona} persona Persona Object
   */
  member(roleName, persona) {
    this.base.credential.credentialSubject.member = {
      '@type': 'OrganizationRole',
      roleName : roleName,
      member: persona.subject
    }
  }

}