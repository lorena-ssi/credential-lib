const cred = require('../src/index')
const assert = require('chai').assert
// const verification = 'https://github.com/lorena-ssi/lorena-gov/orgs/labtest/1000.md'

describe('Organization Credential', () => {
  describe('Working with organizations', () => {
    it('Organization: should add a name', () => {
      const organization = new cred.Organization('did:lor:lab:1000')
      organization.name('Caelum Labs')
      assert.equal(organization.subject.name, 'Caelum Labs')
      assert.equal(organization.subject['@type'], 'Organization')
    })
    it('Organization: should add a role', () => {
      // new Person.
      const admin = new cred.Person('did:lor:lab:1001')
      admin.name('John Smith')

      // New Organization and add member as admin.
      const organization = new cred.Organization('did:lor:lab:1000')
      organization.name('Caelum Labs')
      organization.member('admin', admin)

      assert.equal(organization.subject.name, 'Caelum Labs')
      assert.equal(organization.subject['@type'], 'Organization')
      assert.equal(organization.subject.member.roleName, 'admin')

      assert.equal(organization.subject.member.member['@type'], 'Person')
      assert.equal(organization.subject.member.member.name, 'John Smith')
      assert.equal(organization.subject.member.member.id, 'did:lor:lab:1001')

      const developer = new cred.Person('did:lor:lab:1001')
      developer.fullName('John', 'Smith', 'Matrix')
      organization.member('developer', developer)

      assert.equal(organization.subject.member['@type'], 'OrganizationRole')
      assert.equal(organization.subject.member.roleName, 'developer')
      assert.equal(organization.subject.member.member['@type'], 'Person')
      assert.equal(organization.subject.member.member.givenName, 'John')
      assert.equal(organization.subject.member.member.familyName, 'Smith')
      assert.equal(organization.subject.member.member.additionalName, 'Matrix')
    })
  })
})
