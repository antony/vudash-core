'use strict'

const { expect } = require('code')
const { register, validation } = require('./widget')
const Joi = require('joi')

describe('widget', () => {
  it('Uses config', () => {
    const config = { foo: 'bar' }
    const configuration = register(config)
    expect(configuration.config.foo).to.equal(config.foo)
  })

  it('Has default config values', () => {
    const config = {}
    const configuration = register(config)
    expect(configuration.config.description).to.equal('Statistics')
  })

  it('Merges config with default values', () => {
    const config = { description: 'hello' }
    const configuration = register(config)
    expect(configuration.config.description).to.equal(config.description)
  })

  it('Will convert given value to string', () => {
    const configuration = register({ format: '%s' })
    const { value } = configuration.update(2)
    expect(value).to.equal('2')
  })

  context('Formatting', () => {
    it('Will format according to format config', () => {
      const configuration = register({ format: '%d%%' })
      const output = configuration.update(34)
      expect(output).to.equal({ value: '34%' })
    })
  })

  context('Colours', () => {
    it('With provided colour', () => {
      const conf = { colour: '#fff' }
      const { config } = register(conf)
      expect(config.colour).to.equal('#fff')
    })

    it('No colour passed', () => {
      const { config } = register({})
      expect(config.colour).not.to.exist()
    })
  })

  context('Configuration', () => {
    it('default format is set', () => {
      const { value } = Joi.validate({}, validation)
      expect(value.format).to.equal('%s')
    })
  })
})
