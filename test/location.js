const cred = require('../src/index')
const assert = require('chai').assert

describe('Location Credential', () => {
  describe('Working with loacations', () => {
    it('Person: should set a addressLocality', () => {
      // new Person.
      const location = new cred.Location()
      location.addressLocality('Myoldtown')

      // Check Person.
      assert.equal(location.subject['@type'], 'PostalAddress')
      assert.equal(location.subject.addressLocality, 'Myoldtown')
    })

    it('Person: should set a postalCode', () => {
      // new Person.
      const location = new cred.Location()
      location.postalCode('08001')

      // Check Person.
      assert.equal(location.subject['@type'], 'PostalAddress')
      assert.equal(location.subject.postalCode, '08001')
    })

    it('Person: should set a neighborhood', () => {
      // new Person.
      const location = new cred.Location()
      location.neighborhood('Myneighborhood')

      // Check Person.
      assert.equal(location.subject['@type'], 'PostalAddress')
      assert.equal(location.subject.neighborhood, 'Myneighborhood')
    })
  })
})
