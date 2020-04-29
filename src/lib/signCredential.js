'use strict'
const baseCredential = require('../credentials/credential.json')

/**
 * Creates the proof for the Credential and returns the Verifiable Credential
 *
 * @param {object} zenroom to use
 * @param {object} credential Credential to be signed
 * @param {object} keyPair Keypair to sign with
 * @param {string} issuer DID for the Identity issuing the credential
 * @param {string} verificationMethod Public Verification method for the signature (if any)
 */
const signCredential = async (zenroom, credential, keyPair, issuer, verificationMethod = '') => {
  const signedCredential = baseCredential
  signedCredential.type = ['VerifiableCredential', credential.subject['@type']]
  signedCredential.credentialSubject = credential.subject

  const date = new Date()
  signedCredential.issuer = issuer
  signedCredential.issuanceDate = date.toISOString()
  signedCredential.proof.verificationMethod = verificationMethod

  const subject = JSON.stringify(this.subject)
  const proof = await zenroom.signMessage(issuer, keyPair, subject)
  signedCredential.proof.signature = proof
  return signedCredential
}

module.exports = signCredential
