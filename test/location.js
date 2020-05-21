const cred = require('../src/index')
const assert = require('chai').assert

describe('Location Credential', () => {
  describe('Working with locations', () => {
    it('Person: should set a addressLocality', () => {
      // new Person.
      const location = new cred.Location()
      location.addressLocality('Myoldtown')

      // Check Person.
      assert.equal(location.subject['@type'], 'PostalAddress')
      assert.equal(location.subject.addressLocality, 'Myoldtown')
    })

    it('Person: should set a addressLocality', () => {
      // new Person.
      const location = new cred.Location()
      location.streetAddress('Reina Cristina 9, ppal')
      location.addressLocality('Sitges')
      location.postalCode('08001')
      location.addressRegion('Barcelona')
      location.addressCountry('Spain')

      // Check Location.
      assert.equal(location.subject['@type'], 'PostalAddress')
      assert.equal(location.subject.streetAddress, 'Reina Cristina 9, ppal')
      assert.equal(location.subject.addressLocality, 'Sitges')
      assert.equal(location.subject.postalCode, '08001')
      assert.equal(location.subject.addressRegion, 'Barcelona')
      assert.equal(location.subject.addressCountry, 'Spain')
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
