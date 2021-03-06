const cred = require('../src/index')
const assert = require('chai').assert

describe('Action Credential', () => {
  describe('Working with actions', () => {
    it('Action: should add an action', () => {
      const action = new cred.Action('did:lor:lab:1001', 20)
      action.name('Do a Task')
      action.description('Description of the task')
      assert.equal(action.subject['@type'], 'Action')
      assert.equal(action.subject.id, 'did:lor:lab:1001,actionId=20')
      assert.equal(action.subject.name, 'Do a Task')
      assert.equal(action.subject.description, 'Description of the task')
    })

    it('Action: should add an agent to the action', () => {
      const agent = new cred.Person('did:lor:lab:1001')
      const action = new cred.Action('did:lor:lab:1000')
      action.name('Task1')
      action.description('Description1')
      action.agent(agent)
    })

    it('Action: should add extra fields', () => {
      const action = new cred.Action('did:lor:lab:1000')
      action.extra({ extra1: '1', extra2: 2 })
      assert.equal(action.subject.extra.extra1, '1')
      assert.equal(action.subject.extra.extra2, '2')
    })

    it('Action: should add a location to the action', () => {
      const action = new cred.Action('did:lor:lab:1000', 20)
      action.name('Task1')

      const loc = new cred.Location()
      loc.addressLocality('Mytown')
      loc.postalCode('08000')
      action.location(loc)
      assert.equal(action.subject.name, 'Task1')
      assert.equal(action.subject.location['@type'], 'PostalAddress')
      assert.equal(action.subject.location.addressLocality, 'Mytown')
      assert.equal(action.subject.location.postalCode, '08000')
    })

    it('Action: should add a startTime and endTime', () => {
      const action = new cred.Action('did:lor:lab:1000', 20)
      action.name('Task1')
      action.startTime('2020-04-23 00:00:00')
      action.endTime('2020-04-23 23:59:59')
      assert.equal(action.subject.startTime, '2020-04-23 00:00:00')
      assert.equal(action.subject.endTime, '2020-04-23 23:59:59')
    })
  })
})
