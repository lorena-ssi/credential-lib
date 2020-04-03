'use strict'

/**
 * Schema.org : Persona
 */
module.exports = class Persona {
    /**
     * Constructor.
     * @param {string} did The DID corresponding to the persona 
     */
    constructor (did = '') {
        this.subject = {
        '@type': "Persona",
        id: did
        }
    }

    /**
    * Loads a Subjects
    * @param {object} subject 
    */
    load(subject) {
        this.subject = subject
    }

    /**
     * Set the ID
     * @param {string} did DID
     */
    id(did) {
        this.subject.id = did
    }

    /**
     * Set the name
     * @param {string} name Full Name in ine string
     */
    name(name) {
        this.subject.name = name
    }

    /**
     * Set the full Name
     * @param {string} givenName name
     * @param {string} familyName family name
     * @param {string} additionalName any additional Name
     */
    fullName(givenName, familyName, additionalName) {
        this.subject.givenName = givenName
        this.subject.familyName = familyName
        this.subject.additionalName = additionalName
    }

    /**
     * National ID
     * @param {string} value National ID Value
     * @param {string} propertyID Type of ID
     */
    nationalID(value, propertyID) {
        this.subject.identifier = {
            "@type":"PropertyValue",
            propertyID: propertyID,
            value:  value
        }
    }
}