const cred = require('../src/index')
const Zenroom = require('@lorena-ssi/zenroom-lib')
let zenroom = new Zenroom(true)
const assert = require('chai').assert

describe('Credential Object', () => {
  describe('Basics Credential Object', () => {
    it('should create a Credential Object', async () => {        
        const issuer = 'did:lor:lab:1000'
        let org = new cred.Organization(issuer)
        assert.typeOf(org, 'object', 'we have an object')
        assert.typeOf(org.credential, 'object', 'we have an object')
        assert.equal(org.credential['@context'][0], 'https://www.w3.org/2018/credentials/v1')
        assert.equal(org.credential['type'][0], 'VerifiableCredential')
        assert.equal(org.credential['type'][1], 'Organization')
        assert.equal(org.credential.credentialSubject['@type'], 'Organization')
        assert.equal(org.credential.credentialSubject.id, issuer)

        const issuer_id = 'caelum'
        const verification = 'https://github.com/lorena-ssi/lorena-gov/orgs/labtest/1000.md'
        let keypair = await zenroom.newKeyPair(issuer_id)

        // Sign  Credential
        await org.signCredential(keypair, issuer_id, issuer, verification)
        assert.equal(org.credential.issuer, issuer)
        assert.isNotEmpty(org.credential.issuanceDate)
        assert.equal(org.credential.proof.verificationMethod, verification)
        assert.isNotEmpty(org.credential.proof.signature)

        // Verify Signature
        const pubKey = keypair[issuer_id].keypair.public_key
        assert.isTrue(await org.verifyCredential(issuer_id, pubKey))
  
    })

    it('Persona: should set a name', () => {
      // new Persona.
      let persona = new cred.Persona('did:lor:lab:1001')
      persona.name('John Smith')
      
      // Check Persona.
      assert.equal(persona.subject['@type'], 'Persona')
      assert.equal(persona.subject.id, 'did:lor:lab:1001')
      assert.equal(persona.subject.name, 'John Smith')
    })

    it('Persona: should set a Full name', () => {
      // new Persona.
      let persona = new cred.Persona('did:lor:lab:1001')
      persona.fullName('John','Smith', 'Matrix')
      assert.equal(persona.subject['@type'], 'Persona')
      assert.equal(persona.subject.givenName, 'John')
      assert.equal(persona.subject.familyName, 'Smith')
      assert.equal(persona.subject.additionalName, 'Matrix')
    })

    it('Persona: should set a national ID', () => {
      let persona = new cred.Persona('did:lor:lab:1001')
      persona.nationalID('11223344A', 'Documento Nacional de Identidad, España')
      assert.equal(persona.subject.identifier['@type'], 'PropertyValue')
      assert.equal(persona.subject.identifier.propertyID, 'Documento Nacional de Identidad, España')
      assert.equal(persona.subject.identifier.value, '11223344A')
    })

    it('Organization: should add a role', () => {
      // new Persona.
      let admin = new cred.Persona('did:lor:lab:1001')
      admin.name('John Smith')

      // New Organization and add member as admin.
      let org = new cred.Organization('did:lor:lab:1000')
      org.name('Caelum Labs')
      org.member('admin', admin)
      
      let subject = org.credential.credentialSubject
      assert.equal(subject.name, 'Caelum Labs')
      assert.equal(subject.member['@type'], 'OrganizationRole')
      assert.equal(subject.member.roleName, 'admin')
      assert.equal(subject.member.member['@type'], 'Persona')
      assert.equal(subject.member.member.name, 'John Smith')
      assert.equal(subject.member.member.id, 'did:lor:lab:1001')

      let developer = new cred.Persona('did:lor:lab:1001')
      developer.fullName('John','Smith', 'Matrix')
      subject = org.credential.credentialSubject
      org.member('developer', developer)
       assert.equal(subject.member['@type'], 'OrganizationRole')
       assert.equal(subject.member.roleName, 'developer')
       assert.equal(subject.member.member['@type'], 'Persona')
       assert.equal(subject.member.member.givenName, 'John')
       assert.equal(subject.member.member.familyName, 'Smith')
       assert.equal(subject.member.member.additionalName, 'Matrix')
    })

    it('Action: should add an action', () => {
      let action = new cred.Action('did:lor:lab:1001', 20)
      action.name('Do a Task')
      action.description('Description of the task')
      assert.equal(action.credential['type'][0], 'VerifiableCredential')
      assert.equal(action.credential['type'][1], 'Action')
      assert.equal(action.credential.credentialSubject['@type'], 'Action')
      assert.equal(action.credential.credentialSubject.id, 'did:lor:lab:1001,actionId=20')
      assert.equal(action.credential.credentialSubject.name, 'Do a Task')
      assert.equal(action.credential.credentialSubject.description, 'Description of the task')
   })
   
   it('Action: should add an agent to the action', () => {
    let action = new cred.Action('did:lor:lab:1000', 20)
    action.name('Task1')
    action.description('Description1')
    action.agent(new cred.Persona('did:lor:lab:1001'))

    let loc = new cred.Location()
    loc.addressLocality('Mytown')
    loc.postalCode('08000')
    action.location(loc)

    let subject = action.credential.credentialSubject
    assert.equal(subject.name, 'Task1')
    assert.equal(subject.description, 'Description1')
    assert.equal(subject.agent['@type'], 'Persona')
    assert.equal(subject.agent.id, 'did:lor:lab:1001')
    assert.equal(subject.location['@type'], 'PostalAddress')
    assert.equal(subject.location.addressLocality, 'Mytown')
    assert.equal(subject.location.postalCode, '08000')
    })
  })
})
