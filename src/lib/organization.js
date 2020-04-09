'use strict'

/**
 * Schema.org: Organization.
 */
module.exports = class Organization {
  /**
   * Constructor
   *
   * @param {string} did The DID corresponding to the persona
   */
  constructor (did) {
    this.subject = {
      '@type': 'Organization',
      id: did
    }
  }

  /**
   * Set the name
   *
   * @param {string} name Full Name in ine string
   */
  name (name) {
    this.subject.name = name
  }

  /**
   * Sets the member of one organization for the credential.
   *
   * @param {string} roleName role name
   * @param {*} persona Persona Object
   */
  member (roleName, persona) {
    this.subject.member = {
      '@type': 'OrganizationRole',
      roleName: roleName,
      member: persona.subject
    }
  }
}
