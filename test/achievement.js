const cred = require('../src/index')
const assert = require('chai').assert
const Zenroom = require('@lorena-ssi/zenroom-lib')
const zenroom = new Zenroom(true)

describe('Achievement Credential', () => {
  describe('Working with Achievements', () => {
    it('Achievement: should add an Achievement', () => {
      const achievement = new cred.Achievement()

      // Create a new Credential for Achievment
      achievement.title('Javascript Course')
      achievement.description('Javascript full course for developers')
      achievement.issuer('did:lor:labdev:10001')
      achievement.url('http://test.com')
      achievement.learningAchievement('Understand Javascript')
      achievement.issuanceDate('2020-04-23 00:00:00')
      achievement.expirationDate('2020-04-23 23:59:59')

      // test.
      assert.equal(achievement.subject['@type'], 'Achievement')
      assert.equal(achievement.subject.title, 'Javascript Course')
      assert.equal(achievement.subject.description, 'Javascript full course for developers')
      assert.equal(achievement.subject.issuer, 'did:lor:labdev:10001')
      assert.equal(achievement.subject.url, 'http://test.com')
      assert.equal(achievement.subject.learningAchievement.title, 'Understand Javascript')
      assert.equal(achievement.subject.issuanceDate, '2020-04-23 00:00:00')
      assert.equal(achievement.subject.expirationDate, '2020-04-23 23:59:59')
    })

    it('Achievement: should add a subject to the achievement', () => {
      const agent = new cred.Person('did:lor:labdev:1001')
      const achievement = new cred.Achievement('did:lor:labdev:1000')
      achievement.title('Task1')
      achievement.description('Description1')
      achievement.agent(agent)
      assert.equal(achievement.subject.agent['@type'], 'Person')
      assert.equal(achievement.subject.agent.id, 'did:lor:labdev:1001')
    })

    it('Achievement: should load an achievement', () => {
      const agent = new cred.Person('did:lor:labdev:1001')
      const achievement = new cred.Achievement('did:lor:labdev:1000')
      achievement.title('Task1')
      achievement.description('Description1')
      achievement.agent(agent)

      const achievementNew = new cred.Achievement(achievement.subject)
      assert.equal(achievement.subject, achievementNew.subject)
    })

    it('Achievement: should add a location to the achievement', () => {
      const achievement = new cred.Achievement()
      achievement.title('Task1')

      const loc = new cred.Location()
      loc.addressLocality('Mytown')
      loc.postalCode('08000')
      achievement.location(loc)
      assert.equal(achievement.subject.title, 'Task1')
      assert.equal(achievement.subject.location['@type'], 'PostalAddress')
      assert.equal(achievement.subject.location.addressLocality, 'Mytown')
      assert.equal(achievement.subject.location.postalCode, '08000')
    })
  })

  it('Achievement: should issue a new achievement', async () => {
    const achievement = new cred.Achievement('did:lor:labdev:1000001')
    achievement.issuanceDate('2020-04-23 00:00:00')
    achievement.expirationDate('2020-04-23 23:59:59')
    achievement.course('did:lor:labdev:10025')

    const agent = new cred.Person('did:lor:labdev:1001')
    agent.name('John Smith')
    agent.email('john@smith.io')
    achievement.agent(agent)

    assert.equal(achievement.subject.agent['@type'], 'Person')
    assert.equal(achievement.subject.agent.id, 'did:lor:labdev:1001')
    assert.equal(achievement.subject.agent.name, 'John Smith')
    assert.equal(achievement.subject['@type'], 'Achievement')
    assert.equal(achievement.subject.id, 'did:lor:labdev:1000001')
    assert.equal(achievement.subject.issuanceDate, '2020-04-23 00:00:00')
    assert.equal(achievement.subject.expirationDate, '2020-04-23 23:59:59')

    const issuer = 'did:lor:lab:8000'
    const keypair = await zenroom.newKeyPair(issuer)
    const signedCredential = await cred.signCredential(zenroom, achievement, keypair, issuer, '')
    assert.equal(signedCredential.issuer, issuer)
    assert.isNotEmpty(signedCredential.issuanceDate)
    assert.equal(signedCredential.proof.verificationMethod, '')
    assert.isNotEmpty(signedCredential.proof.signature)
  })
})
