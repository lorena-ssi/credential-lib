'use strict'
const Zenroom = require('@lorena-ssi/zenroom-lib')

// Debug
// var debug = require('debug')('did:debug:matrix')
// var error = require('debug')('did:error:matrix')

/* const findKey = (obj) => {
} */

/**
 * Javascript Class to Manage Credentials.
 */
module.exports = class Credential {
  constructor (credential = false) {
    // Loads the credential we need
    if (credential !== false) {
      this.credential = credential
    } else {
      this.credential = require('./credentials/memberOf.json')
    }
    this.zenroom = new Zenroom(true)
  }

  /**
   * Fills the data for a particular Credential
   *
   * @param {object} credential The credential to be filled.
   */
  fillSubject (credential) {
    this.credential.credentialSubject.roleName = credential.roleName
    this.credential.credentialSubject.member.id = (credential.id ? credential.id : '')
    this.credential.credentialSubject.member.givenName = credential.givenName
    this.credential.credentialSubject.member.familyName = credential.familyName
    this.credential.credentialSubject.member.additionalName = credential.additionalName
    this.credential.credentialSubject.member.identifier.value = credential.propertyID
  }

  /**
   * Creates the proof for the Credential and returns the Verifiable Credential
   *
   *
   * @param {object} keyPair Keypair to sign with
   * @param {string} issuer Identity issuing the credential
   * @param {string} verificationMethod Public Verification method for the signature (if any)
   */
  async signCredential (keyPair, issuer, verificationMethod) {
    const date = new Date()
    this.credential.issuer = issuer
    this.credential.issuanceDate = date.toISOString()
    this.credential.proof.verificationMethod = verificationMethod

    const subject = JSON.stringify(this.credential.credentialSubject)
    let proof = await this.zenroom.signMessage(issuer, keyPair, subject)
    proof = JSON.stringify(proof)
    this.credential.proof.signature = proof
  }

  /**
   * Verifies the signature for a credential.
   *
   * @param {*} issuer of the credential
   * @param {*} pubKey of the issuer
   * @returns {boolean} whether signature is correct
   */
  async verifyCredential (issuer, pubKey) {
    const proof = JSON.parse(this.credential.proof.signature)
    const publicKey = []
    publicKey[issuer] = { public_key: pubKey }
    const check = await this.zenroom.checkSignature(issuer, publicKey, proof, 'verifier')
    return (check.signature === 'correct')
  }
}
