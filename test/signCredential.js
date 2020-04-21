const cred = require('../src/index')
const Zenroom = require('@lorena-ssi/zenroom-lib')
const zenroom = new Zenroom(true)
const assert = require('chai').assert

const verification = 'https://github.com/lorena-ssi/lorena-gov/orgs/labtest/1000.md'

describe('Credential Object', () => {
  describe('Basics Credential Object', () => {
    it('should create a Credential Object', async () => {
      const issuer = 'did:lor:lab:1000'
      const keypair = await zenroom.newKeyPair(issuer)
      const person = new cred.Person(issuer)
      assert.typeOf(person, 'object', 'we have an object')

      // Sign  Credential
      const signedCredential = await cred.signCredential(zenroom, person, keypair, issuer, verification)
      assert.equal(signedCredential.issuer, issuer)
      assert.isNotEmpty(signedCredential.issuanceDate)
      assert.equal(signedCredential.proof.verificationMethod, verification)
      assert.isNotEmpty(signedCredential.proof.signature)

      // Verify Signature
      const pubKey = keypair[issuer].keypair.public_key
      assert.isTrue(await cred.verifyCredential(zenroom, signedCredential, pubKey, issuer))

      const signedCredentialNOVerification = await cred.signCredential(zenroom, person, keypair, issuer)
      assert.equal(signedCredentialNOVerification.issuer, issuer)
      assert.isNotEmpty(signedCredentialNOVerification.issuanceDate)
      assert.equal(signedCredentialNOVerification.proof.verificationMethod, '')
      assert.isNotEmpty(signedCredentialNOVerification.proof.signature)
    })
  })
})
