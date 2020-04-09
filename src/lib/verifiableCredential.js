'use strict'
const baseCredential = require('../credentials/credential.json')

/**
 * Javascript Class to Manage Credentials.
 */
module.exports = class VerifiableCredential {
  constructor (credential) {
    this.credential = baseCredential
    this.credential.type = ['VerifiableCredential', credential.subject['@type']]
    this.credential.credentialSubject = credential.subject
  }

  /**
   * Creates the proof for the Credential and returns the Verifiable Credential
   *
   * @param {*} zenroom instance to use
   * @param {object} keyPair Keypair to sign with
   * @param {string} issuer Identity issuing the credential
   * @param {string} issuerDid DID for the Identity issuing the credential
   * @param {string} verificationMethod Public Verification method for the signature (if any)
   */
  async signCredential (zenroom, keyPair, issuer, issuerDid, verificationMethod = '') {
    const date = new Date()
    this.credential.issuer = issuerDid
    this.credential.issuanceDate = date.toISOString()
    this.credential.proof.verificationMethod = verificationMethod

    const subject = JSON.stringify(this.subject)
    let proof = await zenroom.signMessage(issuer, keyPair, subject)
    proof = JSON.stringify(proof)
    this.credential.proof.signature = proof
  }

  /**
   * Verifies the signature for a credential.
   *
   * @param {*} zenroom instance to use
   * @param {*} issuer of the credential
   * @param {*} pubKey of the issuer
   * @returns {boolean} whether signature is correct
   */
  async verifyCredential (zenroom, issuer, pubKey) {
    const proof = JSON.parse(this.credential.proof.signature)
    const publicKey = []
    publicKey[issuer] = { public_key: pubKey }
    const check = await zenroom.checkSignature(issuer, publicKey, proof, 'verifier')
    return (check.signature === 'correct')
  }
}
