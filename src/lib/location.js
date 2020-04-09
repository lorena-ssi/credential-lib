'use strict'

/**
 * Schema.org : Location
 */
module.exports = class Location {
  /**
     * Constructor.
     */
  constructor () {
    this.subject = {
      '@type': 'PostalAddress'
    }
  }

  /**
     * Set the Locality
     * @param {string} addressLocality Locality Name
     */
  addressLocality (addressLocality) {
    this.subject.addressLocality = addressLocality
  }

  /**
     * Set the Postal Code
     * @param {string} postalCode PostalCode
     */
  postalCode (postalCode) {
    this.subject.postalCode = postalCode
  }

  /**
     * Set the Postal Code
     * @param {string} postalCode PostalCode
     */
  neighborhood (neighborhood) {
    this.subject.neighborhood = neighborhood
  }
}
