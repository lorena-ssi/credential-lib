'use strict'
const Zenroom = require('@lorena-ssi/zenroom-lib')

// Debug
// var debug = require('debug')('did:debug:matrix')
// var error = require('debug')('did:error:matrix')

const baseCredential = require('./credentials/credential.json')
const Subject = {
  memberOf : require('./credentials/memberOf.json'),
  action : require('./credentials/action.json')
}

/**
 * Javascript Class to Manage Credentials.
 */
module.exports = class Credential {
  constructor (subject, credential = false) {
    // Loads the credential we need
    this.subjectName = subject
    if (credential !== false) {
      this.credential = credential
    }
    else {
      this.credential = baseCredential
      this.credential.credentialSubject = Subject[subject]
    }
    this.zenroom = new Zenroom(true)
  }

  /**
   * Fills the data for a particular Credential
   *
   * @param {object} credential The credential to be filled.
   */
  fillSubject(subject) {
    switch (this.subjectName) {
      case 'memberOf':
        this.credential.credentialSubject.roleName = subject.roleName
        this.credential.credentialSubject.member.id = (subject.id ? subject.id : '')
        this.credential.credentialSubject.member.givenName = subject.givenName
        this.credential.credentialSubject.member.familyName = subject.familyName
        this.credential.credentialSubject.member.additionalName = subject.additionalName
        this.credential.credentialSubject.member.identifier.value = subject.propertyID
        break
      case 'action':
        this.credential.credentialSubject.name = subject.name 
        this.credential.credentialSubject.description = subject.description
        this.credential.credentialSubject.id = subject.id
        this.credential.credentialSubject.agent.id = subject.did
        this.credential.credentialSubject.location.name = subject.location
        this.credential.credentialSubject.location.potentialAction = subject.potentialAction
    }
  }

  /**
   * Creates the proof for the Credential and returns the Verifiable Credential
   *
   *
   * @param {object} keyPair Keypair to sign with
   * @param {string} issuer Identity issuing the credential
   * @param {string} verificationMethod Public Verification method for the signature (if any)
   */
  async signCredential (keyPair, issuer, issuerDid, verificationMethod) {
    const date = new Date()
    this.credential.issuer = issuerDid
    this.credential.issuanceDate = date.toISOString()
    this.credential.proof.verificationMethod = verificationMethod

    const subject = JSON.stringify(this.subject)
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
