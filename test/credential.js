const Credential = require('../src/index')
const Zenroom = require('@lorena-ssi/zenroom-lib')
const assert = require('chai').assert
const cred = new Credential()
const zenroom = new Zenroom()

const issuer = 'did:lor:cat:2222'
const verification = 'https://github.com/.../cat'
let keypair = false

describe('Credential Object', () => {
  describe('Basics Credential Object', () => {
    it('should create a Credential Object', () => {
      assert.typeOf(cred, 'object', 'we have an object')
      assert.typeOf(cred.credential, 'object', 'we have an object')
    })

    it('should load the Credential JSON', () => {
      assert.equal(cred.credential['@context'][0], 'https://www.w3.org/2018/credentials/v1')
      assert.equal(cred.credential.type[0], 'VerifiableCredential')
      assert.typeOf(cred.credential.credentialSubject, 'object', 'we have an object')
    })

    it('should fill the Credential JSON', () => {
      const credential = {
        id: 'did:lor:cat:11111',
        givenName: 'Name1',
        familyName: 'Last1',
        additionalName: 'Last2',
        propertyID: '111111111',
        telephone: '55523323',
        roleName: 'volunteer'
      }
      cred.fillSubject(credential)
      const subject = cred.credential.credentialSubject
      assert.equal(subject.roleName, credential.roleName)
      assert.equal(subject.member.id, credential.id)
      assert.equal(subject.member.givenName, credential.givenName)
      assert.equal(subject.member.familyName, credential.familyName)
      assert.equal(subject.member.additionalName, credential.additionalName)
      assert.equal(subject.member.identifier.value, credential.propertyID)
    })

    it('should sign the Credential', async () => {
      keypair = await zenroom.newKeyPair(issuer)
      await cred.signCredential(keypair, issuer, verification)
      assert.equal(cred.credential.issuer, issuer, verification)
      assert.isNotEmpty(cred.credential.issuanceDate)
      assert.equal(cred.credential.proof.verificationMethod, verification)
      assert.isNotEmpty(cred.credential.proof.signature)
    })

    it('should verify the signature of the Credential', async () => {
      const pubKey = keypair[issuer].keypair.public_key
      assert.isTrue(await cred.verifyCredential(issuer, pubKey))
    })

    it('should load a credential and verify the signature', async () => {
      const testCred = new Credential(cred.credential)
      const pubKey = keypair[issuer].keypair.public_key
      assert.isTrue(await testCred.verifyCredential(issuer, pubKey))
    })
  })
})
