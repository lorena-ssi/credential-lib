const cred = require('../src/index')
const Zenroom = require('@lorena-ssi/zenroom-lib')
const zenroom = new Zenroom(true)
const assert = require('chai').assert

describe('Person Credential', () => {
  describe('Working with persons', () => {
    it('Person: should set a name', () => {
      // new Person.
      const person = new cred.Person('did:lor:lab:1001')
      person.name('John Smith')

      // Check Person.
      assert.equal(person.subject['@type'], 'Person')
      assert.equal(person.subject.id, 'did:lor:lab:1001')
      assert.equal(person.subject.name, 'John Smith')
    })

    it('Person: should set a Full name', () => {
      // new Person.
      const person = new cred.Person('did:lor:lab:1001')
      person.fullName('John', 'Smith', 'Matrix')
      assert.equal(person.subject['@type'], 'Person')
      assert.equal(person.subject.givenName, 'John')
      assert.equal(person.subject.familyName, 'Smith')
      assert.equal(person.subject.additionalName, 'Matrix')
    })

    it('Person: should set a national ID', () => {
      const person = new cred.Person('did:lor:lab:1001')
      person.nationalID('11223344A', 'Documento Nacional de Identidad, España')
      assert.equal(person.subject.identifier['@type'], 'PropertyValue')
      assert.equal(person.subject.identifier.propertyID, 'Documento Nacional de Identidad, España')
      assert.equal(person.subject.identifier.value, '11223344A')
    })

    
    it('Person: should set Phone number', () => {
      // new Person.
      const person = new cred.Person('did:lor:lab:1001')
      person.telephone('555 111 111')
      assert.equal(person.subject.telephone, '555 111 111')
    })

    it('Person: should set Email', () => {
      // new Person.
      const person = new cred.Person()
      person.email('test@example.com')
      assert.equal(person.subject.email, 'test@example.com')
    })

    it('Person: should sign and verify signature', async () => {
      const issuer = 'did:lor:lab:1000'
      const issuerId = 'caelum'
      const keypair = await zenroom.newKeyPair(issuerId)
      const person = new cred.Person('did:lor:lab:1001')

      const credential = new cred.VerifiableCredential(person)
      // Sign the persona
      await credential.signCredential(zenroom, keypair, issuerId, issuer)

      // Verify Signature
      const pubKey = keypair[issuerId].keypair.public_key
      assert.isTrue(await credential.verifyCredential(zenroom, issuerId, pubKey))
    })
  })
})