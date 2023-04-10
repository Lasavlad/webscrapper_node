const { normalizeURL } = require('./crawl.js')
const {test, expect } = require('@jest/globals')

test('normalize protocol', ()=>{
    const input = 'https://wagslane.dev/path'
    const normal_url = normalizeURL(input)
    const expected = 'wagslane.dev/path'
    expect(normal_url).toEqual(expected)
})

test('normalize frontslash', ()=>{
    const input = 'https://wagslane.dev/path/'
    const normal_url = normalizeURL(input)
    const expected = 'wagslane.dev/path'
    expect(normal_url).toEqual(expected)
})

test('normalize Cap', ()=>{
    const input = 'https://WAGslane.dev/path/'
    const normal_url = normalizeURL(input)
    const expected = 'wagslane.dev/path'
    expect(normal_url).toEqual(expected)
})

test('normalize http', ()=>{
    const input = 'http://WAGslane.dev/path/'
    const normal_url = normalizeURL(input)
    const expected = 'wagslane.dev/path'
    expect(normal_url).toEqual(expected)
})