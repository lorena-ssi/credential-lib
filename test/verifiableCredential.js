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
      const signedCredential = await cred.signCredential(zenroom, keypair, person, issuer, verification)
      assert.equal(signedCredential.issuer, issuer)
      assert.isNotEmpty(signedCredential.issuanceDate)
      assert.equal(signedCredential.proof.verificationMethod, verification)
      assert.isNotEmpty(signedCredential.proof.signature)

      // Verify Signature
      const pubKey = keypair[issuerId].keypair.public_key
      assert.isTrue(await vc.verifyCredential(zenroom, issuerId, pubKey))
    })
  })
})
