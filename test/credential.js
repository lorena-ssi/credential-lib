const Credential = require('../src/index')
const Zenroom = require('@lorena-ssi/zenroom-lib')
const assert = require('chai').assert
let zenroom = new Zenroom(true)
let memberOf = false
let action = false

const issuer = 'did:lor:cat:2222'
const verification = 'https://github.com/.../cat'
let keypair = false

const Subject = {
  memberOf : require('../src/credentials/memberOf.json'),
  action : require('../src/credentials/action.json')
}

describe('Credential Object', () => {
  describe('Basics Credential Object', () => {
    it('should create a Credential Object', () => {        
        memberOf = new Credential('memberOf')
        assert.typeOf(memberOf, 'object', 'we have an object')
        assert.equal(memberOf.credential.credentialSubject,Subject['memberOf'])
        assert.equal(memberOf.subjectName,'memberOf')
        assert.typeOf(memberOf.credential, 'object', 'we have an object')
    })

    it('should load the Credential JSON', () => {
        assert.equal(memberOf.credential['@context'][0], 'https://www.w3.org/2018/credentials/v1')
        assert.equal(memberOf.credential['type'][0], 'VerifiableCredential')
        assert.typeOf(memberOf.credential.credentialSubject, 'object', 'we have an object')
    })

    it('memberOf: should fill the Credential JSON', () => {
      const subject = {
        id: 'did:lor:cat:11111',
        givenName: 'Name1',
        familyName: 'Last1',
        additionalName: 'Last2',
        propertyID: '111111111',
        telephone: '55523323',
        roleName: 'volunteer'
      }
      memberOf.fillSubject(subject)
      assert.equal(memberOf.credential.credentialSubject['roleName'], subject.roleName)
      assert.equal(memberOf.credential.credentialSubject.member['id'], subject.id)
      assert.equal(memberOf.credential.credentialSubject.member['givenName'], subject.givenName)
      assert.equal(memberOf.credential.credentialSubject.member['familyName'], subject.familyName)
      assert.equal(memberOf.credential.credentialSubject.member['additionalName'], subject.additionalName)
      assert.equal(memberOf.credential.credentialSubject.member['identifier'].value, subject.propertyID)
    })

    it('should sign the Credential', async () => {
      keypair = await zenroom.newKeyPair(issuer)  
      await memberOf.signCredential(keypair, issuer, 'did:lor:test:11111', verification)
      assert.equal(memberOf.credential.issuer, 'did:lor:test:11111')
      assert.isNotEmpty(memberOf.credential.issuanceDate)
      assert.equal(memberOf.credential.proof.verificationMethod, verification)
      assert.isNotEmpty(memberOf.credential.proof.signature)
    })

    it('should verify the signature of the Credential', async () => {
      const pubKey = keypair[issuer].keypair.public_key
      assert.isTrue(await memberOf.verifyCredential(issuer, pubKey))
    })

    it('should load a credential and verify the signature', async() => {
      let testCred = new Credential(memberOf.credential)
      const pubKey = keypair[issuer].keypair.public_key
      assert.isTrue(await testCred.verifyCredential(issuer, pubKey))
    })

    it('memberOf: should fill the Credential JSON', () => {
      action = new Credential('action')
      const subject = {
        id: 'did:lor:cat:11111#task-1',
        did: 'did:lor:cat:11111',
        name: 'Name of the action',
        description: 'Description for his action',
        location: 'Location',
        potentialAction: 'Payment'
      }
      action.fillSubject(subject)
      assert.equal(memberOf.credential.credentialSubject['name'], subject.name)
      assert.equal(memberOf.credential.credentialSubject['description'], subject.description)
      assert.equal(memberOf.credential.credentialSubject['id'], subject.id)
      assert.equal(memberOf.credential.credentialSubject.agent['id'], subject.did)
      assert.equal(memberOf.credential.credentialSubject.location['name'], subject.location)
      assert.equal(memberOf.credential.credentialSubject.location['potentialAction'], subject.potentialAction)
    })

  })
})
