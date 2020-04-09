const cred = require('../src/index')
const Zenroom = require('@lorena-ssi/zenroom-lib')
const zenroom = new Zenroom(true)
const assert = require('chai').assert

const verification = 'https://github.com/lorena-ssi/lorena-gov/orgs/labtest/1000.md'

describe('Credential Object', () => {
  describe('Basics Credential Object', () => {
    it('should create a Credential Object', async () => {
      const issuer = 'did:lor:lab:1000'
      const person = new cred.Person(issuer)
      assert.typeOf(person, 'object', 'we have an object')

      const vc = new cred.VerifiableCredential(person)
      assert.typeOf(vc.credential, 'object', 'we have an object')
      assert.equal(vc.credential['@context'][0], 'https://www.w3.org/2018/credentials/v1')
      assert.equal(vc.credential.type[0], 'VerifiableCredential')
      assert.equal(vc.credential.type[1], 'Person')
      assert.equal(vc.credential.credentialSubject['@type'], 'Person')
      assert.equal(vc.credential.credentialSubject.id, issuer)

      const issuerId = 'caelum'

      const keypair = await zenroom.newKeyPair(issuerId)

      // Sign  Credential
      await vc.signCredential(zenroom, keypair, issuerId, issuer, verification)
      const credential = vc.credential
      assert.equal(credential.issuer, issuer)
      assert.isNotEmpty(credential.issuanceDate)
      assert.equal(credential.proof.verificationMethod, verification)
      assert.isNotEmpty(credential.proof.signature)

      // Verify Signature
      const pubKey = keypair[issuerId].keypair.public_key
      assert.isTrue(await vc.verifyCredential(zenroom, issuerId, pubKey))
    })
  })
})
