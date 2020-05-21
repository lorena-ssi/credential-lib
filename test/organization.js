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
    it('Organization: should have full info', () => {
      const organization = new cred.Organization()
      organization.name('Caelum Labs')
      organization.legalName('Caelum Innovation SL')
      organization.taxID('B67101519')
      organization.url('https://caelumlabs.com')
      organization.foundingDate('2018-05-12')

      assert.equal(organization.subject['@type'], 'Organization')
      assert.equal(organization.subject.name, 'Caelum Labs')
      assert.equal(organization.subject.legalName, 'Caelum Innovation SL')
      assert.equal(organization.subject.taxID, 'B67101519')
      assert.equal(organization.subject.url, 'https://caelumlabs.com')
      assert.equal(organization.subject.foundingDate, '2018-05-12')

      const location = new cred.Location()
      location.streetAddress('Reina Cristina 9, ppal')
      location.addressLocality('Sitges')
      location.postalCode('08001')
      location.addressRegion('Barcelona')
      location.addressCountry('Spain')
      organization.location(location)

      assert.equal(organization.subject.location['@type'], 'PostalAddress')
      assert.equal(organization.subject.location.streetAddress, 'Reina Cristina 9, ppal')
      assert.equal(organization.subject.location.addressLocality, 'Sitges')
      assert.equal(organization.subject.location.postalCode, '08001')
      assert.equal(organization.subject.location.addressRegion, 'Barcelona')
      assert.equal(organization.subject.location.addressCountry, 'Spain')
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
