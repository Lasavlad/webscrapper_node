const { normalizeURL, getUrlsFromHtml } = require('./crawl.js')
const {test, expect } = require('@jest/globals')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


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

// geturlfromhtml

test('getURLsFromHtml absolute', ()=>{
    const inputURL = 'https://wagslane.dev'
    const inputBody = '<html><body><a href="https://wagslane.dev"><span>Welcome</span></a></body></html>'
    const actual = getUrlsFromHtml(inputBody, inputURL)
    const expected = ['https://wagslane.dev/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHtml relative', ()=>{
    const inputURL = 'https://wagslane.dev'
    const inputBody = '<html><body><a href="/path/somewhere"><span>Going Somewhere</span></a></body></html>'
    const actual = getUrlsFromHtml(inputBody, inputURL)
    const expected = ['https://wagslane.dev/path/somewhere']
    expect(actual).toEqual(expected)
})

test('getURLsFromHtml multiple', ()=>{
    const inputURL = 'https://wagslane.dev'
    const inputBody = '<html><body><a href="/path/somewhere"><span>Going Somewhere</span></a><a href="https://wagslane.dev"><span>Welcome</span></a></body></html>'
    const actual = getUrlsFromHtml(inputBody, inputURL)
    const expected = ['https://wagslane.dev/path/somewhere', 'https://wagslane.dev/']
    expect(actual).toEqual(expected)

})

test('getURLsFromHtml ErrorHandling', ()=>{
    const inputURL = 'https://wagslane.dev'
    const inputBody = '<html><body><a href="path/somewhere"><span>Going Somewhere</span></a></body></html>'
    const actual = getUrlsFromHtml(inputBody, inputURL)
    const expected = [ ]
    expect(actual).toEqual(expected)
})